// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_i2c_I2CBus, __marker_ttp229_lsf_TTP229LSFComponent } from "../markers";
export interface Ttp229LsfProps extends _CoreComponent {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            ttp229_lsf: Ttp229LsfProps & ComponentProps<__marker_ttp229_lsf_TTP229LSFComponent>;
        }
    }
}
