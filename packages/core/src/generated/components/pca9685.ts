// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_i2c_I2CBus, __marker_pca9685_PCA9685Output } from "../markers";
export interface Pca9685Props extends _CoreComponent {
    /** int: The I²C address of the driver. */
    address?: number;
    /**
     * bool: Enable external clock input. PRE_SCALE register will by set to 3. Default to `false`.
     * @yamlKey external_clock_input
     */
    externalClockInput?: boolean;
    /** frequency: The frequency to let the */
    frequency?: unknown;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /**
     * string: The phase balancer algorithm to use. See [Phase Balancer](https://esphome.io/components/output/pca9685#phase-...
     * @yamlKey phase_balancer
     */
    phaseBalancer?: "linear" | "none";
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            pca9685: Pca9685Props & ComponentProps<__marker_pca9685_PCA9685Output>;
        }
    }
}
