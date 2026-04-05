// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_rf_bridge_RFBridgeComponent, __marker_uart_UARTComponent } from "../markers";
export interface RfBridgeProps extends _CoreComponent {
    /** @yamlKey on_code_received */
    onCodeReceived?: TriggerHandler;
    /** @yamlKey on_advanced_code_received */
    onAdvancedCodeReceived?: TriggerHandler;
    /** @yamlKey uart_id */
    uartId?: RefProp<__marker_uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            rf_bridge: RfBridgeProps & ComponentProps<__marker_rf_bridge_RFBridgeComponent>;
        }
    }
}
