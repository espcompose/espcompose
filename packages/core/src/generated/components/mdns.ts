// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_mdns_MDNSComponent } from "../markers";
export interface MdnsServicesProps {
    /** int: Port number of extra service. */
    port?: number;
    /** string: Protocol of service (`_udp` or `_tcp`). */
    protocol: string;
    /** string: Name of extra service. */
    service: string;
    txt?: Record<string, string>;
}
export interface MdnsProps {
    /** boolean: Set to true to disable mDNS usage. Defaults to false. */
    disabled?: boolean;
    /** list: List of additional services to expose. */
    services?: Array<MdnsServicesProps>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            mdns: MdnsProps & ComponentProps<__marker_mdns_MDNSComponent>;
        }
    }
}
