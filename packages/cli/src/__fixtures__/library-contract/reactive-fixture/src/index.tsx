/**
 * Library contract fixture: reactive expressions.
 *
 * Exercises __espcompose.compiled() and __espcompose.slotted() transform paths.
 * Kept minimal — just enough to produce all reactive metadata shapes.
 */
import { useHAEntity, useMemo } from '@esphome/compose';
import type { Signal } from '@esphome/compose';

/** Component with a fully-static reactive expression (compiled path). */
export function StatusLabel() {
  const light = useHAEntity('light.office');
  const text = useMemo(() => light.isOn ? 'On' : 'Off');

  return (
    <lvgl-label text={text as unknown as string} />
  );
}

/** Component that passes a Signal through (slotted path via JSX attribute). */
export function TemperatureDisplay(props: { temp: Signal<number> }) {
  const formatted = useMemo(() => props.temp > 72 ? 'Hot' : 'Cold');

  return (
    <lvgl-label text={formatted as unknown as string} />
  );
}
