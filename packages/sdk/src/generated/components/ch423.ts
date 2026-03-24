// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { ch423_CH423Component, i2c_I2CBus } from "../markers";
export interface Ch423Props extends _CoreComponent {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            ch423: Ch423Props & ComponentProps<ch423_CH423Component>;
        }
    }
}
