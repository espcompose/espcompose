// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_media_player_MediaPlayer, __marker_micro_wake_word_MicroWakeWord, __marker_microphone_Microphone, __marker_speaker_Speaker, __marker_voice_assistant_VoiceAssistant } from "../markers";
export interface VoiceAssistantMicrophoneProps {
    /** @yamlKey bits_per_sample */
    bitsPerSample?: number | "8bit" | "16bit" | "24bit" | "32bit";
    channels?: Array<number>;
    /** @yamlKey gain_factor */
    gainFactor?: number;
    microphone?: RefProp<__marker_microphone_Microphone>;
}
export interface VoiceAssistantProps extends _CoreComponent {
    /**
     * dBFS: Auto gain level to apply to the assist pipeline. Between 0dBFS and 31dBFS inclusive. Defaults to 0 (disabled).
     * @yamlKey auto_gain
     */
    autoGain?: number;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): How long to wait before resetting the `conversation_id` s...
     * @yamlKey conversation_timeout
     */
    conversationTimeout?: TimePeriod;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The [media_player](https://esphome.io/components/media_player...
     * @yamlKey media_player
     */
    mediaPlayer?: RefProp<__marker_media_player_MediaPlayer>;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The [micro_wake_word](https://esphome.io/components/micro_wak...
     * @yamlKey micro_wake_word
     */
    microWakeWord?: RefProp<__marker_micro_wake_word_MicroWakeWord>;
    /** [Microphone Source Configuration](https://esphome.io/components/microphone#config-microphone-source): The [microphone... */
    microphone?: VoiceAssistantMicrophoneProps;
    /**
     * integer: The noise suppression level to apply to the assist pipeline. Between 0 and 4 inclusive. Defaults to 0 (disab...
     * @yamlKey noise_suppression_level
     */
    noiseSuppressionLevel?: number;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when Home Assistant has connected and is waiti...
     * @yamlKey on_client_connected
     */
    onClientConnected?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when Home Assistant disconnects from the Voice...
     * @yamlKey on_client_disconnected
     */
    onClientDisconnected?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the voice assistant is finished all tasks.
     * @yamlKey on_end
     */
    onEnd?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the voice assistant has encountered an er...
     * @yamlKey on_error
     */
    onError?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the voice assistant is idle (no other act...
     * @yamlKey on_idle
     */
    onIdle?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when intent processing ends.
     * @yamlKey on_intent_end
     */
    onIntentEnd?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when intent progress happens. The variable `x`...
     * @yamlKey on_intent_progress
     */
    onIntentProgress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when intent processing starts.
     * @yamlKey on_intent_start
     */
    onIntentStart?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the voice assistant microphone starts lis...
     * @yamlKey on_listening
     */
    onListening?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the assist pipeline is started.
     * @yamlKey on_start
     */
    onStart?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the voice assistant has finished speech-t...
     * @yamlKey on_stt_end
     */
    onSttEnd?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when voice activity detection ends speech-to-t...
     * @yamlKey on_stt_vad_end
     */
    onSttVadEnd?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when voice activity detection starts speech-to...
     * @yamlKey on_stt_vad_start
     */
    onSttVadStart?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a voice assistant timer has been cancelle...
     * @yamlKey on_timer_cancelled
     */
    onTimerCancelled?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a voice assistant timer has finished. The...
     * @yamlKey on_timer_finished
     */
    onTimerFinished?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a voice assistant timer has started. The ...
     * @yamlKey on_timer_started
     */
    onTimerStarted?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the voice assistant timers tick is trigge...
     * @yamlKey on_timer_tick
     */
    onTimerTick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a voice assistant timer has been updated ...
     * @yamlKey on_timer_updated
     */
    onTimerUpdated?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the voice assistant has finished text-to-...
     * @yamlKey on_tts_end
     */
    onTtsEnd?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the voice assistant has started text-to-s...
     * @yamlKey on_tts_start
     */
    onTtsStart?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when audio stream (voice response) playback en...
     * @yamlKey on_tts_stream_end
     */
    onTtsStreamEnd?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when audio stream (voice response) playback st...
     * @yamlKey on_tts_stream_start
     */
    onTtsStreamStart?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the assist pipeline has detected a wake w...
     * @yamlKey on_wake_word_detected
     */
    onWakeWordDetected?: TriggerHandler;
    /** [ID](https://esphome.io/guides/configuration-types#id): The [speaker](https://esphome.io/components/speaker/) to use ... */
    speaker?: RefProp<__marker_speaker_Speaker>;
    /**
     * boolean: Enable wake word on the assist pipeline. Defaults to `false`.
     * @yamlKey use_wake_word
     */
    useWakeWord?: boolean;
    /**
     * float: Volume multiplier to apply to the assist pipeline. Must be larger than 0. Defaults to 1 (disabled).
     * @yamlKey volume_multiplier
     */
    volumeMultiplier?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            voice_assistant: VoiceAssistantProps & ComponentProps<__marker_voice_assistant_VoiceAssistant>;
        }
    }
}
