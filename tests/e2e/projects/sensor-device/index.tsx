/**
 * Sample project: sensor-device
 *
 * Consolidated device covering core infrastructure (basic-device),
 * multi-output and binary sensors (sensor-device), ADC sensors with
 * variable embedding and API encryption (embed-device).
 */

const deviceName = 'sensor-device';
const apiKey = 'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY=';

export default (
    <esphome name={deviceName} comment="Consolidated sensor device">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid="HomeWifi" password="s3cr3t!!" />
      <api encryption={{ key: apiKey }} />
      <ota platform="esphome" />
      <logger level="INFO" />
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
      <sensor
        platform="adc"
        pin={36}
        name="Analog Reading"
        updateInterval="5s"
      />
    </esphome>
);
