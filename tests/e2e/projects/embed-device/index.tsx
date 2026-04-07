const deviceName = 'embed-demo';
const apiKey = 'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY=';

export default (
  <esphome
    name={deviceName}
    comment="Embed device demo"
  >
    <esp32 board="esp32dev" framework={{ type: 'arduino' }} />

    <wifi ssid="TestNetwork" password="test-password" />

    <api encryption={{ key: apiKey }} />

    <ota platform="esphome" />

    <logger level="DEBUG" />

    <sensor
      platform="adc"
      pin={36}
      name="Analog Reading"
      updateInterval="5s"
    />
  </esphome>
);
