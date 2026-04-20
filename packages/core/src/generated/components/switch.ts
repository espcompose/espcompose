// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _BleClient, _CoreComponent, _CoreEntityBase, _CoreMqttCommandComponent, _HomeassistantHomeAssistantImportControl, _ModbusControllerModbusitembaseschema, _NextionSensorConfigSensorComponent, _PipsolarComponent, _UartDevice } from "../bases";
import type { __marker_Color, __marker_Device, __marker_EntityBase, __marker_at581x_AT581XComponent, __marker_at581x_RFSwitch, __marker_ble_client_BLEClientSwitch, __marker_copy_CopySwitch, __marker_dfrobot_sen0395_DfrobotSen0395Component, __marker_dfrobot_sen0395_Sen0395LedSwitch, __marker_dfrobot_sen0395_Sen0395PowerSwitch, __marker_dfrobot_sen0395_Sen0395StartAfterBootSwitch, __marker_dfrobot_sen0395_Sen0395UartPresenceSwitch, __marker_factory_reset_FactoryResetSwitch, __marker_gpio_GPIOSwitch, __marker_gree_GreeClimate, __marker_haier_HaierClimateBase, __marker_hbridge_HBridgeSwitch, __marker_homeassistant_HomeassistantSwitch, __marker_ld2410_LD2410Component, __marker_ld2412_LD2412Component, __marker_ld2450_LD2450Component, __marker_lvgl_LVGLSwitch, __marker_lvgl_LvPseudoButton, __marker_micronova_MicroNova, __marker_modbus_controller_ModbusSwitch, __marker_mqtt_MQTTSwitchComponent, __marker_nextion_NextionSwitch, __marker_opentherm_OpenthermHub, __marker_output_BinaryOutput, __marker_output_OutputSwitch, __marker_restart_RestartSwitch, __marker_safe_mode_SafeModeComponent, __marker_safe_mode_SafeModeSwitch, __marker_seeed_mr24hpc1_MR24HPC1Component, __marker_shutdown_ShutdownSwitch, __marker_switch__Switch, __marker_template__TemplateSwitch, __marker_tm1638_TM1638Component, __marker_tm1638_TM1638SwitchLed, __marker_tuya_Tuya, __marker_tuya_TuyaSwitch, __marker_uart_UARTSwitch, __marker_web_server_WebServer, __marker_zigbee_ZigbeeComponent } from "../markers";
interface SwitchWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface GreeHealthPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface GreeHealthPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface GreeHealthProps {
    availability?: GreeHealthPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: GreeHealthPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface GreeLightPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface GreeLightPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface GreeLightProps {
    availability?: GreeLightPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: GreeLightPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface GreeTurboPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface GreeTurboPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface GreeTurboProps {
    availability?: GreeTurboPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: GreeTurboPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface GreeXfanPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface GreeXfanPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface GreeXfanProps {
    availability?: GreeXfanPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: GreeXfanPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface HaierBeeperPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface HaierBeeperPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface HaierBeeperProps {
    availability?: HaierBeeperPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: HaierBeeperPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface HaierDisplayPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface HaierDisplayPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface HaierDisplayProps {
    availability?: HaierDisplayPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: HaierDisplayPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface HaierHealthModePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface HaierHealthModePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface HaierHealthModeProps {
    availability?: HaierHealthModePropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: HaierHealthModePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface HaierQuietModePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface HaierQuietModePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface HaierQuietModeProps {
    availability?: HaierQuietModePropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: HaierQuietModePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410BluetoothPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410BluetoothPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410BluetoothProps {
    availability?: Ld2410BluetoothPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2410BluetoothPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410EngineeringModePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410EngineeringModePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410EngineeringModeProps {
    availability?: Ld2410EngineeringModePropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2410EngineeringModePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412BluetoothPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412BluetoothPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412BluetoothProps {
    availability?: Ld2412BluetoothPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2412BluetoothPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412EngineeringModePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412EngineeringModePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412EngineeringModeProps {
    availability?: Ld2412EngineeringModePropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2412EngineeringModePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2450BluetoothPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450BluetoothPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450BluetoothProps {
    availability?: Ld2450BluetoothPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2450BluetoothPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2450MultiTargetPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450MultiTargetPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450MultiTargetProps {
    availability?: Ld2450MultiTargetPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2450MultiTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface MicronovaStovePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface MicronovaStovePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface MicronovaStoveProps {
    availability?: MicronovaStovePropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** @yamlKey memory_address */
    memoryAddress?: unknown;
    /** @yamlKey memory_data_off */
    memoryDataOff?: unknown;
    /** @yamlKey memory_data_on */
    memoryDataOn?: unknown;
    /** @yamlKey memory_location */
    memoryLocation?: unknown;
    /** @yamlKey micronova_id */
    micronovaId?: RefProp<__marker_micronova_MicroNova>;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /** @yamlKey web_server */
    webServer?: MicronovaStovePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermChEnablePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermChEnablePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermChEnableProps {
    availability?: OpenthermChEnablePropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: OpenthermChEnablePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermCh2ActivePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermCh2ActivePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermCh2ActiveProps {
    availability?: OpenthermCh2ActivePropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: OpenthermCh2ActivePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermCoolingEnablePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermCoolingEnablePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermCoolingEnableProps {
    availability?: OpenthermCoolingEnablePropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: OpenthermCoolingEnablePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermDhwBlockPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermDhwBlockPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermDhwBlockProps {
    availability?: OpenthermDhwBlockPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: OpenthermDhwBlockPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermDhwEnablePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermDhwEnablePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermDhwEnableProps {
    availability?: OpenthermDhwEnablePropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: OpenthermDhwEnablePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermOtcActivePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermOtcActivePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermOtcActiveProps {
    availability?: OpenthermOtcActivePropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: OpenthermOtcActivePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermSummerModeActivePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermSummerModeActivePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermSummerModeActiveProps {
    availability?: OpenthermSummerModeActivePropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: OpenthermSummerModeActivePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarInputVoltageRangePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarInputVoltageRangePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarInputVoltageRangeProps {
    availability?: PipsolarInputVoltageRangePropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: PipsolarInputVoltageRangePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarOutputSourcePriorityBatteryPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarOutputSourcePriorityBatteryPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarOutputSourcePriorityBatteryProps {
    availability?: PipsolarOutputSourcePriorityBatteryPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: PipsolarOutputSourcePriorityBatteryPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarOutputSourcePriorityHybridPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarOutputSourcePriorityHybridPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarOutputSourcePriorityHybridProps {
    availability?: PipsolarOutputSourcePriorityHybridPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: PipsolarOutputSourcePriorityHybridPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarOutputSourcePrioritySolarPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarOutputSourcePrioritySolarPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarOutputSourcePrioritySolarProps {
    availability?: PipsolarOutputSourcePrioritySolarPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: PipsolarOutputSourcePrioritySolarPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarOutputSourcePriorityUtilityPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarOutputSourcePriorityUtilityPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarOutputSourcePriorityUtilityProps {
    availability?: PipsolarOutputSourcePriorityUtilityPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: PipsolarOutputSourcePriorityUtilityPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarPvOkConditionForParallelPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarPvOkConditionForParallelPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarPvOkConditionForParallelProps {
    availability?: PipsolarPvOkConditionForParallelPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: PipsolarPvOkConditionForParallelPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarPvPowerBalancePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarPvPowerBalancePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarPvPowerBalanceProps {
    availability?: PipsolarPvPowerBalancePropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: PipsolarPvPowerBalancePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface SeeedMr24hpc1UnderlyingOpenFunctionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SeeedMr24hpc1UnderlyingOpenFunctionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SeeedMr24hpc1UnderlyingOpenFunctionProps {
    availability?: SeeedMr24hpc1UnderlyingOpenFunctionPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** string: The name of the switch. At least one of id and name must be specified. */
    name?: string;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    qos?: unknown;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1UnderlyingOpenFunctionPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface UartDataProps {
    /** @yamlKey turn_off */
    turnOff?: unknown;
    /** @yamlKey turn_on */
    turnOn?: unknown;
}
interface SwitchBaseProps extends _CoreEntityBase, _CoreMqttCommandComponent {
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
    /** string: Manually specify the ID for code generation. At least one of id and name must be specified. */
    id?: string;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    /** @yamlKey web_server */
    webServer?: SwitchWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface At581xProps {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the AT581x component defined above. Required when m...
     * @yamlKey at581x_id
     */
    at581xId?: RefProp<__marker_at581x_AT581XComponent>;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    icon?: unknown;
}
interface BleClientProps extends _BleClient, _CoreComponent {
    icon?: unknown;
}
interface CopyProps extends _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The switch that should be mirrored.
     * @yamlKey source_id
     */
    sourceId: RefProp<__marker_switch__Switch>;
}
interface DfrobotSen0395PresenceViaUartProps extends _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the DFRobot mmWave component defined above. Require...
     * @yamlKey dfrobot_sen0395_id
     */
    dfrobotSen0395Id?: RefProp<__marker_dfrobot_sen0395_DfrobotSen0395Component>;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
}
interface DfrobotSen0395SensorActiveProps extends _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the DFRobot mmWave component defined above. Require...
     * @yamlKey dfrobot_sen0395_id
     */
    dfrobotSen0395Id?: RefProp<__marker_dfrobot_sen0395_DfrobotSen0395Component>;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
}
interface DfrobotSen0395StartAfterBootProps extends _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the DFRobot mmWave component defined above. Require...
     * @yamlKey dfrobot_sen0395_id
     */
    dfrobotSen0395Id?: RefProp<__marker_dfrobot_sen0395_DfrobotSen0395Component>;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
}
interface DfrobotSen0395TurnOnLedProps extends _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the DFRobot mmWave component defined above. Require...
     * @yamlKey dfrobot_sen0395_id
     */
    dfrobotSen0395Id?: RefProp<__marker_dfrobot_sen0395_DfrobotSen0395Component>;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
}
interface FactoryResetProps extends _CoreComponent {
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    icon?: unknown;
}
interface GpioProps extends _CoreComponent {
    /** list: A list of other GPIO switches in an interlock group. See [Interlocking](https://esphome.io/components/switch/gp... */
    interlock?: Array<RefProp<__marker_switch__Switch>>;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): For interlocking mode, set how long to wait after other i...
     * @yamlKey interlock_wait_time
     */
    interlockWaitTime?: TimePeriod;
    /** [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The GPIO pin to use for the switch. */
    pin: Pin;
}
interface GreeProps {
    /** @yamlKey gree_id */
    greeId: RefProp<__marker_gree_GreeClimate>;
    health?: GreeHealthProps;
    light?: GreeLightProps;
    turbo?: GreeTurboProps;
    xfan?: GreeXfanProps;
}
interface HaierProps {
    /** (supported only by hOn) A switch that enables or disables Haier climate sound feedback. All options from [Switch](htt... */
    beeper?: HaierBeeperProps;
    /** A switch that enables or disables Haier climate led display. All options from [Switch](https://esphome.io/components/... */
    display?: HaierDisplayProps;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The id of Haier climate component
     * @yamlKey haier_id
     */
    haierId?: RefProp<__marker_haier_HaierClimateBase>;
    /**
     * A switch that enables or disables Haier climate health mode (UV light sterilization). All options from [Switch](https...
     * @yamlKey health_mode
     */
    healthMode?: HaierHealthModeProps;
    /**
     * (supported only by hOn) A switch that enables or disables Haier climate quiet mode. Quiet mode not supported in Fan o...
     * @yamlKey quiet_mode
     */
    quietMode?: HaierQuietModeProps;
}
interface HbridgeProps extends _CoreComponent {
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The GPIO pin to pulse to turn off the switch.
     * @yamlKey off_pin
     */
    offPin: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The GPIO pin to pulse to turn on the switch.
     * @yamlKey on_pin
     */
    onPin: Pin;
    /** boolean: Whether to operate in optimistic mode - when in this mode, any command sent to the switch will immediately u... */
    optimistic?: boolean;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The length in milliseconds of the pulse sent on `on_pin` ...
     * @yamlKey pulse_length
     */
    pulseLength?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The time in milliseconds to delay between pulses on `off_...
     * @yamlKey wait_time
     */
    waitTime?: TimePeriod;
}
interface HomeassistantProps extends _HomeassistantHomeAssistantImportControl, _CoreComponent {
}
interface Ld2410Props {
    /** Turn on/off the bluetooth adapter. Defaults to `true`. All options from [Switch](https://esphome.io/components/switch... */
    bluetooth?: Ld2410BluetoothProps;
    /**
     * enable/disable engineering mode. Note that this requires more resources and is not recommended to be enabled when not...
     * @yamlKey engineering_mode
     */
    engineeringMode?: Ld2410EngineeringModeProps;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID for the [Ld2410](https://esphome.io/c...
     * @yamlKey ld2410_id
     */
    ld2410Id?: RefProp<__marker_ld2410_LD2410Component>;
}
interface Ld2412Props {
    /** Turn on/off the bluetooth adapter. Defaults to `true`. All options from [Switch](https://esphome.io/components/switch... */
    bluetooth?: Ld2412BluetoothProps;
    /** @yamlKey engineering_mode */
    engineeringMode?: Ld2412EngineeringModeProps;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID for the component. Required when usin...
     * @yamlKey ld2412_id
     */
    ld2412Id?: RefProp<__marker_ld2412_LD2412Component>;
}
interface Ld2450Props {
    /** Turn on/off the bluetooth adapter. Defaults to `true`. All options from [Switch](https://esphome.io/components/switch... */
    bluetooth?: Ld2450BluetoothProps;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID for the [Ld2450](https://esphome.io/c...
     * @yamlKey ld2450_id
     */
    ld2450Id?: RefProp<__marker_ld2450_LD2450Component>;
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
    /** @yamlKey assumed_state */
    assumedState?: boolean;
    /** @yamlKey register_type */
    registerType?: "coil" | "custom" | "discrete_input" | "holding" | "read";
    /** @yamlKey restore_mode */
    restoreMode?: unknown;
    /** @yamlKey use_write_multiple */
    useWriteMultiple?: boolean;
    /** @yamlKey write_lambda */
    writeLambda?: unknown;
}
interface NextionProps extends _NextionSensorConfigSensorComponent {
    /**
     * [Color](https://esphome.io/components/display#config-color): The background color when pressed
     * @yamlKey background_pressed_color
     */
    backgroundPressedColor?: RefProp<__marker_Color>;
    /**
     * [Color](https://esphome.io/components/display#config-color): The foreground color when pressed
     * @yamlKey foreground_pressed_color
     */
    foregroundPressedColor?: RefProp<__marker_Color>;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The duration to update the sensor. If using a [Nextion Cu...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
interface OpenthermProps extends _CoreComponent {
    /** @yamlKey ch_enable */
    chEnable?: OpenthermChEnableProps;
    /** @yamlKey ch2_active */
    ch2Active?: OpenthermCh2ActiveProps;
    /** @yamlKey cooling_enable */
    coolingEnable?: OpenthermCoolingEnableProps;
    /** @yamlKey dhw_block */
    dhwBlock?: OpenthermDhwBlockProps;
    /** @yamlKey dhw_enable */
    dhwEnable?: OpenthermDhwEnableProps;
    /** @yamlKey opentherm_id */
    openthermId?: RefProp<__marker_opentherm_OpenthermHub>;
    /** @yamlKey otc_active */
    otcActive?: OpenthermOtcActiveProps;
    /** @yamlKey summer_mode_active */
    summerModeActive?: OpenthermSummerModeActiveProps;
}
interface OutputProps extends _CoreComponent {
    /** [ID](https://esphome.io/guides/configuration-types#id): The ID of the output component to use. */
    output: RefProp<__marker_output_BinaryOutput>;
}
interface PipsolarProps extends _PipsolarComponent {
    /**
     * input voltage range
     * @yamlKey input_voltage_range
     */
    inputVoltageRange?: PipsolarInputVoltageRangeProps;
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
     * output source priority solar
     * @yamlKey output_source_priority_solar
     */
    outputSourcePrioritySolar?: PipsolarOutputSourcePrioritySolarProps;
    /**
     * output source priority utility
     * @yamlKey output_source_priority_utility
     */
    outputSourcePriorityUtility?: PipsolarOutputSourcePriorityUtilityProps;
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
    /**
     * boolean: Whether the true state of the switch is not known. This will make the Home Assistant frontend show buttons f...
     * @yamlKey assumed_state
     */
    assumedState?: boolean;
    /** [lambda](https://esphome.io/automations/templates#config-lambda): Lambda to be evaluated repeatedly to get the curren... */
    lambda?: unknown;
    /** boolean: Whether to operate in optimistic mode - when in this mode, any command sent to the template switch will imme... */
    optimistic?: boolean;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote (li...
     * @yamlKey turn_off_action
     */
    turnOffAction?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote (li...
     * @yamlKey turn_on_action
     */
    turnOnAction?: TriggerHandler;
}
interface Tm1638Props extends _CoreComponent {
    led: number;
    /** @yamlKey tm1638_id */
    tm1638Id?: RefProp<__marker_tm1638_TM1638Component>;
}
interface TuyaProps extends _CoreComponent {
    /** @yamlKey switch_datapoint */
    switchDatapoint: number;
    /** @yamlKey tuya_id */
    tuyaId?: RefProp<__marker_tuya_Tuya>;
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
    type: "presence_via_uart";
} & DfrobotSen0395PresenceViaUartProps & ComponentProps<__marker_dfrobot_sen0395_Sen0395UartPresenceSwitch>) | (SwitchBaseProps & {
    platform: "dfrobot_sen0395";
    type: "sensor_active";
} & DfrobotSen0395SensorActiveProps & ComponentProps<__marker_dfrobot_sen0395_Sen0395PowerSwitch>) | (SwitchBaseProps & {
    platform: "dfrobot_sen0395";
    type: "start_after_boot";
} & DfrobotSen0395StartAfterBootProps & ComponentProps<__marker_dfrobot_sen0395_Sen0395StartAfterBootSwitch>) | (SwitchBaseProps & {
    platform: "dfrobot_sen0395";
    type: "turn_on_led";
} & DfrobotSen0395TurnOnLedProps & ComponentProps<__marker_dfrobot_sen0395_Sen0395LedSwitch>) | (SwitchBaseProps & {
    platform: "factory_reset";
} & FactoryResetProps & ComponentProps<__marker_factory_reset_FactoryResetSwitch>) | (SwitchBaseProps & {
    platform: "gpio";
} & GpioProps & ComponentProps<__marker_gpio_GPIOSwitch>) | (SwitchBaseProps & {
    platform: "gree";
} & GreeProps & ComponentProps<__marker_mqtt_MQTTSwitchComponent>) | (SwitchBaseProps & {
    platform: "haier";
} & HaierProps & ComponentProps<__marker_mqtt_MQTTSwitchComponent>) | (SwitchBaseProps & {
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
} & MicronovaProps & ComponentProps<__marker_mqtt_MQTTSwitchComponent>) | (SwitchBaseProps & {
    platform: "modbus_controller";
} & ModbusControllerProps & ComponentProps<__marker_modbus_controller_ModbusSwitch>) | (SwitchBaseProps & {
    platform: "nextion";
} & NextionProps & ComponentProps<__marker_nextion_NextionSwitch>) | (SwitchBaseProps & {
    platform: "opentherm";
} & OpenthermProps & ComponentProps<__marker_mqtt_MQTTSwitchComponent>) | (SwitchBaseProps & {
    platform: "output";
} & OutputProps & ComponentProps<__marker_output_OutputSwitch>) | (SwitchBaseProps & {
    platform: "pipsolar";
} & PipsolarProps & ComponentProps<__marker_mqtt_MQTTSwitchComponent>) | (SwitchBaseProps & {
    platform: "restart";
} & RestartProps & ComponentProps<__marker_restart_RestartSwitch>) | (SwitchBaseProps & {
    platform: "safe_mode";
} & SafeModeProps & ComponentProps<__marker_safe_mode_SafeModeSwitch>) | (SwitchBaseProps & {
    platform: "seeed_mr24hpc1";
} & SeeedMr24hpc1Props & ComponentProps<__marker_mqtt_MQTTSwitchComponent>) | (SwitchBaseProps & {
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
