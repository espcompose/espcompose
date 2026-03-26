// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent, _CoreEntityBase } from "../bases";
import type { i2s_audio_I2SAudioComponent, i2s_audio_I2SAudioMediaPlayer, media_source_MediaSource, speaker_Speaker, speaker_SpeakerMediaPlayer, speaker_source_SpeakerSourceMediaPlayer } from "../markers";
interface SpeakerAnnouncementPipelineProps {
    /** [ID](/guides/configuration-types#id): The [speaker](/components/speaker/) to output the audio. */
    speaker: RefProp<speaker_Speaker>;
    /** enum: The audio format Home Assistant will transcode audio to before sending it to the device. One of `FLAC`, `MP3`, ... */
    format?: "NONE" | "WAV" | "MP3" | "FLAC" | "OPUS";
    /**
     * positive integer: Sample rate for the transcoded audio. Should be supported by the configured `speaker` component. De...
     * @yamlKey sample_rate
     */
    sampleRate?: number;
    /**
     * positive integer: Number of channels for the transcoded audio. Must be either `1` or `2`. Defaults to the speaker's n...
     * @yamlKey num_channels
     */
    numChannels?: number;
}
interface SpeakerMediaPipelineProps {
    /** [ID](/guides/configuration-types#id): The [speaker](/components/speaker/) to output the audio. */
    speaker: RefProp<speaker_Speaker>;
    /** enum: The audio format Home Assistant will transcode audio to before sending it to the device. One of `FLAC`, `MP3`, ... */
    format?: "NONE" | "WAV" | "MP3" | "FLAC" | "OPUS";
    /**
     * positive integer: Sample rate for the transcoded audio. Should be supported by the configured `speaker` component. De...
     * @yamlKey sample_rate
     */
    sampleRate?: number;
    /**
     * positive integer: Number of channels for the transcoded audio. Must be either `1` or `2`. Defaults to the speaker's n...
     * @yamlKey num_channels
     */
    numChannels?: number;
}
interface SpeakerFilesProps {
    /** string: Path to audio file. Can be a local file path or a URL. */
    file: string;
}
interface SpeakerSourceAnnouncementPipelineProps {
    /** [ID](/guides/configuration-types#id): The [speaker](/components/speaker/) to output the audio. */
    speaker: RefProp<speaker_Speaker>;
    /** list of [IDs](/guides/configuration-types#id): A list of [media source](/components/media_source/) component IDs to u... */
    sources: Array<RefProp<media_source_MediaSource>>;
    /** enum: The audio format Home Assistant will transcode audio to before sending it to the device. One of `FLAC`, `MP3`, ... */
    format?: "NONE" | "WAV" | "MP3" | "FLAC" | "OPUS";
    /**
     * positive integer: Sample rate for the transcoded audio. Should be supported by the configured `speaker` component. De...
     * @yamlKey sample_rate
     */
    sampleRate?: number;
    /**
     * positive integer: Number of channels for the transcoded audio. Must be either `1` or `2`. Defaults to the speaker's n...
     * @yamlKey num_channels
     */
    numChannels?: number;
}
interface SpeakerSourceMediaPipelineProps {
    /** [ID](/guides/configuration-types#id): The [speaker](/components/speaker/) to output the audio. */
    speaker: RefProp<speaker_Speaker>;
    /** list of [IDs](/guides/configuration-types#id): A list of [media source](/components/media_source/) component IDs to u... */
    sources: Array<RefProp<media_source_MediaSource>>;
    /** enum: The audio format Home Assistant will transcode audio to before sending it to the device. One of `FLAC`, `MP3`, ... */
    format?: "NONE" | "WAV" | "MP3" | "FLAC" | "OPUS";
    /**
     * positive integer: Sample rate for the transcoded audio. Should be supported by the configured `speaker` component. De...
     * @yamlKey sample_rate
     */
    sampleRate?: number;
    /**
     * positive integer: Number of channels for the transcoded audio. Must be either `1` or `2`. Defaults to the speaker's n...
     * @yamlKey num_channels
     */
    numChannels?: number;
}
interface MediaPlayerBaseProps extends _CoreEntityBase {
    /** @yamlKey on_state */
    onState?: TriggerHandler;
    /** @yamlKey on_idle */
    onIdle?: TriggerHandler;
    /** @yamlKey on_play */
    onPlay?: TriggerHandler;
    /** @yamlKey on_pause */
    onPause?: TriggerHandler;
    /** @yamlKey on_announcement */
    onAnnouncement?: TriggerHandler;
    /**
     * [Automation](/automations): An automation to perform when media_player is turned on, implements the `supports_turn_of...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    /**
     * [Automation](/automations): An automation to perform when media_player is turned off, implements the `supports_turn_o...
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
}
interface SpeakerProps {
    /**
     * Pipeline Schema: Configuration settings for the announcement pipeline.
     * @yamlKey announcement_pipeline
     */
    announcementPipeline: SpeakerAnnouncementPipelineProps;
    /**
     * Pipeline Schema: Configuration settings for the media pipeline. Same options as the `announcement_pipeline`.
     * @yamlKey media_pipeline
     */
    mediaPipeline?: SpeakerMediaPipelineProps;
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
    /**
     * [Automation](/automations): An automation to perform when muted.
     * @yamlKey on_mute
     */
    onMute?: TriggerHandler;
    /**
     * [Automation](/automations): An automation to perform when unmuted.
     * @yamlKey on_unmute
     */
    onUnmute?: TriggerHandler;
    /**
     * [Automation](/automations): An automation to perform when the volume is changed.
     * @yamlKey on_volume
     */
    onVolume?: TriggerHandler;
}
interface SpeakerSourceProps extends _CoreComponent {
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
     * [Automation](/automations): An automation to perform when muted.
     * @yamlKey on_mute
     */
    onMute?: TriggerHandler;
    /**
     * [Automation](/automations): An automation to perform when unmuted.
     * @yamlKey on_unmute
     */
    onUnmute?: TriggerHandler;
    /**
     * [Automation](/automations): An automation to perform when the volume is changed.
     * @yamlKey on_volume
     */
    onVolume?: TriggerHandler;
}
interface I2sAudioInternalProps extends _CoreComponent {
    /** @yamlKey i2s_audio_id */
    i2sAudioId?: RefProp<i2s_audio_I2SAudioComponent>;
    mode: "left" | "right" | "stereo";
}
interface I2sAudioExternalProps extends _CoreComponent {
    /** @yamlKey i2s_audio_id */
    i2sAudioId?: RefProp<i2s_audio_I2SAudioComponent>;
    /** @yamlKey i2s_dout_pin */
    i2sDoutPin: Pin;
    /** @yamlKey mute_pin */
    mutePin?: Pin;
    mode?: "mono" | "stereo";
    /** @yamlKey i2s_comm_fmt */
    i2sCommFmt?: "lsb" | "msb";
}
export type MediaPlayerProps = (MediaPlayerBaseProps & {
    platform: "speaker";
} & SpeakerProps & ComponentProps<speaker_SpeakerMediaPlayer>) | (MediaPlayerBaseProps & {
    platform: "speaker_source";
} & SpeakerSourceProps & ComponentProps<speaker_source_SpeakerSourceMediaPlayer>) | (MediaPlayerBaseProps & {
    platform: "i2s_audio";
    dacType: "internal";
} & I2sAudioInternalProps & ComponentProps<i2s_audio_I2SAudioMediaPlayer>) | (MediaPlayerBaseProps & {
    platform: "i2s_audio";
    dacType: "external";
} & I2sAudioExternalProps & ComponentProps<i2s_audio_I2SAudioMediaPlayer>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            media_player: MediaPlayerProps;
        }
    }
}
