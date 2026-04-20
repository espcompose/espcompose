// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent, _CoreEntityBase, _CoreMqttCommandComponent } from "../bases";
import type { __marker_Device, __marker_EntityBase, __marker_copy_CopySelect, __marker_es8388_ES8388, __marker_ld2410_LD2410Component, __marker_ld2412_LD2412Component, __marker_ld2420_LD2420Component, __marker_ld2450_LD2450Component, __marker_logger_Logger, __marker_logger_LoggerLevelSelect, __marker_lvgl_LVGLSelect, __marker_modbus_controller_ModbusController, __marker_modbus_controller_ModbusSelect, __marker_seeed_mr24hpc1_MR24HPC1Component, __marker_seeed_mr60fda2_MR60FDA2Component, __marker_select_Select, __marker_template__TemplateSelect, __marker_tuya_Tuya, __marker_tuya_TuyaSelect, __marker_web_server_WebServer } from "../markers";
interface SelectWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Es8388AdcInputMicPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Es8388AdcInputMicPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Es8388AdcInputMicProps {
    availability?: Es8388AdcInputMicPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the select in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the select. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Es8388AdcInputMicPropsWebServerProps;
}
interface Es8388DacOutputPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Es8388DacOutputPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Es8388DacOutputProps {
    availability?: Es8388DacOutputPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the select in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the select. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Es8388DacOutputPropsWebServerProps;
}
interface Ld2410BaudRatePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410BaudRatePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410BaudRateProps {
    availability?: Ld2410BaudRatePropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the select in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the select. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2410BaudRatePropsWebServerProps;
}
interface Ld2410DistanceResolutionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410DistanceResolutionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410DistanceResolutionProps {
    availability?: Ld2410DistanceResolutionPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the select in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the select. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2410DistanceResolutionPropsWebServerProps;
}
interface Ld2410LightFunctionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410LightFunctionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410LightFunctionProps {
    availability?: Ld2410LightFunctionPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the select in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the select. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2410LightFunctionPropsWebServerProps;
}
interface Ld2410OutPinLevelPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410OutPinLevelPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410OutPinLevelProps {
    availability?: Ld2410OutPinLevelPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the select in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the select. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2410OutPinLevelPropsWebServerProps;
}
interface Ld2412BaudRatePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412BaudRatePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412BaudRateProps {
    availability?: Ld2412BaudRatePropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the select in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the select. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2412BaudRatePropsWebServerProps;
}
interface Ld2412DistanceResolutionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412DistanceResolutionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412DistanceResolutionProps {
    availability?: Ld2412DistanceResolutionPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the select in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the select. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2412DistanceResolutionPropsWebServerProps;
}
interface Ld2412LightFunctionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412LightFunctionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412LightFunctionProps {
    availability?: Ld2412LightFunctionPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the select in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the select. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2412LightFunctionPropsWebServerProps;
}
interface Ld2412OutPinLevelPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412OutPinLevelPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412OutPinLevelProps {
    availability?: Ld2412OutPinLevelPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the select in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the select. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2412OutPinLevelPropsWebServerProps;
}
interface Ld2420OperatingModePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420OperatingModePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420OperatingModeProps {
    availability?: Ld2420OperatingModePropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the select in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the select. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2420OperatingModePropsWebServerProps;
}
interface Ld2450BaudRatePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450BaudRatePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450BaudRateProps {
    availability?: Ld2450BaudRatePropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the select in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the select. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2450BaudRatePropsWebServerProps;
}
interface Ld2450ZoneTypePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450ZoneTypePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450ZoneTypeProps {
    availability?: Ld2450ZoneTypePropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the select in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the select. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2450ZoneTypePropsWebServerProps;
}
interface SeeedMr24hpc1ExistenceBoundaryPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SeeedMr24hpc1ExistenceBoundaryPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SeeedMr24hpc1ExistenceBoundaryProps {
    availability?: SeeedMr24hpc1ExistenceBoundaryPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the select in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the select. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1ExistenceBoundaryPropsWebServerProps;
}
interface SeeedMr24hpc1MotionBoundaryPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SeeedMr24hpc1MotionBoundaryPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SeeedMr24hpc1MotionBoundaryProps {
    availability?: SeeedMr24hpc1MotionBoundaryPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the select in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the select. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1MotionBoundaryPropsWebServerProps;
}
interface SeeedMr24hpc1SceneModePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SeeedMr24hpc1SceneModePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SeeedMr24hpc1SceneModeProps {
    availability?: SeeedMr24hpc1SceneModePropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the select in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the select. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1SceneModePropsWebServerProps;
}
interface SeeedMr24hpc1UnmanTimePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SeeedMr24hpc1UnmanTimePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SeeedMr24hpc1UnmanTimeProps {
    availability?: SeeedMr24hpc1UnmanTimePropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the select in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the select. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1UnmanTimePropsWebServerProps;
}
interface SeeedMr60fda2HeightThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SeeedMr60fda2HeightThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SeeedMr60fda2HeightThresholdProps {
    availability?: SeeedMr60fda2HeightThresholdPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the select in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the select. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: SeeedMr60fda2HeightThresholdPropsWebServerProps;
}
interface SeeedMr60fda2InstallHeightPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SeeedMr60fda2InstallHeightPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SeeedMr60fda2InstallHeightProps {
    availability?: SeeedMr60fda2InstallHeightPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the select in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the select. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: SeeedMr60fda2InstallHeightPropsWebServerProps;
}
interface SeeedMr60fda2SensitivityPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SeeedMr60fda2SensitivityPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SeeedMr60fda2SensitivityProps {
    availability?: SeeedMr60fda2SensitivityPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the select in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the select. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: SeeedMr60fda2SensitivityPropsWebServerProps;
}
interface SelectBaseProps extends _CoreEntityBase, _CoreMqttCommandComponent {
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey web_server */
    webServer?: SelectWebServerProps;
}
interface CopyProps extends _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The select that should be mirrored.
     * @yamlKey source_id
     */
    sourceId: RefProp<__marker_select_Select>;
}
interface Es8388Props {
    /**
     * Control the ADC Mic Input.
     * @yamlKey adc_input_mic
     */
    adcInputMic?: Es8388AdcInputMicProps;
    /**
     * Control the DAC Audio output.
     * @yamlKey dac_output
     */
    dacOutput?: Es8388DacOutputProps;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID for the [Es8388](https://esphome.io/c...
     * @yamlKey es8388_id
     */
    es8388Id?: RefProp<__marker_es8388_ES8388>;
}
interface Ld2410Props {
    /**
     * Control the serial port baud rate. Defaults to `256000`. Once changed, all sensors will stop working until you reinst...
     * @yamlKey baud_rate
     */
    baudRate?: Ld2410BaudRateProps;
    /**
     * Control the gates distance resolution. Can be `0.75m` or `0.2m`. Defaults to `0.75m`. All options from [Select](https...
     * @yamlKey distance_resolution
     */
    distanceResolution?: Ld2410DistanceResolutionProps;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID for the [Ld2410](https://esphome.io/c...
     * @yamlKey ld2410_id
     */
    ld2410Id?: RefProp<__marker_ld2410_LD2410Component>;
    /**
     * If set, will affect the OUT pin value, based on [light threshold](https://esphome.io/components/sensor/ld2410#ld2410-...
     * @yamlKey light_function
     */
    lightFunction?: Ld2410LightFunctionProps;
    /**
     * Control OUT pin `away` value. Can be `low` or `high`. Defaults to `low`. All options from [Select](https://esphome.io...
     * @yamlKey out_pin_level
     */
    outPinLevel?: Ld2410OutPinLevelProps;
}
interface Ld2412Props {
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
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID for the component. Required when usin...
     * @yamlKey ld2412_id
     */
    ld2412Id?: RefProp<__marker_ld2412_LD2412Component>;
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
    ld2420Id?: RefProp<__marker_ld2420_LD2420Component>;
    /**
     * Provisions the operating mode select component. May contain any options from [Select](https://esphome.io/components/s...
     * @yamlKey operating_mode
     */
    operatingMode: Ld2420OperatingModeProps;
}
interface Ld2450Props {
    /**
     * Control the UART serial port baud rate. Defaults to `256000`. Once changed, all sensors will stop working until a fre...
     * @yamlKey baud_rate
     */
    baudRate?: Ld2450BaudRateProps;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID for the [Ld2450](https://esphome.io/c...
     * @yamlKey ld2450_id
     */
    ld2450Id?: RefProp<__marker_ld2450_LD2450Component>;
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
    loggerId?: RefProp<__marker_logger_Logger>;
}
interface LvglProps {
    animated?: boolean;
    /** @yamlKey restore_value */
    restoreValue?: boolean;
    widget: RefProp<unknown>;
}
interface ModbusControllerProps extends _CoreComponent {
    address: number;
    /** @yamlKey force_new_range */
    forceNewRange?: boolean;
    lambda?: unknown;
    /** @yamlKey modbus_controller_id */
    modbusControllerId?: RefProp<__marker_modbus_controller_ModbusController>;
    optimistic?: boolean;
    optionsmap: unknown;
    /** @yamlKey register_count */
    registerCount?: number;
    /** @yamlKey skip_updates */
    skipUpdates?: number;
    /** @yamlKey use_write_multiple */
    useWriteMultiple?: boolean;
    /** @yamlKey value_type */
    valueType?: "RAW" | "S_DWORD" | "S_DWORD_R" | "S_QWORD" | "S_QWORD_R" | "S_WORD" | "U_DWORD" | "U_DWORD_R" | "U_QWORD" | "U_QWORD_R" | "U_WORD";
    /** @yamlKey write_lambda */
    writeLambda?: unknown;
}
interface SeeedMr24hpc1Props {
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
    /** @yamlKey mr24hpc1_id */
    mr24hpc1Id?: RefProp<__marker_seeed_mr24hpc1_MR24HPC1Component>;
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
}
interface SeeedMr60fda2Props {
    /**
     * To accurately distinguish between a person falling and sitting still in this area, you need to set the trigger height...
     * @yamlKey height_threshold
     */
    heightThreshold?: SeeedMr60fda2HeightThresholdProps;
    /**
     * Before using the MR60FDA2, please select the installation height of the radar according to the actual situation in or...
     * @yamlKey install_height
     */
    installHeight?: SeeedMr60fda2InstallHeightProps;
    /** @yamlKey mr60fda2_id */
    mr60fda2Id?: RefProp<__marker_seeed_mr60fda2_MR60FDA2Component>;
    /** Fall sensitivity factor. Defaults to 1 with a range of 1-3, 3 = high and 1 = low. All options from [Select](https://e... */
    sensitivity?: SeeedMr60fda2SensitivityProps;
}
interface TemplateProps extends _CoreComponent {
    /**
     * string: The option to set the option to on setup if not restored with `restore_value`. Cannot be used with `lambda`. ...
     * @yamlKey initial_option
     */
    initialOption?: string;
    /** [lambda](https://esphome.io/automations/templates#config-lambda): Lambda to be evaluated every update interval to get... */
    lambda?: unknown;
    /** boolean: Whether to operate in optimistic mode - when in this mode, any command sent to the Template Select will imme... */
    optimistic?: boolean;
    /** list: The list of options this Select has. */
    options: Array<string>;
    /**
     * boolean: Saves and loads the state to RTC/Flash. Cannot be used with `lambda`. Defaults to `false`.
     * @yamlKey restore_value
     */
    restoreValue?: boolean;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote (li...
     * @yamlKey set_action
     */
    setAction?: TriggerHandler;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The interval on which to update the select by executing t...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
interface TuyaProps extends _CoreComponent {
    /** @yamlKey enum_datapoint */
    enumDatapoint?: number;
    /** @yamlKey int_datapoint */
    intDatapoint?: number;
    optimistic?: boolean;
    options: unknown;
    /** @yamlKey tuya_id */
    tuyaId?: RefProp<__marker_tuya_Tuya>;
}
export type SelectProps = (SelectBaseProps & {
    platform: "copy";
} & CopyProps & ComponentProps<__marker_copy_CopySelect>) | (SelectBaseProps & {
    platform: "es8388";
} & Es8388Props & ComponentProps<__marker_select_Select>) | (SelectBaseProps & {
    platform: "ld2410";
} & Ld2410Props & ComponentProps<__marker_EntityBase>) | (SelectBaseProps & {
    platform: "ld2412";
} & Ld2412Props & ComponentProps<__marker_EntityBase>) | (SelectBaseProps & {
    platform: "ld2420";
} & Ld2420Props & ComponentProps<__marker_select_Select>) | (SelectBaseProps & {
    platform: "ld2450";
} & Ld2450Props & ComponentProps<__marker_EntityBase>) | (SelectBaseProps & {
    platform: "logger";
} & LoggerProps & ComponentProps<__marker_logger_LoggerLevelSelect>) | (SelectBaseProps & {
    platform: "lvgl";
} & LvglProps & ComponentProps<__marker_lvgl_LVGLSelect>) | (SelectBaseProps & {
    platform: "modbus_controller";
} & ModbusControllerProps & ComponentProps<__marker_modbus_controller_ModbusSelect>) | (SelectBaseProps & {
    platform: "seeed_mr24hpc1";
} & SeeedMr24hpc1Props & ComponentProps<__marker_select_Select>) | (SelectBaseProps & {
    platform: "seeed_mr60fda2";
} & SeeedMr60fda2Props & ComponentProps<__marker_select_Select>) | (SelectBaseProps & {
    platform: "template";
} & TemplateProps & ComponentProps<__marker_template__TemplateSelect>) | (SelectBaseProps & {
    platform: "tuya";
} & TuyaProps & ComponentProps<__marker_tuya_TuyaSelect>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            select: SelectProps;
        }
    }
}
