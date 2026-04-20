// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_ld2410_LD2410Component, __marker_uart_UARTComponent } from "../markers";
export interface Ld2410Props extends _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [UART Component](https://espho...
     * @yamlKey uart_id
     */
    uartId?: RefProp<__marker_uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            ld2410: Ld2410Props & ComponentProps<__marker_ld2410_LD2410Component>;
        }
    }
}
