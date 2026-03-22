/**
 * Grid / GridItem — native CSS Grid layout components.
 *
 * Uses ESPHome LVGL's native grid layout:
 *   layout:
 *     type: grid
 *     grid_columns: [FR(1), FR(2)]
 *     grid_rows: [FR(1), 100]
 *
 * Grid children are positioned via grid_cell_* properties.
 */

import type { EspComposeElement } from '@esphome/compose';
import { createIntentComponent, LVGL_INTENTS } from '@esphome/compose';
import { COMPOSE_UI_INTENTS } from '../intents';
import { resolveSpacing } from '../theme/resolvers';
import type { SpacingToken } from '../theme/types';

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

/**
 * Column/row track definition.
 * - `FR(n)` — fractional unit (string, passed through to ESPHome)
 * - number  — fixed pixel size
 * - 'SIZE_CONTENT' — auto-size to content
 */
export type TrackSize = string | number;

type GridAlign = 'START' | 'CENTER' | 'END' | 'STRETCH';

// ────────────────────────────────────────────────────────────────────────────
// Grid
// ────────────────────────────────────────────────────────────────────────────

interface GridProps {
  children?: EspComposeElement | EspComposeElement[];
  /** Column track definitions. E.g. ['FR(1)', 'FR(2)', 200] */
  columns: TrackSize[];
  /** Row track definitions. E.g. ['FR(1)', 100] */
  rows: TrackSize[];
  /** Column gap. Token or pixels. */
  columnGap?: SpacingToken | number;
  /** Row gap. Token or pixels. */
  rowGap?: SpacingToken | number;
  /** Shorthand for equal column and row gap. */
  gap?: SpacingToken | number;
  /** Default column alignment for children. */
  alignColumns?: GridAlign;
  /** Default row alignment for children. */
  alignRows?: GridAlign;
  /** Width. */
  width?: number | string;
  /** Height. */
  height?: number | string;
  /** Background color. */
  bgColor?: string;
  /** Background opacity. */
  bgOpa?: 'TRANSP' | 'COVER';
  /** Border width in pixels. Default: 0. */
  borderWidth?: number;
  /** Border color (hex). */
  borderColor?: string;
}

/**
 * Grid — a native CSS Grid container for LVGL.
 *
 * @example
 * <Grid columns={['FR(1)', 'FR(1)']} rows={['FR(1)', 'FR(1)']}>
 *   <GridItem col={0} row={0}><Text text="Top-left" /></GridItem>
 *   <GridItem col={1} row={0}><Text text="Top-right" /></GridItem>
 *   <GridItem col={0} row={1} colSpan={2}><Text text="Full bottom" /></GridItem>
 * </Grid>
 */
export const Grid = createIntentComponent(
  (props: GridProps): EspComposeElement => {
    const colGap = props.columnGap != null
      ? resolveSpacing(props.columnGap)
      : props.gap != null ? resolveSpacing(props.gap) : undefined;
    const rowGap = props.rowGap != null
      ? resolveSpacing(props.rowGap)
      : props.gap != null ? resolveSpacing(props.gap) : undefined;

    return {
      type: 'lvgl-obj',
      props: {
        ...(props.width != null ? { width: props.width } : {}),
        ...(props.height != null ? { height: props.height } : {}),
        ...(props.bgColor != null ? { bgColor: props.bgColor } : {}),
        ...(props.bgOpa != null ? { bgOpa: props.bgOpa } : { bgOpa: 'TRANSP' }),
        borderWidth: props.borderWidth ?? 0,
        ...(props.borderColor != null ? { borderColor: props.borderColor } : {}),
        'x:custom': {
          layout: {
            type: 'grid',
            grid_columns: props.columns,
            grid_rows: props.rows,
            ...(colGap != null ? { pad_column: colGap } : {}),
            ...(rowGap != null ? { pad_row: rowGap } : {}),
            ...(props.alignColumns ? { grid_column_align: props.alignColumns } : {}),
            ...(props.alignRows ? { grid_row_align: props.alignRows } : {}),
          },
        },
        ...(props.children
          ? { children: Array.isArray(props.children) ? props.children : [props.children] }
          : {}),
      },
    };
  },
  {
    intents: [LVGL_INTENTS.WIDGET] as const,
    allowedChildIntents: [COMPOSE_UI_INTENTS.GRID_ITEM] as const,
    contextTransparent: true as const,
  },
);

// ────────────────────────────────────────────────────────────────────────────
// GridItem
// ────────────────────────────────────────────────────────────────────────────

interface GridItemProps {
  children?: EspComposeElement | EspComposeElement[];
  /** Column position (0-based). */
  col: number;
  /** Row position (0-based). */
  row: number;
  /** Number of columns to span. Default: 1. */
  colSpan?: number;
  /** Number of rows to span. Default: 1. */
  rowSpan?: number;
  /** Column alignment override. */
  colAlign?: GridAlign;
  /** Row alignment override. */
  rowAlign?: GridAlign;
  /** Border width in pixels. Default: 0. */
  borderWidth?: number;
  /** Border color (hex). */
  borderColor?: string;
}

/**
 * GridItem — positions a child within a Grid.
 *
 * @example
 * <GridItem col={0} row={0} colSpan={2}>
 *   <Text text="Spans two columns" />
 * </GridItem>
 */
export const GridItem = createIntentComponent(
  (props: GridItemProps): EspComposeElement => {
    return {
      type: 'lvgl-obj',
      props: {
        bgOpa: 'TRANSP',
        borderWidth: props.borderWidth ?? 0,
        ...(props.borderColor != null ? { borderColor: props.borderColor } : {}),
        'x:custom': {
          grid_cell_column_pos: props.col,
          grid_cell_row_pos: props.row,
          ...(props.colSpan != null && props.colSpan !== 1 ? { grid_cell_column_span: props.colSpan } : {}),
          ...(props.rowSpan != null && props.rowSpan !== 1 ? { grid_cell_row_span: props.rowSpan } : {}),
          ...(props.colAlign ? { grid_cell_x_align: props.colAlign } : {}),
          ...(props.rowAlign ? { grid_cell_y_align: props.rowAlign } : {}),
        },
        ...(props.children
          ? { children: Array.isArray(props.children) ? props.children : [props.children] }
          : {}),
      },
    };
  },
  {
    intents: [COMPOSE_UI_INTENTS.GRID_ITEM, LVGL_INTENTS.WIDGET] as const,
    allowedChildIntents: [LVGL_INTENTS.WIDGET] as const,
    contextTransparent: true as const,
  },
);
