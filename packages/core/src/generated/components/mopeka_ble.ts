// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _BthomeMithermometerBleDevice } from "../bases";
import type { __marker_mopeka_ble_MopekaListener } from "../markers";
export interface MopekaBleProps extends _BthomeMithermometerBleDevice {
    /** @yamlKey show_sensors_without_sync */
    showSensorsWithoutSync?: boolean;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            mopeka_ble: MopekaBleProps & ComponentProps<__marker_mopeka_ble_MopekaListener>;
        }
    }
}
