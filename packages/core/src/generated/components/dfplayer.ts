// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_dfplayer_DFPlayer, __marker_uart_UARTComponent } from "../markers";
export interface DfplayerProps {
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when playback is finished.
     * @yamlKey on_finished_playback
     */
    onFinishedPlayback?: TriggerHandler;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the UART hub.
     * @yamlKey uart_id
     */
    uartId?: RefProp<__marker_uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            dfplayer: DfplayerProps & ComponentProps<__marker_dfplayer_DFPlayer>;
        }
    }
}
