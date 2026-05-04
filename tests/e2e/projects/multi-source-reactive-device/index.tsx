/**
 * Sample project: multi-source-reactive-device
 *
 * Demonstrates the C++ reactive runtime with multi-source bindings:
 *   - useMemo() combining two HA entities into a derived text value
 *   - useMemo() with a multi-statement block body (IRFunctionExpression)
 *   - LVGL labels displaying the memo-derived status text
 */
import { DisplayRef, useRef, useHAEntity, useMemo } from '@espcompose/core';

function App() {
  const displayRef = useRef<DisplayRef>();
  const kitchenLight = useHAEntity('light.kitchen_floods');
  const tempSensor = useHAEntity('sensor.temp_inside');

  // Multi-source memo: derived status text from both entities
  const status = useMemo(
    () => kitchenLight.isOn && tempSensor.value > 72 ? 'Comfortable' : 'Adjust',
  );

  // Multi-statement memo: exercises IRFunctionExpression with local vars and control flow
  const detailedStatus = useMemo((): string => {
    const temp = tempSensor.value;
    let result = 'Unknown';
    if (temp > 80) {
      result = 'Hot';
    } else if (temp > 60) {
      result = 'Warm';
    } else {
      result = 'Cold';
    }
    return result;
  });

  return (
    <esphome name="multi-source-reactive-device" comment="Multi-source reactive runtime demo">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid="HomeWifi" password="s3cr3t!!" />
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
          {/* Status label — bound to memo-derived value from two HA entities */}
          <lvgl-label
            style={{ left: 10, top: 10 }}
            text={status}
          />

          {/* Detailed status — bound to multi-statement memo with control flow */}
          <lvgl-label
            style={{ left: 10, top: 40 }}
            text={detailedStatus}
          />
        </lvgl-page>
      </lvgl>
    </esphome>
  );
}

export default <App />;
