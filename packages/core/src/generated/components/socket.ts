// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, TriggerHandler } from "../../types";
export interface SocketProps {
    implementation?: "lwip_tcp" | "lwip_sockets" | "bsd_sockets";
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            socket: SocketProps & ComponentProps;
        }
    }
}
