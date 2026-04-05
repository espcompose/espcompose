// ────────────────────────────────────────────────────────────────────────────
// Reactive theme proxy — deep proxy that returns IRReactiveNodes for leaves
//
// createReactiveThemeProxy() returns a deeply-nested Proxy mirroring the
// shape of the Theme interface. Leaf property access (e.g. proxy.colors.
// primary.bg) produces a cached IRReactiveNode whose C++ signal name maps
// to a theme memo in the generated espcompose_bindings.h.
//
// The proxy integrates with useMemo() dependency tracking: accessing a
// theme leaf inside a memo function body records the dependency so the
// compiler can wire the memo to the theme signal.
// ────────────────────────────────────────────────────────────────────────────

import { IRReactiveNode, isTracking, trackDependency } from './reactive-node';
import type { IRDependency } from './reactive-node';
import { getThemeRegistry } from './theme-registry';
import type { ExprType } from './ir/expr-types';

// ── Node cache ─────────────────────────────────────────────────────────────
// Shared cache keyed by signal path → IRReactiveNode.
// Ensures the same IRReactiveNode instance is returned for repeated accesses
// (e.g. both Button and Card reading theme.colors.primary.bg).

const nodeCache = new Map<string, IRReactiveNode>();

/** Clear the node cache between compile runs. */
export function clearThemeNodeCache(): void {
  nodeCache.clear();
}

// ── Proxy factory ──────────────────────────────────────────────────────────

/**
 * Create a deeply-nested Proxy mirroring the Theme interface shape.
 *
 * - Non-leaf access (e.g. `proxy.colors`) returns another nested proxy.
 * - Leaf access (e.g. `proxy.colors.primary.bg`) returns a `IRReactiveNode`
 *   whose signal name is `thm_colors_primary_bg`.
 * - The node is cached so repeated access returns the same instance.
 * - If accessed inside `useMemo()`, the dependency is tracked automatically.
 */
export function createReactiveThemeProxy(): unknown {
  const registry = getThemeRegistry();
  const signalPaths = registry.getSignalPaths();

  function makeProxy(prefix: string): unknown {
    return new Proxy(Object.create(null), {
      get(_target: unknown, prop: string | symbol): unknown {
        if (typeof prop === 'symbol') return undefined;

        const path = prefix ? `${prefix}_${prop}` : prop;

        // Leaf — return cached IRReactiveNode
        if (signalPaths.includes(path)) {
          return getOrCreateLeafNode(path, registry);
        }

        // Intermediate — return nested proxy if children exist
        const childPrefix = path + '_';
        if (signalPaths.some((p) => p.startsWith(childPrefix))) {
          return makeProxy(path);
        }

        return undefined;
      },
    });
  }

  return makeProxy('');
}

/**
 * Get (or create + cache) a IRReactiveNode for a theme leaf signal path.
 * Handles dependency tracking for useMemo() integration.
 */
function getOrCreateLeafNode(
  path: string,
  registry: ReturnType<typeof getThemeRegistry>,
): IRReactiveNode {
  let node = nodeCache.get(path);
  if (!node) {
    const leaf = registry.getDefaultLeaf(path);
    // valueType is already ExprType compatible; default to 'int' if unset
    const exprType = (leaf?.valueType ?? 'int') as ExprType;
    const dep: IRDependency = {
      kind: 'dependency',
      sourceId: '__theme__',
      triggerType: '__theme__',
      sourceDomain: '__theme__',
      sourceType: 'theme',
    };

    node = new IRReactiveNode({
      kind: 'expression',
      dependencies: [dep],
      exprType,
    });
    node.exprIR = { kind: 'theme_read', path, type: exprType };
    nodeCache.set(path, node);
  }

  // Track the dependency if inside useMemo() / useEffect()
  if (isTracking()) {
    trackDependency(node.dependencies[0]);
  }

  return node;
}

// ── useReactiveTheme hook ──────────────────────────────────────────────────

let cachedProxy: unknown = null;

/**
 * Access the reactive theme proxy.
 *
 * Returns a deeply-nested object whose leaf properties are `IRReactiveNode<T>`
 * instances tied to theme signal memos.  When themes change at runtime via
 * `theme.select()`, all downstream effects recalculate automatically.
 *
 * @example
 * const theme = useReactiveTheme();
 * const bg = theme.colors.primary.bg; // IRReactiveNode<lv_color_t>
 */
export function useReactiveTheme(): unknown {
  if (!cachedProxy) {
    cachedProxy = createReactiveThemeProxy();
  }
  return cachedProxy;
}

/** Reset the cached proxy between compile runs. */
export function clearReactiveThemeProxy(): void {
  cachedProxy = null;
  clearThemeNodeCache();
}
