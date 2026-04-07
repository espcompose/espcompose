// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_sprinkler_Sprinkler, __marker_switch__Switch, __marker_web_server_WebServer, __marker_zigbee_ZigbeeComponent } from "../markers";
export interface SprinklerAutoAdvanceSwitchPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
export interface SprinklerAutoAdvanceSwitchPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface SprinklerAutoAdvanceSwitchProps {
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
    availability?: SprinklerAutoAdvanceSwitchPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: SprinklerAutoAdvanceSwitchPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
}
export interface SprinklerMainSwitchPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
export interface SprinklerMainSwitchPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface SprinklerMainSwitchProps {
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
    availability?: SprinklerMainSwitchPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: SprinklerMainSwitchPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
}
export interface SprinklerQueueEnableSwitchPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
export interface SprinklerQueueEnableSwitchPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface SprinklerQueueEnableSwitchProps {
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
    availability?: SprinklerQueueEnableSwitchPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: SprinklerQueueEnableSwitchPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
}
export interface SprinklerReverseSwitchPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
export interface SprinklerReverseSwitchPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface SprinklerReverseSwitchProps {
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
    availability?: SprinklerReverseSwitchPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: SprinklerReverseSwitchPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
}
export interface SprinklerStandbySwitchPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
export interface SprinklerStandbySwitchPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface SprinklerStandbySwitchProps {
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
    availability?: SprinklerStandbySwitchPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: SprinklerStandbySwitchPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
}
export interface SprinklerMultiplierNumberPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
export interface SprinklerMultiplierNumberPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface SprinklerMultiplierNumberProps {
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
    availability?: SprinklerMultiplierNumberPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: SprinklerMultiplierNumberPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler;
    /** @yamlKey on_value_range */
    onValueRange?: TriggerHandler;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: string;
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** @yamlKey device_class */
    deviceClass?: "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "distance" | "duration" | "" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey initial_value */
    initialValue?: number;
    /** @yamlKey max_value */
    maxValue?: number;
    /** @yamlKey min_value */
    minValue?: number;
    /** @yamlKey restore_value */
    restoreValue?: boolean;
    step?: number;
    /** @yamlKey set_action */
    setAction?: TriggerHandler;
}
export interface SprinklerRepeatNumberPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
export interface SprinklerRepeatNumberPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface SprinklerRepeatNumberProps {
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
    availability?: SprinklerRepeatNumberPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: SprinklerRepeatNumberPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler;
    /** @yamlKey on_value_range */
    onValueRange?: TriggerHandler;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: string;
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** @yamlKey device_class */
    deviceClass?: "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "distance" | "duration" | "" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey initial_value */
    initialValue?: number;
    /** @yamlKey max_value */
    maxValue?: number;
    /** @yamlKey min_value */
    minValue?: number;
    /** @yamlKey restore_value */
    restoreValue?: boolean;
    step?: number;
    /** @yamlKey set_action */
    setAction?: TriggerHandler;
}
export interface SprinklerValvesPropsEnableSwitchPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
export interface SprinklerValvesPropsEnableSwitchPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface SprinklerValvesPropsEnableSwitchProps {
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
    availability?: SprinklerValvesPropsEnableSwitchPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: SprinklerValvesPropsEnableSwitchPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
}
export interface SprinklerValvesPropsRunDurationNumberPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
export interface SprinklerValvesPropsRunDurationNumberPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface SprinklerValvesPropsRunDurationNumberProps {
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
    availability?: SprinklerValvesPropsRunDurationNumberPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: SprinklerValvesPropsRunDurationNumberPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler;
    /** @yamlKey on_value_range */
    onValueRange?: TriggerHandler;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: "min" | "s";
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** @yamlKey device_class */
    deviceClass?: "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "distance" | "duration" | "" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey initial_value */
    initialValue?: number;
    /** @yamlKey max_value */
    maxValue?: number;
    /** @yamlKey min_value */
    minValue?: number;
    /** @yamlKey restore_value */
    restoreValue?: boolean;
    step?: number;
    /** @yamlKey set_action */
    setAction?: TriggerHandler;
}
export interface SprinklerValvesPropsValveSwitchPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
export interface SprinklerValvesPropsValveSwitchPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface SprinklerValvesPropsValveSwitchProps {
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
    availability?: SprinklerValvesPropsValveSwitchPropsAvailabilityProps;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey web_server */
    webServer?: SprinklerValvesPropsValveSwitchPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: TriggerHandler;
    /** @yamlKey on_turn_on */
    onTurnOn?: TriggerHandler;
    /** @yamlKey on_turn_off */
    onTurnOff?: TriggerHandler;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
}
export interface SprinklerValvesProps {
    /**
     * *string*: The name for the switch component to be used to enable this valve to be run as a part of a full cycle of th...
     * @yamlKey enable_switch
     */
    enableSwitch?: SprinklerValvesPropsEnableSwitchProps;
    /**
     * [Switch](/components/switch#config-switch): This is the [switch](/components/switch#config-switch) component to be us...
     * @yamlKey pump_switch_id
     */
    pumpSwitchId?: RefProp<__marker_switch__Switch>;
    /**
     * [Time](/guides/configuration-types#time): Required when `run_duration_number` is not provided. The duration in second...
     * @yamlKey run_duration
     */
    runDuration?: TimePeriod;
    /**
     * *string*: The name of the [number](/components/number/) component that should be presented to the front end (Home Ass...
     * @yamlKey run_duration_number
     */
    runDurationNumber?: SprinklerValvesPropsRunDurationNumberProps;
    /**
     * *string*: The name for the switch component to be used to control the valve for this part of the sprinkler system (of...
     * @yamlKey valve_switch
     */
    valveSwitch: SprinklerValvesPropsValveSwitchProps;
    /**
     * [Switch](/components/switch#config-switch): This is the [switch](/components/switch#config-switch) component to be us...
     * @yamlKey valve_switch_id
     */
    valveSwitchId?: RefProp<__marker_switch__Switch>;
}
export interface SprinklerProps extends _CoreComponent {
    name?: string;
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
     * *string*: The name for the sprinkler controller's queue enable switch as it will appear in the front end. When this s...
     * @yamlKey queue_enable_switch
     */
    queueEnableSwitch?: SprinklerQueueEnableSwitchProps;
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
     * boolean: Set to `true` to cause [`sprinkler.next_valve` action](https://esphome.io/components/sprinkler#sprinkler-con...
     * @yamlKey next_prev_ignore_disabled
     */
    nextPrevIgnoreDisabled?: boolean;
    /**
     * [Time](/guides/configuration-types#time): The amount of time the controller should wait to activate a valve after the...
     * @yamlKey manual_selection_delay
     */
    manualSelectionDelay?: TimePeriod;
    /**
     * *string*: The name of the [number](/components/number/) component that should be presented to the front end (Home Ass...
     * @yamlKey multiplier_number
     */
    multiplierNumber?: SprinklerMultiplierNumberProps;
    /** int: The number of times a full cycle should be repeated. Defaults to 0. May not be used with `repeat_number`. */
    repeat?: number;
    /**
     * *string*: The name of the [number](/components/number/) component that should be presented to the front end (Home Ass...
     * @yamlKey repeat_number
     */
    repeatNumber?: SprinklerRepeatNumberProps;
    /**
     * [Time](/guides/configuration-types#time): The delay in seconds from when a distribution valve is opened to when the a...
     * @yamlKey pump_start_pump_delay
     */
    pumpStartPumpDelay?: TimePeriod;
    /**
     * [Time](/guides/configuration-types#time): The delay in seconds from when a distribution valve is closed to when the r...
     * @yamlKey pump_stop_pump_delay
     */
    pumpStopPumpDelay?: TimePeriod;
    /**
     * boolean: If set to `true`, the pump will be switched off during the `valve_open_delay` interval; otherwise, it remain...
     * @yamlKey pump_switch_off_during_valve_open_delay
     */
    pumpSwitchOffDuringValveOpenDelay?: boolean;
    /**
     * [Time](/guides/configuration-types#time): The delay in seconds from when a pump is started to when the associated dis...
     * @yamlKey pump_start_valve_delay
     */
    pumpStartValveDelay?: TimePeriod;
    /**
     * [Time](/guides/configuration-types#time): The delay in seconds from when a pump is deactivated to when the respective...
     * @yamlKey pump_stop_valve_delay
     */
    pumpStopValveDelay?: TimePeriod;
    /**
     * [Time](/guides/configuration-types#time): The amount of time in seconds that the current valve and the next valve sho...
     * @yamlKey valve_overlap
     */
    valveOverlap?: TimePeriod;
    /**
     * [Time](/guides/configuration-types#time): The *minimum* delay in seconds that should be inserted between (distributio...
     * @yamlKey valve_open_delay
     */
    valveOpenDelay?: TimePeriod;
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
