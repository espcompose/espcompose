// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, Ref } from "../../types";
import type { _CoreComponent } from "../bases";
import type { media_player_MediaPlayer, micro_wake_word_MicroWakeWord, microphone_Microphone, speaker_Speaker, voice_assistant_VoiceAssistant } from "../markers";
export interface VoiceAssistantMicrophoneProps {
    microphone?: Ref<microphone_Microphone>;
    /** @yamlKey bits_per_sample */
    bitsPerSample?: number | "8bit" | "16bit" | "24bit" | "32bit";
    channels?: Array<number>;
    /** @yamlKey gain_factor */
    gainFactor?: number;
}
export interface VoiceAssistantConversationTimeoutProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface VoiceAssistantProps extends _CoreComponent {
    /** [Microphone Source Configuration](/components/microphone#config-microphone-source): The [microphone](/components/micr... */
    microphone?: VoiceAssistantMicrophoneProps;
    /**
     * [ID](/guides/configuration-types#id): The [media_player](/components/media_player/) to use to output the response. Ca...
     * @yamlKey media_player
     */
    mediaPlayer?: Ref<media_player_MediaPlayer>;
    /** [ID](/guides/configuration-types#id): The [speaker](/components/speaker/) to use to output the response. Cannot be us... */
    speaker?: Ref<speaker_Speaker>;
    /**
     * boolean: Enable wake word on the assist pipeline. Defaults to `false`.
     * @yamlKey use_wake_word
     */
    useWakeWord?: boolean;
    /**
     * [ID](/guides/configuration-types#id): The [micro_wake_word](/components/micro_wake_word/) component used for wake wor...
     * @yamlKey micro_wake_word
     */
    microWakeWord?: Ref<micro_wake_word_MicroWakeWord>;
    /**
     * integer: The noise suppression level to apply to the assist pipeline. Between 0 and 4 inclusive. Defaults to 0 (disab...
     * @yamlKey noise_suppression_level
     */
    noiseSuppressionLevel?: number;
    /**
     * dBFS: Auto gain level to apply to the assist pipeline. Between 0dBFS and 31dBFS inclusive. Defaults to 0 (disabled).
     * @yamlKey auto_gain
     */
    autoGain?: number;
    /**
     * [Time](/guides/configuration-types#time): How long to wait before resetting the `conversation_id` sent to the voice a...
     * @yamlKey conversation_timeout
     */
    conversationTimeout?: VoiceAssistantConversationTimeoutProps;
    /**
     * float: Volume multiplier to apply to the assist pipeline. Must be larger than 0. Defaults to 1 (disabled).
     * @yamlKey volume_multiplier
     */
    volumeMultiplier?: unknown;
    /**
     * [Automation](/automations): An automation to perform when the voice assistant microphone starts listening.
     * @yamlKey on_listening
     */
    onListening?: () => void;
    /**
     * [Automation](/automations): An automation to perform when the assist pipeline is started.
     * @yamlKey on_start
     */
    onStart?: () => void;
    /**
     * [Automation](/automations): An automation to perform when the assist pipeline has detected a wake word.
     * @yamlKey on_wake_word_detected
     */
    onWakeWordDetected?: () => void;
    /**
     * [Automation](/automations): An automation to perform when the voice assistant has finished speech-to-text. The result...
     * @yamlKey on_stt_end
     */
    onSttEnd?: () => void;
    /**
     * [Automation](/automations): An automation to perform when the voice assistant has started text-to-speech. The text to...
     * @yamlKey on_tts_start
     */
    onTtsStart?: () => void;
    /**
     * [Automation](/automations): An automation to perform when the voice assistant has finished text-to-speech. A URL cont...
     * @yamlKey on_tts_end
     */
    onTtsEnd?: () => void;
    /**
     * [Automation](/automations): An automation to perform when the voice assistant is finished all tasks.
     * @yamlKey on_end
     */
    onEnd?: () => void;
    /**
     * [Automation](/automations): An automation to perform when the voice assistant has encountered an error. The error cod...
     * @yamlKey on_error
     */
    onError?: () => void;
    /**
     * [Automation](/automations): An automation to perform when Home Assistant has connected and is waiting for Voice Assis...
     * @yamlKey on_client_connected
     */
    onClientConnected?: () => void;
    /**
     * [Automation](/automations): An automation to perform when Home Assistant disconnects from the Voice Assistant.
     * @yamlKey on_client_disconnected
     */
    onClientDisconnected?: () => void;
    /**
     * [Automation](/automations): An automation to perform when intent processing starts.
     * @yamlKey on_intent_start
     */
    onIntentStart?: () => void;
    /**
     * [Automation](/automations): An automation to perform when intent progress happens. The variable `x` is a non-empty st...
     * @yamlKey on_intent_progress
     */
    onIntentProgress?: () => void;
    /**
     * [Automation](/automations): An automation to perform when intent processing ends.
     * @yamlKey on_intent_end
     */
    onIntentEnd?: () => void;
    /**
     * [Automation](/automations): An automation to perform when voice activity detection starts speech-to-text processing.
     * @yamlKey on_stt_vad_start
     */
    onSttVadStart?: () => void;
    /**
     * [Automation](/automations): An automation to perform when voice activity detection ends speech-to-text processing.
     * @yamlKey on_stt_vad_end
     */
    onSttVadEnd?: () => void;
    /**
     * [Automation](/automations): An automation to perform when audio stream (voice response) playback starts. Requires `sp...
     * @yamlKey on_tts_stream_start
     */
    onTtsStreamStart?: () => void;
    /**
     * [Automation](/automations): An automation to perform when audio stream (voice response) playback ends. Requires `spea...
     * @yamlKey on_tts_stream_end
     */
    onTtsStreamEnd?: () => void;
    /**
     * [Automation](/automations): An automation to perform when the voice assistant is idle (no other actions/states are in...
     * @yamlKey on_idle
     */
    onIdle?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a voice assistant timer has started. The timer is available...
     * @yamlKey on_timer_started
     */
    onTimerStarted?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a voice assistant timer has been updated (paused/resumed/du...
     * @yamlKey on_timer_updated
     */
    onTimerUpdated?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a voice assistant timer has been cancelled. The timer is av...
     * @yamlKey on_timer_cancelled
     */
    onTimerCancelled?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a voice assistant timer has finished. The timer is availabl...
     * @yamlKey on_timer_finished
     */
    onTimerFinished?: () => void;
    /**
     * [Automation](/automations): An automation to perform when the voice assistant timers tick is triggered. This is calle...
     * @yamlKey on_timer_tick
     */
    onTimerTick?: () => void;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            voice_assistant: VoiceAssistantProps & ComponentProps<voice_assistant_VoiceAssistant>;
        }
    }
}
