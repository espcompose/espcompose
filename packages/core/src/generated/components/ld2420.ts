// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_ld2420_LD2420Component, __marker_uart_UARTComponent } from "../markers";
export interface Ld2420Props extends _CoreComponent {
    /** @yamlKey uart_id */
    uartId?: RefProp<__marker_uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            ld2420: Ld2420Props & ComponentProps<__marker_ld2420_LD2420Component>;
        }
    }
}
