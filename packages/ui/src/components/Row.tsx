/**
 * Row / Col — AntD-aligned flex grid components.
 *
 * Row is a horizontal flex container (like Ant's <Row>).
 * Col wraps a child with `flex_grow` for proportional sizing (like Ant's <Col span>).
 *
 * Under the hood:
 *   Row  → <lvgl-obj layout: { type: flex, flex_flow: ROW_WRAP }>
 *   Col  → <lvgl-obj> with `flex_grow: span` on the child widget
 *
 * Gutter is emitted as `pad_column` inside the Row's layout dict and
 * optional vertical gutter as `pad_row`.
 */

import type { EspComposeElement } from '@espcompose/core';
import { createIntentComponent, LVGL_INTENTS } from '@espcompose/core';
import { COMPOSE_UI_INTENTS } from '../intents';
import { resolveSpacing } from '../theme/resolvers';
import type { SpacingToken } from '../theme/types';

// ────────────────────────────────────────────────────────────────────────────
// Row
// ────────────────────────────────────────────────────────────────────────────

type FlexAlign = 'START' | 'CENTER' | 'END' | 'SPACE_BETWEEN' | 'SPACE_AROUND' | 'SPACE_EVENLY';
type CrossAlign = 'START' | 'CENTER' | 'END' | 'STRETCH';

interface RowProps {
  children?: EspComposeElement | EspComposeElement[];
  /** Horizontal gutter (space between columns). Token or pixel value. */
  gutter?: SpacingToken | number | [SpacingToken | number, SpacingToken | number];
  /** Main-axis justify. Default: 'START'. */
  justify?: FlexAlign;
  /** Cross-axis alignment. Default: 'START'. */
  align?: CrossAlign;
  /** Whether row wraps. Default: true. */
  wrap?: boolean;
  /** Width. Default: '100%'. */
  width?: number | string;
  /** Height. */
  height?: number | string;
  /** Border width in pixels. Default: 0. */
  borderWidth?: number;
  /** Border color (hex). */
  borderColor?: string;
}

/**
 * Row — a horizontal flex container that wraps children.
 *
 * @example
 * <Row gutter="md" justify="SPACE_BETWEEN">
 *   <Col span={12}><Text text="Left" /></Col>
 *   <Col span={12}><Text text="Right" /></Col>
 * </Row>
 */
export const Row = createIntentComponent(
  (props: RowProps): EspComposeElement => {
    const wrap = props.wrap !== false;
    const flow = wrap ? 'ROW_WRAP' : 'ROW';

    // Gutter can be [horizontal, vertical] or a single value
    let padColumn: unknown;
    let padRow: unknown;
    if (Array.isArray(props.gutter)) {
      padColumn = resolveSpacing(props.gutter[0]);
      padRow = resolveSpacing(props.gutter[1]);
    } else if (props.gutter != null) {
      padColumn = resolveSpacing(props.gutter);
    }

    return (
      <lvgl-obj
        width={props.width ?? '100%'}
        height={props.height}
        bgOpa="TRANSP"
        borderWidth={props.borderWidth ?? 0}
        borderColor={props.borderColor}
        x:custom={{
          layout: {
            type: 'flex',
            flex_flow: flow,
            ...(props.justify ? { flex_align_main: props.justify } : {}),
            ...(props.align ? { flex_align_cross: props.align } : {}),
            ...(padColumn != null ? { pad_column: padColumn } : {}),
            ...(padRow != null ? { pad_row: padRow } : {}),
          },
        }}
      >
        {props.children}
      </lvgl-obj>
    );
  },
  {
    intents: [LVGL_INTENTS.WIDGET] as const,
    allowedChildIntents: [COMPOSE_UI_INTENTS.COL] as const,
    contextTransparent: true as const,
  },
);

// ────────────────────────────────────────────────────────────────────────────
// Col
// ────────────────────────────────────────────────────────────────────────────

interface ColProps {
  children?: EspComposeElement | EspComposeElement[];
  /**
   * Proportional width (flex_grow value).
   * Like AntD's `span` but using flex_grow instead of a 24-column grid.
   * A Col with span={2} takes twice the space of span={1}.
   * Default: 1.
   */
  span?: number;
  /** Width override (disables flex_grow). */
  width?: number | string;
  /** Height. */
  height?: number | string;
  /** Border width in pixels. Default: 0. */
  borderWidth?: number;
  /** Border color (hex). */
  borderColor?: string;
}

/**
 * Col — a column within a Row that uses `flex_grow` for proportional sizing.
 *
 * @example
 * <Row gutter="sm">
 *   <Col span={1}><Text text="1/3" /></Col>
 *   <Col span={2}><Text text="2/3" /></Col>
 * </Row>
 */
export const Col = createIntentComponent(
  (props: ColProps): EspComposeElement => {
    const span = props.span ?? 1;

    return (
      <lvgl-obj
        bgOpa="TRANSP"
        borderWidth={props.borderWidth ?? 0}
        borderColor={props.borderColor}
        width={props.width}
        height={props.height}
        x:custom={{ flex_grow: span }}
      >
        {props.children}
      </lvgl-obj>
    );
  },
  {
    intents: [COMPOSE_UI_INTENTS.COL, LVGL_INTENTS.WIDGET] as const,
    allowedChildIntents: [LVGL_INTENTS.WIDGET] as const,
    contextTransparent: true as const,
  },
);
