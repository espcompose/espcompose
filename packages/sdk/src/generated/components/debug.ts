// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { debug_DebugComponent } from "../markers";
export interface DebugProps extends _CoreComponent {
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            debug: DebugProps & ComponentProps<debug_DebugComponent>;
        }
    }
}
