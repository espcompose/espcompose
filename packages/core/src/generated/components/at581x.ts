// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_at581x_AT581XComponent, __marker_i2c_I2CBus } from "../markers";
export interface At581xProps extends _CoreComponent {
    address?: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [I2C](https://esphome.io/compo...
     * @yamlKey i2c_id
     */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            at581x: At581xProps & ComponentProps<__marker_at581x_AT581XComponent>;
        }
    }
}
