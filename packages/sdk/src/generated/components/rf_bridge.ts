// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { rf_bridge_RFBridgeComponent, uart_UARTComponent } from "../markers";
export interface RfBridgeProps extends _CoreComponent {
    /** @yamlKey on_code_received */
    onCodeReceived?: () => void;
    /** @yamlKey on_advanced_code_received */
    onAdvancedCodeReceived?: () => void;
    /** @yamlKey uart_id */
    uartId?: RefProp<uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            rf_bridge: RfBridgeProps & ComponentProps<rf_bridge_RFBridgeComponent>;
        }
    }
}
