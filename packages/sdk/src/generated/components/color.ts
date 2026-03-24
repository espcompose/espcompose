// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { Color } from "../markers";
export interface ColorProps extends _CoreComponent {
    red?: unknown;
    /** @yamlKey red_int */
    redInt?: number;
    green?: unknown;
    /** @yamlKey green_int */
    greenInt?: number;
    blue?: unknown;
    /** @yamlKey blue_int */
    blueInt?: number;
    white?: unknown;
    /** @yamlKey white_int */
    whiteInt?: number;
    hex?: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            color: ColorProps & ComponentProps<Color>;
        }
    }
}
