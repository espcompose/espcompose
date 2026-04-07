// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_i2s_audio_I2SAudioComponent } from "../markers";
export interface I2sAudioProps {
    /**
     * [Pin](/guides/configuration-types#pin): The GPIO pin to use for the I²S `LRCLK` *(Left/Right Clock)* signal, also ref...
     * @yamlKey i2s_lrclk_pin
     */
    i2sLrclkPin: Pin;
    /**
     * [Pin](/guides/configuration-types#pin): The GPIO pin to use for the I²S `BCLK` *(Bit Clock)* signal, also referred to...
     * @yamlKey i2s_bclk_pin
     */
    i2sBclkPin?: Pin;
    /**
     * [Pin](/guides/configuration-types#pin): The GPIO pin to use for the I²S `MCLK` *(Master Clock)* signal.
     * @yamlKey i2s_mclk_pin
     */
    i2sMclkPin?: Pin;
    /**
     * boolean*: Use the legacy I²S driver when using esp-idf framework version 5.x.x. Not valid for Arduino framework or es...
     * @yamlKey use_legacy
     */
    useLegacy?: boolean;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            i2s_audio: I2sAudioProps & ComponentProps<__marker_i2s_audio_I2SAudioComponent>;
        }
    }
}
