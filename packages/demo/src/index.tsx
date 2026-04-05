import 'dotenv/config';
import { DisplayRef, useRef } from '@espcompose/core';
import { UI } from './lvgl';
import { Waveshare_ESP32P4_WIFI6_Touch_LCD_10_1 } from './hardware';

function App() {
  const display = useRef<DisplayRef>();

  return (
    <esphome
      name="espcompose-demo"
      comment="An ESPHome Compose device"
    >
      <wifi ssid={process.env.WIFI_SSID} password={process.env.WIFI_PASSWORD} />

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
