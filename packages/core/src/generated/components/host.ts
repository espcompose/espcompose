// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, MACAddress, Pin, TriggerHandler } from "../../types";
export interface HostProps {
    /**
     * MAC address: A dummy MAC address to use when communicating with HA.
     * @yamlKey mac_address
     */
    macAddress?: MACAddress;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            host: HostProps & ComponentProps;
        }
    }
}
