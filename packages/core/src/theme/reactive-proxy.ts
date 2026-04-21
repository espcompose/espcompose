// ────────────────────────────────────────────────────────────────────────────
// Reactive theme proxy — deep proxy that returns IRReactiveNodes for leaves
//
// createReactiveThemeProxy(scope) returns a deeply-nested Proxy mirroring
// the shape of a scoped Theme interface. Leaf property access (e.g.
// proxy.colors.primary.bg) produces a cached IRReactiveNode whose C++
// signal name maps to a theme memo in the generated espcompose_bindings.h.
//
// Each theme scope gets its own proxy instance.  Cross-scope reads are
// supported: useTheme('lcars') returns the proxy for the 'lcars' scope.
//
// The proxy integrates with useMemo() dependency tracking: accessing a
// theme leaf inside a memo function body records the dependency so the
// compiler can wire the memo to the theme signal.
// ────────────────────────────────────────────────────────────────────────────

import { IRReactiveNode, isTracking, trackDependency } from '../reactive-node';
import type { IRDependency } from '../reactive-node';
import { getThemeRegistry } from './registry';
import { scopeHash } from './scope-hash';
import type { ExprType } from '../ir/expr-types';

// ── Node cache ─────────────────────────────────────────────────────────────
// Shared cache keyed by `scopeId_leafPath` → IRReactiveNode.
// Ensures the same IRReactiveNode instance is returned for repeated accesses
// (e.g. both Button and Card reading theme.colors.primary.bg in same scope).

const nodeCache = new Map<string, IRReactiveNode>();

/** Clear the node cache between compile runs. */
export function clearThemeNodeCache(): void {
  nodeCache.clear();
}

// ── Proxy factory ──────────────────────────────────────────────────────────

/**
 * Create a deeply-nested Proxy mirroring a scoped Theme interface shape.
 *
 * - Non-leaf access (e.g. `proxy.colors`) returns another nested proxy.
 * - Leaf access (e.g. `proxy.colors.primary.bg`) returns a `IRReactiveNode`
 *   whose signal name is `thm_<scopeId>_colors_primary_bg`.
 * - The node is cached so repeated access returns the same instance.
 * - If accessed inside `useMemo()`, the dependency is tracked automatically.
 */
export function createReactiveThemeProxy(scope: string): unknown {
  const registry = getThemeRegistry();
  const signalPaths = registry.getSignalPaths(scope);
  const sid = scopeHash(scope);

  function makeProxy(prefix: string): unknown {
    return new Proxy(Object.create(null), {
      get(_target: unknown, prop: string | symbol): unknown {
        if (typeof prop === 'symbol') return undefined;

        const path = prefix ? `${prefix}_${prop}` : prop;

        // Leaf — return cached IRReactiveNode
        if (signalPaths.includes(path)) {
          return getOrCreateLeafNode(scope, sid, path, registry);
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
  scope: string,
  scopeId: string,
  path: string,
  registry: ReturnType<typeof getThemeRegistry>,
): IRReactiveNode {
  const cacheKey = `${scopeId}_${path}`;
  let node = nodeCache.get(cacheKey);
  if (!node) {
    const leaf = registry.getDefaultLeaf(scope, path);
    // valueType is already ExprType compatible; default to 'int' if unset
    const exprType = (leaf?.valueType ?? 'int') as ExprType;
    const dep: IRDependency = {
      kind: 'dependency',
      sourceId: `__theme_${scopeId}__`,
      triggerType: '__theme__',
      sourceDomain: '__theme__',
      sourceType: 'theme',
    };

    node = new IRReactiveNode({
      kind: 'expression',
      dependencies: [dep],
      exprType,
    });
    node.exprIR = { kind: 'theme_read', scope, scopeId, path, type: exprType };
    nodeCache.set(cacheKey, node);
  }

  // Track the dependency if inside useMemo() / useEffect()
  if (isTracking()) {
    trackDependency(node.dependencies[0]);
  }

  return node;
}

// ── useTheme hook ──────────────────────────────────────────────────────────

const cachedProxies = new Map<string, unknown>();

/**
 * Access the reactive theme proxy for a given scope.
 *
 * Returns a deeply-nested object whose leaf properties are `IRReactiveNode<T>`
 * instances tied to scoped theme signal memos.  When themes change at runtime
 * via `theme.select(scope, name)`, all downstream effects for that scope
 * recalculate automatically.
 *
 * @param scope — theme scope identifier (e.g. 'espcompose:ui', 'lcars')
 *
 * @example
 * const thm = useTheme('espcompose:ui');
 * const bg = thm.colors.primary.bg; // IRReactiveNode<lv_color_t>
 */
export function useTheme<T>(scope: string): T {
  let proxy = cachedProxies.get(scope);
  if (!proxy) {
    proxy = createReactiveThemeProxy(scope);
    cachedProxies.set(scope, proxy);
  }
  return proxy as T;
}

/** Reset all cached proxies between compile runs. */
export function clearReactiveThemeProxy(): void {
  cachedProxies.clear();
  clearThemeNodeCache();
}
