// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { mdns_MDNSComponent } from "../markers";
export interface MdnsServicesProps {
    /** string: Name of extra service. */
    service: string;
    /** string: Protocol of service (`_udp` or `_tcp`). */
    protocol: string;
    /** int: Port number of extra service. */
    port?: number;
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
            mdns: MdnsProps & ComponentProps<mdns_MDNSComponent>;
        }
    }
}
