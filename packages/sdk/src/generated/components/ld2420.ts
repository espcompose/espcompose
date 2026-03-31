// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { ld2420_LD2420Component, uart_UARTComponent } from "../markers";
export interface Ld2420Props extends _CoreComponent {
    /** @yamlKey uart_id */
    uartId?: RefProp<uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            ld2420: Ld2420Props & ComponentProps<ld2420_LD2420Component>;
        }
    }
}
