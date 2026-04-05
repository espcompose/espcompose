// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_zigbee_ZigbeeComponent } from "../markers";
export interface ZigbeeProps extends _CoreComponent {
    /**
     * [Automation](/automations#automation): Automation to run when the device joins the network.
     * @yamlKey on_join
     */
    onJoin?: TriggerHandler;
    /**
     * Erases all non-volatile memory data on boot, including Zigbee network pairing and preferences (e.g., last switch stat...
     * @yamlKey wipe_on_boot
     */
    wipeOnBoot?: "once";
    /**
     * enum: Indicates what kind of power the device uses. Affects sleep behavior. One of `UNKNOWN`, `MAINS_SINGLE_PHASE`, `...
     * @yamlKey power_source
     */
    powerSource?: "UNKNOWN" | "MAINS_SINGLE_PHASE" | "MAINS_THREE_PHASE" | "BATTERY" | "DC_SOURCE" | "EMERGENCY_MAINS_CONST" | "EMERGENCY_MAINS_TRANSF";
    /**
     * int: Sets the Vendor Organizationally Unique Identifier (OUI). This allows replacing Nordic Semiconductor's default c...
     * @yamlKey ieee802154_vendor_oui
     */
    ieee802154VendorOui?: "random";
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            zigbee: ZigbeeProps & ComponentProps<__marker_zigbee_ZigbeeComponent>;
        }
    }
}
