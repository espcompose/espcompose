// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_output_FloatOutput, __marker_rtttl_Rtttl, __marker_speaker_Speaker } from "../markers";
export interface RtttlProps extends _CoreComponent {
    /** Percentage: With this value you can set the volume of the sound. */
    gain?: number;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when playback is finished.
     * @yamlKey on_finished_playback
     */
    onFinishedPlayback?: TriggerHandler;
    /** [ID](https://esphome.io/guides/configuration-types#id): The id of the [float output](https://esphome.io/components/ou... */
    output?: RefProp<__marker_output_FloatOutput>;
    /** [ID](https://esphome.io/guides/configuration-types#id): The id of the [Speaker](https://esphome.io/components/speaker... */
    speaker?: RefProp<__marker_speaker_Speaker>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            rtttl: RtttlProps & ComponentProps<__marker_rtttl_Rtttl>;
        }
    }
}
