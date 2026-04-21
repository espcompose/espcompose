// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_seeed_mr24hpc1_MR24HPC1Component, __marker_uart_UARTComponent } from "../markers";
export interface SeeedMr24hpc1Props extends _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [UART Component](https://espho...
     * @yamlKey uart_id
     */
    uartId?: RefProp<__marker_uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            seeed_mr24hpc1: SeeedMr24hpc1Props & ComponentProps<__marker_seeed_mr24hpc1_MR24HPC1Component>;
        }
    }
}
