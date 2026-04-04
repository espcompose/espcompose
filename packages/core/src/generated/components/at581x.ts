// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { at581x_AT581XComponent, i2c_I2CBus } from "../markers";
export interface At581xProps extends _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [I2C](/components/i2c/) if you want to use multi...
     * @yamlKey i2c_id
     */
    i2cId?: RefProp<i2c_I2CBus>;
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            at581x: At581xProps & ComponentProps<at581x_AT581XComponent>;
        }
    }
}
