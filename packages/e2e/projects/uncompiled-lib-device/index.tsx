/**
 * E2E fixture: uncompiled-lib-device
 *
 * Imports a fake pre-built library that uses bind.memo() + bind.haEntity()
 * WITHOUT being run through `espcompose transform-lib`. The compiler should
 * detect the uncompiled reactive expressions and throw a clear error.
 */
import { defineProject } from '@esphome/compose';
// @ts-expect-error — fake test library created by the E2E test at runtime
import { BadWidget } from '@test/reactive-lib';

export default defineProject({
  device: (
    <esphome name="uncompiled-lib-device" comment="Uncompiled library detection test">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <BadWidget />
    </esphome>
  ),
});
