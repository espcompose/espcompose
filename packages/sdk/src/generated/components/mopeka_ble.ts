// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _BthomeMithermometerBleDevice } from "../bases";
import type { mopeka_ble_MopekaListener } from "../markers";
export interface MopekaBleProps extends _BthomeMithermometerBleDevice {
    /** @yamlKey show_sensors_without_sync */
    showSensorsWithoutSync?: boolean | EmbedValue<boolean>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            mopeka_ble: MopekaBleProps & ComponentProps<mopeka_ble_MopekaListener>;
        }
    }
}
