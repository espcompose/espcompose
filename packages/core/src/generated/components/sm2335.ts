// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_sm2335_SM2335 } from "../markers";
export interface Sm2335Props {
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin which CLK is
     * @yamlKey clock_pin
     */
    clockPin: unknown;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin used for DATA.
     * @yamlKey data_pin
     */
    dataPin: unknown;
    /**
     * int 0-15: Adjusts the current supplied to the
     * @yamlKey max_power_color_channels
     */
    maxPowerColorChannels?: unknown;
    /**
     * int 0-15: Adjusts the current supplied to the
     * @yamlKey max_power_white_channels
     */
    maxPowerWhiteChannels?: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            sm2335: Sm2335Props & ComponentProps<__marker_sm2335_SM2335>;
        }
    }
}
