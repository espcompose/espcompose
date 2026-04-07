/**
 * Sample project: auto-reactive-device
 *
 * Demonstrates the auto-reactive transform: reactive expressions in JSX
 * attribute values are automatically wrapped in useMemo() by the compiler.
 * Users write natural JavaScript expressions with Signal<T> values, and the
 * compiler detects them and generates the appropriate reactive bindings.
 *
 * Patterns tested:
 *   - Ternary with Signal: officeLight.isOn ? "Off" : "On"
 *   - isNaN with Signal: isNaN(officeLight.brightness) ? 0 : officeLight.brightness
 *   - Multi-source: kitchenLight.isOn && tempSensor.value > 72 ? "Comfortable" : "Adjust"
 *   - Direct passthrough: officeLight.stateText (should NOT be wrapped)
 *   - Explicit useMemo (should NOT be double-wrapped)
 */
import { DisplayRef, useRef, useHAEntity, useMemo } from '@espcompose/core';

function App() {
  const displayRef = useRef<DisplayRef>();
  const officeLight = useHAEntity('light.office');
  const tempSensor = useHAEntity('sensor.temp_inside');

  // Explicit memo (should NOT be double-wrapped by the transform)
  const explicitStatus = useMemo(
    () => officeLight.isOn ? 'Explicit On' : 'Explicit Off',
  );

  return (
    <esphome name="auto-reactive-device" comment="Auto-reactive transform demo">
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
          {/* Direct passthrough — should NOT be wrapped in useMemo */}
          <lvgl-label
            style={{ left: 10, top: 10 }}
            text={officeLight.stateText}
          />

          {/* Ternary with Signal — should be auto-wrapped */}
          <lvgl-label
            style={{ left: 10, top: 40 }}
            text={officeLight.isOn ? 'Light On' : 'Light Off'}
          />

          {/* isNaN pattern — should be auto-wrapped */}
          <lvgl-slider
            style={{ left: 10, top: 70, width: 200 }}
            value={isNaN(officeLight.brightness) ? 0 : officeLight.brightness}
          />

          {/* Multi-source ternary — should be auto-wrapped */}
          <lvgl-label
            style={{ left: 10, top: 100 }}
            text={officeLight.isOn && tempSensor.value > 72 ? 'Comfortable' : 'Adjust'}
          />

          {/* Explicit useMemo — should NOT be double-wrapped */}
          <lvgl-label
            style={{ left: 10, top: 130 }}
            text={explicitStatus}
          />
        </lvgl-page>
      </lvgl>
    </esphome>
  );
}

export default <App />;
