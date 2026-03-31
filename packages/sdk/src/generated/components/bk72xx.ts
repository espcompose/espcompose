// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { libretiny_LTComponent } from "../markers";
export interface Bk72xxFrameworkProps {
    version?: string | EmbedValue<string>;
    source?: string | EmbedValue<string>;
    loglevel?: "VERBOSE" | "TRACE" | "DEBUG" | "INFO" | "WARN" | "ERROR" | "FATAL" | "NONE";
    debug?: Array<"NONE" | "WIFI" | "CLIENT" | "SERVER" | "SSL" | "OTA" | "FDB" | "MDNS" | "LWIP" | "LWIP_ASSERT">;
    /** @yamlKey sdk_silent */
    sdkSilent?: "all" | "auto" | "none";
    /** @yamlKey uart_port */
    uartPort?: "0" | "1" | "2";
    /** @yamlKey gpio_recover */
    gpioRecover?: boolean | EmbedValue<boolean>;
    options?: Record<string, string>;
}
export interface Bk72xxProps {
    board: string | EmbedValue<string>;
    family?: "BK7231N" | "BK7231Q" | "BK7231T" | "BK7251" | "LN882H" | "RTL8710B" | "RTL8720C";
    framework?: Bk72xxFrameworkProps;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            bk72xx: Bk72xxProps & ComponentProps<libretiny_LTComponent>;
        }
    }
}
