/**
 * Sample project: function-component-device
 *
 * A device composed from custom function components including a
 * fragment-returning component.
 */
import { defineProject } from '@esphome/compose';

interface WifiConfigProps {
  ssid: string;
  password: string;
}

function WifiConfig({ ssid, password }: WifiConfigProps) {
  return <wifi ssid={ssid} password={password} />;
}

function CoreInfrastructure() {
  return (
    <>
      <api />
      <ota platform="esphome" />
      <logger level="INFO" />
    </>
  );
}

export default defineProject({
  device: (
    <esphome name="component-device" comment="Device built from function components">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <WifiConfig ssid="HomeWifi" password="s3cr3t!!" />
      <CoreInfrastructure />
    </esphome>
  ),
});
