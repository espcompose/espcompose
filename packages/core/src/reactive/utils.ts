// ────────────────────────────────────────────────────────────────────────────
// reactive-utils — reactive prop utilities
//
// Helpers for normalizing reactive prop values and creating derived
// reactive nodes. These are user-facing utilities (not hooks — no phase
// assertion required).
// ────────────────────────────────────────────────────────────────────────────

import { IRReactiveNode, isIRReactiveNode } from './node';
import type { IRDependency } from './node';
import { __espcompose } from './compiler-plumbing';
import { irCall, irTernary, irBinary, irLiteralExpression } from '../ir/expr-builders';
import type { IRExpression, ExprType } from '../ir/expr-types';
import { inferExprType } from '../lvgl/theme/signals';
import type { TriggerHandler, BINDING_BRAND, EspComposeElement } from '../types';
import type { CssStyleProps } from '../lvgl/style';

// ── Reactive<T>: the reactive prop type alias ─────────────────────────────

/**
 * A prop value that can be static or a reactive node.
 * Component authors use this to declare which props support reactive binding.
 */
export type Reactive<T> = T | IRReactiveNode<T>;

// ── WidgetProps<T>: mapped type for design-system widget props ─────────────

/**
 * Maps a plain props interface into widget-ready props by wrapping each
 * property in `Reactive<T>` — except for `children`, `style`, any
 * `TriggerHandler` properties, any `BINDING_BRAND` types (bindings, refs,
 * actions), and any keys listed in `Skip`.
 *
 * A `style?: CssStyleProps` property is always included automatically —
 * component authors do not need to declare it in their base interface.
 *
 * @example
 * export type SwitchProps = WidgetProps<{
 *   label: string;
 *   value?: boolean;
 *   onChange?: TriggerHandler<{ x: boolean }>;
 *   binding: LightBinding;
 *   width?: SizeValue;
 * }>;
 * // → { label: Reactive<string>; value?: Reactive<boolean>; onChange?: TriggerHandler<…>; binding: LightBinding; width?: Reactive<SizeValue>; style?: CssStyleProps }
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type WidgetProps<T = {}, Skip extends keyof T = never> = {
  [K in keyof T]: K extends 'children' | 'style' | Skip
    ? T[K]
    : NonNullable<T[K]> extends TriggerHandler<any> // eslint-disable-line @typescript-eslint/no-explicit-any
      ? T[K]
      : NonNullable<T[K]> extends { readonly [BINDING_BRAND]?: true }
        ? T[K]
        : Reactive<NonNullable<T[K]>> | Extract<T[K], undefined>;
} & { style?: CssStyleProps };

/**
 * Convenience wrapper around `WidgetProps` that automatically includes
 * `children?: EspComposeElement | EspComposeElement[]`, mirroring React's
 * `PropsWithChildren` pattern.
 *
 * @example
 * type CardProps = WidgetPropsWithChildren<{
 *   padding?: SpacingToken;
 *   radius?: RadiusToken;
 * }>;
 * // → { padding?: Reactive<SpacingToken>; radius?: Reactive<RadiusToken>; children?: EspComposeElement | EspComposeElement[]; style?: CssStyleProps }
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type WidgetPropsWithChildren<T = {}, Skip extends keyof T = never> = WidgetProps<
  T & { children?: EspComposeElement | EspComposeElement[] },
  Skip
>;

// ── useReactive ────────────────────────────────────────────────────────────

/**
 * Normalize a prop value that may be static or a reactive node.
 *
 * - `IRReactiveNode<T>` → pass through (already compiled)
 * - `T` → literal (no reactivity)
 */
export function useReactive<T>(prop: Reactive<T>): T | IRReactiveNode<T> {
  if (isIRReactiveNode(prop)) {
    return prop as IRReactiveNode<T>;
  }
  return prop as T;
}

// ── useReactiveMap ─────────────────────────────────────────────────────────

/**
 * Compiler-injected metadata for union expansion.
 * @internal — never constructed by user code.
 */
interface UseReactiveMapCompilerMetadata<T> {
  unionMembers: T[];
}

/**
 * Map a `Reactive<T>` prop through a pure function, returning a reactive
 * result when the input is reactive.
 *
 * When `T` is a finite string literal union and the input is reactive, the
 * compiler injects `$compilerMetadata` (typed `never` to prevent user use)
 * containing union members. The runtime calls `fn` for each member and builds
 * a chained ternary `derivedMemo`.
 *
 * @example
 * export function useSpacing(value: Reactive<SpacingToken>): Signal<number> {
 *   return useReactiveMap(value, (v) => themeLeaf('spacing', v));
 * }
 */
