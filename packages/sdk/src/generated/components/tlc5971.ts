// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { tlc5971_TLC5971 } from "../markers";
export interface Tlc5971Props extends _CoreComponent {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin connected to DIN.
     * @yamlKey data_pin
     */
    dataPin: Pin | EmbedValue<Pin>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin connected to CLK.
     * @yamlKey clock_pin
     */
    clockPin: Pin | EmbedValue<Pin>;
    /**
     * int: Number of chips in the chain. Must be
     * @yamlKey num_chips
     */
    numChips?: number | EmbedValue<number>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            tlc5971: Tlc5971Props & ComponentProps<tlc5971_TLC5971>;
        }
    }
}
