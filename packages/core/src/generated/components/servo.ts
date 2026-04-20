// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_output_FloatOutput, __marker_servo_Servo } from "../markers";
export interface ServoProps extends _CoreComponent {
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The time after reaching the target value when the servo w...
     * @yamlKey auto_detach_time
     */
    autoDetachTime?: TimePeriod;
    /**
     * percentage: The PWM duty cycle the idle value (0%) will map to. This is also the state of the servo at startup. Defau...
     * @yamlKey idle_level
     */
    idleLevel?: number;
    /**
     * percentage: The PWM duty cycle the maximum value (100%) will map to. Defaults to `12.0%`.
     * @yamlKey max_level
     */
    maxLevel?: number;
    /**
     * percentage: The PWM duty cycle the minimum value (-100%) will map to. Defaults to `3%`.
     * @yamlKey min_level
     */
    minLevel?: number;
    /** [ID](https://esphome.io/guides/configuration-types#id): The ID of the [output component](https://esphome.io/component... */
    output: RefProp<__marker_output_FloatOutput>;
    /** boolean: Whether to restore the state of the servo motor at startup. This is useful if you have an absolute servo mot... */
    restore?: boolean;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The time needed for a full movement (-1.0 to 1.0). This w...
     * @yamlKey transition_length
     */
    transitionLength?: TimePeriod;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            servo: ServoProps & ComponentProps<__marker_servo_Servo>;
        }
    }
}
