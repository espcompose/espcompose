// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, TriggerHandler } from "../../types";
export interface SocketProps {
    implementation?: "bsd_sockets" | "lwip_sockets" | "lwip_tcp";
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            socket: SocketProps & ComponentProps;
        }
    }
}