export function useReactiveMap<T, R>(
  prop: Reactive<T>,
  fn: (value: T) => R,
  $compilerMetadata?: never,
): R {
  const resolved = useReactive(prop);
  if (isIRReactiveNode(resolved)) {
    if ($compilerMetadata !== undefined) {
      return expandReactiveUnion(resolved as IRReactiveNode, fn, $compilerMetadata as unknown as UseReactiveMapCompilerMetadata<T>);
    }
    const node = resolved as IRReactiveNode;
    const source = node.dependencies.length > 0
      ? ` (source: ${node.dependencies.map(d => d.sourceId).join(', ')})`
      : '';
    throw new Error(
      `useReactiveMap() received a reactive (Signal) input${source}. ` +
      `The mapper function cannot produce a reactive result — it evaluates once ` +
      `with a static default and freezes to a single theme/value path. ` +
      `Use separate useMemo() calls per output value instead.`,
    );
  }
  return fn(resolved as T);
}

/**
 * Build a chained ternary `derivedMemo` by evaluating `fn` for each union member.
 *
 * For members `['primary', 'secondary', 'danger']`, generates:
 * ```
 * input == 'primary' ? fn('primary')
 *   : input == 'secondary' ? fn('secondary')
 *   : fn('danger')
 * ```
 */
function expandReactiveUnion<T, R>(
  inputNode: IRReactiveNode,
  fn: (value: T) => R,
  meta: UseReactiveMapCompilerMetadata<T>,
): R {
  const { unionMembers } = meta;
  if (unionMembers.length === 0) {
    throw new Error('useReactiveMap: $compilerMetadata.unionMembers is empty.');
  }

  const inputIR = inputNode.exprIR;
  if (!inputIR) {
    throw new Error('useReactiveMap: reactive input has no exprIR — cannot build union expansion.');
  }

  // Evaluate fn for each union member, collecting results + their IR
  const branches: { member: T; result: R; exprIR: IRExpression; deps: IRDependency[] }[] = [];
  for (const member of unionMembers) {
    const result = fn(member);
    const { exprIR, deps } = extractResultIR(result, member);
    branches.push({ member, result, exprIR, deps });
  }

  // Determine exprType from the first result
  const exprType = inferResultExprType(branches[0].result);

  // Build chained ternary from back to front:
  // last branch is the fallback (no condition)
  let chain: IRExpression = branches[branches.length - 1].exprIR;
  for (let i = branches.length - 2; i >= 0; i--) {
    const b = branches[i];
    const test = irBinary('==', inputIR, irLiteralExpression(b.member as string));
    chain = irTernary(test, b.exprIR, chain);
  }

  // Merge all dependencies
  const allDeps: IRDependency[] = [...inputNode.dependencies];
  for (const b of branches) {
    for (const dep of b.deps) {
      if (!allDeps.some(d => d.sourceId === dep.sourceId && d.sourceType === dep.sourceType && d.themePath === dep.themePath)) {
        allDeps.push(dep);
      }
    }
  }

  return __espcompose.derivedMemo<R>({
    exprType,
    dependencies: allDeps,
    exprIR: chain,
  }) as unknown as R;
}

/** Extract the ExprIR and dependencies from a mapper result (IRReactiveNode or primitive). */
function extractResultIR<T>(result: unknown, member: T): { exprIR: IRExpression; deps: IRDependency[] } {
  if (result instanceof IRReactiveNode) {
    const ir = result.exprIR;
    if (!ir) {
      throw new Error(
        `useReactiveMap: fn(${JSON.stringify(member)}) returned an IRReactiveNode with no exprIR.`,
      );
    }
    return { exprIR: ir, deps: result.dependencies };
  }
  // Plain primitive — wrap as literal
  if (typeof result === 'string' || typeof result === 'number' || typeof result === 'boolean') {
    return { exprIR: irLiteralExpression(result), deps: [] };
  }
  throw new Error(
    `useReactiveMap: fn(${JSON.stringify(member)}) returned an unsupported value of type ${typeof result}. ` +
    `Expected an IRReactiveNode or a primitive (string/number/boolean).`,
  );
}

/** Infer ExprType from a mapper result. */
function inferResultExprType(result: unknown): ExprType {
  if (result instanceof IRReactiveNode) {
    if (!result.exprType) {
      throw new Error('useReactiveMap: mapper returned an IRReactiveNode with no exprType.');
    }
    return result.exprType;
  }
  return inferExprType(result) as ExprType;
}

// ── reactiveIsNaN ──────────────────────────────────────────────────────────

/**
 * Test whether a reactive numeric value is NaN.
 *
 * Returns a `IRReactiveNode<boolean>` that is `true` when the source value
 * is NaN (e.g. HA reports `None` for a numeric attribute).
 *
 * @example
 * value={useMemo(() => reactiveIsNaN(light.brightness).get() ? 0 : light.brightness.get())}
 */
export function reactiveIsNaN(node: IRReactiveNode<number>): IRReactiveNode<boolean> {
  const rawIR = node.exprIR;
  const sourceIR = rawIR ?? { kind: 'expr:literal' as const, value: 0, type: 'float' as const };
  return __espcompose.derivedMemo<boolean>({
    exprType: 'bool',
    dependencies: node.dependencies,
    exprIR: irCall('is_nan', [sourceIR]),
  });
}
