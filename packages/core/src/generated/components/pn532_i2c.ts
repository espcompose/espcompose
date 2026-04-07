// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _Pn532 } from "../bases";
import type { __marker_i2c_I2CBus, __marker_pn532_i2c_PN532I2C } from "../markers";
export interface Pn532I2cProps extends _Pn532 {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            pn532_i2c: Pn532I2cProps & ComponentProps<__marker_pn532_i2c_PN532I2C>;
        }
    }
}
