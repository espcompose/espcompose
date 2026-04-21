// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, TriggerHandler } from "../../types";
export interface NetworkProps {
    /**
     * boolean: Explicitly enables or disables high-performance networking optimizations. Only supported on ESP32 devices. W...
     * @yamlKey enable_high_performance
     */
    enableHighPerformance?: boolean;
    /**
     * boolean: Enables IPv6 support. Defaults to `false`.
     * @yamlKey enable_ipv6
     */
    enableIpv6?: boolean;
    /**
     * integer: ESPHome considers the network to be connected when it has one IPv4 address and this number of IPv6 addresses...
     * @yamlKey min_ipv6_addr_count
     */
    minIpv6AddrCount?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            network: NetworkProps & ComponentProps;
        }
    }
}
