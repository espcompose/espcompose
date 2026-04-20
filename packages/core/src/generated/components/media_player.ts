// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent, _CoreEntityBase } from "../bases";
import type { __marker_media_source_MediaSource, __marker_speaker_Speaker, __marker_speaker_SpeakerMediaPlayer, __marker_speaker_source_SpeakerSourceMediaPlayer } from "../markers";
interface SpeakerAnnouncementPipelineProps {
    /** enum: The audio format Home Assistant will transcode audio to before sending it to the device. One of `FLAC`, `MP3`, ... */
    format?: "FLAC" | "MP3" | "NONE" | "OPUS" | "WAV";
    /**
     * positive integer: Number of channels for the transcoded audio. Must be either `1` or `2`. Defaults to the speaker's n...
     * @yamlKey num_channels
     */
    numChannels?: number;
    /**
     * positive integer: Sample rate for the transcoded audio. Should be supported by the configured `speaker` component. De...
     * @yamlKey sample_rate
     */
    sampleRate?: number;
    /** [ID](https://esphome.io/guides/configuration-types#id): The [speaker](https://esphome.io/components/speaker/) to outp... */
    speaker: RefProp<__marker_speaker_Speaker>;
}
interface SpeakerFilesProps {
    /** string: Path to audio file. Can be a local file path or a URL. */
    file: string;
}
interface SpeakerMediaPipelineProps {
    /** enum: The audio format Home Assistant will transcode audio to before sending it to the device. One of `FLAC`, `MP3`, ... */
    format?: "FLAC" | "MP3" | "NONE" | "OPUS" | "WAV";
    /**
     * positive integer: Number of channels for the transcoded audio. Must be either `1` or `2`. Defaults to the speaker's n...
     * @yamlKey num_channels
     */
    numChannels?: number;
    /**
     * positive integer: Sample rate for the transcoded audio. Should be supported by the configured `speaker` component. De...
     * @yamlKey sample_rate
     */
    sampleRate?: number;
    /** [ID](https://esphome.io/guides/configuration-types#id): The [speaker](https://esphome.io/components/speaker/) to outp... */
    speaker: RefProp<__marker_speaker_Speaker>;
}
interface SpeakerSourceAnnouncementPipelineProps {
    /** enum: The audio format Home Assistant will transcode audio to before sending it to the device. One of `FLAC`, `MP3`, ... */
    format?: "FLAC" | "MP3" | "NONE" | "OPUS" | "WAV";
    /**
     * positive integer: Number of channels for the transcoded audio. Must be either `1` or `2`. Defaults to the speaker's n...
     * @yamlKey num_channels
     */
    numChannels?: number;
    /**
     * positive integer: Sample rate for the transcoded audio. Should be supported by the configured `speaker` component. De...
     * @yamlKey sample_rate
     */
    sampleRate?: number;
    /** list of [IDs](https://esphome.io/guides/configuration-types#id): A list of [media source](https://esphome.io/componen... */
    sources: Array<RefProp<__marker_media_source_MediaSource>>;
    /** [ID](https://esphome.io/guides/configuration-types#id): The [speaker](https://esphome.io/components/speaker/) to outp... */
    speaker: RefProp<__marker_speaker_Speaker>;
}
interface SpeakerSourceMediaPipelineProps {
    /** enum: The audio format Home Assistant will transcode audio to before sending it to the device. One of `FLAC`, `MP3`, ... */
    format?: "FLAC" | "MP3" | "NONE" | "OPUS" | "WAV";
    /**
     * positive integer: Number of channels for the transcoded audio. Must be either `1` or `2`. Defaults to the speaker's n...
     * @yamlKey num_channels
     */
    numChannels?: number;
    /**
     * positive integer: Sample rate for the transcoded audio. Should be supported by the configured `speaker` component. De...
     * @yamlKey sample_rate
     */
    sampleRate?: number;
    /** list of [IDs](https://esphome.io/guides/configuration-types#id): A list of [media source](https://esphome.io/componen... */
    sources: Array<RefProp<__marker_media_source_MediaSource>>;
    /** [ID](https://esphome.io/guides/configuration-types#id): The [speaker](https://esphome.io/components/speaker/) to outp... */
    speaker: RefProp<__marker_speaker_Speaker>;
}
interface MediaPlayerBaseProps extends _CoreEntityBase {
    /** string: Manually specify the ID for code generation. At least one of id and name must be specified. */
    id?: string;
    /** @yamlKey on_announcement */
    onAnnouncement?: TriggerHandler;
    /** @yamlKey on_idle */
    onIdle?: TriggerHandler;
    /** @yamlKey on_pause */
    onPause?: TriggerHandler;
    /** @yamlKey on_play */
    onPlay?: TriggerHandler;
    /** @yamlKey on_state */
    onState?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when media_player is turned off, implements th...
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when media_player is turned on, implements the...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
}
interface SpeakerProps {
    /**
     * Pipeline Schema: Configuration settings for the announcement pipeline.
     * @yamlKey announcement_pipeline
     */
    announcementPipeline: SpeakerAnnouncementPipelineProps;
    /**
     * positive integer: The buffer size in bytes for each pipeline. Must be between `4000` and `4000000`. Defaults to `1000...
     * @yamlKey buffer_size
     */
    bufferSize?: number;
    /**
     * enum: Controls which audio codecs (MP3, FLAC, Opus) are compiled. One of `ALL` (all available codecs are supported), ...
     * @yamlKey codec_support_enabled
     */
    codecSupportEnabled?: "all" | "needed" | "none";
    /** list: A list of media files to build into the firmware for on-device playback. */
    files?: Array<SpeakerFilesProps>;
    /**
     * Pipeline Schema: Configuration settings for the media pipeline. Same options as the `announcement_pipeline`.
     * @yamlKey media_pipeline
     */
    mediaPipeline?: SpeakerMediaPipelineProps;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when muted.
     * @yamlKey on_mute
     */
    onMute?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when unmuted.
     * @yamlKey on_unmute
     */
    onUnmute?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the volume is changed.
     * @yamlKey on_volume
     */
    onVolume?: TriggerHandler;
    /**
     * boolean: Run the audio tasks in external memory. Defaults to `false`.
     * @yamlKey task_stack_in_psram
     */
    taskStackInPsram?: boolean;
    /**
     * percentage: Increment amount that the `media_player.volume_up` and `media_player.volume_down` actions will increase o...
     * @yamlKey volume_increment
     */
    volumeIncrement?: number;
    /**
     * percentage: The default volume that mediaplayer uses for first boot where a volume has not been previously saved. Def...
     * @yamlKey volume_initial
     */
    volumeInitial?: number;
    /**
     * percentage: The maximum volume allowed. Defaults to `100%`.
     * @yamlKey volume_max
     */
    volumeMax?: number;
    /**
     * percentage: The minimum volume allowed. Defaults to `0%`.
     * @yamlKey volume_min
     */
    volumeMin?: number;
}
interface SpeakerSourceProps extends _CoreComponent {
    /**
     * Pipeline Schema: Configuration settings for the announcement pipeline. Same options as `media_pipeline`. Must use a d...
     * @yamlKey announcement_pipeline
     */
    announcementPipeline?: SpeakerSourceAnnouncementPipelineProps;
    /**
     * Pipeline Schema: Configuration settings for the media pipeline. At least one of `media_pipeline` or `announcement_pip...
     * @yamlKey media_pipeline
     */
    mediaPipeline?: SpeakerSourceMediaPipelineProps;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when muted.
     * @yamlKey on_mute
     */
    onMute?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when unmuted.
     * @yamlKey on_unmute
     */
    onUnmute?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the volume is changed.
     * @yamlKey on_volume
     */
    onVolume?: TriggerHandler;
    /**
     * percentage: Increment amount that the `media_player.volume_up` and `media_player.volume_down` actions will increase o...
     * @yamlKey volume_increment
     */
    volumeIncrement?: number;
    /**
     * percentage: The default volume used on first boot when no volume has been previously saved. Defaults to `50%`.
     * @yamlKey volume_initial
     */
    volumeInitial?: number;
    /**
     * percentage: The maximum volume allowed. Defaults to `100%`.
     * @yamlKey volume_max
     */
    volumeMax?: number;
    /**
     * percentage: The minimum volume allowed. Defaults to `0%`.
     * @yamlKey volume_min
     */
    volumeMin?: number;
}
export type MediaPlayerProps = (MediaPlayerBaseProps & {
    platform: "speaker";
} & SpeakerProps & ComponentProps<__marker_speaker_SpeakerMediaPlayer>) | (MediaPlayerBaseProps & {
    platform: "speaker_source";
} & SpeakerSourceProps & ComponentProps<__marker_speaker_source_SpeakerSourceMediaPlayer>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            media_player: MediaPlayerProps;
        }
    }
}
