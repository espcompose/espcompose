// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { esp32_touch_ESP32TouchComponent } from "../markers";
export interface Esp32TouchProps extends _CoreComponent {
    /**
     * boolean: Whether debug messages with the touch pad value should
     * @yamlKey setup_mode
     */
    setupMode?: boolean | EmbedValue<boolean>;
    /**
     * [Time](/guides/configuration-types#time): Set a time period denoting the amount of time the touch peripheral should s...
     * @yamlKey sleep_duration
     */
    sleepDuration?: TimePeriod;
    /**
     * [Time](/guides/configuration-types#time): Set the conversion time for all touch pads. A longer conversion time means ...
     * @yamlKey measurement_duration
     */
    measurementDuration?: TimePeriod;
    /**
     * The low voltage reference to use for the charge cycles. One of `0.5V`, `0.6V`, `0.7V`, `0.8V`. Default is `0.5V`.
     * @yamlKey low_voltage_reference
     */
    lowVoltageReference?: unknown;
    /**
     * The high voltage reference to use for the charge cycles. One of `2.4V`, `2.5V`, `2.6V`, `2.7V`. Default is `2.7V`.
     * @yamlKey high_voltage_reference
     */
    highVoltageReference?: unknown;
    /**
     * ESP32 only: The voltage attenuation to use for the charge cycles. One of `1.5V`, `1V`, `0.5V`, `0V`. Default is `0V`.
     * @yamlKey voltage_attenuation
     */
    voltageAttenuation?: unknown;
    /**
     * [Time](/guides/configuration-types#time): Optionally set up an [Infinite Impulse Response](https://en.wikipedia.org/w...
     * @yamlKey iir_filter
     */
    iirFilter?: TimePeriod;
    /**
     * `int` range 0-7: Sets the debounce count; if the measured values continue to exceed the threshold for `n + 1` times, ...
     * @yamlKey debounce_count
     */
    debounceCount?: number | EmbedValue<number>;
    /**
     * Sets the filter mode. Must be one of `IIR_4`, `IIR_8`, `IIR_16`, `IIR_32`, `IIR_64`, `IIR_128`, `IIR_256` (S2/S3 only...
     * @yamlKey filter_mode
     */
    filterMode?: "IIR_4" | "IIR_8" | "IIR_16" | "IIR_32" | "IIR_64" | "IIR_128" | "IIR_256" | "JITTER";
    /**
     * `int` range 0-3: Noise threshold coefficient. Higher = More noise resistance. The actual noise should be less than (n...
     * @yamlKey noise_threshold
     */
    noiseThreshold?: number | EmbedValue<number>;
    /**
     * `int` range 0-15: Set jitter filter step size.
     * @yamlKey jitter_step
     */
    jitterStep?: number | EmbedValue<number>;
    /**
     * Level of filter applied on the original data against large noise interference. Must be one of `OFF`, `IIR_2`, `IIR_4`...
     * @yamlKey smooth_mode
     */
    smoothMode?: "OFF" | "IIR_2" | "IIR_4" | "IIR_8";
    /**
     * Sets the denoise range of the denoise channel. Determined by measuring the noise amplitude of the denoise channel. Mu...
     * @yamlKey denoise_grade
     */
    denoiseGrade?: "BIT12" | "BIT10" | "BIT8" | "BIT4";
    /**
     * Select internal reference capacitance of denoise channel. Must be one of `L0`, `L1`, `L2`, `L3`, `L4`, `L5`, `L6` or ...
     * @yamlKey denoise_cap_level
     */
    denoiseCapLevel?: "L0" | "L1" | "L2" | "L3" | "L4" | "L5" | "L6" | "L7";
    /**
     * [Pin](/guides/configuration-types#pin): Sets the touch channel to use for the guard pad. The guard pad is used to det...
     * @yamlKey waterproof_guard_ring
     */
    waterproofGuardRing?: unknown;
    /**
     * Shield channel drive capability configuration; the larger the parasitic capacitance on the shielding channel, the hig...
     * @yamlKey waterproof_shield_driver
     */
    waterproofShieldDriver?: number | EmbedValue<number>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            esp32_touch: Esp32TouchProps & ComponentProps<esp32_touch_ESP32TouchComponent>;
        }
    }
}
