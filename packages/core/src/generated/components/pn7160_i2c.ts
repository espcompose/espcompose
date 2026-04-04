// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { i2c_I2CBus, pn7160_i2c_PN7160I2C } from "../markers";
export interface Pn7160I2cProps {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            pn7160_i2c: Pn7160I2cProps & ComponentProps<pn7160_i2c_PN7160I2C>;
        }
    }
}
