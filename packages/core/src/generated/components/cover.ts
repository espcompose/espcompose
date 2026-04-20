// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent, _CoreEntityBase, _CoreMqttCommandComponent } from "../bases";
import type { __marker_am43_Am43Component, __marker_binary_sensor_BinarySensor, __marker_ble_client_BLEClient, __marker_copy_CopyCover, __marker_cover_Cover, __marker_current_based_CurrentBasedCover, __marker_endstop_EndstopCover, __marker_feedback_FeedbackCover, __marker_he60r_HE60rCover, __marker_sensor_Sensor, __marker_template__TemplateCover, __marker_time_based_TimeBasedCover, __marker_tormatic_Tormatic, __marker_tuya_Tuya, __marker_tuya_TuyaCover, __marker_uart_UARTComponent, __marker_web_server_WebServer } from "../markers";
interface CoverWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface CoverBaseProps extends _CoreEntityBase, _CoreMqttCommandComponent {
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/cover/#device-class](https:/...
     * @yamlKey device_class
     */
    deviceClass?: "" | "awning" | "blind" | "curtain" | "damper" | "door" | "garage" | "gate" | "shade" | "shutter" | "window";
    /** string: Manually specify the ID for code generation. At least one of id and name must be specified. */
    id?: string;
    /**
     * boolean: When set to `true`, state changes will be published only to the `state_topic` as a single JSON object per st...
     * @yamlKey mqtt_json_state_payload
     */
    mqttJsonStatePayload?: boolean;
    /** @yamlKey on_closed */
    onClosed?: TriggerHandler;
    /** @yamlKey on_closing */
    onClosing?: TriggerHandler;
    /** @yamlKey on_idle */
    onIdle?: TriggerHandler;
    /** @yamlKey on_open */
    onOpen?: TriggerHandler;
    /** @yamlKey on_opened */
    onOpened?: TriggerHandler;
    /** @yamlKey on_opening */
    onOpening?: TriggerHandler;
    /**
     * string: The topic to receive cover position commands on.
     * @yamlKey position_command_topic
     */
    positionCommandTopic?: string;
    /**
     * string: The topic to publish cover position changes to. Not valid if `mqtt_json_state_payload` is set to `true`.
     * @yamlKey position_state_topic
     */
    positionStateTopic?: string;
    /**
     * string: The topic to receive cover tilt commands on.
     * @yamlKey tilt_command_topic
     */
    tiltCommandTopic?: string;
    /**
     * string: The topic to publish cover cover tilt state changes to. Not valid if `mqtt_json_state_payload` is set to `true`.
     * @yamlKey tilt_state_topic
     */
    tiltStateTopic?: string;
    /** @yamlKey web_server */
    webServer?: CoverWebServerProps;
}
interface Am43Props extends _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The id of the `ble_client` entry associated with the device.
     * @yamlKey ble_client_id
     */
    bleClientId?: RefProp<__marker_ble_client_BLEClient>;
    /**
     * boolean: Inverts the position value to and from the device. Set if ESPHome is swapping around the open/close state of...
     * @yamlKey invert_position
     */
    invertPosition?: boolean;
    /** int: The pin for the device, as set in the app. The default is usually printed on the device. Defaults to `8888`. */
    pin?: number;
}
interface CopyProps extends _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The cover that should be mirrored.
     * @yamlKey source_id
     */
    sourceId: RefProp<__marker_cover_Cover>;
}
interface CurrentBasedProps extends _CoreComponent {
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote req...
     * @yamlKey close_action
     */
    closeAction: TriggerHandler;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The amount of time it takes the cover to close from the f...
     * @yamlKey close_duration
     */
    closeDuration: TimePeriod;
    /**
     * float: The amount of current in Amps the motor should drain to consider the cover is closing.
     * @yamlKey close_moving_current_threshold
     */
    closeMovingCurrentThreshold: number;
    /**
     * float: The amount of current in Amps the motor should drain to consider the cover is blocked during closing.
     * @yamlKey close_obstacle_current_threshold
     */
    closeObstacleCurrentThreshold?: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The close current sensor.
     * @yamlKey close_sensor
     */
    closeSensor: RefProp<__marker_sensor_Sensor>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when relay malfunct...
     * @yamlKey malfunction_action
     */
    malfunctionAction?: TriggerHandler;
    /**
     * boolean: Enable to detect malfunction detection (Typically welded relays). Defaults to `True`.
     * @yamlKey malfunction_detection
     */
    malfunctionDetection?: boolean;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The maximum duration the cover should be opening or closi...
     * @yamlKey max_duration
     */
    maxDuration?: TimePeriod;
    /**
     * percentage: The percentage of rollback the cover will perform in case of obstacle detection. Defaults to `10%`.
     * @yamlKey obstacle_rollback
     */
    obstacleRollback?: number;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote req...
     * @yamlKey open_action
     */
    openAction: TriggerHandler;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The amount of time it takes the cover to open up from the...
     * @yamlKey open_duration
     */
    openDuration: TimePeriod;
    /**
     * float: The amount of current in Amps the motor should drain to consider the cover is opening.
     * @yamlKey open_moving_current_threshold
     */
    openMovingCurrentThreshold: number;
    /**
     * float: The amount of current in Amps the motor should drain to consider the cover is blocked during opening.
     * @yamlKey open_obstacle_current_threshold
     */
    openObstacleCurrentThreshold?: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The open current sensor.
     * @yamlKey open_sensor
     */
    openSensor: RefProp<__marker_sensor_Sensor>;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The amount of time the current sensing will be disabled w...
     * @yamlKey start_sensing_delay
     */
    startSensingDelay?: TimePeriod;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed to stop the cover.
     * @yamlKey stop_action
     */
    stopAction: TriggerHandler;
}
interface EndstopProps extends _CoreComponent {
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote req...
     * @yamlKey close_action
     */
    closeAction: TriggerHandler;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The amount of time it takes the cover to close from the f...
     * @yamlKey close_duration
     */
    closeDuration: TimePeriod;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the [Binary Sensor](https://esphome.io/components/b...
     * @yamlKey close_endstop
     */
    closeEndstop: RefProp<__marker_binary_sensor_BinarySensor>;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The maximum duration the cover should be opening or closi...
     * @yamlKey max_duration
     */
    maxDuration?: TimePeriod;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote req...
     * @yamlKey open_action
     */
    openAction: TriggerHandler;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The amount of time it takes the cover to open up from the...
     * @yamlKey open_duration
     */
    openDuration: TimePeriod;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the [Binary Sensor](https://esphome.io/components/b...
     * @yamlKey open_endstop
     */
    openEndstop: RefProp<__marker_binary_sensor_BinarySensor>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote req...
     * @yamlKey stop_action
     */
    stopAction: TriggerHandler;
}
interface FeedbackProps extends _CoreComponent {
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Considers a wait time needed by the cover to actually sta...
     * @yamlKey acceleration_wait_time
     */
    accelerationWaitTime?: TimePeriod;
    /**
     * boolean: Whether the true state of the cover is not known. This will make the Home Assistant frontend show buttons fo...
     * @yamlKey assumed_state
     */
    assumedState?: boolean;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote req...
     * @yamlKey close_action
     */
    closeAction: TriggerHandler;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The amount of time it takes the cover to close from the f...
     * @yamlKey close_duration
     */
    closeDuration: TimePeriod;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the [Binary Sensor](https://esphome.io/components/b...
     * @yamlKey close_endstop
     */
    closeEndstop?: RefProp<__marker_binary_sensor_BinarySensor>;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the [Binary Sensor](https://esphome.io/components/b...
     * @yamlKey close_obstacle_sensor
     */
    closeObstacleSensor?: RefProp<__marker_binary_sensor_BinarySensor>;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the [Binary Sensor](https://esphome.io/components/b...
     * @yamlKey close_sensor
     */
    closeSensor?: RefProp<__marker_binary_sensor_BinarySensor>;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Stops cover and forces a wait time between changes in dir...
     * @yamlKey direction_change_wait_time
     */
    directionChangeWaitTime?: TimePeriod;
    /**
     * boolean: Indicates that the cover has built in end stop detectors. In this configuration the `stop_action` is not per...
     * @yamlKey has_built_in_endstop
     */
    hasBuiltInEndstop?: boolean;
    /**
     * boolean: Whether to infer endstop state from the movement sensor. Requires movement sensors to be set, no endstop sen...
     * @yamlKey infer_endstop_from_movement
     */
    inferEndstopFromMovement?: boolean;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The maximum duration the cover should be opening or closi...
     * @yamlKey max_duration
     */
    maxDuration?: TimePeriod;
    /**
     * percentage: The percentage of rollback the cover will perform in case of obstacle detection while moving. Defaults to...
     * @yamlKey obstacle_rollback
     */
    obstacleRollback?: number;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote req...
     * @yamlKey open_action
     */
    openAction: TriggerHandler;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The amount of time it takes the cover to open up from the...
     * @yamlKey open_duration
     */
    openDuration: TimePeriod;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the [Binary Sensor](https://esphome.io/components/b...
     * @yamlKey open_endstop
     */
    openEndstop?: RefProp<__marker_binary_sensor_BinarySensor>;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the [Binary Sensor](https://esphome.io/components/b...
     * @yamlKey open_obstacle_sensor
     */
    openObstacleSensor?: RefProp<__marker_binary_sensor_BinarySensor>;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the [Binary Sensor](https://esphome.io/components/b...
     * @yamlKey open_sensor
     */
    openSensor?: RefProp<__marker_binary_sensor_BinarySensor>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote req...
     * @yamlKey stop_action
     */
    stopAction: TriggerHandler;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The interval to publish updated position information to t...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
interface He60rProps extends _CoreComponent {
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The time required for the door to fully close from the op...
     * @yamlKey close_duration
     */
    closeDuration?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The time required for the door to fully open from the clo...
     * @yamlKey open_duration
     */
    openDuration?: TimePeriod;
    /** @yamlKey uart_id */
    uartId?: RefProp<__marker_uart_UARTComponent>;
}
interface TemplateProps extends _CoreComponent {
    /**
     * boolean: Whether the true state/position of the cover is not known. This will make the Home Assistant frontend show b...
     * @yamlKey assumed_state
     */
    assumedState?: boolean;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote req...
     * @yamlKey close_action
     */
    closeAction?: TriggerHandler;
    /**
     * boolean: Whether this cover will publish its position as a floating point number. By default (`false` ), the cover on...
     * @yamlKey has_position
     */
    hasPosition?: boolean;
    /** [lambda](https://esphome.io/automations/templates#config-lambda): Lambda to be evaluated repeatedly to get the curren... */
    lambda?: unknown;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote (li...
     * @yamlKey open_action
     */
    openAction?: TriggerHandler;
    /** boolean: Whether to operate in optimistic mode - when in this mode, any command sent to the template cover will immed... */
    optimistic?: boolean;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote (li...
     * @yamlKey position_action
     */
    positionAction?: TriggerHandler;
    /** @yamlKey restore_mode */
    restoreMode?: "NO_RESTORE" | "RESTORE" | "RESTORE_AND_CALL";
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote req...
     * @yamlKey stop_action
     */
    stopAction?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote (li...
     * @yamlKey tilt_action
     */
    tiltAction?: TriggerHandler;
    /**
     * [lambda](https://esphome.io/automations/templates#config-lambda): Lambda to be evaluated repeatedly to get the curren...
     * @yamlKey tilt_lambda
     */
    tiltLambda?: unknown;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote req...
     * @yamlKey toggle_action
     */
    toggleAction?: TriggerHandler;
}
interface TimeBasedProps extends _CoreComponent {
    /**
     * boolean: Whether the true state of the cover is not known. This will make the Home Assistant frontend show buttons fo...
     * @yamlKey assumed_state
     */
    assumedState?: boolean;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote req...
     * @yamlKey close_action
     */
    closeAction: TriggerHandler;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The amount of time it takes the cover to close from the f...
     * @yamlKey close_duration
     */
    closeDuration: TimePeriod;
    /**
     * boolean: Indicates that the cover has built in end stop detectors. In this configuration the `stop_action` is not per...
     * @yamlKey has_built_in_endstop
     */
    hasBuiltInEndstop?: boolean;
    /**
     * boolean: For covers with manual external controls. With this configuration if the cover is commanded to open or close...
     * @yamlKey manual_control
     */
    manualControl?: boolean;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote req...
     * @yamlKey open_action
     */
    openAction: TriggerHandler;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The amount of time it takes the cover to open up from the...
     * @yamlKey open_duration
     */
    openDuration: TimePeriod;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed to stop the cover w...
     * @yamlKey stop_action
     */
    stopAction: TriggerHandler;
}
interface TormaticProps extends _CoreComponent {
    /** @yamlKey close_duration */
    closeDuration?: TimePeriod;
    /** @yamlKey open_duration */
    openDuration?: TimePeriod;
    /** @yamlKey uart_id */
    uartId?: RefProp<__marker_uart_UARTComponent>;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface TuyaProps extends _CoreComponent {
    /** @yamlKey control_datapoint */
    controlDatapoint?: number;
    /** @yamlKey direction_datapoint */
    directionDatapoint?: number;
    /** @yamlKey invert_position */
    invertPosition?: boolean;
    /** @yamlKey invert_position_report */
    invertPositionReport?: boolean;
    /** @yamlKey max_value */
    maxValue?: number;
    /** @yamlKey min_value */
    minValue?: number;
    /** @yamlKey position_datapoint */
    positionDatapoint: number;
    /** @yamlKey position_report_datapoint */
    positionReportDatapoint?: number;
    /** @yamlKey restore_mode */
    restoreMode?: "NO_RESTORE" | "RESTORE" | "RESTORE_AND_CALL";
    /** @yamlKey tuya_id */
    tuyaId?: RefProp<__marker_tuya_Tuya>;
}
export type CoverProps = (CoverBaseProps & {
    platform: "am43";
} & Am43Props & ComponentProps<__marker_am43_Am43Component>) | (CoverBaseProps & {
    platform: "copy";
} & CopyProps & ComponentProps<__marker_copy_CopyCover>) | (CoverBaseProps & {
    platform: "current_based";
} & CurrentBasedProps & ComponentProps<__marker_current_based_CurrentBasedCover>) | (CoverBaseProps & {
    platform: "endstop";
} & EndstopProps & ComponentProps<__marker_endstop_EndstopCover>) | (CoverBaseProps & {
    platform: "feedback";
} & FeedbackProps & ComponentProps<__marker_feedback_FeedbackCover>) | (CoverBaseProps & {
    platform: "he60r";
} & He60rProps & ComponentProps<__marker_he60r_HE60rCover>) | (CoverBaseProps & {
    platform: "template";
} & TemplateProps & ComponentProps<__marker_template__TemplateCover>) | (CoverBaseProps & {
    platform: "time_based";
} & TimeBasedProps & ComponentProps<__marker_time_based_TimeBasedCover>) | (CoverBaseProps & {
    platform: "tormatic";
} & TormaticProps & ComponentProps<__marker_tormatic_Tormatic>) | (CoverBaseProps & {
    platform: "tuya";
} & TuyaProps & ComponentProps<__marker_tuya_TuyaCover>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            cover: CoverProps;
        }
    }
}
