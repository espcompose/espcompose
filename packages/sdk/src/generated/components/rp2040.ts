// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, TimePeriod, TriggerHandler } from "../../types";
export interface Rp2040FrameworkProps {
    version?: string;
    source?: string;
    /** @yamlKey platform_version */
    platformVersion?: unknown;
}
export interface Rp2040Props {
    /** string: The PlatformIO board identifier. Common boards include `rpipicow` (Raspberry Pi Pico W), `rpipico` (Raspberry... */
    board: string;
    framework?: Rp2040FrameworkProps;
    /**
     * [Time](/guides/configuration-types#time): The timeout to apply to the RP2040 watchdog. When the device hangs for that...
     * @yamlKey watchdog_timeout
     */
    watchdogTimeout?: TimePeriod;
    /**
     * boolean: Enable full `FILE*`-based printf support. By default, ESPHome wraps `printf()`, `vprintf()`, and `fprintf()`...
     * @yamlKey enable_full_printf
     */
    enableFullPrintf?: boolean;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            rp2040: Rp2040Props & ComponentProps;
        }
    }
}
