// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_sn74hc165_SN74HC165Component } from "../markers";
export interface Sn74hc165Props extends _CoreComponent {
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): Pin connected to SN74HC165 Clock Inhibit (CLK...
     * @yamlKey clock_inhibit_pin
     */
    clockInhibitPin?: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): Pin connected to SN74HC165 Clock (CLK) pin.
     * @yamlKey clock_pin
     */
    clockPin: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): Pin connected to SN74HC165 Serial Output (QH)...
     * @yamlKey data_pin
     */
    dataPin: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): Pin connected to SN74HC165 Load input (SH/LD)...
     * @yamlKey load_pin
     */
    loadPin: Pin;
    /**
     * int: Number of daisy-chained shift registers, up-to 256. Defaults to `1`.
     * @yamlKey sr_count
     */
    srCount?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            sn74hc165: Sn74hc165Props & ComponentProps<__marker_sn74hc165_SN74HC165Component>;
        }
    }
}
