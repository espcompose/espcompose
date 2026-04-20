// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_sun_Sun, __marker_time_RealTimeClock } from "../markers";
export interface SunProps {
    /** float: The latitude for performing the calculation. */
    latitude: number;
    /** float: The longitude for performing the calculation. */
    longitude: number;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform at sunrise when the sun crosses a specified an...
     * @yamlKey on_sunrise
     */
    onSunrise?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform at sunset when the sun crosses a specified angle.
     * @yamlKey on_sunset
     */
    onSunset?: TriggerHandler;
    /** @yamlKey time_id */
    timeId?: RefProp<__marker_time_RealTimeClock>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            sun: SunProps & ComponentProps<__marker_sun_Sun>;
        }
    }
}
