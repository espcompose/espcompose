// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent, _CoreEntityBase, _CoreMqttCommandComponent } from "../bases";
import type { am43_Am43Component, binary_sensor_BinarySensor, ble_client_BLEClient, copy_CopyCover, cover_Cover, current_based_CurrentBasedCover, endstop_EndstopCover, feedback_FeedbackCover, he60r_HE60rCover, sensor_Sensor, template__TemplateCover, time_based_TimeBasedCover, tormatic_Tormatic, tuya_Tuya, tuya_TuyaCover, uart_UARTComponent, web_server_WebServer } from "../markers";
interface CoverWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface CoverBaseProps extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey web_server */
    webServer?: CoverWebServerProps;
    /** @yamlKey mqtt_json_state_payload */
    mqttJsonStatePayload?: boolean | EmbedValue<boolean>;
    /** @yamlKey device_class */
    deviceClass?: "awning" | "blind" | "curtain" | "damper" | "door" | "" | "garage" | "gate" | "shade" | "shutter" | "window";
    /** @yamlKey position_command_topic */
    positionCommandTopic?: unknown;
    /** @yamlKey position_state_topic */
    positionStateTopic?: unknown;
    /** @yamlKey tilt_command_topic */
    tiltCommandTopic?: unknown;
    /** @yamlKey tilt_state_topic */
    tiltStateTopic?: unknown;
    /** @yamlKey on_open */
    onOpen?: TriggerHandler;
    /** @yamlKey on_opened */
    onOpened?: TriggerHandler;
    /** @yamlKey on_closed */
    onClosed?: TriggerHandler;
    /** @yamlKey on_closing */
    onClosing?: TriggerHandler;
    /** @yamlKey on_opening */
    onOpening?: TriggerHandler;
    /** @yamlKey on_idle */
    onIdle?: TriggerHandler;
}
interface Am43Props extends _CoreComponent {
    /** int: The pin for the device, as set in the app. The default is usually printed on the device. Defaults to `8888`. */
    pin?: number | EmbedValue<number>;
    /**
     * boolean: Inverts the position value to and from the device. Set if ESPHome is swapping around the open/close state of...
     * @yamlKey invert_position
     */
    invertPosition?: boolean | EmbedValue<boolean>;
    /**
     * [ID](/guides/configuration-types#id): The id of the `ble_client` entry associated with the device.
     * @yamlKey ble_client_id
     */
    bleClientId?: RefProp<ble_client_BLEClient>;
}
interface CurrentBasedProps extends _CoreComponent {
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed to stop the cover.
     * @yamlKey stop_action
     */
    stopAction: TriggerHandler;
    /**
     * [ID](/guides/configuration-types#id): The open current sensor.
     * @yamlKey open_sensor
     */
    openSensor: RefProp<sensor_Sensor>;
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
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote requests the cover to...
     * @yamlKey open_action
     */
    openAction: TriggerHandler;
    /**
     * [Time](/guides/configuration-types#time): The amount of time it takes the cover to open up from the fully-closed state.
     * @yamlKey open_duration
     */
    openDuration: TimePeriod;
    /**
     * [ID](/guides/configuration-types#id): The close current sensor.
     * @yamlKey close_sensor
     */
    closeSensor: RefProp<sensor_Sensor>;
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
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote requests the cover to...
     * @yamlKey close_action
     */
    closeAction: TriggerHandler;
    /**
     * [Time](/guides/configuration-types#time): The amount of time it takes the cover to close from the fully-open state.
     * @yamlKey close_duration
     */
    closeDuration: TimePeriod;
    /**
     * percentage: The percentage of rollback the cover will perform in case of obstacle detection. Defaults to `10%`.
     * @yamlKey obstacle_rollback
     */
    obstacleRollback?: number;
    /**
     * [Time](/guides/configuration-types#time): The maximum duration the cover should be opening or closing. Useful for pro...
     * @yamlKey max_duration
     */
    maxDuration?: TimePeriod;
    /**
     * boolean: Enable to detect malfunction detection (Typically welded relays). Defaults to `True`.
     * @yamlKey malfunction_detection
     */
    malfunctionDetection?: boolean | EmbedValue<boolean>;
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when relay malfunction is detected. M...
     * @yamlKey malfunction_action
     */
    malfunctionAction?: TriggerHandler;
    /**
     * [Time](/guides/configuration-types#time): The amount of time the current sensing will be disabled when the movement s...
     * @yamlKey start_sensing_delay
     */
    startSensingDelay?: TimePeriod;
}
interface EndstopProps extends _CoreComponent {
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote requests the cover to...
     * @yamlKey stop_action
     */
    stopAction: TriggerHandler;
    /**
     * [ID](/guides/configuration-types#id): The ID of the [Binary Sensor](/components/binary_sensor#config-binary_sensor) t...
     * @yamlKey open_endstop
     */
    openEndstop: RefProp<binary_sensor_BinarySensor>;
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote requests the cover to...
     * @yamlKey open_action
     */
    openAction: TriggerHandler;
    /**
     * [Time](/guides/configuration-types#time): The amount of time it takes the cover to open up from the fully-closed state.
     * @yamlKey open_duration
     */
    openDuration: TimePeriod;
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote requests the cover to...
     * @yamlKey close_action
     */
    closeAction: TriggerHandler;
    /**
     * [ID](/guides/configuration-types#id): The ID of the [Binary Sensor](/components/binary_sensor#config-binary_sensor) t...
     * @yamlKey close_endstop
     */
    closeEndstop: RefProp<binary_sensor_BinarySensor>;
    /**
     * [Time](/guides/configuration-types#time): The amount of time it takes the cover to close from the fully-open state.
     * @yamlKey close_duration
     */
    closeDuration: TimePeriod;
    /**
     * [Time](/guides/configuration-types#time): The maximum duration the cover should be opening or closing. Useful for pro...
     * @yamlKey max_duration
     */
    maxDuration?: TimePeriod;
}
interface FeedbackProps extends _CoreComponent {
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote requests the cover to...
     * @yamlKey stop_action
     */
    stopAction: TriggerHandler;
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote requests the cover to...
     * @yamlKey open_action
     */
    openAction: TriggerHandler;
    /**
     * [Time](/guides/configuration-types#time): The amount of time it takes the cover to open up from the fully-closed state.
     * @yamlKey open_duration
     */
    openDuration: TimePeriod;
    /**
     * [ID](/guides/configuration-types#id): The ID of the [Binary Sensor](/components/binary_sensor#config-binary_sensor) t...
     * @yamlKey open_endstop
     */
    openEndstop?: RefProp<binary_sensor_BinarySensor>;
    /**
     * [ID](/guides/configuration-types#id): The ID of the [Binary Sensor](/components/binary_sensor#config-binary_sensor) t...
     * @yamlKey open_sensor
     */
    openSensor?: RefProp<binary_sensor_BinarySensor>;
    /**
     * [ID](/guides/configuration-types#id): The ID of the [Binary Sensor](/components/binary_sensor#config-binary_sensor) t...
     * @yamlKey open_obstacle_sensor
     */
    openObstacleSensor?: RefProp<binary_sensor_BinarySensor>;
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote requests the cover to...
     * @yamlKey close_action
     */
    closeAction: TriggerHandler;
    /**
     * [Time](/guides/configuration-types#time): The amount of time it takes the cover to close from the fully-open state.
     * @yamlKey close_duration
     */
    closeDuration: TimePeriod;
    /**
     * [ID](/guides/configuration-types#id): The ID of the [Binary Sensor](/components/binary_sensor#config-binary_sensor) t...
     * @yamlKey close_endstop
     */
    closeEndstop?: RefProp<binary_sensor_BinarySensor>;
    /**
     * [ID](/guides/configuration-types#id): The ID of the [Binary Sensor](/components/binary_sensor#config-binary_sensor) t...
     * @yamlKey close_sensor
     */
    closeSensor?: RefProp<binary_sensor_BinarySensor>;
    /**
     * [ID](/guides/configuration-types#id): The ID of the [Binary Sensor](/components/binary_sensor#config-binary_sensor) t...
     * @yamlKey close_obstacle_sensor
     */
    closeObstacleSensor?: RefProp<binary_sensor_BinarySensor>;
    /**
     * [Time](/guides/configuration-types#time): The maximum duration the cover should be opening or closing. Useful for pro...
     * @yamlKey max_duration
     */
    maxDuration?: TimePeriod;
    /**
     * boolean: Indicates that the cover has built in end stop detectors. In this configuration the `stop_action` is not per...
     * @yamlKey has_built_in_endstop
     */
    hasBuiltInEndstop?: boolean | EmbedValue<boolean>;
    /**
     * boolean: Whether the true state of the cover is not known. This will make the Home Assistant frontend show buttons fo...
     * @yamlKey assumed_state
     */
    assumedState?: boolean | EmbedValue<boolean>;
    /**
     * [Time](/guides/configuration-types#time): The interval to publish updated position information to the UI while the co...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
    /**
     * boolean: Whether to infer endstop state from the movement sensor. Requires movement sensors to be set, no endstop sen...
     * @yamlKey infer_endstop_from_movement
     */
    inferEndstopFromMovement?: boolean | EmbedValue<boolean>;
    /**
     * [Time](/guides/configuration-types#time): Stops cover and forces a wait time between changes in direction, and takes ...
     * @yamlKey direction_change_wait_time
     */
    directionChangeWaitTime?: TimePeriod;
    /**
     * [Time](/guides/configuration-types#time): Considers a wait time needed by the cover to actually start moving after co...
     * @yamlKey acceleration_wait_time
     */
    accelerationWaitTime?: TimePeriod;
    /**
     * percentage: The percentage of rollback the cover will perform in case of obstacle detection while moving. Defaults to...
     * @yamlKey obstacle_rollback
     */
    obstacleRollback?: number;
}
interface He60rProps extends _CoreComponent {
    /** @yamlKey uart_id */
    uartId?: RefProp<uart_UARTComponent>;
    /**
     * [Time](/guides/configuration-types#time): The time required for the door to fully open from the closed position. Defa...
     * @yamlKey open_duration
     */
    openDuration?: TimePeriod;
    /**
     * [Time](/guides/configuration-types#time): The time required for the door to fully close from the open position. Defau...
     * @yamlKey close_duration
     */
    closeDuration?: TimePeriod;
}
interface TimeBasedProps extends _CoreComponent {
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed to stop the cover when the remote req...
     * @yamlKey stop_action
     */
    stopAction: TriggerHandler;
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote requests the cover to...
     * @yamlKey open_action
     */
    openAction: TriggerHandler;
    /**
     * [Time](/guides/configuration-types#time): The amount of time it takes the cover to open up from the fully-closed state.
     * @yamlKey open_duration
     */
    openDuration: TimePeriod;
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote requests the cover to...
     * @yamlKey close_action
     */
    closeAction: TriggerHandler;
    /**
     * [Time](/guides/configuration-types#time): The amount of time it takes the cover to close from the fully-open state.
     * @yamlKey close_duration
     */
    closeDuration: TimePeriod;
    /**
     * boolean: Indicates that the cover has built in end stop detectors. In this configuration the `stop_action` is not per...
     * @yamlKey has_built_in_endstop
     */
    hasBuiltInEndstop?: boolean | EmbedValue<boolean>;
    /**
     * boolean: For covers with manual external controls. With this configuration if the cover is commanded to open or close...
     * @yamlKey manual_control
     */
    manualControl?: boolean | EmbedValue<boolean>;
    /**
     * boolean: Whether the true state of the cover is not known. This will make the Home Assistant frontend show buttons fo...
     * @yamlKey assumed_state
     */
    assumedState?: boolean | EmbedValue<boolean>;
}
interface TormaticProps extends _CoreComponent {
    /** @yamlKey uart_id */
    uartId?: RefProp<uart_UARTComponent>;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /** @yamlKey open_duration */
    openDuration?: TimePeriod;
    /** @yamlKey close_duration */
    closeDuration?: TimePeriod;
}
interface CopyProps extends _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): The cover that should be mirrored.
     * @yamlKey source_id
     */
    sourceId: RefProp<cover_Cover>;
}
interface TemplateProps extends _CoreComponent {
    /** [lambda](/automations/templates#config-lambda): Lambda to be evaluated repeatedly to get the current state/position o... */
    lambda?: unknown;
    /** boolean: Whether to operate in optimistic mode - when in this mode, any command sent to the template cover will immed... */
    optimistic?: boolean | EmbedValue<boolean>;
    /**
     * boolean: Whether the true state/position of the cover is not known. This will make the Home Assistant frontend show b...
     * @yamlKey assumed_state
     */
    assumedState?: boolean | EmbedValue<boolean>;
    /**
     * boolean: Whether this cover will publish its position as a floating point number. By default (`false` ), the cover on...
     * @yamlKey has_position
     */
    hasPosition?: boolean | EmbedValue<boolean>;
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote (like Home Assistant'...
     * @yamlKey open_action
     */
    openAction?: TriggerHandler;
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote requests the cover to...
     * @yamlKey close_action
     */
    closeAction?: TriggerHandler;
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote requests the cover to...
     * @yamlKey stop_action
     */
    stopAction?: TriggerHandler;
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote (like Home Assistant'...
     * @yamlKey tilt_action
     */
    tiltAction?: TriggerHandler;
    /**
     * [lambda](/automations/templates#config-lambda): Lambda to be evaluated repeatedly to get the current tilt position of...
     * @yamlKey tilt_lambda
     */
    tiltLambda?: unknown;
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote requests to toggle th...
     * @yamlKey toggle_action
     */
    toggleAction?: TriggerHandler;
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote (like Home Assistant'...
     * @yamlKey position_action
     */
    positionAction?: TriggerHandler;
    /** @yamlKey restore_mode */
    restoreMode?: "NO_RESTORE" | "RESTORE" | "RESTORE_AND_CALL";
}
interface TuyaProps extends _CoreComponent {
    /** @yamlKey tuya_id */
    tuyaId?: RefProp<tuya_Tuya>;
    /** @yamlKey control_datapoint */
    controlDatapoint?: number | EmbedValue<number>;
    /** @yamlKey direction_datapoint */
    directionDatapoint?: number | EmbedValue<number>;
    /** @yamlKey position_datapoint */
    positionDatapoint: number | EmbedValue<number>;
    /** @yamlKey position_report_datapoint */
    positionReportDatapoint?: number | EmbedValue<number>;
    /** @yamlKey min_value */
    minValue?: number | EmbedValue<number>;
    /** @yamlKey max_value */
    maxValue?: number | EmbedValue<number>;
    /** @yamlKey invert_position */
    invertPosition?: boolean | EmbedValue<boolean>;
    /** @yamlKey invert_position_report */
    invertPositionReport?: boolean | EmbedValue<boolean>;
    /** @yamlKey restore_mode */
    restoreMode?: "NO_RESTORE" | "RESTORE" | "RESTORE_AND_CALL";
}
export type CoverProps = (CoverBaseProps & {
    platform: "am43";
} & Am43Props & ComponentProps<am43_Am43Component>) | (CoverBaseProps & {
    platform: "current_based";
} & CurrentBasedProps & ComponentProps<current_based_CurrentBasedCover>) | (CoverBaseProps & {
    platform: "endstop";
} & EndstopProps & ComponentProps<endstop_EndstopCover>) | (CoverBaseProps & {
    platform: "feedback";
} & FeedbackProps & ComponentProps<feedback_FeedbackCover>) | (CoverBaseProps & {
    platform: "he60r";
} & He60rProps & ComponentProps<he60r_HE60rCover>) | (CoverBaseProps & {
    platform: "time_based";
} & TimeBasedProps & ComponentProps<time_based_TimeBasedCover>) | (CoverBaseProps & {
    platform: "tormatic";
} & TormaticProps & ComponentProps<tormatic_Tormatic>) | (CoverBaseProps & {
    platform: "copy";
} & CopyProps & ComponentProps<copy_CopyCover>) | (CoverBaseProps & {
    platform: "template";
} & TemplateProps & ComponentProps<template__TemplateCover>) | (CoverBaseProps & {
    platform: "tuya";
} & TuyaProps & ComponentProps<tuya_TuyaCover>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            cover: CoverProps;
        }
    }
}
