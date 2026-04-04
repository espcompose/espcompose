// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _BedjetClient, _CoreComponent, _CoreEntityBase, _CoreMqttCommandComponent } from "../bases";
import type { bedjet_BedJetFan, binary_BinaryFan, copy_CopyFan, fan_Fan, hbridge_HBridgeFan, output_BinaryOutput, output_FloatOutput, speed_SpeedFan, template__TemplateFan, tuya_Tuya, tuya_TuyaFan, web_server_WebServer } from "../markers";
interface FanWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface FanBaseProps extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey web_server */
    webServer?: FanWebServerProps;
    /** @yamlKey restore_mode */
    restoreMode?: "NO_RESTORE" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    /** @yamlKey direction_state_topic */
    directionStateTopic?: unknown;
    /** @yamlKey direction_command_topic */
    directionCommandTopic?: unknown;
    /** @yamlKey oscillation_state_topic */
    oscillationStateTopic?: unknown;
    /** @yamlKey oscillation_command_topic */
    oscillationCommandTopic?: unknown;
    /** @yamlKey speed_level_state_topic */
    speedLevelStateTopic?: unknown;
    /** @yamlKey speed_level_command_topic */
    speedLevelCommandTopic?: unknown;
    /** @yamlKey speed_state_topic */
    speedStateTopic?: unknown;
    /** @yamlKey speed_command_topic */
    speedCommandTopic?: unknown;
    /** @yamlKey on_state */
    onState?: TriggerHandler;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey on_direction_set */
    onDirectionSet?: TriggerHandler;
    /** @yamlKey on_oscillating_set */
    onOscillatingSet?: TriggerHandler;
    /** @yamlKey on_speed_set */
    onSpeedSet?: TriggerHandler;
    /** @yamlKey on_preset_set */
    onPresetSet?: TriggerHandler;
}
interface BinaryProps extends _CoreComponent {
    /** [ID](/guides/configuration-types#id): The id of the binary output component to use for this fan. */
    output: RefProp<output_BinaryOutput>;
    /**
     * [ID](/guides/configuration-types#id): The id of the [output](/components/output/) to use for the direction state of t...
     * @yamlKey direction_output
     */
    directionOutput?: RefProp<output_BinaryOutput>;
    /**
     * [ID](/guides/configuration-types#id): The id of the [output](/components/output/) to use for the oscillation state of...
     * @yamlKey oscillation_output
     */
    oscillationOutput?: RefProp<output_BinaryOutput>;
}
interface HbridgeProps extends _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): The id of the [float output](/components/output/) connected to Pin A (alternati...
     * @yamlKey pin_a
     */
    pinA: RefProp<output_FloatOutput>;
    /**
     * [ID](/guides/configuration-types#id): The id of the [float output](/components/output/) connected to Pin B (alternati...
     * @yamlKey pin_b
     */
    pinB: RefProp<output_FloatOutput>;
    /**
     * string: The decay mode you want to use with the h-bridge. Either `slow` (coasting) or `fast` (braking). Defaults to `...
     * @yamlKey decay_mode
     */
    decayMode?: "SLOW" | "FAST";
    /**
     * int: Set the number of supported discrete speed levels. The value is used to calculate the percentages for each speed...
     * @yamlKey speed_count
     */
    speedCount?: number;
    /**
     * [ID](/guides/configuration-types#id): The id of the [float output](/components/output/) connected to the Enable pin o...
     * @yamlKey enable_pin
     */
    enablePin?: RefProp<output_FloatOutput>;
    /**
     * A list of preset modes for this fan. Preset modes can be used in automations (i.e. `on_preset_set` ).
     * @yamlKey preset_modes
     */
    presetModes?: unknown;
}
interface SpeedProps extends _CoreComponent {
    /** [ID](/guides/configuration-types#id): The id of the [float output](/components/output/) to use for this fan. */
    output: RefProp<output_FloatOutput>;
    /**
     * [ID](/guides/configuration-types#id): The id of the [output](/components/output/) to use for the oscillation state of...
     * @yamlKey oscillation_output
     */
    oscillationOutput?: RefProp<output_BinaryOutput>;
    /**
     * [ID](/guides/configuration-types#id): The id of the [output](/components/output/) to use for the direction state of t...
     * @yamlKey direction_output
     */
    directionOutput?: RefProp<output_BinaryOutput>;
    /**
     * int: Set the number of supported discrete speed levels. The value is used to calculate the percentages for each speed...
     * @yamlKey speed_count
     */
    speedCount?: number;
    /**
     * A list of preset modes for this fan. Preset modes can be used in automations (i.e. `on_preset_set` ).
     * @yamlKey preset_modes
     */
    presetModes?: unknown;
}
interface BedjetProps extends _CoreComponent, _BedjetClient {
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface CopyProps extends _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): The fan that should be mirrored.
     * @yamlKey source_id
     */
    sourceId: RefProp<fan_Fan>;
}
interface TemplateProps extends _CoreComponent {
    /**
     * boolean: Indicates if there should be a control for direction. Default is `false`.
     * @yamlKey has_direction
     */
    hasDirection?: boolean;
    /**
     * boolean: Indicates if there should be a control for oscillating. Default is `false`.
     * @yamlKey has_oscillating
     */
    hasOscillating?: boolean;
    /**
     * int: Set the number of supported discrete speed levels. Default is only on/off.
     * @yamlKey speed_count
     */
    speedCount?: number;
    /**
     * A list of preset modes for this fan. Preset modes can be used in automations (i.e. `on_preset_set` ).
     * @yamlKey preset_modes
     */
    presetModes?: unknown;
}
interface TuyaProps extends _CoreComponent {
    /** @yamlKey tuya_id */
    tuyaId?: RefProp<tuya_Tuya>;
    /** @yamlKey oscillation_datapoint */
    oscillationDatapoint?: number;
    /** @yamlKey speed_datapoint */
    speedDatapoint?: number;
    /** @yamlKey switch_datapoint */
    switchDatapoint?: number;
    /** @yamlKey direction_datapoint */
    directionDatapoint?: number;
    /** @yamlKey speed_count */
    speedCount?: number;
}
export type FanProps = (FanBaseProps & {
    platform: "binary";
} & BinaryProps & ComponentProps<binary_BinaryFan>) | (FanBaseProps & {
    platform: "hbridge";
} & HbridgeProps & ComponentProps<hbridge_HBridgeFan>) | (FanBaseProps & {
    platform: "speed";
} & SpeedProps & ComponentProps<speed_SpeedFan>) | (FanBaseProps & {
    platform: "bedjet";
} & BedjetProps & ComponentProps<bedjet_BedJetFan>) | (FanBaseProps & {
    platform: "copy";
} & CopyProps & ComponentProps<copy_CopyFan>) | (FanBaseProps & {
    platform: "template";
} & TemplateProps & ComponentProps<template__TemplateFan>) | (FanBaseProps & {
    platform: "tuya";
} & TuyaProps & ComponentProps<tuya_TuyaFan>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            fan: FanProps;
        }
    }
}
