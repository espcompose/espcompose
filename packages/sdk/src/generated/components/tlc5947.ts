// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { tlc5947_TLC5947 } from "../markers";
export interface Tlc5947Props extends _CoreComponent {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin connected to DIN.
     * @yamlKey data_pin
     */
    dataPin: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin connected to CLK.
     * @yamlKey clock_pin
     */
    clockPin: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin connected to LAT.
     * @yamlKey lat_pin
     */
    latPin: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin connected to /OE (BLANK).
     * @yamlKey oe_pin
     */
    oePin?: Pin;
    /**
     * int: Number of chips in the chain. Must be
     * @yamlKey num_chips
     */
    numChips?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            tlc5947: Tlc5947Props & ComponentProps<tlc5947_TLC5947>;
        }
    }
}
