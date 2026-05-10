/**
 * E2E test: animation-device
 *
 * Validates the useAnimation hook end-to-end:
 * - Auto-start animation generates lv_anim_t setup with lv_anim_start()
 * - Manual start/stop via AnimationController in trigger handlers
 * - Animation configuration: easing, repeat, playback, delay
 * - Multiple animations on different widgets
 */
import { useRef, useAnimation, logger, createLvglWidget } from '@espcompose/core';
import type { DisplayRef, Ref } from '@espcompose/core';

/**
 * A widget component that fades in on load via auto-start animation.
 */
const FadeInPanel = createLvglWidget<{ label: string }>(
  (props) => {
    const panelRef = useRef();

    useAnimation(panelRef, {
      property: 'opa',
      from: 0,
      to: 255,
      duration: '500ms',
      easing: 'ease-in-out',
      autoStart: true,
    });

    return (
      <lvgl-obj ref={panelRef} style={{ width: 200, height: 100, opacity: 'transparent' }}>
        <lvgl-label text={props.label} style={{ placeSelf: 'center' }} />
      </lvgl-obj>
    );
  },
);

/**
 * A widget component with a manually-controlled pulsing animation.
 * The button starts/stops a repeating opacity animation.
 */
const PulseWidget = createLvglWidget<{ target: Ref }>(
  (props) => {
    const pulse = useAnimation(props.target, {
      property: 'opa',
      from: 80,
      to: 255,
      duration: '1s',
      easing: 'ease-in-out',
      repeat: Infinity,
      playback: true,
    });

    return (
      <lvgl-button
        style={{ width: 100, height: 40 }}
        onPress={() => {
          pulse.start();
          logger.log('Pulse started');
        }}
        onLongPress={() => {
          pulse.stop();
          logger.log('Pulse stopped');
        }}
      >
        <lvgl-label text="Pulse" style={{ placeSelf: 'center' }} />
      </lvgl-button>
    );
  },
);

function App() {
  const displayRef = useRef<DisplayRef>();
  const targetRef = useRef();

  return (
    <esphome name="animation-device" comment="useAnimation E2E test">
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
        <lvgl-page>
          {/* Auto-start fade-in animation */}
          <FadeInPanel label="Welcome" />

          {/* Target widget for manual pulse animation */}
          <lvgl-obj ref={targetRef} style={{ width: 150, height: 60 }}>
            <lvgl-label text="Pulse me" style={{ placeSelf: 'center' }} />
          </lvgl-obj>

          {/* Controls that start/stop the pulse on the target */}
          <PulseWidget target={targetRef} />
        </lvgl-page>
      </lvgl>
    </esphome>
  );
}

export default <App />;
