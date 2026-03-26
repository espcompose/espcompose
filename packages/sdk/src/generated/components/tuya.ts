// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { time_RealTimeClock, tuya_Tuya, uart_UARTComponent } from "../markers";
export interface TuyaProps extends _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): Some Tuya devices support obtaining local time from ESPHome. Specify the ID of ...
     * @yamlKey time_id
     */
    timeId?: RefProp<time_RealTimeClock>;
    /**
     * list: A list of datapoints to ignore MCU updates for. Useful for certain broken/erratic hardware and debugging.
     * @yamlKey ignore_mcu_update_on_datapoints
     */
    ignoreMcuUpdateOnDatapoints?: Array<number>;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): Some Tuya devices support WiFi status reporting ONLY through gp...
     * @yamlKey status_pin
     */
    statusPin?: Pin;
    /**
     * An automation to perform when a Tuya datapoint update is received. See [`on_datapoint_update`](https://esphome.io/com...
     * @yamlKey on_datapoint_update
     */
    onDatapointUpdate?: TriggerHandler;
    /** @yamlKey uart_id */
    uartId?: RefProp<uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            tuya: TuyaProps & ComponentProps<tuya_Tuya>;
        }
    }
}
