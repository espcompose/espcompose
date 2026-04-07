// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_dlms_meter_DlmsMeterComponent, __marker_uart_UARTComponent } from "../markers";
export interface DlmsMeterProps extends _CoreComponent {
    /**
     * string: Key used to decrypt DLMS telegrams. Obtain this from your provider / grid operator.
     * @yamlKey decryption_key
     */
    decryptionKey: string;
    /** Grid operator profile. Options: */
    provider?: "generic" | "netznoe";
    /** @yamlKey uart_id */
    uartId?: RefProp<__marker_uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            dlms_meter: DlmsMeterProps & ComponentProps<__marker_dlms_meter_DlmsMeterComponent>;
        }
    }
}
