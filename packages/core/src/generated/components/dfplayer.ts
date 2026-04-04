// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { dfplayer_DFPlayer, uart_UARTComponent } from "../markers";
export interface DfplayerProps {
    /**
     * [Automation](/automations): An action to be performed when playback is finished.
     * @yamlKey on_finished_playback
     */
    onFinishedPlayback?: TriggerHandler;
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the UART hub.
     * @yamlKey uart_id
     */
    uartId?: RefProp<uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            dfplayer: DfplayerProps & ComponentProps<dfplayer_DFPlayer>;
        }
    }
}
