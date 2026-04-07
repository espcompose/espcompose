/**
 * Sample project: sensor-device
 *
 * A device with multiple sensor and binary_sensor sections.
 */

export default (
    <esphome name="sensor-device">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid="HomeWifi" password="s3cr3t!!" />
      <sensor
        platform="dht"
        pin={4}
        model="DHT22"
        temperature={{ name: 'Temperature' }}
        humidity={{ name: 'Humidity' }}
      />
      <binary_sensor
        platform="gpio"
        pin={5}
        name="Motion Sensor"
        deviceClass="motion"
      />
      <logger level="INFO" />
    </esphome>
);
