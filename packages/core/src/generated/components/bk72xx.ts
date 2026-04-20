// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_libretiny_LTComponent } from "../markers";
export interface Bk72xxFrameworkProps {
    debug?: Array<"CLIENT" | "FDB" | "LWIP" | "LWIP_ASSERT" | "MDNS" | "NONE" | "OTA" | "SERVER" | "SSL" | "WIFI">;
    /** @yamlKey gpio_recover */
    gpioRecover?: boolean;
    loglevel?: "DEBUG" | "ERROR" | "FATAL" | "INFO" | "NONE" | "TRACE" | "VERBOSE" | "WARN";
    options?: Record<string, string>;
    /** @yamlKey sdk_silent */
    sdkSilent?: "all" | "auto" | "none";
    source?: string;
    /** @yamlKey uart_port */
    uartPort?: "0" | "1" | "2";
    version?: string;
}
export interface Bk72xxProps {
    board: string;
    family?: "BK7231N" | "BK7231Q" | "BK7231T" | "BK7251" | "LN882H" | "RTL8710B" | "RTL8720C";
    framework?: Bk72xxFrameworkProps;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            bk72xx: Bk72xxProps & ComponentProps<__marker_libretiny_LTComponent>;
        }
    }
}
