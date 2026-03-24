// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { i2c_I2CBus, max6956_MAX6956 } from "../markers";
export interface Max6956Props extends _CoreComponent {
    /**
     * Set the value of the current to be sink by all pins configured as led driver. Defaults to `0`
     * @yamlKey brightness_global
     */
    brightnessGlobal?: number;
    /**
     * Define if the current to be sink will be confgured globaly or per pin configured as led driver. Defaults to `global`
     * @yamlKey brightness_mode
     */
    brightnessMode?: "global" | "segment";
    /**
     * The I²C Bus ID Defaults to `false`
     * @yamlKey i2c_id
     */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: The I²C address of the driver. Defaults to `0x40`. */
    address?: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            max6956: Max6956Props & ComponentProps<max6956_MAX6956>;
        }
    }
}
