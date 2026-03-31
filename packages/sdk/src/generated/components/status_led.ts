// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { status_led_StatusLED } from "../markers";
export interface StatusLedProps extends _CoreComponent {
    /** [Pin Schema](/guides/configuration-types#pin-schema): The GPIO pin to control the LED on. */
    pin: Pin | EmbedValue<Pin>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            status_led: StatusLedProps & ComponentProps<status_led_StatusLED>;
        }
    }
}
