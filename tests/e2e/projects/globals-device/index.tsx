import { useRetainedGlobal, useRef, useMemo, logger } from '@espcompose/core';
import type { DisplayRef } from '@espcompose/core';

function App() {
  const displayRef = useRef<DisplayRef>();
  const counter = useRetainedGlobal('integer', 'my-counter', { initialValue: 0 });

  // Reactive expression that reads the global — exercises BoundSignal + global_read
  const counterText = useMemo(() => `Count: ${counter.value}`);

  return (
    <esphome name="globals-demo" comment="Global variable demo">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid="TestNet" password="testpass" />
      <api />
      <logger />

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
          {/* Reactive label — reads counter.value via BoundSignal */}
          <lvgl-label text={counterText} />
        </lvgl-page>
      </lvgl>

      <binary_sensor
        platform="gpio"
        pin={4}
        name="Button"
        onPress={async () => {
          counter.set(42);
          logger.log('Counter set to 42');
        }}
      />
    </esphome>
  );
}

export default <App />;
