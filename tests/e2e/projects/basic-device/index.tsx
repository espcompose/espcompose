/**
 * Sample project: basic-device
 *
 * A minimal device with core infrastructure components.
 */

export default (
  <esphome name="basic-device" comment="A basic ESPHome device">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid="HomeWifi" password="s3cr3t!!" />
      <api />
      <ota platform="esphome" />
      <logger level="DEBUG" />
    </esphome>
);
