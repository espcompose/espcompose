/**
 * Row / Col — AntD-aligned flex grid components.
 *
 * Row is a horizontal flex container (like Ant's <Row>).
 * Col wraps a child with `flexGrow` for proportional sizing (like Ant's <Col span>).
 *
 * Under the hood:
 *   Row  → <lvgl-obj> with flex layout via CSS-like style props
 *   Col  → <lvgl-obj> with `flexGrow: span` in style
 *
 * Gutter is emitted as `columnGap` / `rowGap` in the Row's style.
 */

import type { WidgetPropsWithChildren } from '@espcompose/core';
import { createLvglLayoutWidget } from '@espcompose/core';
import { COMPOSE_UI_INTENTS } from '../intents';
import { useSpacing } from '../hooks';
import type { SpacingToken } from '../theme/types';

// ────────────────────────────────────────────────────────────────────────────
// Row
// ────────────────────────────────────────────────────────────────────────────

type FlexAlign = 'start' | 'center' | 'end' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly';
type CrossAlign = 'start' | 'center' | 'end' | 'stretch';

type RowProps = WidgetPropsWithChildren<{
  /** Horizontal gutter (space between columns). Token or tuple of [horizontal, vertical] tokens. */
  gutter?: SpacingToken | [SpacingToken, SpacingToken];
  /** Main-axis justify. Default: 'start'. */
  justify?: FlexAlign;
  /** Cross-axis alignment. Default: 'start'. */
  align?: CrossAlign;
  /** Whether row wraps. Default: true. */
  wrap?: boolean;
}, 'gutter'>;

type ColProps = WidgetPropsWithChildren<{
  /**
   * Proportional width (flexGrow value).
   * Like AntD's `span` but using flexGrow instead of a 24-column grid.
   * A Col with span={2} takes twice the space of span={1}.
   * Default: 1.
   */
  span?: number;
}>;

/**
 * Row — a horizontal flex container that wraps children.
 *
 * @example
 * <Row gutter="md" justify="SPACE_BETWEEN">
 *   <Col span={12}><Text text="Left" /></Col>
 *   <Col span={12}><Text text="Right" /></Col>
 * </Row>
 */
export const [Row, Col] = createLvglLayoutWidget(
  COMPOSE_UI_INTENTS.COL,
  (props: RowProps) => {
    const wrap = props.wrap !== false;
    const flexDir = wrap ? 'row-wrap' as const : 'row' as const;

    // Gutter can be [horizontal, vertical] or a single value
    let padColumn: ReturnType<typeof useSpacing> | undefined;
    let padRow: ReturnType<typeof useSpacing> | undefined;
    if (Array.isArray(props.gutter)) {
      padColumn = useSpacing(props.gutter[0]);
      padRow = useSpacing(props.gutter[1]);
    } else if (props.gutter != null) {
      padColumn = useSpacing(props.gutter);
    }

    return (
      <lvgl-obj
          style={{
            width: props.style?.width ?? '100%',
            height: props.style?.height ?? 'fit-content',
            backgroundOpacity: props.style?.backgroundOpacity ?? 'transparent',
            borderWidth: props.style?.borderWidth ?? 0,
            borderColor: props.style?.borderColor,
            display: 'flex',
            flexDirection: flexDir,
            ...(props.justify ? { justifyContent: props.justify } : {}),
            ...(props.align ? { alignItems: props.align } : {}),
            ...(padColumn != null ? { columnGap: padColumn } : {}),
            ...(padRow != null ? { rowGap: padRow } : {}),
          }}
        >
          {props.children}
        </lvgl-obj>
    );
  },
  (props: ColProps) => {
    const span = props.span ?? 1;

    return (
      <lvgl-obj
        style={{
          backgroundOpacity: props.style?.backgroundOpacity ?? 'transparent',
          borderWidth: props.style?.borderWidth ?? 0,
          borderColor: props.style?.borderColor,
          width: props.style?.width,
          height: props.style?.height,
          flexGrow: span,
        }}
      >
        {props.children}
      </lvgl-obj>
    );
  },
);
