/**
 * E2E test: secret-device
 *
 * Verifies that secret() produces !secret references in the generated YAML.
 */
import { secret } from '@espcompose/core';

export default (
  <esphome name="secret-device" comment="Device using secrets">
    <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
    <wifi ssid={secret('my_wifi_ssid')} password={secret('my_wifi_pass')} />
    <api encryption={{ key: secret('rED+EOS+LZiE4iPjZzc0DafT/etTkzVKlr+7jGljdJI=') }} />
    <ota platform="esphome" password={secret('my_ota_pass')} />
    <logger level="DEBUG" />
  </esphome>
);
