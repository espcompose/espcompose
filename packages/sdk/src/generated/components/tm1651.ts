// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { tm1651_TM1651Display } from "../markers";
export interface Tm1651Props {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): CLK pin
     * @yamlKey clk_pin
     */
    clkPin: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): DIO pin
     * @yamlKey dio_pin
     */
    dioPin: Pin;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            tm1651: Tm1651Props & ComponentProps<tm1651_TM1651Display>;
        }
    }
}
