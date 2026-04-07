/**
 * Spinner component — themed loading indicator.
 *
 * Wraps `<lvgl-spinner>` with design system tokens: status color for the
 * spinning arc, size presets, and proper time unit handling.
 *
 * The underlying `spinTime` ESPHome property requires a time string
 * (e.g. "1000ms"). This component accepts a numeric `duration` in
 * milliseconds and converts it automatically.
 */

import type { EspComposeElement, WidgetProps } from '@espcompose/core';
import { createWidgetComponent, useReactiveMap } from '@espcompose/core';
import { useStatus } from '../hooks';
import type { SizeToken, StatusToken } from '../theme/types';

/** Mapping from SizeToken to default spinner pixel dimensions. */
const SPINNER_SIZE: Record<SizeToken, number> = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

/** Mapping from SizeToken to arc thickness. */
const SPINNER_ARC_WIDTH: Record<SizeToken, number> = {
  xs: 3,
  sm: 4,
  md: 5,
  lg: 6,
  xl: 8,
};

export type SpinnerProps = WidgetProps<{
  /** Status color token for the spinning arc. Default: 'primary'. */
  status?: StatusToken;
  /** Size preset. Default: 'md'. */
  size?: SizeToken;
  /** Arc sweep length in degrees. Default: 60. */
  arcLength?: number;
  /** Spin duration in milliseconds. Default: 1000. */
  duration?: number;
}, 'arcLength' | 'duration'>;

/**
 * Spinner — a themed loading spinner.
 *
 * @example
 * <Spinner />
 * <Spinner status="success" size="lg" duration={800} />
 */
export const Spinner = createWidgetComponent(
  (props: SpinnerProps): EspComposeElement => {
    const sc = useStatus(props.status ?? 'primary');
    const px = useReactiveMap(props.size ?? 'md', (v) => SPINNER_SIZE[v]);
    const arcWidth = useReactiveMap(props.size ?? 'md', (v) => SPINNER_ARC_WIDTH[v]);
    const arcLength = props.arcLength ?? 60;
    const spinTime = `${props.duration ?? 1000}ms`;

    return (
      <lvgl-spinner
        arcLength={arcLength}
        // @ts-expect-error spinTime typed as number but ESPHome requires time unit string
        spinTime={spinTime}
        style={{
          width: props.style?.width ?? px,
          height: props.style?.height ?? px,
          arcStrokeWidth: arcWidth,
          arcOpacity: 'transparent',
          indicator: {
            arcColor: sc.bg,
            arcStrokeWidth: arcWidth,
          },
        }}
      />
    );
  },
);
