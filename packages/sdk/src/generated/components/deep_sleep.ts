// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { deep_sleep_DeepSleepComponent } from "../markers";
export interface DeepSleepRunDurationPropsDefaultProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface DeepSleepRunDurationPropsTouchWakeupReasonProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface DeepSleepRunDurationPropsGpioWakeupReasonProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface DeepSleepRunDurationProps {
    /** [Time](/guides/configuration-types#time): default run duration for timer wakeup and any unspecified wakeup reason. */
    default: DeepSleepRunDurationPropsDefaultProps;
    /**
     * [Time](/guides/configuration-types#time): run duration if woken up by touch.
     * @yamlKey touch_wakeup_reason
     */
    touchWakeupReason?: DeepSleepRunDurationPropsTouchWakeupReasonProps;
    /**
     * [Time](/guides/configuration-types#time): run duration if woken up by GPIO.
     * @yamlKey gpio_wakeup_reason
     */
    gpioWakeupReason?: DeepSleepRunDurationPropsGpioWakeupReasonProps;
}
export interface DeepSleepSleepDurationProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface DeepSleepEsp32Ext1WakeupProps {
    /** list of pin numbers: The pins to wake up on. */
    pins: Array<Pin>;
    /** The mode to use for the wakeup source. Must be one of: */
    mode: "ANY_LOW" | "ALL_LOW" | "ANY_HIGH";
}
export interface DeepSleepProps extends _CoreComponent {
    /**
     * [Time](/guides/configuration-types#time): The time duration the node should be active, i.e. run code. Only on ESP32, ...
     * @yamlKey run_duration
     */
    runDuration?: DeepSleepRunDurationProps;
    /**
     * [Time](/guides/configuration-types#time): The time duration to stay in deep sleep mode. On BK72xx, the maximum is 36 ...
     * @yamlKey sleep_duration
     */
    sleepDuration?: DeepSleepSleepDurationProps;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema) / list: Only on ESP32/BK72xx. A single pin to wake up to once in...
     * @yamlKey wakeup_pin
     */
    wakeupPin?: unknown;
    /**
     * Only on ESP32/BK72xx. Specify how to handle waking up from a `wakeup_pin` if the wakeup pin is already in the state w...
     * @yamlKey wakeup_pin_mode
     */
    wakeupPinMode?: "IGNORE" | "KEEP_AWAKE" | "INVERT_WAKEUP";
    /**
     * Use the EXT1 wakeup source of the ESP32 to wake from deep sleep to wake up on multiple pins. This cannot be used toge...
     * @yamlKey esp32_ext1_wakeup
     */
    esp32Ext1Wakeup?: DeepSleepEsp32Ext1WakeupProps;
    /**
     * boolean: Only on ESP32. Use a touch event to wakeup from deep sleep. To be able to wakeup from a touch event, [Binary...
     * @yamlKey touch_wakeup
     */
    touchWakeup?: boolean;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            deep_sleep: DeepSleepProps & ComponentProps<deep_sleep_DeepSleepComponent>;
        }
    }
}
