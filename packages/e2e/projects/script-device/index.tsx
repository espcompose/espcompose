/**
 * Sample project: script-device
 *
 * Demonstrates named scripts via createScript() and inline trigger handlers
 * via bare arrow functions.
 */
import { defineProject, createScript, delay, logger } from '@esphome/compose';

/** Named script: greet — logs a greeting and waits 500 ms. */
const greet = createScript(async () => {
  logger.log('Hello from ESPCompose!');
  await delay(500);
});

export default defineProject({
  device: (
    <esphome name="script-device" comment="Device using action tree authoring">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid="HomeWifi" password="s3cr3t!!" />
      <api />
      <logger level="INFO" />
      <binary_sensor
        platform="gpio"
        pin={4}
        name="Button"
        onPress={async () => { await greet(); }}
        onRelease={async () => { await delay(100); }}
      />
    </esphome>
  ),
});
