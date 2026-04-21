// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_Device, __marker_sprinkler_Sprinkler, __marker_switch__Switch, __marker_web_server_WebServer, __marker_zigbee_ZigbeeComponent } from "../markers";
export interface SprinklerAutoAdvanceSwitchPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
export interface SprinklerAutoAdvanceSwitchPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface SprinklerAutoAdvanceSwitchProps {
    availability?: SprinklerAutoAdvanceSwitchPropsAvailabilityProps;
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
    onState?: TriggerHandler;
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
    webServer?: SprinklerAutoAdvanceSwitchPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
export interface SprinklerMainSwitchPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
export interface SprinklerMainSwitchPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface SprinklerMainSwitchProps {
    availability?: SprinklerMainSwitchPropsAvailabilityProps;
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
    onState?: TriggerHandler;
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
    webServer?: SprinklerMainSwitchPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
export interface SprinklerMultiplierNumberPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
export interface SprinklerMultiplierNumberPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface SprinklerMultiplierNumberProps {
    availability?: SprinklerMultiplierNumberPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the number. See [https://www.home-assistant.io/integrations/number/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "distance" | "duration" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
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
    /** icon: Manually set the icon to use for the number in the frontend. */
    icon?: string;
    /** @yamlKey initial_value */
    initialValue?: number;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey max_value */
    maxValue?: number;
    /** @yamlKey min_value */
    minValue?: number;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler;
    qos?: unknown;
    /** @yamlKey restore_value */
    restoreValue?: boolean;
    retain?: boolean;
    /** @yamlKey set_action */
    setAction?: TriggerHandler;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    step?: number;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: SprinklerMultiplierNumberPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
export interface SprinklerQueueEnableSwitchPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
export interface SprinklerQueueEnableSwitchPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface SprinklerQueueEnableSwitchProps {
    availability?: SprinklerQueueEnableSwitchPropsAvailabilityProps;
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
    onState?: TriggerHandler;
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
    webServer?: SprinklerQueueEnableSwitchPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
export interface SprinklerRepeatNumberPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
export interface SprinklerRepeatNumberPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface SprinklerRepeatNumberProps {
    availability?: SprinklerRepeatNumberPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the number. See [https://www.home-assistant.io/integrations/number/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "distance" | "duration" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
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
    /** icon: Manually set the icon to use for the number in the frontend. */
    icon?: string;
    /** @yamlKey initial_value */
    initialValue?: number;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey max_value */
    maxValue?: number;
    /** @yamlKey min_value */
    minValue?: number;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler;
    qos?: unknown;
    /** @yamlKey restore_value */
    restoreValue?: boolean;
    retain?: boolean;
    /** @yamlKey set_action */
    setAction?: TriggerHandler;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    step?: number;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: SprinklerRepeatNumberPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
export interface SprinklerReverseSwitchPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
export interface SprinklerReverseSwitchPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface SprinklerReverseSwitchProps {
    availability?: SprinklerReverseSwitchPropsAvailabilityProps;
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
    onState?: TriggerHandler;
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
    webServer?: SprinklerReverseSwitchPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
export interface SprinklerStandbySwitchPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
export interface SprinklerStandbySwitchPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface SprinklerStandbySwitchProps {
    availability?: SprinklerStandbySwitchPropsAvailabilityProps;
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
    onState?: TriggerHandler;
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
    webServer?: SprinklerStandbySwitchPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
export interface SprinklerValvesPropsEnableSwitchPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
export interface SprinklerValvesPropsEnableSwitchPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface SprinklerValvesPropsEnableSwitchProps {
    availability?: SprinklerValvesPropsEnableSwitchPropsAvailabilityProps;
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
    onState?: TriggerHandler;
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
    webServer?: SprinklerValvesPropsEnableSwitchPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
export interface SprinklerValvesPropsRunDurationNumberPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
export interface SprinklerValvesPropsRunDurationNumberPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface SprinklerValvesPropsRunDurationNumberProps {
    availability?: SprinklerValvesPropsRunDurationNumberPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the number. See [https://www.home-assistant.io/integrations/number/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "distance" | "duration" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
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
    /** icon: Manually set the icon to use for the number in the frontend. */
    icon?: string;
    /** @yamlKey initial_value */
    initialValue?: number;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey max_value */
    maxValue?: number;
    /** @yamlKey min_value */
    minValue?: number;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler;
    qos?: unknown;
    /** @yamlKey restore_value */
    restoreValue?: boolean;
    retain?: boolean;
    /** @yamlKey set_action */
    setAction?: TriggerHandler;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    step?: number;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: "min" | "s";
    /** @yamlKey web_server */
    webServer?: SprinklerValvesPropsRunDurationNumberPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
export interface SprinklerValvesPropsValveSwitchPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
export interface SprinklerValvesPropsValveSwitchPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface SprinklerValvesPropsValveSwitchProps {
    availability?: SprinklerValvesPropsValveSwitchPropsAvailabilityProps;
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
    onState?: TriggerHandler;
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
    webServer?: SprinklerValvesPropsValveSwitchPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
export interface SprinklerValvesProps {
    /**
     * *string*: The name for the switch component to be used to enable this valve to be run as a part of a full cycle of th...
     * @yamlKey enable_switch
     */
    enableSwitch?: SprinklerValvesPropsEnableSwitchProps;
    /**
     * [Switch](https://esphome.io/components/switch#config-switch): This is the [switch](https://esphome.io/components/swit...
     * @yamlKey pump_switch_id
     */
    pumpSwitchId?: RefProp<__marker_switch__Switch>;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Required when `run_duration_number` is not provided. The ...
     * @yamlKey run_duration
     */
    runDuration?: TimePeriod;
    /**
     * *string*: The name of the [number](https://esphome.io/components/number/) component that should be presented to the f...
     * @yamlKey run_duration_number
     */
    runDurationNumber?: SprinklerValvesPropsRunDurationNumberProps;
    /**
     * *string*: The name for the switch component to be used to control the valve for this part of the sprinkler system (of...
     * @yamlKey valve_switch
     */
    valveSwitch: SprinklerValvesPropsValveSwitchProps;
    /**
     * [Switch](https://esphome.io/components/switch#config-switch): This is the [switch](https://esphome.io/components/swit...
     * @yamlKey valve_switch_id
     */
    valveSwitchId?: RefProp<__marker_switch__Switch>;
}
export interface SprinklerProps extends _CoreComponent {
    /**
     * *string*: Required with more than one valve. The name for the sprinkler controller's "auto-advance" switch as it will...
     * @yamlKey auto_advance_switch
     */
    autoAdvanceSwitch?: SprinklerAutoAdvanceSwitchProps;
    /**
     * *string*: Required with more than one valve. The name for the sprinkler controller's main switch as it will appear in...
     * @yamlKey main_switch
     */
    mainSwitch?: SprinklerMainSwitchProps;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The amount of time the controller should wait to activate...
     * @yamlKey manual_selection_delay
     */
    manualSelectionDelay?: TimePeriod;
    /**
     * *string*: The name of the [number](https://esphome.io/components/number/) component that should be presented to the f...
     * @yamlKey multiplier_number
     */
    multiplierNumber?: SprinklerMultiplierNumberProps;
    name?: string;
    /**
     * boolean: Set to `true` to cause [`sprinkler.next_valve` action](https://esphome.io/components/sprinkler#sprinkler-con...
     * @yamlKey next_prev_ignore_disabled
     */
    nextPrevIgnoreDisabled?: boolean;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The delay in seconds from when a distribution valve is op...
     * @yamlKey pump_start_pump_delay
     */
    pumpStartPumpDelay?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The delay in seconds from when a pump is started to when ...
     * @yamlKey pump_start_valve_delay
     */
    pumpStartValveDelay?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The delay in seconds from when a distribution valve is cl...
     * @yamlKey pump_stop_pump_delay
     */
    pumpStopPumpDelay?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The delay in seconds from when a pump is deactivated to w...
     * @yamlKey pump_stop_valve_delay
     */
    pumpStopValveDelay?: TimePeriod;
    /**
     * boolean: If set to `true`, the pump will be switched off during the `valve_open_delay` interval; otherwise, it remain...
     * @yamlKey pump_switch_off_during_valve_open_delay
     */
    pumpSwitchOffDuringValveOpenDelay?: boolean;
    /**
     * *string*: The name for the sprinkler controller's queue enable switch as it will appear in the front end. When this s...
     * @yamlKey queue_enable_switch
     */
    queueEnableSwitch?: SprinklerQueueEnableSwitchProps;
    /** int: The number of times a full cycle should be repeated. Defaults to 0. May not be used with `repeat_number`. */
    repeat?: number;
    /**
     * *string*: The name of the [number](https://esphome.io/components/number/) component that should be presented to the f...
     * @yamlKey repeat_number
     */
    repeatNumber?: SprinklerRepeatNumberProps;
    /**
     * *string*: The name for the sprinkler controller's reverse switch as it will appear in the front end. When this switch...
     * @yamlKey reverse_switch
     */
    reverseSwitch?: SprinklerReverseSwitchProps;
    /**
     * *string*: The name for the sprinkler controller's standby switch as it will appear in the front end. When this switch...
     * @yamlKey standby_switch
     */
    standbySwitch?: SprinklerStandbySwitchProps;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The *minimum* delay in seconds that should be inserted be...
     * @yamlKey valve_open_delay
     */
    valveOpenDelay?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The amount of time in seconds that the current valve and ...
     * @yamlKey valve_overlap
     */
    valveOverlap?: TimePeriod;
    /** *list*: A list of valves the controller should use. Each valve consists of: */
    valves: Array<SprinklerValvesProps>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            sprinkler: SprinklerProps & ComponentProps<__marker_sprinkler_Sprinkler>;
        }
    }
}
