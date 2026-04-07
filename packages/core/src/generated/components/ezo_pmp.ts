// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_ezo_pmp_EzoPMP, __marker_i2c_I2CBus } from "../markers";
export interface EzoPmpProps extends _CoreComponent {
    /**
     * [Time](/guides/configuration-types#time): The interval to check the sensor. Defaults to `60s`.
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** int: Specify the I²C address of the sensor. Defaults to 103. */
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            ezo_pmp: EzoPmpProps & ComponentProps<__marker_ezo_pmp_EzoPMP>;
        }
    }
}
