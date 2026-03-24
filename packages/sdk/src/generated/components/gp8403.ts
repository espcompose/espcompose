// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { gp8403_GP8403Component, i2c_I2CBus } from "../markers";
export interface Gp8403Props extends _CoreComponent {
    /** enum: GP8403 for the 12 bit model and GP8413 for the 15 bit model. Defaults to GP8403. */
    model?: "GP8403" | "GP8413";
    /** voltage: The output voltage range of the DAC. Must be one of `5V` or `10V`. */
    voltage: "5V" | "10V";
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    address?: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            gp8403: Gp8403Props & ComponentProps<gp8403_GP8403Component>;
        }
    }
}
