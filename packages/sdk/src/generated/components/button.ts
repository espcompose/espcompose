// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent, _CoreEntityBase, _CoreMqttCommandComponent, _UartDevice } from "../bases";
import type { EntityBase, atm90e32_ATM90E32Component, bl0940_BL0940, bl0940_CalibrationResetButton, button_Button, copy_CopyButton, factory_reset_FactoryResetButton, haier_HonClimate, ld2410_LD2410Component, ld2412_LD2412Component, ld2420_LD2420Component, ld2450_LD2450Component, micronova_MicroNova, mqtt_MQTTButtonComponent, output_BinaryOutput, output_OutputButton, restart_RestartButton, safe_mode_SafeModeButton, safe_mode_SafeModeComponent, seeed_mr24hpc1_MR24HPC1Component, seeed_mr60fda2_MR60FDA2Component, shutdown_ShutdownButton, template__TemplateButton, uart_UARTButton, wake_on_lan_WakeOnLanButton, web_server_WebServer } from "../markers";
interface ButtonWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Atm90e32RunGainCalibrationPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Atm90e32RunGainCalibrationPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Atm90e32RunGainCalibrationProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Atm90e32RunGainCalibrationPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Atm90e32RunGainCalibrationPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface Atm90e32ClearGainCalibrationPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Atm90e32ClearGainCalibrationPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Atm90e32ClearGainCalibrationProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Atm90e32ClearGainCalibrationPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Atm90e32ClearGainCalibrationPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface Atm90e32RunOffsetCalibrationPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Atm90e32RunOffsetCalibrationPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Atm90e32RunOffsetCalibrationProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Atm90e32RunOffsetCalibrationPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Atm90e32RunOffsetCalibrationPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface Atm90e32ClearOffsetCalibrationPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Atm90e32ClearOffsetCalibrationPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Atm90e32ClearOffsetCalibrationProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Atm90e32ClearOffsetCalibrationPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Atm90e32ClearOffsetCalibrationPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface Atm90e32RunPowerOffsetCalibrationPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Atm90e32RunPowerOffsetCalibrationPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Atm90e32RunPowerOffsetCalibrationProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Atm90e32RunPowerOffsetCalibrationPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Atm90e32RunPowerOffsetCalibrationPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface Atm90e32ClearPowerOffsetCalibrationPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Atm90e32ClearPowerOffsetCalibrationPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Atm90e32ClearPowerOffsetCalibrationProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Atm90e32ClearPowerOffsetCalibrationPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Atm90e32ClearPowerOffsetCalibrationPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface OutputDurationProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface HaierSelfCleaningPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface HaierSelfCleaningPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface HaierSelfCleaningProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: HaierSelfCleaningPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: HaierSelfCleaningPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface HaierSteriCleaningPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface HaierSteriCleaningPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface HaierSteriCleaningProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: HaierSteriCleaningPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: HaierSteriCleaningPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface Ld2410FactoryResetPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2410FactoryResetPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2410FactoryResetProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2410FactoryResetPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2410FactoryResetPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface Ld2410RestartPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2410RestartPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2410RestartProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2410RestartPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2410RestartPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface Ld2410QueryParamsPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2410QueryParamsPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2410QueryParamsProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2410QueryParamsPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2410QueryParamsPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface Ld2412FactoryResetPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2412FactoryResetPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2412FactoryResetProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2412FactoryResetPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2412FactoryResetPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface Ld2412QueryParamsPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2412QueryParamsPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2412QueryParamsProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2412QueryParamsPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2412QueryParamsPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface Ld2412RestartPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2412RestartPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2412RestartProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2412RestartPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2412RestartPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface Ld2412StartDynamicBackgroundCorrectionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2412StartDynamicBackgroundCorrectionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2412StartDynamicBackgroundCorrectionProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2412StartDynamicBackgroundCorrectionPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2412StartDynamicBackgroundCorrectionPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface Ld2420ApplyConfigPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2420ApplyConfigPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2420ApplyConfigProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2420ApplyConfigPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2420ApplyConfigPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface Ld2420RevertConfigPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2420RevertConfigPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2420RevertConfigProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2420RevertConfigPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2420RevertConfigPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface Ld2420RestartModulePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2420RestartModulePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2420RestartModuleProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2420RestartModulePropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2420RestartModulePropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface Ld2420FactoryResetPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2420FactoryResetPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2420FactoryResetProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2420FactoryResetPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2420FactoryResetPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface Ld2450FactoryResetPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2450FactoryResetPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2450FactoryResetProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2450FactoryResetPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2450FactoryResetPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface Ld2450RestartPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2450RestartPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2450RestartProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2450RestartPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2450RestartPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface MicronovaCustomButtonPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface MicronovaCustomButtonPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface MicronovaCustomButtonProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: MicronovaCustomButtonPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: MicronovaCustomButtonPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey micronova_id */
    micronovaId?: RefProp<micronova_MicroNova>;
    /** @yamlKey memory_location */
    memoryLocation: unknown;
    /** @yamlKey memory_address */
    memoryAddress: unknown;
    /** @yamlKey memory_data */
    memoryData: unknown;
}
interface SeeedMr24hpc1RestartPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SeeedMr24hpc1RestartPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SeeedMr24hpc1RestartProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: SeeedMr24hpc1RestartPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1RestartPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface SeeedMr24hpc1CustomSetEndPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SeeedMr24hpc1CustomSetEndPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SeeedMr24hpc1CustomSetEndProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: SeeedMr24hpc1CustomSetEndPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1CustomSetEndPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface SeeedMr60fda2GetRadarParametersPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SeeedMr60fda2GetRadarParametersPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SeeedMr60fda2GetRadarParametersProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: SeeedMr60fda2GetRadarParametersPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: SeeedMr60fda2GetRadarParametersPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface SeeedMr60fda2FactoryResetPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SeeedMr60fda2FactoryResetPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SeeedMr60fda2FactoryResetProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: SeeedMr60fda2FactoryResetPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: SeeedMr60fda2FactoryResetPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface ButtonBaseProps extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey web_server */
    webServer?: ButtonWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey on_press */
    onPress?: () => void;
}
interface Atm90e32Props {
    /** [ID](/guides/configuration-types#id): The ID of the `atm90e32` sensor defined above. Required if using more than one ... */
    id?: RefProp<atm90e32_ATM90E32Component>;
    /**
     * A button to run the gain calibration. `enable_gain_calibration` must be `True`. These values can be permanently store...
     * @yamlKey run_gain_calibration
     */
    runGainCalibration?: Atm90e32RunGainCalibrationProps;
    /**
     * A button to clear the gain calibration from flash memory and use default values, or values defined under `gain_voltag...
     * @yamlKey clear_gain_calibration
     */
    clearGainCalibration?: Atm90e32ClearGainCalibrationProps;
    /**
     * A button to run the offset calibration. `enable_offset_calibration` must be `True`. These values can be permanently s...
     * @yamlKey run_offset_calibration
     */
    runOffsetCalibration?: Atm90e32RunOffsetCalibrationProps;
    /**
     * A button to clear the gain calibration from flash memory and use default values, or values defined under `offset_volt...
     * @yamlKey clear_offset_calibration
     */
    clearOffsetCalibration?: Atm90e32ClearOffsetCalibrationProps;
    /**
     * A button to run the power offset calibration. `enable_offset_calibration` must be `True`. These values can be permane...
     * @yamlKey run_power_offset_calibration
     */
    runPowerOffsetCalibration?: Atm90e32RunPowerOffsetCalibrationProps;
    /**
     * A button to clear the gain calibration from flash memory and use default values, or values defined under `offset_acti...
     * @yamlKey clear_power_offset_calibration
     */
    clearPowerOffsetCalibration?: Atm90e32ClearPowerOffsetCalibrationProps;
}
interface Bl0940Props extends _CoreComponent {
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey bl0940_id */
    bl0940Id?: RefProp<bl0940_BL0940>;
}
interface OutputProps extends _CoreComponent {
    /** [ID](/guides/configuration-types#id): The ID of the output component to use. */
    output: RefProp<output_BinaryOutput>;
    /** [Time](/guides/configuration-types#time): How long the output should be set when the button is pressed. */
    duration: OutputDurationProps;
}
interface RestartProps extends _CoreComponent {
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_class */
    deviceClass?: unknown;
}
interface ShutdownProps extends _CoreComponent {
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
}
interface WakeOnLanProps extends _CoreComponent {
    /**
     * MAC Address: The MAC Address of the target computer.
     * @yamlKey target_mac_address
     */
    targetMacAddress: unknown;
}
interface CopyProps extends _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): The button that should be mirrored.
     * @yamlKey source_id
     */
    sourceId: RefProp<button_Button>;
}
interface FactoryResetProps extends _CoreComponent {
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_class */
    deviceClass?: unknown;
}
interface HaierProps {
    /**
     * [ID](/guides/configuration-types#id): The id of Haier climate component
     * @yamlKey haier_id
     */
    haierId?: RefProp<haier_HonClimate>;
    /**
     * A button that starts Haier climate self cleaning. All options from [Button](/components/button#config-button).
     * @yamlKey self_cleaning
     */
    selfCleaning?: HaierSelfCleaningProps;
    /**
     * A button that starts Haier climate 56°C Steri-Clean. All options from [Button](/components/button#config-button).
     * @yamlKey steri_cleaning
     */
    steriCleaning?: HaierSteriCleaningProps;
}
interface Ld2410Props {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID for the [Ld2410](/components/sensor/ld2410/) component ...
     * @yamlKey ld2410_id
     */
    ld2410Id?: RefProp<ld2410_LD2410Component>;
    /**
     * This command is used to restore all configuration values to their original values. All options from [Button](/compone...
     * @yamlKey factory_reset
     */
    factoryReset?: Ld2410FactoryResetProps;
    /** Restart the device. All options from [Button](/components/button#config-button). */
    restart?: Ld2410RestartProps;
    /**
     * Refresh all sensors values of the device. All options from [Button](/components/button#config-button).
     * @yamlKey query_params
     */
    queryParams?: Ld2410QueryParamsProps;
}
interface Ld2412Props {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID for the component. Required when using multiple compone...
     * @yamlKey ld2412_id
     */
    ld2412Id?: RefProp<ld2412_LD2412Component>;
    /**
     * This command is used to restore all configuration values to their original values. All options from [Button](/compone...
     * @yamlKey factory_reset
     */
    factoryReset?: Ld2412FactoryResetProps;
    /**
     * Refresh all sensors values of the device. All options from [Button](/components/button#config-button).
     * @yamlKey query_params
     */
    queryParams?: Ld2412QueryParamsProps;
    /** Restart the device. All options from [Button](/components/button#config-button). */
    restart?: Ld2412RestartProps;
    /**
     * Start the Dynamic Background Correction All options from [Button](/components/button#config-button).
     * @yamlKey start_dynamic_background_correction
     */
    startDynamicBackgroundCorrection?: Ld2412StartDynamicBackgroundCorrectionProps;
}
interface Ld2420Props {
    /** @yamlKey ld2420_id */
    ld2420Id?: RefProp<ld2420_LD2420Component>;
    /**
     * Saves both manual config tuning or the auto calibrate still and move threshold config settings. May contain any optio...
     * @yamlKey apply_config
     */
    applyConfig: Ld2420ApplyConfigProps;
    /**
     * Undoes in-progress edits prior to their application via the `apply_config` button. May contain any options from [Butt...
     * @yamlKey revert_config
     */
    revertConfig?: Ld2420RevertConfigProps;
    /**
     * Reboots the LD2420 modules. May contain any options from [Button](/components/button#config-button).
     * @yamlKey restart_module
     */
    restartModule?: Ld2420RestartModuleProps;
    /**
     * Restores a base set of LD2420 configuration values. May contain any options from [Button](/components/button#config-b...
     * @yamlKey factory_reset
     */
    factoryReset?: Ld2420FactoryResetProps;
}
interface Ld2450Props {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID for the [Ld2450](/components/sensor/ld2450/) component.
     * @yamlKey ld2450_id
     */
    ld2450Id?: RefProp<ld2450_LD2450Component>;
    /**
     * Resets the `ld2450` to its factory default configuration/values. All options from [Button](/components/button#config-...
     * @yamlKey factory_reset
     */
    factoryReset?: Ld2450FactoryResetProps;
    /** Restart the `ld2450` device. All options from [Button](/components/button#config-button). */
    restart?: Ld2450RestartProps;
}
interface MicronovaProps {
    /** @yamlKey micronova_id */
    micronovaId?: RefProp<micronova_MicroNova>;
    /** @yamlKey custom_button */
    customButton?: MicronovaCustomButtonProps;
}
interface SafeModeProps extends _CoreComponent {
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey safe_mode */
    safeMode?: RefProp<safe_mode_SafeModeComponent>;
}
interface SeeedMr24hpc1Props {
    /** @yamlKey mr24hpc1_id */
    mr24hpc1Id?: RefProp<seeed_mr24hpc1_MR24HPC1Component>;
    /** Restart the device. All options from [Button](/components/button#config-button). */
    restart?: SeeedMr24hpc1RestartProps;
    /**
     * Valid only in [custom mode settings](https://esphome.io/components/seeed_mr24hpc1#seeed_mr24hpc1-custom_mode). This b...
     * @yamlKey custom_set_end
     */
    customSetEnd?: SeeedMr24hpc1CustomSetEndProps;
}
interface SeeedMr60fda2Props {
    /** @yamlKey mr60fda2_id */
    mr60fda2Id?: RefProp<seeed_mr60fda2_MR60FDA2Component>;
    /**
     * Get all the current setup parameters of the radar. All options from [Button](/components/button#config-button).
     * @yamlKey get_radar_parameters
     */
    getRadarParameters?: SeeedMr60fda2GetRadarParametersProps;
    /**
     * Restore all radar settings to factory parameters. All options from [Button](/components/button#config-button).
     * @yamlKey factory_reset
     */
    factoryReset?: SeeedMr60fda2FactoryResetProps;
}
interface UartProps extends _UartDevice, _CoreComponent {
    data: unknown;
}
export type ButtonProps = (ButtonBaseProps & {
    platform: "atm90e32";
} & Atm90e32Props & ComponentProps<mqtt_MQTTButtonComponent>) | (ButtonBaseProps & {
    platform: "bl0940";
} & Bl0940Props & ComponentProps<bl0940_CalibrationResetButton>) | (ButtonBaseProps & {
    platform: "output";
} & OutputProps & ComponentProps<output_OutputButton>) | (ButtonBaseProps & {
    platform: "restart";
} & RestartProps & ComponentProps<restart_RestartButton>) | (ButtonBaseProps & {
    platform: "shutdown";
} & ShutdownProps & ComponentProps<shutdown_ShutdownButton>) | (ButtonBaseProps & {
    platform: "wake_on_lan";
} & WakeOnLanProps & ComponentProps<wake_on_lan_WakeOnLanButton>) | (ButtonBaseProps & {
    platform: "copy";
} & CopyProps & ComponentProps<copy_CopyButton>) | (ButtonBaseProps & {
    platform: "factory_reset";
} & FactoryResetProps & ComponentProps<factory_reset_FactoryResetButton>) | (ButtonBaseProps & {
    platform: "haier";
} & HaierProps & ComponentProps<mqtt_MQTTButtonComponent>) | (ButtonBaseProps & {
    platform: "ld2410";
} & Ld2410Props & ComponentProps<EntityBase>) | (ButtonBaseProps & {
    platform: "ld2412";
} & Ld2412Props & ComponentProps<EntityBase>) | (ButtonBaseProps & {
    platform: "ld2420";
} & Ld2420Props & ComponentProps<mqtt_MQTTButtonComponent>) | (ButtonBaseProps & {
    platform: "ld2450";
} & Ld2450Props & ComponentProps<EntityBase>) | (ButtonBaseProps & {
    platform: "micronova";
} & MicronovaProps & ComponentProps<mqtt_MQTTButtonComponent>) | (ButtonBaseProps & {
    platform: "safe_mode";
} & SafeModeProps & ComponentProps<safe_mode_SafeModeButton>) | (ButtonBaseProps & {
    platform: "seeed_mr24hpc1";
} & SeeedMr24hpc1Props & ComponentProps<mqtt_MQTTButtonComponent>) | (ButtonBaseProps & {
    platform: "seeed_mr60fda2";
} & SeeedMr60fda2Props & ComponentProps<mqtt_MQTTButtonComponent>) | (ButtonBaseProps & {
    platform: "template";
} & ComponentProps<template__TemplateButton>) | (ButtonBaseProps & {
    platform: "uart";
} & UartProps & ComponentProps<uart_UARTButton>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            button: ButtonProps;
        }
    }
}
