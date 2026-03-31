import { build, embed, defineProject } from '@esphome/compose';

// Module phase: build.run() executes at compile time in Node.js
const env = build.run(() => ({
  deviceName: 'embed-demo',
  apiKey: 'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY=',
}));

export default defineProject({
  device: (
    <esphome
      name={embed.string(env.deviceName)}
      comment="Embed device demo"
    >
      <esp32 board="esp32dev" framework={{ type: 'arduino' }} />

      <wifi ssid="TestNetwork" password="test-password" />

      <api encryption={{ key: embed.string(env.apiKey) }} />

      <ota platform="esphome" />

      <logger level="DEBUG" />

      <sensor
        platform="adc"
        pin={36}
        name="Analog Reading"
        updateInterval="5s"
      />
    </esphome>
  ),
});
