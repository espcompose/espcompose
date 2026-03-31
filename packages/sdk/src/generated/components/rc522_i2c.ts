// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _Rc522 } from "../bases";
import type { i2c_I2CBus, rc522_i2c_RC522I2C } from "../markers";
export interface Rc522I2cProps extends _Rc522 {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            rc522_i2c: Rc522I2cProps & ComponentProps<rc522_i2c_RC522I2C>;
        }
    }
}
