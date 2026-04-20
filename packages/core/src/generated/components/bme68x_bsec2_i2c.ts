// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _Bme68xBsec2ConfigSchemaBase } from "../bases";
import type { __marker_bme68x_bsec2_i2c_BME68xBSEC2I2CComponent, __marker_i2c_I2CBus } from "../markers";
export interface Bme68xBsec2I2cProps extends _Bme68xBsec2ConfigSchemaBase {
    address?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            bme68x_bsec2_i2c: Bme68xBsec2I2cProps & ComponentProps<__marker_bme68x_bsec2_i2c_BME68xBSEC2I2CComponent>;
        }
    }
}
