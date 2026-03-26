// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { output_FloatOutput, servo_Servo } from "../markers";
export interface ServoProps extends _CoreComponent {
    /** [ID](/guides/configuration-types#id): The ID of the [output component](/components/output/) to use for this servo. */
    output: RefProp<output_FloatOutput>;
    /**
     * percentage: The PWM duty cycle the minimum value (-100%) will map to. Defaults to `3%`.
     * @yamlKey min_level
     */
    minLevel?: number;
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
    /** boolean: Whether to restore the state of the servo motor at startup. This is useful if you have an absolute servo mot... */
    restore?: boolean;
    /**
     * [Time](/guides/configuration-types#time): The time after reaching the target value when the servo will be detached`, ...
     * @yamlKey auto_detach_time
     */
    autoDetachTime?: TimePeriod;
    /**
     * [Time](/guides/configuration-types#time): The time needed for a full movement (-1.0 to 1.0). This will effectively li...
     * @yamlKey transition_length
     */
    transitionLength?: TimePeriod;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            servo: ServoProps & ComponentProps<servo_Servo>;
        }
    }
}
