// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { ld2410_LD2410Component, uart_UARTComponent } from "../markers";
export interface Ld2410Props extends _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [UART Component](/components/uart) if you want t...
     * @yamlKey uart_id
     */
    uartId?: RefProp<uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            ld2410: Ld2410Props & ComponentProps<ld2410_LD2410Component>;
        }
    }
}
