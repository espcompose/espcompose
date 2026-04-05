// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent, _Stepper } from "../bases";
import type { __marker_a4988_A4988, __marker_uln2003_ULN2003 } from "../markers";
interface A4988Props extends _Stepper, _CoreComponent {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The `STEP` pin of the A4988 stepper driver.
     * @yamlKey step_pin
     */
    stepPin: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The `DIRECTION` pin of the A4988 stepper driver.
     * @yamlKey dir_pin
     */
    dirPin: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): Optionally also use the `SLEEP` pin of the A4988 stepper driver...
     * @yamlKey sleep_pin
     */
    sleepPin?: Pin;
}
interface Uln2003Props extends _Stepper, _CoreComponent {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin a of the stepper control board.
     * @yamlKey pin_a
     */
    pinA: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin b of the stepper control board.
     * @yamlKey pin_b
     */
    pinB: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin c of the stepper control board.
     * @yamlKey pin_c
     */
    pinC: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin d of the stepper control board.
     * @yamlKey pin_d
     */
    pinD: Pin;
    /**
     * boolean: Whether to turn off all coils when the stepper has reached the target position
     * @yamlKey sleep_when_done
     */
    sleepWhenDone?: boolean;
    /**
     * string: The step mode to operate the motor with. One of:
     * @yamlKey step_mode
     */
    stepMode?: "FULL_STEP" | "HALF_STEP" | "WAVE_DRIVE";
}
export type StepperProps = ({
    platform: "a4988";
} & A4988Props & ComponentProps<__marker_a4988_A4988>) | ({
    platform: "uln2003";
} & Uln2003Props & ComponentProps<__marker_uln2003_ULN2003>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            stepper: StepperProps;
        }
    }
}
