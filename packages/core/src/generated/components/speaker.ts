// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent, _I2sAudioSpeakerBase, _Speaker } from "../bases";
import type { __marker_audio_dac_AudioDac, __marker_mixer_speaker_MixerSpeaker, __marker_resampler_ResamplerSpeaker, __marker_speaker_Speaker } from "../markers";
interface MixerSourceSpeakersProps {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The [audio DAC](https://esphome.io/components/audio_dac/) to ...
     * @yamlKey audio_dac
     */
    audioDac?: RefProp<__marker_audio_dac_AudioDac>;
    /**
     * positive integer: The audio sample bit depth after resampling. Defaults to the output speaker's bits per sample.
     * @yamlKey bits_per_sample
     */
    bitsPerSample?: number | "8bit" | "16bit" | "24bit" | "32bit";
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The duration of the internal ring buffer. Larger values c...
     * @yamlKey buffer_duration
     */
    bufferDuration?: TimePeriod;
    /** @yamlKey num_channels */
    numChannels?: number;
    /**
     * positive integer: Sample rate to convert to. Must be between `8000` and `48000`. Defaults to the output speaker's sam...
     * @yamlKey sample_rate
     */
    sampleRate?: number;
    /** [Time](https://esphome.io/guides/configuration-types#time): How long to wait after finishing playback before releasin... */
    timeout?: "never";
}
interface I2sAudioExternalProps extends _I2sAudioSpeakerBase {
    /** @yamlKey i2s_comm_fmt */
    i2sCommFmt?: "i2s_lsb" | "i2s_msb" | "pcm" | "pcm_long" | "pcm_short" | "stand_i2s" | "stand_max" | "stand_msb" | "stand_pcm_long" | "stand_pcm_short";
    /** @yamlKey i2s_dout_pin */
    i2sDoutPin: Pin;
}
interface I2sAudioInternalProps extends _I2sAudioSpeakerBase {
    mode: "left" | "right" | "stereo";
}
interface MixerProps {
    /**
     * positive integer: The number of audio channels to send to the output speaker. Either `1` or `2`. Defaults to the outp...
     * @yamlKey num_channels
     */
    numChannels?: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The [speaker](https://esphome.io/components/speaker/) to outp...
     * @yamlKey output_speaker
     */
    outputSpeaker: RefProp<__marker_speaker_Speaker>;
    /**
     * boolean: Enables queue mode. If enabled, audio isn't mixed but instead each source speaker's audio is played successi...
     * @yamlKey queue_mode
     */
    queueMode?: boolean;
    /**
     * list: A list of source speaker inputs. Must have at least 2 and at most 8 speakers.
     * @yamlKey source_speakers
     */
    sourceSpeakers: Array<MixerSourceSpeakersProps>;
    /**
     * boolean: Only with `esp-idf`. Run the audio tasks in external memory. Defaults to `false`.
     * @yamlKey task_stack_in_psram
     */
    taskStackInPsram?: boolean;
}
interface ResamplerProps extends _Speaker, _CoreComponent {
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The duration of the internal ring buffer. Larger values m...
     * @yamlKey buffer_duration
     */
    bufferDuration?: TimePeriod;
    /** positive integer: The number of windowed sinc interpolation filters to use. Must be between `2` and `1024`. Defaults ... */
    filters?: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The [speaker](https://esphome.io/components/speaker/) to outp...
     * @yamlKey output_speaker
     */
    outputSpeaker: RefProp<__marker_speaker_Speaker>;
    /** positive integer: The number of taps per windowed sinc interpolation filter. Must between `16` and `128` and divisibl... */
    taps?: number;
    /**
     * boolean: Run the audio tasks in external memory. Defaults to `false`.
     * @yamlKey task_stack_in_psram
     */
    taskStackInPsram?: boolean;
}
export type SpeakerProps = ({
    platform: "i2s_audio";
    dacType: "external";
} & I2sAudioExternalProps & ComponentProps) | ({
    platform: "i2s_audio";
    dacType: "internal";
} & I2sAudioInternalProps & ComponentProps) | ({
    platform: "mixer";
} & MixerProps & ComponentProps<__marker_mixer_speaker_MixerSpeaker>) | ({
    platform: "resampler";
} & ResamplerProps & ComponentProps<__marker_resampler_ResamplerSpeaker>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            speaker: SpeakerProps;
        }
    }
}
