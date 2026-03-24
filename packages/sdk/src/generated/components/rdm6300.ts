// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { rdm6300_RDM6300Component, uart_UARTComponent } from "../markers";
export interface Rdm6300Props extends _CoreComponent {
    /**
     * [Automation](/automations): An automation to perform when a tag is read. See [`on_tag`](https://esphome.io/components...
     * @yamlKey on_tag
     */
    onTag?: () => void;
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [UART Component](/components/uart) if you want t...
     * @yamlKey uart_id
     */
    uartId?: RefProp<uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            rdm6300: Rdm6300Props & ComponentProps<rdm6300_RDM6300Component>;
        }
    }
}
