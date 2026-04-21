// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_emontx_EmonTx, __marker_uart_UARTComponent } from "../markers";
export interface EmontxProps extends _CoreComponent {
    /**
     * An automation that will be triggered for every serial line received from the EmonTx (both plain text and JSON). Withi...
     * @yamlKey on_data
     */
    onData?: TriggerHandler;
    /**
     * An automation that will be triggered whenever new JSON data is received from the EmonTx. Within this trigger, the `ra...
     * @yamlKey on_json
     */
    onJson?: TriggerHandler;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [UART Component](https://espho...
     * @yamlKey uart_id
     */
    uartId?: RefProp<__marker_uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            emontx: EmontxProps & ComponentProps<__marker_emontx_EmonTx>;
        }
    }
}
