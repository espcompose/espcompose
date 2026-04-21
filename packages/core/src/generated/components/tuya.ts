// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_time_RealTimeClock, __marker_tuya_Tuya, __marker_uart_UARTComponent } from "../markers";
export interface TuyaProps extends _CoreComponent {
    /**
     * list: A list of datapoints to ignore MCU updates for. Useful for certain broken/erratic hardware and debugging.
     * @yamlKey ignore_mcu_update_on_datapoints
     */
    ignoreMcuUpdateOnDatapoints?: Array<number>;
    /**
     * An automation to perform when a Tuya datapoint update is received. See [`on_datapoint_update`](https://esphome.io/com...
     * @yamlKey on_datapoint_update
     */
    onDatapointUpdate?: TriggerHandler;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): Some Tuya devices support WiFi status reporti...
     * @yamlKey status_pin
     */
    statusPin?: Pin;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Some Tuya devices support obtaining local time from ESPHome. ...
     * @yamlKey time_id
     */
    timeId?: RefProp<__marker_time_RealTimeClock>;
    /** @yamlKey uart_id */
    uartId?: RefProp<__marker_uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            tuya: TuyaProps & ComponentProps<__marker_tuya_Tuya>;
        }
    }
}
