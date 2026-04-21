import { useGlobal, useRef, useMemo, logger } from '@espcompose/core';
import type { DisplayRef } from '@espcompose/core';

function App() {
  const displayRef = useRef<DisplayRef>();
  const scores = useGlobal('integer[]');

  // Reactive expression that reads the array length
  const countText = useMemo(() => `Items: ${scores.length}`);

  return (
    <esphome name="globals-array-demo" comment="Global array variable demo">
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
          {/* Reactive label — reads scores.length via BoundSignal */}
          <lvgl-label text={countText} />
        </lvgl-page>
      </lvgl>

      <binary_sensor
        platform="gpio"
        pin={4}
        name="Push Button"
        onPress={async () => {
          scores.push(100);
          logger.log('Pushed 100');
        }}
      />

      <binary_sensor
        platform="gpio"
        pin={15}
        name="Set Button"
        onPress={async () => {
          scores.set(0, 42);
          logger.log('Set index 0 to 42');
        }}
      />

      <binary_sensor
        platform="gpio"
        pin={16}
        name="Clear Button"
        onPress={async () => {
          scores.clear();
          logger.log('Cleared array');
        }}
      />
    </esphome>
  );
}

export default <App />;
