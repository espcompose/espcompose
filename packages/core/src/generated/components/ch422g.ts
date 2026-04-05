// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_ch422g_CH422GComponent, __marker_i2c_I2CBus } from "../markers";
export interface Ch422gProps extends _CoreComponent {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            ch422g: Ch422gProps & ComponentProps<__marker_ch422g_CH422GComponent>;
        }
    }
}
