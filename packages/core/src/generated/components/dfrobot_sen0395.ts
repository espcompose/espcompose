// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_dfrobot_sen0395_DfrobotSen0395Component, __marker_uart_UARTComponent } from "../markers";
export interface DfrobotSen0395Props {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [Uart](/components/uart/) if you want to use mul...
     * @yamlKey uart_id
     */
    uartId?: RefProp<__marker_uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            dfrobot_sen0395: DfrobotSen0395Props & ComponentProps<__marker_dfrobot_sen0395_DfrobotSen0395Component>;
        }
    }
}
