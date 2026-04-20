// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_tlc5947_TLC5947 } from "../markers";
export interface Tlc5947Props extends _CoreComponent {
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin connected to CLK.
     * @yamlKey clock_pin
     */
    clockPin: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin connected to DIN.
     * @yamlKey data_pin
     */
    dataPin: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin connected to LAT.
     * @yamlKey lat_pin
     */
    latPin: Pin;
    /**
     * int: Number of chips in the chain. Must be
     * @yamlKey num_chips
     */
    numChips?: number;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin connected to /OE (BLANK).
     * @yamlKey oe_pin
     */
    oePin?: Pin;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            tlc5947: Tlc5947Props & ComponentProps<__marker_tlc5947_TLC5947>;
        }
    }
}
