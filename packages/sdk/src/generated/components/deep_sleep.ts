// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { deep_sleep_DeepSleepComponent } from "../markers";
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
    runDuration?: TimePeriod;
    /**
     * [Time](/guides/configuration-types#time): The time duration to stay in deep sleep mode. On BK72xx, the maximum is 36 ...
     * @yamlKey sleep_duration
     */
    sleepDuration?: TimePeriod;
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
    touchWakeup?: boolean | EmbedValue<boolean>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            deep_sleep: DeepSleepProps & ComponentProps<deep_sleep_DeepSleepComponent>;
        }
    }
}
