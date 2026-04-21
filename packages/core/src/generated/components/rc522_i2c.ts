// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _Rc522 } from "../bases";
import type { __marker_i2c_I2CBus, __marker_rc522_i2c_RC522I2C } from "../markers";
export interface Rc522I2cProps extends _Rc522 {
    address?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            rc522_i2c: Rc522I2cProps & ComponentProps<__marker_rc522_i2c_RC522I2C>;
        }
    }
}
