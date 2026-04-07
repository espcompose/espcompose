import 'dotenv/config';
import { DisplayRef, secret, useRef } from '@espcompose/core';
import { UI } from './lvgl';
import { Waveshare_ESP32P4_WIFI6_Touch_LCD_10_1 } from './hardware';

function App() {
  const display = useRef<DisplayRef>();

  return (
    <esphome
      name="espcompose-demo"
      comment="An ESPHome Compose device"
    >
      <wifi ssid={secret(process.env.WIFI_SSID!)} password={secret(process.env.WIFI_PASSWORD!)} />

      <api
        encryption={{
          key: process.env.AP_ENCRYPTION
        }}
      />

      <ota
        platform="esphome"
        password={process.env.OTA_PASSWORD}
      />

      <logger level="DEBUG" hardwareUart="UART0" />

      <Waveshare_ESP32P4_WIFI6_Touch_LCD_10_1 display={display} />
      <UI display={display} />

    </esphome>
  );
}

export default <App />;
