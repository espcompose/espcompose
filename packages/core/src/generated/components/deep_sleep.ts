// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_deep_sleep_DeepSleepComponent } from "../markers";
export interface DeepSleepEsp32Ext1WakeupProps {
    /** The mode to use for the wakeup source. Must be one of: */
    mode: "ALL_LOW" | "ANY_HIGH" | "ANY_LOW";
    /** list of pin numbers: The pins to wake up on. */
    pins: Array<Pin>;
}
export interface DeepSleepProps extends _CoreComponent {
    /**
     * Use the EXT1 wakeup source of the ESP32 to wake from deep sleep to wake up on multiple pins. This cannot be used toge...
     * @yamlKey esp32_ext1_wakeup
     */
    esp32Ext1Wakeup?: DeepSleepEsp32Ext1WakeupProps;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The time duration the node should be active, i.e. run cod...
     * @yamlKey run_duration
     */
    runDuration?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The time duration to stay in deep sleep mode. On BK72xx, ...
     * @yamlKey sleep_duration
     */
    sleepDuration?: TimePeriod;
    /**
     * boolean: Only on ESP32. Use a touch event to wakeup from deep sleep. To be able to wakeup from a touch event, [Binary...
     * @yamlKey touch_wakeup
     */
    touchWakeup?: boolean;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema) / list: Only on ESP32/BK72xx. A single pin to ...
     * @yamlKey wakeup_pin
     */
    wakeupPin?: unknown;
    /**
     * Only on ESP32/BK72xx. Specify how to handle waking up from a `wakeup_pin` if the wakeup pin is already in the state w...
     * @yamlKey wakeup_pin_mode
     */
    wakeupPinMode?: "IGNORE" | "INVERT_WAKEUP" | "KEEP_AWAKE";
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            deep_sleep: DeepSleepProps & ComponentProps<__marker_deep_sleep_DeepSleepComponent>;
        }
    }
}
