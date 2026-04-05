// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_output_FloatOutput, __marker_rtttl_Rtttl, __marker_speaker_Speaker } from "../markers";
export interface RtttlProps extends _CoreComponent {
    /** [ID](/guides/configuration-types#id): The id of the [float output](/components/output) to use for this buzzer. */
    output?: RefProp<__marker_output_FloatOutput>;
    /** [ID](/guides/configuration-types#id): The id of the [Speaker](/components/speaker) to play the song on. */
    speaker?: RefProp<__marker_speaker_Speaker>;
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
            rtttl: RtttlProps & ComponentProps<__marker_rtttl_Rtttl>;
        }
    }
}
