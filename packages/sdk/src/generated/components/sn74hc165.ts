// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { sn74hc165_SN74HC165Component } from "../markers";
export interface Sn74hc165Props extends _CoreComponent {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): Pin connected to SN74HC165 Serial Output (QH) input.
     * @yamlKey data_pin
     */
    dataPin: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): Pin connected to SN74HC165 Clock (CLK) pin.
     * @yamlKey clock_pin
     */
    clockPin: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): Pin connected to SN74HC165 Load input (SH/LD) pin.
     * @yamlKey load_pin
     */
    loadPin: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): Pin connected to SN74HC165 Clock Inhibit (CLK INH) pin. The use...
     * @yamlKey clock_inhibit_pin
     */
    clockInhibitPin?: Pin;
    /**
     * int: Number of daisy-chained shift registers, up-to 256. Defaults to `1`.
     * @yamlKey sr_count
     */
    srCount?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            sn74hc165: Sn74hc165Props & ComponentProps<sn74hc165_SN74HC165Component>;
        }
    }
}
