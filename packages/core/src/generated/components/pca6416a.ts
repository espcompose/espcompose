// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_i2c_I2CBus, __marker_pca6416a_PCA6416AComponent } from "../markers";
export interface Pca6416aProps extends _CoreComponent {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** int: The I²C address of the driver. Defaults to `0x20`. */
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            pca6416a: Pca6416aProps & ComponentProps<__marker_pca6416a_PCA6416AComponent>;
        }
    }
}
