// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_gdk101_GDK101Component, __marker_i2c_I2CBus } from "../markers";
export interface Gdk101Props extends _CoreComponent {
    address?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            gdk101: Gdk101Props & ComponentProps<__marker_gdk101_GDK101Component>;
        }
    }
}
