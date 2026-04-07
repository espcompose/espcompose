// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_bp5758d_BP5758D } from "../markers";
export interface Bp5758dProps extends _CoreComponent {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin used for DATA.
     * @yamlKey data_pin
     */
    dataPin: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin which CLK is
     * @yamlKey clock_pin
     */
    clockPin: Pin;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            bp5758d: Bp5758dProps & ComponentProps<__marker_bp5758d_BP5758D>;
        }
    }
}
