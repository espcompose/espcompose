// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_globals_GlobalsComponent } from "../markers";
export interface GlobalsProps extends _CoreComponent {
    /**
     * string: The value with which to initialize this variable if the state can not be restored or if state restoration is ...
     * @yamlKey initial_value
     */
    initialValue?: string;
    /**
     * integer: Only applies to variables of type `std::string`. ESPHome will allocate enough space for this many characters...
     * @yamlKey max_restore_data_length
     */
    maxRestoreDataLength?: number;
    /**
     * boolean: Whether to try to restore the state on boot up. Be careful: on the ESP8266, you only have a total of 96 byte...
     * @yamlKey restore_value
     */
    restoreValue?: boolean;
    /** string: The C++ type of the global variable, for example `bool` (for `true` /`false` ), `int` (for integers), `float`... */
    type: string;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            globals: GlobalsProps & ComponentProps<__marker_globals_GlobalsComponent>;
        }
    }
}
