/**
 * Sample project: function-component-device
 *
 * A device composed from custom function components including a
 * fragment-returning component.
 */
import { createComponent } from '@espcompose/core';

interface WifiConfigProps {
  ssid: string;
  password: string;
}

const WifiConfig = createComponent(
  ({ ssid, password }: WifiConfigProps) => {
    return <wifi ssid={ssid} password={password} />;
  },
  {
    intents: ['esphome:infrastructure'] as const,
    allowedChildIntents: undefined,
  },
);

const CoreInfrastructure = createComponent(
  () => {
    return (
      <>
        <api />
        <ota platform="esphome" />
        <logger level="INFO" />
      </>
    );
  },
  {
    intents: ['esphome:infrastructure'] as const,
    allowedChildIntents: undefined,
  },
);

export default (
    <esphome name="component-device" comment="Device built from function components">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <WifiConfig ssid="HomeWifi" password="s3cr3t!!" />
      <CoreInfrastructure />
    </esphome>
);
