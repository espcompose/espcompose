// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_Device, __marker_gps_GPS, __marker_uart_UARTComponent, __marker_web_server_WebServer, __marker_zigbee_ZigbeeComponent } from "../markers";
export interface GpsAltitudePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
export interface GpsAltitudePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface GpsAltitudeProps {
    /**
     * int: Set the number of digits after the decimal point that data consumers should use. While this does not change the ...
     * @yamlKey accuracy_decimals
     */
    accuracyDecimals?: number;
    availability?: GpsAltitudePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/sensor/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
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
    entityCategory?: "" | "diagnostic";
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Manually set the time in which the sensor values should b...
     * @yamlKey expire_after
     */
    expireAfter?: TimePeriod;
    /** Specify filters to use for some basic transforming of values. See [Sensor Filters](https://esphome.io/components/sens... */
    filters?: Array<unknown>;
    /**
     * boolean: If true, this option will force the frontend (usually Home Assistant) to create a state changed event when t...
     * @yamlKey force_update
     */
    forceUpdate?: boolean;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a raw value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler;
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
    retain?: boolean;
    /**
     * string: The state class for the sensor. See [https://developers.home-assistant.io/docs/core/entity/sensor/#available-...
     * @yamlKey state_class
     */
    stateClass?: "" | "measurement" | "measurement_angle" | "total" | "total_increasing";
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement the sensor should advertise its values with. This does not actually do a...
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: GpsAltitudePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
export interface GpsCoursePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
export interface GpsCoursePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface GpsCourseProps {
    /**
     * int: Set the number of digits after the decimal point that data consumers should use. While this does not change the ...
     * @yamlKey accuracy_decimals
     */
    accuracyDecimals?: number;
    availability?: GpsCoursePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/sensor/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
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
    entityCategory?: "" | "diagnostic";
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Manually set the time in which the sensor values should b...
     * @yamlKey expire_after
     */
    expireAfter?: TimePeriod;
    /** Specify filters to use for some basic transforming of values. See [Sensor Filters](https://esphome.io/components/sens... */
    filters?: Array<unknown>;
    /**
     * boolean: If true, this option will force the frontend (usually Home Assistant) to create a state changed event when t...
     * @yamlKey force_update
     */
    forceUpdate?: boolean;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a raw value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler;
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
    retain?: boolean;
    /**
     * string: The state class for the sensor. See [https://developers.home-assistant.io/docs/core/entity/sensor/#available-...
     * @yamlKey state_class
     */
    stateClass?: "" | "measurement" | "measurement_angle" | "total" | "total_increasing";
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement the sensor should advertise its values with. This does not actually do a...
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: GpsCoursePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
export interface GpsHdopPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
export interface GpsHdopPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface GpsHdopProps {
    /**
     * int: Set the number of digits after the decimal point that data consumers should use. While this does not change the ...
     * @yamlKey accuracy_decimals
     */
    accuracyDecimals?: number;
    availability?: GpsHdopPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/sensor/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
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
    entityCategory?: "" | "diagnostic";
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Manually set the time in which the sensor values should b...
     * @yamlKey expire_after
     */
    expireAfter?: TimePeriod;
    /** Specify filters to use for some basic transforming of values. See [Sensor Filters](https://esphome.io/components/sens... */
    filters?: Array<unknown>;
    /**
     * boolean: If true, this option will force the frontend (usually Home Assistant) to create a state changed event when t...
     * @yamlKey force_update
     */
    forceUpdate?: boolean;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a raw value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler;
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
    retain?: boolean;
    /**
     * string: The state class for the sensor. See [https://developers.home-assistant.io/docs/core/entity/sensor/#available-...
     * @yamlKey state_class
     */
    stateClass?: "" | "measurement" | "measurement_angle" | "total" | "total_increasing";
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement the sensor should advertise its values with. This does not actually do a...
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: GpsHdopPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
export interface GpsLatitudePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
export interface GpsLatitudePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface GpsLatitudeProps {
    /**
     * int: Set the number of digits after the decimal point that data consumers should use. While this does not change the ...
     * @yamlKey accuracy_decimals
     */
    accuracyDecimals?: number;
    availability?: GpsLatitudePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/sensor/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
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
    entityCategory?: "" | "diagnostic";
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Manually set the time in which the sensor values should b...
     * @yamlKey expire_after
     */
    expireAfter?: TimePeriod;
    /** Specify filters to use for some basic transforming of values. See [Sensor Filters](https://esphome.io/components/sens... */
    filters?: Array<unknown>;
    /**
     * boolean: If true, this option will force the frontend (usually Home Assistant) to create a state changed event when t...
     * @yamlKey force_update
     */
    forceUpdate?: boolean;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a raw value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler;
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
    retain?: boolean;
    /**
     * string: The state class for the sensor. See [https://developers.home-assistant.io/docs/core/entity/sensor/#available-...
     * @yamlKey state_class
     */
    stateClass?: "" | "measurement" | "measurement_angle" | "total" | "total_increasing";
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement the sensor should advertise its values with. This does not actually do a...
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: GpsLatitudePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
export interface GpsLongitudePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
export interface GpsLongitudePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface GpsLongitudeProps {
    /**
     * int: Set the number of digits after the decimal point that data consumers should use. While this does not change the ...
     * @yamlKey accuracy_decimals
     */
    accuracyDecimals?: number;
    availability?: GpsLongitudePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/sensor/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
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
    entityCategory?: "" | "diagnostic";
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Manually set the time in which the sensor values should b...
     * @yamlKey expire_after
     */
    expireAfter?: TimePeriod;
    /** Specify filters to use for some basic transforming of values. See [Sensor Filters](https://esphome.io/components/sens... */
    filters?: Array<unknown>;
    /**
     * boolean: If true, this option will force the frontend (usually Home Assistant) to create a state changed event when t...
     * @yamlKey force_update
     */
    forceUpdate?: boolean;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a raw value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler;
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
    retain?: boolean;
    /**
     * string: The state class for the sensor. See [https://developers.home-assistant.io/docs/core/entity/sensor/#available-...
     * @yamlKey state_class
     */
    stateClass?: "" | "measurement" | "measurement_angle" | "total" | "total_increasing";
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement the sensor should advertise its values with. This does not actually do a...
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: GpsLongitudePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
export interface GpsSatellitesPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
export interface GpsSatellitesPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface GpsSatellitesProps {
    /**
     * int: Set the number of digits after the decimal point that data consumers should use. While this does not change the ...
     * @yamlKey accuracy_decimals
     */
    accuracyDecimals?: number;
    availability?: GpsSatellitesPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/sensor/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
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
    entityCategory?: "" | "diagnostic";
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Manually set the time in which the sensor values should b...
     * @yamlKey expire_after
     */
    expireAfter?: TimePeriod;
    /** Specify filters to use for some basic transforming of values. See [Sensor Filters](https://esphome.io/components/sens... */
    filters?: Array<unknown>;
    /**
     * boolean: If true, this option will force the frontend (usually Home Assistant) to create a state changed event when t...
     * @yamlKey force_update
     */
    forceUpdate?: boolean;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a raw value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler;
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
    retain?: boolean;
    /**
     * string: The state class for the sensor. See [https://developers.home-assistant.io/docs/core/entity/sensor/#available-...
     * @yamlKey state_class
     */
    stateClass?: "" | "measurement" | "measurement_angle" | "total" | "total_increasing";
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement the sensor should advertise its values with. This does not actually do a...
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: GpsSatellitesPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
export interface GpsSpeedPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
export interface GpsSpeedPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface GpsSpeedProps {
    /**
     * int: Set the number of digits after the decimal point that data consumers should use. While this does not change the ...
     * @yamlKey accuracy_decimals
     */
    accuracyDecimals?: number;
    availability?: GpsSpeedPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/sensor/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
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
    entityCategory?: "" | "diagnostic";
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Manually set the time in which the sensor values should b...
     * @yamlKey expire_after
     */
    expireAfter?: TimePeriod;
    /** Specify filters to use for some basic transforming of values. See [Sensor Filters](https://esphome.io/components/sens... */
    filters?: Array<unknown>;
    /**
     * boolean: If true, this option will force the frontend (usually Home Assistant) to create a state changed event when t...
     * @yamlKey force_update
     */
    forceUpdate?: boolean;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a raw value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler;
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
    retain?: boolean;
    /**
     * string: The state class for the sensor. See [https://developers.home-assistant.io/docs/core/entity/sensor/#available-...
     * @yamlKey state_class
     */
    stateClass?: "" | "measurement" | "measurement_angle" | "total" | "total_increasing";
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement the sensor should advertise its values with. This does not actually do a...
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: GpsSpeedPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
export interface GpsProps extends _CoreComponent {
    /** Include the measured altitude as a sensor */
    altitude?: GpsAltitudeProps;
    /** Include the measured course as a sensor */
    course?: GpsCourseProps;
    /** Include the measured HDOP (Horizontal Dilution Of Precision) as a sensor */
    hdop?: GpsHdopProps;
    /** Include the Latitude as a sensor */
    latitude?: GpsLatitudeProps;
    /** Include the Longitude as a sensor */
    longitude?: GpsLongitudeProps;
    /** Include the number of tracking satellites being used as a sensor */
    satellites?: GpsSatellitesProps;
    /** Include the measured speed as a sensor */
    speed?: GpsSpeedProps;
    /** @yamlKey uart_id */
    uartId?: RefProp<__marker_uart_UARTComponent>;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The interval of sensor updates. Defaults to `20s`.
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            gps: GpsProps & ComponentProps<__marker_gps_GPS>;
        }
    }
}
