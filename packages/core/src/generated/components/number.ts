// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent, _CoreEntityBase, _CoreMqttCommandComponent, _HomeassistantHomeAssistantImportControl, _ModbusControllerModbusitembaseschema } from "../bases";
import type { __marker_Device, __marker_EntityBase, __marker_atm90e32_ATM90E32Component, __marker_bl0940_BL0940, __marker_bl0940_BL0940Number, __marker_copy_CopyNumber, __marker_homeassistant_HomeassistantNumber, __marker_ld2410_LD2410Component, __marker_ld2412_LD2412Component, __marker_ld2420_LD2420Component, __marker_ld2450_LD2450Component, __marker_lvgl_LVGLNumber, __marker_micronova_MicroNova, __marker_modbus_controller_ModbusNumber, __marker_mqtt_MQTTNumberComponent, __marker_number_Number, __marker_opentherm_OpenthermHub, __marker_seeed_mr24hpc1_MR24HPC1Component, __marker_template__TemplateNumber, __marker_tuya_Tuya, __marker_tuya_TuyaNumber, __marker_web_server_WebServer, __marker_zigbee_ZigbeeComponent } from "../markers";
interface NumberWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Atm90e32ReferenceCurrentPropsPhaseAPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Atm90e32ReferenceCurrentPropsPhaseAPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Atm90e32ReferenceCurrentPropsPhaseAProps {
    availability?: Atm90e32ReferenceCurrentPropsPhaseAPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: string;
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    step?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Atm90e32ReferenceCurrentPropsPhaseAPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Atm90e32ReferenceCurrentPropsPhaseBPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Atm90e32ReferenceCurrentPropsPhaseBPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Atm90e32ReferenceCurrentPropsPhaseBProps {
    availability?: Atm90e32ReferenceCurrentPropsPhaseBPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: string;
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    step?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Atm90e32ReferenceCurrentPropsPhaseBPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Atm90e32ReferenceCurrentPropsPhaseCPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Atm90e32ReferenceCurrentPropsPhaseCPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Atm90e32ReferenceCurrentPropsPhaseCProps {
    availability?: Atm90e32ReferenceCurrentPropsPhaseCPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: string;
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    step?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Atm90e32ReferenceCurrentPropsPhaseCPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Atm90e32ReferenceCurrentProps {
    /**
     * Phase A reference current field. All options from [Number](https://esphome.io/components/number#config-number)
     * @yamlKey phase_a
     */
    phaseA?: Atm90e32ReferenceCurrentPropsPhaseAProps;
    /**
     * Phase B reference current field. All options from [Number](https://esphome.io/components/number#config-number)
     * @yamlKey phase_b
     */
    phaseB?: Atm90e32ReferenceCurrentPropsPhaseBProps;
    /**
     * Phase C reference current field. All options from [Number](https://esphome.io/components/number#config-number)
     * @yamlKey phase_c
     */
    phaseC?: Atm90e32ReferenceCurrentPropsPhaseCProps;
}
interface Atm90e32ReferenceVoltagePropsPhaseAPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Atm90e32ReferenceVoltagePropsPhaseAPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Atm90e32ReferenceVoltagePropsPhaseAProps {
    availability?: Atm90e32ReferenceVoltagePropsPhaseAPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: string;
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    step?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Atm90e32ReferenceVoltagePropsPhaseAPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Atm90e32ReferenceVoltagePropsPhaseBPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Atm90e32ReferenceVoltagePropsPhaseBPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Atm90e32ReferenceVoltagePropsPhaseBProps {
    availability?: Atm90e32ReferenceVoltagePropsPhaseBPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: string;
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    step?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Atm90e32ReferenceVoltagePropsPhaseBPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Atm90e32ReferenceVoltagePropsPhaseCPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Atm90e32ReferenceVoltagePropsPhaseCPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Atm90e32ReferenceVoltagePropsPhaseCProps {
    availability?: Atm90e32ReferenceVoltagePropsPhaseCPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: string;
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    step?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Atm90e32ReferenceVoltagePropsPhaseCPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Atm90e32ReferenceVoltageProps {
    /**
     * Phase A reference voltage field. All options from [Number](https://esphome.io/components/number#config-number)
     * @yamlKey phase_a
     */
    phaseA?: Atm90e32ReferenceVoltagePropsPhaseAProps;
    /**
     * Phase B reference voltage field. If not specified, will use the value from `phase_a` (CircuitSetup's 6 channel meter ...
     * @yamlKey phase_b
     */
    phaseB?: Atm90e32ReferenceVoltagePropsPhaseBProps;
    /**
     * Phase C reference voltage field. If not specified, will use the value from `phase_a` (CircuitSetup's 6 channel meter ...
     * @yamlKey phase_c
     */
    phaseC?: Atm90e32ReferenceVoltagePropsPhaseCProps;
}
interface Bl0940CurrentCalibrationPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Bl0940CurrentCalibrationPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Bl0940CurrentCalibrationProps {
    availability?: Bl0940CurrentCalibrationPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    /** @yamlKey restore_value */
    restoreValue?: boolean;
    retain?: boolean;
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
    webServer?: Bl0940CurrentCalibrationPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Bl0940EnergyCalibrationPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Bl0940EnergyCalibrationPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Bl0940EnergyCalibrationProps {
    availability?: Bl0940EnergyCalibrationPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    /** @yamlKey restore_value */
    restoreValue?: boolean;
    retain?: boolean;
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
    webServer?: Bl0940EnergyCalibrationPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Bl0940PowerCalibrationPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Bl0940PowerCalibrationPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Bl0940PowerCalibrationProps {
    availability?: Bl0940PowerCalibrationPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    /** @yamlKey restore_value */
    restoreValue?: boolean;
    retain?: boolean;
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
    webServer?: Bl0940PowerCalibrationPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Bl0940VoltageCalibrationPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Bl0940VoltageCalibrationPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Bl0940VoltageCalibrationProps {
    availability?: Bl0940VoltageCalibrationPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    /** @yamlKey restore_value */
    restoreValue?: boolean;
    retain?: boolean;
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
    webServer?: Bl0940VoltageCalibrationPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410G0PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410G0PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410G0PropsMoveThresholdProps {
    availability?: Ld2410G0PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2410G0PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410G0PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410G0PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410G0PropsStillThresholdProps {
    availability?: Ld2410G0PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2410G0PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410G0Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2410G0PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2410G0PropsStillThresholdProps;
}
interface Ld2410G1PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410G1PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410G1PropsMoveThresholdProps {
    availability?: Ld2410G1PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2410G1PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410G1PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410G1PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410G1PropsStillThresholdProps {
    availability?: Ld2410G1PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2410G1PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410G1Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2410G1PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2410G1PropsStillThresholdProps;
}
interface Ld2410G2PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410G2PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410G2PropsMoveThresholdProps {
    availability?: Ld2410G2PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2410G2PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410G2PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410G2PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410G2PropsStillThresholdProps {
    availability?: Ld2410G2PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2410G2PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410G2Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2410G2PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2410G2PropsStillThresholdProps;
}
interface Ld2410G3PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410G3PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410G3PropsMoveThresholdProps {
    availability?: Ld2410G3PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2410G3PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410G3PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410G3PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410G3PropsStillThresholdProps {
    availability?: Ld2410G3PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2410G3PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410G3Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2410G3PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2410G3PropsStillThresholdProps;
}
interface Ld2410G4PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410G4PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410G4PropsMoveThresholdProps {
    availability?: Ld2410G4PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2410G4PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410G4PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410G4PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410G4PropsStillThresholdProps {
    availability?: Ld2410G4PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2410G4PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410G4Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2410G4PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2410G4PropsStillThresholdProps;
}
interface Ld2410G5PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410G5PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410G5PropsMoveThresholdProps {
    availability?: Ld2410G5PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2410G5PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410G5PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410G5PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410G5PropsStillThresholdProps {
    availability?: Ld2410G5PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2410G5PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410G5Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2410G5PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2410G5PropsStillThresholdProps;
}
interface Ld2410G6PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410G6PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410G6PropsMoveThresholdProps {
    availability?: Ld2410G6PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2410G6PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410G6PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410G6PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410G6PropsStillThresholdProps {
    availability?: Ld2410G6PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2410G6PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410G6Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2410G6PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2410G6PropsStillThresholdProps;
}
interface Ld2410G7PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410G7PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410G7PropsMoveThresholdProps {
    availability?: Ld2410G7PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2410G7PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410G7PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410G7PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410G7PropsStillThresholdProps {
    availability?: Ld2410G7PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2410G7PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410G7Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2410G7PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2410G7PropsStillThresholdProps;
}
interface Ld2410G8PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410G8PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410G8PropsMoveThresholdProps {
    availability?: Ld2410G8PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2410G8PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410G8PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410G8PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410G8PropsStillThresholdProps {
    availability?: Ld2410G8PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2410G8PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410G8Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2410G8PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2410G8PropsStillThresholdProps;
}
interface Ld2412Gate0PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate0PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate0PropsMoveThresholdProps {
    availability?: Ld2412Gate0PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate0PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate0PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate0PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate0PropsStillThresholdProps {
    availability?: Ld2412Gate0PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate0PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate0Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2412Gate0PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2412Gate0PropsStillThresholdProps;
}
interface Ld2412Gate1PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate1PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate1PropsMoveThresholdProps {
    availability?: Ld2412Gate1PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate1PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate1PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate1PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate1PropsStillThresholdProps {
    availability?: Ld2412Gate1PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate1PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate1Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2412Gate1PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2412Gate1PropsStillThresholdProps;
}
interface Ld2412Gate10PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate10PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate10PropsMoveThresholdProps {
    availability?: Ld2412Gate10PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate10PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate10PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate10PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate10PropsStillThresholdProps {
    availability?: Ld2412Gate10PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate10PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate10Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2412Gate10PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2412Gate10PropsStillThresholdProps;
}
interface Ld2412Gate11PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate11PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate11PropsMoveThresholdProps {
    availability?: Ld2412Gate11PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate11PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate11PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate11PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate11PropsStillThresholdProps {
    availability?: Ld2412Gate11PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate11PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate11Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2412Gate11PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2412Gate11PropsStillThresholdProps;
}
interface Ld2412Gate12PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate12PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate12PropsMoveThresholdProps {
    availability?: Ld2412Gate12PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate12PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate12PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate12PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate12PropsStillThresholdProps {
    availability?: Ld2412Gate12PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate12PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate12Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2412Gate12PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2412Gate12PropsStillThresholdProps;
}
interface Ld2412Gate13PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate13PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate13PropsMoveThresholdProps {
    availability?: Ld2412Gate13PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate13PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate13PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate13PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate13PropsStillThresholdProps {
    availability?: Ld2412Gate13PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate13PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate13Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2412Gate13PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2412Gate13PropsStillThresholdProps;
}
interface Ld2412Gate2PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate2PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate2PropsMoveThresholdProps {
    availability?: Ld2412Gate2PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate2PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate2PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate2PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate2PropsStillThresholdProps {
    availability?: Ld2412Gate2PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate2PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate2Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2412Gate2PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2412Gate2PropsStillThresholdProps;
}
interface Ld2412Gate3PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate3PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate3PropsMoveThresholdProps {
    availability?: Ld2412Gate3PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate3PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate3PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate3PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate3PropsStillThresholdProps {
    availability?: Ld2412Gate3PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate3PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate3Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2412Gate3PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2412Gate3PropsStillThresholdProps;
}
interface Ld2412Gate4PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate4PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate4PropsMoveThresholdProps {
    availability?: Ld2412Gate4PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate4PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate4PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate4PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate4PropsStillThresholdProps {
    availability?: Ld2412Gate4PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate4PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate4Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2412Gate4PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2412Gate4PropsStillThresholdProps;
}
interface Ld2412Gate5PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate5PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate5PropsMoveThresholdProps {
    availability?: Ld2412Gate5PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate5PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate5PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate5PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate5PropsStillThresholdProps {
    availability?: Ld2412Gate5PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate5PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate5Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2412Gate5PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2412Gate5PropsStillThresholdProps;
}
interface Ld2412Gate6PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate6PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate6PropsMoveThresholdProps {
    availability?: Ld2412Gate6PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate6PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate6PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate6PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate6PropsStillThresholdProps {
    availability?: Ld2412Gate6PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate6PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate6Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2412Gate6PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2412Gate6PropsStillThresholdProps;
}
interface Ld2412Gate7PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate7PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate7PropsMoveThresholdProps {
    availability?: Ld2412Gate7PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate7PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate7PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate7PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate7PropsStillThresholdProps {
    availability?: Ld2412Gate7PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate7PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate7Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2412Gate7PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2412Gate7PropsStillThresholdProps;
}
interface Ld2412Gate8PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate8PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate8PropsMoveThresholdProps {
    availability?: Ld2412Gate8PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate8PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate8PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate8PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate8PropsStillThresholdProps {
    availability?: Ld2412Gate8PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate8PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate8Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2412Gate8PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2412Gate8PropsStillThresholdProps;
}
interface Ld2412Gate9PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate9PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate9PropsMoveThresholdProps {
    availability?: Ld2412Gate9PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate9PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate9PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412Gate9PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412Gate9PropsStillThresholdProps {
    availability?: Ld2412Gate9PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2412Gate9PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412Gate9Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2412Gate9PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2412Gate9PropsStillThresholdProps;
}
interface Ld2420Gate0PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate0PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate0PropsMoveThresholdProps {
    availability?: Ld2420Gate0PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate0PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate0PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate0PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate0PropsStillThresholdProps {
    availability?: Ld2420Gate0PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate0PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate0Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2420Gate0PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2420Gate0PropsStillThresholdProps;
}
interface Ld2420Gate1PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate1PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate1PropsMoveThresholdProps {
    availability?: Ld2420Gate1PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate1PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate1PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate1PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate1PropsStillThresholdProps {
    availability?: Ld2420Gate1PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate1PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate1Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2420Gate1PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2420Gate1PropsStillThresholdProps;
}
interface Ld2420Gate10PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate10PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate10PropsMoveThresholdProps {
    availability?: Ld2420Gate10PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate10PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate10PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate10PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate10PropsStillThresholdProps {
    availability?: Ld2420Gate10PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate10PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate10Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2420Gate10PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2420Gate10PropsStillThresholdProps;
}
interface Ld2420Gate11PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate11PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate11PropsMoveThresholdProps {
    availability?: Ld2420Gate11PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate11PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate11PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate11PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate11PropsStillThresholdProps {
    availability?: Ld2420Gate11PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate11PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate11Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2420Gate11PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2420Gate11PropsStillThresholdProps;
}
interface Ld2420Gate12PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate12PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate12PropsMoveThresholdProps {
    availability?: Ld2420Gate12PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate12PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate12PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate12PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate12PropsStillThresholdProps {
    availability?: Ld2420Gate12PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate12PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate12Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2420Gate12PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2420Gate12PropsStillThresholdProps;
}
interface Ld2420Gate13PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate13PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate13PropsMoveThresholdProps {
    availability?: Ld2420Gate13PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate13PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate13PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate13PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate13PropsStillThresholdProps {
    availability?: Ld2420Gate13PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate13PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate13Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2420Gate13PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2420Gate13PropsStillThresholdProps;
}
interface Ld2420Gate14PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate14PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate14PropsMoveThresholdProps {
    availability?: Ld2420Gate14PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate14PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate14PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate14PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate14PropsStillThresholdProps {
    availability?: Ld2420Gate14PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate14PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate14Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2420Gate14PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2420Gate14PropsStillThresholdProps;
}
interface Ld2420Gate15PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate15PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate15PropsMoveThresholdProps {
    availability?: Ld2420Gate15PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate15PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate15PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate15PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate15PropsStillThresholdProps {
    availability?: Ld2420Gate15PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate15PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate15Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2420Gate15PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2420Gate15PropsStillThresholdProps;
}
interface Ld2420Gate2PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate2PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate2PropsMoveThresholdProps {
    availability?: Ld2420Gate2PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate2PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate2PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate2PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate2PropsStillThresholdProps {
    availability?: Ld2420Gate2PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate2PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate2Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2420Gate2PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2420Gate2PropsStillThresholdProps;
}
interface Ld2420Gate3PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate3PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate3PropsMoveThresholdProps {
    availability?: Ld2420Gate3PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate3PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate3PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate3PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate3PropsStillThresholdProps {
    availability?: Ld2420Gate3PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate3PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate3Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2420Gate3PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2420Gate3PropsStillThresholdProps;
}
interface Ld2420Gate4PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate4PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate4PropsMoveThresholdProps {
    availability?: Ld2420Gate4PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate4PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate4PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate4PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate4PropsStillThresholdProps {
    availability?: Ld2420Gate4PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate4PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate4Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2420Gate4PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2420Gate4PropsStillThresholdProps;
}
interface Ld2420Gate5PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate5PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate5PropsMoveThresholdProps {
    availability?: Ld2420Gate5PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate5PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate5PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate5PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate5PropsStillThresholdProps {
    availability?: Ld2420Gate5PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate5PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate5Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2420Gate5PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2420Gate5PropsStillThresholdProps;
}
interface Ld2420Gate6PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate6PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate6PropsMoveThresholdProps {
    availability?: Ld2420Gate6PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate6PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate6PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate6PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate6PropsStillThresholdProps {
    availability?: Ld2420Gate6PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate6PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate6Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2420Gate6PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2420Gate6PropsStillThresholdProps;
}
interface Ld2420Gate7PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate7PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate7PropsMoveThresholdProps {
    availability?: Ld2420Gate7PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate7PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate7PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate7PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate7PropsStillThresholdProps {
    availability?: Ld2420Gate7PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate7PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate7Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2420Gate7PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2420Gate7PropsStillThresholdProps;
}
interface Ld2420Gate8PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate8PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate8PropsMoveThresholdProps {
    availability?: Ld2420Gate8PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate8PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate8PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate8PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate8PropsStillThresholdProps {
    availability?: Ld2420Gate8PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate8PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate8Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2420Gate8PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2420Gate8PropsStillThresholdProps;
}
interface Ld2420Gate9PropsMoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate9PropsMoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate9PropsMoveThresholdProps {
    availability?: Ld2420Gate9PropsMoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate9PropsMoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate9PropsStillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420Gate9PropsStillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420Gate9PropsStillThresholdProps {
    availability?: Ld2420Gate9PropsStillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420Gate9PropsStillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420Gate9Props {
    /** @yamlKey move_threshold */
    moveThreshold: Ld2420Gate9PropsMoveThresholdProps;
    /** @yamlKey still_threshold */
    stillThreshold: Ld2420Gate9PropsStillThresholdProps;
}
interface Ld2420GateMoveSensitivityPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420GateMoveSensitivityPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420GateMoveSensitivityProps {
    availability?: Ld2420GateMoveSensitivityPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420GateMoveSensitivityPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420GateSelectPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420GateSelectPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420GateSelectProps {
    availability?: Ld2420GateSelectPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420GateSelectPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420GateStillSensitivityPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420GateStillSensitivityPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420GateStillSensitivityProps {
    availability?: Ld2420GateStillSensitivityPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420GateStillSensitivityPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420MaxGateDistancePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420MaxGateDistancePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420MaxGateDistanceProps {
    availability?: Ld2420MaxGateDistancePropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420MaxGateDistancePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420MinGateDistancePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420MinGateDistancePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420MinGateDistanceProps {
    availability?: Ld2420MinGateDistancePropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420MinGateDistancePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420MoveThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420MoveThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420MoveThresholdProps {
    availability?: Ld2420MoveThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420MoveThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420PresenceTimeoutPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420PresenceTimeoutPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420PresenceTimeoutProps {
    availability?: Ld2420PresenceTimeoutPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420PresenceTimeoutPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420StillThresholdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420StillThresholdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420StillThresholdProps {
    availability?: Ld2420StillThresholdPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2420StillThresholdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2450Zone1PropsX1PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450Zone1PropsX1PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450Zone1PropsX1Props {
    availability?: Ld2450Zone1PropsX1PropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2450Zone1PropsX1PropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2450Zone1PropsX2PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450Zone1PropsX2PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450Zone1PropsX2Props {
    availability?: Ld2450Zone1PropsX2PropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2450Zone1PropsX2PropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2450Zone1PropsY1PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450Zone1PropsY1PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450Zone1PropsY1Props {
    availability?: Ld2450Zone1PropsY1PropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2450Zone1PropsY1PropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2450Zone1PropsY2PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450Zone1PropsY2PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450Zone1PropsY2Props {
    availability?: Ld2450Zone1PropsY2PropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2450Zone1PropsY2PropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2450Zone1Props {
    x1: Ld2450Zone1PropsX1Props;
    x2: Ld2450Zone1PropsX2Props;
    y1: Ld2450Zone1PropsY1Props;
    y2: Ld2450Zone1PropsY2Props;
}
interface Ld2450Zone2PropsX1PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450Zone2PropsX1PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450Zone2PropsX1Props {
    availability?: Ld2450Zone2PropsX1PropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2450Zone2PropsX1PropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2450Zone2PropsX2PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450Zone2PropsX2PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450Zone2PropsX2Props {
    availability?: Ld2450Zone2PropsX2PropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2450Zone2PropsX2PropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2450Zone2PropsY1PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450Zone2PropsY1PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450Zone2PropsY1Props {
    availability?: Ld2450Zone2PropsY1PropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2450Zone2PropsY1PropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2450Zone2PropsY2PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450Zone2PropsY2PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450Zone2PropsY2Props {
    availability?: Ld2450Zone2PropsY2PropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2450Zone2PropsY2PropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2450Zone2Props {
    x1: Ld2450Zone2PropsX1Props;
    x2: Ld2450Zone2PropsX2Props;
    y1: Ld2450Zone2PropsY1Props;
    y2: Ld2450Zone2PropsY2Props;
}
interface Ld2450Zone3PropsX1PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450Zone3PropsX1PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450Zone3PropsX1Props {
    availability?: Ld2450Zone3PropsX1PropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2450Zone3PropsX1PropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2450Zone3PropsX2PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450Zone3PropsX2PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450Zone3PropsX2Props {
    availability?: Ld2450Zone3PropsX2PropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2450Zone3PropsX2PropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2450Zone3PropsY1PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450Zone3PropsY1PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450Zone3PropsY1Props {
    availability?: Ld2450Zone3PropsY1PropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2450Zone3PropsY1PropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2450Zone3PropsY2PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450Zone3PropsY2PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450Zone3PropsY2Props {
    availability?: Ld2450Zone3PropsY2PropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: Ld2450Zone3PropsY2PropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2450Zone3Props {
    x1: Ld2450Zone3PropsX1Props;
    x2: Ld2450Zone3PropsX2Props;
    y1: Ld2450Zone3PropsY1Props;
    y2: Ld2450Zone3PropsY2Props;
}
interface MicronovaPowerLevelPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface MicronovaPowerLevelPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface MicronovaPowerLevelProps {
    availability?: MicronovaPowerLevelPropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey memory_address */
    memoryAddress?: unknown;
    /** @yamlKey memory_location */
    memoryLocation?: unknown;
    /** @yamlKey micronova_id */
    micronovaId?: RefProp<__marker_micronova_MicroNova>;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /** @yamlKey web_server */
    webServer?: MicronovaPowerLevelPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface MicronovaThermostatTemperaturePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface MicronovaThermostatTemperaturePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface MicronovaThermostatTemperatureProps {
    availability?: MicronovaThermostatTemperaturePropsAvailabilityProps;
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
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey memory_address */
    memoryAddress?: unknown;
    /** @yamlKey memory_location */
    memoryLocation?: unknown;
    /** @yamlKey micronova_id */
    micronovaId?: RefProp<__marker_micronova_MicroNova>;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    step?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /** @yamlKey web_server */
    webServer?: MicronovaThermostatTemperaturePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermCoolingControlPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermCoolingControlPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermCoolingControlProps {
    availability?: OpenthermCoolingControlPropsAvailabilityProps;
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
    initialValue?: unknown;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    /** @yamlKey restore_value */
    restoreValue?: boolean;
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    step?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: OpenthermCoolingControlPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermMaxRelModLevelPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermMaxRelModLevelPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermMaxRelModLevelProps {
    availability?: OpenthermMaxRelModLevelPropsAvailabilityProps;
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
    initialValue?: unknown;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    /** @yamlKey restore_value */
    restoreValue?: boolean;
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    step?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: OpenthermMaxRelModLevelPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermMaxTSetPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermMaxTSetPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermMaxTSetProps {
    /** @yamlKey auto_max_value */
    autoMaxValue?: boolean;
    /** @yamlKey auto_min_value */
    autoMinValue?: boolean;
    availability?: OpenthermMaxTSetPropsAvailabilityProps;
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
    initialValue?: unknown;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    /** @yamlKey restore_value */
    restoreValue?: boolean;
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    step?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: OpenthermMaxTSetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermOtcHcRatioPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermOtcHcRatioPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermOtcHcRatioProps {
    /** @yamlKey auto_max_value */
    autoMaxValue?: boolean;
    /** @yamlKey auto_min_value */
    autoMinValue?: boolean;
    availability?: OpenthermOtcHcRatioPropsAvailabilityProps;
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
    initialValue?: unknown;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    /** @yamlKey restore_value */
    restoreValue?: boolean;
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    step?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: OpenthermOtcHcRatioPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermTDhwSetPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermTDhwSetPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermTDhwSetProps {
    /** @yamlKey auto_max_value */
    autoMaxValue?: boolean;
    /** @yamlKey auto_min_value */
    autoMinValue?: boolean;
    availability?: OpenthermTDhwSetPropsAvailabilityProps;
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
    initialValue?: unknown;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    /** @yamlKey restore_value */
    restoreValue?: boolean;
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    step?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: OpenthermTDhwSetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermTRoomPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermTRoomPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermTRoomProps {
    availability?: OpenthermTRoomPropsAvailabilityProps;
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
    initialValue?: unknown;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    /** @yamlKey restore_value */
    restoreValue?: boolean;
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    step?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: OpenthermTRoomPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermTRoomSetPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermTRoomSetPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermTRoomSetProps {
    availability?: OpenthermTRoomSetPropsAvailabilityProps;
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
    initialValue?: unknown;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    /** @yamlKey restore_value */
    restoreValue?: boolean;
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    step?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: OpenthermTRoomSetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermTRoomSetCh2PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermTRoomSetCh2PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermTRoomSetCh2Props {
    availability?: OpenthermTRoomSetCh2PropsAvailabilityProps;
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
    initialValue?: unknown;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    /** @yamlKey restore_value */
    restoreValue?: boolean;
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    step?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: OpenthermTRoomSetCh2PropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermTSetPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermTSetPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermTSetProps {
    /** @yamlKey auto_max_value */
    autoMaxValue?: boolean;
    availability?: OpenthermTSetPropsAvailabilityProps;
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
    initialValue?: unknown;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    /** @yamlKey restore_value */
    restoreValue?: boolean;
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    step?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: OpenthermTSetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermTSetCh2PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermTSetCh2PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermTSetCh2Props {
    /** @yamlKey auto_max_value */
    autoMaxValue?: boolean;
    availability?: OpenthermTSetCh2PropsAvailabilityProps;
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
    initialValue?: unknown;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** string: The name for the number. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    qos?: unknown;
    /** @yamlKey restore_value */
    restoreValue?: boolean;
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    step?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: OpenthermTSetCh2PropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface TuyaDatapointHiddenProps {
    /** @yamlKey datapoint_type */
    datapointType: "enum" | "int" | "uint";
    /** @yamlKey initial_value */
    initialValue?: unknown;
    /** @yamlKey restore_value */
    restoreValue?: boolean;
}
interface NumberBaseProps extends _CoreEntityBase, _CoreMqttCommandComponent {
    /**
     * string: The device class for the number. See [https://www.home-assistant.io/integrations/number/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "distance" | "duration" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
    /** string: Manually specify the ID for code generation. At least one of id and name must be specified. */
    id?: string;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: NumberWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Atm90e32Props {
    /** [ID](https://esphome.io/guides/configuration-types#id): The ID of the `atm90e32` sensor defined above. Required if us... */
    id?: RefProp<__marker_atm90e32_ATM90E32Component>;
    /**
     * Fine grained gain calibration for a known current of the circuit a CT is measuring. It is used to calculate the value...
     * @yamlKey reference_current
     */
    referenceCurrent?: Atm90e32ReferenceCurrentProps;
    /**
     * Fine grained gain calibration of a known voltage that a voltage transformer is connected to. It is used to calculate ...
     * @yamlKey reference_voltage
     */
    referenceVoltage?: Atm90e32ReferenceVoltageProps;
}
interface Bl0940Props {
    /** @yamlKey bl0940_id */
    bl0940Id?: RefProp<__marker_bl0940_BL0940>;
    /**
     * Enables current calibration configuration.
     * @yamlKey current_calibration
     */
    currentCalibration?: Bl0940CurrentCalibrationProps;
    /**
     * Enables energy calibration configuration.
     * @yamlKey energy_calibration
     */
    energyCalibration?: Bl0940EnergyCalibrationProps;
    /**
     * Enables power calibration configuration.
     * @yamlKey power_calibration
     */
    powerCalibration?: Bl0940PowerCalibrationProps;
    /**
     * Enables voltage calibration configuration.
     * @yamlKey voltage_calibration
     */
    voltageCalibration?: Bl0940VoltageCalibrationProps;
}
interface CopyProps extends _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The number that should be mirrored.
     * @yamlKey source_id
     */
    sourceId: RefProp<__marker_number_Number>;
}
interface HomeassistantProps extends _HomeassistantHomeAssistantImportControl, _CoreComponent {
}
interface Ld2410Props {
    g0?: Ld2410G0Props;
    g1?: Ld2410G1Props;
    g2?: Ld2410G2Props;
    g3?: Ld2410G3Props;
    g4?: Ld2410G4Props;
    g5?: Ld2410G5Props;
    g6?: Ld2410G6Props;
    g7?: Ld2410G7Props;
    g8?: Ld2410G8Props;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID for the [Ld2410](https://esphome.io/c...
     * @yamlKey ld2410_id
     */
    ld2410Id?: RefProp<__marker_ld2410_LD2410Component>;
    /**
     * int: Sets the light threshold for the [light function](https://esphome.io/components/sensor/ld2410#ld2410-light-funct...
     * @yamlKey light_threshold
     */
    lightThreshold?: number;
    /**
     * int: Maximum distance gate for movement detection. Value between `2` and `8` inclusive. Defaults to `8`. All options ...
     * @yamlKey max_move_distance_gate
     */
    maxMoveDistanceGate?: number;
    /**
     * int: Maximum distance gate for still detection. Value between `2` and `8` inclusive. Defaults to `8`. All options fro...
     * @yamlKey max_still_distance_gate
     */
    maxStillDistanceGate?: number;
    /** int: Time in seconds during which presence state will stay present after leaving. Defaults to `5s` All options from [... */
    timeout?: number;
}
interface Ld2412Props {
    /** @yamlKey gate_0 */
    gate0?: Ld2412Gate0Props;
    /** @yamlKey gate_1 */
    gate1?: Ld2412Gate1Props;
    /** @yamlKey gate_10 */
    gate10?: Ld2412Gate10Props;
    /** @yamlKey gate_11 */
    gate11?: Ld2412Gate11Props;
    /** @yamlKey gate_12 */
    gate12?: Ld2412Gate12Props;
    /** @yamlKey gate_13 */
    gate13?: Ld2412Gate13Props;
    /** @yamlKey gate_2 */
    gate2?: Ld2412Gate2Props;
    /** @yamlKey gate_3 */
    gate3?: Ld2412Gate3Props;
    /** @yamlKey gate_4 */
    gate4?: Ld2412Gate4Props;
    /** @yamlKey gate_5 */
    gate5?: Ld2412Gate5Props;
    /** @yamlKey gate_6 */
    gate6?: Ld2412Gate6Props;
    /** @yamlKey gate_7 */
    gate7?: Ld2412Gate7Props;
    /** @yamlKey gate_8 */
    gate8?: Ld2412Gate8Props;
    /** @yamlKey gate_9 */
    gate9?: Ld2412Gate9Props;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID for the component. Required when usin...
     * @yamlKey ld2412_id
     */
    ld2412Id?: RefProp<__marker_ld2412_LD2412Component>;
    /**
     * int: Threshold for the light to activate the OUT pin of the sensor. All options from [Number](https://esphome.io/comp...
     * @yamlKey light_threshold
     */
    lightThreshold?: number;
    /**
     * int: Maximum distance gate for still detection. Value between `2` and `13` inclusive. Defaults to `13`. All options f...
     * @yamlKey max_distance_gate
     */
    maxDistanceGate?: number;
    /**
     * int: Maximum distance gate for movement detection. Value between `1` and `12` inclusive. Defaults to `1`. All options...
     * @yamlKey min_distance_gate
     */
    minDistanceGate?: number;
    /** int: Time in seconds for which the presence state will remain after presence is no longer detected. Defaults to `5s`.... */
    timeout?: number;
}
interface Ld2420Props {
    /** @yamlKey gate_0 */
    gate0?: Ld2420Gate0Props;
    /** @yamlKey gate_1 */
    gate1?: Ld2420Gate1Props;
    /** @yamlKey gate_10 */
    gate10?: Ld2420Gate10Props;
    /** @yamlKey gate_11 */
    gate11?: Ld2420Gate11Props;
    /** @yamlKey gate_12 */
    gate12?: Ld2420Gate12Props;
    /** @yamlKey gate_13 */
    gate13?: Ld2420Gate13Props;
    /** @yamlKey gate_14 */
    gate14?: Ld2420Gate14Props;
    /** @yamlKey gate_15 */
    gate15?: Ld2420Gate15Props;
    /** @yamlKey gate_2 */
    gate2?: Ld2420Gate2Props;
    /** @yamlKey gate_3 */
    gate3?: Ld2420Gate3Props;
    /** @yamlKey gate_4 */
    gate4?: Ld2420Gate4Props;
    /** @yamlKey gate_5 */
    gate5?: Ld2420Gate5Props;
    /** @yamlKey gate_6 */
    gate6?: Ld2420Gate6Props;
    /** @yamlKey gate_7 */
    gate7?: Ld2420Gate7Props;
    /** @yamlKey gate_8 */
    gate8?: Ld2420Gate8Props;
    /** @yamlKey gate_9 */
    gate9?: Ld2420Gate9Props;
    /**
     * Gate move threshold calibration sensitivity factor. Defaults to 0.5 with a range of 0-1, 0 = high and 1 = low. May co...
     * @yamlKey gate_move_sensitivity
     */
    gateMoveSensitivity?: Ld2420GateMoveSensitivityProps;
    /**
     * Selection of gate value to edit (gate # from 0 to 15). Gate thresholds are edited by selecting the gate number and th...
     * @yamlKey gate_select
     */
    gateSelect?: Ld2420GateSelectProps;
    /**
     * Gate still threshold calibration sensitivity factor. Defaults to 0.5 with a range of 0-1, 0 = high and 1 = low. May c...
     * @yamlKey gate_still_sensitivity
     */
    gateStillSensitivity?: Ld2420GateStillSensitivityProps;
    /** @yamlKey ld2420_id */
    ld2420Id?: RefProp<__marker_ld2420_LD2420Component>;
    /**
     * Maximum gate for movement detection. Value from 1 to 15. Each gate detects movement and still energy at 70 cm increme...
     * @yamlKey max_gate_distance
     */
    maxGateDistance?: Ld2420MaxGateDistanceProps;
    /**
     * Minimum distance for move or still energy detection. Value between 0 and `max_gate_distance` - 1. Each increment equa...
     * @yamlKey min_gate_distance
     */
    minGateDistance?: Ld2420MinGateDistanceProps;
    /** @yamlKey move_threshold */
    moveThreshold?: Ld2420MoveThresholdProps;
    /**
     * The time in seconds during which the occupied state (presence) will persist after presence is no longer detected. Any...
     * @yamlKey presence_timeout
     */
    presenceTimeout?: Ld2420PresenceTimeoutProps;
    /** @yamlKey still_threshold */
    stillThreshold?: Ld2420StillThresholdProps;
}
interface Ld2450Props {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID for the [Ld2450](https://esphome.io/c...
     * @yamlKey ld2450_id
     */
    ld2450Id?: RefProp<__marker_ld2450_LD2450Component>;
    /**
     * int: The duration, in seconds, for which the [presence states](https://esphome.io/components/sensor/ld2450#ld2450-bin...
     * @yamlKey presence_timeout
     */
    presenceTimeout: number;
    /** @yamlKey zone_1 */
    zone1?: Ld2450Zone1Props;
    /** @yamlKey zone_2 */
    zone2?: Ld2450Zone2Props;
    /** @yamlKey zone_3 */
    zone3?: Ld2450Zone3Props;
}
interface LvglProps {
    animated?: unknown;
    /** @yamlKey restore_value */
    restoreValue?: boolean;
    /** @yamlKey update_on_release */
    updateOnRelease?: boolean;
    widget: RefProp<unknown>;
}
interface MicronovaProps {
    /** @yamlKey micronova_id */
    micronovaId?: RefProp<__marker_micronova_MicroNova>;
    /** @yamlKey power_level */
    powerLevel?: MicronovaPowerLevelProps;
    /** @yamlKey thermostat_temperature */
    thermostatTemperature?: MicronovaThermostatTemperatureProps;
}
interface ModbusControllerProps extends _ModbusControllerModbusitembaseschema {
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    multiply?: unknown;
    /** @yamlKey register_type */
    registerType?: "coil" | "custom" | "holding";
    step?: number;
    /** @yamlKey use_write_multiple */
    useWriteMultiple?: boolean;
    /** @yamlKey value_type */
    valueType?: "FP32" | "FP32_R" | "RAW" | "S_DWORD" | "S_DWORD_R" | "S_QWORD" | "S_QWORD_R" | "S_WORD" | "U_DWORD" | "U_DWORD_R" | "U_QWORD" | "U_QWORD_R" | "U_WORD";
    /** @yamlKey write_lambda */
    writeLambda?: unknown;
}
interface OpenthermProps extends _CoreComponent {
    /** @yamlKey cooling_control */
    coolingControl?: OpenthermCoolingControlProps;
    /** @yamlKey max_rel_mod_level */
    maxRelModLevel?: OpenthermMaxRelModLevelProps;
    /** @yamlKey max_t_set */
    maxTSet?: OpenthermMaxTSetProps;
    /** @yamlKey opentherm_id */
    openthermId?: RefProp<__marker_opentherm_OpenthermHub>;
    /** @yamlKey otc_hc_ratio */
    otcHcRatio?: OpenthermOtcHcRatioProps;
    /** @yamlKey t_dhw_set */
    tDhwSet?: OpenthermTDhwSetProps;
    /** @yamlKey t_room */
    tRoom?: OpenthermTRoomProps;
    /** @yamlKey t_room_set */
    tRoomSet?: OpenthermTRoomSetProps;
    /** @yamlKey t_room_set_ch2 */
    tRoomSetCh2?: OpenthermTRoomSetCh2Props;
    /** @yamlKey t_set */
    tSet?: OpenthermTSetProps;
    /** @yamlKey t_set_ch2 */
    tSetCh2?: OpenthermTSetCh2Props;
}
interface SeeedMr24hpc1Props {
    /**
     * int: Settings and go to the Custom Mode option. Some of the function modules can only be set up in Custom Mode. There...
     * @yamlKey custom_mode
     */
    customMode?: number;
    /**
     * int: Valid only in [custom mode settings](https://esphome.io/components/seeed_mr24hpc1#seeed_mr24hpc1-custom_mode). S...
     * @yamlKey custom_unman_time
     */
    customUnmanTime?: number;
    /**
     * int: Valid only in [custom mode settings](https://esphome.io/components/seeed_mr24hpc1#seeed_mr24hpc1-custom_mode). T...
     * @yamlKey existence_threshold
     */
    existenceThreshold?: number;
    /**
     * int: Valid only in [custom mode settings](https://esphome.io/components/seeed_mr24hpc1#seeed_mr24hpc1-custom_mode). T...
     * @yamlKey motion_threshold
     */
    motionThreshold?: number;
    /**
     * int: Valid only in [custom mode settings](https://esphome.io/components/seeed_mr24hpc1#seeed_mr24hpc1-custom_mode). S...
     * @yamlKey motion_to_rest
     */
    motionToRest?: number;
    /**
     * int: Valid only in [custom mode settings](https://esphome.io/components/seeed_mr24hpc1#seeed_mr24hpc1-custom_mode). U...
     * @yamlKey motion_trigger
     */
    motionTrigger?: number;
    /** @yamlKey mr24hpc1_id */
    mr24hpc1Id?: RefProp<__marker_seeed_mr24hpc1_MR24HPC1Component>;
    /** int: Valid only in [standard mode](https://esphome.io/components/seeed_mr24hpc1#seeed_mr24hpc1-standard_mode). Used t... */
    sensitivity?: number;
}
interface TemplateProps extends _CoreComponent {
    /**
     * float: The value to set the state to on setup if not restored with `restore_value`. Cannot be used with `lambda`. Def...
     * @yamlKey initial_value
     */
    initialValue?: number;
    /** [lambda](https://esphome.io/automations/templates#config-lambda): Lambda to be evaluated every update interval to get... */
    lambda?: unknown;
    /**
     * float: The maximum value this number can be.
     * @yamlKey max_value
     */
    maxValue: number;
    /**
     * float: The minimum value this number can be.
     * @yamlKey min_value
     */
    minValue: number;
    /** boolean: Whether to operate in optimistic mode - when in this mode, any command sent to the template number will imme... */
    optimistic?: boolean;
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
    /** float: The granularity with which the number can be set. */
    step: number;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The interval on which to update the number by executing t...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
interface TuyaProps extends _CoreComponent {
    /** @yamlKey datapoint_hidden */
    datapointHidden?: TuyaDatapointHiddenProps;
    /** @yamlKey max_value */
    maxValue: unknown;
    /** @yamlKey min_value */
    minValue: unknown;
    multiply?: unknown;
    /** @yamlKey number_datapoint */
    numberDatapoint: number;
    step: number;
    /** @yamlKey tuya_id */
    tuyaId?: RefProp<__marker_tuya_Tuya>;
}
export type NumberProps = (NumberBaseProps & {
    platform: "atm90e32";
} & Atm90e32Props & ComponentProps<__marker_mqtt_MQTTNumberComponent>) | (NumberBaseProps & {
    platform: "bl0940";
} & Bl0940Props & ComponentProps<__marker_bl0940_BL0940Number>) | (NumberBaseProps & {
    platform: "copy";
} & CopyProps & ComponentProps<__marker_copy_CopyNumber>) | (NumberBaseProps & {
    platform: "homeassistant";
} & HomeassistantProps & ComponentProps<__marker_homeassistant_HomeassistantNumber>) | (NumberBaseProps & {
    platform: "ld2410";
} & Ld2410Props & ComponentProps<__marker_EntityBase>) | (NumberBaseProps & {
    platform: "ld2412";
} & Ld2412Props & ComponentProps<__marker_EntityBase>) | (NumberBaseProps & {
    platform: "ld2420";
} & Ld2420Props & ComponentProps<__marker_mqtt_MQTTNumberComponent>) | (NumberBaseProps & {
    platform: "ld2450";
} & Ld2450Props & ComponentProps<__marker_EntityBase>) | (NumberBaseProps & {
    platform: "lvgl";
} & LvglProps & ComponentProps<__marker_lvgl_LVGLNumber>) | (NumberBaseProps & {
    platform: "micronova";
} & MicronovaProps & ComponentProps<__marker_mqtt_MQTTNumberComponent>) | (NumberBaseProps & {
    platform: "modbus_controller";
} & ModbusControllerProps & ComponentProps<__marker_modbus_controller_ModbusNumber>) | (NumberBaseProps & {
    platform: "opentherm";
} & OpenthermProps & ComponentProps<__marker_mqtt_MQTTNumberComponent>) | (NumberBaseProps & {
    platform: "seeed_mr24hpc1";
} & SeeedMr24hpc1Props & ComponentProps<__marker_mqtt_MQTTNumberComponent>) | (NumberBaseProps & {
    platform: "template";
} & TemplateProps & ComponentProps<__marker_template__TemplateNumber>) | (NumberBaseProps & {
    platform: "tuya";
} & TuyaProps & ComponentProps<__marker_tuya_TuyaNumber>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            number: NumberProps;
        }
    }
}
