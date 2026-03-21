// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, Ref } from "../../types";
import type { _CoreComponent, _I2sAudioSpeakerBase, _Speaker } from "../bases";
import type { audio_dac_AudioDac, mixer_speaker_MixerSpeaker, resampler_ResamplerSpeaker, speaker_Speaker } from "../markers";
interface MixerSourceSpeakersPropsBufferDurationProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface MixerSourceSpeakersProps {
    /** @yamlKey bits_per_sample */
    bitsPerSample?: unknown | "8bit" | "16bit" | "24bit" | "32bit";
    /** @yamlKey num_channels */
    numChannels?: number;
    /**
     * positive integer: Sample rate to convert to. Must be between `8000` and `48000`. Defaults to the output speaker's sam...
     * @yamlKey sample_rate
     */
    sampleRate?: number;
    /**
     * [ID](/guides/configuration-types#id): The [audio DAC](/components/audio_dac/) to use for volume control.
     * @yamlKey audio_dac
     */
    audioDac?: Ref<audio_dac_AudioDac>;
    /**
     * [Time](/guides/configuration-types#time): The duration of the internal ring buffer. Larger values can reduce stutteri...
     * @yamlKey buffer_duration
     */
    bufferDuration?: MixerSourceSpeakersPropsBufferDurationProps;
    /** [Time](/guides/configuration-types#time): How long to wait after finishing playback before releasing the bus. Set to ... */
    timeout?: "never";
}
interface ResamplerBufferDurationProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface MixerProps {
    /**
     * [ID](/guides/configuration-types#id): The [speaker](/components/speaker/) to output the mixed audio.
     * @yamlKey output_speaker
     */
    outputSpeaker: Ref<speaker_Speaker>;
    /**
     * list: A list of source speaker inputs. Must have at least 2 and at most 8 speakers.
     * @yamlKey source_speakers
     */
    sourceSpeakers: Array<MixerSourceSpeakersProps>;
    /**
     * positive integer: The number of audio channels to send to the output speaker. Either `1` or `2`. Defaults to the outp...
     * @yamlKey num_channels
     */
    numChannels?: number;
    /**
     * boolean: Enables queue mode. If enabled, audio isn't mixed but instead each source speaker's audio is played successi...
     * @yamlKey queue_mode
     */
    queueMode?: boolean;
    /**
     * boolean: Only with `esp-idf`. Run the audio tasks in external memory. Defaults to `false`.
     * @yamlKey task_stack_in_psram
     */
    taskStackInPsram?: boolean;
}
interface ResamplerProps extends _Speaker, _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): The [speaker](/components/speaker/) to output the resampled audio.
     * @yamlKey output_speaker
     */
    outputSpeaker: Ref<speaker_Speaker>;
    /**
     * [Time](/guides/configuration-types#time): The duration of the internal ring buffer. Larger values may reduce stutteri...
     * @yamlKey buffer_duration
     */
    bufferDuration?: ResamplerBufferDurationProps;
    /**
     * boolean: Run the audio tasks in external memory. Defaults to `false`.
     * @yamlKey task_stack_in_psram
     */
    taskStackInPsram?: boolean;
    /** positive integer: The number of windowed sinc interpolation filters to use. Must be between `2` and `1024`. Defaults ... */
    filters?: number;
    /** positive integer: The number of taps per windowed sinc interpolation filter. Must between `16` and `128` and divisibl... */
    taps?: unknown;
}
interface I2sAudioInternalProps extends _I2sAudioSpeakerBase {
    mode: "left" | "right" | "stereo";
}
interface I2sAudioExternalProps extends _I2sAudioSpeakerBase {
    /** @yamlKey i2s_dout_pin */
    i2sDoutPin: Pin;
    /** @yamlKey i2s_comm_fmt */
    i2sCommFmt?: "stand_i2s" | "stand_msb" | "stand_pcm_short" | "stand_pcm_long" | "stand_max" | "i2s_msb" | "i2s_lsb" | "pcm" | "pcm_short" | "pcm_long";
}
export type SpeakerProps = ({
    platform: "mixer";
} & MixerProps & ComponentProps<mixer_speaker_MixerSpeaker>) | ({
    platform: "resampler";
} & ResamplerProps & ComponentProps<resampler_ResamplerSpeaker>) | ({
    platform: "i2s_audio";
    dacType: "internal";
} & I2sAudioInternalProps & ComponentProps) | ({
    platform: "i2s_audio";
    dacType: "external";
} & I2sAudioExternalProps & ComponentProps);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            speaker: SpeakerProps;
        }
    }
}
