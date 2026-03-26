// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { wiegand_Wiegand } from "../markers";
export interface WiegandProps {
    /** [Pin Schema](/guides/configuration-types#pin-schema): The pin where the `D0` output of the Wiegand's interface connects. */
    d0: Pin;
    /** [Pin Schema](/guides/configuration-types#pin-schema): The pin where the `D1` output of the Wiegand's interface connects. */
    d1: Pin;
    /**
     * [Automation](/automations): An automation to perform when a Wiegand-compatible card or a tag has been read by the dev...
     * @yamlKey on_tag
     */
    onTag?: TriggerHandler;
    /**
     * [Automation](/automations): An automation to perform for any data sent by the device. The value is in a variable call...
     * @yamlKey on_raw
     */
    onRaw?: TriggerHandler;
    /**
     * [Automation](/automations): An automation to perform when a key has been pressed on the pad. The key is in a variable...
     * @yamlKey on_key
     */
    onKey?: TriggerHandler;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            wiegand: WiegandProps & ComponentProps<wiegand_Wiegand>;
        }
    }
}
