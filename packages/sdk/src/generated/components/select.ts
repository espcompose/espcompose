// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent, _CoreEntityBase, _CoreMqttCommandComponent } from "../bases";
import type { EntityBase, copy_CopySelect, es8388_ES8388, ld2410_LD2410Component, ld2412_LD2412Component, ld2420_LD2420Component, ld2450_LD2450Component, logger_Logger, logger_LoggerLevelSelect, lvgl_LVGLSelect, modbus_controller_ModbusController, modbus_controller_ModbusSelect, seeed_mr24hpc1_MR24HPC1Component, seeed_mr60fda2_MR60FDA2Component, select_Select, template__TemplateSelect, tuya_Tuya, tuya_TuyaSelect, web_server_WebServer } from "../markers";
interface SelectWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Es8388DacOutputPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Es8388DacOutputPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Es8388DacOutputProps {
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
    availability?: Es8388DacOutputPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Es8388DacOutputPropsWebServerProps;
    /** @yamlKey on_value */
    onValue?: () => void;
}
interface Es8388AdcInputMicPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Es8388AdcInputMicPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Es8388AdcInputMicProps {
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
    availability?: Es8388AdcInputMicPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Es8388AdcInputMicPropsWebServerProps;
    /** @yamlKey on_value */
    onValue?: () => void;
}
interface Ld2410DistanceResolutionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2410DistanceResolutionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2410DistanceResolutionProps {
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
    availability?: Ld2410DistanceResolutionPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2410DistanceResolutionPropsWebServerProps;
    /** @yamlKey on_value */
    onValue?: () => void;
}
interface Ld2410LightFunctionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2410LightFunctionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2410LightFunctionProps {
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
    availability?: Ld2410LightFunctionPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2410LightFunctionPropsWebServerProps;
    /** @yamlKey on_value */
    onValue?: () => void;
}
interface Ld2410OutPinLevelPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2410OutPinLevelPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2410OutPinLevelProps {
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
    availability?: Ld2410OutPinLevelPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2410OutPinLevelPropsWebServerProps;
    /** @yamlKey on_value */
    onValue?: () => void;
}
interface Ld2410BaudRatePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2410BaudRatePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2410BaudRateProps {
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
    availability?: Ld2410BaudRatePropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2410BaudRatePropsWebServerProps;
    /** @yamlKey on_value */
    onValue?: () => void;
}
interface Ld2412BaudRatePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2412BaudRatePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2412BaudRateProps {
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
    availability?: Ld2412BaudRatePropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2412BaudRatePropsWebServerProps;
    /** @yamlKey on_value */
    onValue?: () => void;
}
interface Ld2412DistanceResolutionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2412DistanceResolutionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2412DistanceResolutionProps {
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
    availability?: Ld2412DistanceResolutionPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2412DistanceResolutionPropsWebServerProps;
    /** @yamlKey on_value */
    onValue?: () => void;
}
interface Ld2412LightFunctionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2412LightFunctionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2412LightFunctionProps {
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
    availability?: Ld2412LightFunctionPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2412LightFunctionPropsWebServerProps;
    /** @yamlKey on_value */
    onValue?: () => void;
}
interface Ld2412OutPinLevelPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2412OutPinLevelPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2412OutPinLevelProps {
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
    availability?: Ld2412OutPinLevelPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2412OutPinLevelPropsWebServerProps;
    /** @yamlKey on_value */
    onValue?: () => void;
}
interface Ld2420OperatingModePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2420OperatingModePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2420OperatingModeProps {
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
    availability?: Ld2420OperatingModePropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2420OperatingModePropsWebServerProps;
    /** @yamlKey on_value */
    onValue?: () => void;
}
interface Ld2450BaudRatePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2450BaudRatePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2450BaudRateProps {
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
    availability?: Ld2450BaudRatePropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2450BaudRatePropsWebServerProps;
    /** @yamlKey on_value */
    onValue?: () => void;
}
interface Ld2450ZoneTypePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2450ZoneTypePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2450ZoneTypeProps {
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
    availability?: Ld2450ZoneTypePropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2450ZoneTypePropsWebServerProps;
    /** @yamlKey on_value */
    onValue?: () => void;
}
interface SeeedMr24hpc1SceneModePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SeeedMr24hpc1SceneModePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SeeedMr24hpc1SceneModeProps {
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
    availability?: SeeedMr24hpc1SceneModePropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1SceneModePropsWebServerProps;
    /** @yamlKey on_value */
    onValue?: () => void;
}
interface SeeedMr24hpc1UnmanTimePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SeeedMr24hpc1UnmanTimePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SeeedMr24hpc1UnmanTimeProps {
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
    availability?: SeeedMr24hpc1UnmanTimePropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1UnmanTimePropsWebServerProps;
    /** @yamlKey on_value */
    onValue?: () => void;
}
interface SeeedMr24hpc1ExistenceBoundaryPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SeeedMr24hpc1ExistenceBoundaryPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SeeedMr24hpc1ExistenceBoundaryProps {
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
    availability?: SeeedMr24hpc1ExistenceBoundaryPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1ExistenceBoundaryPropsWebServerProps;
    /** @yamlKey on_value */
    onValue?: () => void;
}
interface SeeedMr24hpc1MotionBoundaryPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SeeedMr24hpc1MotionBoundaryPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SeeedMr24hpc1MotionBoundaryProps {
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
    availability?: SeeedMr24hpc1MotionBoundaryPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1MotionBoundaryPropsWebServerProps;
    /** @yamlKey on_value */
    onValue?: () => void;
}
interface SeeedMr60fda2InstallHeightPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SeeedMr60fda2InstallHeightPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SeeedMr60fda2InstallHeightProps {
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
    availability?: SeeedMr60fda2InstallHeightPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: SeeedMr60fda2InstallHeightPropsWebServerProps;
    /** @yamlKey on_value */
    onValue?: () => void;
}
interface SeeedMr60fda2HeightThresholdPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SeeedMr60fda2HeightThresholdPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SeeedMr60fda2HeightThresholdProps {
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
    availability?: SeeedMr60fda2HeightThresholdPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: SeeedMr60fda2HeightThresholdPropsWebServerProps;
    /** @yamlKey on_value */
    onValue?: () => void;
}
interface SeeedMr60fda2SensitivityPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SeeedMr60fda2SensitivityPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SeeedMr60fda2SensitivityProps {
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
    availability?: SeeedMr60fda2SensitivityPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: SeeedMr60fda2SensitivityPropsWebServerProps;
    /** @yamlKey on_value */
    onValue?: () => void;
}
interface SelectBaseProps extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey web_server */
    webServer?: SelectWebServerProps;
    /** @yamlKey on_value */
    onValue?: () => void;
}
interface CopyProps extends _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): The select that should be mirrored.
     * @yamlKey source_id
     */
    sourceId: RefProp<select_Select>;
}
interface Es8388Props {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID for the [Es8388](/components/audio_dac/es8388/) component.
     * @yamlKey es8388_id
     */
    es8388Id?: RefProp<es8388_ES8388>;
    /**
     * Control the DAC Audio output.
     * @yamlKey dac_output
     */
    dacOutput?: Es8388DacOutputProps;
    /**
     * Control the ADC Mic Input.
     * @yamlKey adc_input_mic
     */
    adcInputMic?: Es8388AdcInputMicProps;
}
interface Ld2410Props {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID for the [Ld2410](/components/sensor/ld2410/) component ...
     * @yamlKey ld2410_id
     */
    ld2410Id?: RefProp<ld2410_LD2410Component>;
    /**
     * Control the gates distance resolution. Can be `0.75m` or `0.2m`. Defaults to `0.75m`. All options from [Select](/comp...
     * @yamlKey distance_resolution
     */
    distanceResolution?: Ld2410DistanceResolutionProps;
    /**
     * If set, will affect the OUT pin value, based on [light threshold](https://esphome.io/components/sensor/ld2410#ld2410-...
     * @yamlKey light_function
     */
    lightFunction?: Ld2410LightFunctionProps;
    /**
     * Control OUT pin `away` value. Can be `low` or `high`. Defaults to `low`. All options from [Select](/components/select...
     * @yamlKey out_pin_level
     */
    outPinLevel?: Ld2410OutPinLevelProps;
    /**
     * Control the serial port baud rate. Defaults to `256000`. Once changed, all sensors will stop working until you reinst...
     * @yamlKey baud_rate
     */
    baudRate?: Ld2410BaudRateProps;
}
interface Ld2412Props {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID for the component. Required when using multiple compone...
     * @yamlKey ld2412_id
     */
    ld2412Id?: RefProp<ld2412_LD2412Component>;
    /**
     * Allows changing the baud rate of the LD2412's serial port. Defaults to `115200`. Once changed, sensors will stop work...
     * @yamlKey baud_rate
     */
    baudRate?: Ld2412BaudRateProps;
    /**
     * Control the gates distance resolution. Can be `0.75m`, `0.5m` or `0.2m`. Defaults to `0.75m`. All options from [Selec...
     * @yamlKey distance_resolution
     */
    distanceResolution?: Ld2412DistanceResolutionProps;
    /**
     * Allows selection of how the LD2412's OUT pin will react to the light level. Can be `off`, `below` or `above`. Note th...
     * @yamlKey light_function
     */
    lightFunction?: Ld2412LightFunctionProps;
    /**
     * Allows selection of the LD2412's OUT pin behavior when the sensor detects presence. Can be `low` or `high`. Defaults ...
     * @yamlKey out_pin_level
     */
    outPinLevel?: Ld2412OutPinLevelProps;
}
interface Ld2420Props {
    /** @yamlKey ld2420_id */
    ld2420Id?: RefProp<ld2420_LD2420Component>;
    /**
     * Provisions the operating mode select component. May contain any options from [Select](/components/select#config-select).
     * @yamlKey operating_mode
     */
    operatingMode: Ld2420OperatingModeProps;
}
interface Ld2450Props {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID for the [Ld2450](/components/sensor/ld2450/) component.
     * @yamlKey ld2450_id
     */
    ld2450Id?: RefProp<ld2450_LD2450Component>;
    /**
     * Control the UART serial port baud rate. Defaults to `256000`. Once changed, all sensors will stop working until a fre...
     * @yamlKey baud_rate
     */
    baudRate?: Ld2450BaudRateProps;
    /**
     * Control the zone detection modes. It can be set to `Disabled`, `Detection` or `Filter`. Selecting the `Disabled` opti...
     * @yamlKey zone_type
     */
    zoneType?: Ld2450ZoneTypeProps;
}
interface LoggerProps {
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    icon?: unknown;
    /** @yamlKey logger_id */
    loggerId?: RefProp<logger_Logger>;
}
interface LvglProps {
    widget: RefProp<unknown>;
    animated?: boolean;
    /** @yamlKey restore_value */
    restoreValue?: boolean;
}
interface ModbusControllerProps extends _CoreComponent {
    /** @yamlKey modbus_controller_id */
    modbusControllerId?: RefProp<modbus_controller_ModbusController>;
    address: number;
    /** @yamlKey value_type */
    valueType?: "RAW" | "U_WORD" | "S_WORD" | "U_DWORD" | "U_DWORD_R" | "S_DWORD" | "S_DWORD_R" | "U_QWORD" | "U_QWORD_R" | "S_QWORD" | "S_QWORD_R";
    /** @yamlKey register_count */
    registerCount?: number;
    /** @yamlKey skip_updates */
    skipUpdates?: number;
    /** @yamlKey force_new_range */
    forceNewRange?: boolean;
    optionsmap: unknown;
    /** @yamlKey use_write_multiple */
    useWriteMultiple?: boolean;
    optimistic?: boolean;
    lambda?: unknown;
    /** @yamlKey write_lambda */
    writeLambda?: unknown;
}
interface SeeedMr24hpc1Props {
    /** @yamlKey mr24hpc1_id */
    mr24hpc1Id?: RefProp<seeed_mr24hpc1_MR24HPC1Component>;
    /**
     * Valid only in [standard mode](https://esphome.io/components/seeed_mr24hpc1#seeed_mr24hpc1-standard_mode). Used to sel...
     * @yamlKey scene_mode
     */
    sceneMode?: SeeedMr24hpc1SceneModeProps;
    /**
     * Valid only in [standard mode](https://esphome.io/components/seeed_mr24hpc1#seeed_mr24hpc1-standard_mode). Same as `cu...
     * @yamlKey unman_time
     */
    unmanTime?: SeeedMr24hpc1UnmanTimeProps;
    /**
     * Valid only in [custom mode settings](https://esphome.io/components/seeed_mr24hpc1#seeed_mr24hpc1-custom_mode). The di...
     * @yamlKey existence_boundary
     */
    existenceBoundary?: SeeedMr24hpc1ExistenceBoundaryProps;
    /**
     * Valid only in [custom mode settings](https://esphome.io/components/seeed_mr24hpc1#seeed_mr24hpc1-custom_mode). The di...
     * @yamlKey motion_boundary
     */
    motionBoundary?: SeeedMr24hpc1MotionBoundaryProps;
}
interface SeeedMr60fda2Props {
    /** @yamlKey mr60fda2_id */
    mr60fda2Id?: RefProp<seeed_mr60fda2_MR60FDA2Component>;
    /**
     * Before using the MR60FDA2, please select the installation height of the radar according to the actual situation in or...
     * @yamlKey install_height
     */
    installHeight?: SeeedMr60fda2InstallHeightProps;
    /**
     * To accurately distinguish between a person falling and sitting still in this area, you need to set the trigger height...
     * @yamlKey height_threshold
     */
    heightThreshold?: SeeedMr60fda2HeightThresholdProps;
    /** Fall sensitivity factor. Defaults to 1 with a range of 1-3, 3 = high and 1 = low. All options from [Select](/componen... */
    sensitivity?: SeeedMr60fda2SensitivityProps;
}
interface TemplateProps extends _CoreComponent {
    /** list: The list of options this Select has. */
    options: Array<string>;
    /** [lambda](/automations/templates#config-lambda): Lambda to be evaluated every update interval to get the current optio... */
    lambda?: unknown;
    /** boolean: Whether to operate in optimistic mode - when in this mode, any command sent to the Template Select will imme... */
    optimistic?: boolean;
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote (like Home Assistant'...
     * @yamlKey set_action
     */
    setAction?: () => void;
    /**
     * string: The option to set the option to on setup if not restored with `restore_value`. Cannot be used with `lambda`. ...
     * @yamlKey initial_option
     */
    initialOption?: string;
    /**
     * boolean: Saves and loads the state to RTC/Flash. Cannot be used with `lambda`. Defaults to `false`.
     * @yamlKey restore_value
     */
    restoreValue?: boolean;
    /**
     * [Time](/guides/configuration-types#time): The interval on which to update the select by executing the `lambda`. Defau...
     * @yamlKey update_interval
     */
    updateInterval?: unknown;
}
interface TuyaProps extends _CoreComponent {
    /** @yamlKey tuya_id */
    tuyaId?: RefProp<tuya_Tuya>;
    /** @yamlKey enum_datapoint */
    enumDatapoint?: number;
    /** @yamlKey int_datapoint */
    intDatapoint?: number;
    options: unknown;
    optimistic?: boolean;
}
export type SelectProps = (SelectBaseProps & {
    platform: "copy";
} & CopyProps & ComponentProps<copy_CopySelect>) | (SelectBaseProps & {
    platform: "es8388";
} & Es8388Props & ComponentProps<select_Select>) | (SelectBaseProps & {
    platform: "ld2410";
} & Ld2410Props & ComponentProps<EntityBase>) | (SelectBaseProps & {
    platform: "ld2412";
} & Ld2412Props & ComponentProps<EntityBase>) | (SelectBaseProps & {
    platform: "ld2420";
} & Ld2420Props & ComponentProps<select_Select>) | (SelectBaseProps & {
    platform: "ld2450";
} & Ld2450Props & ComponentProps<EntityBase>) | (SelectBaseProps & {
    platform: "logger";
} & LoggerProps & ComponentProps<logger_LoggerLevelSelect>) | (SelectBaseProps & {
    platform: "lvgl";
} & LvglProps & ComponentProps<lvgl_LVGLSelect>) | (SelectBaseProps & {
    platform: "modbus_controller";
} & ModbusControllerProps & ComponentProps<modbus_controller_ModbusSelect>) | (SelectBaseProps & {
    platform: "seeed_mr24hpc1";
} & SeeedMr24hpc1Props & ComponentProps<select_Select>) | (SelectBaseProps & {
    platform: "seeed_mr60fda2";
} & SeeedMr60fda2Props & ComponentProps<select_Select>) | (SelectBaseProps & {
    platform: "template";
} & TemplateProps & ComponentProps<template__TemplateSelect>) | (SelectBaseProps & {
    platform: "tuya";
} & TuyaProps & ComponentProps<tuya_TuyaSelect>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            select: SelectProps;
        }
    }
}
