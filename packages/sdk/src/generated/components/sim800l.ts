// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { sim800l_Sim800LComponent, uart_UARTComponent } from "../markers";
export interface Sim800lProps extends _CoreComponent {
    /**
     * [Automation](/automations): An action to be performed when an SMS is received. See [`on_sms_received` Trigger](https:...
     * @yamlKey on_sms_received
     */
    onSmsReceived?: TriggerHandler;
    /**
     * [Automation](/automations): An action to be performed when a call is received. See [`on_incoming_call` Trigger](https...
     * @yamlKey on_incoming_call
     */
    onIncomingCall?: TriggerHandler;
    /**
     * [Automation](/automations): An action to be performed when a call is connected, either because an outgoing call accep...
     * @yamlKey on_call_connected
     */
    onCallConnected?: TriggerHandler;
    /**
     * [Automation](/automations): An action to be performed when a call is disconnected.
     * @yamlKey on_call_disconnected
     */
    onCallDisconnected?: TriggerHandler;
    /** @yamlKey on_ussd_received */
    onUssdReceived?: TriggerHandler;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the UART hub.
     * @yamlKey uart_id
     */
    uartId?: RefProp<uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            sim800l: Sim800lProps & ComponentProps<sim800l_Sim800LComponent>;
        }
    }
}
