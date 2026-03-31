// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { sun_Sun, time_RealTimeClock } from "../markers";
export interface SunProps {
    /** @yamlKey time_id */
    timeId?: RefProp<time_RealTimeClock>;
    /** float: The latitude for performing the calculation. */
    latitude: number;
    /** float: The longitude for performing the calculation. */
    longitude: number;
    /**
     * [Automation](/automations): An automation to perform at sunrise when the sun crosses a specified angle.
     * @yamlKey on_sunrise
     */
    onSunrise?: TriggerHandler;
    /**
     * [Automation](/automations): An automation to perform at sunset when the sun crosses a specified angle.
     * @yamlKey on_sunset
     */
    onSunset?: TriggerHandler;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            sun: SunProps & ComponentProps<sun_Sun>;
        }
    }
}
