// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { ttp229_bsf_TTP229BSFComponent } from "../markers";
export interface Ttp229BsfProps extends _CoreComponent {
    /** @yamlKey sdo_pin */
    sdoPin: Pin | EmbedValue<Pin>;
    /** @yamlKey scl_pin */
    sclPin: Pin | EmbedValue<Pin>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            ttp229_bsf: Ttp229BsfProps & ComponentProps<ttp229_bsf_TTP229BSFComponent>;
        }
    }
}
