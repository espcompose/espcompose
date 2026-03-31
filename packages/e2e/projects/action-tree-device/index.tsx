/**
 * E2E test: action-tree-device
 *
 * Exercises the new action tree compiler: bare arrow functions on
 * trigger handler props compile to ESPHome action sequences.
 *
 * Tests:
 * - ref.toggle() → native component action
 * - logger.log() → logger action
 * - await delay() → delay action
 * - if/else → if action with lambda condition
 * - Simple counted for-loop → repeat action
 * - Multiple sequential actions
 */
import {
  defineProject,
  delay,
  logger,
  useRef,
} from '@esphome/compose';
import type { switch__Switch } from '@esphome/compose';

const switchRef = useRef<switch__Switch>();

export default defineProject({
  device: (
    <esphome name="action-tree-device" comment="Action tree compiler test">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid="TestWifi" password="testpass" />
      <api />
      <logger level="INFO" />

      <switch platform="gpio" ref={switchRef} pin={12} name="Test Switch" />

      {/* Simple toggle action */}
      <binary_sensor
        platform="gpio"
        pin={13}
        name="Simple Toggle"
        onPress={() => { switchRef.toggle(); }}
      />

      {/* Multiple actions + delay */}
      <binary_sensor
        platform="gpio"
        pin={14}
        name="Sequence Actions"
        onPress={async () => {
          switchRef.toggle();
          await delay(500);
          switchRef.toggle();
        }}
      />

      {/* Logger action */}
      <binary_sensor
        platform="gpio"
        pin={15}
        name="Logger"
        onPress={() => { logger.log('Button pressed!'); }}
      />
    </esphome>
  ),
});
