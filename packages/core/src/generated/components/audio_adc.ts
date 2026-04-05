// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_es7210_ES7210, __marker_es7243e_ES7243E, __marker_i2c_I2CBus } from "../markers";
interface Es7210Props extends _CoreComponent {
    /**
     * enum: The bit depth of the audio samples. One of `16bit`, `24bit` or `32bit`. Defaults to `16bit`.
     * @yamlKey bits_per_sample
     */
    bitsPerSample?: ("16" | "24" | "32") | "8bit" | "16bit" | "24bit" | "32bit";
    /**
     * enum: The gain applied to the ADC microphones. One of `0DB`, `3DB`, `6DB`, `9DB`, `12DB`, `15DB`, `18DB`, `21DB`, `24...
     * @yamlKey mic_gain
     */
    micGain?: "0" | "3" | "6" | "9" | "12" | "15" | "18" | "21" | "24" | "27" | "30" | "33" | "36" | "34.5" | "37.5";
    /**
     * positive integer: I2S sample rate. Defaults to `16000`.
     * @yamlKey sample_rate
     */
    sampleRate?: number;
    /**
     * The ID of the [I²C bus](/components/i2c) the ES7210 is connected to.
     * @yamlKey i2c_id
     */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** int: The I²C address of the driver. Defaults to `0x40`. */
    address?: number;
}
interface Es7243eProps extends _CoreComponent {
    /**
     * enum: The gain applied to the ADC microphones. One of `0DB`, `3DB`, `6DB`, `9DB`, `12DB`, `15DB`, `18DB`, `21DB`, `24...
     * @yamlKey mic_gain
     */
    micGain?: "0" | "3" | "6" | "9" | "12" | "15" | "18" | "21" | "24" | "27" | "30" | "33" | "36" | "34.5" | "37.5";
    /**
     * The ID of the [I²C bus](/components/i2c) the ES7243e is connected to.
     * @yamlKey i2c_id
     */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
    /** int: The I²C address of the driver. Defaults to `0x40`. */
    address?: number;
}
export type AudioAdcProps = ({
    platform: "es7210";
} & Es7210Props & ComponentProps<__marker_es7210_ES7210>) | ({
    platform: "es7243e";
} & Es7243eProps & ComponentProps<__marker_es7243e_ES7243E>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            audio_adc: AudioAdcProps;
        }
    }
}
