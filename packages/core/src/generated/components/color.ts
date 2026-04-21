// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_Color } from "../markers";
export interface ColorProps extends _CoreComponent {
    blue?: unknown;
    /** @yamlKey blue_int */
    blueInt?: number;
    green?: unknown;
    /** @yamlKey green_int */
    greenInt?: number;
    hex?: unknown;
    red?: unknown;
    /** @yamlKey red_int */
    redInt?: number;
    white?: unknown;
    /** @yamlKey white_int */
    whiteInt?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            color: ColorProps & ComponentProps<__marker_Color>;
        }
    }
}
