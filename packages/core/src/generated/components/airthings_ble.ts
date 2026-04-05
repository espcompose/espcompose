// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_airthings_ble_AirthingsListener, __marker_esp32_ble_tracker_ESP32BLETracker } from "../markers";
export interface AirthingsBleProps {
    /** @yamlKey esp32_ble_id */
    esp32BleId?: RefProp<__marker_esp32_ble_tracker_ESP32BLETracker>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            airthings_ble: AirthingsBleProps & ComponentProps<__marker_airthings_ble_AirthingsListener>;
        }
    }
}
