// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_sim800l_Sim800LComponent, __marker_uart_UARTComponent } from "../markers";
export interface Sim800lProps extends _CoreComponent {
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when a call is connected, either because an o...
     * @yamlKey on_call_connected
     */
    onCallConnected?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when a call is disconnected.
     * @yamlKey on_call_disconnected
     */
    onCallDisconnected?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when a call is received. See [`on_incoming_ca...
     * @yamlKey on_incoming_call
     */
    onIncomingCall?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when an SMS is received. See [`on_sms_receive...
     * @yamlKey on_sms_received
     */
    onSmsReceived?: TriggerHandler;
    /** @yamlKey on_ussd_received */
    onUssdReceived?: TriggerHandler;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the UART hub.
     * @yamlKey uart_id
     */
    uartId?: RefProp<__marker_uart_UARTComponent>;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            sim800l: Sim800lProps & ComponentProps<__marker_sim800l_Sim800LComponent>;
        }
    }
}
