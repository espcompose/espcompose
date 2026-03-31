/**
 * Sample project: multi-source-reactive-device
 *
 * Demonstrates the C++ reactive runtime with multi-source bindings:
 *   - bind.memo() combining two HA entities into a derived text value
 *   - bind.effect() for reactive side-effects
 *   - LVGL label displaying the memo-derived status text
 *
 * The compiler should:
 *   1. Auto-generate HA sensor imports for both entities.
 *   2. Generate espcompose_reactive.h and espcompose_bindings.h.
 *   3. Inject esphome.includes for both .h files.
 *   4. Inject on_boot calling espcompose::setup().
 *   5. Inject signal.set() + flush triggers on each HA sensor.
 *   6. Serialize the memo prop as a !lambda reading from memo_0.
 */
import { Display, defineProject, useRef, bind } from '@esphome/compose';

const displayRef = useRef<Display>();

// Bind two HA entities
const kitchenLight = bind.haEntity('light.kitchen_floods');
const tempSensor = bind.haEntity('sensor.temp_inside');

// Multi-source memo: derived status text from both entities
const status = bind.memo(
  () => kitchenLight.isOn && tempSensor.value > 72 ? 'Comfortable' : 'Adjust',
);

export default defineProject({
  device: (
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
            x={10}
            y={10}
            text={status}
          />
        </lvgl-page>
      </lvgl>
    </esphome>
  ),
});
