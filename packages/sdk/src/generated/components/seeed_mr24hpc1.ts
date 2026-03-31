// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { seeed_mr24hpc1_MR24HPC1Component, uart_UARTComponent } from "../markers";
export interface SeeedMr24hpc1Props extends _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [UART Component](/components/uart) if you want t...
     * @yamlKey uart_id
     */
    uartId?: RefProp<uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            seeed_mr24hpc1: SeeedMr24hpc1Props & ComponentProps<seeed_mr24hpc1_MR24HPC1Component>;
        }
    }
}
