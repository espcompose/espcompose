// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_i2c_I2CBus, __marker_pca6416a_PCA6416AComponent } from "../markers";
export interface Pca6416aProps extends _CoreComponent {
    /** int: The I²C address of the driver. Defaults to `0x20`. */
    address?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin connected to the INT output of the PC...
     * @yamlKey interrupt_pin
     */
    interruptPin?: Pin;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            pca6416a: Pca6416aProps & ComponentProps<__marker_pca6416a_PCA6416AComponent>;
        }
    }
}
