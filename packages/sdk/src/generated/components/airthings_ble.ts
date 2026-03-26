// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { airthings_ble_AirthingsListener, esp32_ble_tracker_ESP32BLETracker } from "../markers";
export interface AirthingsBleProps {
    /** @yamlKey esp32_ble_id */
    esp32BleId?: RefProp<esp32_ble_tracker_ESP32BLETracker>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            airthings_ble: AirthingsBleProps & ComponentProps<airthings_ble_AirthingsListener>;
        }
    }
}
