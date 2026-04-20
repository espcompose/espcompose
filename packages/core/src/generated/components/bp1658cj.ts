// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_bp1658cj_BP1658CJ } from "../markers";
export interface Bp1658cjProps extends _CoreComponent {
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin which CLK is
     * @yamlKey clock_pin
     */
    clockPin: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin used for DATA.
     * @yamlKey data_pin
     */
    dataPin: Pin;
    /**
     * int 0-15: Adjusts the current supplied to the
     * @yamlKey max_power_color_channels
     */
    maxPowerColorChannels?: number;
    /**
     * int 0-15: Adjusts the current supplied to the
     * @yamlKey max_power_white_channels
     */
    maxPowerWhiteChannels?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            bp1658cj: Bp1658cjProps & ComponentProps<__marker_bp1658cj_BP1658CJ>;
        }
    }
}
