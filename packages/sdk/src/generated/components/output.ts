// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _BleClient, _CoreComponent, _Emc2101Component, _ModbusControllerModbusitembaseschema, _OutputBinaryOutput, _OutputFloatOutput, _PipsolarComponent } from "../bases";
import type { ac_dimmer_AcDimmer, ble_client_BLEBinaryOutput, bp1658cj_BP1658CJ, bp1658cj_BP1658CJ_Channel, bp5758d_BP5758D, bp5758d_BP5758D_Channel, dac7678_DAC7678Channel, dac7678_DAC7678Output, emc2101_EMC2101Output, esp32_dac_ESP32DAC, esp8266_pwm_ESP8266PWM, gp8403_GP8403Component, gp8403_GP8403Output, gpio_GPIOBinaryOutput, i2c_I2CBus, ledc_LEDCOutput, libretiny_pwm_LibreTinyPWM, max6956_MAX6956, max6956_MAX6956LedChannel, mcp4461_Mcp4461Component, mcp4461_Mcp4461Wiper, mcp4725_MCP4725, mcp4728_MCP4728Channel, mcp4728_MCP4728Component, mcp47a1_MCP47A1, modbus_controller_ModbusBinaryOutput, modbus_controller_ModbusFloatOutput, my9231_MY9231OutputComponent, my9231_MY9231OutputComponent_Channel, opentherm_OpenthermHub, pca9685_PCA9685Channel, pca9685_PCA9685Output, power_supply_PowerSupply, rp2040_pwm_RP2040PWM, sigma_delta_output_SigmaDeltaOutput, slow_pwm_SlowPWMOutput, sm16716_SM16716, sm16716_SM16716_Channel, sm2135_SM2135, sm2135_SM2135_Channel, sm2235_SM2235, sm2235_SM2235_Channel, sm2335_SM2335, sm2335_SM2335_Channel, sx1509_SX1509Component, sx1509_SX1509FloatOutputChannel, template__TemplateBinaryOutput, template__TemplateFloatOutput, tlc59208f_TLC59208FChannel, tlc59208f_TLC59208FOutput, tlc5947_TLC5947, tlc5947_TLC5947Channel, tlc5971_TLC5971, tlc5971_TLC5971Channel, tm1638_TM1638Component, tm1638_TM1638OutputLed, x9c_X9cOutput } from "../markers";
interface SlowPwmPeriodProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface X9cStepDelayProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface OpenthermTSetProps {
    /** @yamlKey power_supply */
    powerSupply?: RefProp<power_supply_PowerSupply>;
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** @yamlKey max_value */
    maxValue?: unknown;
    step?: unknown;
    /** @yamlKey auto_max_value */
    autoMaxValue?: boolean;
}
interface OpenthermTSetCh2Props {
    /** @yamlKey power_supply */
    powerSupply?: RefProp<power_supply_PowerSupply>;
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** @yamlKey max_value */
    maxValue?: unknown;
    step?: unknown;
    /** @yamlKey auto_max_value */
    autoMaxValue?: boolean;
}
interface OpenthermCoolingControlProps {
    /** @yamlKey power_supply */
    powerSupply?: RefProp<power_supply_PowerSupply>;
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** @yamlKey max_value */
    maxValue?: unknown;
    step?: unknown;
}
interface OpenthermTDhwSetProps {
    /** @yamlKey power_supply */
    powerSupply?: RefProp<power_supply_PowerSupply>;
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** @yamlKey max_value */
    maxValue?: unknown;
    step?: unknown;
    /** @yamlKey auto_min_value */
    autoMinValue?: boolean;
    /** @yamlKey auto_max_value */
    autoMaxValue?: boolean;
}
interface OpenthermMaxTSetProps {
    /** @yamlKey power_supply */
    powerSupply?: RefProp<power_supply_PowerSupply>;
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** @yamlKey max_value */
    maxValue?: unknown;
    step?: unknown;
    /** @yamlKey auto_min_value */
    autoMinValue?: boolean;
    /** @yamlKey auto_max_value */
    autoMaxValue?: boolean;
}
interface OpenthermTRoomSetProps {
    /** @yamlKey power_supply */
    powerSupply?: RefProp<power_supply_PowerSupply>;
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** @yamlKey max_value */
    maxValue?: unknown;
    step?: unknown;
}
interface OpenthermTRoomSetCh2Props {
    /** @yamlKey power_supply */
    powerSupply?: RefProp<power_supply_PowerSupply>;
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** @yamlKey max_value */
    maxValue?: unknown;
    step?: unknown;
}
interface OpenthermTRoomProps {
    /** @yamlKey power_supply */
    powerSupply?: RefProp<power_supply_PowerSupply>;
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** @yamlKey max_value */
    maxValue?: unknown;
    step?: unknown;
}
interface OpenthermMaxRelModLevelProps {
    /** @yamlKey power_supply */
    powerSupply?: RefProp<power_supply_PowerSupply>;
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** @yamlKey max_value */
    maxValue?: unknown;
    step?: unknown;
}
interface OpenthermOtcHcRatioProps {
    /** @yamlKey power_supply */
    powerSupply?: RefProp<power_supply_PowerSupply>;
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey min_value */
    minValue?: unknown;
    /** @yamlKey max_value */
    maxValue?: unknown;
    step?: unknown;
    /** @yamlKey auto_min_value */
    autoMinValue?: boolean;
    /** @yamlKey auto_max_value */
    autoMaxValue?: boolean;
}
interface PipsolarBatteryRechargeVoltageProps {
    /** @yamlKey power_supply */
    powerSupply?: RefProp<power_supply_PowerSupply>;
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
    /**
     * list: a list of possible values default: 44.0,45.0,46.0,47.0,48.0,49.0,50.0,51.0
     * @yamlKey possible_values
     */
    possibleValues?: Array<unknown>;
}
interface PipsolarBatteryUnderVoltageProps {
    /** @yamlKey power_supply */
    powerSupply?: RefProp<power_supply_PowerSupply>;
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
    /**
     * list: a list of possible values default: 40.0,40.1,42,43,44,45,46,47,48.0
     * @yamlKey possible_values
     */
    possibleValues?: Array<unknown>;
}
interface PipsolarBatteryFloatVoltageProps {
    /** @yamlKey power_supply */
    powerSupply?: RefProp<power_supply_PowerSupply>;
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
    /**
     * list: a list of possible values default: 48.0,49.0,50.0,51.0
     * @yamlKey possible_values
     */
    possibleValues?: Array<unknown>;
}
interface PipsolarBatteryTypeProps {
    /** @yamlKey power_supply */
    powerSupply?: RefProp<power_supply_PowerSupply>;
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
    /**
     * list: a list of possible values default: 0,1,2
     * @yamlKey possible_values
     */
    possibleValues?: Array<unknown>;
}
interface PipsolarCurrentMaxAcChargingCurrentProps {
    /** @yamlKey power_supply */
    powerSupply?: RefProp<power_supply_PowerSupply>;
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
    /**
     * list: a list of possible values default: 2,10,20
     * @yamlKey possible_values
     */
    possibleValues?: Array<unknown>;
}
interface PipsolarCurrentMaxChargingCurrentProps {
    /** @yamlKey power_supply */
    powerSupply?: RefProp<power_supply_PowerSupply>;
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
    /**
     * list: a list of possible values default: 10,20,30,40
     * @yamlKey possible_values
     */
    possibleValues?: Array<unknown>;
}
interface PipsolarOutputSourcePriorityProps {
    /** @yamlKey power_supply */
    powerSupply?: RefProp<power_supply_PowerSupply>;
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
    /**
     * list: a list of possible values default: 0,1,2
     * @yamlKey possible_values
     */
    possibleValues?: Array<unknown>;
}
interface PipsolarChargerSourcePriorityProps {
    /** @yamlKey power_supply */
    powerSupply?: RefProp<power_supply_PowerSupply>;
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
    /**
     * list: a list of possible values default: 0,1,2,3
     * @yamlKey possible_values
     */
    possibleValues?: Array<unknown>;
}
interface PipsolarBatteryRedischargeVoltageProps {
    /** @yamlKey power_supply */
    powerSupply?: RefProp<power_supply_PowerSupply>;
    inverted?: boolean;
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
    /**
     * list: a list of possible values default: 00.0,48.0,49,50.0,51.0,52,53,54,55,56,57,58
     * @yamlKey possible_values
     */
    possibleValues?: Array<unknown>;
}
interface AcDimmerProps extends _OutputFloatOutput, _CoreComponent {
    /**
     * [Pin](/guides/configuration-types#pin): The pin used to control the Triac or Mosfet.
     * @yamlKey gate_pin
     */
    gatePin: Pin;
    /**
     * [Pin](/guides/configuration-types#pin): The pin used to sense the AC Zero cross event, you can have several dimmers c...
     * @yamlKey zero_cross_pin
     */
    zeroCrossPin: Pin;
    /**
     * boolean: Will send the first full half AC cycle Try to use this for dimmable LED lights, it might help turning on at ...
     * @yamlKey init_with_half_cycle
     */
    initWithHalfCycle?: boolean;
    /** Set the method for dimming, can be: */
    method?: "LEADING_PULSE" | "LEADING" | "TRAILING";
}
interface Esp32DacProps extends _OutputFloatOutput, _CoreComponent {
    /** [Pin Schema](/guides/configuration-types#pin-schema): The pin to use DAC on. See above for valid pin numbers. */
    pin: Pin;
}
interface Esp8266PwmProps extends _OutputFloatOutput, _CoreComponent {
    /** [Pin Schema](/guides/configuration-types#pin-schema): The pin to use PWM on. */
    pin: Pin;
    /** frequency: The frequency to run the PWM with. Lower frequencies have more visual artifacts, but can represent much mo... */
    frequency?: unknown;
}
interface LedcProps extends _OutputFloatOutput, _CoreComponent {
    /** [Pin](/guides/configuration-types#pin): The pin to use LEDC on. Can only be GPIO0-GPIO33. */
    pin: Pin;
    /** frequency: At which frequency to run the LEDC channel's timer. Defaults to `1kHz`. */
    frequency?: unknown;
    /** int: Manually set the [LEDC channel](https://docs.espressif.com/projects/esp-idf/en/latest/api-reference/peripherals/... */
    channel?: number;
    /**
     * float: Set a phase angle to the other channel of this timer. Range 0-360°, defaults to 0°
     * @yamlKey phase_angle
     */
    phaseAngle?: unknown;
}
interface LibretinyPwmProps extends _OutputFloatOutput, _CoreComponent {
    /** [Pin Schema](/guides/configuration-types#pin-schema): The pin to use PWM on. */
    pin: Pin;
    /** frequency: The frequency to run the PWM with. Lower frequencies have more visual artifacts, but can represent much mo... */
    frequency?: unknown;
}
interface Mcp4725Props extends _OutputFloatOutput, _CoreComponent {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: Manually specify the I2C address of the DAC. Defaults to `0x60`. */
    address?: unknown;
}
interface Mcp47a1Props extends _OutputFloatOutput, _CoreComponent {
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    /** int: Manually specify the I²C address of the DAC. Defaults to `0x2E`. */
    address?: unknown;
}
interface Rp2040PwmProps extends _OutputFloatOutput, _CoreComponent {
    pin: Pin;
    frequency?: unknown;
}
interface SigmaDeltaOutputProps extends _OutputFloatOutput, _CoreComponent {
    /**
     * [Time](/guides/configuration-types#time): The cycle interval at which the output is recalculated. Defaults to `60s`.
     * @yamlKey update_interval
     */
    updateInterval?: unknown;
    /** [Pin Schema](/guides/configuration-types#pin-schema): The pin to pulse. */
    pin?: Pin;
    /**
     * [Automation](/automations): An automation to perform when the load is switched. If a lambda is used the boolean `stat...
     * @yamlKey state_change_action
     */
    stateChangeAction?: () => void;
    /**
     * [Automation](/automations): An automation to perform when the load is turned on. Can be used to control for example a...
     * @yamlKey turn_on_action
     */
    turnOnAction?: () => void;
    /**
     * [Automation](/automations): An automation to perform when the load is turned off. `turn_on_action` and `turn_off_acti...
     * @yamlKey turn_off_action
     */
    turnOffAction?: () => void;
}
interface SlowPwmProps extends _OutputFloatOutput, _CoreComponent {
    /** [Pin Schema](/guides/configuration-types#pin-schema): The pin to pulse. */
    pin?: Pin;
    /**
     * [Automation](/automations): An automation to perform when the load is turned on. Can be used to control for example a...
     * @yamlKey turn_on_action
     */
    turnOnAction?: () => void;
    /**
     * [Automation](/automations): An automation to perform when the load is turned off. `turn_on_action` and `turn_off_acti...
     * @yamlKey turn_off_action
     */
    turnOffAction?: () => void;
    /**
     * [Automation](/automations): An automation to perform when the load is switched. If a lambda is used the boolean `stat...
     * @yamlKey state_change_action
     */
    stateChangeAction?: () => void;
    /** [Time](/guides/configuration-types#time): The duration of each cycle. (i.e. a 10s period at 50% duty would result in ... */
    period: SlowPwmPeriodProps;
    /**
     * boolean: Restart a timer of a cycle when new state is set. Defaults to `false`.
     * @yamlKey restart_cycle_on_state_change
     */
    restartCycleOnStateChange?: boolean;
}
interface X9cProps extends _OutputFloatOutput {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): Chip Select pin
     * @yamlKey cs_pin
     */
    csPin: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): Increment pin
     * @yamlKey inc_pin
     */
    incPin: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): Up/Down pin
     * @yamlKey ud_pin
     */
    udPin: Pin;
    /**
     * float: Manually specify the initial potentiometer value, between `0.01` and `1.0`. Defaults to `1.0`.
     * @yamlKey initial_value
     */
    initialValue?: unknown;
    /**
     * int: Manually specify the delay between steps (in microseconds) between `1us` and `100us`. Defaults to `1us`.
     * @yamlKey step_delay
     */
    stepDelay?: X9cStepDelayProps;
}
interface BleClientProps extends _OutputBinaryOutput, _CoreComponent, _BleClient {
    /** @yamlKey service_uuid */
    serviceUuid: unknown;
    /** @yamlKey characteristic_uuid */
    characteristicUuid: unknown;
    /** @yamlKey require_response */
    requireResponse?: boolean;
}
interface Bp1658cjProps extends _OutputFloatOutput, _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [Component/Hub](https://esphome.io/components/ou...
     * @yamlKey bp1658cj_id
     */
    bp1658cjId?: RefProp<bp1658cj_BP1658CJ>;
    /** int: Chose the channel of the BP1658CJ chain of this output component. */
    channel: number;
}
interface Bp5758dProps extends _OutputFloatOutput, _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [Component/Hub](https://esphome.io/components/ou...
     * @yamlKey bp5758d_id
     */
    bp5758dId?: RefProp<bp5758d_BP5758D>;
    /** int: Chose the channel of the BP5758D chain of this output component. Valid values are 1-5. */
    channel: number;
    /** int: Current in mA, valid values are 0-90, default 10. */
    current?: number;
}
interface Dac7678Props extends _OutputFloatOutput {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [DAC7678 hub](https://esphome.io/components/outp...
     * @yamlKey dac7678_id
     */
    dac7678Id?: RefProp<dac7678_DAC7678Output>;
    /** int: Chose the channel of the DAC7678 of this output component. Must be in range from 0 to 7. */
    channel: number;
}
interface Emc2101Props extends _Emc2101Component {
}
interface Gp8403Props extends _OutputFloatOutput, _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): The ID of the GP8403 component. Defaults to the only GP8403 component if there ...
     * @yamlKey gp8403_id
     */
    gp8403Id?: RefProp<gp8403_GP8403Component>;
    /** int: The channel of the GP8403 to use. Must be `0` or `1`. */
    channel: number;
}
interface GpioProps extends _OutputBinaryOutput, _CoreComponent {
    /** [Pin Schema](/guides/configuration-types#pin-schema): The pin to turn on and off. */
    pin: Pin;
}
interface Max6956Props extends _OutputFloatOutput, _CoreComponent {
    max6956?: RefProp<max6956_MAX6956>;
    pin: number;
}
interface Mcp4461Props extends _OutputFloatOutput {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [MCP4461](https://esphome.io/components/output/m...
     * @yamlKey mcp4461_id
     */
    mcp4461Id?: RefProp<mcp4461_Mcp4461Component>;
    /** string: Choose the channel of this MCP4461 output component. One of `A`, `B`, `C`, `D`, `E`, `F`, `G` or `H`. */
    channel: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
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
    /**
     * float: Set initial wiper value, valid range is `0 - 1.0`
     * @yamlKey initial_value
     */
    initialValue?: unknown;
}
interface Mcp4728Props extends _OutputFloatOutput {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [MCP4728](https://esphome.io/components/output/m...
     * @yamlKey mcp4728_id
     */
    mcp4728Id?: RefProp<mcp4728_MCP4728Component>;
    /** string: Chose the channel of the MCP4728 chain of this output component. One of `A`, `B`, `C` or `D`. */
    channel: "A" | "B" | "C" | "D";
    /** string: Chose the VREF source. One of `vdd` or `internal`. Defaults to `vdd`. */
    vref?: "vdd" | "internal";
    /**
     * string: Chose the power down mode. In power down mode (value different from `normal` ) the output pin will be connect...
     * @yamlKey power_down
     */
    powerDown?: "normal" | "gnd_1k" | "gnd_100k" | "gnd_500k";
    /** string: Chose the GAIN multiplier for internal VREF. One of `X1` or `X2`. Only useful when `vdd=internal`. Defaults t... */
    gain?: "X1" | "X2";
}
interface ModbusControllerCoilProps extends _OutputBinaryOutput, _ModbusControllerModbusitembaseschema {
    /** @yamlKey write_lambda */
    writeLambda?: unknown;
    /** @yamlKey use_write_multiple */
    useWriteMultiple?: boolean;
}
interface ModbusControllerHoldingProps extends _OutputFloatOutput, _ModbusControllerModbusitembaseschema {
    /** @yamlKey value_type */
    valueType?: "RAW" | "U_WORD" | "S_WORD" | "U_DWORD" | "U_DWORD_R" | "S_DWORD" | "S_DWORD_R" | "U_QWORD" | "U_QWORD_R" | "S_QWORD" | "S_QWORD_R" | "FP32" | "FP32_R";
    /** @yamlKey write_lambda */
    writeLambda?: unknown;
    multiply?: unknown;
    /** @yamlKey use_write_multiple */
    useWriteMultiple?: boolean;
}
interface My9231Props extends _OutputFloatOutput, _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [Component/Hub](https://esphome.io/components/ou...
     * @yamlKey my9231_id
     */
    my9231Id?: RefProp<my9231_MY9231OutputComponent>;
    /** int: Chose the channel of the MY9231/MY9291 chain of this output component. Channel 0 is the most close channel. */
    channel: number;
}
interface OpenthermProps extends _CoreComponent {
    /** @yamlKey opentherm_id */
    openthermId?: RefProp<opentherm_OpenthermHub>;
    /** @yamlKey t_set */
    tSet?: OpenthermTSetProps;
    /** @yamlKey t_set_ch2 */
    tSetCh2?: OpenthermTSetCh2Props;
    /** @yamlKey cooling_control */
    coolingControl?: OpenthermCoolingControlProps;
    /** @yamlKey t_dhw_set */
    tDhwSet?: OpenthermTDhwSetProps;
    /** @yamlKey max_t_set */
    maxTSet?: OpenthermMaxTSetProps;
    /** @yamlKey t_room_set */
    tRoomSet?: OpenthermTRoomSetProps;
    /** @yamlKey t_room_set_ch2 */
    tRoomSetCh2?: OpenthermTRoomSetCh2Props;
    /** @yamlKey t_room */
    tRoom?: OpenthermTRoomProps;
    /** @yamlKey max_rel_mod_level */
    maxRelModLevel?: OpenthermMaxRelModLevelProps;
    /** @yamlKey otc_hc_ratio */
    otcHcRatio?: OpenthermOtcHcRatioProps;
}
interface Pca9685Props extends _OutputFloatOutput {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [PCA9685 hub](https://esphome.io/components/outp...
     * @yamlKey pca9685_id
     */
    pca9685Id?: RefProp<pca9685_PCA9685Output>;
    /** int: Choose the channel of the PCA9685 of this output component. Must be in range from 0 to 15. */
    channel: number;
}
interface PipsolarProps extends _PipsolarComponent {
    /**
     * battery recharge voltage;
     * @yamlKey battery_recharge_voltage
     */
    batteryRechargeVoltage?: PipsolarBatteryRechargeVoltageProps;
    /**
     * battery under voltage;
     * @yamlKey battery_under_voltage
     */
    batteryUnderVoltage?: PipsolarBatteryUnderVoltageProps;
    /**
     * battery float voltage;
     * @yamlKey battery_float_voltage
     */
    batteryFloatVoltage?: PipsolarBatteryFloatVoltageProps;
    /**
     * battery type;
     * @yamlKey battery_type
     */
    batteryType?: PipsolarBatteryTypeProps;
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
    /**
     * charger source priority;
     * @yamlKey charger_source_priority
     */
    chargerSourcePriority?: PipsolarChargerSourcePriorityProps;
    /**
     * battery redischarge voltage;
     * @yamlKey battery_redischarge_voltage
     */
    batteryRedischargeVoltage?: PipsolarBatteryRedischargeVoltageProps;
}
interface Sm16716Props extends _OutputFloatOutput, _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [Component/Hub](https://esphome.io/components/ou...
     * @yamlKey sm16716_id
     */
    sm16716Id?: RefProp<sm16716_SM16716>;
    /** int: Chose the channel of the SM16716 chain of this output component. */
    channel: number;
}
interface Sm2135Props extends _OutputFloatOutput, _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [Component/Hub](https://esphome.io/components/ou...
     * @yamlKey sm2135_id
     */
    sm2135Id?: RefProp<sm2135_SM2135>;
    /** int: Chose the channel of the SM2135 chain of this output component. */
    channel: number;
}
interface Sm2235Props extends _OutputFloatOutput, _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [Component/Hub](https://esphome.io/components/ou...
     * @yamlKey sm2235_id
     */
    sm2235Id?: RefProp<sm2235_SM2235>;
    /** int: Chose the channel of the SM2235 chain of this output component. */
    channel: number;
}
interface Sm2335Props extends _OutputFloatOutput, _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [Component/Hub](https://esphome.io/components/ou...
     * @yamlKey sm2335_id
     */
    sm2335Id?: RefProp<sm2335_SM2335>;
    /** int: Chose the channel of the SM2335 chain of this output component. */
    channel: number;
}
interface Sx1509Props extends _OutputFloatOutput, _CoreComponent {
    /** @yamlKey sx1509_id */
    sx1509Id?: RefProp<sx1509_SX1509Component>;
    pin: number;
}
interface TemplateBinaryProps extends _OutputBinaryOutput {
    /**
     * [Automation](/automations): An automation to perform when the state of the output is updated.
     * @yamlKey write_action
     */
    writeAction: () => void;
}
interface TemplateFloatProps extends _OutputFloatOutput {
    /**
     * [Automation](/automations): An automation to perform when the state of the output is updated.
     * @yamlKey write_action
     */
    writeAction: () => void;
}
interface Tlc59208fProps extends _OutputFloatOutput {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [TLC59208F chip](https://esphome.io/components/o...
     * @yamlKey tlc59208f_id
     */
    tlc59208fId?: RefProp<tlc59208f_TLC59208FOutput>;
    /** int: Choose the channel of the TLC59208F for this output component. Must be in range from 0 to 7. */
    channel: number;
}
interface Tlc5947Props extends _OutputFloatOutput, _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [TLC5947-component](https://esphome.io/component...
     * @yamlKey tlc5947_id
     */
    tlc5947Id?: RefProp<tlc5947_TLC5947>;
    /** int: Chose the channel of the TLC5947 chain of this output component. */
    channel: number;
}
interface Tlc5971Props extends _OutputFloatOutput, _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [TLC5971-component](https://esphome.io/component...
     * @yamlKey tlc5971_id
     */
    tlc5971Id?: RefProp<tlc5971_TLC5971>;
    /** int: Chose the channel of the TLC5971 chain of this output component. */
    channel: number;
}
interface Tm1638Props extends _OutputBinaryOutput, _CoreComponent {
    /** @yamlKey tm1638_id */
    tm1638Id?: RefProp<tm1638_TM1638Component>;
    led: number;
}
export type OutputProps = ({
    platform: "ac_dimmer";
} & AcDimmerProps & ComponentProps<ac_dimmer_AcDimmer>) | ({
    platform: "esp32_dac";
} & Esp32DacProps & ComponentProps<esp32_dac_ESP32DAC>) | ({
    platform: "esp8266_pwm";
} & Esp8266PwmProps & ComponentProps<esp8266_pwm_ESP8266PWM>) | ({
    platform: "ledc";
} & LedcProps & ComponentProps<ledc_LEDCOutput>) | ({
    platform: "libretiny_pwm";
} & LibretinyPwmProps & ComponentProps<libretiny_pwm_LibreTinyPWM>) | ({
    platform: "mcp4725";
} & Mcp4725Props & ComponentProps<mcp4725_MCP4725>) | ({
    platform: "mcp47a1";
} & Mcp47a1Props & ComponentProps<mcp47a1_MCP47A1>) | ({
    platform: "rp2040_pwm";
} & Rp2040PwmProps & ComponentProps<rp2040_pwm_RP2040PWM>) | ({
    platform: "sigma_delta_output";
} & SigmaDeltaOutputProps & ComponentProps<sigma_delta_output_SigmaDeltaOutput>) | ({
    platform: "slow_pwm";
} & SlowPwmProps & ComponentProps<slow_pwm_SlowPWMOutput>) | ({
    platform: "x9c";
} & X9cProps & ComponentProps<x9c_X9cOutput>) | ({
    platform: "ble_client";
} & BleClientProps & ComponentProps<ble_client_BLEBinaryOutput>) | ({
    platform: "bp1658cj";
} & Bp1658cjProps & ComponentProps<bp1658cj_BP1658CJ_Channel>) | ({
    platform: "bp5758d";
} & Bp5758dProps & ComponentProps<bp5758d_BP5758D_Channel>) | ({
    platform: "dac7678";
} & Dac7678Props & ComponentProps<dac7678_DAC7678Channel>) | ({
    platform: "emc2101";
} & Emc2101Props & ComponentProps<emc2101_EMC2101Output>) | ({
    platform: "gp8403";
} & Gp8403Props & ComponentProps<gp8403_GP8403Output>) | ({
    platform: "gpio";
} & GpioProps & ComponentProps<gpio_GPIOBinaryOutput>) | ({
    platform: "max6956";
} & Max6956Props & ComponentProps<max6956_MAX6956LedChannel>) | ({
    platform: "mcp4461";
} & Mcp4461Props & ComponentProps<mcp4461_Mcp4461Wiper>) | ({
    platform: "mcp4728";
} & Mcp4728Props & ComponentProps<mcp4728_MCP4728Channel>) | ({
    platform: "modbus_controller";
    registerType: "coil";
} & ModbusControllerCoilProps & ComponentProps<modbus_controller_ModbusBinaryOutput>) | ({
    platform: "modbus_controller";
    registerType: "holding";
} & ModbusControllerHoldingProps & ComponentProps<modbus_controller_ModbusFloatOutput>) | ({
    platform: "my9231";
} & My9231Props & ComponentProps<my9231_MY9231OutputComponent_Channel>) | ({
    platform: "opentherm";
} & OpenthermProps & ComponentProps) | ({
    platform: "pca9685";
} & Pca9685Props & ComponentProps<pca9685_PCA9685Channel>) | ({
    platform: "pipsolar";
} & PipsolarProps & ComponentProps) | ({
    platform: "sm16716";
} & Sm16716Props & ComponentProps<sm16716_SM16716_Channel>) | ({
    platform: "sm2135";
} & Sm2135Props & ComponentProps<sm2135_SM2135_Channel>) | ({
    platform: "sm2235";
} & Sm2235Props & ComponentProps<sm2235_SM2235_Channel>) | ({
    platform: "sm2335";
} & Sm2335Props & ComponentProps<sm2335_SM2335_Channel>) | ({
    platform: "sx1509";
} & Sx1509Props & ComponentProps<sx1509_SX1509FloatOutputChannel>) | ({
    platform: "template";
    type: "binary";
} & TemplateBinaryProps & ComponentProps<template__TemplateBinaryOutput>) | ({
    platform: "template";
    type: "float";
} & TemplateFloatProps & ComponentProps<template__TemplateFloatOutput>) | ({
    platform: "tlc59208f";
} & Tlc59208fProps & ComponentProps<tlc59208f_TLC59208FChannel>) | ({
    platform: "tlc5947";
} & Tlc5947Props & ComponentProps<tlc5947_TLC5947Channel>) | ({
    platform: "tlc5971";
} & Tlc5971Props & ComponentProps<tlc5971_TLC5971Channel>) | ({
    platform: "tm1638";
} & Tm1638Props & ComponentProps<tm1638_TM1638OutputLed>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            output: OutputProps;
        }
    }
}
