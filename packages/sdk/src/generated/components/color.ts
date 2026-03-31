// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { Color } from "../markers";
export interface ColorProps extends _CoreComponent {
    red?: unknown;
    /** @yamlKey red_int */
    redInt?: number | EmbedValue<number>;
    green?: unknown;
    /** @yamlKey green_int */
    greenInt?: number | EmbedValue<number>;
    blue?: unknown;
    /** @yamlKey blue_int */
    blueInt?: number | EmbedValue<number>;
    white?: unknown;
    /** @yamlKey white_int */
    whiteInt?: number | EmbedValue<number>;
    hex?: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            color: ColorProps & ComponentProps<Color>;
        }
    }
}
