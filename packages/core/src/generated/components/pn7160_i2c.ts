// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_i2c_I2CBus, __marker_pn7160_i2c_PN7160I2C } from "../markers";
export interface Pn7160I2cProps {
    address?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            pn7160_i2c: Pn7160I2cProps & ComponentProps<__marker_pn7160_i2c_PN7160I2C>;
        }
    }
}
