// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { gps_GPS, uart_UARTComponent, web_server_WebServer, zigbee_ZigbeeComponent } from "../markers";
export interface GpsLatitudePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
export interface GpsLatitudePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface GpsLatitudeProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean | EmbedValue<boolean>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean | EmbedValue<boolean>;
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
    retain?: boolean | EmbedValue<boolean>;
    discovery?: boolean | EmbedValue<boolean>;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: GpsLatitudePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: GpsLatitudePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: string | EmbedValue<string>;
    /** @yamlKey accuracy_decimals */
    accuracyDecimals?: number | EmbedValue<number>;
    /** @yamlKey device_class */
    deviceClass?: "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
    /** @yamlKey state_class */
    stateClass?: "" | "measurement" | "total_increasing" | "total" | "measurement_angle";
    /** @yamlKey force_update */
    forceUpdate?: boolean | EmbedValue<boolean>;
    /** @yamlKey expire_after */
    expireAfter?: TimePeriod;
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler;
    /** @yamlKey on_value_range */
    onValueRange?: TriggerHandler;
}
export interface GpsLongitudePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
export interface GpsLongitudePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface GpsLongitudeProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean | EmbedValue<boolean>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean | EmbedValue<boolean>;
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
    retain?: boolean | EmbedValue<boolean>;
    discovery?: boolean | EmbedValue<boolean>;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: GpsLongitudePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: GpsLongitudePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: string | EmbedValue<string>;
    /** @yamlKey accuracy_decimals */
    accuracyDecimals?: number | EmbedValue<number>;
    /** @yamlKey device_class */
    deviceClass?: "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
    /** @yamlKey state_class */
    stateClass?: "" | "measurement" | "total_increasing" | "total" | "measurement_angle";
    /** @yamlKey force_update */
    forceUpdate?: boolean | EmbedValue<boolean>;
    /** @yamlKey expire_after */
    expireAfter?: TimePeriod;
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler;
    /** @yamlKey on_value_range */
    onValueRange?: TriggerHandler;
}
export interface GpsSpeedPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
export interface GpsSpeedPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface GpsSpeedProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean | EmbedValue<boolean>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean | EmbedValue<boolean>;
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
    retain?: boolean | EmbedValue<boolean>;
    discovery?: boolean | EmbedValue<boolean>;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: GpsSpeedPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: GpsSpeedPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: string | EmbedValue<string>;
    /** @yamlKey accuracy_decimals */
    accuracyDecimals?: number | EmbedValue<number>;
    /** @yamlKey device_class */
    deviceClass?: "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
    /** @yamlKey state_class */
    stateClass?: "" | "measurement" | "total_increasing" | "total" | "measurement_angle";
    /** @yamlKey force_update */
    forceUpdate?: boolean | EmbedValue<boolean>;
    /** @yamlKey expire_after */
    expireAfter?: TimePeriod;
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler;
    /** @yamlKey on_value_range */
    onValueRange?: TriggerHandler;
}
export interface GpsCoursePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
export interface GpsCoursePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface GpsCourseProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean | EmbedValue<boolean>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean | EmbedValue<boolean>;
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
    retain?: boolean | EmbedValue<boolean>;
    discovery?: boolean | EmbedValue<boolean>;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: GpsCoursePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: GpsCoursePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: string | EmbedValue<string>;
    /** @yamlKey accuracy_decimals */
    accuracyDecimals?: number | EmbedValue<number>;
    /** @yamlKey device_class */
    deviceClass?: "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
    /** @yamlKey state_class */
    stateClass?: "" | "measurement" | "total_increasing" | "total" | "measurement_angle";
    /** @yamlKey force_update */
    forceUpdate?: boolean | EmbedValue<boolean>;
    /** @yamlKey expire_after */
    expireAfter?: TimePeriod;
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler;
    /** @yamlKey on_value_range */
    onValueRange?: TriggerHandler;
}
export interface GpsAltitudePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
export interface GpsAltitudePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface GpsAltitudeProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean | EmbedValue<boolean>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean | EmbedValue<boolean>;
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
    retain?: boolean | EmbedValue<boolean>;
    discovery?: boolean | EmbedValue<boolean>;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: GpsAltitudePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: GpsAltitudePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: string | EmbedValue<string>;
    /** @yamlKey accuracy_decimals */
    accuracyDecimals?: number | EmbedValue<number>;
    /** @yamlKey device_class */
    deviceClass?: "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
    /** @yamlKey state_class */
    stateClass?: "" | "measurement" | "total_increasing" | "total" | "measurement_angle";
    /** @yamlKey force_update */
    forceUpdate?: boolean | EmbedValue<boolean>;
    /** @yamlKey expire_after */
    expireAfter?: TimePeriod;
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler;
    /** @yamlKey on_value_range */
    onValueRange?: TriggerHandler;
}
export interface GpsSatellitesPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
export interface GpsSatellitesPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface GpsSatellitesProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean | EmbedValue<boolean>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean | EmbedValue<boolean>;
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
    retain?: boolean | EmbedValue<boolean>;
    discovery?: boolean | EmbedValue<boolean>;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: GpsSatellitesPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: GpsSatellitesPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: string | EmbedValue<string>;
    /** @yamlKey accuracy_decimals */
    accuracyDecimals?: number | EmbedValue<number>;
    /** @yamlKey device_class */
    deviceClass?: "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
    /** @yamlKey state_class */
    stateClass?: "" | "measurement" | "total_increasing" | "total" | "measurement_angle";
    /** @yamlKey force_update */
    forceUpdate?: boolean | EmbedValue<boolean>;
    /** @yamlKey expire_after */
    expireAfter?: TimePeriod;
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler;
    /** @yamlKey on_value_range */
    onValueRange?: TriggerHandler;
}
export interface GpsHdopPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
export interface GpsHdopPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface GpsHdopProps {
    /** string: The name for the sensor. */
    name?: string;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean | EmbedValue<boolean>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean | EmbedValue<boolean>;
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
    retain?: boolean | EmbedValue<boolean>;
    discovery?: boolean | EmbedValue<boolean>;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: GpsHdopPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: GpsHdopPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: string | EmbedValue<string>;
    /** @yamlKey accuracy_decimals */
    accuracyDecimals?: number | EmbedValue<number>;
    /** @yamlKey device_class */
    deviceClass?: "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
    /** @yamlKey state_class */
    stateClass?: "" | "measurement" | "total_increasing" | "total" | "measurement_angle";
    /** @yamlKey force_update */
    forceUpdate?: boolean | EmbedValue<boolean>;
    /** @yamlKey expire_after */
    expireAfter?: TimePeriod;
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler;
    /** @yamlKey on_value_range */
    onValueRange?: TriggerHandler;
}
export interface GpsProps extends _CoreComponent {
    /** Include the Latitude as a sensor */
    latitude?: GpsLatitudeProps;
    /** Include the Longitude as a sensor */
    longitude?: GpsLongitudeProps;
    /** Include the measured speed as a sensor */
    speed?: GpsSpeedProps;
    /** Include the measured course as a sensor */
    course?: GpsCourseProps;
    /** Include the measured altitude as a sensor */
    altitude?: GpsAltitudeProps;
    /** Include the number of tracking satellites being used as a sensor */
    satellites?: GpsSatellitesProps;
    /** Include the measured HDOP (Horizontal Dilution Of Precision) as a sensor */
    hdop?: GpsHdopProps;
    /**
     * [Time](/guides/configuration-types#time): The interval of sensor updates. Defaults to `20s`.
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
    /** @yamlKey uart_id */
    uartId?: RefProp<uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            gps: GpsProps & ComponentProps<gps_GPS>;
        }
    }
}
