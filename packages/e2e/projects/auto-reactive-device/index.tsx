/**
 * Sample project: auto-reactive-device
 *
 * Demonstrates the auto-reactive transform: reactive expressions in JSX
 * attribute values are automatically wrapped in bind.memo() by the compiler.
 * Users write natural JavaScript expressions with Signal<T> values, and the
 * compiler detects them and generates the appropriate reactive bindings.
 *
 * The compiler should:
 *   1. Auto-detect Signal<T> usage in JSX attribute expressions.
 *   2. Auto-wrap them in bind.memo() during the transform phase.
 *   3. Generate identical YAML output as if bind.memo() were written manually.
 *
 * Patterns tested:
 *   - Ternary with Signal: officeLight.isOn ? "Off" : "On"
 *   - isNaN with Signal: isNaN(officeLight.brightness) ? 0 : officeLight.brightness
 *   - Multi-source: kitchenLight.isOn && tempSensor.value > 72 ? "Comfortable" : "Adjust"
 *   - Direct passthrough: officeLight.stateText (should NOT be wrapped)
 *   - Explicit bind.memo (should NOT be double-wrapped)
 */
import { Display, defineProject, useRef, bind } from '@esphome/compose';

const displayRef = useRef<Display>();

// Bind HA entities
const officeLight = bind.haEntity('light.office');
const tempSensor = bind.haEntity('sensor.temp_inside');

// Explicit memo (should NOT be double-wrapped by the transform)
const explicitStatus = bind.memo(
  () => officeLight.isOn ? 'Explicit On' : 'Explicit Off',
);

export default defineProject({
  device: (
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
          {/* Direct passthrough — should NOT be wrapped in bind.memo */}
          <lvgl-label
            x={10}
            y={10}
            text={officeLight.stateText}
          />

          {/* Ternary with Signal — should be auto-wrapped */}
          <lvgl-label
            x={10}
            y={40}
            text={officeLight.isOn ? 'Light On' : 'Light Off'}
          />

          {/* isNaN pattern — should be auto-wrapped */}
          <lvgl-slider
            x={10}
            y={70}
            width={200}
            value={isNaN(officeLight.brightness) ? 0 : officeLight.brightness}
          />

          {/* Multi-source ternary — should be auto-wrapped */}
          <lvgl-label
            x={10}
            y={100}
            text={officeLight.isOn && tempSensor.value > 72 ? 'Comfortable' : 'Adjust'}
          />

          {/* Explicit bind.memo — should NOT be double-wrapped */}
          <lvgl-label
            x={10}
            y={130}
            text={explicitStatus}
          />
        </lvgl-page>
      </lvgl>
    </esphome>
  ),
});
