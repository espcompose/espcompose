// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { matrix_keypad_MatrixKeypad } from "../markers";
export interface MatrixKeypadRowsProps {
    pin: Pin | EmbedValue<Pin>;
}
export interface MatrixKeypadColumnsProps {
    pin: Pin | EmbedValue<Pin>;
}
export interface MatrixKeypadProps extends _CoreComponent {
    /** list: A list of [pins](/guides/configuration-types#pin-schema) where the horrizontal matrix lines are connected, in o... */
    rows: Array<MatrixKeypadRowsProps>;
    /** list: A list of [pins](/guides/configuration-types#pin-schema) where the vertical matrix lines are connected, in orde... */
    columns: Array<MatrixKeypadColumnsProps>;
    /** string: The keys present on the matrix, from top left to bottom right, row by row. Required for `key_collector` and `... */
    keys?: string | EmbedValue<string>;
    /** @yamlKey debounce_time */
    debounceTime?: number | EmbedValue<number>;
    /**
     * boolean: For pads where row pins are outputs, and the keys are connected with diodes. Defaults to `false`.
     * @yamlKey has_diodes
     */
    hasDiodes?: boolean | EmbedValue<boolean>;
    /**
     * boolean: For pads where the column lines have external pulldowns. Defaults to `false`.
     * @yamlKey has_pulldowns
     */
    hasPulldowns?: boolean | EmbedValue<boolean>;
    /** @yamlKey on_key */
    onKey?: TriggerHandler;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            matrix_keypad: MatrixKeypadProps & ComponentProps<matrix_keypad_MatrixKeypad>;
        }
    }
}
