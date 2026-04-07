// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_ld2450_LD2450Component, __marker_uart_UARTComponent } from "../markers";
export interface Ld2450Props extends _CoreComponent {
    /**
     * [Automation](/automations): An automation to perform after each report is received. All target values are guaranteed ...
     * @yamlKey on_data
     */
    onData?: TriggerHandler;
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [UART Component](/components/uart) to use. Requi...
     * @yamlKey uart_id
     */
    uartId?: RefProp<__marker_uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            ld2450: Ld2450Props & ComponentProps<__marker_ld2450_LD2450Component>;
        }
    }
}
