// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _BleClient, _CoreComponent, _CoreEntityBase, _CoreMqttCommandComponent, _HomeassistantHomeAssistantImportControl, _ModbusControllerModbusitembaseschema, _NextionSensorConfigSensorComponent, _PipsolarComponent, _UartDevice } from "../bases";
import type { __marker_Color, __marker_EntityBase, __marker_at581x_AT581XComponent, __marker_at581x_RFSwitch, __marker_ble_client_BLEClientSwitch, __marker_copy_CopySwitch, __marker_dfrobot_sen0395_DfrobotSen0395Component, __marker_dfrobot_sen0395_Sen0395LedSwitch, __marker_dfrobot_sen0395_Sen0395PowerSwitch, __marker_dfrobot_sen0395_Sen0395StartAfterBootSwitch, __marker_dfrobot_sen0395_Sen0395UartPresenceSwitch, __marker_factory_reset_FactoryResetSwitch, __marker_gpio_GPIOSwitch, __marker_gree_GreeClimate, __marker_haier_HaierClimateBase, __marker_hbridge_HBridgeSwitch, __marker_homeassistant_HomeassistantSwitch, __marker_ld2410_LD2410Component, __marker_ld2412_LD2412Component, __marker_ld2450_LD2450Component, __marker_lvgl_LVGLSwitch, __marker_lvgl_LvPseudoButton, __marker_micronova_MicroNova, __marker_modbus_controller_ModbusSwitch, __marker_nextion_NextionSwitch, __marker_opentherm_OpenthermHub, __marker_output_BinaryOutput, __marker_output_OutputSwitch, __marker_restart_RestartSwitch, __marker_safe_mode_SafeModeComponent, __marker_safe_mode_SafeModeSwitch, __marker_seeed_mr24hpc1_MR24HPC1Component, __marker_shutdown_ShutdownSwitch, __marker_switch__Switch, __marker_template__TemplateSwitch, __marker_tm1638_TM1638Component, __marker_tm1638_TM1638SwitchLed, __marker_tuya_Tuya, __marker_tuya_TuyaSwitch, __marker_uart_UARTSwitch, __marker_web_server_WebServer, __marker_zigbee_ZigbeeComponent, __marker_zigbee_ZigbeeSwitch } from "../markers";
interface SwitchWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface GreeTurboPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface GreeTurboPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface GreeTurboProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: GreeTurboPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: GreeTurboPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
}
interface GreeLightPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface GreeLightPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface GreeLightProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: GreeLightPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: GreeLightPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
}
interface GreeHealthPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface GreeHealthPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface GreeHealthProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: GreeHealthPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: GreeHealthPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
}
interface GreeXfanPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface GreeXfanPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface GreeXfanProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: GreeXfanPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: GreeXfanPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
}
interface HaierDisplayPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface HaierDisplayPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface HaierDisplayProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: HaierDisplayPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: HaierDisplayPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
}
interface HaierHealthModePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface HaierHealthModePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface HaierHealthModeProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: HaierHealthModePropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: HaierHealthModePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
}
interface HaierBeeperPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface HaierBeeperPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface HaierBeeperProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: HaierBeeperPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: HaierBeeperPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
}
interface HaierQuietModePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface HaierQuietModePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface HaierQuietModeProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: HaierQuietModePropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: HaierQuietModePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
}
interface Ld2410EngineeringModePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2410EngineeringModePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2410EngineeringModeProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2410EngineeringModePropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2410EngineeringModePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
}
interface Ld2410BluetoothPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2410BluetoothPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2410BluetoothProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2410BluetoothPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2410BluetoothPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
}
interface Ld2412BluetoothPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2412BluetoothPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2412BluetoothProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2412BluetoothPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2412BluetoothPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
}
interface Ld2412EngineeringModePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2412EngineeringModePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2412EngineeringModeProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2412EngineeringModePropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2412EngineeringModePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
}
interface Ld2450BluetoothPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2450BluetoothPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2450BluetoothProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2450BluetoothPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2450BluetoothPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
}
interface Ld2450MultiTargetPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2450MultiTargetPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2450MultiTargetProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2450MultiTargetPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2450MultiTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
}
interface MicronovaStovePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface MicronovaStovePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface MicronovaStoveProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: MicronovaStovePropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: MicronovaStovePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey micronova_id */
    micronovaId?: RefProp<__marker_micronova_MicroNova>;
    /** @yamlKey memory_location */
    memoryLocation?: unknown;
    /** @yamlKey memory_address */
    memoryAddress?: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /** @yamlKey memory_data_off */
    memoryDataOff?: unknown;
    /** @yamlKey memory_data_on */
    memoryDataOn?: unknown;
}
interface OpenthermChEnablePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermChEnablePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermChEnableProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermChEnablePropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermChEnablePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
}
interface OpenthermDhwEnablePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermDhwEnablePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermDhwEnableProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermDhwEnablePropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermDhwEnablePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
}
interface OpenthermCoolingEnablePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermCoolingEnablePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermCoolingEnableProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermCoolingEnablePropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermCoolingEnablePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
}
interface OpenthermOtcActivePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermOtcActivePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermOtcActiveProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermOtcActivePropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermOtcActivePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
}
interface OpenthermCh2ActivePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermCh2ActivePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermCh2ActiveProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermCh2ActivePropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermCh2ActivePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
}
interface OpenthermSummerModeActivePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermSummerModeActivePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermSummerModeActiveProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermSummerModeActivePropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermSummerModeActivePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
}
interface OpenthermDhwBlockPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermDhwBlockPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermDhwBlockProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermDhwBlockPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermDhwBlockPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
}
interface PipsolarOutputSourcePriorityUtilityPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarOutputSourcePriorityUtilityPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarOutputSourcePriorityUtilityProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarOutputSourcePriorityUtilityPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarOutputSourcePriorityUtilityPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
}
interface PipsolarOutputSourcePrioritySolarPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarOutputSourcePrioritySolarPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarOutputSourcePrioritySolarProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarOutputSourcePrioritySolarPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarOutputSourcePrioritySolarPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
}
interface PipsolarOutputSourcePriorityBatteryPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarOutputSourcePriorityBatteryPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarOutputSourcePriorityBatteryProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarOutputSourcePriorityBatteryPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarOutputSourcePriorityBatteryPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
}
interface PipsolarOutputSourcePriorityHybridPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarOutputSourcePriorityHybridPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarOutputSourcePriorityHybridProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarOutputSourcePriorityHybridPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarOutputSourcePriorityHybridPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
}
interface PipsolarInputVoltageRangePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarInputVoltageRangePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarInputVoltageRangeProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarInputVoltageRangePropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarInputVoltageRangePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
}
interface PipsolarPvOkConditionForParallelPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarPvOkConditionForParallelPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarPvOkConditionForParallelProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarPvOkConditionForParallelPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarPvOkConditionForParallelPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
}
interface PipsolarPvPowerBalancePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarPvPowerBalancePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarPvPowerBalanceProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarPvPowerBalancePropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarPvPowerBalancePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
}
interface SeeedMr24hpc1UnderlyingOpenFunctionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SeeedMr24hpc1UnderlyingOpenFunctionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SeeedMr24hpc1UnderlyingOpenFunctionProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: string;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: SeeedMr24hpc1UnderlyingOpenFunctionPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1UnderlyingOpenFunctionPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
}
interface UartDataProps {
    /** @yamlKey turn_off */
    turnOff?: unknown;
    /** @yamlKey turn_on */
    turnOn?: unknown;
}
interface SwitchBaseProps extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey web_server */
    webServer?: SwitchWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
}
interface At581xProps {
    /** @yamlKey device_class */
    deviceClass?: unknown;
    icon?: unknown;
    /**
     * [ID](/guides/configuration-types#id): The ID of the AT581x component defined above. Required when multiple instances ...
     * @yamlKey at581x_id
     */
    at581xId?: RefProp<__marker_at581x_AT581XComponent>;
}
interface BleClientProps extends _BleClient, _CoreComponent {
    icon?: unknown;
}
interface CopyProps extends _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): The switch that should be mirrored.
     * @yamlKey source_id
     */
    sourceId: RefProp<__marker_switch__Switch>;
}
interface DfrobotSen0395SensorActiveProps extends _CoreComponent {
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /**
     * [ID](/guides/configuration-types#id): The ID of the DFRobot mmWave component defined above. Required when multiple in...
     * @yamlKey dfrobot_sen0395_id
     */
    dfrobotSen0395Id?: RefProp<__marker_dfrobot_sen0395_DfrobotSen0395Component>;
}
interface DfrobotSen0395TurnOnLedProps extends _CoreComponent {
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /**
     * [ID](/guides/configuration-types#id): The ID of the DFRobot mmWave component defined above. Required when multiple in...
     * @yamlKey dfrobot_sen0395_id
     */
    dfrobotSen0395Id?: RefProp<__marker_dfrobot_sen0395_DfrobotSen0395Component>;
}
interface DfrobotSen0395PresenceViaUartProps extends _CoreComponent {
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /**
     * [ID](/guides/configuration-types#id): The ID of the DFRobot mmWave component defined above. Required when multiple in...
     * @yamlKey dfrobot_sen0395_id
     */
    dfrobotSen0395Id?: RefProp<__marker_dfrobot_sen0395_DfrobotSen0395Component>;
}
interface DfrobotSen0395StartAfterBootProps extends _CoreComponent {
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /**
     * [ID](/guides/configuration-types#id): The ID of the DFRobot mmWave component defined above. Required when multiple in...
     * @yamlKey dfrobot_sen0395_id
     */
    dfrobotSen0395Id?: RefProp<__marker_dfrobot_sen0395_DfrobotSen0395Component>;
}
interface FactoryResetProps extends _CoreComponent {
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    icon?: unknown;
}
interface GpioProps extends _CoreComponent {
    /** [Pin Schema](/guides/configuration-types#pin-schema): The GPIO pin to use for the switch. */
    pin: Pin;
    /** list: A list of other GPIO switches in an interlock group. See [Interlocking](https://esphome.io/components/switch/gp... */
    interlock?: Array<RefProp<__marker_switch__Switch>>;
    /**
     * [Time](/guides/configuration-types#time): For interlocking mode, set how long to wait after other items in an interlo...
     * @yamlKey interlock_wait_time
     */
    interlockWaitTime?: TimePeriod;
}
interface GreeProps {
    /** @yamlKey gree_id */
    greeId: RefProp<__marker_gree_GreeClimate>;
    turbo?: GreeTurboProps;
    light?: GreeLightProps;
    health?: GreeHealthProps;
    xfan?: GreeXfanProps;
}
interface HaierProps {
    /**
     * [ID](/guides/configuration-types#id): The id of Haier climate component
     * @yamlKey haier_id
     */
    haierId?: RefProp<__marker_haier_HaierClimateBase>;
    /** A switch that enables or disables Haier climate led display. All options from [Switch](/components/switch#config-swit... */
    display?: HaierDisplayProps;
    /**
     * A switch that enables or disables Haier climate health mode (UV light sterilization). All options from [Switch](/comp...
     * @yamlKey health_mode
     */
    healthMode?: HaierHealthModeProps;
    /** (supported only by hOn) A switch that enables or disables Haier climate sound feedback. All options from [Switch](/co... */
    beeper?: HaierBeeperProps;
    /**
     * (supported only by hOn) A switch that enables or disables Haier climate quiet mode. Quiet mode not supported in Fan o...
     * @yamlKey quiet_mode
     */
    quietMode?: HaierQuietModeProps;
}
interface HbridgeProps extends _CoreComponent {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The GPIO pin to pulse to turn on the switch.
     * @yamlKey on_pin
     */
    onPin: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The GPIO pin to pulse to turn off the switch.
     * @yamlKey off_pin
     */
    offPin: Pin;
    /**
     * [Time](/guides/configuration-types#time): The length in milliseconds of the pulse sent on `on_pin` and `off_pin` to c...
     * @yamlKey pulse_length
     */
    pulseLength?: TimePeriod;
    /**
     * [Time](/guides/configuration-types#time): The time in milliseconds to delay between pulses on `off_pin` and `on_pin`....
     * @yamlKey wait_time
     */
    waitTime?: TimePeriod;
    /** boolean: Whether to operate in optimistic mode - when in this mode, any command sent to the switch will immediately u... */
    optimistic?: boolean;
}
interface HomeassistantProps extends _HomeassistantHomeAssistantImportControl, _CoreComponent {
}
interface Ld2410Props {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID for the [Ld2410](/components/sensor/ld2410/) component ...
     * @yamlKey ld2410_id
     */
    ld2410Id?: RefProp<__marker_ld2410_LD2410Component>;
    /**
     * enable/disable engineering mode. Note that this requires more resources and is not recommended to be enabled when not...
     * @yamlKey engineering_mode
     */
    engineeringMode?: Ld2410EngineeringModeProps;
    /** Turn on/off the bluetooth adapter. Defaults to `true`. All options from [Switch](/components/switch#config-switch). */
    bluetooth?: Ld2410BluetoothProps;
}
interface Ld2412Props {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID for the component. Required when using multiple compone...
     * @yamlKey ld2412_id
     */
    ld2412Id?: RefProp<__marker_ld2412_LD2412Component>;
    /** Turn on/off the bluetooth adapter. Defaults to `true`. All options from [Switch](/components/switch#config-switch). */
    bluetooth?: Ld2412BluetoothProps;
    /** @yamlKey engineering_mode */
    engineeringMode?: Ld2412EngineeringModeProps;
}
interface Ld2450Props {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID for the [Ld2450](/components/sensor/ld2450/) component ...
     * @yamlKey ld2450_id
     */
    ld2450Id?: RefProp<__marker_ld2450_LD2450Component>;
    /** Turn on/off the bluetooth adapter. Defaults to `true`. All options from [Switch](/components/switch#config-switch). */
    bluetooth?: Ld2450BluetoothProps;
    /**
     * Turn on/off the Multi Target Tracking option. The initial state set based on the corresponding setting as read from L...
     * @yamlKey multi_target
     */
    multiTarget?: Ld2450MultiTargetProps;
}
interface LvglProps {
    widget: RefProp<__marker_lvgl_LvPseudoButton>;
}
interface MicronovaProps {
    /** @yamlKey micronova_id */
    micronovaId?: RefProp<__marker_micronova_MicroNova>;
    stove?: MicronovaStoveProps;
}
interface ModbusControllerProps extends _CoreComponent, _ModbusControllerModbusitembaseschema {
    /** @yamlKey restore_mode */
    restoreMode?: unknown;
    /** @yamlKey assumed_state */
    assumedState?: boolean;
    /** @yamlKey register_type */
    registerType?: "custom" | "coil" | "holding" | "discrete_input" | "read";
    /** @yamlKey use_write_multiple */
    useWriteMultiple?: boolean;
    /** @yamlKey write_lambda */
    writeLambda?: unknown;
}
interface NextionProps extends _NextionSensorConfigSensorComponent {
    /**
     * [Time](/guides/configuration-types#time): The duration to update the sensor. If using a [Nextion Custom Switch Protoc...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
    /**
     * [Color](/components/display#config-color): The foreground color when pressed
     * @yamlKey foreground_pressed_color
     */
    foregroundPressedColor?: RefProp<__marker_Color>;
    /**
     * [Color](/components/display#config-color): The background color when pressed
     * @yamlKey background_pressed_color
     */
    backgroundPressedColor?: RefProp<__marker_Color>;
}
interface OpenthermProps extends _CoreComponent {
    /** @yamlKey opentherm_id */
    openthermId?: RefProp<__marker_opentherm_OpenthermHub>;
    /** @yamlKey ch_enable */
    chEnable?: OpenthermChEnableProps;
    /** @yamlKey dhw_enable */
    dhwEnable?: OpenthermDhwEnableProps;
    /** @yamlKey cooling_enable */
    coolingEnable?: OpenthermCoolingEnableProps;
    /** @yamlKey otc_active */
    otcActive?: OpenthermOtcActiveProps;
    /** @yamlKey ch2_active */
    ch2Active?: OpenthermCh2ActiveProps;
    /** @yamlKey summer_mode_active */
    summerModeActive?: OpenthermSummerModeActiveProps;
    /** @yamlKey dhw_block */
    dhwBlock?: OpenthermDhwBlockProps;
}
interface OutputProps extends _CoreComponent {
    /** [ID](/guides/configuration-types#id): The ID of the output component to use. */
    output: RefProp<__marker_output_BinaryOutput>;
}
interface PipsolarProps extends _PipsolarComponent {
    /**
     * output source priority utility
     * @yamlKey output_source_priority_utility
     */
    outputSourcePriorityUtility?: PipsolarOutputSourcePriorityUtilityProps;
    /**
     * output source priority solar
     * @yamlKey output_source_priority_solar
     */
    outputSourcePrioritySolar?: PipsolarOutputSourcePrioritySolarProps;
    /**
     * output source priority battery
     * @yamlKey output_source_priority_battery
     */
    outputSourcePriorityBattery?: PipsolarOutputSourcePriorityBatteryProps;
    /**
     * output source priority hybrid
     * @yamlKey output_source_priority_hybrid
     */
    outputSourcePriorityHybrid?: PipsolarOutputSourcePriorityHybridProps;
    /**
     * input voltage range
     * @yamlKey input_voltage_range
     */
    inputVoltageRange?: PipsolarInputVoltageRangeProps;
    /**
     * pv ok condition for parallel
     * @yamlKey pv_ok_condition_for_parallel
     */
    pvOkConditionForParallel?: PipsolarPvOkConditionForParallelProps;
    /**
     * pv power balance
     * @yamlKey pv_power_balance
     */
    pvPowerBalance?: PipsolarPvPowerBalanceProps;
}
interface RestartProps extends _CoreComponent {
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    icon?: unknown;
}
interface SafeModeProps extends _CoreComponent {
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    icon?: unknown;
    /** @yamlKey safe_mode */
    safeMode?: RefProp<__marker_safe_mode_SafeModeComponent>;
}
interface SeeedMr24hpc1Props {
    /** @yamlKey mr24hpc1_id */
    mr24hpc1Id?: RefProp<__marker_seeed_mr24hpc1_MR24HPC1Component>;
    /**
     * Enable/disable underlying open function. When this switch is off, it indicates that it is currently in standard mode....
     * @yamlKey underlying_open_function
     */
    underlyingOpenFunction?: SeeedMr24hpc1UnderlyingOpenFunctionProps;
}
interface ShutdownProps extends _CoreComponent {
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    icon?: unknown;
}
interface TemplateProps extends _CoreComponent {
    /** [lambda](/automations/templates#config-lambda): Lambda to be evaluated repeatedly to get the current state of the swi... */
    lambda?: unknown;
    /** boolean: Whether to operate in optimistic mode - when in this mode, any command sent to the template switch will imme... */
    optimistic?: boolean;
    /**
     * boolean: Whether the true state of the switch is not known. This will make the Home Assistant frontend show buttons f...
     * @yamlKey assumed_state
     */
    assumedState?: boolean;
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote (like Home Assistant'...
     * @yamlKey turn_off_action
     */
    turnOffAction?: TriggerHandler;
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote (like Home Assistant'...
     * @yamlKey turn_on_action
     */
    turnOnAction?: TriggerHandler;
}
interface Tm1638Props extends _CoreComponent {
    /** @yamlKey tm1638_id */
    tm1638Id?: RefProp<__marker_tm1638_TM1638Component>;
    led: number;
}
interface TuyaProps extends _CoreComponent {
    /** @yamlKey tuya_id */
    tuyaId?: RefProp<__marker_tuya_Tuya>;
    /** @yamlKey switch_datapoint */
    switchDatapoint: number;
}
interface UartProps extends _UartDevice, _CoreComponent {
    data: UartDataProps;
    /** @yamlKey send_every */
    sendEvery?: TimePeriod;
}
export type SwitchProps = (SwitchBaseProps & {
    platform: "at581x";
} & At581xProps & ComponentProps<__marker_at581x_RFSwitch>) | (SwitchBaseProps & {
    platform: "ble_client";
} & BleClientProps & ComponentProps<__marker_ble_client_BLEClientSwitch>) | (SwitchBaseProps & {
    platform: "copy";
} & CopyProps & ComponentProps<__marker_copy_CopySwitch>) | (SwitchBaseProps & {
    platform: "dfrobot_sen0395";
    type: "sensor_active";
} & DfrobotSen0395SensorActiveProps & ComponentProps<__marker_dfrobot_sen0395_Sen0395PowerSwitch>) | (SwitchBaseProps & {
    platform: "dfrobot_sen0395";
    type: "turn_on_led";
} & DfrobotSen0395TurnOnLedProps & ComponentProps<__marker_dfrobot_sen0395_Sen0395LedSwitch>) | (SwitchBaseProps & {
    platform: "dfrobot_sen0395";
    type: "presence_via_uart";
} & DfrobotSen0395PresenceViaUartProps & ComponentProps<__marker_dfrobot_sen0395_Sen0395UartPresenceSwitch>) | (SwitchBaseProps & {
    platform: "dfrobot_sen0395";
    type: "start_after_boot";
} & DfrobotSen0395StartAfterBootProps & ComponentProps<__marker_dfrobot_sen0395_Sen0395StartAfterBootSwitch>) | (SwitchBaseProps & {
    platform: "factory_reset";
} & FactoryResetProps & ComponentProps<__marker_factory_reset_FactoryResetSwitch>) | (SwitchBaseProps & {
    platform: "gpio";
} & GpioProps & ComponentProps<__marker_gpio_GPIOSwitch>) | (SwitchBaseProps & {
    platform: "gree";
} & GreeProps & ComponentProps<__marker_zigbee_ZigbeeSwitch>) | (SwitchBaseProps & {
    platform: "haier";
} & HaierProps & ComponentProps<__marker_zigbee_ZigbeeSwitch>) | (SwitchBaseProps & {
    platform: "hbridge";
} & HbridgeProps & ComponentProps<__marker_hbridge_HBridgeSwitch>) | (SwitchBaseProps & {
    platform: "homeassistant";
} & HomeassistantProps & ComponentProps<__marker_homeassistant_HomeassistantSwitch>) | (SwitchBaseProps & {
    platform: "ld2410";
} & Ld2410Props & ComponentProps<__marker_EntityBase>) | (SwitchBaseProps & {
    platform: "ld2412";
} & Ld2412Props & ComponentProps<__marker_EntityBase>) | (SwitchBaseProps & {
    platform: "ld2450";
} & Ld2450Props & ComponentProps<__marker_EntityBase>) | (SwitchBaseProps & {
    platform: "lvgl";
} & LvglProps & ComponentProps<__marker_lvgl_LVGLSwitch>) | (SwitchBaseProps & {
    platform: "micronova";
} & MicronovaProps & ComponentProps<__marker_zigbee_ZigbeeSwitch>) | (SwitchBaseProps & {
    platform: "modbus_controller";
} & ModbusControllerProps & ComponentProps<__marker_modbus_controller_ModbusSwitch>) | (SwitchBaseProps & {
    platform: "nextion";
} & NextionProps & ComponentProps<__marker_nextion_NextionSwitch>) | (SwitchBaseProps & {
    platform: "opentherm";
} & OpenthermProps & ComponentProps<__marker_zigbee_ZigbeeSwitch>) | (SwitchBaseProps & {
    platform: "output";
} & OutputProps & ComponentProps<__marker_output_OutputSwitch>) | (SwitchBaseProps & {
    platform: "pipsolar";
} & PipsolarProps & ComponentProps<__marker_zigbee_ZigbeeSwitch>) | (SwitchBaseProps & {
    platform: "restart";
} & RestartProps & ComponentProps<__marker_restart_RestartSwitch>) | (SwitchBaseProps & {
    platform: "safe_mode";
} & SafeModeProps & ComponentProps<__marker_safe_mode_SafeModeSwitch>) | (SwitchBaseProps & {
    platform: "seeed_mr24hpc1";
} & SeeedMr24hpc1Props & ComponentProps<__marker_zigbee_ZigbeeSwitch>) | (SwitchBaseProps & {
    platform: "shutdown";
} & ShutdownProps & ComponentProps<__marker_shutdown_ShutdownSwitch>) | (SwitchBaseProps & {
    platform: "template";
} & TemplateProps & ComponentProps<__marker_template__TemplateSwitch>) | (SwitchBaseProps & {
    platform: "tm1638";
} & Tm1638Props & ComponentProps<__marker_tm1638_TM1638SwitchLed>) | (SwitchBaseProps & {
    platform: "tuya";
} & TuyaProps & ComponentProps<__marker_tuya_TuyaSwitch>) | (SwitchBaseProps & {
    platform: "uart";
} & UartProps & ComponentProps<__marker_uart_UARTSwitch>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            switch: SwitchProps;
        }
    }
}
