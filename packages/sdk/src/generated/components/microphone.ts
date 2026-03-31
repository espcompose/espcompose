// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, TriggerHandler } from "../../types";
import type { _I2sAudioMicrophoneBase } from "../bases";
interface I2sAudioInternalProps extends _I2sAudioMicrophoneBase {
    /** @yamlKey adc_pin */
    adcPin: Pin | EmbedValue<Pin>;
}
interface I2sAudioExternalProps extends _I2sAudioMicrophoneBase {
    /** @yamlKey i2s_din_pin */
    i2sDinPin: Pin | EmbedValue<Pin>;
    pdm?: boolean | EmbedValue<boolean>;
}
export type MicrophoneProps = ({
    platform: "i2s_audio";
    adcType: "internal";
} & I2sAudioInternalProps & ComponentProps) | ({
    platform: "i2s_audio";
    adcType: "external";
} & I2sAudioExternalProps & ComponentProps);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            microphone: MicrophoneProps;
        }
    }
}
