/**
 * Grid / GridItem — native CSS Grid layout components.
 *
 * Uses CSS-like style props that compile to ESPHome LVGL's native grid layout:
 *   layout:
 *     type: grid
 *     grid_columns: [FR(1), FR(2)]
 *     grid_rows: [FR(1), 100]
 *
 * Grid children are positioned via grid cell style props.
 */

import type { EspComposeElement, WidgetProps } from '@espcompose/core';
import { createWidgetComponent, LVGL_INTENTS } from '@espcompose/core';
import { COMPOSE_UI_INTENTS } from '../intents';
import { useSpacing } from '../hooks';
import type { SpacingToken } from '../theme/types';

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

/**
 * Column/row track definition.
 * - `'fr(n)'` — fractional unit (converted to `FR(n)` for ESPHome)
 * - `'content'` — auto-size to content (converted to `CONTENT`)
 * - number  — fixed pixel size
 * - Pre-formatted strings (`'FR(1)'`, `'SIZE_CONTENT'`) are also accepted.
 */
export type TrackSize = string | number;

type GridAlign = 'start' | 'center' | 'end' | 'stretch';
type GridContainerAlign = GridAlign | 'spaceBetween' | 'spaceAround' | 'spaceEvenly';

// ────────────────────────────────────────────────────────────────────────────
// Grid
// ────────────────────────────────────────────────────────────────────────────

type GridProps = WidgetProps<{
  children?: EspComposeElement | EspComposeElement[];
  /** Column track definitions. E.g. ['fr(1)', 'fr(2)', 200] */
  columns: TrackSize[];
  /** Row track definitions. E.g. ['fr(1)', 100] */
  rows: TrackSize[];
  /** Column gap. Token name. */
  columnGap?: SpacingToken;
  /** Row gap. Token name. */
  rowGap?: SpacingToken;
  /** Shorthand for equal column and row gap. */
  gap?: SpacingToken;
  /** Default column alignment for children. */
  alignColumns?: GridContainerAlign;
  /** Default row alignment for children. */
  alignRows?: GridContainerAlign;
}, 'columns' | 'rows'>;

/**
 * Grid — a native CSS Grid container for LVGL.
 *
 * @example
 * <Grid columns={['fr(1)', 'fr(1)']} rows={['fr(1)', 'fr(1)']}>
 *   <GridItem col={0} row={0}><Text text="Top-left" /></GridItem>
 *   <GridItem col={1} row={0}><Text text="Top-right" /></GridItem>
 *   <GridItem col={0} row={1} colSpan={2}><Text text="Full bottom" /></GridItem>
 * </Grid>
 */
export const Grid = createWidgetComponent(
  (props: GridProps): EspComposeElement => {
    const colGap = props.columnGap != null
      ? useSpacing(props.columnGap)
      : props.gap != null ? useSpacing(props.gap) : undefined;
    const rowGap = props.rowGap != null
      ? useSpacing(props.rowGap)
      : props.gap != null ? useSpacing(props.gap) : undefined;

    return (
      <lvgl-obj
        style={{
          width: props.style?.width,
          height: props.style?.height,
          backgroundColor: props.style?.backgroundColor,
          backgroundOpacity: props.style?.backgroundOpacity ?? 'transparent',
          borderWidth: props.style?.borderWidth ?? 0,
          borderColor: props.style?.borderColor,
          display: 'grid',
          gridTemplateColumns: props.columns,
          gridTemplateRows: props.rows,
          ...(colGap != null ? { columnGap: colGap } : {}),
          ...(rowGap != null ? { rowGap: rowGap } : {}),
          ...(props.alignColumns ? { justifyItems: props.alignColumns } : {}),
          ...(props.alignRows ? { alignContent: props.alignRows } : {}),
        }}
      >
        {props.children}
      </lvgl-obj>
    );
  },
  {
    allowedChildIntents: [COMPOSE_UI_INTENTS.GRID_ITEM] as const,
    contextTransparent: true as const,
  },
);

// ────────────────────────────────────────────────────────────────────────────
// GridItem
// ────────────────────────────────────────────────────────────────────────────

type GridItemProps = WidgetProps<{
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
}>;

/**
 * GridItem — positions a child within a Grid.
 *
 * @example
 * <GridItem col={0} row={0} colSpan={2}>
 *   <Text text="Spans two columns" />
 * </GridItem>
 */
export const GridItem = createWidgetComponent(
  (props: GridItemProps): EspComposeElement => {
    return (
      <lvgl-obj
        style={{
          backgroundOpacity: props.style?.backgroundOpacity ?? 'transparent',
          borderWidth: props.style?.borderWidth ?? 0,
          borderColor: props.style?.borderColor,
          gridColumn: props.col,
          gridRow: props.row,
          ...(props.colSpan != null && props.colSpan !== 1 ? { gridColumnSpan: props.colSpan } : {}),
          ...(props.rowSpan != null && props.rowSpan !== 1 ? { gridRowSpan: props.rowSpan } : {}),
          ...(props.colAlign ? { justifySelf: props.colAlign } : {}),
          ...(props.rowAlign ? { alignSelf: props.rowAlign } : {}),
        }}
      >
        {props.children}
      </lvgl-obj>
    );
  },
  {
    additionalIntents: [COMPOSE_UI_INTENTS.GRID_ITEM] as const,
    allowedChildIntents: [LVGL_INTENTS.WIDGET] as const,
    contextTransparent: true as const,
  },
);
