// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_i2c_I2CBus, __marker_tca9548a_TCA9548AComponent } from "../markers";
export interface Tca9548aChannelsProps {
    /** The channel (0-7) to use for this virtual I2C Bus. */
    channel: number;
}
export interface Tca9548aProps extends _CoreComponent {
    /** int: The I²C address of the Multiplexer. Defaults to `0x70`. */
    address?: number;
    /** The I²C Bus Channels */
    channels?: Array<Tca9548aChannelsProps>;
    /**
     * The I²C Bus ID Defaults to `false`
     * @yamlKey i2c_id
     */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            tca9548a: Tca9548aProps & ComponentProps<__marker_tca9548a_TCA9548AComponent>;
        }
    }
}
