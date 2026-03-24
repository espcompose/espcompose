// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { ezo_pmp_EzoPMP, i2c_I2CBus } from "../markers";
export interface EzoPmpProps extends _CoreComponent {
    /**
     * [Time](/guides/configuration-types#time): The interval to check the sensor. Defaults to `60s`.
     * @yamlKey update_interval
     */
    updateInterval?: unknown;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: Specify the I²C address of the sensor. Defaults to 103. */
    address?: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            ezo_pmp: EzoPmpProps & ComponentProps<ezo_pmp_EzoPMP>;
        }
    }
}
