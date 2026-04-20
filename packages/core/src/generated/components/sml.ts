// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_sml_Sml, __marker_uart_UARTComponent } from "../markers";
export interface SmlProps extends _CoreComponent {
    /** @yamlKey on_data */
    onData?: TriggerHandler;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [UART Component](https://espho...
     * @yamlKey uart_id
     */
    uartId?: RefProp<__marker_uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            sml: SmlProps & ComponentProps<__marker_sml_Sml>;
        }
    }
}
