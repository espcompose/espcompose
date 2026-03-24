// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { dlms_meter_DlmsMeterComponent, uart_UARTComponent } from "../markers";
export interface DlmsMeterProps extends _CoreComponent {
    /**
     * string: Key used to decrypt DLMS telegrams. Obtain this from your provider / grid operator.
     * @yamlKey decryption_key
     */
    decryptionKey: unknown;
    /** Grid operator profile. Options: */
    provider?: "generic" | "netznoe";
    /** @yamlKey uart_id */
    uartId?: RefProp<uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            dlms_meter: DlmsMeterProps & ComponentProps<dlms_meter_DlmsMeterComponent>;
        }
    }
}
