// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_tm1651_TM1651Display } from "../markers";
export interface Tm1651Props extends _CoreComponent {
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): CLK pin
     * @yamlKey clk_pin
     */
    clkPin: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): DIO pin
     * @yamlKey dio_pin
     */
    dioPin: Pin;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            tm1651: Tm1651Props & ComponentProps<__marker_tm1651_TM1651Display>;
        }
    }
}
