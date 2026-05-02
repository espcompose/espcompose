/**
 * Zod schemas for ESPCompose AST-emitted metadata.
 *
 * These schemas define the exact shape of metadata emitted by the CLI's
 * AST transformers and consumed by the SDK at runtime. They serve as a
 * machine-readable contract between the two sides.
 */

import { z } from 'zod';

// ── Reactive expression metadata ───────────────────────────────────────────

/** ExprType enum values. */
const ExprTypeSchema = z.enum(['int', 'float', 'string', 'bool', 'color', 'font_ref']);

/** Single dependency in a compiled reactive expression. */
export const DependencyInfoSchema = z.object({
  sourceId: z.string(),
  sourceDomain: z.string().optional(),
  sourceType: z.string(),
  themePath: z.string().optional(),
});

/** Metadata for `__espcompose.compiled()` calls. */
export const CompiledReactiveSchema = z.object({
  type: ExprTypeSchema,
  deps: z.array(DependencyInfoSchema),
  expr: z.unknown(),
});

/** Metadata for `__espcompose.slotted()` calls. */
export const SlottedReactiveSchema = z.object({
  type: ExprTypeSchema,
  slots: z.number().int().nonnegative(),
  expr: z.unknown(),
});

// ── Action/script metadata ─────────────────────────────────────────────────

/** Metadata attached to trigger handler functions via Object.assign. */
export const CompiledActionsMetaSchema = z.object({
  __compiledActions: z.array(z.unknown()),
  __refBindings: z.record(z.unknown()).optional(),
});

/** Metadata attached to useScript() functions via Object.assign. */
export const CompiledScriptMetaSchema = z.object({
  __compiledScript: z.object({
    id: z.string(),
    then: z.array(z.unknown()),
  }),
  __refBindings: z.record(z.unknown()).optional(),
});

// ── Inferred types ─────────────────────────────────────────────────────────

export type DependencyInfoShape = z.infer<typeof DependencyInfoSchema>;
export type CompiledReactiveShape = z.infer<typeof CompiledReactiveSchema>;
export type SlottedReactiveShape = z.infer<typeof SlottedReactiveSchema>;
export type CompiledActionsMetaShape = z.infer<typeof CompiledActionsMetaSchema>;
export type CompiledScriptMetaShape = z.infer<typeof CompiledScriptMetaSchema>;
