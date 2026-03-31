// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { output_FloatOutput, rtttl_Rtttl, speaker_Speaker } from "../markers";
export interface RtttlProps extends _CoreComponent {
    /** [ID](/guides/configuration-types#id): The id of the [float output](/components/output) to use for this buzzer. */
    output?: RefProp<output_FloatOutput>;
    /** [ID](/guides/configuration-types#id): The id of the [Speaker](/components/speaker) to play the song on. */
    speaker?: RefProp<speaker_Speaker>;
    /** Percentage: With this value you can set the volume of the sound. */
    gain?: number;
    /**
     * [Automation](/automations): An action to be performed when playback is finished.
     * @yamlKey on_finished_playback
     */
    onFinishedPlayback?: TriggerHandler;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            rtttl: RtttlProps & ComponentProps<rtttl_Rtttl>;
        }
    }
}
