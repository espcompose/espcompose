// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_sml_Sml, __marker_uart_UARTComponent } from "../markers";
export interface SmlProps {
    /** @yamlKey on_data */
    onData?: TriggerHandler;
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [UART Component](/components/uart) if you want t...
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
