// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { i2c_I2CBus, pi4ioe5v6408_PI4IOE5V6408Component } from "../markers";
export interface Pi4ioe5v6408Props extends _CoreComponent {
    /** boolean: Whether to reset the device state during setup. When `true` (default), all pins are configured as inputs wit... */
    reset?: boolean | EmbedValue<boolean>;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: The I²C address of the device. Defaults to `0x43`. */
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            pi4ioe5v6408: Pi4ioe5v6408Props & ComponentProps<pi4ioe5v6408_PI4IOE5V6408Component>;
        }
    }
}
