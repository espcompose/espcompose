/**
 * Sample project: function-component-device
 *
 * A device composed from custom function components including a
 * fragment-returning component.
 */
import { createEspHomeComponent } from '@espcompose/core';

interface WifiConfigProps {
  ssid: string;
  password: string;
}

const WifiConfig = createEspHomeComponent(
  ({ ssid, password }: WifiConfigProps) => {
    return <wifi ssid={ssid} password={password} />;
  },
);

const CoreInfrastructure = createEspHomeComponent(
  () => {
    return (
      <>
        <api />
        <ota platform="esphome" />
        <logger level="INFO" />
      </>
    );
  },
);

export default (
    <esphome name="component-device" comment="Device built from function components">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <WifiConfig ssid="HomeWifi" password="s3cr3t!!" />
      <CoreInfrastructure />
    </esphome>
);
