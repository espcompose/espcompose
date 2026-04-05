// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _As3935, _CoreComponent } from "../bases";
import type { __marker_as3935_i2c_I2CAS3935Component, __marker_i2c_I2CBus } from "../markers";
export interface As3935I2cProps extends _As3935, _CoreComponent {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            as3935_i2c: As3935I2cProps & ComponentProps<__marker_as3935_i2c_I2CAS3935Component>;
        }
    }
}
