// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { ld2412_LD2412Component, uart_UARTComponent } from "../markers";
export interface Ld2412Props extends _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [UART Component](/components/uart), which is nec...
     * @yamlKey uart_id
     */
    uartId?: RefProp<uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            ld2412: Ld2412Props & ComponentProps<ld2412_LD2412Component>;
        }
    }
}
