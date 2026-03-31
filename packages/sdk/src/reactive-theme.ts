// ────────────────────────────────────────────────────────────────────────────
// Reactive theme proxy — deep proxy that returns ReactiveNodes for leaves
//
// createReactiveThemeProxy() returns a deeply-nested Proxy mirroring the
// shape of the Theme interface. Leaf property access (e.g. proxy.colors.
// primary.bg) produces a cached ReactiveNode whose C++ signal name maps
// to a theme memo in the generated espcompose_bindings.h.
//
// The proxy integrates with bind.memo() dependency tracking: accessing a
// theme leaf inside a memo function body records the dependency so the
// compiler can wire the memo to the theme signal.
// ────────────────────────────────────────────────────────────────────────────

import { ReactiveNode, isTracking, trackDependency } from './reactive-node';
import type { ExpressionDependency } from './reactive-node';
import { getThemeRegistry } from './theme-registry';
import { themeSignalName } from './theme-signals';

// ── Node cache ─────────────────────────────────────────────────────────────
// Shared cache keyed by signal path → ReactiveNode.
// Ensures the same ReactiveNode instance is returned for repeated accesses
// (e.g. both Button and Card reading theme.colors.primary.bg).

const nodeCache = new Map<string, ReactiveNode>();

/** Clear the node cache between compile runs. */
export function clearThemeNodeCache(): void {
  nodeCache.clear();
}

// ── Proxy factory ──────────────────────────────────────────────────────────

/**
 * Create a deeply-nested Proxy mirroring the Theme interface shape.
 *
 * - Non-leaf access (e.g. `proxy.colors`) returns another nested proxy.
 * - Leaf access (e.g. `proxy.colors.primary.bg`) returns a `ReactiveNode`
 *   whose signal name is `thm_colors_primary_bg`.
 * - The node is cached so repeated access returns the same instance.
 * - If accessed inside `bind.memo()`, the dependency is tracked automatically.
 */
export function createReactiveThemeProxy(): unknown {
  const registry = getThemeRegistry();
  const signalPaths = registry.getSignalPaths();

  function makeProxy(prefix: string): unknown {
    return new Proxy(Object.create(null), {
      get(_target: unknown, prop: string | symbol): unknown {
        if (typeof prop === 'symbol') return undefined;

        const path = prefix ? `${prefix}_${prop}` : prop;

        // Leaf — return cached ReactiveNode
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
 * Get (or create + cache) a ReactiveNode for a theme leaf signal path.
 * Handles dependency tracking for bind.memo() integration.
 */
function getOrCreateLeafNode(
  path: string,
  registry: ReturnType<typeof getThemeRegistry>,
): ReactiveNode {
  let node = nodeCache.get(path);
  if (!node) {
    const leaf = registry.getDefaultLeaf(path);
    const cppType = leaf?.cppType ?? 'int32_t';
    const sigName = themeSignalName(path);

    const dep: ExpressionDependency = {
      sourceId: '__theme__',
      triggerType: '__theme__',
      sourceDomain: '__theme__',
      sourceType: 'theme',
      cppSignalName: sigName,
      cppType,
    };

    node = new ReactiveNode({
      kind: 'expression',
      dependencies: [dep],
      cppExpression: `${sigName}.get()`,
      cppSignalName: sigName,
      cppType,
    });
    nodeCache.set(path, node);
  }

  // Track the dependency if inside bind.memo() / bind.effect()
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
 * Returns a deeply-nested object whose leaf properties are `ReactiveNode<T>`
 * instances tied to theme signal memos.  When themes change at runtime via
 * `theme.select()`, all downstream effects recalculate automatically.
 *
 * Replaces the old `useTheme()` which returned a static `Theme` object.
 *
 * @example
 * const theme = useReactiveTheme();
 * const bg = theme.colors.primary.bg; // ReactiveNode<lv_color_t>
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
