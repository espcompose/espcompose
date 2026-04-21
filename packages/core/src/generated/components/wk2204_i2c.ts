// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_i2c_I2CBus, __marker_weikai_i2c_WeikaiComponentI2C } from "../markers";
export interface Wk2204I2cProps {
    address?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            wk2204_i2c: Wk2204I2cProps & ComponentProps<__marker_weikai_i2c_WeikaiComponentI2C>;
        }
    }
}
