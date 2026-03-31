// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { sml_Sml, uart_UARTComponent } from "../markers";
export interface SmlProps {
    /** @yamlKey on_data */
    onData?: TriggerHandler;
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [UART Component](/components/uart) if you want t...
     * @yamlKey uart_id
     */
    uartId?: RefProp<uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            sml: SmlProps & ComponentProps<sml_Sml>;
        }
    }
}
