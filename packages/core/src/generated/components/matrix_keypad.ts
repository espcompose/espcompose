// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_matrix_keypad_MatrixKeypad } from "../markers";
export interface MatrixKeypadColumnsProps {
    pin: Pin;
}
export interface MatrixKeypadRowsProps {
    pin: Pin;
}
export interface MatrixKeypadProps extends _CoreComponent {
    /** list: A list of [pins](https://esphome.io/guides/configuration-types#pin-schema) where the vertical matrix lines are ... */
    columns: Array<MatrixKeypadColumnsProps>;
    /** @yamlKey debounce_time */
    debounceTime?: number;
    /**
     * boolean: For pads where row pins are outputs, and the keys are connected with diodes. Defaults to `false`.
     * @yamlKey has_diodes
     */
    hasDiodes?: boolean;
    /**
     * boolean: For pads where the column lines have external pulldowns. Defaults to `false`.
     * @yamlKey has_pulldowns
     */
    hasPulldowns?: boolean;
    /** string: The keys present on the matrix, from top left to bottom right, row by row. Required for `key_collector` and `... */
    keys?: string;
    /** @yamlKey on_key */
    onKey?: TriggerHandler;
    /** list: A list of [pins](https://esphome.io/guides/configuration-types#pin-schema) where the horrizontal matrix lines a... */
    rows: Array<MatrixKeypadRowsProps>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            matrix_keypad: MatrixKeypadProps & ComponentProps<__marker_matrix_keypad_MatrixKeypad>;
        }
    }
}
