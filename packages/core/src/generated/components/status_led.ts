// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_status_led_StatusLED } from "../markers";
export interface StatusLedProps extends _CoreComponent {
    /** [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The GPIO pin to control the LED on. */
    pin?: Pin;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            status_led: StatusLedProps & ComponentProps<__marker_status_led_StatusLED>;
        }
    }
}
