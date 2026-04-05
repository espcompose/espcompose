/**
 * E2E fixture: uncompiled-lib-device
 *
 * Imports a fake pre-built library that uses useMemo() + useHAEntity()
 * WITHOUT being run through `espcompose build --library`. The compiler should
 * detect the uncompiled reactive expressions and throw a clear error.
 */
// @ts-expect-error — fake test library created by the E2E test at runtime
import { BadWidget } from '@test/reactive-lib';

export default (
  <esphome name="uncompiled-lib-device" comment="Uncompiled library detection test">
    <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
    <BadWidget />
  </esphome>
);
