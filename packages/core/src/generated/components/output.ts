// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _BleClient, _CoreComponent, _Emc2101Component, _ModbusControllerModbusitembaseschema, _OutputBinaryOutput, _OutputFloatOutput, _PipsolarComponent } from "../bases";
import type { __marker_ac_dimmer_AcDimmer, __marker_ble_client_BLEBinaryOutput, __marker_bp1658cj_BP1658CJ, __marker_bp1658cj_BP1658CJ_Channel, __marker_bp5758d_BP5758D, __marker_bp5758d_BP5758D_Channel, __marker_dac7678_DAC7678Channel, __marker_dac7678_DAC7678Output, __marker_emc2101_EMC2101Output, __marker_esp32_dac_ESP32DAC, __marker_esp8266_pwm_ESP8266PWM, __marker_gp8403_GP8403Component, __marker_gp8403_GP8403Output, __marker_gpio_GPIOBinaryOutput, __marker_i2c_I2CBus, __marker_ledc_LEDCOutput, __marker_libretiny_pwm_LibreTinyPWM, __marker_max6956_MAX6956, __marker_max6956_MAX6956LedChannel, __marker_mcp4461_Mcp4461Component, __marker_mcp4461_Mcp4461Wiper, __marker_mcp4725_MCP4725, __marker_mcp4728_MCP4728Channel, __marker_mcp4728_MCP4728Component, __marker_mcp47a1_MCP47A1, __marker_modbus_controller_ModbusBinaryOutput, __marker_modbus_controller_ModbusFloatOutput, __marker_my9231_MY9231OutputComponent, __marker_my9231_MY9231OutputComponent_Channel, __marker_opentherm_OpenthermHub, __marker_pca9685_PCA9685Channel, __marker_pca9685_PCA9685Output, __marker_power_supply_PowerSupply, __marker_rp2040_pwm_RP2040PWM, __marker_sigma_delta_output_SigmaDeltaOutput, __marker_slow_pwm_SlowPWMOutput, __marker_sm16716_SM16716, __marker_sm16716_SM16716_Channel, __marker_sm2135_SM2135, __marker_sm2135_SM2135_Channel, __marker_sm2235_SM2235, __marker_sm2235_SM2235_Channel, __marker_sm2335_SM2335, __marker_sm2335_SM2335_Channel, __marker_sx1509_SX1509Component, __marker_sx1509_SX1509FloatOutputChannel, __marker_template__TemplateBinaryOutput, __marker_template__TemplateFloatOutput, __marker_tlc59208f_TLC59208FChannel, __marker_tlc59208f_TLC59208FOutput, __marker_tlc5947_TLC5947, __marker_tlc5947_TLC5947Channel, __marker_tlc5971_TLC5971, __marker_tlc5971_TLC5971Channel, __marker_tm1638_TM1638Component, __marker_tm1638_TM1638OutputLed, __marker_x9c_X9cOutput } from "../markers";
interface OpenthermCoolingControlProps {
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** @yamlKey power_supply */
    powerSupply?: RefProp<__marker_power_supply_PowerSupply>;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
}
interface OpenthermMaxRelModLevelProps {
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** @yamlKey power_supply */
    powerSupply?: RefProp<__marker_power_supply_PowerSupply>;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
}
interface OpenthermMaxTSetProps {
    /** @yamlKey auto_max_value */
    autoMaxValue?: boolean;
    /** @yamlKey auto_min_value */
    autoMinValue?: boolean;
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** @yamlKey power_supply */
    powerSupply?: RefProp<__marker_power_supply_PowerSupply>;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
}
interface OpenthermOtcHcRatioProps {
    /** @yamlKey auto_max_value */
    autoMaxValue?: boolean;
    /** @yamlKey auto_min_value */
    autoMinValue?: boolean;
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** @yamlKey power_supply */
    powerSupply?: RefProp<__marker_power_supply_PowerSupply>;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
}
interface OpenthermTDhwSetProps {
    /** @yamlKey auto_max_value */
    autoMaxValue?: boolean;
    /** @yamlKey auto_min_value */
    autoMinValue?: boolean;
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** @yamlKey power_supply */
    powerSupply?: RefProp<__marker_power_supply_PowerSupply>;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
}
interface OpenthermTRoomProps {
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** @yamlKey power_supply */
    powerSupply?: RefProp<__marker_power_supply_PowerSupply>;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
}
interface OpenthermTRoomSetProps {
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** @yamlKey power_supply */
    powerSupply?: RefProp<__marker_power_supply_PowerSupply>;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
}
interface OpenthermTRoomSetCh2Props {
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** @yamlKey power_supply */
    powerSupply?: RefProp<__marker_power_supply_PowerSupply>;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
}
interface OpenthermTSetProps {
    /** @yamlKey auto_max_value */
    autoMaxValue?: boolean;
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** @yamlKey power_supply */
    powerSupply?: RefProp<__marker_power_supply_PowerSupply>;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
}
interface OpenthermTSetCh2Props {
    /** @yamlKey auto_max_value */
    autoMaxValue?: boolean;
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey max_value */
    maxValue?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** @yamlKey power_supply */
    powerSupply?: RefProp<__marker_power_supply_PowerSupply>;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
}
interface PipsolarBatteryFloatVoltageProps {
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /**
     * list: a list of possible values default: 48.0,49.0,50.0,51.0
     * @yamlKey possible_values
     */
    possibleValues?: Array<number>;
    /** @yamlKey power_supply */
    powerSupply?: RefProp<__marker_power_supply_PowerSupply>;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
}
interface PipsolarBatteryRechargeVoltageProps {
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /**
     * list: a list of possible values default: 44.0,45.0,46.0,47.0,48.0,49.0,50.0,51.0
     * @yamlKey possible_values
     */
    possibleValues?: Array<number>;
    /** @yamlKey power_supply */
    powerSupply?: RefProp<__marker_power_supply_PowerSupply>;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
}
interface PipsolarBatteryRedischargeVoltageProps {
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /**
     * list: a list of possible values default: 00.0,48.0,49,50.0,51.0,52,53,54,55,56,57,58
     * @yamlKey possible_values
     */
    possibleValues?: Array<number>;
    /** @yamlKey power_supply */
    powerSupply?: RefProp<__marker_power_supply_PowerSupply>;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
}
interface PipsolarBatteryTypeProps {
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /**
     * list: a list of possible values default: 0,1,2
     * @yamlKey possible_values
     */
    possibleValues?: Array<number>;
    /** @yamlKey power_supply */
    powerSupply?: RefProp<__marker_power_supply_PowerSupply>;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
}
interface PipsolarBatteryUnderVoltageProps {
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /**
     * list: a list of possible values default: 40.0,40.1,42,43,44,45,46,47,48.0
     * @yamlKey possible_values
     */
    possibleValues?: Array<number>;
    /** @yamlKey power_supply */
    powerSupply?: RefProp<__marker_power_supply_PowerSupply>;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
}
interface PipsolarChargerSourcePriorityProps {
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /**
     * list: a list of possible values default: 0,1,2,3
     * @yamlKey possible_values
     */
    possibleValues?: Array<number>;
    /** @yamlKey power_supply */
    powerSupply?: RefProp<__marker_power_supply_PowerSupply>;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
}
interface PipsolarCurrentMaxAcChargingCurrentProps {
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /**
     * list: a list of possible values default: 2,10,20
     * @yamlKey possible_values
     */
    possibleValues?: Array<number>;
    /** @yamlKey power_supply */
    powerSupply?: RefProp<__marker_power_supply_PowerSupply>;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
}
interface PipsolarCurrentMaxChargingCurrentProps {
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /**
     * list: a list of possible values default: 10,20,30,40
     * @yamlKey possible_values
     */
    possibleValues?: Array<number>;
    /** @yamlKey power_supply */
    powerSupply?: RefProp<__marker_power_supply_PowerSupply>;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
}
interface PipsolarOutputSourcePriorityProps {
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /**
     * list: a list of possible values default: 0,1,2
     * @yamlKey possible_values
     */
    possibleValues?: Array<number>;
    /** @yamlKey power_supply */
    powerSupply?: RefProp<__marker_power_supply_PowerSupply>;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
}
interface AcDimmerProps extends _OutputFloatOutput, _CoreComponent {
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The pin used to control the Triac or Mosfet.
     * @yamlKey gate_pin
     */
    gatePin: Pin;
    /**
     * boolean: Will send the first full half AC cycle Try to use this for dimmable LED lights, it might help turning on at ...
     * @yamlKey init_with_half_cycle
     */
    initWithHalfCycle?: boolean;
    /** Set the method for dimming, can be: */
    method?: "LEADING" | "LEADING_PULSE" | "TRAILING";
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The pin used to sense the AC Zero cross event, you can have...
     * @yamlKey zero_cross_pin
     */
    zeroCrossPin: Pin;
}
interface BleClientProps extends _OutputBinaryOutput, _CoreComponent, _BleClient {
    /** @yamlKey characteristic_uuid */
    characteristicUuid: unknown;
    /** @yamlKey require_response */
    requireResponse?: boolean;
    /** @yamlKey service_uuid */
    serviceUuid: unknown;
}
interface Bp1658cjProps extends _OutputFloatOutput, _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [Component/Hub](https://esphom...
     * @yamlKey bp1658cj_id
     */
    bp1658cjId?: RefProp<__marker_bp1658cj_BP1658CJ>;
    /** int: Chose the channel of the BP1658CJ chain of this output component. */
    channel: number;
}
interface Bp5758dProps extends _OutputFloatOutput, _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [Component/Hub](https://esphom...
     * @yamlKey bp5758d_id
     */
    bp5758dId?: RefProp<__marker_bp5758d_BP5758D>;
    /** int: Chose the channel of the BP5758D chain of this output component. Valid values are 1-5. */
    channel: number;
    /** int: Current in mA, valid values are 0-90, default 10. */
    current?: number;
}
interface Dac7678Props extends _OutputFloatOutput {
    /** int: Chose the channel of the DAC7678 of this output component. Must be in range from 0 to 7. */
    channel: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [DAC7678 hub](https://esphome....
     * @yamlKey dac7678_id
     */
    dac7678Id?: RefProp<__marker_dac7678_DAC7678Output>;
}
interface Emc2101Props extends _Emc2101Component {
}
interface Esp32DacProps extends _OutputFloatOutput, _CoreComponent {
    /** [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin to use DAC on. See above for valid pi... */
    pin: Pin;
}
interface Esp8266PwmProps extends _OutputFloatOutput, _CoreComponent {
    /** frequency: The frequency to run the PWM with. Lower frequencies have more visual artifacts, but can represent much mo... */
    frequency?: number;
    /** [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin to use PWM on. */
    pin: Pin;
}
interface Gp8403Props extends _OutputFloatOutput, _CoreComponent {
    /** int: The channel of the GP8403 to use. Must be `0` or `1`. */
    channel: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the GP8403 component. Defaults to the only GP8403 c...
     * @yamlKey gp8403_id
     */
    gp8403Id?: RefProp<__marker_gp8403_GP8403Component>;
}
interface GpioProps extends _OutputBinaryOutput, _CoreComponent {
    /** [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin to turn on and off. */
    pin: Pin;
}
interface LedcProps extends _OutputFloatOutput, _CoreComponent {
    /** int: Manually set the [LEDC channel](https://docs.espressif.com/projects/esp-idf/en/latest/api-reference/peripherals/... */
    channel?: number;
    /** frequency: At which frequency to run the LEDC channel's timer. Defaults to `1kHz`. */
    frequency?: unknown;
    /**
     * float: Set a phase angle to the other channel of this timer. Range 0-360°, defaults to 0°
     * @yamlKey phase_angle
     */
    phaseAngle?: number;
    /** [Pin](https://esphome.io/guides/configuration-types#pin): The pin to use LEDC on. Can only be GPIO0-GPIO33. */
    pin: Pin;
}
interface LibretinyPwmProps extends _OutputFloatOutput, _CoreComponent {
    /** frequency: The frequency to run the PWM with. Lower frequencies have more visual artifacts, but can represent much mo... */
    frequency?: unknown;
    /** [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin to use PWM on. */
    pin: Pin;
}
interface Max6956Props extends _OutputFloatOutput, _CoreComponent {
    max6956?: RefProp<__marker_max6956_MAX6956>;
    pin: number;
}
interface Mcp4461Props extends _OutputFloatOutput {
    /** string: Choose the channel of this MCP4461 output component. One of `A`, `B`, `C`, `D`, `E`, `F`, `G` or `H`. */
    channel: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
    /**
     * float: Set initial wiper value, valid range is `0 - 1.0`
     * @yamlKey initial_value
     */
    initialValue?: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [MCP4461](https://esphome.io/c...
     * @yamlKey mcp4461_id
     */
    mcp4461Id?: RefProp<__marker_mcp4461_Mcp4461Component>;
    /**
     * bool: Set to `false` if terminal "A" shall be disabled on boot. Defaults to `true`
     * @yamlKey terminal_a
     */
    terminalA?: boolean;
    /**
     * bool: Set to `false` if terminal "B" shall be disabled on boot. Defaults to `true`
     * @yamlKey terminal_b
     */
    terminalB?: boolean;
    /**
     * bool: Set to `false` if terminal "W" shall be disabled on boot. Defaults to `true`
     * @yamlKey terminal_w
     */
    terminalW?: boolean;
}
interface Mcp4725Props extends _OutputFloatOutput, _CoreComponent {
    /** int: Manually specify the I2C address of the DAC. Defaults to `0x60`. */
    address?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
}
interface Mcp4728Props extends _OutputFloatOutput {
    /** string: Chose the channel of the MCP4728 chain of this output component. One of `A`, `B`, `C` or `D`. */
    channel: "A" | "B" | "C" | "D";
    /** string: Chose the GAIN multiplier for internal VREF. One of `X1` or `X2`. Only useful when `vdd=internal`. Defaults t... */
    gain?: "X1" | "X2";
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [MCP4728](https://esphome.io/c...
     * @yamlKey mcp4728_id
     */
    mcp4728Id?: RefProp<__marker_mcp4728_MCP4728Component>;
    /**
     * string: Chose the power down mode. In power down mode (value different from `normal` ) the output pin will be connect...
     * @yamlKey power_down
     */
    powerDown?: "gnd_100k" | "gnd_1k" | "gnd_500k" | "normal";
    /** string: Chose the VREF source. One of `vdd` or `internal`. Defaults to `vdd`. */
    vref?: "internal" | "vdd";
}
interface Mcp47a1Props extends _OutputFloatOutput, _CoreComponent {
    /** int: Manually specify the I²C address of the DAC. Defaults to `0x2E`. */
    address?: number;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
}
interface ModbusControllerCoilProps extends _OutputBinaryOutput, _ModbusControllerModbusitembaseschema {
    /** @yamlKey use_write_multiple */
    useWriteMultiple?: boolean;
    /** @yamlKey write_lambda */
    writeLambda?: unknown;
}
interface ModbusControllerHoldingProps extends _OutputFloatOutput, _ModbusControllerModbusitembaseschema {
    multiply?: unknown;
    /** @yamlKey use_write_multiple */
    useWriteMultiple?: boolean;
    /** @yamlKey value_type */
    valueType?: "FP32" | "FP32_R" | "RAW" | "S_DWORD" | "S_DWORD_R" | "S_QWORD" | "S_QWORD_R" | "S_WORD" | "U_DWORD" | "U_DWORD_R" | "U_QWORD" | "U_QWORD_R" | "U_WORD";
    /** @yamlKey write_lambda */
    writeLambda?: unknown;
}
interface My9231Props extends _OutputFloatOutput, _CoreComponent {
    /** int: Chose the channel of the MY9231/MY9291 chain of this output component. Channel 0 is the most close channel. */
    channel: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [Component/Hub](https://esphom...
     * @yamlKey my9231_id
     */
    my9231Id?: RefProp<__marker_my9231_MY9231OutputComponent>;
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
interface Pca9685Props extends _OutputFloatOutput {
    /** int: Choose the channel of the PCA9685 of this output component. Must be in range from 0 to 15. */
    channel: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [PCA9685 hub](https://esphome....
     * @yamlKey pca9685_id
     */
    pca9685Id?: RefProp<__marker_pca9685_PCA9685Output>;
}
interface PipsolarProps extends _PipsolarComponent {
    /**
     * battery float voltage;
     * @yamlKey battery_float_voltage
     */
    batteryFloatVoltage?: PipsolarBatteryFloatVoltageProps;
    /**
     * battery recharge voltage;
     * @yamlKey battery_recharge_voltage
     */
    batteryRechargeVoltage?: PipsolarBatteryRechargeVoltageProps;
    /**
     * battery redischarge voltage;
     * @yamlKey battery_redischarge_voltage
     */
    batteryRedischargeVoltage?: PipsolarBatteryRedischargeVoltageProps;
    /**
     * battery type;
     * @yamlKey battery_type
     */
    batteryType?: PipsolarBatteryTypeProps;
    /**
     * battery under voltage;
     * @yamlKey battery_under_voltage
     */
    batteryUnderVoltage?: PipsolarBatteryUnderVoltageProps;
    /**
     * charger source priority;
     * @yamlKey charger_source_priority
     */
    chargerSourcePriority?: PipsolarChargerSourcePriorityProps;
    /**
     * current max ac charging current;
     * @yamlKey current_max_ac_charging_current
     */
    currentMaxAcChargingCurrent?: PipsolarCurrentMaxAcChargingCurrentProps;
    /**
     * current max charging current;
     * @yamlKey current_max_charging_current
     */
    currentMaxChargingCurrent?: PipsolarCurrentMaxChargingCurrentProps;
    /**
     * output source priority;
     * @yamlKey output_source_priority
     */
    outputSourcePriority?: PipsolarOutputSourcePriorityProps;
}
interface Rp2040PwmProps extends _OutputFloatOutput, _CoreComponent {
    frequency?: number;
    pin: Pin;
}
interface SigmaDeltaOutputProps extends _OutputFloatOutput, _CoreComponent {
    /** [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin to pulse. */
    pin?: Pin;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the load is switched. If a lambda is used...
     * @yamlKey state_change_action
     */
    stateChangeAction?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the load is turned off. `turn_on_action` ...
     * @yamlKey turn_off_action
     */
    turnOffAction?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the load is turned on. Can be used to con...
     * @yamlKey turn_on_action
     */
    turnOnAction?: TriggerHandler;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The cycle interval at which the output is recalculated. D...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
interface SlowPwmProps extends _OutputFloatOutput, _CoreComponent {
    /** [Time](https://esphome.io/guides/configuration-types#time): The duration of each cycle. (i.e. a 10s period at 50% dut... */
    period: TimePeriod;
    /** [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin to pulse. */
    pin?: Pin;
    /**
     * boolean: Restart a timer of a cycle when new state is set. Defaults to `false`.
     * @yamlKey restart_cycle_on_state_change
     */
    restartCycleOnStateChange?: boolean;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the load is switched. If a lambda is used...
     * @yamlKey state_change_action
     */
    stateChangeAction?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the load is turned off. `turn_on_action` ...
     * @yamlKey turn_off_action
     */
    turnOffAction?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the load is turned on. Can be used to con...
     * @yamlKey turn_on_action
     */
    turnOnAction?: TriggerHandler;
}
interface Sm16716Props extends _OutputFloatOutput, _CoreComponent {
    /** int: Chose the channel of the SM16716 chain of this output component. */
    channel: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [Component/Hub](https://esphom...
     * @yamlKey sm16716_id
     */
    sm16716Id?: RefProp<__marker_sm16716_SM16716>;
}
interface Sm2135Props extends _OutputFloatOutput, _CoreComponent {
    /** int: Chose the channel of the SM2135 chain of this output component. */
    channel: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [Component/Hub](https://esphom...
     * @yamlKey sm2135_id
     */
    sm2135Id?: RefProp<__marker_sm2135_SM2135>;
}
interface Sm2235Props extends _OutputFloatOutput, _CoreComponent {
    /** int: Chose the channel of the SM2235 chain of this output component. */
    channel: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [Component/Hub](https://esphom...
     * @yamlKey sm2235_id
     */
    sm2235Id?: RefProp<__marker_sm2235_SM2235>;
}
interface Sm2335Props extends _OutputFloatOutput, _CoreComponent {
    /** int: Chose the channel of the SM2335 chain of this output component. */
    channel: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [Component/Hub](https://esphom...
     * @yamlKey sm2335_id
     */
    sm2335Id?: RefProp<__marker_sm2335_SM2335>;
}
interface Sx1509Props extends _OutputFloatOutput, _CoreComponent {
    pin: number;
    /** @yamlKey sx1509_id */
    sx1509Id?: RefProp<__marker_sx1509_SX1509Component>;
}
interface TemplateBinaryProps extends _OutputBinaryOutput {
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the state of the output is updated.
     * @yamlKey write_action
     */
    writeAction: TriggerHandler;
}
interface TemplateFloatProps extends _OutputFloatOutput {
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the state of the output is updated.
     * @yamlKey write_action
     */
    writeAction: TriggerHandler;
}
interface Tlc59208fProps extends _OutputFloatOutput {
    /** int: Choose the channel of the TLC59208F for this output component. Must be in range from 0 to 7. */
    channel: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [TLC59208F chip](https://espho...
     * @yamlKey tlc59208f_id
     */
    tlc59208fId?: RefProp<__marker_tlc59208f_TLC59208FOutput>;
}
interface Tlc5947Props extends _OutputFloatOutput, _CoreComponent {
    /** int: Chose the channel of the TLC5947 chain of this output component. */
    channel: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [TLC5947-component](https://es...
     * @yamlKey tlc5947_id
     */
    tlc5947Id?: RefProp<__marker_tlc5947_TLC5947>;
}
interface Tlc5971Props extends _OutputFloatOutput, _CoreComponent {
    /** int: Chose the channel of the TLC5971 chain of this output component. */
    channel: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [TLC5971-component](https://es...
     * @yamlKey tlc5971_id
     */
    tlc5971Id?: RefProp<__marker_tlc5971_TLC5971>;
}
interface Tm1638Props extends _OutputBinaryOutput, _CoreComponent {
    led: number;
    /** @yamlKey tm1638_id */
    tm1638Id?: RefProp<__marker_tm1638_TM1638Component>;
}
interface X9cProps extends _OutputFloatOutput {
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): Chip Select pin
     * @yamlKey cs_pin
     */
    csPin: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): Increment pin
     * @yamlKey inc_pin
     */
    incPin: Pin;
    /**
     * float: Manually specify the initial potentiometer value, between `0.01` and `1.0`. Defaults to `1.0`.
     * @yamlKey initial_value
     */
    initialValue?: number;
    /**
     * int: Manually specify the delay between steps (in microseconds) between `1us` and `100us`. Defaults to `1us`.
     * @yamlKey step_delay
     */
    stepDelay?: number;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): Up/Down pin
     * @yamlKey ud_pin
     */
    udPin: Pin;
}
export type OutputProps = ({
    platform: "ac_dimmer";
} & AcDimmerProps & ComponentProps<__marker_ac_dimmer_AcDimmer>) | ({
    platform: "ble_client";
} & BleClientProps & ComponentProps<__marker_ble_client_BLEBinaryOutput>) | ({
    platform: "bp1658cj";
} & Bp1658cjProps & ComponentProps<__marker_bp1658cj_BP1658CJ_Channel>) | ({
    platform: "bp5758d";
} & Bp5758dProps & ComponentProps<__marker_bp5758d_BP5758D_Channel>) | ({
    platform: "dac7678";
} & Dac7678Props & ComponentProps<__marker_dac7678_DAC7678Channel>) | ({
    platform: "emc2101";
} & Emc2101Props & ComponentProps<__marker_emc2101_EMC2101Output>) | ({
    platform: "esp32_dac";
} & Esp32DacProps & ComponentProps<__marker_esp32_dac_ESP32DAC>) | ({
    platform: "esp8266_pwm";
} & Esp8266PwmProps & ComponentProps<__marker_esp8266_pwm_ESP8266PWM>) | ({
    platform: "gp8403";
} & Gp8403Props & ComponentProps<__marker_gp8403_GP8403Output>) | ({
    platform: "gpio";
} & GpioProps & ComponentProps<__marker_gpio_GPIOBinaryOutput>) | ({
    platform: "ledc";
} & LedcProps & ComponentProps<__marker_ledc_LEDCOutput>) | ({
    platform: "libretiny_pwm";
} & LibretinyPwmProps & ComponentProps<__marker_libretiny_pwm_LibreTinyPWM>) | ({
    platform: "max6956";
} & Max6956Props & ComponentProps<__marker_max6956_MAX6956LedChannel>) | ({
    platform: "mcp4461";
} & Mcp4461Props & ComponentProps<__marker_mcp4461_Mcp4461Wiper>) | ({
    platform: "mcp4725";
} & Mcp4725Props & ComponentProps<__marker_mcp4725_MCP4725>) | ({
    platform: "mcp4728";
} & Mcp4728Props & ComponentProps<__marker_mcp4728_MCP4728Channel>) | ({
    platform: "mcp47a1";
} & Mcp47a1Props & ComponentProps<__marker_mcp47a1_MCP47A1>) | ({
    platform: "modbus_controller";
    registerType: "coil";
} & ModbusControllerCoilProps & ComponentProps<__marker_modbus_controller_ModbusBinaryOutput>) | ({
    platform: "modbus_controller";
    registerType: "holding";
} & ModbusControllerHoldingProps & ComponentProps<__marker_modbus_controller_ModbusFloatOutput>) | ({
    platform: "my9231";
} & My9231Props & ComponentProps<__marker_my9231_MY9231OutputComponent_Channel>) | ({
    platform: "opentherm";
} & OpenthermProps & ComponentProps) | ({
    platform: "pca9685";
} & Pca9685Props & ComponentProps<__marker_pca9685_PCA9685Channel>) | ({
    platform: "pipsolar";
} & PipsolarProps & ComponentProps) | ({
    platform: "rp2040_pwm";
} & Rp2040PwmProps & ComponentProps<__marker_rp2040_pwm_RP2040PWM>) | ({
    platform: "sigma_delta_output";
} & SigmaDeltaOutputProps & ComponentProps<__marker_sigma_delta_output_SigmaDeltaOutput>) | ({
    platform: "slow_pwm";
} & SlowPwmProps & ComponentProps<__marker_slow_pwm_SlowPWMOutput>) | ({
    platform: "sm16716";
} & Sm16716Props & ComponentProps<__marker_sm16716_SM16716_Channel>) | ({
    platform: "sm2135";
} & Sm2135Props & ComponentProps<__marker_sm2135_SM2135_Channel>) | ({
    platform: "sm2235";
} & Sm2235Props & ComponentProps<__marker_sm2235_SM2235_Channel>) | ({
    platform: "sm2335";
} & Sm2335Props & ComponentProps<__marker_sm2335_SM2335_Channel>) | ({
    platform: "sx1509";
} & Sx1509Props & ComponentProps<__marker_sx1509_SX1509FloatOutputChannel>) | ({
    platform: "template";
    type: "binary";
} & TemplateBinaryProps & ComponentProps<__marker_template__TemplateBinaryOutput>) | ({
    platform: "template";
    type: "float";
} & TemplateFloatProps & ComponentProps<__marker_template__TemplateFloatOutput>) | ({
    platform: "tlc59208f";
} & Tlc59208fProps & ComponentProps<__marker_tlc59208f_TLC59208FChannel>) | ({
    platform: "tlc5947";
} & Tlc5947Props & ComponentProps<__marker_tlc5947_TLC5947Channel>) | ({
    platform: "tlc5971";
} & Tlc5971Props & ComponentProps<__marker_tlc5971_TLC5971Channel>) | ({
    platform: "tm1638";
} & Tm1638Props & ComponentProps<__marker_tm1638_TM1638OutputLed>) | ({
    platform: "x9c";
} & X9cProps & ComponentProps<__marker_x9c_X9cOutput>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            output: OutputProps;
        }
    }
}
