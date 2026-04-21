// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, TimePeriod, TriggerHandler } from "../../types";
export interface Rp2040FrameworkProps {
    /** @yamlKey platform_version */
    platformVersion?: unknown;
    source?: string;
    version?: string;
}
export interface Rp2040Props {
    /** string: The PlatformIO board identifier. Common boards include `rpipicow` (Raspberry Pi Pico W), `rpipico` (Raspberry... */
    board: string;
    /**
     * boolean: Enable full `FILE*`-based printf support. By default, ESPHome wraps `printf()`, `vprintf()`, and `fprintf()`...
     * @yamlKey enable_full_printf
     */
    enableFullPrintf?: boolean;
    framework?: Rp2040FrameworkProps;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The timeout to apply to the RP2040 watchdog. When the dev...
     * @yamlKey watchdog_timeout
     */
    watchdogTimeout?: TimePeriod;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            rp2040: Rp2040Props & ComponentProps;
        }
    }
}
