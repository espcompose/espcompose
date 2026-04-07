// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_dac7678_DAC7678Output, __marker_i2c_I2CBus } from "../markers";
export interface Dac7678Props extends _CoreComponent {
    /**
     * bool: State of the internal reference.
     * @yamlKey internal_reference
     */
    internalReference?: boolean;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** int: The I²C address of the driver. */
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            dac7678: Dac7678Props & ComponentProps<__marker_dac7678_DAC7678Output>;
        }
    }
}
