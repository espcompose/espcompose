import { delay, logger, defineProject, createScript } from '@esphome/compose';

// Define scripts using createScript() + action primitives
const blink = createScript(async () => {
  logger.log('Starting blink sequence');
  await delay(1000);
  logger.log('Blink done');
});

const startUp = createScript(async () => {
  logger.log('Device booting up', 'INFO');
  await delay(2000);
  logger.log('Boot complete');
});

export default defineProject({
  device: (
    <esphome name="device-script-demo" comment="Device script demo">
      <esp32 board="esp32dev" framework={{ type: 'arduino' }} />
      <wifi ssid="TestNet" password="testpass" />
      <api />
      <logger />

      <binary_sensor
        platform="gpio"
        pin={4}
        name="Button"
        onPress={async () => { await blink(); }}
        onRelease={async () => { await startUp(); }}
      />
    </esphome>
  ),
});
