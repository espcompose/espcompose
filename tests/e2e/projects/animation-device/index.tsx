/**
 * E2E test: animation-device
 *
 * Validates the animate() action end-to-end:
 * - animate() inside useScript() generates espcompose.animate YAML action
 * - Multiple animate() calls in sequence (chained animations)
 * - Animation configuration: easing, delay, part/state selectors
 * - Script-driven animation with manual trigger
 */
import { useRef, useScript, animate, logger, createLvglWidget } from '@espcompose/core';
import type { DisplayRef } from '@espcompose/core';

/**
 * A widget component with a slide-in animation triggered by button press.
 */
const SlidePanel = createLvglWidget<{ label: string }>(
  (props) => {
    const panelRef = useRef();

    const slideIn = useScript(async () => {
      await animate(panelRef, {
        property: 'translateY',
        from: -100,
        to: 0,
        duration: '300ms',
        easing: 'ease-out',
      });
    });

    return (
      <lvgl-obj style={{ width: '100%', height: 'fit-content', display: 'flex', flexDirection: 'column', rowGap: 8, padding: 0, borderWidth: 0, backgroundOpacity: 'transparent' }}>
        <lvgl-obj ref={panelRef} style={{ width: 200, height: 100, translateY: -100 }}>
          <lvgl-label text={props.label} style={{ placeSelf: 'center' }} />
        </lvgl-obj>
        <lvgl-button
          style={{ width: 100, height: 40 }}
          onPress={() => {
            slideIn.execute();
            logger.log('Slide started');
          }}
        >
          <lvgl-label text="Slide In" style={{ placeSelf: 'center' }} />
        </lvgl-button>
      </lvgl-obj>
    );
  },
);

/**
 * A widget with chained animations: fade in then scale up.
 */
const ChainedAnimation = createLvglWidget(
  () => {
    const boxRef = useRef();

    const entrance = useScript(async () => {
      await animate(boxRef, {
        property: 'opacity',
        from: 0,
        to: 255,
        duration: '200ms',
        easing: 'ease-in',
      });
      await animate(boxRef, {
        property: 'translateY',
        from: 20,
        to: 0,
        duration: '300ms',
        easing: 'ease-out',
        delay: '50ms',
      });
    });

    return (
      <lvgl-obj style={{ width: '100%', height: 'fit-content', padding: 0, borderWidth: 0, backgroundOpacity: 'transparent' }}>
        <lvgl-obj ref={boxRef} style={{ width: 150, height: 60, opacity: 'transparent', translateY: 20 }}>
          <lvgl-label text="Chained" style={{ placeSelf: 'center' }} />
        </lvgl-obj>
        <lvgl-button
          style={{ width: 100, height: 40 }}
          onPress={() => {
            entrance.execute();
          }}
        >
          <lvgl-label text="Animate" style={{ placeSelf: 'center' }} />
        </lvgl-button>
      </lvgl-obj>
    );
  },
);

function App() {
  const displayRef = useRef<DisplayRef>();

  return (
    <esphome name="animation-device" comment="animate() E2E test">
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
          {/* Script-triggered slide animation */}
          <SlidePanel label="Welcome" />

          {/* Chained sequential animations */}
          <ChainedAnimation />
        </lvgl-page>
      </lvgl>
    </esphome>
  );
}

export default <App />;
