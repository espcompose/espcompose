// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { my9231_MY9231OutputComponent } from "../markers";
export interface My9231Props extends _CoreComponent {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin which DI is connected
     * @yamlKey data_pin
     */
    dataPin: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin which DCKI is
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
    /**
     * int: The bit depth to use for all output
     * @yamlKey bit_depth
     */
    bitDepth?: "8" | "12" | "14" | "16";
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            my9231: My9231Props & ComponentProps<my9231_MY9231OutputComponent>;
        }
    }
}
