// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { udp_UDPComponent } from "../markers";
export interface UdpProps {
    /** int: The destination UDP port number to use. Defaults to `18511`. Different listen and broadcast ports can be specifi... */
    port?: number;
    /**
     * IPv4 address: Changes to multicast, adding an address to listen to. Defaults to no multicast address, just local netw...
     * @yamlKey listen_address
     */
    listenAddress?: unknown;
    /** list of IPv4 addresses: One or more IP addresses to broadcast data to. Defaults to `255.255.255.255` which is the loc... */
    addresses?: Array<unknown>;
    /** @yamlKey on_receive */
    onReceive?: () => void;
    providers?: unknown;
    encryption?: unknown;
    /** @yamlKey ping_pong_enable */
    pingPongEnable?: unknown;
    /** @yamlKey rolling_code_enable */
    rollingCodeEnable?: unknown;
    sensors?: unknown;
    /** @yamlKey binary_sensors */
    binarySensors?: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            udp: UdpProps & ComponentProps<udp_UDPComponent>;
        }
    }
}
