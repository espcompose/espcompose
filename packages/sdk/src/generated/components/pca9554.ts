// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { i2c_I2CBus, pca9554_PCA9554Component } from "../markers";
export interface Pca9554Props extends _CoreComponent {
    /**
     * int: The number of bits implemented in the expander. Defaults to 8. This should be set to 16 when using a PCA9535 and...
     * @yamlKey pin_count
     */
    pinCount?: "4" | "8" | "16";
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: The I²C address of the driver. Defaults to `0x20`. */
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            pca9554: Pca9554Props & ComponentProps<pca9554_PCA9554Component>;
        }
    }
}
