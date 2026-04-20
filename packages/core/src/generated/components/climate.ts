// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _BedjetClient, _CoreComponent, _CoreEntityBase, _CoreMqttCommandComponent, _UponorSmatrixDevice } from "../bases";
import type { __marker_Device, __marker_anova_Anova, __marker_ballu_BalluClimate, __marker_bang_bang_BangBangClimate, __marker_bedjet_BedJetClimate, __marker_ble_client_BLEClient, __marker_climate_ir_lg_LgIrClimate, __marker_coolix_CoolixClimate, __marker_daikin_DaikinClimate, __marker_daikin_arc_DaikinArcClimate, __marker_daikin_brc_DaikinBrcClimate, __marker_delonghi_DelonghiClimate, __marker_emmeti_EmmetiClimate, __marker_fujitsu_general_FujitsuGeneralClimate, __marker_gree_GreeClimate, __marker_haier_HonClimate, __marker_haier_Smartair2Climate, __marker_heatpumpir_HeatpumpIRClimate, __marker_hitachi_ac344_HitachiClimate, __marker_hitachi_ac424_HitachiClimate, __marker_midea_ac_AirConditioner, __marker_midea_ir_MideaIR, __marker_mitsubishi_MitsubishiClimate, __marker_mitsubishi_cn105_MitsubishiCN105Climate, __marker_noblex_NoblexClimate, __marker_output_FloatOutput, __marker_pid_PIDClimate, __marker_remote_base_RemoteReceiverBase, __marker_remote_base_RemoteTransmitterBase, __marker_remote_transmitter_RemoteTransmitterComponent, __marker_sensor_Sensor, __marker_tcl112_Tcl112Climate, __marker_thermostat_ThermostatClimate, __marker_toshiba_ToshibaClimate, __marker_tuya_Tuya, __marker_tuya_TuyaClimate, __marker_uart_UARTComponent, __marker_uponor_smatrix_UponorSmatrixClimate, __marker_web_server_WebServer, __marker_whirlpool_WhirlpoolClimate, __marker_whynter_Whynter, __marker_yashima_YashimaClimate, __marker_zhlt01_ZHLT01Climate, __marker_zigbee_ZigbeeComponent } from "../markers";
interface ClimateVisualProps {
    /**
     * percentage: The maximum humidity the climate device can reach. Used to set the range of the frontend gauge.
     * @yamlKey max_humidity
     */
    maxHumidity?: number;
    /**
     * float: The maximum temperature the climate device can reach. Used to set the range of the frontend gauge.
     * @yamlKey max_temperature
     */
    maxTemperature?: number;
    /**
     * percentage: The minimum humidity the climate device can reach. Used to set the range of the frontend gauge.
     * @yamlKey min_humidity
     */
    minHumidity?: number;
    /**
     * float: The minimum temperature the climate device can reach. Used to set the range of the frontend gauge.
     * @yamlKey min_temperature
     */
    minTemperature?: number;
    /**
     * float: The granularity with which the target temperature can be controlled. Can be a single number, or split as below:
     * @yamlKey temperature_step
     */
    temperatureStep?: number;
}
interface ClimateWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface BangBangAwayConfigProps {
    /**
     * float: The default high target temperature for the control algorithm during away mode.
     * @yamlKey default_target_temperature_high
     */
    defaultTargetTemperatureHigh: number;
    /**
     * float: The default low target temperature for the control algorithm during away mode.
     * @yamlKey default_target_temperature_low
     */
    defaultTargetTemperatureLow: number;
}
interface MideaHumiditySetpointPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface MideaHumiditySetpointPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface MideaHumiditySetpointProps {
    /**
     * int: Set the number of digits after the decimal point that data consumers should use. While this does not change the ...
     * @yamlKey accuracy_decimals
     */
    accuracyDecimals?: number;
    availability?: MideaHumiditySetpointPropsAvailabilityProps;
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
    webServer?: MideaHumiditySetpointPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface MideaOutdoorTemperaturePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface MideaOutdoorTemperaturePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface MideaOutdoorTemperatureProps {
    /**
     * int: Set the number of digits after the decimal point that data consumers should use. While this does not change the ...
     * @yamlKey accuracy_decimals
     */
    accuracyDecimals?: number;
    availability?: MideaOutdoorTemperaturePropsAvailabilityProps;
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
    webServer?: MideaOutdoorTemperaturePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface MideaPowerUsagePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface MideaPowerUsagePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface MideaPowerUsageProps {
    /**
     * int: Set the number of digits after the decimal point that data consumers should use. While this does not change the ...
     * @yamlKey accuracy_decimals
     */
    accuracyDecimals?: number;
    availability?: MideaPowerUsagePropsAvailabilityProps;
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
    webServer?: MideaPowerUsagePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PidControlParametersProps {
    /**
     * int: average the derivative term over this many samples. Many controllers don't use the derivative term because it is...
     * @yamlKey derivative_averaging_samples
     */
    derivativeAveragingSamples?: number;
    /** float: The factor for the derivative term of the PID controller. Defaults to `0`. */
    kd?: number;
    /** float: The factor for the integral term of the PID controller. Defaults to `0`. */
    ki?: number;
    /** float: The factor for the proportional term of the PID controller. */
    kp: number;
    /**
     * float: The maximum value of the integral term multiplied by `ki` to prevent windup. Defaults to `1`.
     * @yamlKey max_integral
     */
    maxIntegral?: number;
    /**
     * float: The minimum value of the integral term multiplied by `ki` to prevent windup. Defaults to `-1`.
     * @yamlKey min_integral
     */
    minIntegral?: number;
    /**
     * int: average the output over this many samples. PID controllers can be quite sensitive to small changes on the input ...
     * @yamlKey output_averaging_samples
     */
    outputAveragingSamples?: number;
    /**
     * float: Set the initial output, by priming the integral term. This is useful for when your system is rebooted and you ...
     * @yamlKey starting_integral_term
     */
    startingIntegralTerm?: number;
}
interface PidDeadbandParametersProps {
    /**
     * int: Typically when inside the deadband the PID Controller has reached a state of equilibrium, so it advantageous to ...
     * @yamlKey deadband_output_averaging_samples
     */
    deadbandOutputAveragingSamples?: number;
    /**
     * float: Set the `kd` gain when inside the deadband. Recommended this is set to `0`. Defaults to `0`.
     * @yamlKey kd_multiplier
     */
    kdMultiplier?: number;
    /**
     * float: Set the `ki` gain when inside the deadband. Defaults to `0`.
     * @yamlKey ki_multiplier
     */
    kiMultiplier?: number;
    /**
     * float: Set the `kp` gain when inside the deadband. Defaults to `0`.
     * @yamlKey kp_multiplier
     */
    kpMultiplier?: number;
    /** @yamlKey threshold_high */
    thresholdHigh: unknown;
    /** @yamlKey threshold_low */
    thresholdLow: unknown;
}
interface ThermostatAwayConfigProps {
    /** @yamlKey default_target_temperature_high */
    defaultTargetTemperatureHigh?: unknown;
    /** @yamlKey default_target_temperature_low */
    defaultTargetTemperatureLow?: unknown;
}
interface ThermostatPresetProps {
    /**
     * float: The default high target temperature when switching to this preset.
     * @yamlKey default_target_temperature_high
     */
    defaultTargetTemperatureHigh?: number;
    /**
     * float: The default low target temperature when switching to this preset
     * @yamlKey default_target_temperature_low
     */
    defaultTargetTemperatureLow?: number;
    /**
     * climate fan mode: The fan mode the thermostat should switch to when this preset is activated. If not specified, the t...
     * @yamlKey fan_mode
     */
    fanMode?: "AUTO" | "DIFFUSE" | "FOCUS" | "HIGH" | "LOW" | "MEDIUM" | "MIDDLE" | "OFF" | "ON" | "QUIET";
    /** climate mode: The mode the thermostat should switch to when this preset is activated. If not specified, the thermosta... */
    mode?: "AUTO" | "COOL" | "DRY" | "FAN_ONLY" | "HEAT" | "HEAT_COOL" | "OFF";
    /** string: Name of the preset. If this is one of the *standard* presets (`eco`, `away`, `boost`, `comfort`, `home`, `sle... */
    name: string;
    /**
     * climate swing mode: The fan swing mode the thermostat should switch to when this preset is activated. If not specifie...
     * @yamlKey swing_mode
     */
    swingMode?: "BOTH" | "HORIZONTAL" | "OFF" | "VERTICAL";
}
interface TuyaActiveStateProps {
    /** @yamlKey cooling_value */
    coolingValue?: number;
    datapoint: number;
    /** @yamlKey drying_value */
    dryingValue?: number;
    /** @yamlKey fanonly_value */
    fanonlyValue?: number;
    /** @yamlKey heating_value */
    heatingValue?: number;
}
interface TuyaFanModeProps {
    /** @yamlKey auto_value */
    autoValue?: number;
    datapoint: number;
    /** @yamlKey high_value */
    highValue?: number;
    /** @yamlKey low_value */
    lowValue?: number;
    /** @yamlKey medium_value */
    mediumValue?: number;
    /** @yamlKey middle_value */
    middleValue?: number;
}
interface TuyaPresetPropsEcoProps {
    datapoint: number;
    temperature?: unknown;
}
interface TuyaPresetPropsSleepProps {
    datapoint: number;
}
interface TuyaPresetProps {
    eco?: TuyaPresetPropsEcoProps;
    sleep?: TuyaPresetPropsSleepProps;
}
interface TuyaSwingModeProps {
    /** @yamlKey horizontal_datapoint */
    horizontalDatapoint?: number;
    /** @yamlKey vertical_datapoint */
    verticalDatapoint?: number;
}
interface ClimateBaseProps extends _CoreEntityBase, _CoreMqttCommandComponent {
    /**
     * string: The topic to publish climate device action changes to.
     * @yamlKey action_state_topic
     */
    actionStateTopic?: string;
    /** @yamlKey away_command_topic */
    awayCommandTopic?: unknown;
    /** @yamlKey away_state_topic */
    awayStateTopic?: unknown;
    /**
     * string: The topic to publish current humidity changes to.
     * @yamlKey current_humidity_state_topic
     */
    currentHumidityStateTopic?: string;
    /**
     * string: The topic to publish current temperature changes to.
     * @yamlKey current_temperature_state_topic
     */
    currentTemperatureStateTopic?: string;
    /**
     * string: The topic to receive fan mode commands on.
     * @yamlKey fan_mode_command_topic
     */
    fanModeCommandTopic?: string;
    /**
     * string: The topic to publish fan mode changes to.
     * @yamlKey fan_mode_state_topic
     */
    fanModeStateTopic?: string;
    /** string: Manually specify the ID for code generation. At least one of id and name must be specified. */
    id?: string;
    /**
     * string: The topic to receive climate device mode commands on.
     * @yamlKey mode_command_topic
     */
    modeCommandTopic?: string;
    /**
     * string: The topic to publish climate device mode changes to.
     * @yamlKey mode_state_topic
     */
    modeStateTopic?: string;
    /** @yamlKey on_control */
    onControl?: TriggerHandler;
    /** @yamlKey on_state */
    onState?: TriggerHandler;
    /**
     * string: The topic to receive preset commands on.
     * @yamlKey preset_command_topic
     */
    presetCommandTopic?: string;
    /**
     * string: The topic to publish preset changes to.
     * @yamlKey preset_state_topic
     */
    presetStateTopic?: string;
    /**
     * string: The topic to receive swing mode commands on.
     * @yamlKey swing_mode_command_topic
     */
    swingModeCommandTopic?: string;
    /**
     * string: The topic to publish swing mode changes to.
     * @yamlKey swing_mode_state_topic
     */
    swingModeStateTopic?: string;
    /**
     * string: The topic to receive target humidity commands on.
     * @yamlKey target_humidity_command_topic
     */
    targetHumidityCommandTopic?: string;
    /**
     * string: The topic to publish target humidity changes to.
     * @yamlKey target_humidity_state_topic
     */
    targetHumidityStateTopic?: string;
    /**
     * string: The topic to receive target temperature commands on.
     * @yamlKey target_temperature_command_topic
     */
    targetTemperatureCommandTopic?: string;
    /**
     * string: The topic to receive higher target temperature commands on.
     * @yamlKey target_temperature_high_command_topic
     */
    targetTemperatureHighCommandTopic?: string;
    /**
     * string: The topic to publish higher target temperature changes to.
     * @yamlKey target_temperature_high_state_topic
     */
    targetTemperatureHighStateTopic?: string;
    /**
     * string: The topic to receive lower target temperature commands on.
     * @yamlKey target_temperature_low_command_topic
     */
    targetTemperatureLowCommandTopic?: string;
    /**
     * string: The topic to publish lower target temperature changes to.
     * @yamlKey target_temperature_low_state_topic
     */
    targetTemperatureLowStateTopic?: string;
    /**
     * string: The topic to publish target temperature changes to.
     * @yamlKey target_temperature_state_topic
     */
    targetTemperatureStateTopic?: string;
    /** Visual settings for the climate device - these do not affect operation and are solely for controlling how the climate... */
    visual?: ClimateVisualProps;
    /** @yamlKey web_server */
    webServer?: ClimateWebServerProps;
}
interface AnovaProps extends _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the BLE Client.
     * @yamlKey ble_client_id
     */
    bleClientId?: RefProp<__marker_ble_client_BLEClient>;
    /**
     * string: Units to use on the device display. 'c' or 'f'.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement: "c" | "f";
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface BalluProps extends _CoreComponent {
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<__marker_remote_base_RemoteReceiverBase>;
    sensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<__marker_remote_base_RemoteTransmitterBase>;
}
interface BangBangProps extends _CoreComponent {
    /**
     * Additionally specify target temperature range settings for away mode. Away mode can be used to have a second set of t...
     * @yamlKey away_config
     */
    awayConfig?: BangBangAwayConfigProps;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the climate device wants to coo...
     * @yamlKey cool_action
     */
    coolAction?: TriggerHandler;
    /**
     * float: The default high target temperature for the control algorithm. This can be dynamically set in the frontend later.
     * @yamlKey default_target_temperature_high
     */
    defaultTargetTemperatureHigh: number;
    /**
     * float: The default low target temperature for the control algorithm. This can be dynamically set in the frontend later.
     * @yamlKey default_target_temperature_low
     */
    defaultTargetTemperatureLow: number;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the climate device wants to hea...
     * @yamlKey heat_action
     */
    heatAction?: TriggerHandler;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): If specified, this sensor is used to measure the current humi...
     * @yamlKey humidity_sensor
     */
    humiditySensor?: RefProp<__marker_sensor_Sensor>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the climate device wants to ent...
     * @yamlKey idle_action
     */
    idleAction: TriggerHandler;
    /** [ID](https://esphome.io/guides/configuration-types#id): The sensor that is used to measure the current temperature. */
    sensor: RefProp<__marker_sensor_Sensor>;
}
interface BedjetProps extends _CoreComponent, _BedjetClient {
    /**
     * string: The primary heating mode to use for `HVACMode.HEAT` :
     * @yamlKey heat_mode
     */
    heatMode?: "extended" | "heat";
    /**
     * string: The temperature that should be used as the climate entity's current temperature:
     * @yamlKey temperature_source
     */
    temperatureSource?: "ambient" | "outlet";
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface ClimateIrLgProps extends _CoreComponent {
    /** @yamlKey bit_high */
    bitHigh?: TimePeriod;
    /** @yamlKey bit_one_low */
    bitOneLow?: TimePeriod;
    /** @yamlKey bit_zero_low */
    bitZeroLow?: TimePeriod;
    /** @yamlKey header_high */
    headerHigh?: TimePeriod;
    /** @yamlKey header_low */
    headerLow?: TimePeriod;
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<__marker_remote_base_RemoteReceiverBase>;
    sensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<__marker_remote_base_RemoteTransmitterBase>;
}
interface CoolixProps extends _CoreComponent {
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<__marker_remote_base_RemoteReceiverBase>;
    sensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<__marker_remote_base_RemoteTransmitterBase>;
}
interface DaikinProps extends _CoreComponent {
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<__marker_remote_base_RemoteReceiverBase>;
    sensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<__marker_remote_base_RemoteTransmitterBase>;
}
interface DaikinArcProps extends _CoreComponent {
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<__marker_remote_base_RemoteReceiverBase>;
    sensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<__marker_remote_base_RemoteTransmitterBase>;
}
interface DaikinBrcProps extends _CoreComponent {
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<__marker_remote_base_RemoteReceiverBase>;
    sensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<__marker_remote_base_RemoteTransmitterBase>;
    /** @yamlKey use_fahrenheit */
    useFahrenheit?: boolean;
}
interface DelonghiProps extends _CoreComponent {
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<__marker_remote_base_RemoteReceiverBase>;
    sensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<__marker_remote_base_RemoteTransmitterBase>;
}
interface EmmetiProps extends _CoreComponent {
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<__marker_remote_base_RemoteReceiverBase>;
    sensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<__marker_remote_base_RemoteTransmitterBase>;
}
interface FujitsuGeneralProps extends _CoreComponent {
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<__marker_remote_base_RemoteReceiverBase>;
    sensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<__marker_remote_base_RemoteTransmitterBase>;
}
interface GreeProps extends _CoreComponent {
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<__marker_sensor_Sensor>;
    model: "generic" | "yaa" | "yac" | "yac1fb9" | "yag" | "yan" | "yx1ff";
    /** @yamlKey receiver_id */
    receiverId?: RefProp<__marker_remote_base_RemoteReceiverBase>;
    sensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<__marker_remote_base_RemoteTransmitterBase>;
}
interface HaierHONProps extends _CoreComponent {
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Responce timeout. The default value is `200ms`.
     * @yamlKey answer_timeout
     */
    answerTimeout?: TimePeriod;
    /**
     * list: (supported only by hOn) Defines control method (should be supported by AC). Supported values: `MONITOR_ONLY` - ...
     * @yamlKey control_method
     */
    controlMethod?: "MONITOR_ONLY" | "SET_GROUP_PARAMETERS" | "SET_SINGLE_PARAMETER";
    /**
     * int: (supported only by hOn) Define the size of the control packet. Can help with some newer models of ACs that use b...
     * @yamlKey control_packet_size
     */
    controlPacketSize?: number;
    /** boolean: Can be used to set the AC display off. */
    display?: boolean;
    /**
     * [Automation](https://esphome.io/automations): (supported only by hOn) Automation to perform when AC deactivates a new...
     * @yamlKey on_alarm_end
     */
    onAlarmEnd?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): (supported only by hOn) Automation to perform when AC activates a new a...
     * @yamlKey on_alarm_start
     */
    onAlarmStart?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): Automation to perform when status message received from AC. See [`on_st...
     * @yamlKey on_status_message
     */
    onStatusMessage?: TriggerHandler;
    /**
     * int: (supported only by hOn) Define the size of the sensor packet of the status message. Can help with some models of...
     * @yamlKey sensors_packet_size
     */
    sensorsPacketSize?: number;
    /**
     * int: (supported only by hOn) Define the header size of the status message. Can be used to handle some protocol variat...
     * @yamlKey status_message_header_size
     */
    statusMessageHeaderSize?: number;
    /**
     * list: Can be used to disable some of AC modes. Possible values: `'OFF'`, `HEAT_COOL`, `COOL`, `HEAT`, `DRY`, `FAN_ONLY`.
     * @yamlKey supported_modes
     */
    supportedModes?: Array<"COOL" | "DRY" | "FAN_ONLY" | "HEAT" | "HEAT_COOL" | "OFF">;
    /**
     * list: Can be used to disable some presets. Possible values for smartair2 are: `AWAY`, `BOOST`, `COMFORT`. Possible va...
     * @yamlKey supported_presets
     */
    supportedPresets?: Array<"AWAY" | "BOOST" | "SLEEP">;
    /**
     * list: Can be used to disable some swing modes if your AC does not support it. Possible values: `'OFF'`, `VERTICAL`, `...
     * @yamlKey supported_swing_modes
     */
    supportedSwingModes?: Array<"BOTH" | "HORIZONTAL" | "OFF" | "VERTICAL">;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): ID of the UART port to communicate with AC.
     * @yamlKey uart_id
     */
    uartId?: RefProp<__marker_uart_UARTComponent>;
    /**
     * boolean: If `true` - send wifi signal level to AC.
     * @yamlKey wifi_signal
     */
    wifiSignal?: boolean;
}
interface HaierSMARTAIR2Props extends _CoreComponent {
    /**
     * boolean: (supported by smartAir2 only) If `true` - use alternative values to control swing mode. Use only if the orig...
     * @yamlKey alternative_swing_control
     */
    alternativeSwingControl?: boolean;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Responce timeout. The default value is `200ms`.
     * @yamlKey answer_timeout
     */
    answerTimeout?: TimePeriod;
    /** boolean: Can be used to set the AC display off. */
    display?: boolean;
    /**
     * [Automation](https://esphome.io/automations): Automation to perform when status message received from AC. See [`on_st...
     * @yamlKey on_status_message
     */
    onStatusMessage?: TriggerHandler;
    /**
     * list: Can be used to disable some of AC modes. Possible values: `'OFF'`, `HEAT_COOL`, `COOL`, `HEAT`, `DRY`, `FAN_ONLY`.
     * @yamlKey supported_modes
     */
    supportedModes?: Array<"COOL" | "DRY" | "FAN_ONLY" | "HEAT" | "HEAT_COOL" | "OFF">;
    /**
     * list: Can be used to disable some presets. Possible values for smartair2 are: `AWAY`, `BOOST`, `COMFORT`. Possible va...
     * @yamlKey supported_presets
     */
    supportedPresets?: Array<"AWAY" | "BOOST" | "COMFORT">;
    /**
     * list: Can be used to disable some swing modes if your AC does not support it. Possible values: `'OFF'`, `VERTICAL`, `...
     * @yamlKey supported_swing_modes
     */
    supportedSwingModes?: Array<"BOTH" | "HORIZONTAL" | "OFF" | "VERTICAL">;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): ID of the UART port to communicate with AC.
     * @yamlKey uart_id
     */
    uartId?: RefProp<__marker_uart_UARTComponent>;
    /**
     * boolean: If `true` - send wifi signal level to AC.
     * @yamlKey wifi_signal
     */
    wifiSignal?: boolean;
}
interface HeatpumpirProps extends _CoreComponent {
    /** @yamlKey horizontal_default */
    horizontalDefault: "auto" | "left" | "middle" | "mleft" | "mright" | "right";
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey max_temperature */
    maxTemperature: unknown;
    /** @yamlKey min_temperature */
    minTemperature: unknown;
    protocol: "airway" | "aux" | "ballu" | "bgh_aud" | "carrier_mca" | "carrier_nqv" | "carrier_qlima_1" | "carrier_qlima_2" | "daikin" | "daikin_arc417" | "daikin_arc480" | "electroluxyal" | "fuego" | "fujitsu_awyz" | "gree" | "greeya" | "greeyac" | "greeyan" | "greeyap" | "greeyt" | "hisense_aud" | "hitachi" | "hyundai" | "ivt" | "midea" | "mitsubishi_fa" | "mitsubishi_fd" | "mitsubishi_fe" | "mitsubishi_heavy_fdtc" | "mitsubishi_heavy_kj" | "mitsubishi_heavy_zj" | "mitsubishi_heavy_zm" | "mitsubishi_heavy_zmp" | "mitsubishi_msc" | "mitsubishi_msy" | "mitsubishi_sez" | "nibe" | "panasonic_altdke" | "panasonic_ckp" | "panasonic_dke" | "panasonic_eke" | "panasonic_jke" | "panasonic_lke" | "panasonic_nke" | "philco_phs32" | "r51m" | "samsung_aqv" | "samsung_aqv12msan" | "samsung_fjm" | "sharp" | "toshiba" | "toshiba_daiseikai" | "vaillantvai8" | "zhjg01" | "zhlt01";
    /** @yamlKey receiver_id */
    receiverId?: RefProp<__marker_remote_base_RemoteReceiverBase>;
    sensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<__marker_remote_base_RemoteTransmitterBase>;
    /** @yamlKey vertical_default */
    verticalDefault: "auto" | "down" | "mdown" | "middle" | "mup" | "up";
}
interface HitachiAc344Props extends _CoreComponent {
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<__marker_remote_base_RemoteReceiverBase>;
    sensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<__marker_remote_base_RemoteTransmitterBase>;
}
interface HitachiAc424Props extends _CoreComponent {
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<__marker_remote_base_RemoteReceiverBase>;
    sensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<__marker_remote_base_RemoteTransmitterBase>;
}
interface MideaProps extends _CoreComponent {
    /** boolean: Get capabilities automatically. Allows you not to manually define most of the capabilities of the appliance.... */
    autoconf?: boolean;
    /** boolean: Beeper feedback on command. Defaults to `False`. */
    beeper?: boolean;
    /**
     * list: List of supported custom fan modes. Possible values are: `SILENT`, `TURBO`.
     * @yamlKey custom_fan_modes
     */
    customFanModes?: Array<"SILENT" | "TURBO">;
    /**
     * list: List of supported custom presets. Possible values are: `FREEZE_PROTECTION`.
     * @yamlKey custom_presets
     */
    customPresets?: Array<"FREEZE_PROTECTION">;
    /**
     * The information for the humidity indoor sensor (experimental).
     * @yamlKey humidity_setpoint
     */
    humiditySetpoint?: MideaHumiditySetpointProps;
    /**
     * int: Number of request attempts between 1 and 5 inclusive. Defaults to `3`.
     * @yamlKey num_attempts
     */
    numAttempts?: number;
    /**
     * The information for the outdoor temperature sensor.
     * @yamlKey outdoor_temperature
     */
    outdoorTemperature?: MideaOutdoorTemperatureProps;
    /** [Time](https://esphome.io/guides/configuration-types#time): Minimal period between requests to the appliance. Default... */
    period?: TimePeriod;
    /**
     * The information for the current power consumption sensor.
     * @yamlKey power_usage
     */
    powerUsage?: MideaPowerUsageProps;
    /**
     * list: List of supported modes. Possible values are: `HEAT_COOL`, `COOL`, `HEAT`, `DRY`, `FAN_ONLY`.
     * @yamlKey supported_modes
     */
    supportedModes?: Array<"COOL" | "DRY" | "FAN_ONLY" | "HEAT" | "HEAT_COOL">;
    /**
     * list: List of supported presets. Possible values are: `ECO`, `BOOST`, `SLEEP`.
     * @yamlKey supported_presets
     */
    supportedPresets?: Array<"BOOST" | "ECO" | "SLEEP">;
    /**
     * list: List of supported swing modes. Possible values are: `VERTICAL`, `HORIZONTAL`, `BOTH`.
     * @yamlKey supported_swing_modes
     */
    supportedSwingModes?: Array<"BOTH" | "HORIZONTAL" | "VERTICAL">;
    /** [Time](https://esphome.io/guides/configuration-types#time): Request response timeout until next request attempt. Defa... */
    timeout?: TimePeriod;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Defined and used automatically when using [Remote Transmitter...
     * @yamlKey transmitter_id
     */
    transmitterId?: RefProp<__marker_remote_transmitter_RemoteTransmitterComponent>;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [Uart](https://esphome.io/comp...
     * @yamlKey uart_id
     */
    uartId?: RefProp<__marker_uart_UARTComponent>;
}
interface MideaIrProps extends _CoreComponent {
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<__marker_remote_base_RemoteReceiverBase>;
    sensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<__marker_remote_base_RemoteTransmitterBase>;
    /** @yamlKey use_fahrenheit */
    useFahrenheit?: boolean;
}
interface MitsubishiProps extends _CoreComponent {
    /** @yamlKey horizontal_default */
    horizontalDefault?: "left" | "middle" | "middle-left" | "middle-right" | "right" | "split";
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<__marker_remote_base_RemoteReceiverBase>;
    sensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey set_fan_mode */
    setFanMode?: "3levels" | "4levels" | "quiet_4levels";
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_dry */
    supportsDry?: boolean;
    /** @yamlKey supports_fan_only */
    supportsFanOnly?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<__marker_remote_base_RemoteTransmitterBase>;
    /** @yamlKey vertical_default */
    verticalDefault?: "auto" | "down" | "middle" | "middle-down" | "middle-up" | "up";
}
interface MitsubishiCn105Props {
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Minimum time between consecutive room temperature reads. ...
     * @yamlKey current_temperature_min_interval
     */
    currentTemperatureMinInterval?: TimePeriod;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The UART bus to use.
     * @yamlKey uart_id
     */
    uartId?: RefProp<__marker_uart_UARTComponent>;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Interval between status updates. Defaults to `1s`. Lower ...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
interface NoblexProps extends _CoreComponent {
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<__marker_remote_base_RemoteReceiverBase>;
    sensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<__marker_remote_base_RemoteTransmitterBase>;
}
interface PidProps {
    /**
     * Control parameters of the PID controller.
     * @yamlKey control_parameters
     */
    controlParameters: PidControlParametersProps;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of a [float output](https://esphome.io/components/outp...
     * @yamlKey cool_output
     */
    coolOutput?: RefProp<__marker_output_FloatOutput>;
    /**
     * Enables a deadband to stabilise and minimise changes in the output when the temperature is close to the target temper...
     * @yamlKey deadband_parameters
     */
    deadbandParameters?: PidDeadbandParametersProps;
    /**
     * float: The default target temperature (setpoint) for the control algorithm. This can be dynamically set in the fronte...
     * @yamlKey default_target_temperature
     */
    defaultTargetTemperature: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of a [float output](https://esphome.io/components/outp...
     * @yamlKey heat_output
     */
    heatOutput?: RefProp<__marker_output_FloatOutput>;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): If specified, this sensor is used to measure the current humi...
     * @yamlKey humidity_sensor
     */
    humiditySensor?: RefProp<__marker_sensor_Sensor>;
    /** [ID](https://esphome.io/guides/configuration-types#id): The sensor that is used to measure the current temperature. */
    sensor: RefProp<__marker_sensor_Sensor>;
}
interface Tcl112Props extends _CoreComponent {
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<__marker_remote_base_RemoteReceiverBase>;
    sensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
}
interface ThermostatProps extends _CoreComponent {
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the climate device is placed in...
     * @yamlKey auto_mode
     */
    autoMode?: TriggerHandler;
    /** @yamlKey away_config */
    awayConfig?: ThermostatAwayConfigProps;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the climate device should enter...
     * @yamlKey cool_action
     */
    coolAction?: TriggerHandler;
    /**
     * float: The minimum temperature differential (temperature above the set point) before calling the cooling [action](htt...
     * @yamlKey cool_deadband
     */
    coolDeadband?: number;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the climate device is placed in...
     * @yamlKey cool_mode
     */
    coolMode?: TriggerHandler;
    /**
     * float: The minimum temperature differential (cooling beyond the set point) before calling the idle [action](https://e...
     * @yamlKey cool_overrun
     */
    coolOverrun?: number;
    /** @yamlKey default_mode */
    defaultMode?: unknown;
    /**
     * string: The name of the preset to use by default. Must match a preset as per [preset](https://esphome.io/components/c...
     * @yamlKey default_preset
     */
    defaultPreset?: string;
    /** @yamlKey default_target_temperature_high */
    defaultTargetTemperatureHigh?: unknown;
    /** @yamlKey default_target_temperature_low */
    defaultTargetTemperatureLow?: unknown;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the climate device should perfo...
     * @yamlKey dry_action
     */
    dryAction?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the climate device is placed in...
     * @yamlKey dry_mode
     */
    dryMode?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the fan should be set to "auto"...
     * @yamlKey fan_mode_auto_action
     */
    fanModeAutoAction?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the fan should direct its airfl...
     * @yamlKey fan_mode_diffuse_action
     */
    fanModeDiffuseAction?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the fan should direct its airfl...
     * @yamlKey fan_mode_focus_action
     */
    fanModeFocusAction?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the fan should run at its maxim...
     * @yamlKey fan_mode_high_action
     */
    fanModeHighAction?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the fan should run at its minim...
     * @yamlKey fan_mode_low_action
     */
    fanModeLowAction?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the fan should run at an interm...
     * @yamlKey fan_mode_medium_action
     */
    fanModeMediumAction?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the fan should direct its airfl...
     * @yamlKey fan_mode_middle_action
     */
    fanModeMiddleAction?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the fan should never run.
     * @yamlKey fan_mode_off_action
     */
    fanModeOffAction?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the fan should run continuously.
     * @yamlKey fan_mode_on_action
     */
    fanModeOnAction?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the fan should run at quiet speed.
     * @yamlKey fan_mode_quiet_action
     */
    fanModeQuietAction?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the climate device should activ...
     * @yamlKey fan_only_action
     */
    fanOnlyAction?: TriggerHandler;
    /**
     * boolean: If set to `true`, the `fan_only_action` will share the same delay timer used for all `fan_mode` actions. The...
     * @yamlKey fan_only_action_uses_fan_mode_timer
     */
    fanOnlyActionUsesFanModeTimer?: boolean;
    /**
     * boolean: If set to `true`, when in the `fan_only_mode` climate mode, the `fan_only_action` will only be called when t...
     * @yamlKey fan_only_cooling
     */
    fanOnlyCooling?: boolean;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the climate device is placed in...
     * @yamlKey fan_only_mode
     */
    fanOnlyMode?: TriggerHandler;
    /**
     * boolean: If set to `true`, `fan_only_action` will be called whenever `cool_action` is called. This is useful for forc...
     * @yamlKey fan_with_cooling
     */
    fanWithCooling?: boolean;
    /**
     * boolean: If set to `true`, `fan_only_action` will be called whenever `heat_action` is called. This is useful for forc...
     * @yamlKey fan_with_heating
     */
    fanWithHeating?: boolean;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the climate device should enter...
     * @yamlKey heat_action
     */
    heatAction?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions) or boolean: The action to call when the climate device i...
     * @yamlKey heat_cool_mode
     */
    heatCoolMode?: TriggerHandler | boolean;
    /**
     * float: The minimum temperature differential (temperature below the set point) before calling the heating [action](htt...
     * @yamlKey heat_deadband
     */
    heatDeadband?: number;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the climate device is placed in...
     * @yamlKey heat_mode
     */
    heatMode?: TriggerHandler;
    /**
     * float: The minimum temperature differential (heating beyond the set point) before calling the idle [action](https://e...
     * @yamlKey heat_overrun
     */
    heatOverrun?: number;
    /**
     * [Action](https://esphome.io/automations/actions#config-action): The action to call when dehumidification is required.
     * @yamlKey humidity_control_dehumidify_action
     */
    humidityControlDehumidifyAction?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#config-action): The action to call when humidification is required.
     * @yamlKey humidity_control_humidify_action
     */
    humidityControlHumidifyAction?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#config-action): The action to call when (de)humidification should sto...
     * @yamlKey humidity_control_off_action
     */
    humidityControlOffAction?: TriggerHandler;
    /**
     * float: The maximum humidity differential (above/below the set point) before calling the respective humidity control [...
     * @yamlKey humidity_hysteresis
     */
    humidityHysteresis?: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): If specified, this sensor is used to measure the current humi...
     * @yamlKey humidity_sensor
     */
    humiditySensor?: RefProp<__marker_sensor_Sensor>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the climate device should enter...
     * @yamlKey idle_action
     */
    idleAction: TriggerHandler;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Duration after which `supplemental_cooling_action` will b...
     * @yamlKey max_cooling_run_time
     */
    maxCoolingRunTime?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Duration after which `supplemental_heating_action` will b...
     * @yamlKey max_heating_run_time
     */
    maxHeatingRunTime?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Minimum duration the cooling action must be disengaged be...
     * @yamlKey min_cooling_off_time
     */
    minCoolingOffTime?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Minimum duration the cooling action must be engaged befor...
     * @yamlKey min_cooling_run_time
     */
    minCoolingRunTime?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Minimum duration any given fan mode must be active before...
     * @yamlKey min_fan_mode_switching_time
     */
    minFanModeSwitchingTime?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Minimum duration the fanning action must be disengaged be...
     * @yamlKey min_fanning_off_time
     */
    minFanningOffTime?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Minimum duration the fanning action must be engaged befor...
     * @yamlKey min_fanning_run_time
     */
    minFanningRunTime?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Minimum duration the heating action must be disengaged be...
     * @yamlKey min_heating_off_time
     */
    minHeatingOffTime?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Minimum duration the heating action must be engaged befor...
     * @yamlKey min_heating_run_time
     */
    minHeatingRunTime?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Minimum duration the idle action must be active before ca...
     * @yamlKey min_idle_time
     */
    minIdleTime: TimePeriod;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the climate device is placed in...
     * @yamlKey off_mode
     */
    offMode?: TriggerHandler;
    /**
     * (*Optional*, on_boot_restore_from): Controls what the thermostat will do when it first boots. One of:
     * @yamlKey on_boot_restore_from
     */
    onBootRestoreFrom?: "DEFAULT_PRESET" | "MEMORY";
    /** (*Optional*, list) */
    preset?: Array<ThermostatPresetProps>;
    /**
     * (*Optional*, [Action](https://esphome.io/automations/actions#all-actions)): The action to call when the preset is cha...
     * @yamlKey preset_change
     */
    presetChange?: TriggerHandler;
    /** [ID](https://esphome.io/guides/configuration-types#id): The sensor that is used to measure the current temperature. */
    sensor: RefProp<__marker_sensor_Sensor>;
    /**
     * float: For dual-point/dual-function systems, the minimum required temperature difference between the heat and cool se...
     * @yamlKey set_point_minimum_differential
     */
    setPointMinimumDifferential?: number;
    /**
     * boolean: If set to `true`, when ESPHome starts, `min_cooling_off_time`, `min_fanning_off_time`, and `min_heating_off_...
     * @yamlKey startup_delay
     */
    startupDelay?: boolean;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the climate device should activ...
     * @yamlKey supplemental_cooling_action
     */
    supplementalCoolingAction?: TriggerHandler;
    /**
     * float: When the temperature difference between the upper set point and the current temperature exceeds this value, `s...
     * @yamlKey supplemental_cooling_delta
     */
    supplementalCoolingDelta?: number;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the climate device should activ...
     * @yamlKey supplemental_heating_action
     */
    supplementalHeatingAction?: TriggerHandler;
    /**
     * float: When the temperature difference between the lower set point and the current temperature exceeds this value, `s...
     * @yamlKey supplemental_heating_delta
     */
    supplementalHeatingDelta?: number;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the fan should oscillate in hor...
     * @yamlKey swing_both_action
     */
    swingBothAction?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the fan should oscillate in a h...
     * @yamlKey swing_horizontal_action
     */
    swingHorizontalAction?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the fan should remain in a stat...
     * @yamlKey swing_off_action
     */
    swingOffAction?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the fan should oscillate in a v...
     * @yamlKey swing_vertical_action
     */
    swingVerticalAction?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the thermostat's target humidit...
     * @yamlKey target_humidity_change_action
     */
    targetHumidityChangeAction?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to call when the thermostat's target tempera...
     * @yamlKey target_temperature_change_action
     */
    targetTemperatureChangeAction?: TriggerHandler;
}
interface ToshibaProps extends _CoreComponent {
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<__marker_sensor_Sensor>;
    model?: "GENERIC" | "RAC-PT1411HWRU-C" | "RAC-PT1411HWRU-F" | "RAS-2819T";
    /** @yamlKey receiver_id */
    receiverId?: RefProp<__marker_remote_base_RemoteReceiverBase>;
    sensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
}
interface TuyaProps extends _CoreComponent {
    /** @yamlKey active_state */
    activeState?: TuyaActiveStateProps;
    /** @yamlKey cooling_state_pin */
    coolingStatePin?: Pin;
    /** @yamlKey current_temperature_datapoint */
    currentTemperatureDatapoint?: number;
    /** @yamlKey current_temperature_multiplier */
    currentTemperatureMultiplier?: number;
    /** @yamlKey fan_mode */
    fanMode?: TuyaFanModeProps;
    /** @yamlKey heating_state_pin */
    heatingStatePin?: Pin;
    preset?: TuyaPresetProps;
    /** @yamlKey reports_fahrenheit */
    reportsFahrenheit?: boolean;
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    /** @yamlKey swing_mode */
    swingMode?: TuyaSwingModeProps;
    /** @yamlKey switch_datapoint */
    switchDatapoint?: number;
    /** @yamlKey target_temperature_datapoint */
    targetTemperatureDatapoint?: number;
    /** @yamlKey target_temperature_multiplier */
    targetTemperatureMultiplier?: number;
    /** @yamlKey temperature_multiplier */
    temperatureMultiplier?: number;
    /** @yamlKey tuya_id */
    tuyaId?: RefProp<__marker_tuya_Tuya>;
}
interface UponorSmatrixProps extends _UponorSmatrixDevice {
}
interface WhirlpoolProps extends _CoreComponent {
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<__marker_sensor_Sensor>;
    model?: "DG11J1-3A" | "DG11J1-91";
    /** @yamlKey receiver_id */
    receiverId?: RefProp<__marker_remote_base_RemoteReceiverBase>;
    sensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
}
interface WhynterProps extends _CoreComponent {
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<__marker_remote_base_RemoteReceiverBase>;
    sensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    /** @yamlKey use_fahrenheit */
    useFahrenheit?: boolean;
}
interface YashimaProps extends _CoreComponent {
    sensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<__marker_remote_transmitter_RemoteTransmitterComponent>;
}
interface Zhlt01Props extends _CoreComponent {
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<__marker_remote_base_RemoteReceiverBase>;
    sensor?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
}
export type ClimateProps = (ClimateBaseProps & {
    platform: "anova";
} & AnovaProps & ComponentProps<__marker_anova_Anova>) | (ClimateBaseProps & {
    platform: "ballu";
} & BalluProps & ComponentProps<__marker_ballu_BalluClimate>) | (ClimateBaseProps & {
    platform: "bang_bang";
} & BangBangProps & ComponentProps<__marker_bang_bang_BangBangClimate>) | (ClimateBaseProps & {
    platform: "bedjet";
} & BedjetProps & ComponentProps<__marker_bedjet_BedJetClimate>) | (ClimateBaseProps & {
    platform: "climate_ir_lg";
} & ClimateIrLgProps & ComponentProps<__marker_climate_ir_lg_LgIrClimate>) | (ClimateBaseProps & {
    platform: "coolix";
} & CoolixProps & ComponentProps<__marker_coolix_CoolixClimate>) | (ClimateBaseProps & {
    platform: "daikin";
} & DaikinProps & ComponentProps<__marker_daikin_DaikinClimate>) | (ClimateBaseProps & {
    platform: "daikin_arc";
} & DaikinArcProps & ComponentProps<__marker_daikin_arc_DaikinArcClimate>) | (ClimateBaseProps & {
    platform: "daikin_brc";
} & DaikinBrcProps & ComponentProps<__marker_daikin_brc_DaikinBrcClimate>) | (ClimateBaseProps & {
    platform: "delonghi";
} & DelonghiProps & ComponentProps<__marker_delonghi_DelonghiClimate>) | (ClimateBaseProps & {
    platform: "emmeti";
} & EmmetiProps & ComponentProps<__marker_emmeti_EmmetiClimate>) | (ClimateBaseProps & {
    platform: "fujitsu_general";
} & FujitsuGeneralProps & ComponentProps<__marker_fujitsu_general_FujitsuGeneralClimate>) | (ClimateBaseProps & {
    platform: "gree";
} & GreeProps & ComponentProps<__marker_gree_GreeClimate>) | (ClimateBaseProps & {
    platform: "haier";
    protocol: "HON";
} & HaierHONProps & ComponentProps<__marker_haier_HonClimate>) | (ClimateBaseProps & {
    platform: "haier";
    protocol: "SMARTAIR2";
} & HaierSMARTAIR2Props & ComponentProps<__marker_haier_Smartair2Climate>) | (ClimateBaseProps & {
    platform: "heatpumpir";
} & HeatpumpirProps & ComponentProps<__marker_heatpumpir_HeatpumpIRClimate>) | (ClimateBaseProps & {
    platform: "hitachi_ac344";
} & HitachiAc344Props & ComponentProps<__marker_hitachi_ac344_HitachiClimate>) | (ClimateBaseProps & {
    platform: "hitachi_ac424";
} & HitachiAc424Props & ComponentProps<__marker_hitachi_ac424_HitachiClimate>) | (ClimateBaseProps & {
    platform: "midea";
} & MideaProps & ComponentProps<__marker_midea_ac_AirConditioner>) | (ClimateBaseProps & {
    platform: "midea_ir";
} & MideaIrProps & ComponentProps<__marker_midea_ir_MideaIR>) | (ClimateBaseProps & {
    platform: "mitsubishi";
} & MitsubishiProps & ComponentProps<__marker_mitsubishi_MitsubishiClimate>) | (ClimateBaseProps & {
    platform: "mitsubishi_cn105";
} & MitsubishiCn105Props & ComponentProps<__marker_mitsubishi_cn105_MitsubishiCN105Climate>) | (ClimateBaseProps & {
    platform: "noblex";
} & NoblexProps & ComponentProps<__marker_noblex_NoblexClimate>) | (ClimateBaseProps & {
    platform: "pid";
} & PidProps & ComponentProps<__marker_pid_PIDClimate>) | (ClimateBaseProps & {
    platform: "tcl112";
} & Tcl112Props & ComponentProps<__marker_tcl112_Tcl112Climate>) | (ClimateBaseProps & {
    platform: "thermostat";
} & ThermostatProps & ComponentProps<__marker_thermostat_ThermostatClimate>) | (ClimateBaseProps & {
    platform: "toshiba";
} & ToshibaProps & ComponentProps<__marker_toshiba_ToshibaClimate>) | (ClimateBaseProps & {
    platform: "tuya";
} & TuyaProps & ComponentProps<__marker_tuya_TuyaClimate>) | (ClimateBaseProps & {
    platform: "uponor_smatrix";
} & UponorSmatrixProps & ComponentProps<__marker_uponor_smatrix_UponorSmatrixClimate>) | (ClimateBaseProps & {
    platform: "whirlpool";
} & WhirlpoolProps & ComponentProps<__marker_whirlpool_WhirlpoolClimate>) | (ClimateBaseProps & {
    platform: "whynter";
} & WhynterProps & ComponentProps<__marker_whynter_Whynter>) | (ClimateBaseProps & {
    platform: "yashima";
} & YashimaProps & ComponentProps<__marker_yashima_YashimaClimate>) | (ClimateBaseProps & {
    platform: "zhlt01";
} & Zhlt01Props & ComponentProps<__marker_zhlt01_ZHLT01Climate>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            climate: ClimateProps;
        }
    }
}
