// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { gdk101_GDK101Component, i2c_I2CBus } from "../markers";
export interface Gdk101Props extends _CoreComponent {
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            gdk101: Gdk101Props & ComponentProps<gdk101_GDK101Component>;
        }
    }
}
