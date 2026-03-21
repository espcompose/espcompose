import 'dotenv/config';
import { Display, ESPCompose, useRef } from '@esphome/compose';
import { UI } from './lvgl';
import { Waveshare_ESP32P4_WIFI6_Touch_LCD_10_1 } from './hardware';

export default (() => {

  const display = useRef<Display>();

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
})();
