// ────────────────────────────────────────────────────────────────────────────
// Display environment types & adaptive helpers
//
// Hardware/environment facts about the target display.  These types are
// shared across all theme providers — any design-system library can import
// them to build display-aware themes.
//
// Adaptive helpers (`adaptiveScreen`, `adaptiveInput`, `adaptiveShape`) are
// pure map-lookup functions that resolve a value from a case map given the
// current display settings.
// ────────────────────────────────────────────────────────────────────────────

// ── Display axis types ─────────────────────────────────────────────────────

export type DisplayOrientation = 'portrait' | 'landscape' | 'square';

export type DisplayShape = 'rect' | 'round';

export type DisplayInput = 'touch' | 'rotary' | 'buttons' | 'none';

/**
 * Display size classification based on shortest side.
 *
 * | Shortest side | Class   |
 * |---------------|---------|
 * | < 128         | micro   |
 * | 128–199       | tiny    |
 * | 200–279       | compact |
 * | 280–399       | medium  |
 * | 400–599       | large   |
 * | ≥ 600         | panel   |
 */
export type DisplayClass =
  | 'micro'
  | 'tiny'
  | 'compact'
  | 'medium'
  | 'large'
  | 'panel';

// ── Settings ───────────────────────────────────────────────────────────────

/**
 * Raw display settings provided by the app author.
 *
 * All fields are optional — omitted values are filled with safe defaults
 * by {@link resolveThemeSettings}.
 */
export interface ThemeSettings {
  width?: number;
  height?: number;
  orientation?: DisplayOrientation;
  shape?: DisplayShape;
  input?: DisplayInput;
}

/**
 * Resolved display settings with derived fields.
 *
 * Produced by {@link resolveThemeSettings}.  Theme factory functions
 * receive this as their `settings` argument.
 */
export interface ResolvedThemeSettings {
  readonly width: number;
  readonly height: number;
  readonly shortestSide: number;
  readonly longestSide: number;
  readonly orientation: DisplayOrientation;
  readonly shape: DisplayShape;
  readonly input: DisplayInput;
  readonly class: DisplayClass;
}

// ── Classification ─────────────────────────────────────────────────────────

/** Classify a display by its shortest side in pixels. */
export function classifyDisplay(shortestSide: number): DisplayClass {
  if (shortestSide < 128) return 'micro';
  if (shortestSide < 200) return 'tiny';
  if (shortestSide < 280) return 'compact';
  if (shortestSide < 400) return 'medium';
  if (shortestSide < 600) return 'large';
  return 'panel';
}

// ── Resolution ─────────────────────────────────────────────────────────────

const DEFAULT_WIDTH = 320;
const DEFAULT_HEIGHT = 240;

/**
 * Normalise raw display settings into a fully-resolved settings object.
 *
 * Fills missing values with safe defaults (320×240, rect, touch).
 */
export function resolveThemeSettings(
  input?: ThemeSettings,
): ResolvedThemeSettings {
  const width = input?.width ?? DEFAULT_WIDTH;
  const height = input?.height ?? DEFAULT_HEIGHT;
  const shortestSide = Math.min(width, height);
  const longestSide = Math.max(width, height);

  let orientation: DisplayOrientation;
  if (input?.orientation) {
    orientation = input.orientation;
  } else if (width > height) {
    orientation = 'landscape';
  } else if (width < height) {
    orientation = 'portrait';
  } else {
    orientation = 'square';
  }

  return {
    width,
    height,
    shortestSide,
    longestSide,
    orientation,
    shape: input?.shape ?? 'rect',
    input: input?.input ?? 'touch',
    class: classifyDisplay(shortestSide),
  };
}

// ── Adaptive helpers ───────────────────────────────────────────────────────

/**
 * Select a value based on display size class.
 *
 * @example
 * ```ts
 * adaptiveScreen(settings, { micro: 2, compact: 3, default: 4 })
 * ```
 */
export function adaptiveScreen<T>(
  settings: ThemeSettings,
  cases: Partial<Record<DisplayClass, T>> & { default: T },
): T {
  const cls = classifyDisplay(
    Math.min(settings.width ?? DEFAULT_WIDTH, settings.height ?? DEFAULT_HEIGHT),
  );
  return cases[cls] ?? cases.default;
}

/**
 * Select a value based on input type.
 *
 * @example
 * ```ts
 * adaptiveInput(settings, { rotary: 'fullscreen', default: 'centered' })
 * ```
 */
export function adaptiveInput<T>(
  settings: ThemeSettings,
  cases: Partial<Record<DisplayInput, T>> & { default: T },
): T {
  const input = settings.input ?? 'touch';
  return cases[input] ?? cases.default;
}

/**
 * Select a value based on display shape.
 *
 * @example
 * ```ts
 * adaptiveShape(settings, { round: 24, default: 8 })
 * ```
 */
export function adaptiveShape<T>(
  settings: ThemeSettings,
  cases: Partial<Record<DisplayShape, T>> & { default: T },
): T {
  const shape = settings.shape ?? 'rect';
  return cases[shape] ?? cases.default;
}
