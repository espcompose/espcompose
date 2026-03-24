// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { seeed_mr60fda2_MR60FDA2Component, uart_UARTComponent } from "../markers";
export interface SeeedMr60fda2Props extends _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [UART Component](/components/uart) if you want t...
     * @yamlKey uart_id
     */
    uartId?: RefProp<uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            seeed_mr60fda2: SeeedMr60fda2Props & ComponentProps<seeed_mr60fda2_MR60FDA2Component>;
        }
    }
}
