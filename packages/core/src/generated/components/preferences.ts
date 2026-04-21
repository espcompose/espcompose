// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_preferences_IntervalSyncer } from "../markers";
export interface PreferencesProps extends _CoreComponent {
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Customize the frequency in which data is flushed to the f...
     * @yamlKey flash_write_interval
     */
    flashWriteInterval?: TimePeriod;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            preferences: PreferencesProps & ComponentProps<__marker_preferences_IntervalSyncer>;
        }
    }
}
