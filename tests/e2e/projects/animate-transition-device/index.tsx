/**
 * E2E test: animate-transition-device
 *
 * Validates `useAnimateTransition()` hook end-to-end:
 * - Reactive binding on a numeric style property (translateY)
 * - useAnimateTransition() contributing lv_anim_t animation metadata
 * - Direction guard ('decrease' — only animate when value decreases)
 * - C++ output: exec callback, lv_anim_t initialization, direction guard
 */
import { useRef, useAnimateTransition, useHAEntity, useMemo, createLvglWidget } from '@espcompose/core';
import type { DisplayRef } from '@espcompose/core';

/**
 * A panel that animates its translateY when a sensor value decreases.
 */
const AnimatedPanel = createLvglWidget<{ text: string }>(
  (props) => {
    const panelRef = useRef();
    const sensor = useHAEntity('sensor.position');

    // Drive translateY from sensor value
    const yOffset = useMemo(() => sensor.value);

    useAnimateTransition(panelRef, 'translateY', {
      duration: '300ms',
      easing: 'ease-out',
      direction: 'decrease',
    });

    return (
      <lvgl-obj
        ref={panelRef}
        style={{
          width: '100%',
          height: 80,
          backgroundColor: '#4CAF50',
          translateY: yOffset,
        }}
      >
        <lvgl-label text={props.text} style={{ placeSelf: 'center' }} />
      </lvgl-obj>
    );
  },
);

/**
 * A panel that always animates opacity changes (direction: 'both').
 */
const AlwaysAnimatedPanel = createLvglWidget<{ text: string }>(
  (props) => {
    const panelRef = useRef();
    const sensor = useHAEntity('sensor.brightness');

    const padValue = useMemo(() => sensor.value);

    useAnimateTransition(panelRef, 'paddingTop', {
      duration: '500ms',
      easing: 'ease-in-out',
    });

    return (
      <lvgl-obj
        ref={panelRef}
        style={{
          width: '100%',
          height: 80,
          backgroundColor: '#2196F3',
          paddingTop: padValue,
        }}
      >
        <lvgl-label text={props.text} style={{ placeSelf: 'center', color: '#FFFFFF' }} />
      </lvgl-obj>
    );
  },
);

function App() {
  const displayRef = useRef<DisplayRef>();
  return (
    <esphome name="animate-transition-device">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid="TestWifi" password="testpass" />
      <api />
      <logger level="DEBUG" />

      <spi clkPin={18} mosiPin={23} />
      <display
        platform="ili9xxx"
        ref={displayRef}
        model="ILI9341"
        invertColors={false}
        csPin={5}
        dcPin={27}
        resetPin={33}
      />

      <lvgl displays={[displayRef]}>
        <lvgl-page style={{ display: 'flex', flexDirection: 'column', rowGap: 16, padding: 16 }}>
          <AnimatedPanel text="Decrease Only" />
          <AlwaysAnimatedPanel text="Always Animate" />
        </lvgl-page>
      </lvgl>
    </esphome>
  );
}

export default <App />;
