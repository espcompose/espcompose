/**
 * E2E fixture: library-contract-device
 *
 * Imports a properly compiled library (with __espcompose_format__ marker
 * and pre-compiled __espcompose.compiled() calls) and uses its component.
 * This verifies the full pipeline: library compilation → project consumption.
 */
// @ts-expect-error — fake test library created by the E2E test at runtime
import { StatusSensor } from '@test/compiled-lib';

export default (
  <esphome name="library-contract-device" comment="Compiled library consumption test">
    <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
    <wifi ssid="HomeWifi" password="s3cr3t!!" />
    <api />
    <logger level="DEBUG" />
    <StatusSensor />
  </esphome>
);
