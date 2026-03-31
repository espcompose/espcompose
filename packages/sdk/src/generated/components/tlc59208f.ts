// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { i2c_I2CBus, tlc59208f_TLC59208FOutput } from "../markers";
export interface Tlc59208fProps extends _CoreComponent {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: The I²C address of the driver. */
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            tlc59208f: Tlc59208fProps & ComponentProps<tlc59208f_TLC59208FOutput>;
        }
    }
}
