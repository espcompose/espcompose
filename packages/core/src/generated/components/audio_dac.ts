// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_aic3204_AIC3204, __marker_es8156_ES8156, __marker_es8311_ES8311, __marker_es8388_ES8388, __marker_i2c_I2CBus } from "../markers";
interface Aic3204Props extends _CoreComponent {
    /**
     * The ID of the [I²C bus](/components/i2c) the AIC3204 is connected to.
     * @yamlKey i2c_id
     */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** int: The I²C address of the driver. Defaults to `0x18`. */
    address?: number;
}
interface Es8156Props extends _CoreComponent {
    /**
     * The ID of the [I²C bus](/components/i2c) the ES8156 is connected to.
     * @yamlKey i2c_id
     */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** int: The I²C address of the driver. Defaults to `0x18`. */
    address?: number;
}
interface Es8311Props extends _CoreComponent {
    /**
     * enum: The bit depth of the audio samples. One of `16bit`, `24bit`, or `32bit`. Defaults to `16bit`.
     * @yamlKey bits_per_sample
     */
    bitsPerSample?: ("16" | "24" | "32") | "8bit" | "16bit" | "24bit" | "32bit";
    /**
     * enum: The gain applied to the ADC microphones. One of `0DB`, `6DB`, `12DB`, `18DB`, `24DB`, `30DB`, `36DB`, `42DB`. D...
     * @yamlKey mic_gain
     */
    micGain?: "0DB" | "6DB" | "12DB" | "18DB" | "24DB" | "30DB" | "36DB" | "42DB";
    /**
     * positive integer: I2S sample rate. Defaults to `16000`.
     * @yamlKey sample_rate
     */
    sampleRate?: number;
    /**
     * bool: Use the MCLK signal to control the clock. Defaults to `True`.
     * @yamlKey use_mclk
     */
    useMclk?: boolean;
    /**
     * bool: Configure the codec's ADC to use PDM microphone input instead of analog. Defaults to False.
     * @yamlKey use_microphone
     */
    useMicrophone?: boolean;
    /**
     * The ID of the [I²C bus](/components/i2c) the ES8311 is connected to.
     * @yamlKey i2c_id
     */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** int: The I²C address of the driver. Defaults to `0x18`. */
    address?: number;
}
interface Es8388Props extends _CoreComponent {
    /**
     * The ID of the [I²C bus](/components/i2c) the ES8388 is connected to.
     * @yamlKey i2c_id
     */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** int: The I²C address of the driver. Defaults to `0x10`. */
    address?: number;
}
export type AudioDacProps = ({
    platform: "aic3204";
} & Aic3204Props & ComponentProps<__marker_aic3204_AIC3204>) | ({
    platform: "es8156";
} & Es8156Props & ComponentProps<__marker_es8156_ES8156>) | ({
    platform: "es8311";
} & Es8311Props & ComponentProps<__marker_es8311_ES8311>) | ({
    platform: "es8388";
} & Es8388Props & ComponentProps<__marker_es8388_ES8388>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            audio_dac: AudioDacProps;
        }
    }
}
