/**
 * Sample project: script-device
 *
 * Demonstrates named scripts via useScript() and inline trigger handlers
 * via bare arrow functions.
 */
import { useScript, delay, logger } from '@espcompose/core';

function App() {
  /** Named script: greet — logs a greeting and waits 500 ms. */
  const greet = useScript(async () => {
    logger.log('Hello from ESPCompose!');
    await delay(500);
  });

  return (
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
  );
}

export default <App />;
