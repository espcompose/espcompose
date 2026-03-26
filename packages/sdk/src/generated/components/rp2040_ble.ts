// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { rp2040_ble_RP2040BLE } from "../markers";
export interface Rp2040BleProps extends _CoreComponent {
    /**
     * boolean: If enabled, the BLE interface will be enabled on boot. Defaults to `true`.
     * @yamlKey enable_on_boot
     */
    enableOnBoot?: boolean;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            rp2040_ble: Rp2040BleProps & ComponentProps<rp2040_ble_RP2040BLE>;
        }
    }
}
