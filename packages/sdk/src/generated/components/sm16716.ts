// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { sm16716_SM16716 } from "../markers";
export interface Sm16716Props extends _CoreComponent {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin used for MOSI.
     * @yamlKey data_pin
     */
    dataPin: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin which SCLK is
     * @yamlKey clock_pin
     */
    clockPin: Pin;
    /**
     * int: Total number of channels of the whole
     * @yamlKey num_channels
     */
    numChannels?: number;
    /**
     * int: Number of chips in the chain. Must be
     * @yamlKey num_chips
     */
    numChips?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            sm16716: Sm16716Props & ComponentProps<sm16716_SM16716>;
        }
    }
}
