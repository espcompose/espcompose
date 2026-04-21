// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_i2s_audio_I2SAudioComponent } from "../markers";
export interface I2sAudioProps {
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The GPIO pin to use for the I²S `BCLK` *(Bit Clock)* signal...
     * @yamlKey i2s_bclk_pin
     */
    i2sBclkPin?: Pin;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The GPIO pin to use for the I²S `LRCLK` *(Left/Right Clock)...
     * @yamlKey i2s_lrclk_pin
     */
    i2sLrclkPin: Pin;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The GPIO pin to use for the I²S `MCLK` *(Master Clock)* sig...
     * @yamlKey i2s_mclk_pin
     */
    i2sMclkPin?: Pin;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            i2s_audio: I2sAudioProps & ComponentProps<__marker_i2s_audio_I2SAudioComponent>;
        }
    }
}
