// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_i2c_I2CBus, __marker_pi4ioe5v6408_PI4IOE5V6408Component } from "../markers";
export interface Pi4ioe5v6408Props extends _CoreComponent {
    /** int: The I²C address of the device. Defaults to `0x43`. */
    address?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin connected to the INT output of the PI...
     * @yamlKey interrupt_pin
     */
    interruptPin?: Pin;
    /** boolean: Whether to reset the device state during setup. When `true` (default), all pins are configured as inputs wit... */
    reset?: boolean;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            pi4ioe5v6408: Pi4ioe5v6408Props & ComponentProps<__marker_pi4ioe5v6408_PI4IOE5V6408Component>;
        }
    }
}
