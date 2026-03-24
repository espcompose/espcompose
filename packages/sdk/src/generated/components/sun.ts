// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { sun_Sun, time_RealTimeClock } from "../markers";
export interface SunProps {
    /** @yamlKey time_id */
    timeId?: RefProp<time_RealTimeClock>;
    /** float: The latitude for performing the calculation. */
    latitude: unknown;
    /** float: The longitude for performing the calculation. */
    longitude: unknown;
    /**
     * [Automation](/automations): An automation to perform at sunrise when the sun crosses a specified angle.
     * @yamlKey on_sunrise
     */
    onSunrise?: () => void;
    /**
     * [Automation](/automations): An automation to perform at sunset when the sun crosses a specified angle.
     * @yamlKey on_sunset
     */
    onSunset?: () => void;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            sun: SunProps & ComponentProps<sun_Sun>;
        }
    }
}
