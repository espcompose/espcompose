// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_rdm6300_RDM6300Component, __marker_uart_UARTComponent } from "../markers";
export interface Rdm6300Props extends _CoreComponent {
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a tag is read. See [`on_tag`](https://esp...
     * @yamlKey on_tag
     */
    onTag?: TriggerHandler;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [UART Component](https://espho...
     * @yamlKey uart_id
     */
    uartId?: RefProp<__marker_uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            rdm6300: Rdm6300Props & ComponentProps<__marker_rdm6300_RDM6300Component>;
        }
    }
}
