// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_wiegand_Wiegand } from "../markers";
export interface WiegandProps extends _CoreComponent {
    /** [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin where the `D0` output of the Wiegand'... */
    d0: Pin;
    /** [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin where the `D1` output of the Wiegand'... */
    d1: Pin;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a key has been pressed on the pad. The ke...
     * @yamlKey on_key
     */
    onKey?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform for any data sent by the device. The value is ...
     * @yamlKey on_raw
     */
    onRaw?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a Wiegand-compatible card or a tag has be...
     * @yamlKey on_tag
     */
    onTag?: TriggerHandler;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            wiegand: WiegandProps & ComponentProps<__marker_wiegand_Wiegand>;
        }
    }
}
