// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _BedjetClient, _CoreComponent, _CoreEntityBase, _CoreMqttCommandComponent } from "../bases";
import type { __marker_bedjet_BedJetFan, __marker_binary_BinaryFan, __marker_copy_CopyFan, __marker_fan_Fan, __marker_hbridge_HBridgeFan, __marker_output_BinaryOutput, __marker_output_FloatOutput, __marker_speed_SpeedFan, __marker_template__TemplateFan, __marker_tuya_Tuya, __marker_tuya_TuyaFan, __marker_web_server_WebServer } from "../markers";
interface FanWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface FanBaseProps extends _CoreEntityBase, _CoreMqttCommandComponent {
    /**
     * string: The topic to receive fan direction commands on (options: forward, reverse, toggle).
     * @yamlKey direction_command_topic
     */
    directionCommandTopic?: string;
    /**
     * string: The topic to publish fan direction state changes to (options: forward, reverse).
     * @yamlKey direction_state_topic
     */
    directionStateTopic?: string;
    /** string: Manually specify the ID for code generation. At least one of id and name must be specified. */
    id?: string;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the fan direction is chan...
     * @yamlKey on_direction_set
     */
    onDirectionSet?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the fan oscillating state...
     * @yamlKey on_oscillating_set
     */
    onOscillatingSet?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the fan preset mode is ch...
     * @yamlKey on_preset_set
     */
    onPresetSet?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the fan speed is changed....
     * @yamlKey on_speed_set
     */
    onSpeedSet?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the fan state is changed....
     * @yamlKey on_state
     */
    onState?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the fan is turned off. Se...
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the fan is turned on. See...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    /**
     * string: The topic to receive oscillation commands on.
     * @yamlKey oscillation_command_topic
     */
    oscillationCommandTopic?: string;
    /**
     * string: The topic to publish fan oscillation state changes to.
     * @yamlKey oscillation_state_topic
     */
    oscillationStateTopic?: string;
    /**
     * Control how the fan attempts to restore state on boot.
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "NO_RESTORE" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    /**
     * string: The topic to receive speed commands on (options: LOW, MEDIUM, HIGH).
     * @yamlKey speed_command_topic
     */
    speedCommandTopic?: string;
    /**
     * int: The topic to receive numeric speed commands on (range: 0 to speed count).
     * @yamlKey speed_level_command_topic
     */
    speedLevelCommandTopic?: number;
    /**
     * int: The topic to publish numeric fan speed state changes to (range: 0 to speed count).
     * @yamlKey speed_level_state_topic
     */
    speedLevelStateTopic?: number;
    /**
     * string: The topic to publish fan speed state changes to (options: LOW, MEDIUM, HIGH).
     * @yamlKey speed_state_topic
     */
    speedStateTopic?: string;
    /** @yamlKey web_server */
    webServer?: FanWebServerProps;
}
interface BedjetProps extends _CoreComponent, _BedjetClient {
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface BinaryProps extends _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The id of the [output](https://esphome.io/components/output/)...
     * @yamlKey direction_output
     */
    directionOutput?: RefProp<__marker_output_BinaryOutput>;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The id of the [output](https://esphome.io/components/output/)...
     * @yamlKey oscillation_output
     */
    oscillationOutput?: RefProp<__marker_output_BinaryOutput>;
    /** [ID](https://esphome.io/guides/configuration-types#id): The id of the binary output component to use for this fan. */
    output: RefProp<__marker_output_BinaryOutput>;
}
interface CopyProps extends _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The fan that should be mirrored.
     * @yamlKey source_id
     */
    sourceId: RefProp<__marker_fan_Fan>;
}
interface HbridgeProps extends _CoreComponent {
    /**
     * string: The decay mode you want to use with the h-bridge. Either `slow` (coasting) or `fast` (braking). Defaults to `...
     * @yamlKey decay_mode
     */
    decayMode?: "FAST" | "SLOW";
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The id of the [float output](https://esphome.io/components/ou...
     * @yamlKey enable_pin
     */
    enablePin?: RefProp<__marker_output_FloatOutput>;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The id of the [float output](https://esphome.io/components/ou...
     * @yamlKey pin_a
     */
    pinA: RefProp<__marker_output_FloatOutput>;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The id of the [float output](https://esphome.io/components/ou...
     * @yamlKey pin_b
     */
    pinB: RefProp<__marker_output_FloatOutput>;
    /**
     * A list of preset modes for this fan. Preset modes can be used in automations (i.e. `on_preset_set` ).
     * @yamlKey preset_modes
     */
    presetModes?: unknown;
    /**
     * int: Set the number of supported discrete speed levels. The value is used to calculate the percentages for each speed...
     * @yamlKey speed_count
     */
    speedCount?: number;
}
interface SpeedProps extends _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The id of the [output](https://esphome.io/components/output/)...
     * @yamlKey direction_output
     */
    directionOutput?: RefProp<__marker_output_BinaryOutput>;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The id of the [output](https://esphome.io/components/output/)...
     * @yamlKey oscillation_output
     */
    oscillationOutput?: RefProp<__marker_output_BinaryOutput>;
    /** [ID](https://esphome.io/guides/configuration-types#id): The id of the [float output](https://esphome.io/components/ou... */
    output: RefProp<__marker_output_FloatOutput>;
    /**
     * A list of preset modes for this fan. Preset modes can be used in automations (i.e. `on_preset_set` ).
     * @yamlKey preset_modes
     */
    presetModes?: unknown;
    /**
     * int: Set the number of supported discrete speed levels. The value is used to calculate the percentages for each speed...
     * @yamlKey speed_count
     */
    speedCount?: number;
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
     * A list of preset modes for this fan. Preset modes can be used in automations (i.e. `on_preset_set` ).
     * @yamlKey preset_modes
     */
    presetModes?: unknown;
    /**
     * int: Set the number of supported discrete speed levels. Default is only on/off.
     * @yamlKey speed_count
     */
    speedCount?: number;
}
interface TuyaProps extends _CoreComponent {
    /** @yamlKey direction_datapoint */
    directionDatapoint?: number;
    /** @yamlKey oscillation_datapoint */
    oscillationDatapoint?: number;
    /** @yamlKey speed_count */
    speedCount?: number;
    /** @yamlKey speed_datapoint */
    speedDatapoint?: number;
    /** @yamlKey switch_datapoint */
    switchDatapoint?: number;
    /** @yamlKey tuya_id */
    tuyaId?: RefProp<__marker_tuya_Tuya>;
}
export type FanProps = (FanBaseProps & {
    platform: "bedjet";
} & BedjetProps & ComponentProps<__marker_bedjet_BedJetFan>) | (FanBaseProps & {
    platform: "binary";
} & BinaryProps & ComponentProps<__marker_binary_BinaryFan>) | (FanBaseProps & {
    platform: "copy";
} & CopyProps & ComponentProps<__marker_copy_CopyFan>) | (FanBaseProps & {
    platform: "hbridge";
} & HbridgeProps & ComponentProps<__marker_hbridge_HBridgeFan>) | (FanBaseProps & {
    platform: "speed";
} & SpeedProps & ComponentProps<__marker_speed_SpeedFan>) | (FanBaseProps & {
    platform: "template";
} & TemplateProps & ComponentProps<__marker_template__TemplateFan>) | (FanBaseProps & {
    platform: "tuya";
} & TuyaProps & ComponentProps<__marker_tuya_TuyaFan>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            fan: FanProps;
        }
    }
}
