// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { micro_wake_word_MicroWakeWord, microphone_Microphone } from "../markers";
export interface MicroWakeWordMicrophoneProps {
    microphone?: RefProp<microphone_Microphone>;
    /** @yamlKey bits_per_sample */
    bitsPerSample?: number | "8bit" | "16bit" | "24bit" | "32bit";
    channels?: Array<number>;
    /** @yamlKey gain_factor */
    gainFactor?: number;
}
export interface MicroWakeWordModelsProps {
    /** string: This can be one of: */
    model?: unknown;
    /** @yamlKey probability_cutoff */
    probabilityCutoff?: unknown;
    /** @yamlKey sliding_window_size */
    slidingWindowSize?: number;
    internal?: boolean;
}
export interface MicroWakeWordProps extends _CoreComponent {
    /** [Microphone Source Configuration](/components/microphone#config-microphone-source): The [microphone](/components/micr... */
    microphone?: MicroWakeWordMicrophoneProps;
    /** list: The models to use. Only the first model is enabled by default on the first boot. Each model's enabled state is ... */
    models: Array<MicroWakeWordModelsProps>;
    /** @yamlKey on_wake_word_detected */
    onWakeWordDetected?: TriggerHandler;
    vad?: unknown;
    /**
     * boolean: Whether to stop the component after detecting a wake word. Defaults to `true`.
     * @yamlKey stop_after_detection
     */
    stopAfterDetection?: boolean;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            micro_wake_word: MicroWakeWordProps & ComponentProps<micro_wake_word_MicroWakeWord>;
        }
    }
}
