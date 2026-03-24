// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _BedjetClient, _CoreComponent, _CoreEntityBase, _CoreMqttCommandComponent, _UponorSmatrixDevice } from "../bases";
import type { anova_Anova, ballu_BalluClimate, bang_bang_BangBangClimate, bedjet_BedJetClimate, ble_client_BLEClient, climate_ir_lg_LgIrClimate, coolix_CoolixClimate, daikin_DaikinClimate, daikin_arc_DaikinArcClimate, daikin_brc_DaikinBrcClimate, delonghi_DelonghiClimate, emmeti_EmmetiClimate, fujitsu_general_FujitsuGeneralClimate, gree_GreeClimate, haier_HonClimate, haier_Smartair2Climate, heatpumpir_HeatpumpIRClimate, hitachi_ac344_HitachiClimate, hitachi_ac424_HitachiClimate, midea_ac_AirConditioner, midea_ir_MideaIR, mitsubishi_MitsubishiClimate, mqtt_MQTTClimateComponent, noblex_NoblexClimate, output_FloatOutput, pid_PIDClimate, remote_base_RemoteReceiverBase, remote_base_RemoteTransmitterBase, remote_transmitter_RemoteTransmitterComponent, sensor_Sensor, tcl112_Tcl112Climate, thermostat_ThermostatClimate, toshiba_ToshibaClimate, tuya_Tuya, tuya_TuyaClimate, uart_UARTComponent, uponor_smatrix_UponorSmatrixClimate, web_server_WebServer, whirlpool_WhirlpoolClimate, whynter_Whynter, yashima_YashimaClimate, zhlt01_ZHLT01Climate, zigbee_ZigbeeComponent } from "../markers";
interface ClimateWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface ClimateVisualProps {
    /** @yamlKey min_temperature */
    minTemperature?: unknown;
    /** @yamlKey max_temperature */
    maxTemperature?: unknown;
    /** @yamlKey temperature_step */
    temperatureStep?: unknown;
    /** @yamlKey min_humidity */
    minHumidity?: unknown;
    /** @yamlKey max_humidity */
    maxHumidity?: unknown;
}
interface BangBangAwayConfigProps {
    /**
     * float: The default low target temperature for the control algorithm during away mode.
     * @yamlKey default_target_temperature_low
     */
    defaultTargetTemperatureLow: unknown;
    /**
     * float: The default high target temperature for the control algorithm during away mode.
     * @yamlKey default_target_temperature_high
     */
    defaultTargetTemperatureHigh: unknown;
}
interface ClimateIrLgHeaderHighProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface ClimateIrLgHeaderLowProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface ClimateIrLgBitHighProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface ClimateIrLgBitOneLowProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface ClimateIrLgBitZeroLowProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface MideaPeriodProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface MideaTimeoutProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface MideaOutdoorTemperaturePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface MideaOutdoorTemperaturePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface MideaOutdoorTemperaturePropsExpireAfterProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface MideaOutdoorTemperatureProps {
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
    availability?: MideaOutdoorTemperaturePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: MideaOutdoorTemperaturePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: unknown;
    /** @yamlKey accuracy_decimals */
    accuracyDecimals?: unknown;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey state_class */
    stateClass?: unknown;
    /** @yamlKey force_update */
    forceUpdate?: boolean;
    /** @yamlKey expire_after */
    expireAfter?: MideaOutdoorTemperaturePropsExpireAfterProps;
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: () => void;
    /** @yamlKey on_raw_value */
    onRawValue?: () => void;
    /** @yamlKey on_value_range */
    onValueRange?: () => void;
}
interface MideaPowerUsagePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface MideaPowerUsagePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface MideaPowerUsagePropsExpireAfterProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface MideaPowerUsageProps {
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
    availability?: MideaPowerUsagePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: MideaPowerUsagePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: unknown;
    /** @yamlKey accuracy_decimals */
    accuracyDecimals?: unknown;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey state_class */
    stateClass?: unknown;
    /** @yamlKey force_update */
    forceUpdate?: boolean;
    /** @yamlKey expire_after */
    expireAfter?: MideaPowerUsagePropsExpireAfterProps;
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: () => void;
    /** @yamlKey on_raw_value */
    onRawValue?: () => void;
    /** @yamlKey on_value_range */
    onValueRange?: () => void;
}
interface MideaHumiditySetpointPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface MideaHumiditySetpointPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface MideaHumiditySetpointPropsExpireAfterProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface MideaHumiditySetpointProps {
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
    availability?: MideaHumiditySetpointPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: MideaHumiditySetpointPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: unknown;
    /** @yamlKey accuracy_decimals */
    accuracyDecimals?: unknown;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey state_class */
    stateClass?: unknown;
    /** @yamlKey force_update */
    forceUpdate?: boolean;
    /** @yamlKey expire_after */
    expireAfter?: MideaHumiditySetpointPropsExpireAfterProps;
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: () => void;
    /** @yamlKey on_raw_value */
    onRawValue?: () => void;
    /** @yamlKey on_value_range */
    onValueRange?: () => void;
}
interface PidDeadbandParametersProps {
    /** @yamlKey threshold_high */
    thresholdHigh: unknown;
    /** @yamlKey threshold_low */
    thresholdLow: unknown;
    /**
     * float: Set the `kp` gain when inside the deadband. Defaults to `0`.
     * @yamlKey kp_multiplier
     */
    kpMultiplier?: unknown;
    /**
     * float: Set the `ki` gain when inside the deadband. Defaults to `0`.
     * @yamlKey ki_multiplier
     */
    kiMultiplier?: unknown;
    /**
     * float: Set the `kd` gain when inside the deadband. Recommended this is set to `0`. Defaults to `0`.
     * @yamlKey kd_multiplier
     */
    kdMultiplier?: unknown;
    /**
     * int: Typically when inside the deadband the PID Controller has reached a state of equilibrium, so it advantageous to ...
     * @yamlKey deadband_output_averaging_samples
     */
    deadbandOutputAveragingSamples?: number;
}
interface PidControlParametersProps {
    /** float: The factor for the proportional term of the PID controller. */
    kp: unknown;
    /** float: The factor for the integral term of the PID controller. Defaults to `0`. */
    ki?: unknown;
    /** float: The factor for the derivative term of the PID controller. Defaults to `0`. */
    kd?: unknown;
    /**
     * float: Set the initial output, by priming the integral term. This is useful for when your system is rebooted and you ...
     * @yamlKey starting_integral_term
     */
    startingIntegralTerm?: unknown;
    /**
     * float: The minimum value of the integral term multiplied by `ki` to prevent windup. Defaults to `-1`.
     * @yamlKey min_integral
     */
    minIntegral?: unknown;
    /**
     * float: The maximum value of the integral term multiplied by `ki` to prevent windup. Defaults to `1`.
     * @yamlKey max_integral
     */
    maxIntegral?: unknown;
    /**
     * int: average the derivative term over this many samples. Many controllers don't use the derivative term because it is...
     * @yamlKey derivative_averaging_samples
     */
    derivativeAveragingSamples?: number;
    /**
     * int: average the output over this many samples. PID controllers can be quite sensitive to small changes on the input ...
     * @yamlKey output_averaging_samples
     */
    outputAveragingSamples?: number;
}
interface ThermostatMaxCoolingRunTimeProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface ThermostatMaxHeatingRunTimeProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface ThermostatMinCoolingOffTimeProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface ThermostatMinCoolingRunTimeProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface ThermostatMinFanModeSwitchingTimeProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface ThermostatMinFanningOffTimeProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface ThermostatMinFanningRunTimeProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface ThermostatMinHeatingOffTimeProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface ThermostatMinHeatingRunTimeProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface ThermostatMinIdleTimeProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface ThermostatAwayConfigProps {
    /** @yamlKey default_target_temperature_high */
    defaultTargetTemperatureHigh?: unknown;
    /** @yamlKey default_target_temperature_low */
    defaultTargetTemperatureLow?: unknown;
}
interface ThermostatPresetProps {
    /** string: Name of the preset. If this is one of the *standard* presets (`eco`, `away`, `boost`, `comfort`, `home`, `sle... */
    name: string;
    /** climate mode: The mode the thermostat should switch to when this preset is activated. If not specified, the thermosta... */
    mode?: "OFF" | "HEAT_COOL" | "COOL" | "HEAT" | "DRY" | "FAN_ONLY" | "AUTO";
    /**
     * float: The default high target temperature when switching to this preset.
     * @yamlKey default_target_temperature_high
     */
    defaultTargetTemperatureHigh?: unknown;
    /**
     * float: The default low target temperature when switching to this preset
     * @yamlKey default_target_temperature_low
     */
    defaultTargetTemperatureLow?: unknown;
    /**
     * climate fan mode: The fan mode the thermostat should switch to when this preset is activated. If not specified, the t...
     * @yamlKey fan_mode
     */
    fanMode?: "ON" | "OFF" | "AUTO" | "LOW" | "MEDIUM" | "HIGH" | "MIDDLE" | "FOCUS" | "DIFFUSE" | "QUIET";
    /**
     * climate swing mode: The fan swing mode the thermostat should switch to when this preset is activated. If not specifie...
     * @yamlKey swing_mode
     */
    swingMode?: "OFF" | "BOTH" | "VERTICAL" | "HORIZONTAL";
}
interface HaierSMARTAIR2AnswerTimeoutProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface HaierHONAnswerTimeoutProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface TuyaActiveStateProps {
    datapoint: number;
    /** @yamlKey heating_value */
    heatingValue?: number;
    /** @yamlKey cooling_value */
    coolingValue?: number;
    /** @yamlKey drying_value */
    dryingValue?: number;
    /** @yamlKey fanonly_value */
    fanonlyValue?: number;
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
interface TuyaFanModeProps {
    datapoint: number;
    /** @yamlKey auto_value */
    autoValue?: number;
    /** @yamlKey low_value */
    lowValue?: number;
    /** @yamlKey medium_value */
    mediumValue?: number;
    /** @yamlKey middle_value */
    middleValue?: number;
    /** @yamlKey high_value */
    highValue?: number;
}
interface TuyaSwingModeProps {
    /** @yamlKey vertical_datapoint */
    verticalDatapoint?: number;
    /** @yamlKey horizontal_datapoint */
    horizontalDatapoint?: number;
}
interface ClimateBaseProps extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey web_server */
    webServer?: ClimateWebServerProps;
    visual?: ClimateVisualProps;
    /** @yamlKey action_state_topic */
    actionStateTopic?: unknown;
    /** @yamlKey away_command_topic */
    awayCommandTopic?: unknown;
    /** @yamlKey away_state_topic */
    awayStateTopic?: unknown;
    /** @yamlKey current_temperature_state_topic */
    currentTemperatureStateTopic?: unknown;
    /** @yamlKey current_humidity_state_topic */
    currentHumidityStateTopic?: unknown;
    /** @yamlKey fan_mode_command_topic */
    fanModeCommandTopic?: unknown;
    /** @yamlKey fan_mode_state_topic */
    fanModeStateTopic?: unknown;
    /** @yamlKey mode_command_topic */
    modeCommandTopic?: unknown;
    /** @yamlKey mode_state_topic */
    modeStateTopic?: unknown;
    /** @yamlKey preset_command_topic */
    presetCommandTopic?: unknown;
    /** @yamlKey preset_state_topic */
    presetStateTopic?: unknown;
    /** @yamlKey swing_mode_command_topic */
    swingModeCommandTopic?: unknown;
    /** @yamlKey swing_mode_state_topic */
    swingModeStateTopic?: unknown;
    /** @yamlKey target_temperature_command_topic */
    targetTemperatureCommandTopic?: unknown;
    /** @yamlKey target_temperature_state_topic */
    targetTemperatureStateTopic?: unknown;
    /** @yamlKey target_temperature_high_command_topic */
    targetTemperatureHighCommandTopic?: unknown;
    /** @yamlKey target_temperature_high_state_topic */
    targetTemperatureHighStateTopic?: unknown;
    /** @yamlKey target_temperature_low_command_topic */
    targetTemperatureLowCommandTopic?: unknown;
    /** @yamlKey target_temperature_low_state_topic */
    targetTemperatureLowStateTopic?: unknown;
    /** @yamlKey target_humidity_command_topic */
    targetHumidityCommandTopic?: unknown;
    /** @yamlKey target_humidity_state_topic */
    targetHumidityStateTopic?: unknown;
    /** @yamlKey on_control */
    onControl?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
}
interface AnovaProps extends _CoreComponent {
    /**
     * string: Units to use on the device display. 'c' or 'f'.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement: "f" | "c";
    /**
     * [ID](/guides/configuration-types#id): The ID of the BLE Client.
     * @yamlKey ble_client_id
     */
    bleClientId?: RefProp<ble_client_BLEClient>;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface BalluProps extends _CoreComponent {
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    sensor?: RefProp<sensor_Sensor>;
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<sensor_Sensor>;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<remote_base_RemoteTransmitterBase>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<remote_base_RemoteReceiverBase>;
}
interface BangBangProps extends _CoreComponent {
    /** [ID](/guides/configuration-types#id): The sensor that is used to measure the current temperature. */
    sensor: RefProp<sensor_Sensor>;
    /**
     * [ID](/guides/configuration-types#id): If specified, this sensor is used to measure the current humidity. This is used...
     * @yamlKey humidity_sensor
     */
    humiditySensor?: RefProp<sensor_Sensor>;
    /**
     * float: The default low target temperature for the control algorithm. This can be dynamically set in the frontend later.
     * @yamlKey default_target_temperature_low
     */
    defaultTargetTemperatureLow: unknown;
    /**
     * float: The default high target temperature for the control algorithm. This can be dynamically set in the frontend later.
     * @yamlKey default_target_temperature_high
     */
    defaultTargetTemperatureHigh: unknown;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the climate device wants to enter idle mode.
     * @yamlKey idle_action
     */
    idleAction: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the climate device wants to cooling mode and decr...
     * @yamlKey cool_action
     */
    coolAction?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the climate device wants to heating mode and incr...
     * @yamlKey heat_action
     */
    heatAction?: () => void;
    /**
     * Additionally specify target temperature range settings for away mode. Away mode can be used to have a second set of t...
     * @yamlKey away_config
     */
    awayConfig?: BangBangAwayConfigProps;
}
interface ClimateIrLgProps extends _CoreComponent {
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    sensor?: RefProp<sensor_Sensor>;
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<sensor_Sensor>;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<remote_base_RemoteTransmitterBase>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<remote_base_RemoteReceiverBase>;
    /** @yamlKey header_high */
    headerHigh?: ClimateIrLgHeaderHighProps;
    /** @yamlKey header_low */
    headerLow?: ClimateIrLgHeaderLowProps;
    /** @yamlKey bit_high */
    bitHigh?: ClimateIrLgBitHighProps;
    /** @yamlKey bit_one_low */
    bitOneLow?: ClimateIrLgBitOneLowProps;
    /** @yamlKey bit_zero_low */
    bitZeroLow?: ClimateIrLgBitZeroLowProps;
}
interface CoolixProps extends _CoreComponent {
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    sensor?: RefProp<sensor_Sensor>;
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<sensor_Sensor>;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<remote_base_RemoteTransmitterBase>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<remote_base_RemoteReceiverBase>;
}
interface DaikinProps extends _CoreComponent {
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    sensor?: RefProp<sensor_Sensor>;
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<sensor_Sensor>;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<remote_base_RemoteTransmitterBase>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<remote_base_RemoteReceiverBase>;
}
interface DaikinArcProps extends _CoreComponent {
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    sensor?: RefProp<sensor_Sensor>;
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<sensor_Sensor>;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<remote_base_RemoteTransmitterBase>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<remote_base_RemoteReceiverBase>;
}
interface DaikinBrcProps extends _CoreComponent {
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    sensor?: RefProp<sensor_Sensor>;
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<sensor_Sensor>;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<remote_base_RemoteTransmitterBase>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<remote_base_RemoteReceiverBase>;
    /** @yamlKey use_fahrenheit */
    useFahrenheit?: boolean;
}
interface DelonghiProps extends _CoreComponent {
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    sensor?: RefProp<sensor_Sensor>;
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<sensor_Sensor>;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<remote_base_RemoteTransmitterBase>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<remote_base_RemoteReceiverBase>;
}
interface EmmetiProps extends _CoreComponent {
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    sensor?: RefProp<sensor_Sensor>;
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<sensor_Sensor>;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<remote_base_RemoteTransmitterBase>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<remote_base_RemoteReceiverBase>;
}
interface FujitsuGeneralProps extends _CoreComponent {
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    sensor?: RefProp<sensor_Sensor>;
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<sensor_Sensor>;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<remote_base_RemoteTransmitterBase>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<remote_base_RemoteReceiverBase>;
}
interface GreeProps extends _CoreComponent {
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    sensor?: RefProp<sensor_Sensor>;
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<sensor_Sensor>;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<remote_base_RemoteTransmitterBase>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<remote_base_RemoteReceiverBase>;
    model: "generic" | "yan" | "yaa" | "yac" | "yac1fb9" | "yx1ff" | "yag";
}
interface HeatpumpirProps extends _CoreComponent {
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    sensor?: RefProp<sensor_Sensor>;
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<sensor_Sensor>;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<remote_base_RemoteTransmitterBase>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<remote_base_RemoteReceiverBase>;
    protocol: "aux" | "ballu" | "carrier_mca" | "carrier_nqv" | "daikin_arc417" | "daikin_arc480" | "daikin" | "electroluxyal" | "fuego" | "fujitsu_awyz" | "gree" | "greeya" | "greeyan" | "greeyac" | "greeyt" | "greeyap" | "hisense_aud" | "hitachi" | "hyundai" | "ivt" | "midea" | "mitsubishi_fa" | "mitsubishi_fd" | "mitsubishi_fe" | "mitsubishi_heavy_fdtc" | "mitsubishi_heavy_zj" | "mitsubishi_heavy_zm" | "mitsubishi_heavy_zmp" | "mitsubishi_heavy_kj" | "mitsubishi_msc" | "mitsubishi_msy" | "mitsubishi_sez" | "panasonic_ckp" | "panasonic_dke" | "panasonic_eke" | "panasonic_jke" | "panasonic_lke" | "panasonic_nke" | "samsung_aqv" | "samsung_fjm" | "sharp" | "toshiba_daiseikai" | "toshiba" | "zhlt01" | "nibe" | "carrier_qlima_1" | "carrier_qlima_2" | "samsung_aqv12msan" | "zhjg01" | "airway" | "bgh_aud" | "panasonic_altdke" | "philco_phs32" | "vaillantvai8" | "r51m";
    /** @yamlKey horizontal_default */
    horizontalDefault: "auto" | "middle" | "left" | "mleft" | "mright" | "right";
    /** @yamlKey vertical_default */
    verticalDefault: "auto" | "up" | "mup" | "middle" | "mdown" | "down";
    /** @yamlKey min_temperature */
    minTemperature: unknown;
    /** @yamlKey max_temperature */
    maxTemperature: unknown;
}
interface HitachiAc344Props extends _CoreComponent {
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    sensor?: RefProp<sensor_Sensor>;
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<sensor_Sensor>;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<remote_base_RemoteTransmitterBase>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<remote_base_RemoteReceiverBase>;
}
interface HitachiAc424Props extends _CoreComponent {
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    sensor?: RefProp<sensor_Sensor>;
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<sensor_Sensor>;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<remote_base_RemoteTransmitterBase>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<remote_base_RemoteReceiverBase>;
}
interface MideaProps extends _CoreComponent {
    /** [Time](/guides/configuration-types#time): Minimal period between requests to the appliance. Defaults to `1s`. */
    period?: MideaPeriodProps;
    /** [Time](/guides/configuration-types#time): Request response timeout until next request attempt. Defaults to `2s`. */
    timeout?: MideaTimeoutProps;
    /**
     * int: Number of request attempts between 1 and 5 inclusive. Defaults to `3`.
     * @yamlKey num_attempts
     */
    numAttempts?: number;
    /**
     * [ID](/guides/configuration-types#id): Defined and used automatically when using [Remote Transmitter](/components/remo...
     * @yamlKey transmitter_id
     */
    transmitterId?: RefProp<remote_transmitter_RemoteTransmitterComponent>;
    /** boolean: Beeper feedback on command. Defaults to `False`. */
    beeper?: boolean;
    /** boolean: Get capabilities automatically. Allows you not to manually define most of the capabilities of the appliance.... */
    autoconf?: boolean;
    /**
     * list: List of supported modes. Possible values are: `HEAT_COOL`, `COOL`, `HEAT`, `DRY`, `FAN_ONLY`.
     * @yamlKey supported_modes
     */
    supportedModes?: Array<"HEAT_COOL" | "COOL" | "HEAT" | "DRY" | "FAN_ONLY">;
    /**
     * list: List of supported swing modes. Possible values are: `VERTICAL`, `HORIZONTAL`, `BOTH`.
     * @yamlKey supported_swing_modes
     */
    supportedSwingModes?: Array<"BOTH" | "VERTICAL" | "HORIZONTAL">;
    /**
     * list: List of supported presets. Possible values are: `ECO`, `BOOST`, `SLEEP`.
     * @yamlKey supported_presets
     */
    supportedPresets?: Array<"ECO" | "BOOST" | "SLEEP">;
    /**
     * list: List of supported custom presets. Possible values are: `FREEZE_PROTECTION`.
     * @yamlKey custom_presets
     */
    customPresets?: Array<"FREEZE_PROTECTION">;
    /**
     * list: List of supported custom fan modes. Possible values are: `SILENT`, `TURBO`.
     * @yamlKey custom_fan_modes
     */
    customFanModes?: Array<"SILENT" | "TURBO">;
    /**
     * The information for the outdoor temperature sensor.
     * @yamlKey outdoor_temperature
     */
    outdoorTemperature?: MideaOutdoorTemperatureProps;
    /**
     * The information for the current power consumption sensor.
     * @yamlKey power_usage
     */
    powerUsage?: MideaPowerUsageProps;
    /**
     * The information for the humidity indoor sensor (experimental).
     * @yamlKey humidity_setpoint
     */
    humiditySetpoint?: MideaHumiditySetpointProps;
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [Uart](/components/uart/) if you want to use mul...
     * @yamlKey uart_id
     */
    uartId?: RefProp<uart_UARTComponent>;
}
interface MideaIrProps extends _CoreComponent {
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    sensor?: RefProp<sensor_Sensor>;
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<sensor_Sensor>;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<remote_base_RemoteTransmitterBase>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<remote_base_RemoteReceiverBase>;
    /** @yamlKey use_fahrenheit */
    useFahrenheit?: boolean;
}
interface MitsubishiProps extends _CoreComponent {
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    sensor?: RefProp<sensor_Sensor>;
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<sensor_Sensor>;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<remote_base_RemoteTransmitterBase>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<remote_base_RemoteReceiverBase>;
    /** @yamlKey set_fan_mode */
    setFanMode?: "quiet_4levels" | "4levels" | "3levels";
    /** @yamlKey supports_dry */
    supportsDry?: boolean;
    /** @yamlKey supports_fan_only */
    supportsFanOnly?: boolean;
    /** @yamlKey horizontal_default */
    horizontalDefault?: "left" | "middle-left" | "middle" | "middle-right" | "right" | "split";
    /** @yamlKey vertical_default */
    verticalDefault?: "auto" | "up" | "middle-up" | "middle" | "middle-down" | "down";
}
interface NoblexProps extends _CoreComponent {
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    sensor?: RefProp<sensor_Sensor>;
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<sensor_Sensor>;
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<remote_base_RemoteTransmitterBase>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<remote_base_RemoteReceiverBase>;
}
interface PidProps {
    /** [ID](/guides/configuration-types#id): The sensor that is used to measure the current temperature. */
    sensor: RefProp<sensor_Sensor>;
    /**
     * [ID](/guides/configuration-types#id): If specified, this sensor is used to measure the current humidity. This is used...
     * @yamlKey humidity_sensor
     */
    humiditySensor?: RefProp<sensor_Sensor>;
    /**
     * float: The default target temperature (setpoint) for the control algorithm. This can be dynamically set in the fronte...
     * @yamlKey default_target_temperature
     */
    defaultTargetTemperature: unknown;
    /**
     * [ID](/guides/configuration-types#id): The ID of a [float output](/components/output#config-output) that decreases the...
     * @yamlKey cool_output
     */
    coolOutput?: RefProp<output_FloatOutput>;
    /**
     * [ID](/guides/configuration-types#id): The ID of a [float output](/components/output#config-output) that increases the...
     * @yamlKey heat_output
     */
    heatOutput?: RefProp<output_FloatOutput>;
    /**
     * Enables a deadband to stabilise and minimise changes in the output when the temperature is close to the target temper...
     * @yamlKey deadband_parameters
     */
    deadbandParameters?: PidDeadbandParametersProps;
    /**
     * Control parameters of the PID controller.
     * @yamlKey control_parameters
     */
    controlParameters: PidControlParametersProps;
}
interface Tcl112Props extends _CoreComponent {
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    sensor?: RefProp<sensor_Sensor>;
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<sensor_Sensor>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<remote_base_RemoteReceiverBase>;
}
interface ThermostatProps extends _CoreComponent {
    /** [ID](/guides/configuration-types#id): The sensor that is used to measure the current temperature. */
    sensor: RefProp<sensor_Sensor>;
    /**
     * [ID](/guides/configuration-types#id): If specified, this sensor is used to measure the current humidity. This may be ...
     * @yamlKey humidity_sensor
     */
    humiditySensor?: RefProp<sensor_Sensor>;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the climate device should enter its idle state (n...
     * @yamlKey idle_action
     */
    idleAction: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the climate device should enter cooling mode to d...
     * @yamlKey cool_action
     */
    coolAction?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the climate device should activate supplemental c...
     * @yamlKey supplemental_cooling_action
     */
    supplementalCoolingAction?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the climate device should perform its drying (deh...
     * @yamlKey dry_action
     */
    dryAction?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the climate device should activate its fan only (...
     * @yamlKey fan_only_action
     */
    fanOnlyAction?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the climate device should enter heating mode to i...
     * @yamlKey heat_action
     */
    heatAction?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the climate device should activate supplemental h...
     * @yamlKey supplemental_heating_action
     */
    supplementalHeatingAction?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the climate device is placed into "auto" mode (it...
     * @yamlKey auto_mode
     */
    autoMode?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the climate device is placed into cool mode (it m...
     * @yamlKey cool_mode
     */
    coolMode?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the climate device is placed into dry mode (for d...
     * @yamlKey dry_mode
     */
    dryMode?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the climate device is placed into fan-only mode (...
     * @yamlKey fan_only_mode
     */
    fanOnlyMode?: () => void;
    /**
     * [Action](/automations/actions#all-actions) or boolean: The action to call when the climate device is placed into "hea...
     * @yamlKey heat_cool_mode
     */
    heatCoolMode?: unknown;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the climate device is placed into heat mode (it m...
     * @yamlKey heat_mode
     */
    heatMode?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the climate device is placed into "off" mode (it ...
     * @yamlKey off_mode
     */
    offMode?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the fan should run continuously.
     * @yamlKey fan_mode_on_action
     */
    fanModeOnAction?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the fan should never run.
     * @yamlKey fan_mode_off_action
     */
    fanModeOffAction?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the fan should be set to "auto" mode (the fan is ...
     * @yamlKey fan_mode_auto_action
     */
    fanModeAutoAction?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the fan should run at its minimum speed.
     * @yamlKey fan_mode_low_action
     */
    fanModeLowAction?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the fan should run at an intermediate speed.
     * @yamlKey fan_mode_medium_action
     */
    fanModeMediumAction?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the fan should run at its maximum speed.
     * @yamlKey fan_mode_high_action
     */
    fanModeHighAction?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the fan should direct its airflow at an intermedi...
     * @yamlKey fan_mode_middle_action
     */
    fanModeMiddleAction?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the fan should direct its airflow at a specific a...
     * @yamlKey fan_mode_focus_action
     */
    fanModeFocusAction?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the fan should direct its airflow over a broad area.
     * @yamlKey fan_mode_diffuse_action
     */
    fanModeDiffuseAction?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the fan should run at quiet speed.
     * @yamlKey fan_mode_quiet_action
     */
    fanModeQuietAction?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the fan should oscillate in horizontal and vertic...
     * @yamlKey swing_both_action
     */
    swingBothAction?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the fan should oscillate in a horizontal direction.
     * @yamlKey swing_horizontal_action
     */
    swingHorizontalAction?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the fan should remain in a stationary position.
     * @yamlKey swing_off_action
     */
    swingOffAction?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the fan should oscillate in a vertical direction.
     * @yamlKey swing_vertical_action
     */
    swingVerticalAction?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the thermostat's target humidity is changed.
     * @yamlKey target_humidity_change_action
     */
    targetHumidityChangeAction?: () => void;
    /**
     * [Action](/automations/actions#all-actions): The action to call when the thermostat's target temperature(s) is/are cha...
     * @yamlKey target_temperature_change_action
     */
    targetTemperatureChangeAction?: () => void;
    /**
     * [Action](/automations/actions#config-action): The action to call when dehumidification is required.
     * @yamlKey humidity_control_dehumidify_action
     */
    humidityControlDehumidifyAction?: () => void;
    /**
     * [Action](/automations/actions#config-action): The action to call when humidification is required.
     * @yamlKey humidity_control_humidify_action
     */
    humidityControlHumidifyAction?: () => void;
    /**
     * [Action](/automations/actions#config-action): The action to call when (de)humidification should stop. This action is ...
     * @yamlKey humidity_control_off_action
     */
    humidityControlOffAction?: () => void;
    /**
     * float: The maximum humidity differential (above/below the set point) before calling the respective humidity control [...
     * @yamlKey humidity_hysteresis
     */
    humidityHysteresis?: unknown;
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
     * float: For dual-point/dual-function systems, the minimum required temperature difference between the heat and cool se...
     * @yamlKey set_point_minimum_differential
     */
    setPointMinimumDifferential?: unknown;
    /**
     * float: The minimum temperature differential (temperature above the set point) before calling the cooling [action](/au...
     * @yamlKey cool_deadband
     */
    coolDeadband?: unknown;
    /**
     * float: The minimum temperature differential (cooling beyond the set point) before calling the idle [action](/automati...
     * @yamlKey cool_overrun
     */
    coolOverrun?: unknown;
    /**
     * float: The minimum temperature differential (temperature below the set point) before calling the heating [action](/au...
     * @yamlKey heat_deadband
     */
    heatDeadband?: unknown;
    /**
     * float: The minimum temperature differential (heating beyond the set point) before calling the idle [action](/automati...
     * @yamlKey heat_overrun
     */
    heatOverrun?: unknown;
    /**
     * [Time](/guides/configuration-types#time): Duration after which `supplemental_cooling_action` will be called when cool...
     * @yamlKey max_cooling_run_time
     */
    maxCoolingRunTime?: ThermostatMaxCoolingRunTimeProps;
    /**
     * [Time](/guides/configuration-types#time): Duration after which `supplemental_heating_action` will be called when heat...
     * @yamlKey max_heating_run_time
     */
    maxHeatingRunTime?: ThermostatMaxHeatingRunTimeProps;
    /**
     * [Time](/guides/configuration-types#time): Minimum duration the cooling action must be disengaged before it may be eng...
     * @yamlKey min_cooling_off_time
     */
    minCoolingOffTime?: ThermostatMinCoolingOffTimeProps;
    /**
     * [Time](/guides/configuration-types#time): Minimum duration the cooling action must be engaged before it may be diseng...
     * @yamlKey min_cooling_run_time
     */
    minCoolingRunTime?: ThermostatMinCoolingRunTimeProps;
    /**
     * [Time](/guides/configuration-types#time): Minimum duration any given fan mode must be active before it may be changed.
     * @yamlKey min_fan_mode_switching_time
     */
    minFanModeSwitchingTime?: ThermostatMinFanModeSwitchingTimeProps;
    /**
     * [Time](/guides/configuration-types#time): Minimum duration the fanning action must be disengaged before it may be eng...
     * @yamlKey min_fanning_off_time
     */
    minFanningOffTime?: ThermostatMinFanningOffTimeProps;
    /**
     * [Time](/guides/configuration-types#time): Minimum duration the fanning action must be engaged before it may be diseng...
     * @yamlKey min_fanning_run_time
     */
    minFanningRunTime?: ThermostatMinFanningRunTimeProps;
    /**
     * [Time](/guides/configuration-types#time): Minimum duration the heating action must be disengaged before it may be eng...
     * @yamlKey min_heating_off_time
     */
    minHeatingOffTime?: ThermostatMinHeatingOffTimeProps;
    /**
     * [Time](/guides/configuration-types#time): Minimum duration the heating action must be engaged before it may be diseng...
     * @yamlKey min_heating_run_time
     */
    minHeatingRunTime?: ThermostatMinHeatingRunTimeProps;
    /**
     * [Time](/guides/configuration-types#time): Minimum duration the idle action must be active before calling another clim...
     * @yamlKey min_idle_time
     */
    minIdleTime: ThermostatMinIdleTimeProps;
    /**
     * float: When the temperature difference between the upper set point and the current temperature exceeds this value, `s...
     * @yamlKey supplemental_cooling_delta
     */
    supplementalCoolingDelta?: unknown;
    /**
     * float: When the temperature difference between the lower set point and the current temperature exceeds this value, `s...
     * @yamlKey supplemental_heating_delta
     */
    supplementalHeatingDelta?: unknown;
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
     * boolean: If set to `true`, when ESPHome starts, `min_cooling_off_time`, `min_fanning_off_time`, and `min_heating_off_...
     * @yamlKey startup_delay
     */
    startupDelay?: boolean;
    /** @yamlKey away_config */
    awayConfig?: ThermostatAwayConfigProps;
    /** (*Optional*, list) */
    preset?: Array<ThermostatPresetProps>;
    /**
     * (*Optional*, on_boot_restore_from): Controls what the thermostat will do when it first boots. One of:
     * @yamlKey on_boot_restore_from
     */
    onBootRestoreFrom?: "MEMORY" | "DEFAULT_PRESET";
    /**
     * (*Optional*, [Action](/automations/actions#all-actions)): The action to call when the preset is changed. This will be...
     * @yamlKey preset_change
     */
    presetChange?: () => void;
}
interface ToshibaProps extends _CoreComponent {
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    sensor?: RefProp<sensor_Sensor>;
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<sensor_Sensor>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<remote_base_RemoteReceiverBase>;
    model?: "GENERIC" | "RAC-PT1411HWRU-C" | "RAC-PT1411HWRU-F" | "RAS-2819T";
}
interface WhirlpoolProps extends _CoreComponent {
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    sensor?: RefProp<sensor_Sensor>;
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<sensor_Sensor>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<remote_base_RemoteReceiverBase>;
    model?: "DG11J1-3A" | "DG11J1-91";
}
interface WhynterProps extends _CoreComponent {
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    sensor?: RefProp<sensor_Sensor>;
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<sensor_Sensor>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<remote_base_RemoteReceiverBase>;
    /** @yamlKey use_fahrenheit */
    useFahrenheit?: boolean;
}
interface YashimaProps extends _CoreComponent {
    /** @yamlKey transmitter_id */
    transmitterId?: RefProp<remote_transmitter_RemoteTransmitterComponent>;
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    sensor?: RefProp<sensor_Sensor>;
}
interface Zhlt01Props extends _CoreComponent {
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    sensor?: RefProp<sensor_Sensor>;
    /** @yamlKey humidity_sensor */
    humiditySensor?: RefProp<sensor_Sensor>;
    /** @yamlKey receiver_id */
    receiverId?: RefProp<remote_base_RemoteReceiverBase>;
}
interface BedjetProps extends _CoreComponent, _BedjetClient {
    /**
     * string: The primary heating mode to use for `HVACMode.HEAT` :
     * @yamlKey heat_mode
     */
    heatMode?: "heat" | "extended";
    /**
     * string: The temperature that should be used as the climate entity's current temperature:
     * @yamlKey temperature_source
     */
    temperatureSource?: "outlet" | "ambient";
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface HaierSMARTAIR2Props extends _CoreComponent {
    /**
     * list: Can be used to disable some of AC modes. Possible values: `'OFF'`, `HEAT_COOL`, `COOL`, `HEAT`, `DRY`, `FAN_ONLY`.
     * @yamlKey supported_modes
     */
    supportedModes?: Array<"OFF" | "HEAT_COOL" | "COOL" | "HEAT" | "DRY" | "FAN_ONLY">;
    /**
     * list: Can be used to disable some swing modes if your AC does not support it. Possible values: `'OFF'`, `VERTICAL`, `...
     * @yamlKey supported_swing_modes
     */
    supportedSwingModes?: Array<"OFF" | "VERTICAL" | "HORIZONTAL" | "BOTH">;
    /**
     * boolean: If `true` - send wifi signal level to AC.
     * @yamlKey wifi_signal
     */
    wifiSignal?: boolean;
    /** boolean: Can be used to set the AC display off. */
    display?: boolean;
    /**
     * [Time](/guides/configuration-types#time): Responce timeout. The default value is `200ms`.
     * @yamlKey answer_timeout
     */
    answerTimeout?: HaierSMARTAIR2AnswerTimeoutProps;
    /**
     * [Automation](/automations): Automation to perform when status message received from AC. See [`on_status_message` Trig...
     * @yamlKey on_status_message
     */
    onStatusMessage?: () => void;
    /**
     * [ID](/guides/configuration-types#id): ID of the UART port to communicate with AC.
     * @yamlKey uart_id
     */
    uartId?: RefProp<uart_UARTComponent>;
    /**
     * boolean: (supported by smartAir2 only) If `true` - use alternative values to control swing mode. Use only if the orig...
     * @yamlKey alternative_swing_control
     */
    alternativeSwingControl?: boolean;
    /**
     * list: Can be used to disable some presets. Possible values for smartair2 are: `AWAY`, `BOOST`, `COMFORT`. Possible va...
     * @yamlKey supported_presets
     */
    supportedPresets?: Array<"AWAY" | "BOOST" | "COMFORT">;
}
interface HaierHONProps extends _CoreComponent {
    /**
     * list: Can be used to disable some of AC modes. Possible values: `'OFF'`, `HEAT_COOL`, `COOL`, `HEAT`, `DRY`, `FAN_ONLY`.
     * @yamlKey supported_modes
     */
    supportedModes?: Array<"OFF" | "HEAT_COOL" | "COOL" | "HEAT" | "DRY" | "FAN_ONLY">;
    /**
     * list: Can be used to disable some swing modes if your AC does not support it. Possible values: `'OFF'`, `VERTICAL`, `...
     * @yamlKey supported_swing_modes
     */
    supportedSwingModes?: Array<"OFF" | "VERTICAL" | "HORIZONTAL" | "BOTH">;
    /**
     * boolean: If `true` - send wifi signal level to AC.
     * @yamlKey wifi_signal
     */
    wifiSignal?: boolean;
    /** boolean: Can be used to set the AC display off. */
    display?: boolean;
    /**
     * [Time](/guides/configuration-types#time): Responce timeout. The default value is `200ms`.
     * @yamlKey answer_timeout
     */
    answerTimeout?: HaierHONAnswerTimeoutProps;
    /**
     * [Automation](/automations): Automation to perform when status message received from AC. See [`on_status_message` Trig...
     * @yamlKey on_status_message
     */
    onStatusMessage?: () => void;
    /**
     * [ID](/guides/configuration-types#id): ID of the UART port to communicate with AC.
     * @yamlKey uart_id
     */
    uartId?: RefProp<uart_UARTComponent>;
    /**
     * list: (supported only by hOn) Defines control method (should be supported by AC). Supported values: `MONITOR_ONLY` - ...
     * @yamlKey control_method
     */
    controlMethod?: Array<"MONITOR_ONLY" | "SET_GROUP_PARAMETERS" | "SET_SINGLE_PARAMETER">;
    /**
     * int: (supported only by hOn) Define the size of the control packet. Can help with some newer models of ACs that use b...
     * @yamlKey control_packet_size
     */
    controlPacketSize?: number;
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
     * list: Can be used to disable some presets. Possible values for smartair2 are: `AWAY`, `BOOST`, `COMFORT`. Possible va...
     * @yamlKey supported_presets
     */
    supportedPresets?: Array<"AWAY" | "BOOST" | "SLEEP">;
    /**
     * [Automation](/automations): (supported only by hOn) Automation to perform when AC activates a new alarm. See [`on_ala...
     * @yamlKey on_alarm_start
     */
    onAlarmStart?: () => void;
    /**
     * [Automation](/automations): (supported only by hOn) Automation to perform when AC deactivates a new alarm. See [`on_a...
     * @yamlKey on_alarm_end
     */
    onAlarmEnd?: () => void;
}
interface TuyaProps extends _CoreComponent {
    /** @yamlKey tuya_id */
    tuyaId?: RefProp<tuya_Tuya>;
    /** @yamlKey supports_heat */
    supportsHeat?: boolean;
    /** @yamlKey supports_cool */
    supportsCool?: boolean;
    /** @yamlKey switch_datapoint */
    switchDatapoint?: number;
    /** @yamlKey active_state */
    activeState?: TuyaActiveStateProps;
    /** @yamlKey heating_state_pin */
    heatingStatePin?: Pin;
    /** @yamlKey cooling_state_pin */
    coolingStatePin?: Pin;
    /** @yamlKey target_temperature_datapoint */
    targetTemperatureDatapoint?: number;
    /** @yamlKey current_temperature_datapoint */
    currentTemperatureDatapoint?: number;
    /** @yamlKey temperature_multiplier */
    temperatureMultiplier?: unknown;
    /** @yamlKey current_temperature_multiplier */
    currentTemperatureMultiplier?: unknown;
    /** @yamlKey target_temperature_multiplier */
    targetTemperatureMultiplier?: unknown;
    /** @yamlKey reports_fahrenheit */
    reportsFahrenheit?: boolean;
    preset?: TuyaPresetProps;
    /** @yamlKey fan_mode */
    fanMode?: TuyaFanModeProps;
    /** @yamlKey swing_mode */
    swingMode?: TuyaSwingModeProps;
}
interface UponorSmatrixProps extends _UponorSmatrixDevice {
}
export type ClimateProps = (ClimateBaseProps & {
    platform: "anova";
} & AnovaProps & ComponentProps<anova_Anova>) | (ClimateBaseProps & {
    platform: "ballu";
} & BalluProps & ComponentProps<ballu_BalluClimate>) | (ClimateBaseProps & {
    platform: "bang_bang";
} & BangBangProps & ComponentProps<bang_bang_BangBangClimate>) | (ClimateBaseProps & {
    platform: "climate_ir_lg";
} & ClimateIrLgProps & ComponentProps<climate_ir_lg_LgIrClimate>) | (ClimateBaseProps & {
    platform: "coolix";
} & CoolixProps & ComponentProps<coolix_CoolixClimate>) | (ClimateBaseProps & {
    platform: "daikin";
} & DaikinProps & ComponentProps<daikin_DaikinClimate>) | (ClimateBaseProps & {
    platform: "daikin_arc";
} & DaikinArcProps & ComponentProps<daikin_arc_DaikinArcClimate>) | (ClimateBaseProps & {
    platform: "daikin_brc";
} & DaikinBrcProps & ComponentProps<daikin_brc_DaikinBrcClimate>) | (ClimateBaseProps & {
    platform: "delonghi";
} & DelonghiProps & ComponentProps<delonghi_DelonghiClimate>) | (ClimateBaseProps & {
    platform: "emmeti";
} & EmmetiProps & ComponentProps<emmeti_EmmetiClimate>) | (ClimateBaseProps & {
    platform: "fujitsu_general";
} & FujitsuGeneralProps & ComponentProps<fujitsu_general_FujitsuGeneralClimate>) | (ClimateBaseProps & {
    platform: "gree";
} & GreeProps & ComponentProps<gree_GreeClimate>) | (ClimateBaseProps & {
    platform: "heatpumpir";
} & HeatpumpirProps & ComponentProps<heatpumpir_HeatpumpIRClimate>) | (ClimateBaseProps & {
    platform: "hitachi_ac344";
} & HitachiAc344Props & ComponentProps<hitachi_ac344_HitachiClimate>) | (ClimateBaseProps & {
    platform: "hitachi_ac424";
} & HitachiAc424Props & ComponentProps<hitachi_ac424_HitachiClimate>) | (ClimateBaseProps & {
    platform: "midea";
} & MideaProps & ComponentProps<midea_ac_AirConditioner>) | (ClimateBaseProps & {
    platform: "midea_ac";
} & ComponentProps<mqtt_MQTTClimateComponent>) | (ClimateBaseProps & {
    platform: "midea_ir";
} & MideaIrProps & ComponentProps<midea_ir_MideaIR>) | (ClimateBaseProps & {
    platform: "mitsubishi";
} & MitsubishiProps & ComponentProps<mitsubishi_MitsubishiClimate>) | (ClimateBaseProps & {
    platform: "noblex";
} & NoblexProps & ComponentProps<noblex_NoblexClimate>) | (ClimateBaseProps & {
    platform: "pid";
} & PidProps & ComponentProps<pid_PIDClimate>) | (ClimateBaseProps & {
    platform: "tcl112";
} & Tcl112Props & ComponentProps<tcl112_Tcl112Climate>) | (ClimateBaseProps & {
    platform: "thermostat";
} & ThermostatProps & ComponentProps<thermostat_ThermostatClimate>) | (ClimateBaseProps & {
    platform: "toshiba";
} & ToshibaProps & ComponentProps<toshiba_ToshibaClimate>) | (ClimateBaseProps & {
    platform: "whirlpool";
} & WhirlpoolProps & ComponentProps<whirlpool_WhirlpoolClimate>) | (ClimateBaseProps & {
    platform: "whynter";
} & WhynterProps & ComponentProps<whynter_Whynter>) | (ClimateBaseProps & {
    platform: "yashima";
} & YashimaProps & ComponentProps<yashima_YashimaClimate>) | (ClimateBaseProps & {
    platform: "zhlt01";
} & Zhlt01Props & ComponentProps<zhlt01_ZHLT01Climate>) | (ClimateBaseProps & {
    platform: "bedjet";
} & BedjetProps & ComponentProps<bedjet_BedJetClimate>) | (ClimateBaseProps & {
    platform: "haier";
    protocol: "SMARTAIR2";
} & HaierSMARTAIR2Props & ComponentProps<haier_Smartair2Climate>) | (ClimateBaseProps & {
    platform: "haier";
    protocol: "HON";
} & HaierHONProps & ComponentProps<haier_HonClimate>) | (ClimateBaseProps & {
    platform: "tuya";
} & TuyaProps & ComponentProps<tuya_TuyaClimate>) | (ClimateBaseProps & {
    platform: "uponor_smatrix";
} & UponorSmatrixProps & ComponentProps<uponor_smatrix_UponorSmatrixClimate>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            climate: ClimateProps;
        }
    }
}
