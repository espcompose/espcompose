// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_espnow_ESPNowComponent } from "../markers";
export interface EspnowProps extends _CoreComponent {
    /** int: The Wi-Fi channel that the esp-now communication will use to send/receive data packets. Cannot be set when the [... */
    channel?: number;
    /**
     * boolean: Enable the esp-now component on boot. Defaults to `true`.
     * @yamlKey enable_on_boot
     */
    enableOnBoot?: boolean;
    /**
     * boolean: This will allow the esp-now component to automatically add any new incoming device as a peer. See [Peers](ht...
     * @yamlKey auto_add_peer
     */
    autoAddPeer?: boolean;
    /** list: A peer is the name for devices that use esp-now. The list will have all MAC addresses from the devices where th... */
    peers?: Array<unknown>;
    /**
     * [Automation](/automations): An automation to perform when data is received from an unknown peer. See [`on_unknown_pee...
     * @yamlKey on_unknown_peer
     */
    onUnknownPeer?: TriggerHandler;
    /**
     * [Automation](/automations): An automation to perform when data is received. See [`on_receive`](https://esphome.io/com...
     * @yamlKey on_receive
     */
    onReceive?: TriggerHandler;
    /**
     * [Automation](/automations): An automation to perform when a broadcast packet is received. See [`on_broadcast`](https:...
     * @yamlKey on_broadcast
     */
    onBroadcast?: TriggerHandler;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            espnow: EspnowProps & ComponentProps<__marker_espnow_ESPNowComponent>;
        }
    }
}
