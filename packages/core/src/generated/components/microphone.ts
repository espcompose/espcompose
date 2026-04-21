// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, TriggerHandler } from "../../types";
import type { _I2sAudioMicrophoneBase } from "../bases";
interface I2sAudioExternalProps extends _I2sAudioMicrophoneBase {
    /** @yamlKey i2s_din_pin */
    i2sDinPin: Pin;
    pdm?: boolean;
}
interface I2sAudioInternalProps extends _I2sAudioMicrophoneBase {
    /** @yamlKey adc_pin */
    adcPin: Pin;
}
export type MicrophoneProps = ({
    platform: "i2s_audio";
    adcType: "external";
} & I2sAudioExternalProps & ComponentProps) | ({
    platform: "i2s_audio";
    adcType: "internal";
} & I2sAudioInternalProps & ComponentProps);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            microphone: MicrophoneProps;
        }
    }
}
