// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { i2c_I2CBus, m5stack_8angle_M5Stack8AngleComponent } from "../markers";
export interface M5stack8angleProps {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [I²C Component](/components/i2c) if you need
     * @yamlKey i2c_id
     */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: Manually specify the I²C address of the device. Defaults to `0x43`. */
    address?: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            m5stack_8angle: M5stack8angleProps & ComponentProps<m5stack_8angle_M5Stack8AngleComponent>;
        }
    }
}
