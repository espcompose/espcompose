// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

// Each interface is a phantom type used to brand Ref<T> values.
// Each marker has one readonly property per ancestor class, making
// Ref<Derived> assignable to Ref<Base> via structural subtyping.
// Naming: C++ namespace separator "::" is replaced with "_".
// e.g. i2c::I2CBus → i2c_I2CBus

/* eslint-disable */

//  ::esphome::hub75::HUB75Display
export interface _esphome_hub75_HUB75Display {
    readonly __brand__esphome_hub75_HUB75Display?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_display_Display?: true;
}
//  Action
export interface Action {
    readonly __brand_Action?: true;
}
//  Area
export interface Area {
    readonly __brand_Area?: true;
}
//  Color
export interface Color {
    readonly __brand_Color?: true;
}
//  Component
export interface Component {
    readonly __brand_Component?: true;
}
//  Controller
export interface Controller {
    readonly __brand_Controller?: true;
}
//  Device
export interface Device {
    readonly __brand_Device?: true;
}
//  EntityBase
export interface EntityBase {
    readonly __brand_EntityBase?: true;
}
//  GPIOPin
export interface GPIOPin {
    readonly __brand_GPIOPin?: true;
}
//  InternalGPIOPin
export interface InternalGPIOPin {
    readonly __brand_InternalGPIOPin?: true;
}
//  Parented
export interface Parented {
    readonly __brand_Parented?: true;
}
//  PollingComponent
export interface PollingComponent {
    readonly __brand_PollingComponent?: true;
}
//  Trigger
export interface Trigger {
    readonly __brand_Trigger?: true;
}
//  a01nyub::A01nyubComponent
export interface a01nyub_A01nyubComponent {
    readonly __brand_a01nyub_A01nyubComponent?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
}
//  a02yyuw::A02yyuwComponent
export interface a02yyuw_A02yyuwComponent {
    readonly __brand_a02yyuw_A02yyuwComponent?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
}
//  a4988::A4988
export interface a4988_A4988 {
    readonly __brand_a4988_A4988?: true;
    readonly __brand_stepper_Stepper?: true;
    readonly __brand_Component?: true;
}
//  absolute_humidity::AbsoluteHumidityComponent
export interface absolute_humidity_AbsoluteHumidityComponent {
    readonly __brand_absolute_humidity_AbsoluteHumidityComponent?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  ac_dimmer::AcDimmer
export interface ac_dimmer_AcDimmer {
    readonly __brand_ac_dimmer_AcDimmer?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
    readonly __brand_Component?: true;
}
//  adc128s102::ADC128S102
export interface adc128s102_ADC128S102 {
    readonly __brand_adc128s102_ADC128S102?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  adc128s102::ADC128S102Sensor
export interface adc128s102_ADC128S102Sensor {
    readonly __brand_adc128s102_ADC128S102Sensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_voltage_sampler_VoltageSampler?: true;
}
//  adc::ADCSensor
export interface adc_ADCSensor {
    readonly __brand_adc_ADCSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_voltage_sampler_VoltageSampler?: true;
}
//  adc_dt_spec
export interface adc_dt_spec {
    readonly __brand_adc_dt_spec?: true;
}
//  addressable_light::AddressableLightDisplay
export interface addressable_light_AddressableLightDisplay {
    readonly __brand_addressable_light_AddressableLightDisplay?: true;
    readonly __brand_display_DisplayBuffer?: true;
    readonly __brand_display_Display?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  ade7880::ADE7880
export interface ade7880_ADE7880 {
    readonly __brand_ade7880_ADE7880?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ade7880::NeutralChannel
export interface ade7880_NeutralChannel {
    readonly __brand_ade7880_NeutralChannel?: true;
}
//  ade7880::PowerChannel
export interface ade7880_PowerChannel {
    readonly __brand_ade7880_PowerChannel?: true;
}
//  ade7953_base::ADE7953
export interface ade7953_base_ADE7953 {
    readonly __brand_ade7953_base_ADE7953?: true;
}
//  ade7953_i2c::AdE7953I2c
export interface ade7953_i2c_AdE7953I2c {
    readonly __brand_ade7953_i2c_AdE7953I2c?: true;
    readonly __brand_ade7953_base_ADE7953?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ade7953_spi::AdE7953Spi
export interface ade7953_spi_AdE7953Spi {
    readonly __brand_ade7953_spi_AdE7953Spi?: true;
    readonly __brand_ade7953_base_ADE7953?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  ads1115::ADS1115Component
export interface ads1115_ADS1115Component {
    readonly __brand_ads1115_ADS1115Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ads1115::ADS1115Sensor
export interface ads1115_ADS1115Sensor {
    readonly __brand_ads1115_ADS1115Sensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_voltage_sampler_VoltageSampler?: true;
}
//  ads1118::ADS1118
export interface ads1118_ADS1118 {
    readonly __brand_ads1118_ADS1118?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  ads1118::ADS1118Sensor
export interface ads1118_ADS1118Sensor {
    readonly __brand_ads1118_ADS1118Sensor?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_voltage_sampler_VoltageSampler?: true;
    readonly __brand_Parented?: true;
}
//  ags10::AGS10Component
export interface ags10_AGS10Component {
    readonly __brand_ags10_AGS10Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  aht10::AHT10Component
export interface aht10_AHT10Component {
    readonly __brand_aht10_AHT10Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  aic3204::AIC3204
export interface aic3204_AIC3204 {
    readonly __brand_aic3204_AIC3204?: true;
    readonly __brand_audio_dac_AudioDac?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  airthings_ble::AirthingsListener
export interface airthings_ble_AirthingsListener {
    readonly __brand_airthings_ble_AirthingsListener?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  airthings_wave_base::AirthingsWaveBase
export interface airthings_wave_base_AirthingsWaveBase {
    readonly __brand_airthings_wave_base_AirthingsWaveBase?: true;
}
//  airthings_wave_mini::AirthingsWaveMini
export interface airthings_wave_mini_AirthingsWaveMini {
    readonly __brand_airthings_wave_mini_AirthingsWaveMini?: true;
    readonly __brand_airthings_wave_base_AirthingsWaveBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_ble_client_BLEClientNode?: true;
    readonly __brand_ble_client_BLEClient?: true;
}
//  airthings_wave_plus::AirthingsWavePlus
export interface airthings_wave_plus_AirthingsWavePlus {
    readonly __brand_airthings_wave_plus_AirthingsWavePlus?: true;
    readonly __brand_airthings_wave_base_AirthingsWaveBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_ble_client_BLEClientNode?: true;
    readonly __brand_ble_client_BLEClient?: true;
}
//  alarm_control_panel::AlarmControlPanel
export interface alarm_control_panel_AlarmControlPanel {
    readonly __brand_alarm_control_panel_AlarmControlPanel?: true;
}
//  alpha3::Alpha3
export interface alpha3_Alpha3 {
    readonly __brand_alpha3_Alpha3?: true;
    readonly __brand_ble_client_BLEClientNode?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_ble_client_BLEClient?: true;
}
//  am2315c::AM2315C
export interface am2315c_AM2315C {
    readonly __brand_am2315c_AM2315C?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  am2320::AM2320Component
export interface am2320_AM2320Component {
    readonly __brand_am2320_AM2320Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  am43::Am43
export interface am43_Am43 {
    readonly __brand_am43_Am43?: true;
    readonly __brand_ble_client_BLEClientNode?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_ble_client_BLEClient?: true;
}
//  am43::Am43Component
export interface am43_Am43Component {
    readonly __brand_am43_Am43Component?: true;
    readonly __brand_cover_Cover?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_ble_client_BLEClientNode?: true;
    readonly __brand_Component?: true;
}
//  analog_threshold::AnalogThresholdBinarySensor
export interface analog_threshold_AnalogThresholdBinarySensor {
    readonly __brand_analog_threshold_AnalogThresholdBinarySensor?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  animation::Animation
export interface animation_Animation {
    readonly __brand_animation_Animation?: true;
    readonly __brand_image_Image?: true;
}
//  anova::Anova
export interface anova_Anova {
    readonly __brand_anova_Anova?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_ble_client_BLEClientNode?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  apds9306::APDS9306
export interface apds9306_APDS9306 {
    readonly __brand_apds9306_APDS9306?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  apds9960::APDS9960
export interface apds9960_APDS9960 {
    readonly __brand_apds9960_APDS9960?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  api::APIServer
export interface api_APIServer {
    readonly __brand_api_APIServer?: true;
    readonly __brand_Component?: true;
    readonly __brand_Controller?: true;
}
//  aqi::AQISensor
export interface aqi_AQISensor {
    readonly __brand_aqi_AQISensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  as3935::AS3935Component
export interface as3935_AS3935Component {
    readonly __brand_as3935_AS3935Component?: true;
    readonly __brand_Component?: true;
}
//  as3935_i2c::I2CAS3935Component
export interface as3935_i2c_I2CAS3935Component {
    readonly __brand_as3935_i2c_I2CAS3935Component?: true;
    readonly __brand_as3935_AS3935Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  as3935_spi::SPIAS3935Component
export interface as3935_spi_SPIAS3935Component {
    readonly __brand_as3935_spi_SPIAS3935Component?: true;
    readonly __brand_as3935_AS3935Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  as5600::AS5600Component
export interface as5600_AS5600Component {
    readonly __brand_as5600_AS5600Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  as5600::AS5600Sensor
export interface as5600_AS5600Sensor {
    readonly __brand_as5600_AS5600Sensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  as7341::AS7341Component
export interface as7341_AS7341Component {
    readonly __brand_as7341_AS7341Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  at581x::AT581XComponent
export interface at581x_AT581XComponent {
    readonly __brand_at581x_AT581XComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  at581x::RFSwitch
export interface at581x_RFSwitch {
    readonly __brand_at581x_RFSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
}
//  atc_mithermometer::ATCMiThermometer
export interface atc_mithermometer_ATCMiThermometer {
    readonly __brand_atc_mithermometer_ATCMiThermometer?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  atm90e26::ATM90E26Component
export interface atm90e26_ATM90E26Component {
    readonly __brand_atm90e26_ATM90E26Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  atm90e32::ATM90E32ClearGainCalibrationButton
export interface atm90e32_ATM90E32ClearGainCalibrationButton {
    readonly __brand_atm90e32_ATM90E32ClearGainCalibrationButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  atm90e32::ATM90E32ClearOffsetCalibrationButton
export interface atm90e32_ATM90E32ClearOffsetCalibrationButton {
    readonly __brand_atm90e32_ATM90E32ClearOffsetCalibrationButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  atm90e32::ATM90E32ClearPowerOffsetCalibrationButton
export interface atm90e32_ATM90E32ClearPowerOffsetCalibrationButton {
    readonly __brand_atm90e32_ATM90E32ClearPowerOffsetCalibrationButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  atm90e32::ATM90E32Component
export interface atm90e32_ATM90E32Component {
    readonly __brand_atm90e32_ATM90E32Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  atm90e32::ATM90E32GainCalibrationButton
export interface atm90e32_ATM90E32GainCalibrationButton {
    readonly __brand_atm90e32_ATM90E32GainCalibrationButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  atm90e32::ATM90E32Number
export interface atm90e32_ATM90E32Number {
    readonly __brand_atm90e32_ATM90E32Number?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Parented?: true;
}
//  atm90e32::ATM90E32OffsetCalibrationButton
export interface atm90e32_ATM90E32OffsetCalibrationButton {
    readonly __brand_atm90e32_ATM90E32OffsetCalibrationButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  atm90e32::ATM90E32PowerOffsetCalibrationButton
export interface atm90e32_ATM90E32PowerOffsetCalibrationButton {
    readonly __brand_atm90e32_ATM90E32PowerOffsetCalibrationButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  audio::AudioFile
export interface audio_AudioFile {
    readonly __brand_audio_AudioFile?: true;
}
//  audio_adc::AudioAdc
export interface audio_adc_AudioAdc {
    readonly __brand_audio_adc_AudioAdc?: true;
}
//  audio_dac::AudioDac
export interface audio_dac_AudioDac {
    readonly __brand_audio_dac_AudioDac?: true;
}
//  axs15231::AXS15231Touchscreen
export interface axs15231_AXS15231Touchscreen {
    readonly __brand_axs15231_AXS15231Touchscreen?: true;
    readonly __brand_touchscreen_Touchscreen?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  b_parasite::BParasite
export interface b_parasite_BParasite {
    readonly __brand_b_parasite_BParasite?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  ballu::BalluClimate
export interface ballu_BalluClimate {
    readonly __brand_ballu_BalluClimate?: true;
    readonly __brand_climate_ir_ClimateIR?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_remote_base_RemoteReceiverListener?: true;
    readonly __brand_remote_base_RemoteTransmittable?: true;
}
//  bang_bang::BangBangClimate
export interface bang_bang_BangBangClimate {
    readonly __brand_bang_bang_BangBangClimate?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  bedjet::BedJetClimate
export interface bedjet_BedJetClimate {
    readonly __brand_bedjet_BedJetClimate?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  bedjet::BedJetFan
export interface bedjet_BedJetFan {
    readonly __brand_bedjet_BedJetFan?: true;
    readonly __brand_fan_Fan?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  bedjet::BedJetHub
export interface bedjet_BedJetHub {
    readonly __brand_bedjet_BedJetHub?: true;
    readonly __brand_ble_client_BLEClientNode?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_ble_client_BLEClient?: true;
}
//  bedjet::BedjetSensor
export interface bedjet_BedjetSensor {
    readonly __brand_bedjet_BedjetSensor?: true;
    readonly __brand_Component?: true;
}
//  beken_spi_led_strip::BekenSPILEDStripLightOutput
export interface beken_spi_led_strip_BekenSPILEDStripLightOutput {
    readonly __brand_beken_spi_led_strip_BekenSPILEDStripLightOutput?: true;
    readonly __brand_light_AddressableLight?: true;
    readonly __brand_light_LightOutput?: true;
    readonly __brand_Component?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_light_AddressableLightState?: true;
}
//  bh1750::BH1750Sensor
export interface bh1750_BH1750Sensor {
    readonly __brand_bh1750_BH1750Sensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  bh1900nux::BH1900NUXSensor
export interface bh1900nux_BH1900NUXSensor {
    readonly __brand_bh1900nux_BH1900NUXSensor?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  binary::BinaryFan
export interface binary_BinaryFan {
    readonly __brand_binary_BinaryFan?: true;
    readonly __brand_fan_Fan?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  binary::BinaryLightOutput
export interface binary_BinaryLightOutput {
    readonly __brand_binary_BinaryLightOutput?: true;
    readonly __brand_light_LightOutput?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_light_AddressableLightState?: true;
}
//  binary_sensor::BinarySensor
export interface binary_sensor_BinarySensor {
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
}
//  binary_sensor_map::BinarySensorMap
export interface binary_sensor_map_BinarySensorMap {
    readonly __brand_binary_sensor_map_BinarySensorMap?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  bl0906::BL0906
export interface bl0906_BL0906 {
    readonly __brand_bl0906_BL0906?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
}
//  bl0939::BL0939
export interface bl0939_BL0939 {
    readonly __brand_bl0939_BL0939?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  bl0940::BL0940
export interface bl0940_BL0940 {
    readonly __brand_bl0940_BL0940?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  bl0940::BL0940Number
export interface bl0940_BL0940Number {
    readonly __brand_bl0940_BL0940Number?: true;
}
//  bl0940::CalibrationNumber
export interface bl0940_CalibrationNumber {
    readonly __brand_bl0940_CalibrationNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  bl0940::CalibrationResetButton
export interface bl0940_CalibrationResetButton {
    readonly __brand_bl0940_CalibrationResetButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  bl0942::BL0942
export interface bl0942_BL0942 {
    readonly __brand_bl0942_BL0942?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  ble_client::BLEBinaryOutput
export interface ble_client_BLEBinaryOutput {
    readonly __brand_ble_client_BLEBinaryOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
    readonly __brand_ble_client_BLEClientNode?: true;
    readonly __brand_Component?: true;
}
//  ble_client::BLEClient
export interface ble_client_BLEClient {
    readonly __brand_ble_client_BLEClient?: true;
    readonly __brand_esp32_ble_client_BLEClientBase?: true;
    readonly __brand_esp32_ble_tracker_ESPBTClient?: true;
    readonly __brand_Component?: true;
}
//  ble_client::BLEClientNode
export interface ble_client_BLEClientNode {
    readonly __brand_ble_client_BLEClientNode?: true;
    readonly __brand_ble_client_BLEClient?: true;
}
//  ble_client::BLEClientRSSISensor
export interface ble_client_BLEClientRSSISensor {
    readonly __brand_ble_client_BLEClientRSSISensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_ble_client_BLEClientNode?: true;
}
//  ble_client::BLEClientSwitch
export interface ble_client_BLEClientSwitch {
    readonly __brand_ble_client_BLEClientSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_ble_client_BLEClientNode?: true;
}
//  ble_client::BLESensor
export interface ble_client_BLESensor {
    readonly __brand_ble_client_BLESensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_ble_client_BLEClientNode?: true;
}
//  ble_client::BLETextSensor
export interface ble_client_BLETextSensor {
    readonly __brand_ble_client_BLETextSensor?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_ble_client_BLEClientNode?: true;
}
//  ble_nus::BLENUS
export interface ble_nus_BLENUS {
    readonly __brand_ble_nus_BLENUS?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  ble_presence::BLEPresenceDevice
export interface ble_presence_BLEPresenceDevice {
    readonly __brand_ble_presence_BLEPresenceDevice?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
}
//  ble_rssi::BLERSSISensor
export interface ble_rssi_BLERSSISensor {
    readonly __brand_ble_rssi_BLERSSISensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
}
//  ble_scanner::BLEScanner
export interface ble_scanner_BLEScanner {
    readonly __brand_ble_scanner_BLEScanner?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
}
//  bluetooth_proxy::BluetoothConnection
export interface bluetooth_proxy_BluetoothConnection {
    readonly __brand_bluetooth_proxy_BluetoothConnection?: true;
    readonly __brand_esp32_ble_client_BLEClientBase?: true;
    readonly __brand_esp32_ble_tracker_ESPBTClient?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  bluetooth_proxy::BluetoothProxy
export interface bluetooth_proxy_BluetoothProxy {
    readonly __brand_bluetooth_proxy_BluetoothProxy?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  bm8563::BM8563
export interface bm8563_BM8563 {
    readonly __brand_bm8563_BM8563?: true;
    readonly __brand_time_RealTimeClock?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  bme680::BME680Component
export interface bme680_BME680Component {
    readonly __brand_bme680_BME680Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  bme680_bsec::BME680BSECComponent
export interface bme680_bsec_BME680BSECComponent {
    readonly __brand_bme680_bsec_BME680BSECComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  bme68x_bsec2::BME68xBSEC2Component
export interface bme68x_bsec2_BME68xBSEC2Component {
    readonly __brand_bme68x_bsec2_BME68xBSEC2Component?: true;
}
//  bmi160::BMI160Component
export interface bmi160_BMI160Component {
    readonly __brand_bmi160_BMI160Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  bmp085::BMP085Component
export interface bmp085_BMP085Component {
    readonly __brand_bmp085_BMP085Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  bp1658cj::BP1658CJ
export interface bp1658cj_BP1658CJ {
    readonly __brand_bp1658cj_BP1658CJ?: true;
    readonly __brand_Component?: true;
}
//  bp1658cj::BP1658CJ::Channel
export interface bp1658cj_BP1658CJ_Channel {
    readonly __brand_bp1658cj_BP1658CJ_Channel?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
}
//  bp5758d::BP5758D
export interface bp5758d_BP5758D {
    readonly __brand_bp5758d_BP5758D?: true;
    readonly __brand_Component?: true;
}
//  bp5758d::BP5758D::Channel
export interface bp5758d_BP5758D_Channel {
    readonly __brand_bp5758d_BP5758D_Channel?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
}
//  bthome_mithermometer::BTHomeMiThermometer
export interface bthome_mithermometer_BTHomeMiThermometer {
    readonly __brand_bthome_mithermometer_BTHomeMiThermometer?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  button::Button
export interface button_Button {
    readonly __brand_button_Button?: true;
}
//  camera::Encoder
export interface camera_Encoder {
    readonly __brand_camera_Encoder?: true;
}
//  camera_encoder::ESP32CameraJPEGEncoder
export interface camera_encoder_ESP32CameraJPEGEncoder {
    readonly __brand_camera_encoder_ESP32CameraJPEGEncoder?: true;
    readonly __brand_camera_Encoder?: true;
}
//  camera_encoder::EncoderBufferImpl
export interface camera_encoder_EncoderBufferImpl {
    readonly __brand_camera_encoder_EncoderBufferImpl?: true;
}
//  canbus::CanbusComponent
export interface canbus_CanbusComponent {
    readonly __brand_canbus_CanbusComponent?: true;
    readonly __brand_Component?: true;
}
//  cap1188::CAP1188Channel
export interface cap1188_CAP1188Channel {
    readonly __brand_cap1188_CAP1188Channel?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
}
//  cap1188::CAP1188Component
export interface cap1188_CAP1188Component {
    readonly __brand_cap1188_CAP1188Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  captive_portal::CaptivePortal
export interface captive_portal_CaptivePortal {
    readonly __brand_captive_portal_CaptivePortal?: true;
    readonly __brand_Component?: true;
}
//  cc1101::CC1101Component
export interface cc1101_CC1101Component {
    readonly __brand_cc1101_CC1101Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  ccs811::CCS811Component
export interface ccs811_CCS811Component {
    readonly __brand_ccs811_CCS811Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  cd74hc4067::CD74HC4067Component
export interface cd74hc4067_CD74HC4067Component {
    readonly __brand_cd74hc4067_CD74HC4067Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_PollingComponent?: true;
}
//  cd74hc4067::CD74HC4067Sensor
export interface cd74hc4067_CD74HC4067Sensor {
    readonly __brand_cd74hc4067_CD74HC4067Sensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_voltage_sampler_VoltageSampler?: true;
}
//  ch422g::CH422GComponent
export interface ch422g_CH422GComponent {
    readonly __brand_ch422g_CH422GComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ch423::CH423Component
export interface ch423_CH423Component {
    readonly __brand_ch423_CH423Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  chsc6x::CHSC6XTouchscreen
export interface chsc6x_CHSC6XTouchscreen {
    readonly __brand_chsc6x_CHSC6XTouchscreen?: true;
    readonly __brand_touchscreen_Touchscreen?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  climate::Climate
export interface climate_Climate {
    readonly __brand_climate_Climate?: true;
}
//  climate_ir::ClimateIR
export interface climate_ir_ClimateIR {
    readonly __brand_climate_ir_ClimateIR?: true;
}
//  climate_ir_lg::LgIrClimate
export interface climate_ir_lg_LgIrClimate {
    readonly __brand_climate_ir_lg_LgIrClimate?: true;
    readonly __brand_climate_ir_ClimateIR?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_remote_base_RemoteReceiverListener?: true;
    readonly __brand_remote_base_RemoteTransmittable?: true;
}
//  cm1106::CM1106Component
export interface cm1106_CM1106Component {
    readonly __brand_cm1106_CM1106Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
}
//  color_temperature::CTLightOutput
export interface color_temperature_CTLightOutput {
    readonly __brand_color_temperature_CTLightOutput?: true;
    readonly __brand_light_LightOutput?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_light_AddressableLightState?: true;
}
//  combination::KalmanCombinationComponent
export interface combination_KalmanCombinationComponent {
    readonly __brand_combination_KalmanCombinationComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  combination::LinearCombinationComponent
export interface combination_LinearCombinationComponent {
    readonly __brand_combination_LinearCombinationComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  combination::MaximumCombinationComponent
export interface combination_MaximumCombinationComponent {
    readonly __brand_combination_MaximumCombinationComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  combination::MeanCombinationComponent
export interface combination_MeanCombinationComponent {
    readonly __brand_combination_MeanCombinationComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  combination::MedianCombinationComponent
export interface combination_MedianCombinationComponent {
    readonly __brand_combination_MedianCombinationComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  combination::MinimumCombinationComponent
export interface combination_MinimumCombinationComponent {
    readonly __brand_combination_MinimumCombinationComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  combination::MostRecentCombinationComponent
export interface combination_MostRecentCombinationComponent {
    readonly __brand_combination_MostRecentCombinationComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  combination::RangeCombinationComponent
export interface combination_RangeCombinationComponent {
    readonly __brand_combination_RangeCombinationComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  combination::SumCombinationComponent
export interface combination_SumCombinationComponent {
    readonly __brand_combination_SumCombinationComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  coolix::CoolixClimate
export interface coolix_CoolixClimate {
    readonly __brand_coolix_CoolixClimate?: true;
    readonly __brand_climate_ir_ClimateIR?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_remote_base_RemoteReceiverListener?: true;
    readonly __brand_remote_base_RemoteTransmittable?: true;
}
//  copy::CopyBinarySensor
export interface copy_CopyBinarySensor {
    readonly __brand_copy_CopyBinarySensor?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  copy::CopyButton
export interface copy_CopyButton {
    readonly __brand_copy_CopyButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  copy::CopyCover
export interface copy_CopyCover {
    readonly __brand_copy_CopyCover?: true;
    readonly __brand_cover_Cover?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  copy::CopyFan
export interface copy_CopyFan {
    readonly __brand_copy_CopyFan?: true;
    readonly __brand_fan_Fan?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  copy::CopyLock
export interface copy_CopyLock {
    readonly __brand_copy_CopyLock?: true;
    readonly __brand_lock_Lock?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  copy::CopyNumber
export interface copy_CopyNumber {
    readonly __brand_copy_CopyNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  copy::CopySelect
export interface copy_CopySelect {
    readonly __brand_copy_CopySelect?: true;
    readonly __brand_select_Select?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  copy::CopySensor
export interface copy_CopySensor {
    readonly __brand_copy_CopySensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  copy::CopySwitch
export interface copy_CopySwitch {
    readonly __brand_copy_CopySwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  copy::CopyText
export interface copy_CopyText {
    readonly __brand_copy_CopyText?: true;
    readonly __brand_text_Text?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  copy::CopyTextSensor
export interface copy_CopyTextSensor {
    readonly __brand_copy_CopyTextSensor?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  cover::Cover
export interface cover_Cover {
    readonly __brand_cover_Cover?: true;
}
//  cs5460a::CS5460AComponent
export interface cs5460a_CS5460AComponent {
    readonly __brand_cs5460a_CS5460AComponent?: true;
    readonly __brand_spi_SPIDevice?: true;
    readonly __brand_Component?: true;
}
//  cse7761::CSE7761Component
export interface cse7761_CSE7761Component {
    readonly __brand_cse7761_CSE7761Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  cse7766::CSE7766Component
export interface cse7766_CSE7766Component {
    readonly __brand_cse7766_CSE7766Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  cst226::CST226Button
export interface cst226_CST226Button {
    readonly __brand_cst226_CST226Button?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_cst226_CST226ButtonListener?: true;
    readonly __brand_Parented?: true;
}
//  cst226::CST226ButtonListener
export interface cst226_CST226ButtonListener {
    readonly __brand_cst226_CST226ButtonListener?: true;
}
//  cst226::CST226Touchscreen
export interface cst226_CST226Touchscreen {
    readonly __brand_cst226_CST226Touchscreen?: true;
    readonly __brand_touchscreen_Touchscreen?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  cst816::CST816Touchscreen
export interface cst816_CST816Touchscreen {
    readonly __brand_cst816_CST816Touchscreen?: true;
    readonly __brand_touchscreen_Touchscreen?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ct_clamp::CTClampSensor
export interface ct_clamp_CTClampSensor {
    readonly __brand_ct_clamp_CTClampSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  current_based::CurrentBasedCover
export interface current_based_CurrentBasedCover {
    readonly __brand_current_based_CurrentBasedCover?: true;
    readonly __brand_cover_Cover?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  cwww::CWWWLightOutput
export interface cwww_CWWWLightOutput {
    readonly __brand_cwww_CWWWLightOutput?: true;
    readonly __brand_light_LightOutput?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_light_AddressableLightState?: true;
}
//  dac7678::DAC7678Channel
export interface dac7678_DAC7678Channel {
    readonly __brand_dac7678_DAC7678Channel?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
}
//  dac7678::DAC7678Output
export interface dac7678_DAC7678Output {
    readonly __brand_dac7678_DAC7678Output?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  daikin::DaikinClimate
export interface daikin_DaikinClimate {
    readonly __brand_daikin_DaikinClimate?: true;
    readonly __brand_climate_ir_ClimateIR?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_remote_base_RemoteReceiverListener?: true;
    readonly __brand_remote_base_RemoteTransmittable?: true;
}
//  daikin_arc::DaikinArcClimate
export interface daikin_arc_DaikinArcClimate {
    readonly __brand_daikin_arc_DaikinArcClimate?: true;
    readonly __brand_climate_ir_ClimateIR?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_remote_base_RemoteReceiverListener?: true;
    readonly __brand_remote_base_RemoteTransmittable?: true;
}
//  daikin_brc::DaikinBrcClimate
export interface daikin_brc_DaikinBrcClimate {
    readonly __brand_daikin_brc_DaikinBrcClimate?: true;
    readonly __brand_climate_ir_ClimateIR?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_remote_base_RemoteReceiverListener?: true;
    readonly __brand_remote_base_RemoteTransmittable?: true;
}
//  dallas_temp::DallasTemperatureSensor
export interface dallas_temp_DallasTemperatureSensor {
    readonly __brand_dallas_temp_DallasTemperatureSensor?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_one_wire_OneWireDevice?: true;
}
//  daly_bms::DalyBmsComponent
export interface daly_bms_DalyBmsComponent {
    readonly __brand_daly_bms_DalyBmsComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  datetime::DateEntity
export interface datetime_DateEntity {
    readonly __brand_datetime_DateEntity?: true;
    readonly __brand_datetime_DateTimeEntity?: true;
    readonly __brand_datetime_TimeEntity?: true;
}
//  datetime::DateTimeBase
export interface datetime_DateTimeBase {
    readonly __brand_datetime_DateTimeBase?: true;
    readonly __brand_datetime_DateTimeEntity?: true;
    readonly __brand_datetime_TimeEntity?: true;
}
//  datetime::DateTimeEntity
export interface datetime_DateTimeEntity {
    readonly __brand_datetime_DateTimeEntity?: true;
}
//  datetime::TimeEntity
export interface datetime_TimeEntity {
    readonly __brand_datetime_TimeEntity?: true;
}
//  debug::DebugComponent
export interface debug_DebugComponent {
    readonly __brand_debug_DebugComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  deep_sleep::DeepSleepComponent
export interface deep_sleep_DeepSleepComponent {
    readonly __brand_deep_sleep_DeepSleepComponent?: true;
    readonly __brand_Component?: true;
}
//  delonghi::DelonghiClimate
export interface delonghi_DelonghiClimate {
    readonly __brand_delonghi_DelonghiClimate?: true;
    readonly __brand_climate_ir_ClimateIR?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_remote_base_RemoteReceiverListener?: true;
    readonly __brand_remote_base_RemoteTransmittable?: true;
}
//  dew_point::DewPointComponent
export interface dew_point_DewPointComponent {
    readonly __brand_dew_point_DewPointComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  dfplayer::DFPlayer
export interface dfplayer_DFPlayer {
    readonly __brand_dfplayer_DFPlayer?: true;
    readonly __brand_Component?: true;
}
//  dfrobot_sen0395::DfrobotSen0395Component
export interface dfrobot_sen0395_DfrobotSen0395Component {
    readonly __brand_dfrobot_sen0395_DfrobotSen0395Component?: true;
    readonly __brand_Component?: true;
}
//  dfrobot_sen0395::DfrobotSen0395Switch
export interface dfrobot_sen0395_DfrobotSen0395Switch {
    readonly __brand_dfrobot_sen0395_DfrobotSen0395Switch?: true;
    readonly __brand_dfrobot_sen0395_DfrobotSen0395Component?: true;
}
//  dfrobot_sen0395::Sen0395LedSwitch
export interface dfrobot_sen0395_Sen0395LedSwitch {
    readonly __brand_dfrobot_sen0395_Sen0395LedSwitch?: true;
    readonly __brand_dfrobot_sen0395_DfrobotSen0395Switch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_Parented?: true;
}
//  dfrobot_sen0395::Sen0395PowerSwitch
export interface dfrobot_sen0395_Sen0395PowerSwitch {
    readonly __brand_dfrobot_sen0395_Sen0395PowerSwitch?: true;
    readonly __brand_dfrobot_sen0395_DfrobotSen0395Switch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_Parented?: true;
}
//  dfrobot_sen0395::Sen0395StartAfterBootSwitch
export interface dfrobot_sen0395_Sen0395StartAfterBootSwitch {
    readonly __brand_dfrobot_sen0395_Sen0395StartAfterBootSwitch?: true;
    readonly __brand_dfrobot_sen0395_DfrobotSen0395Switch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_Parented?: true;
}
//  dfrobot_sen0395::Sen0395UartPresenceSwitch
export interface dfrobot_sen0395_Sen0395UartPresenceSwitch {
    readonly __brand_dfrobot_sen0395_Sen0395UartPresenceSwitch?: true;
    readonly __brand_dfrobot_sen0395_DfrobotSen0395Switch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_Parented?: true;
}
//  dht12::DHT12Component
export interface dht12_DHT12Component {
    readonly __brand_dht12_DHT12Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  dht::DHT
export interface dht_DHT {
    readonly __brand_dht_DHT?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  display::Display
export interface display_Display {
    readonly __brand_display_Display?: true;
}
//  display::DisplayBuffer
export interface display_DisplayBuffer {
    readonly __brand_display_DisplayBuffer?: true;
}
//  display::DisplayPage
export interface display_DisplayPage {
    readonly __brand_display_DisplayPage?: true;
}
//  display_menu_base::DisplayMenuComponent
export interface display_menu_base_DisplayMenuComponent {
    readonly __brand_display_menu_base_DisplayMenuComponent?: true;
}
//  dlms_meter::DlmsMeterComponent
export interface dlms_meter_DlmsMeterComponent {
    readonly __brand_dlms_meter_DlmsMeterComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  dps310::DPS310Component
export interface dps310_DPS310Component {
    readonly __brand_dps310_DPS310Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ds1307::DS1307Component
export interface ds1307_DS1307Component {
    readonly __brand_ds1307_DS1307Component?: true;
    readonly __brand_time_RealTimeClock?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ds2484::DS2484OneWireBus
export interface ds2484_DS2484OneWireBus {
    readonly __brand_ds2484_DS2484OneWireBus?: true;
    readonly __brand_one_wire_OneWireBus?: true;
    readonly __brand_i2c_I2CDevice?: true;
    readonly __brand_Component?: true;
}
//  duty_cycle::DutyCycleSensor
export interface duty_cycle_DutyCycleSensor {
    readonly __brand_duty_cycle_DutyCycleSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  duty_time_sensor::DutyTimeSensor
export interface duty_time_sensor_DutyTimeSensor {
    readonly __brand_duty_time_sensor_DutyTimeSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  e131::E131Component
export interface e131_E131Component {
    readonly __brand_e131_E131Component?: true;
    readonly __brand_Component?: true;
}
//  ee895::EE895Component
export interface ee895_EE895Component {
    readonly __brand_ee895_EE895Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ektf2232::EKTF2232Touchscreen
export interface ektf2232_EKTF2232Touchscreen {
    readonly __brand_ektf2232_EKTF2232Touchscreen?: true;
    readonly __brand_touchscreen_Touchscreen?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  emc2101::EMC2101Output
export interface emc2101_EMC2101Output {
    readonly __brand_emc2101_EMC2101Output?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
}
//  emc2101::EMC2101Sensor
export interface emc2101_EMC2101Sensor {
    readonly __brand_emc2101_EMC2101Sensor?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  emc2101::Emc2101Component
export interface emc2101_Emc2101Component {
    readonly __brand_emc2101_Emc2101Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  emmeti::EmmetiClimate
export interface emmeti_EmmetiClimate {
    readonly __brand_emmeti_EmmetiClimate?: true;
    readonly __brand_climate_ir_ClimateIR?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_remote_base_RemoteReceiverListener?: true;
    readonly __brand_remote_base_RemoteTransmittable?: true;
}
//  endstop::EndstopCover
export interface endstop_EndstopCover {
    readonly __brand_endstop_EndstopCover?: true;
    readonly __brand_cover_Cover?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  ens210::ENS210Component
export interface ens210_ENS210Component {
    readonly __brand_ens210_ENS210Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  es7210::ES7210
export interface es7210_ES7210 {
    readonly __brand_es7210_ES7210?: true;
    readonly __brand_audio_adc_AudioAdc?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  es7243e::ES7243E
export interface es7243e_ES7243E {
    readonly __brand_es7243e_ES7243E?: true;
    readonly __brand_audio_adc_AudioAdc?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  es8156::ES8156
export interface es8156_ES8156 {
    readonly __brand_es8156_ES8156?: true;
    readonly __brand_audio_dac_AudioDac?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  es8311::ES8311
export interface es8311_ES8311 {
    readonly __brand_es8311_ES8311?: true;
    readonly __brand_audio_dac_AudioDac?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  es8388::ADCInputMicSelect
export interface es8388_ADCInputMicSelect {
    readonly __brand_es8388_ADCInputMicSelect?: true;
    readonly __brand_select_Select?: true;
    readonly __brand_EntityBase?: true;
}
//  es8388::DacOutputSelect
export interface es8388_DacOutputSelect {
    readonly __brand_es8388_DacOutputSelect?: true;
    readonly __brand_select_Select?: true;
    readonly __brand_EntityBase?: true;
}
//  es8388::ES8388
export interface es8388_ES8388 {
    readonly __brand_es8388_ES8388?: true;
    readonly __brand_audio_dac_AudioDac?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  esp32_ble::ESP32BLE
export interface esp32_ble_ESP32BLE {
    readonly __brand_esp32_ble_ESP32BLE?: true;
    readonly __brand_Component?: true;
}
//  esp32_ble::GAPEventHandler
export interface esp32_ble_GAPEventHandler {
    readonly __brand_esp32_ble_GAPEventHandler?: true;
}
//  esp32_ble::GATTcEventHandler
export interface esp32_ble_GATTcEventHandler {
    readonly __brand_esp32_ble_GATTcEventHandler?: true;
}
//  esp32_ble::GATTsEventHandler
export interface esp32_ble_GATTsEventHandler {
    readonly __brand_esp32_ble_GATTsEventHandler?: true;
}
//  esp32_ble_beacon::ESP32BLEBeacon
export interface esp32_ble_beacon_ESP32BLEBeacon {
    readonly __brand_esp32_ble_beacon_ESP32BLEBeacon?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_GAPEventHandler?: true;
    readonly __brand_Parented?: true;
}
//  esp32_ble_client::BLEClientBase
export interface esp32_ble_client_BLEClientBase {
    readonly __brand_esp32_ble_client_BLEClientBase?: true;
}
//  esp32_ble_server::BLECharacteristic
export interface esp32_ble_server_BLECharacteristic {
    readonly __brand_esp32_ble_server_BLECharacteristic?: true;
}
//  esp32_ble_server::BLEDescriptor
export interface esp32_ble_server_BLEDescriptor {
    readonly __brand_esp32_ble_server_BLEDescriptor?: true;
}
//  esp32_ble_server::BLEServer
export interface esp32_ble_server_BLEServer {
    readonly __brand_esp32_ble_server_BLEServer?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_GATTsEventHandler?: true;
    readonly __brand_Parented?: true;
}
//  esp32_ble_server::BLEService
export interface esp32_ble_server_BLEService {
    readonly __brand_esp32_ble_server_BLEService?: true;
}
//  esp32_ble_server::esp32_ble_server_automations::BLECharacteristicSetValueAction
export interface esp32_ble_server_esp32_ble_server_automations_BLECharacteristicSetValueAction {
    readonly __brand_esp32_ble_server_esp32_ble_server_automations_BLECharacteristicSetValueAction?: true;
    readonly __brand_Action?: true;
}
//  esp32_ble_tracker::ESP32BLETracker
export interface esp32_ble_tracker_ESP32BLETracker {
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_GAPEventHandler?: true;
    readonly __brand_esp32_ble_GATTcEventHandler?: true;
    readonly __brand_Parented?: true;
}
//  esp32_ble_tracker::ESPBTClient
export interface esp32_ble_tracker_ESPBTClient {
    readonly __brand_esp32_ble_tracker_ESPBTClient?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  esp32_ble_tracker::ESPBTDeviceListener
export interface esp32_ble_tracker_ESPBTDeviceListener {
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  esp32_camera::ESP32Camera
export interface esp32_camera_ESP32Camera {
    readonly __brand_esp32_camera_ESP32Camera?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_EntityBase?: true;
}
//  esp32_camera_web_server::CameraWebServer
export interface esp32_camera_web_server_CameraWebServer {
    readonly __brand_esp32_camera_web_server_CameraWebServer?: true;
    readonly __brand_Component?: true;
}
//  esp32_can::ESP32Can
export interface esp32_can_ESP32Can {
    readonly __brand_esp32_can_ESP32Can?: true;
    readonly __brand_canbus_CanbusComponent?: true;
    readonly __brand_Component?: true;
}
//  esp32_dac::ESP32DAC
export interface esp32_dac_ESP32DAC {
    readonly __brand_esp32_dac_ESP32DAC?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
    readonly __brand_Component?: true;
}
//  esp32_hosted::Esp32HostedUpdate
export interface esp32_hosted_Esp32HostedUpdate {
    readonly __brand_esp32_hosted_Esp32HostedUpdate?: true;
    readonly __brand_update_UpdateEntity?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  esp32_improv::ESP32ImprovComponent
export interface esp32_improv_ESP32ImprovComponent {
    readonly __brand_esp32_improv_ESP32ImprovComponent?: true;
    readonly __brand_Component?: true;
}
//  esp32_rmt_led_strip::ESP32RMTLEDStripLightOutput
export interface esp32_rmt_led_strip_ESP32RMTLEDStripLightOutput {
    readonly __brand_esp32_rmt_led_strip_ESP32RMTLEDStripLightOutput?: true;
    readonly __brand_light_AddressableLight?: true;
    readonly __brand_light_LightOutput?: true;
    readonly __brand_Component?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_light_AddressableLightState?: true;
}
//  esp32_touch::ESP32TouchBinarySensor
export interface esp32_touch_ESP32TouchBinarySensor {
    readonly __brand_esp32_touch_ESP32TouchBinarySensor?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
}
//  esp32_touch::ESP32TouchComponent
export interface esp32_touch_ESP32TouchComponent {
    readonly __brand_esp32_touch_ESP32TouchComponent?: true;
    readonly __brand_Component?: true;
}
//  esp8266_pwm::ESP8266PWM
export interface esp8266_pwm_ESP8266PWM {
    readonly __brand_esp8266_pwm_ESP8266PWM?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
    readonly __brand_Component?: true;
}
//  esp_ldo::EspLdo
export interface esp_ldo_EspLdo {
    readonly __brand_esp_ldo_EspLdo?: true;
    readonly __brand_Component?: true;
}
//  esphome::ESPHomeOTAComponent
export interface esphome_ESPHomeOTAComponent {
    readonly __brand_esphome_ESPHomeOTAComponent?: true;
    readonly __brand_ota_OTAComponent?: true;
    readonly __brand_Component?: true;
}
//  esphome::dsmr::Dsmr
export interface esphome_dsmr_Dsmr {
    readonly __brand_esphome_dsmr_Dsmr?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  espnow::ESPNowComponent
export interface espnow_ESPNowComponent {
    readonly __brand_espnow_ESPNowComponent?: true;
    readonly __brand_Component?: true;
}
//  espnow::ESPNowTransport
export interface espnow_ESPNowTransport {
    readonly __brand_espnow_ESPNowTransport?: true;
    readonly __brand_packet_transport_PacketTransport?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_espnow_ESPNowComponent?: true;
}
//  ethernet::EthernetComponent
export interface ethernet_EthernetComponent {
    readonly __brand_ethernet_EthernetComponent?: true;
    readonly __brand_Component?: true;
}
//  ethernet_info::DNSAddressEthernetInfo
export interface ethernet_info_DNSAddressEthernetInfo {
    readonly __brand_ethernet_info_DNSAddressEthernetInfo?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  ethernet_info::IPAddressEthernetInfo
export interface ethernet_info_IPAddressEthernetInfo {
    readonly __brand_ethernet_info_IPAddressEthernetInfo?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  ethernet_info::MACAddressEthernetInfo
export interface ethernet_info_MACAddressEthernetInfo {
    readonly __brand_ethernet_info_MACAddressEthernetInfo?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  event::Event
export interface event_Event {
    readonly __brand_event_Event?: true;
    readonly __brand_EntityBase?: true;
}
//  ezo::EZOSensor
export interface ezo_EZOSensor {
    readonly __brand_ezo_EZOSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ezo_pmp::EzoPMP
export interface ezo_pmp_EzoPMP {
    readonly __brand_ezo_pmp_EzoPMP?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  factory_reset::FactoryResetButton
export interface factory_reset_FactoryResetButton {
    readonly __brand_factory_reset_FactoryResetButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  factory_reset::FactoryResetComponent
export interface factory_reset_FactoryResetComponent {
    readonly __brand_factory_reset_FactoryResetComponent?: true;
    readonly __brand_Component?: true;
}
//  factory_reset::FactoryResetSwitch
export interface factory_reset_FactoryResetSwitch {
    readonly __brand_factory_reset_FactoryResetSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  fan::Fan
export interface fan_Fan {
    readonly __brand_fan_Fan?: true;
}
//  feedback::FeedbackCover
export interface feedback_FeedbackCover {
    readonly __brand_feedback_FeedbackCover?: true;
    readonly __brand_cover_Cover?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  fingerprint_grow::FingerprintGrowComponent
export interface fingerprint_grow_FingerprintGrowComponent {
    readonly __brand_fingerprint_grow_FingerprintGrowComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
}
//  font::Font
export interface font_Font {
    readonly __brand_font_Font?: true;
}
//  font::Glyph
export interface font_Glyph {
    readonly __brand_font_Glyph?: true;
}
//  fs3000::FS3000Component
export interface fs3000_FS3000Component {
    readonly __brand_fs3000_FS3000Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  ft5x06::FT5x06Touchscreen
export interface ft5x06_FT5x06Touchscreen {
    readonly __brand_ft5x06_FT5x06Touchscreen?: true;
    readonly __brand_touchscreen_Touchscreen?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ft63x6::FT63X6Touchscreen
export interface ft63x6_FT63X6Touchscreen {
    readonly __brand_ft63x6_FT63X6Touchscreen?: true;
    readonly __brand_touchscreen_Touchscreen?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  fujitsu_general::FujitsuGeneralClimate
export interface fujitsu_general_FujitsuGeneralClimate {
    readonly __brand_fujitsu_general_FujitsuGeneralClimate?: true;
    readonly __brand_climate_ir_ClimateIR?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_remote_base_RemoteReceiverListener?: true;
    readonly __brand_remote_base_RemoteTransmittable?: true;
}
//  gcja5::GCJA5Component
export interface gcja5_GCJA5Component {
    readonly __brand_gcja5_GCJA5Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  gdk101::GDK101Component
export interface gdk101_GDK101Component {
    readonly __brand_gdk101_GDK101Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  gl_r01_i2c::GLR01I2CComponent
export interface gl_r01_i2c_GLR01I2CComponent {
    readonly __brand_gl_r01_i2c_GLR01I2CComponent?: true;
    readonly __brand_i2c_I2CDevice?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  gp2y1010au0f::GP2Y1010AU0FSensor
export interface gp2y1010au0f_GP2Y1010AU0FSensor {
    readonly __brand_gp2y1010au0f_GP2Y1010AU0FSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  gp8403::GP8403Component
export interface gp8403_GP8403Component {
    readonly __brand_gp8403_GP8403Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  gp8403::GP8403Output
export interface gp8403_GP8403Output {
    readonly __brand_gp8403_GP8403Output?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
}
//  gpio::GPIOBinaryOutput
export interface gpio_GPIOBinaryOutput {
    readonly __brand_gpio_GPIOBinaryOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
    readonly __brand_Component?: true;
}
//  gpio::GPIOBinarySensor
export interface gpio_GPIOBinarySensor {
    readonly __brand_gpio_GPIOBinarySensor?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  gpio::GPIOOneWireBus
export interface gpio_GPIOOneWireBus {
    readonly __brand_gpio_GPIOOneWireBus?: true;
    readonly __brand_one_wire_OneWireBus?: true;
    readonly __brand_Component?: true;
}
//  gpio::GPIOSwitch
export interface gpio_GPIOSwitch {
    readonly __brand_gpio_GPIOSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  gps::GPS
export interface gps_GPS {
    readonly __brand_gps_GPS?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  gps::GPSListener
export interface gps_GPSListener {
    readonly __brand_gps_GPSListener?: true;
}
//  gps::GPSTime
export interface gps_GPSTime {
    readonly __brand_gps_GPSTime?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_time_RealTimeClock?: true;
    readonly __brand_gps_GPSListener?: true;
}
//  graph::Graph
export interface graph_Graph {
    readonly __brand_graph_Graph?: true;
    readonly __brand_Component?: true;
}
//  graph::GraphLegend
export interface graph_GraphLegend {
    readonly __brand_graph_GraphLegend?: true;
}
//  graph::GraphTrace
export interface graph_GraphTrace {
    readonly __brand_graph_GraphTrace?: true;
}
//  graphical_display_menu::GraphicalDisplayMenu
export interface graphical_display_menu_GraphicalDisplayMenu {
    readonly __brand_graphical_display_menu_GraphicalDisplayMenu?: true;
    readonly __brand_display_menu_base_DisplayMenuComponent?: true;
    readonly __brand_Component?: true;
}
//  gree::GreeClimate
export interface gree_GreeClimate {
    readonly __brand_gree_GreeClimate?: true;
    readonly __brand_climate_ir_ClimateIR?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_remote_base_RemoteReceiverListener?: true;
    readonly __brand_remote_base_RemoteTransmittable?: true;
}
//  gree::GreeModeBitSwitch
export interface gree_GreeModeBitSwitch {
    readonly __brand_gree_GreeModeBitSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  grove_gas_mc_v2::GroveGasMultichannelV2Component
export interface grove_gas_mc_v2_GroveGasMultichannelV2Component {
    readonly __brand_grove_gas_mc_v2_GroveGasMultichannelV2Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  grove_tb6612fng::GroveMotorDriveTB6612FNG
export interface grove_tb6612fng_GroveMotorDriveTB6612FNG {
    readonly __brand_grove_tb6612fng_GroveMotorDriveTB6612FNG?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  growatt_solar::GrowattSolar
export interface growatt_solar_GrowattSolar {
    readonly __brand_growatt_solar_GrowattSolar?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_modbus_ModbusDevice?: true;
}
//  gt911::GT911Button
export interface gt911_GT911Button {
    readonly __brand_gt911_GT911Button?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_gt911_GT911ButtonListener?: true;
    readonly __brand_Parented?: true;
}
//  gt911::GT911ButtonListener
export interface gt911_GT911ButtonListener {
    readonly __brand_gt911_GT911ButtonListener?: true;
}
//  gt911::GT911Touchscreen
export interface gt911_GT911Touchscreen {
    readonly __brand_gt911_GT911Touchscreen?: true;
    readonly __brand_touchscreen_Touchscreen?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  haier::BeeperSwitch
export interface haier_BeeperSwitch {
    readonly __brand_haier_BeeperSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
}
//  haier::DisplaySwitch
export interface haier_DisplaySwitch {
    readonly __brand_haier_DisplaySwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
}
//  haier::HaierClimateBase
export interface haier_HaierClimateBase {
    readonly __brand_haier_HaierClimateBase?: true;
}
//  haier::HealthModeSwitch
export interface haier_HealthModeSwitch {
    readonly __brand_haier_HealthModeSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
}
//  haier::HonClimate
export interface haier_HonClimate {
    readonly __brand_haier_HonClimate?: true;
    readonly __brand_haier_HaierClimateBase?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  haier::QuietModeSwitch
export interface haier_QuietModeSwitch {
    readonly __brand_haier_QuietModeSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
}
//  haier::SelfCleaningButton
export interface haier_SelfCleaningButton {
    readonly __brand_haier_SelfCleaningButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  haier::Smartair2Climate
export interface haier_Smartair2Climate {
    readonly __brand_haier_Smartair2Climate?: true;
    readonly __brand_haier_HaierClimateBase?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  haier::SteriCleaningButton
export interface haier_SteriCleaningButton {
    readonly __brand_haier_SteriCleaningButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  havells_solar::HavellsSolar
export interface havells_solar_HavellsSolar {
    readonly __brand_havells_solar_HavellsSolar?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_modbus_ModbusDevice?: true;
}
//  hbridge::HBridgeFan
export interface hbridge_HBridgeFan {
    readonly __brand_hbridge_HBridgeFan?: true;
    readonly __brand_Component?: true;
    readonly __brand_fan_Fan?: true;
    readonly __brand_EntityBase?: true;
}
//  hbridge::HBridgeLightOutput
export interface hbridge_HBridgeLightOutput {
    readonly __brand_hbridge_HBridgeLightOutput?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_light_LightOutput?: true;
    readonly __brand_hbridge_HBridgeFan?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_light_AddressableLightState?: true;
}
//  hbridge::HBridgeSwitch
export interface hbridge_HBridgeSwitch {
    readonly __brand_hbridge_HBridgeSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  hc8::HC8Component
export interface hc8_HC8Component {
    readonly __brand_hc8_HC8Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
}
//  hdc1080::HDC1080Component
export interface hdc1080_HDC1080Component {
    readonly __brand_hdc1080_HDC1080Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  hdc2010::HDC2010Component
export interface hdc2010_HDC2010Component {
    readonly __brand_hdc2010_HDC2010Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  hdc302x::HDC302XComponent
export interface hdc302x_HDC302XComponent {
    readonly __brand_hdc302x_HDC302XComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  he60r::HE60rCover
export interface he60r_HE60rCover {
    readonly __brand_he60r_HE60rCover?: true;
    readonly __brand_cover_Cover?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  heatpumpir::HeatpumpIRClimate
export interface heatpumpir_HeatpumpIRClimate {
    readonly __brand_heatpumpir_HeatpumpIRClimate?: true;
    readonly __brand_climate_ir_ClimateIR?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_remote_base_RemoteReceiverListener?: true;
    readonly __brand_remote_base_RemoteTransmittable?: true;
}
//  hitachi_ac344::HitachiClimate
export interface hitachi_ac344_HitachiClimate {
    readonly __brand_hitachi_ac344_HitachiClimate?: true;
    readonly __brand_climate_ir_ClimateIR?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_remote_base_RemoteReceiverListener?: true;
    readonly __brand_remote_base_RemoteTransmittable?: true;
}
//  hitachi_ac424::HitachiClimate
export interface hitachi_ac424_HitachiClimate {
    readonly __brand_hitachi_ac424_HitachiClimate?: true;
    readonly __brand_climate_ir_ClimateIR?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_remote_base_RemoteReceiverListener?: true;
    readonly __brand_remote_base_RemoteTransmittable?: true;
}
//  hlk_fm22x::HlkFm22xComponent
export interface hlk_fm22x_HlkFm22xComponent {
    readonly __brand_hlk_fm22x_HlkFm22xComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
}
//  hlw8012::HLW8012Component
export interface hlw8012_HLW8012Component {
    readonly __brand_hlw8012_HLW8012Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  hlw8032::HLW8032Component
export interface hlw8032_HLW8032Component {
    readonly __brand_hlw8032_HLW8032Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  hm3301::HM3301Component
export interface hm3301_HM3301Component {
    readonly __brand_hm3301_HM3301Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  hmc5883l::HMC5883LComponent
export interface hmc5883l_HMC5883LComponent {
    readonly __brand_hmc5883l_HMC5883LComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  homeassistant::HomeassistantBinarySensor
export interface homeassistant_HomeassistantBinarySensor {
    readonly __brand_homeassistant_HomeassistantBinarySensor?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  homeassistant::HomeassistantNumber
export interface homeassistant_HomeassistantNumber {
    readonly __brand_homeassistant_HomeassistantNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  homeassistant::HomeassistantSensor
export interface homeassistant_HomeassistantSensor {
    readonly __brand_homeassistant_HomeassistantSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  homeassistant::HomeassistantSwitch
export interface homeassistant_HomeassistantSwitch {
    readonly __brand_homeassistant_HomeassistantSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  homeassistant::HomeassistantTextSensor
export interface homeassistant_HomeassistantTextSensor {
    readonly __brand_homeassistant_HomeassistantTextSensor?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  homeassistant::HomeassistantTime
export interface homeassistant_HomeassistantTime {
    readonly __brand_homeassistant_HomeassistantTime?: true;
    readonly __brand_time_RealTimeClock?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  honeywell_hih_i2c::HoneywellHIComponent
export interface honeywell_hih_i2c_HoneywellHIComponent {
    readonly __brand_honeywell_hih_i2c_HoneywellHIComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  honeywellabp2_i2c::HONEYWELLABP2Sensor
export interface honeywellabp2_i2c_HONEYWELLABP2Sensor {
    readonly __brand_honeywellabp2_i2c_HONEYWELLABP2Sensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  honeywellabp::HONEYWELLABPSensor
export interface honeywellabp_HONEYWELLABPSensor {
    readonly __brand_honeywellabp_HONEYWELLABPSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  host::HostTime
export interface host_HostTime {
    readonly __brand_host_HostTime?: true;
    readonly __brand_time_RealTimeClock?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  hrxl_maxsonar_wr::HrxlMaxsonarWrComponent
export interface hrxl_maxsonar_wr_HrxlMaxsonarWrComponent {
    readonly __brand_hrxl_maxsonar_wr_HrxlMaxsonarWrComponent?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
}
//  hte501::HTE501Component
export interface hte501_HTE501Component {
    readonly __brand_hte501_HTE501Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  http_request::HttpRequestComponent
export interface http_request_HttpRequestComponent {
    readonly __brand_http_request_HttpRequestComponent?: true;
    readonly __brand_Component?: true;
}
//  http_request::HttpRequestUpdate
export interface http_request_HttpRequestUpdate {
    readonly __brand_http_request_HttpRequestUpdate?: true;
    readonly __brand_update_UpdateEntity?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  http_request::OtaHttpRequestComponent
export interface http_request_OtaHttpRequestComponent {
    readonly __brand_http_request_OtaHttpRequestComponent?: true;
    readonly __brand_ota_OTAComponent?: true;
    readonly __brand_Component?: true;
}
//  htu21d::HTU21DComponent
export interface htu21d_HTU21DComponent {
    readonly __brand_htu21d_HTU21DComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  htu31d::HTU31DComponent
export interface htu31d_HTU31DComponent {
    readonly __brand_htu31d_HTU31DComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  hx711::HX711Sensor
export interface hx711_HX711Sensor {
    readonly __brand_hx711_HX711Sensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  hydreon_rgxx::HydreonRGxxBinaryComponent
export interface hydreon_rgxx_HydreonRGxxBinaryComponent {
    readonly __brand_hydreon_rgxx_HydreonRGxxBinaryComponent?: true;
    readonly __brand_Component?: true;
}
//  hydreon_rgxx::HydreonRGxxComponent
export interface hydreon_rgxx_HydreonRGxxComponent {
    readonly __brand_hydreon_rgxx_HydreonRGxxComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  hyt271::HYT271Component
export interface hyt271_HYT271Component {
    readonly __brand_hyt271_HYT271Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  i2c::I2CBus
export interface i2c_I2CBus {
    readonly __brand_i2c_I2CBus?: true;
    readonly __brand_Component?: true;
}
//  i2c::I2CDevice
export interface i2c_I2CDevice {
    readonly __brand_i2c_I2CDevice?: true;
}
//  i2c::InternalI2CBus
export interface i2c_InternalI2CBus {
    readonly __brand_i2c_InternalI2CBus?: true;
}
//  i2c_device::I2CDeviceComponent
export interface i2c_device_I2CDeviceComponent {
    readonly __brand_i2c_device_I2CDeviceComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  i2s_audio::I2SAudioBase
export interface i2s_audio_I2SAudioBase {
    readonly __brand_i2s_audio_I2SAudioBase?: true;
}
//  i2s_audio::I2SAudioComponent
export interface i2s_audio_I2SAudioComponent {
    readonly __brand_i2s_audio_I2SAudioComponent?: true;
    readonly __brand_Component?: true;
}
//  i2s_audio::I2SAudioIn
export interface i2s_audio_I2SAudioIn {
    readonly __brand_i2s_audio_I2SAudioIn?: true;
}
//  i2s_audio::I2SAudioMediaPlayer
export interface i2s_audio_I2SAudioMediaPlayer {
    readonly __brand_i2s_audio_I2SAudioMediaPlayer?: true;
    readonly __brand_Component?: true;
    readonly __brand_media_player_MediaPlayer?: true;
    readonly __brand_i2s_audio_I2SAudioOut?: true;
    readonly __brand_i2s_audio_I2SAudioBase?: true;
    readonly __brand_Parented?: true;
}
//  i2s_audio::I2SAudioMicrophone
export interface i2s_audio_I2SAudioMicrophone {
    readonly __brand_i2s_audio_I2SAudioMicrophone?: true;
    readonly __brand_i2s_audio_I2SAudioIn?: true;
    readonly __brand_i2s_audio_I2SAudioBase?: true;
    readonly __brand_Parented?: true;
    readonly __brand_microphone_Microphone?: true;
    readonly __brand_Component?: true;
}
//  i2s_audio::I2SAudioOut
export interface i2s_audio_I2SAudioOut {
    readonly __brand_i2s_audio_I2SAudioOut?: true;
}
//  i2s_audio::I2SAudioSpeaker
export interface i2s_audio_I2SAudioSpeaker {
    readonly __brand_i2s_audio_I2SAudioSpeaker?: true;
    readonly __brand_Component?: true;
    readonly __brand_speaker_Speaker?: true;
    readonly __brand_i2s_audio_I2SAudioOut?: true;
    readonly __brand_i2s_audio_I2SAudioBase?: true;
    readonly __brand_Parented?: true;
}
//  iaqcore::IAQCore
export interface iaqcore_IAQCore {
    readonly __brand_iaqcore_IAQCore?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ili9xxx::ILI9XXXDisplay
export interface ili9xxx_ILI9XXXDisplay {
    readonly __brand_ili9xxx_ILI9XXXDisplay?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
    readonly __brand_display_Display?: true;
    readonly __brand_display_DisplayBuffer?: true;
}
//  image::Image
export interface image_Image {
    readonly __brand_image_Image?: true;
}
//  improv_serial::ImprovSerialComponent
export interface improv_serial_ImprovSerialComponent {
    readonly __brand_improv_serial_ImprovSerialComponent?: true;
    readonly __brand_Component?: true;
}
//  ina219::INA219Component
export interface ina219_INA219Component {
    readonly __brand_ina219_INA219Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ina226::INA226Component
export interface ina226_INA226Component {
    readonly __brand_ina226_INA226Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ina260::INA260Component
export interface ina260_INA260Component {
    readonly __brand_ina260_INA260Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ina2xx_base::INA2XX
export interface ina2xx_base_INA2XX {
    readonly __brand_ina2xx_base_INA2XX?: true;
}
//  ina2xx_i2c::INA2XXI2C
export interface ina2xx_i2c_INA2XXI2C {
    readonly __brand_ina2xx_i2c_INA2XXI2C?: true;
    readonly __brand_ina2xx_base_INA2XX?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ina2xx_spi::INA2XXSPI
export interface ina2xx_spi_INA2XXSPI {
    readonly __brand_ina2xx_spi_INA2XXSPI?: true;
    readonly __brand_ina2xx_base_INA2XX?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  ina3221::INA3221Component
export interface ina3221_INA3221Component {
    readonly __brand_ina3221_INA3221Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  infrared::Infrared
export interface infrared_Infrared {
    readonly __brand_infrared_Infrared?: true;
}
//  inkbird_ibsth1_mini::InkbirdIbstH1Mini
export interface inkbird_ibsth1_mini_InkbirdIbstH1Mini {
    readonly __brand_inkbird_ibsth1_mini_InkbirdIbstH1Mini?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  inkplate::Inkplate
export interface inkplate_Inkplate {
    readonly __brand_inkplate_Inkplate?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
    readonly __brand_display_Display?: true;
    readonly __brand_display_DisplayBuffer?: true;
}
//  integration::IntegrationSensor
export interface integration_IntegrationSensor {
    readonly __brand_integration_IntegrationSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  internal_temperature::InternalTemperatureSensor
export interface internal_temperature_InternalTemperatureSensor {
    readonly __brand_internal_temperature_InternalTemperatureSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  interval::IntervalTrigger
export interface interval_IntervalTrigger {
    readonly __brand_interval_IntervalTrigger?: true;
    readonly __brand_Trigger?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  ir_rf_proxy::IrRfProxy
export interface ir_rf_proxy_IrRfProxy {
    readonly __brand_ir_rf_proxy_IrRfProxy?: true;
    readonly __brand_infrared_Infrared?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  jsn_sr04t::Jsnsr04tComponent
export interface jsn_sr04t_Jsnsr04tComponent {
    readonly __brand_jsn_sr04t_Jsnsr04tComponent?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
}
//  kamstrup_kmp::KamstrupKMPComponent
export interface kamstrup_kmp_KamstrupKMPComponent {
    readonly __brand_kamstrup_kmp_KamstrupKMPComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  key_collector::KeyCollector
export interface key_collector_KeyCollector {
    readonly __brand_key_collector_KeyCollector?: true;
    readonly __brand_Component?: true;
}
//  key_provider::KeyProvider
export interface key_provider_KeyProvider {
    readonly __brand_key_provider_KeyProvider?: true;
}
//  kmeteriso::KMeterISOComponent
export interface kmeteriso_KMeterISOComponent {
    readonly __brand_kmeteriso_KMeterISOComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  kuntze::Kuntze
export interface kuntze_Kuntze {
    readonly __brand_kuntze_Kuntze?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_modbus_ModbusDevice?: true;
}
//  lc709203f::Lc709203f
export interface lc709203f_Lc709203f {
    readonly __brand_lc709203f_Lc709203f?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  lcd_base::LCDDisplay
export interface lcd_base_LCDDisplay {
    readonly __brand_lcd_base_LCDDisplay?: true;
}
//  lcd_gpio::GPIOLCDDisplay
export interface lcd_gpio_GPIOLCDDisplay {
    readonly __brand_lcd_gpio_GPIOLCDDisplay?: true;
    readonly __brand_lcd_base_LCDDisplay?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  lcd_menu::LCDCharacterMenuComponent
export interface lcd_menu_LCDCharacterMenuComponent {
    readonly __brand_lcd_menu_LCDCharacterMenuComponent?: true;
    readonly __brand_display_menu_base_DisplayMenuComponent?: true;
    readonly __brand_Component?: true;
}
//  lcd_pcf8574::PCF8574LCDDisplay
export interface lcd_pcf8574_PCF8574LCDDisplay {
    readonly __brand_lcd_pcf8574_PCF8574LCDDisplay?: true;
    readonly __brand_lcd_base_LCDDisplay?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ld2410::BaudRateSelect
export interface ld2410_BaudRateSelect {
    readonly __brand_ld2410_BaudRateSelect?: true;
    readonly __brand_select_Select?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2410::BluetoothSwitch
export interface ld2410_BluetoothSwitch {
    readonly __brand_ld2410_BluetoothSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2410::DistanceResolutionSelect
export interface ld2410_DistanceResolutionSelect {
    readonly __brand_ld2410_DistanceResolutionSelect?: true;
    readonly __brand_select_Select?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2410::EngineeringModeSwitch
export interface ld2410_EngineeringModeSwitch {
    readonly __brand_ld2410_EngineeringModeSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2410::FactoryResetButton
export interface ld2410_FactoryResetButton {
    readonly __brand_ld2410_FactoryResetButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2410::GateThresholdNumber
export interface ld2410_GateThresholdNumber {
    readonly __brand_ld2410_GateThresholdNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2410::LD2410Component
export interface ld2410_LD2410Component {
    readonly __brand_ld2410_LD2410Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  ld2410::LightOutControlSelect
export interface ld2410_LightOutControlSelect {
    readonly __brand_ld2410_LightOutControlSelect?: true;
    readonly __brand_select_Select?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2410::LightThresholdNumber
export interface ld2410_LightThresholdNumber {
    readonly __brand_ld2410_LightThresholdNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2410::MaxDistanceTimeoutNumber
export interface ld2410_MaxDistanceTimeoutNumber {
    readonly __brand_ld2410_MaxDistanceTimeoutNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2410::QueryButton
export interface ld2410_QueryButton {
    readonly __brand_ld2410_QueryButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2410::RestartButton
export interface ld2410_RestartButton {
    readonly __brand_ld2410_RestartButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2412::BaudRateSelect
export interface ld2412_BaudRateSelect {
    readonly __brand_ld2412_BaudRateSelect?: true;
    readonly __brand_select_Select?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2412::BluetoothSwitch
export interface ld2412_BluetoothSwitch {
    readonly __brand_ld2412_BluetoothSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2412::DistanceResolutionSelect
export interface ld2412_DistanceResolutionSelect {
    readonly __brand_ld2412_DistanceResolutionSelect?: true;
    readonly __brand_select_Select?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2412::EngineeringModeSwitch
export interface ld2412_EngineeringModeSwitch {
    readonly __brand_ld2412_EngineeringModeSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2412::FactoryResetButton
export interface ld2412_FactoryResetButton {
    readonly __brand_ld2412_FactoryResetButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2412::GateThresholdNumber
export interface ld2412_GateThresholdNumber {
    readonly __brand_ld2412_GateThresholdNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2412::LD2412Component
export interface ld2412_LD2412Component {
    readonly __brand_ld2412_LD2412Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  ld2412::LightOutControlSelect
export interface ld2412_LightOutControlSelect {
    readonly __brand_ld2412_LightOutControlSelect?: true;
    readonly __brand_select_Select?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2412::LightThresholdNumber
export interface ld2412_LightThresholdNumber {
    readonly __brand_ld2412_LightThresholdNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2412::MaxDistanceTimeoutNumber
export interface ld2412_MaxDistanceTimeoutNumber {
    readonly __brand_ld2412_MaxDistanceTimeoutNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2412::QueryButton
export interface ld2412_QueryButton {
    readonly __brand_ld2412_QueryButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2412::RestartButton
export interface ld2412_RestartButton {
    readonly __brand_ld2412_RestartButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2412::StartDynamicBackgroundCorrectionButton
export interface ld2412_StartDynamicBackgroundCorrectionButton {
    readonly __brand_ld2412_StartDynamicBackgroundCorrectionButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2420::LD2420ApplyConfigButton
export interface ld2420_LD2420ApplyConfigButton {
    readonly __brand_ld2420_LD2420ApplyConfigButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2420::LD2420BinarySensor
export interface ld2420_LD2420BinarySensor {
    readonly __brand_ld2420_LD2420BinarySensor?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  ld2420::LD2420Component
export interface ld2420_LD2420Component {
    readonly __brand_ld2420_LD2420Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  ld2420::LD2420FactoryResetButton
export interface ld2420_LD2420FactoryResetButton {
    readonly __brand_ld2420_LD2420FactoryResetButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2420::LD2420GateSelectNumber
export interface ld2420_LD2420GateSelectNumber {
    readonly __brand_ld2420_LD2420GateSelectNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2420::LD2420MaxDistanceNumber
export interface ld2420_LD2420MaxDistanceNumber {
    readonly __brand_ld2420_LD2420MaxDistanceNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2420::LD2420MinDistanceNumber
export interface ld2420_LD2420MinDistanceNumber {
    readonly __brand_ld2420_LD2420MinDistanceNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2420::LD2420MoveSensFactorNumber
export interface ld2420_LD2420MoveSensFactorNumber {
    readonly __brand_ld2420_LD2420MoveSensFactorNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2420::LD2420MoveThresholdNumbers
export interface ld2420_LD2420MoveThresholdNumbers {
    readonly __brand_ld2420_LD2420MoveThresholdNumbers?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2420::LD2420RestartModuleButton
export interface ld2420_LD2420RestartModuleButton {
    readonly __brand_ld2420_LD2420RestartModuleButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2420::LD2420RevertConfigButton
export interface ld2420_LD2420RevertConfigButton {
    readonly __brand_ld2420_LD2420RevertConfigButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2420::LD2420Select
export interface ld2420_LD2420Select {
    readonly __brand_ld2420_LD2420Select?: true;
    readonly __brand_Component?: true;
}
//  ld2420::LD2420Sensor
export interface ld2420_LD2420Sensor {
    readonly __brand_ld2420_LD2420Sensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  ld2420::LD2420StillSensFactorNumber
export interface ld2420_LD2420StillSensFactorNumber {
    readonly __brand_ld2420_LD2420StillSensFactorNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2420::LD2420StillThresholdNumbers
export interface ld2420_LD2420StillThresholdNumbers {
    readonly __brand_ld2420_LD2420StillThresholdNumbers?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2420::LD2420TextSensor
export interface ld2420_LD2420TextSensor {
    readonly __brand_ld2420_LD2420TextSensor?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  ld2420::LD2420TimeoutNumber
export interface ld2420_LD2420TimeoutNumber {
    readonly __brand_ld2420_LD2420TimeoutNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2450::BaudRateSelect
export interface ld2450_BaudRateSelect {
    readonly __brand_ld2450_BaudRateSelect?: true;
    readonly __brand_select_Select?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2450::BluetoothSwitch
export interface ld2450_BluetoothSwitch {
    readonly __brand_ld2450_BluetoothSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2450::FactoryResetButton
export interface ld2450_FactoryResetButton {
    readonly __brand_ld2450_FactoryResetButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2450::LD2450Component
export interface ld2450_LD2450Component {
    readonly __brand_ld2450_LD2450Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  ld2450::MultiTargetSwitch
export interface ld2450_MultiTargetSwitch {
    readonly __brand_ld2450_MultiTargetSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2450::PresenceTimeoutNumber
export interface ld2450_PresenceTimeoutNumber {
    readonly __brand_ld2450_PresenceTimeoutNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2450::RestartButton
export interface ld2450_RestartButton {
    readonly __brand_ld2450_RestartButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2450::ZoneCoordinateNumber
export interface ld2450_ZoneCoordinateNumber {
    readonly __brand_ld2450_ZoneCoordinateNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
}
//  ld2450::ZoneTypeSelect
export interface ld2450_ZoneTypeSelect {
    readonly __brand_ld2450_ZoneTypeSelect?: true;
    readonly __brand_select_Select?: true;
    readonly __brand_EntityBase?: true;
}
//  ledc::LEDCOutput
export interface ledc_LEDCOutput {
    readonly __brand_ledc_LEDCOutput?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
    readonly __brand_Component?: true;
}
//  libretiny::ArduinoInternalGPIOPin
export interface libretiny_ArduinoInternalGPIOPin {
    readonly __brand_libretiny_ArduinoInternalGPIOPin?: true;
    readonly __brand_InternalGPIOPin?: true;
    readonly __brand_GPIOPin?: true;
}
//  libretiny::LTComponent
export interface libretiny_LTComponent {
    readonly __brand_libretiny_LTComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  libretiny_pwm::LibreTinyPWM
export interface libretiny_pwm_LibreTinyPWM {
    readonly __brand_libretiny_pwm_LibreTinyPWM?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
    readonly __brand_Component?: true;
}
//  light::AddressableLight
export interface light_AddressableLight {
    readonly __brand_light_AddressableLight?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_light_AddressableLightState?: true;
}
//  light::AddressableLightState
export interface light_AddressableLightState {
    readonly __brand_light_AddressableLightState?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  light::AddressableLightWrapper
export interface light_AddressableLightWrapper {
    readonly __brand_light_AddressableLightWrapper?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_light_AddressableLightState?: true;
}
//  light::LightOutput
export interface light_LightOutput {
    readonly __brand_light_LightOutput?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_light_AddressableLightState?: true;
}
//  light::LightState
export interface light_LightState {
    readonly __brand_light_LightState?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  lightwaverf::LightWaveRF
export interface lightwaverf_LightWaveRF {
    readonly __brand_lightwaverf_LightWaveRF?: true;
    readonly __brand_Component?: true;
    readonly __brand_PollingComponent?: true;
}
//  lilygo_t5_47::LilygoT547Touchscreen
export interface lilygo_t5_47_LilygoT547Touchscreen {
    readonly __brand_lilygo_t5_47_LilygoT547Touchscreen?: true;
    readonly __brand_touchscreen_Touchscreen?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  lm75b::LM75BComponent
export interface lm75b_LM75BComponent {
    readonly __brand_lm75b_LM75BComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  lock::Lock
export interface lock_Lock {
    readonly __brand_lock_Lock?: true;
}
//  logger::Logger
export interface logger_Logger {
    readonly __brand_logger_Logger?: true;
    readonly __brand_Component?: true;
}
//  logger::LoggerLevelSelect
export interface logger_LoggerLevelSelect {
    readonly __brand_logger_LoggerLevelSelect?: true;
    readonly __brand_select_Select?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  lps22::LPS22Component
export interface lps22_LPS22Component {
    readonly __brand_lps22_LPS22Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ltr390::LTR390Component
export interface ltr390_LTR390Component {
    readonly __brand_ltr390_LTR390Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ltr501::LTRAlsPs501Component
export interface ltr501_LTRAlsPs501Component {
    readonly __brand_ltr501_LTRAlsPs501Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ltr_als_ps::LTRAlsPsComponent
export interface ltr_als_ps_LTRAlsPsComponent {
    readonly __brand_ltr_als_ps_LTRAlsPsComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  lv_led_t
export interface lv_led_t {
    readonly __brand_lv_led_t?: true;
}
//  lvgl::LVGLNumber
export interface lvgl_LVGLNumber {
    readonly __brand_lvgl_LVGLNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  lvgl::LVGLSelect
export interface lvgl_LVGLSelect {
    readonly __brand_lvgl_LVGLSelect?: true;
    readonly __brand_select_Select?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  lvgl::LVGLSwitch
export interface lvgl_LVGLSwitch {
    readonly __brand_lvgl_LVGLSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  lvgl::LVGLText
export interface lvgl_LVGLText {
    readonly __brand_lvgl_LVGLText?: true;
    readonly __brand_text_Text?: true;
    readonly __brand_EntityBase?: true;
}
//  lvgl::LVLight
export interface lvgl_LVLight {
    readonly __brand_lvgl_LVLight?: true;
    readonly __brand_light_LightOutput?: true;
    readonly __brand_lvgl_LvglComponent?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_light_AddressableLightState?: true;
}
//  lvgl::LvPseudoButton
export interface lvgl_LvPseudoButton {
    readonly __brand_lvgl_LvPseudoButton?: true;
    readonly __brand_lvgl_LvglComponent?: true;
}
//  m5stack_8angle::M5Stack8AngleComponent
export interface m5stack_8angle_M5Stack8AngleComponent {
    readonly __brand_m5stack_8angle_M5Stack8AngleComponent?: true;
    readonly __brand_i2c_I2CDevice?: true;
    readonly __brand_Component?: true;
}
//  m5stack_8angle::M5Stack8AngleKnobSensor
export interface m5stack_8angle_M5Stack8AngleKnobSensor {
    readonly __brand_m5stack_8angle_M5Stack8AngleKnobSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  m5stack_8angle::M5Stack8AngleLightOutput
export interface m5stack_8angle_M5Stack8AngleLightOutput {
    readonly __brand_m5stack_8angle_M5Stack8AngleLightOutput?: true;
    readonly __brand_light_AddressableLight?: true;
    readonly __brand_light_LightOutput?: true;
    readonly __brand_Component?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_light_AddressableLightState?: true;
}
//  m5stack_8angle::M5Stack8AngleSwitchBinarySensor
export interface m5stack_8angle_M5Stack8AngleSwitchBinarySensor {
    readonly __brand_m5stack_8angle_M5Stack8AngleSwitchBinarySensor?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  matrix_keypad::MatrixKeypad
export interface matrix_keypad_MatrixKeypad {
    readonly __brand_matrix_keypad_MatrixKeypad?: true;
    readonly __brand_key_provider_KeyProvider?: true;
    readonly __brand_Component?: true;
}
//  matrix_keypad::MatrixKeypadBinarySensor
export interface matrix_keypad_MatrixKeypadBinarySensor {
    readonly __brand_matrix_keypad_MatrixKeypadBinarySensor?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
}
//  max17043::MAX17043Component
export interface max17043_MAX17043Component {
    readonly __brand_max17043_MAX17043Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  max31855::MAX31855Sensor
export interface max31855_MAX31855Sensor {
    readonly __brand_max31855_MAX31855Sensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  max31856::MAX31856Sensor
export interface max31856_MAX31856Sensor {
    readonly __brand_max31856_MAX31856Sensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  max31865::MAX31865Sensor
export interface max31865_MAX31865Sensor {
    readonly __brand_max31865_MAX31865Sensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  max44009::MAX44009Sensor
export interface max44009_MAX44009Sensor {
    readonly __brand_max44009_MAX44009Sensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  max6675::MAX6675Sensor
export interface max6675_MAX6675Sensor {
    readonly __brand_max6675_MAX6675Sensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  max6956::MAX6956
export interface max6956_MAX6956 {
    readonly __brand_max6956_MAX6956?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  max6956::MAX6956LedChannel
export interface max6956_MAX6956LedChannel {
    readonly __brand_max6956_MAX6956LedChannel?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
    readonly __brand_Component?: true;
}
//  max7219::MAX7219Component
export interface max7219_MAX7219Component {
    readonly __brand_max7219_MAX7219Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  max7219digit::MAX7219Component
export interface max7219digit_MAX7219Component {
    readonly __brand_max7219digit_MAX7219Component?: true;
    readonly __brand_spi_SPIDevice?: true;
    readonly __brand_display_DisplayBuffer?: true;
    readonly __brand_display_Display?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  max9611::MAX9611Component
export interface max9611_MAX9611Component {
    readonly __brand_max9611_MAX9611Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  mcp23008::MCP23008
export interface mcp23008_MCP23008 {
    readonly __brand_mcp23008_MCP23008?: true;
    readonly __brand_mcp23x08_base_MCP23X08Base?: true;
    readonly __brand_mcp23xxx_base_MCP23XXXBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  mcp23016::MCP23016
export interface mcp23016_MCP23016 {
    readonly __brand_mcp23016_MCP23016?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  mcp23017::MCP23017
export interface mcp23017_MCP23017 {
    readonly __brand_mcp23017_MCP23017?: true;
    readonly __brand_mcp23x17_base_MCP23X17Base?: true;
    readonly __brand_mcp23xxx_base_MCP23XXXBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  mcp23s08::MCP23S08
export interface mcp23s08_MCP23S08 {
    readonly __brand_mcp23s08_MCP23S08?: true;
    readonly __brand_mcp23x08_base_MCP23X08Base?: true;
    readonly __brand_mcp23xxx_base_MCP23XXXBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  mcp23s17::MCP23S17
export interface mcp23s17_MCP23S17 {
    readonly __brand_mcp23s17_MCP23S17?: true;
    readonly __brand_mcp23x17_base_MCP23X17Base?: true;
    readonly __brand_mcp23xxx_base_MCP23XXXBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  mcp23x08_base::MCP23X08Base
export interface mcp23x08_base_MCP23X08Base {
    readonly __brand_mcp23x08_base_MCP23X08Base?: true;
}
//  mcp23x17_base::MCP23X17Base
export interface mcp23x17_base_MCP23X17Base {
    readonly __brand_mcp23x17_base_MCP23X17Base?: true;
}
//  mcp23xxx_base::MCP23XXXBase
export interface mcp23xxx_base_MCP23XXXBase {
    readonly __brand_mcp23xxx_base_MCP23XXXBase?: true;
}
//  mcp2515::MCP2515
export interface mcp2515_MCP2515 {
    readonly __brand_mcp2515_MCP2515?: true;
    readonly __brand_canbus_CanbusComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  mcp3008::MCP3008
export interface mcp3008_MCP3008 {
    readonly __brand_mcp3008_MCP3008?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  mcp3008::MCP3008Sensor
export interface mcp3008_MCP3008Sensor {
    readonly __brand_mcp3008_MCP3008Sensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_voltage_sampler_VoltageSampler?: true;
    readonly __brand_Parented?: true;
}
//  mcp3204::MCP3204
export interface mcp3204_MCP3204 {
    readonly __brand_mcp3204_MCP3204?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  mcp3204::MCP3204Sensor
export interface mcp3204_MCP3204Sensor {
    readonly __brand_mcp3204_MCP3204Sensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_voltage_sampler_VoltageSampler?: true;
}
//  mcp3221::MCP3221Sensor
export interface mcp3221_MCP3221Sensor {
    readonly __brand_mcp3221_MCP3221Sensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_voltage_sampler_VoltageSampler?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  mcp4461::Mcp4461Component
export interface mcp4461_Mcp4461Component {
    readonly __brand_mcp4461_Mcp4461Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  mcp4461::Mcp4461Wiper
export interface mcp4461_Mcp4461Wiper {
    readonly __brand_mcp4461_Mcp4461Wiper?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
    readonly __brand_Parented?: true;
}
//  mcp4725::MCP4725
export interface mcp4725_MCP4725 {
    readonly __brand_mcp4725_MCP4725?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  mcp4728::MCP4728Channel
export interface mcp4728_MCP4728Channel {
    readonly __brand_mcp4728_MCP4728Channel?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
}
//  mcp4728::MCP4728Component
export interface mcp4728_MCP4728Component {
    readonly __brand_mcp4728_MCP4728Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  mcp47a1::MCP47A1
export interface mcp47a1_MCP47A1 {
    readonly __brand_mcp47a1_MCP47A1?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  mcp9600::MCP9600Component
export interface mcp9600_MCP9600Component {
    readonly __brand_mcp9600_MCP9600Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  mcp9808::MCP9808Sensor
export interface mcp9808_MCP9808Sensor {
    readonly __brand_mcp9808_MCP9808Sensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  mdns::MDNSComponent
export interface mdns_MDNSComponent {
    readonly __brand_mdns_MDNSComponent?: true;
    readonly __brand_Component?: true;
}
//  media_player::MediaPlayer
export interface media_player_MediaPlayer {
    readonly __brand_media_player_MediaPlayer?: true;
}
//  media_source::MediaSource
export interface media_source_MediaSource {
    readonly __brand_media_source_MediaSource?: true;
}
//  mhz19::MHZ19Component
export interface mhz19_MHZ19Component {
    readonly __brand_mhz19_MHZ19Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
}
//  micro_wake_word::MicroWakeWord
export interface micro_wake_word_MicroWakeWord {
    readonly __brand_micro_wake_word_MicroWakeWord?: true;
    readonly __brand_Component?: true;
}
//  micro_wake_word::WakeWordModel
export interface micro_wake_word_WakeWordModel {
    readonly __brand_micro_wake_word_WakeWordModel?: true;
}
//  micronova::MicroNova
export interface micronova_MicroNova {
    readonly __brand_micronova_MicroNova?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  micronova::MicroNovaButton
export interface micronova_MicroNovaButton {
    readonly __brand_micronova_MicroNovaButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  micronova::MicroNovaListener
export interface micronova_MicroNovaListener {
    readonly __brand_micronova_MicroNovaListener?: true;
}
//  micronova::MicroNovaNumber
export interface micronova_MicroNovaNumber {
    readonly __brand_micronova_MicroNovaNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_micronova_MicroNovaListener?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  micronova::MicroNovaSensor
export interface micronova_MicroNovaSensor {
    readonly __brand_micronova_MicroNovaSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_micronova_MicroNovaListener?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  micronova::MicroNovaSwitch
export interface micronova_MicroNovaSwitch {
    readonly __brand_micronova_MicroNovaSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_micronova_MicroNovaListener?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  micronova::MicroNovaTextSensor
export interface micronova_MicroNovaTextSensor {
    readonly __brand_micronova_MicroNovaTextSensor?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_micronova_MicroNovaListener?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  microphone::Microphone
export interface microphone_Microphone {
    readonly __brand_microphone_Microphone?: true;
}
//  microphone::MicrophoneSource
export interface microphone_MicrophoneSource {
    readonly __brand_microphone_MicrophoneSource?: true;
    readonly __brand_microphone_Microphone?: true;
}
//  mics_4514::MICS4514Component
export interface mics_4514_MICS4514Component {
    readonly __brand_mics_4514_MICS4514Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  midea::ac::AirConditioner
export interface midea_ac_AirConditioner {
    readonly __brand_midea_ac_AirConditioner?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  midea_ir::MideaIR
export interface midea_ir_MideaIR {
    readonly __brand_midea_ir_MideaIR?: true;
    readonly __brand_climate_ir_ClimateIR?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_remote_base_RemoteReceiverListener?: true;
    readonly __brand_remote_base_RemoteTransmittable?: true;
}
//  mitsubishi::MitsubishiClimate
export interface mitsubishi_MitsubishiClimate {
    readonly __brand_mitsubishi_MitsubishiClimate?: true;
    readonly __brand_climate_ir_ClimateIR?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_remote_base_RemoteReceiverListener?: true;
    readonly __brand_remote_base_RemoteTransmittable?: true;
}
//  mixer_speaker::MixerSpeaker
export interface mixer_speaker_MixerSpeaker {
    readonly __brand_mixer_speaker_MixerSpeaker?: true;
    readonly __brand_Component?: true;
}
//  mixer_speaker::SourceSpeaker
export interface mixer_speaker_SourceSpeaker {
    readonly __brand_mixer_speaker_SourceSpeaker?: true;
    readonly __brand_Component?: true;
    readonly __brand_speaker_Speaker?: true;
}
//  mlx90393::MLX90393Cls
export interface mlx90393_MLX90393Cls {
    readonly __brand_mlx90393_MLX90393Cls?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  mlx90614::MLX90614Component
export interface mlx90614_MLX90614Component {
    readonly __brand_mlx90614_MLX90614Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  mmc5603::MMC5603Component
export interface mmc5603_MMC5603Component {
    readonly __brand_mmc5603_MMC5603Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  mmc5983::MMC5983Component
export interface mmc5983_MMC5983Component {
    readonly __brand_mmc5983_MMC5983Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  modbus::Modbus
export interface modbus_Modbus {
    readonly __brand_modbus_Modbus?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  modbus::ModbusDevice
export interface modbus_ModbusDevice {
    readonly __brand_modbus_ModbusDevice?: true;
}
//  modbus_controller::ModbusBinaryOutput
export interface modbus_controller_ModbusBinaryOutput {
    readonly __brand_modbus_controller_ModbusBinaryOutput?: true;
    readonly __brand_Component?: true;
    readonly __brand_output_BinaryOutput?: true;
    readonly __brand_modbus_controller_SensorItem?: true;
}
//  modbus_controller::ModbusBinarySensor
export interface modbus_controller_ModbusBinarySensor {
    readonly __brand_modbus_controller_ModbusBinarySensor?: true;
    readonly __brand_Component?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_modbus_controller_SensorItem?: true;
}
//  modbus_controller::ModbusController
export interface modbus_controller_ModbusController {
    readonly __brand_modbus_controller_ModbusController?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_modbus_ModbusDevice?: true;
}
//  modbus_controller::ModbusFloatOutput
export interface modbus_controller_ModbusFloatOutput {
    readonly __brand_modbus_controller_ModbusFloatOutput?: true;
    readonly __brand_Component?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
    readonly __brand_modbus_controller_SensorItem?: true;
}
//  modbus_controller::ModbusNumber
export interface modbus_controller_ModbusNumber {
    readonly __brand_modbus_controller_ModbusNumber?: true;
    readonly __brand_Component?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_modbus_controller_SensorItem?: true;
}
//  modbus_controller::ModbusSelect
export interface modbus_controller_ModbusSelect {
    readonly __brand_modbus_controller_ModbusSelect?: true;
    readonly __brand_Component?: true;
    readonly __brand_select_Select?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_modbus_controller_SensorItem?: true;
}
//  modbus_controller::ModbusSensor
export interface modbus_controller_ModbusSensor {
    readonly __brand_modbus_controller_ModbusSensor?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_modbus_controller_SensorItem?: true;
}
//  modbus_controller::ModbusSwitch
export interface modbus_controller_ModbusSwitch {
    readonly __brand_modbus_controller_ModbusSwitch?: true;
    readonly __brand_Component?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_modbus_controller_SensorItem?: true;
}
//  modbus_controller::ModbusTextSensor
export interface modbus_controller_ModbusTextSensor {
    readonly __brand_modbus_controller_ModbusTextSensor?: true;
    readonly __brand_Component?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_modbus_controller_SensorItem?: true;
}
//  modbus_controller::SensorItem
export interface modbus_controller_SensorItem {
    readonly __brand_modbus_controller_SensorItem?: true;
}
//  modbus_controller::ServerRegister
export interface modbus_controller_ServerRegister {
    readonly __brand_modbus_controller_ServerRegister?: true;
}
//  monochromatic::MonochromaticLightOutput
export interface monochromatic_MonochromaticLightOutput {
    readonly __brand_monochromatic_MonochromaticLightOutput?: true;
    readonly __brand_light_LightOutput?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_light_AddressableLightState?: true;
}
//  mopeka_ble::MopekaListener
export interface mopeka_ble_MopekaListener {
    readonly __brand_mopeka_ble_MopekaListener?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  mopeka_pro_check::MopekaProCheck
export interface mopeka_pro_check_MopekaProCheck {
    readonly __brand_mopeka_pro_check_MopekaProCheck?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  mopeka_std_check::MopekaStdCheck
export interface mopeka_std_check_MopekaStdCheck {
    readonly __brand_mopeka_std_check_MopekaStdCheck?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  mpl3115a2::MPL3115A2Component
export interface mpl3115a2_MPL3115A2Component {
    readonly __brand_mpl3115a2_MPL3115A2Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  mpr121::MPR121BinarySensor
export interface mpr121_MPR121BinarySensor {
    readonly __brand_mpr121_MPR121BinarySensor?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
}
//  mpr121::MPR121Component
export interface mpr121_MPR121Component {
    readonly __brand_mpr121_MPR121Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  mpu6050::MPU6050Component
export interface mpu6050_MPU6050Component {
    readonly __brand_mpu6050_MPU6050Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  mpu6886::MPU6886Component
export interface mpu6886_MPU6886Component {
    readonly __brand_mpu6886_MPU6886Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  mqtt::MQTTAlarmControlPanelComponent
export interface mqtt_MQTTAlarmControlPanelComponent {
    readonly __brand_mqtt_MQTTAlarmControlPanelComponent?: true;
    readonly __brand_mqtt_MQTTComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_mqtt_MQTTClientComponent?: true;
}
//  mqtt::MQTTBinarySensorComponent
export interface mqtt_MQTTBinarySensorComponent {
    readonly __brand_mqtt_MQTTBinarySensorComponent?: true;
    readonly __brand_mqtt_MQTTComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_mqtt_MQTTClientComponent?: true;
}
//  mqtt::MQTTButtonComponent
export interface mqtt_MQTTButtonComponent {
    readonly __brand_mqtt_MQTTButtonComponent?: true;
    readonly __brand_mqtt_MQTTComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_mqtt_MQTTClientComponent?: true;
}
//  mqtt::MQTTClientComponent
export interface mqtt_MQTTClientComponent {
    readonly __brand_mqtt_MQTTClientComponent?: true;
    readonly __brand_Component?: true;
}
//  mqtt::MQTTClimateComponent
export interface mqtt_MQTTClimateComponent {
    readonly __brand_mqtt_MQTTClimateComponent?: true;
    readonly __brand_mqtt_MQTTComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_mqtt_MQTTClientComponent?: true;
}
//  mqtt::MQTTComponent
export interface mqtt_MQTTComponent {
    readonly __brand_mqtt_MQTTComponent?: true;
    readonly __brand_mqtt_MQTTClientComponent?: true;
}
//  mqtt::MQTTCoverComponent
export interface mqtt_MQTTCoverComponent {
    readonly __brand_mqtt_MQTTCoverComponent?: true;
    readonly __brand_mqtt_MQTTComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_mqtt_MQTTClientComponent?: true;
}
//  mqtt::MQTTDateComponent
export interface mqtt_MQTTDateComponent {
    readonly __brand_mqtt_MQTTDateComponent?: true;
    readonly __brand_mqtt_MQTTComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_mqtt_MQTTClientComponent?: true;
}
//  mqtt::MQTTDateTimeComponent
export interface mqtt_MQTTDateTimeComponent {
    readonly __brand_mqtt_MQTTDateTimeComponent?: true;
    readonly __brand_mqtt_MQTTComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_mqtt_MQTTClientComponent?: true;
}
//  mqtt::MQTTEventComponent
export interface mqtt_MQTTEventComponent {
    readonly __brand_mqtt_MQTTEventComponent?: true;
    readonly __brand_mqtt_MQTTComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_mqtt_MQTTClientComponent?: true;
}
//  mqtt::MQTTFanComponent
export interface mqtt_MQTTFanComponent {
    readonly __brand_mqtt_MQTTFanComponent?: true;
    readonly __brand_mqtt_MQTTComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_mqtt_MQTTClientComponent?: true;
}
//  mqtt::MQTTJSONLightComponent
export interface mqtt_MQTTJSONLightComponent {
    readonly __brand_mqtt_MQTTJSONLightComponent?: true;
    readonly __brand_mqtt_MQTTComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_mqtt_MQTTClientComponent?: true;
}
//  mqtt::MQTTLockComponent
export interface mqtt_MQTTLockComponent {
    readonly __brand_mqtt_MQTTLockComponent?: true;
    readonly __brand_mqtt_MQTTComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_mqtt_MQTTClientComponent?: true;
}
//  mqtt::MQTTNumberComponent
export interface mqtt_MQTTNumberComponent {
    readonly __brand_mqtt_MQTTNumberComponent?: true;
    readonly __brand_mqtt_MQTTComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_mqtt_MQTTClientComponent?: true;
}
//  mqtt::MQTTSelectComponent
export interface mqtt_MQTTSelectComponent {
    readonly __brand_mqtt_MQTTSelectComponent?: true;
    readonly __brand_mqtt_MQTTComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_mqtt_MQTTClientComponent?: true;
}
//  mqtt::MQTTSensorComponent
export interface mqtt_MQTTSensorComponent {
    readonly __brand_mqtt_MQTTSensorComponent?: true;
    readonly __brand_mqtt_MQTTComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_mqtt_MQTTClientComponent?: true;
}
//  mqtt::MQTTSwitchComponent
export interface mqtt_MQTTSwitchComponent {
    readonly __brand_mqtt_MQTTSwitchComponent?: true;
    readonly __brand_mqtt_MQTTComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_mqtt_MQTTClientComponent?: true;
}
//  mqtt::MQTTTextComponent
export interface mqtt_MQTTTextComponent {
    readonly __brand_mqtt_MQTTTextComponent?: true;
    readonly __brand_mqtt_MQTTComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_mqtt_MQTTClientComponent?: true;
}
//  mqtt::MQTTTextSensor
export interface mqtt_MQTTTextSensor {
    readonly __brand_mqtt_MQTTTextSensor?: true;
    readonly __brand_mqtt_MQTTComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_mqtt_MQTTClientComponent?: true;
}
//  mqtt::MQTTTimeComponent
export interface mqtt_MQTTTimeComponent {
    readonly __brand_mqtt_MQTTTimeComponent?: true;
    readonly __brand_mqtt_MQTTComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_mqtt_MQTTClientComponent?: true;
}
//  mqtt::MQTTUpdateComponent
export interface mqtt_MQTTUpdateComponent {
    readonly __brand_mqtt_MQTTUpdateComponent?: true;
    readonly __brand_mqtt_MQTTComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_mqtt_MQTTClientComponent?: true;
}
//  mqtt::MQTTValveComponent
export interface mqtt_MQTTValveComponent {
    readonly __brand_mqtt_MQTTValveComponent?: true;
    readonly __brand_mqtt_MQTTComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_mqtt_MQTTClientComponent?: true;
}
//  mqtt_subscribe::MQTTSubscribeSensor
export interface mqtt_subscribe_MQTTSubscribeSensor {
    readonly __brand_mqtt_subscribe_MQTTSubscribeSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  mqtt_subscribe::MQTTSubscribeTextSensor
export interface mqtt_subscribe_MQTTSubscribeTextSensor {
    readonly __brand_mqtt_subscribe_MQTTSubscribeTextSensor?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  ms5611::MS5611Component
export interface ms5611_MS5611Component {
    readonly __brand_ms5611_MS5611Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ms8607::MS8607Component
export interface ms8607_MS8607Component {
    readonly __brand_ms8607_MS8607Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ms8607::MS8607HumidityDevice
export interface ms8607_MS8607HumidityDevice {
    readonly __brand_ms8607_MS8607HumidityDevice?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  msa3xx::MSA3xxComponent
export interface msa3xx_MSA3xxComponent {
    readonly __brand_msa3xx_MSA3xxComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  my9231::MY9231OutputComponent
export interface my9231_MY9231OutputComponent {
    readonly __brand_my9231_MY9231OutputComponent?: true;
    readonly __brand_Component?: true;
}
//  my9231::MY9231OutputComponent::Channel
export interface my9231_MY9231OutputComponent_Channel {
    readonly __brand_my9231_MY9231OutputComponent_Channel?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
}
//  nau7802::NAU7802Sensor
export interface nau7802_NAU7802Sensor {
    readonly __brand_nau7802_NAU7802Sensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  neopixelbus::NeoPixelBusLightOutputBase
export interface neopixelbus_NeoPixelBusLightOutputBase {
    readonly __brand_neopixelbus_NeoPixelBusLightOutputBase?: true;
    readonly __brand_light_AddressableLight?: true;
    readonly __brand_light_LightOutput?: true;
    readonly __brand_Component?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_light_AddressableLightState?: true;
}
//  nextion::Nextion
export interface nextion_Nextion {
    readonly __brand_nextion_Nextion?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
}
//  nextion::NextionBinarySensor
export interface nextion_NextionBinarySensor {
    readonly __brand_nextion_NextionBinarySensor?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  nextion::NextionSensor
export interface nextion_NextionSensor {
    readonly __brand_nextion_NextionSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  nextion::NextionSwitch
export interface nextion_NextionSwitch {
    readonly __brand_nextion_NextionSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  nextion::NextionTextSensor
export interface nextion_NextionTextSensor {
    readonly __brand_nextion_NextionTextSensor?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  nfc::NfcTagBinarySensor
export interface nfc_NfcTagBinarySensor {
    readonly __brand_nfc_NfcTagBinarySensor?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_nfc_NfcTagListener?: true;
    readonly __brand_Parented?: true;
}
//  nfc::NfcTagListener
export interface nfc_NfcTagListener {
    readonly __brand_nfc_NfcTagListener?: true;
}
//  nfc::Nfcc
export interface nfc_Nfcc {
    readonly __brand_nfc_Nfcc?: true;
}
//  noblex::NoblexClimate
export interface noblex_NoblexClimate {
    readonly __brand_noblex_NoblexClimate?: true;
    readonly __brand_climate_ir_ClimateIR?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_remote_base_RemoteReceiverListener?: true;
    readonly __brand_remote_base_RemoteTransmittable?: true;
}
//  npi19::NPI19Component
export interface npi19_NPI19Component {
    readonly __brand_npi19_NPI19Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  nrf52::DeviceFirmwareUpdate
export interface nrf52_DeviceFirmwareUpdate {
    readonly __brand_nrf52_DeviceFirmwareUpdate?: true;
    readonly __brand_Component?: true;
}
//  ntc::NTC
export interface ntc_NTC {
    readonly __brand_ntc_NTC?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  number::Number
export interface number_Number {
    readonly __brand_number_Number?: true;
}
//  one_wire::OneWireBus
export interface one_wire_OneWireBus {
    readonly __brand_one_wire_OneWireBus?: true;
}
//  one_wire::OneWireDevice
export interface one_wire_OneWireDevice {
    readonly __brand_one_wire_OneWireDevice?: true;
}
//  online_image::OnlineImage
export interface online_image_OnlineImage {
    readonly __brand_online_image_OnlineImage?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_runtime_image_RuntimeImage?: true;
    readonly __brand_image_Image?: true;
}
//  opentherm::OpenthermHub
export interface opentherm_OpenthermHub {
    readonly __brand_opentherm_OpenthermHub?: true;
    readonly __brand_Component?: true;
}
//  opentherm::OpenthermInput
export interface opentherm_OpenthermInput {
    readonly __brand_opentherm_OpenthermInput?: true;
}
//  opentherm::OpenthermNumber
export interface opentherm_OpenthermNumber {
    readonly __brand_opentherm_OpenthermNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_opentherm_OpenthermInput?: true;
}
//  opentherm::OpenthermOutput
export interface opentherm_OpenthermOutput {
    readonly __brand_opentherm_OpenthermOutput?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
    readonly __brand_Component?: true;
    readonly __brand_opentherm_OpenthermInput?: true;
}
//  opentherm::OpenthermSwitch
export interface opentherm_OpenthermSwitch {
    readonly __brand_opentherm_OpenthermSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  openthread::OpenThreadComponent
export interface openthread_OpenThreadComponent {
    readonly __brand_openthread_OpenThreadComponent?: true;
    readonly __brand_Component?: true;
}
//  openthread::OpenThreadSrpComponent
export interface openthread_OpenThreadSrpComponent {
    readonly __brand_openthread_OpenThreadSrpComponent?: true;
    readonly __brand_Component?: true;
}
//  openthread_info::ChannelOpenThreadInfo
export interface openthread_info_ChannelOpenThreadInfo {
    readonly __brand_openthread_info_ChannelOpenThreadInfo?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  openthread_info::Eui64OpenThreadInfo
export interface openthread_info_Eui64OpenThreadInfo {
    readonly __brand_openthread_info_Eui64OpenThreadInfo?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  openthread_info::ExtAddrOpenThreadInfo
export interface openthread_info_ExtAddrOpenThreadInfo {
    readonly __brand_openthread_info_ExtAddrOpenThreadInfo?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  openthread_info::ExtPanIdOpenThreadInfo
export interface openthread_info_ExtPanIdOpenThreadInfo {
    readonly __brand_openthread_info_ExtPanIdOpenThreadInfo?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  openthread_info::IPAddressOpenThreadInfo
export interface openthread_info_IPAddressOpenThreadInfo {
    readonly __brand_openthread_info_IPAddressOpenThreadInfo?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  openthread_info::NetworkKeyOpenThreadInfo
export interface openthread_info_NetworkKeyOpenThreadInfo {
    readonly __brand_openthread_info_NetworkKeyOpenThreadInfo?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  openthread_info::NetworkNameOpenThreadInfo
export interface openthread_info_NetworkNameOpenThreadInfo {
    readonly __brand_openthread_info_NetworkNameOpenThreadInfo?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  openthread_info::PanIdOpenThreadInfo
export interface openthread_info_PanIdOpenThreadInfo {
    readonly __brand_openthread_info_PanIdOpenThreadInfo?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  openthread_info::Rloc16OpenThreadInfo
export interface openthread_info_Rloc16OpenThreadInfo {
    readonly __brand_openthread_info_Rloc16OpenThreadInfo?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  openthread_info::RoleOpenThreadInfo
export interface openthread_info_RoleOpenThreadInfo {
    readonly __brand_openthread_info_RoleOpenThreadInfo?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  opt3001::OPT3001Sensor
export interface opt3001_OPT3001Sensor {
    readonly __brand_opt3001_OPT3001Sensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ota::OTAComponent
export interface ota_OTAComponent {
    readonly __brand_ota_OTAComponent?: true;
}
//  output::BinaryOutput
export interface output_BinaryOutput {
    readonly __brand_output_BinaryOutput?: true;
}
//  output::FloatOutput
export interface output_FloatOutput {
    readonly __brand_output_FloatOutput?: true;
}
//  output::OutputButton
export interface output_OutputButton {
    readonly __brand_output_OutputButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  output::OutputLock
export interface output_OutputLock {
    readonly __brand_output_OutputLock?: true;
    readonly __brand_lock_Lock?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  output::OutputSwitch
export interface output_OutputSwitch {
    readonly __brand_output_OutputSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  packet_transport::PacketTransport
export interface packet_transport_PacketTransport {
    readonly __brand_packet_transport_PacketTransport?: true;
}
//  partition::PartitionLightOutput
export interface partition_PartitionLightOutput {
    readonly __brand_partition_PartitionLightOutput?: true;
    readonly __brand_light_AddressableLight?: true;
    readonly __brand_light_LightOutput?: true;
    readonly __brand_Component?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_light_AddressableLightState?: true;
}
//  pca6416a::PCA6416AComponent
export interface pca6416a_PCA6416AComponent {
    readonly __brand_pca6416a_PCA6416AComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  pca9554::PCA9554Component
export interface pca9554_PCA9554Component {
    readonly __brand_pca9554_PCA9554Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  pca9685::PCA9685Channel
export interface pca9685_PCA9685Channel {
    readonly __brand_pca9685_PCA9685Channel?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
}
//  pca9685::PCA9685Output
export interface pca9685_PCA9685Output {
    readonly __brand_pca9685_PCA9685Output?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  pcd8544::PCD8544
export interface pcd8544_PCD8544 {
    readonly __brand_pcd8544_PCD8544?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_display_DisplayBuffer?: true;
    readonly __brand_display_Display?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  pcf85063::PCF85063Component
export interface pcf85063_PCF85063Component {
    readonly __brand_pcf85063_PCF85063Component?: true;
    readonly __brand_time_RealTimeClock?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  pcf8563::PCF8563Component
export interface pcf8563_PCF8563Component {
    readonly __brand_pcf8563_PCF8563Component?: true;
    readonly __brand_time_RealTimeClock?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  pcf8574::PCF8574Component
export interface pcf8574_PCF8574Component {
    readonly __brand_pcf8574_PCF8574Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  pi4ioe5v6408::PI4IOE5V6408Component
export interface pi4ioe5v6408_PI4IOE5V6408Component {
    readonly __brand_pi4ioe5v6408_PI4IOE5V6408Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  pid::PIDClimate
export interface pid_PIDClimate {
    readonly __brand_pid_PIDClimate?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  pid::PIDClimateSensor
export interface pid_PIDClimateSensor {
    readonly __brand_pid_PIDClimateSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  pipsolar::Pipsolar
export interface pipsolar_Pipsolar {
    readonly __brand_pipsolar_Pipsolar?: true;
    readonly __brand_Component?: true;
}
//  pipsolar::PipsolarOutput
export interface pipsolar_PipsolarOutput {
    readonly __brand_pipsolar_PipsolarOutput?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
}
//  pipsolar::PipsolarSwitch
export interface pipsolar_PipsolarSwitch {
    readonly __brand_pipsolar_PipsolarSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  pm1006::PM1006Component
export interface pm1006_PM1006Component {
    readonly __brand_pm1006_PM1006Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  pm2005::PM2005Component
export interface pm2005_PM2005Component {
    readonly __brand_pm2005_PM2005Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  pmsa003i::PMSA003IComponent
export interface pmsa003i_PMSA003IComponent {
    readonly __brand_pmsa003i_PMSA003IComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  pmsx003::PMSX003Component
export interface pmsx003_PMSX003Component {
    readonly __brand_pmsx003_PMSX003Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  pmwcs3::PMWCS3Component
export interface pmwcs3_PMWCS3Component {
    readonly __brand_pmwcs3_PMWCS3Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  pn532::PN532
export interface pn532_PN532 {
    readonly __brand_pn532_PN532?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  pn532::PN532BinarySensor
export interface pn532_PN532BinarySensor {
    readonly __brand_pn532_PN532BinarySensor?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
}
//  pn532_i2c::PN532I2C
export interface pn532_i2c_PN532I2C {
    readonly __brand_pn532_i2c_PN532I2C?: true;
    readonly __brand_pn532_PN532?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  pn532_spi::PN532Spi
export interface pn532_spi_PN532Spi {
    readonly __brand_pn532_spi_PN532Spi?: true;
    readonly __brand_pn532_PN532?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  pn7150::PN7150
export interface pn7150_PN7150 {
    readonly __brand_pn7150_PN7150?: true;
    readonly __brand_nfc_Nfcc?: true;
    readonly __brand_Component?: true;
}
//  pn7160::PN7160
export interface pn7160_PN7160 {
    readonly __brand_pn7160_PN7160?: true;
}
//  pn7160_i2c::PN7160I2C
export interface pn7160_i2c_PN7160I2C {
    readonly __brand_pn7160_i2c_PN7160I2C?: true;
    readonly __brand_pn7160_PN7160?: true;
    readonly __brand_nfc_Nfcc?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  pn7160_spi::PN7160Spi
export interface pn7160_spi_PN7160Spi {
    readonly __brand_pn7160_spi_PN7160Spi?: true;
    readonly __brand_pn7160_PN7160?: true;
    readonly __brand_nfc_Nfcc?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  power_supply::PowerSupply
export interface power_supply_PowerSupply {
    readonly __brand_power_supply_PowerSupply?: true;
    readonly __brand_Component?: true;
}
//  preferences::IntervalSyncer
export interface preferences_IntervalSyncer {
    readonly __brand_preferences_IntervalSyncer?: true;
    readonly __brand_Component?: true;
}
//  prometheus::PrometheusHandler
export interface prometheus_PrometheusHandler {
    readonly __brand_prometheus_PrometheusHandler?: true;
    readonly __brand_Component?: true;
}
//  pulse_counter::PulseCounterSensor
export interface pulse_counter_PulseCounterSensor {
    readonly __brand_pulse_counter_PulseCounterSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  pulse_meter::PulseMeterSensor
export interface pulse_meter_PulseMeterSensor {
    readonly __brand_pulse_meter_PulseMeterSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  pulse_width::PulseWidthSensor
export interface pulse_width_PulseWidthSensor {
    readonly __brand_pulse_width_PulseWidthSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  pvvx_mithermometer::PVVXDisplay
export interface pvvx_mithermometer_PVVXDisplay {
    readonly __brand_pvvx_mithermometer_PVVXDisplay?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_ble_client_BLEClientNode?: true;
    readonly __brand_ble_client_BLEClient?: true;
}
//  pvvx_mithermometer::PVVXMiThermometer
export interface pvvx_mithermometer_PVVXMiThermometer {
    readonly __brand_pvvx_mithermometer_PVVXMiThermometer?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  pylontech::PylontechComponent
export interface pylontech_PylontechComponent {
    readonly __brand_pylontech_PylontechComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  pylontech::PylontechSensor
export interface pylontech_PylontechSensor {
    readonly __brand_pylontech_PylontechSensor?: true;
    readonly __brand_Component?: true;
}
//  pylontech::PylontechTextSensor
export interface pylontech_PylontechTextSensor {
    readonly __brand_pylontech_PylontechTextSensor?: true;
    readonly __brand_Component?: true;
}
//  pzem004t::PZEM004T
export interface pzem004t_PZEM004T {
    readonly __brand_pzem004t_PZEM004T?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  pzemac::PZEMAC
export interface pzemac_PZEMAC {
    readonly __brand_pzemac_PZEMAC?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_modbus_ModbusDevice?: true;
}
//  pzemdc::PZEMDC
export interface pzemdc_PZEMDC {
    readonly __brand_pzemdc_PZEMDC?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_modbus_ModbusDevice?: true;
}
//  qmc5883l::QMC5883LComponent
export interface qmc5883l_QMC5883LComponent {
    readonly __brand_qmc5883l_QMC5883LComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  qmp6988::QMP6988Component
export interface qmp6988_QMP6988Component {
    readonly __brand_qmp6988_QMP6988Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  qr_code::QrCode
export interface qr_code_QrCode {
    readonly __brand_qr_code_QrCode?: true;
    readonly __brand_Component?: true;
}
//  qspi_dbi::QspiDbi
export interface qspi_dbi_QspiDbi {
    readonly __brand_qspi_dbi_QspiDbi?: true;
    readonly __brand_display_Display?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_display_DisplayBuffer?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  qwiic_pir::QwiicPIRComponent
export interface qwiic_pir_QwiicPIRComponent {
    readonly __brand_qwiic_pir_QwiicPIRComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
}
//  radon_eye_ble::RadonEyeListener
export interface radon_eye_ble_RadonEyeListener {
    readonly __brand_radon_eye_ble_RadonEyeListener?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  radon_eye_rd200::RadonEyeRD200
export interface radon_eye_rd200_RadonEyeRD200 {
    readonly __brand_radon_eye_rd200_RadonEyeRD200?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_ble_client_BLEClientNode?: true;
    readonly __brand_ble_client_BLEClient?: true;
}
//  rc522::RC522
export interface rc522_RC522 {
    readonly __brand_rc522_RC522?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  rc522::RC522BinarySensor
export interface rc522_RC522BinarySensor {
    readonly __brand_rc522_RC522BinarySensor?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
}
//  rc522_i2c::RC522I2C
export interface rc522_i2c_RC522I2C {
    readonly __brand_rc522_i2c_RC522I2C?: true;
    readonly __brand_rc522_RC522?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  rc522_spi::RC522Spi
export interface rc522_spi_RC522Spi {
    readonly __brand_rc522_spi_RC522Spi?: true;
    readonly __brand_rc522_RC522?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  rd03d::RD03DComponent
export interface rd03d_RD03DComponent {
    readonly __brand_rd03d_RD03DComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  rdm6300::RDM6300BinarySensor
export interface rdm6300_RDM6300BinarySensor {
    readonly __brand_rdm6300_RDM6300BinarySensor?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
}
//  rdm6300::RDM6300Component
export interface rdm6300_RDM6300Component {
    readonly __brand_rdm6300_RDM6300Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  remote_base::RemoteReceiverBase
export interface remote_base_RemoteReceiverBase {
    readonly __brand_remote_base_RemoteReceiverBase?: true;
}
//  remote_base::RemoteReceiverListener
export interface remote_base_RemoteReceiverListener {
    readonly __brand_remote_base_RemoteReceiverListener?: true;
}
//  remote_base::RemoteTransmittable
export interface remote_base_RemoteTransmittable {
    readonly __brand_remote_base_RemoteTransmittable?: true;
}
//  remote_base::RemoteTransmitterBase
export interface remote_base_RemoteTransmitterBase {
    readonly __brand_remote_base_RemoteTransmitterBase?: true;
}
//  remote_receiver::RemoteReceiverComponent
export interface remote_receiver_RemoteReceiverComponent {
    readonly __brand_remote_receiver_RemoteReceiverComponent?: true;
    readonly __brand_remote_base_RemoteReceiverBase?: true;
    readonly __brand_Component?: true;
}
//  remote_transmitter::RemoteTransmitterComponent
export interface remote_transmitter_RemoteTransmitterComponent {
    readonly __brand_remote_transmitter_RemoteTransmitterComponent?: true;
    readonly __brand_remote_base_RemoteTransmitterBase?: true;
    readonly __brand_Component?: true;
}
//  resampler::ResamplerSpeaker
export interface resampler_ResamplerSpeaker {
    readonly __brand_resampler_ResamplerSpeaker?: true;
    readonly __brand_Component?: true;
    readonly __brand_speaker_Speaker?: true;
}
//  resistance::ResistanceSensor
export interface resistance_ResistanceSensor {
    readonly __brand_resistance_ResistanceSensor?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  restart::RestartButton
export interface restart_RestartButton {
    readonly __brand_restart_RestartButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  restart::RestartSwitch
export interface restart_RestartSwitch {
    readonly __brand_restart_RestartSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  rf_bridge::RFBridgeComponent
export interface rf_bridge_RFBridgeComponent {
    readonly __brand_rf_bridge_RFBridgeComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
}
//  rgb::RGBLightOutput
export interface rgb_RGBLightOutput {
    readonly __brand_rgb_RGBLightOutput?: true;
    readonly __brand_light_LightOutput?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_light_AddressableLightState?: true;
}
//  rgbct::RGBCTLightOutput
export interface rgbct_RGBCTLightOutput {
    readonly __brand_rgbct_RGBCTLightOutput?: true;
    readonly __brand_light_LightOutput?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_light_AddressableLightState?: true;
}
//  rgbw::RGBWLightOutput
export interface rgbw_RGBWLightOutput {
    readonly __brand_rgbw_RGBWLightOutput?: true;
    readonly __brand_light_LightOutput?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_light_AddressableLightState?: true;
}
//  rgbww::RGBWWLightOutput
export interface rgbww_RGBWWLightOutput {
    readonly __brand_rgbww_RGBWWLightOutput?: true;
    readonly __brand_light_LightOutput?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_light_AddressableLightState?: true;
}
//  rotary_encoder::RotaryEncoderSensor
export interface rotary_encoder_RotaryEncoderSensor {
    readonly __brand_rotary_encoder_RotaryEncoderSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  rp2040_ble::RP2040BLE
export interface rp2040_ble_RP2040BLE {
    readonly __brand_rp2040_ble_RP2040BLE?: true;
    readonly __brand_Component?: true;
}
//  rp2040_pio_led_strip::RP2040PIOLEDStripLightOutput
export interface rp2040_pio_led_strip_RP2040PIOLEDStripLightOutput {
    readonly __brand_rp2040_pio_led_strip_RP2040PIOLEDStripLightOutput?: true;
    readonly __brand_light_AddressableLight?: true;
    readonly __brand_light_LightOutput?: true;
    readonly __brand_Component?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_light_AddressableLightState?: true;
}
//  rp2040_pwm::RP2040PWM
export interface rp2040_pwm_RP2040PWM {
    readonly __brand_rp2040_pwm_RP2040PWM?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
    readonly __brand_Component?: true;
}
//  rpi_dpi_rgb::RpiDpiRgb
export interface rpi_dpi_rgb_RpiDpiRgb {
    readonly __brand_rpi_dpi_rgb_RpiDpiRgb?: true;
    readonly __brand_display_Display?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  rtttl::Rtttl
export interface rtttl_Rtttl {
    readonly __brand_rtttl_Rtttl?: true;
    readonly __brand_Component?: true;
}
//  runtime_image::RuntimeImage
export interface runtime_image_RuntimeImage {
    readonly __brand_runtime_image_RuntimeImage?: true;
}
//  runtime_stats::RuntimeStatsCollector
export interface runtime_stats_RuntimeStatsCollector {
    readonly __brand_runtime_stats_RuntimeStatsCollector?: true;
}
//  ruuvi_ble::RuuviListener
export interface ruuvi_ble_RuuviListener {
    readonly __brand_ruuvi_ble_RuuviListener?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  ruuvitag::RuuviTag
export interface ruuvitag_RuuviTag {
    readonly __brand_ruuvitag_RuuviTag?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  rx8130::RX8130Component
export interface rx8130_RX8130Component {
    readonly __brand_rx8130_RX8130Component?: true;
    readonly __brand_time_RealTimeClock?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  safe_mode::SafeModeButton
export interface safe_mode_SafeModeButton {
    readonly __brand_safe_mode_SafeModeButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  safe_mode::SafeModeComponent
export interface safe_mode_SafeModeComponent {
    readonly __brand_safe_mode_SafeModeComponent?: true;
    readonly __brand_Component?: true;
}
//  safe_mode::SafeModeSwitch
export interface safe_mode_SafeModeSwitch {
    readonly __brand_safe_mode_SafeModeSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  scd30::SCD30Component
export interface scd30_SCD30Component {
    readonly __brand_scd30_SCD30Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensirion_common_SensirionI2CDevice?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  scd4x::SCD4XComponent
export interface scd4x_SCD4XComponent {
    readonly __brand_scd4x_SCD4XComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensirion_common_SensirionI2CDevice?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  script::Script
export interface script_Script {
    readonly __brand_script_Script?: true;
}
//  sdl::Sdl
export interface sdl_Sdl {
    readonly __brand_sdl_Sdl?: true;
    readonly __brand_display_Display?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  sdl::SdlTouchscreen
export interface sdl_SdlTouchscreen {
    readonly __brand_sdl_SdlTouchscreen?: true;
    readonly __brand_touchscreen_Touchscreen?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  sdm_meter::SDMMeter
export interface sdm_meter_SDMMeter {
    readonly __brand_sdm_meter_SDMMeter?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_modbus_ModbusDevice?: true;
}
//  sdp3x::SDP3XComponent
export interface sdp3x_SDP3XComponent {
    readonly __brand_sdp3x_SDP3XComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensirion_common_SensirionI2CDevice?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  sds011::SDS011Component
export interface sds011_SDS011Component {
    readonly __brand_sds011_SDS011Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  seeed_mr24hpc1::CustomModeNumber
export interface seeed_mr24hpc1_CustomModeNumber {
    readonly __brand_seeed_mr24hpc1_CustomModeNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
}
//  seeed_mr24hpc1::CustomSetEndButton
export interface seeed_mr24hpc1_CustomSetEndButton {
    readonly __brand_seeed_mr24hpc1_CustomSetEndButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  seeed_mr24hpc1::CustomUnmanTimeNumber
export interface seeed_mr24hpc1_CustomUnmanTimeNumber {
    readonly __brand_seeed_mr24hpc1_CustomUnmanTimeNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
}
//  seeed_mr24hpc1::ExistenceBoundarySelect
export interface seeed_mr24hpc1_ExistenceBoundarySelect {
    readonly __brand_seeed_mr24hpc1_ExistenceBoundarySelect?: true;
    readonly __brand_select_Select?: true;
    readonly __brand_EntityBase?: true;
}
//  seeed_mr24hpc1::ExistenceThresholdNumber
export interface seeed_mr24hpc1_ExistenceThresholdNumber {
    readonly __brand_seeed_mr24hpc1_ExistenceThresholdNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
}
//  seeed_mr24hpc1::MR24HPC1Component
export interface seeed_mr24hpc1_MR24HPC1Component {
    readonly __brand_seeed_mr24hpc1_MR24HPC1Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  seeed_mr24hpc1::MotionBoundarySelect
export interface seeed_mr24hpc1_MotionBoundarySelect {
    readonly __brand_seeed_mr24hpc1_MotionBoundarySelect?: true;
    readonly __brand_select_Select?: true;
    readonly __brand_EntityBase?: true;
}
//  seeed_mr24hpc1::MotionThresholdNumber
export interface seeed_mr24hpc1_MotionThresholdNumber {
    readonly __brand_seeed_mr24hpc1_MotionThresholdNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
}
//  seeed_mr24hpc1::MotionToRestTimeNumber
export interface seeed_mr24hpc1_MotionToRestTimeNumber {
    readonly __brand_seeed_mr24hpc1_MotionToRestTimeNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
}
//  seeed_mr24hpc1::MotionTriggerTimeNumber
export interface seeed_mr24hpc1_MotionTriggerTimeNumber {
    readonly __brand_seeed_mr24hpc1_MotionTriggerTimeNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
}
//  seeed_mr24hpc1::RestartButton
export interface seeed_mr24hpc1_RestartButton {
    readonly __brand_seeed_mr24hpc1_RestartButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  seeed_mr24hpc1::SceneModeSelect
export interface seeed_mr24hpc1_SceneModeSelect {
    readonly __brand_seeed_mr24hpc1_SceneModeSelect?: true;
    readonly __brand_select_Select?: true;
    readonly __brand_EntityBase?: true;
}
//  seeed_mr24hpc1::SensitivityNumber
export interface seeed_mr24hpc1_SensitivityNumber {
    readonly __brand_seeed_mr24hpc1_SensitivityNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
}
//  seeed_mr24hpc1::UnderlyOpenFunctionSwitch
export interface seeed_mr24hpc1_UnderlyOpenFunctionSwitch {
    readonly __brand_seeed_mr24hpc1_UnderlyOpenFunctionSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
}
//  seeed_mr24hpc1::UnmanTimeSelect
export interface seeed_mr24hpc1_UnmanTimeSelect {
    readonly __brand_seeed_mr24hpc1_UnmanTimeSelect?: true;
    readonly __brand_select_Select?: true;
    readonly __brand_EntityBase?: true;
}
//  seeed_mr60bha2::MR60BHA2Component
export interface seeed_mr60bha2_MR60BHA2Component {
    readonly __brand_seeed_mr60bha2_MR60BHA2Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  seeed_mr60fda2::GetRadarParametersButton
export interface seeed_mr60fda2_GetRadarParametersButton {
    readonly __brand_seeed_mr60fda2_GetRadarParametersButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  seeed_mr60fda2::HeightThresholdSelect
export interface seeed_mr60fda2_HeightThresholdSelect {
    readonly __brand_seeed_mr60fda2_HeightThresholdSelect?: true;
    readonly __brand_select_Select?: true;
    readonly __brand_EntityBase?: true;
}
//  seeed_mr60fda2::InstallHeightSelect
export interface seeed_mr60fda2_InstallHeightSelect {
    readonly __brand_seeed_mr60fda2_InstallHeightSelect?: true;
    readonly __brand_select_Select?: true;
    readonly __brand_EntityBase?: true;
}
//  seeed_mr60fda2::MR60FDA2Component
export interface seeed_mr60fda2_MR60FDA2Component {
    readonly __brand_seeed_mr60fda2_MR60FDA2Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  seeed_mr60fda2::ResetRadarButton
export interface seeed_mr60fda2_ResetRadarButton {
    readonly __brand_seeed_mr60fda2_ResetRadarButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  seeed_mr60fda2::SensitivitySelect
export interface seeed_mr60fda2_SensitivitySelect {
    readonly __brand_seeed_mr60fda2_SensitivitySelect?: true;
    readonly __brand_select_Select?: true;
    readonly __brand_EntityBase?: true;
}
//  selec_meter::SelecMeter
export interface selec_meter_SelecMeter {
    readonly __brand_selec_meter_SelecMeter?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_modbus_ModbusDevice?: true;
}
//  select::Select
export interface select_Select {
    readonly __brand_select_Select?: true;
    readonly __brand_EntityBase?: true;
}
//  sen0321_sensor::Sen0321Sensor
export interface sen0321_sensor_Sen0321Sensor {
    readonly __brand_sen0321_sensor_Sen0321Sensor?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  sen21231_sensor::Sen21231Sensor
export interface sen21231_sensor_Sen21231Sensor {
    readonly __brand_sen21231_sensor_Sen21231Sensor?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  sen5x::SEN5XComponent
export interface sen5x_SEN5XComponent {
    readonly __brand_sen5x_SEN5XComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensirion_common_SensirionI2CDevice?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  sen6x::SEN6XComponent
export interface sen6x_SEN6XComponent {
    readonly __brand_sen6x_SEN6XComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensirion_common_SensirionI2CDevice?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  senseair::SenseAirComponent
export interface senseair_SenseAirComponent {
    readonly __brand_senseair_SenseAirComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
}
//  sensirion_common::SensirionI2CDevice
export interface sensirion_common_SensirionI2CDevice {
    readonly __brand_sensirion_common_SensirionI2CDevice?: true;
}
//  sensor::Sensor
export interface sensor_Sensor {
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  serial_proxy::SerialProxy
export interface serial_proxy_SerialProxy {
    readonly __brand_serial_proxy_SerialProxy?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  servo::Servo
export interface servo_Servo {
    readonly __brand_servo_Servo?: true;
    readonly __brand_Component?: true;
}
//  sfa30::SFA30Component
export interface sfa30_SFA30Component {
    readonly __brand_sfa30_SFA30Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensirion_common_SensirionI2CDevice?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  sgp30::SGP30Component
export interface sgp30_SGP30Component {
    readonly __brand_sgp30_SGP30Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensirion_common_SensirionI2CDevice?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  sgp4x::SGP4xComponent
export interface sgp4x_SGP4xComponent {
    readonly __brand_sgp4x_SGP4xComponent?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensirion_common_SensirionI2CDevice?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  shelly_dimmer::ShellyDimmer
export interface shelly_dimmer_ShellyDimmer {
    readonly __brand_shelly_dimmer_ShellyDimmer?: true;
    readonly __brand_light_LightOutput?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_light_AddressableLightState?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  sht3xd::SHT3XDComponent
export interface sht3xd_SHT3XDComponent {
    readonly __brand_sht3xd_SHT3XDComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensirion_common_SensirionI2CDevice?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  sht4x::SHT4XComponent
export interface sht4x_SHT4XComponent {
    readonly __brand_sht4x_SHT4XComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensirion_common_SensirionI2CDevice?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  shtcx::SHTCXComponent
export interface shtcx_SHTCXComponent {
    readonly __brand_shtcx_SHTCXComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensirion_common_SensirionI2CDevice?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  shutdown::ShutdownButton
export interface shutdown_ShutdownButton {
    readonly __brand_shutdown_ShutdownButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  shutdown::ShutdownSwitch
export interface shutdown_ShutdownSwitch {
    readonly __brand_shutdown_ShutdownSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  sigma_delta_output::SigmaDeltaOutput
export interface sigma_delta_output_SigmaDeltaOutput {
    readonly __brand_sigma_delta_output_SigmaDeltaOutput?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  sim800l::Sim800LComponent
export interface sim800l_Sim800LComponent {
    readonly __brand_sim800l_Sim800LComponent?: true;
    readonly __brand_Component?: true;
}
//  slow_pwm::SlowPWMOutput
export interface slow_pwm_SlowPWMOutput {
    readonly __brand_slow_pwm_SlowPWMOutput?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
    readonly __brand_Component?: true;
}
//  sm10bit_base::Sm10BitBase
export interface sm10bit_base_Sm10BitBase {
    readonly __brand_sm10bit_base_Sm10BitBase?: true;
}
//  sm16716::SM16716
export interface sm16716_SM16716 {
    readonly __brand_sm16716_SM16716?: true;
    readonly __brand_Component?: true;
}
//  sm16716::SM16716::Channel
export interface sm16716_SM16716_Channel {
    readonly __brand_sm16716_SM16716_Channel?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
}
//  sm2135::SM2135
export interface sm2135_SM2135 {
    readonly __brand_sm2135_SM2135?: true;
    readonly __brand_Component?: true;
}
//  sm2135::SM2135::Channel
export interface sm2135_SM2135_Channel {
    readonly __brand_sm2135_SM2135_Channel?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
}
//  sm2235::SM2235
export interface sm2235_SM2235 {
    readonly __brand_sm2235_SM2235?: true;
    readonly __brand_sm10bit_base_Sm10BitBase?: true;
    readonly __brand_Component?: true;
}
//  sm2235::SM2235::Channel
export interface sm2235_SM2235_Channel {
    readonly __brand_sm2235_SM2235_Channel?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
}
//  sm2335::SM2335
export interface sm2335_SM2335 {
    readonly __brand_sm2335_SM2335?: true;
    readonly __brand_sm10bit_base_Sm10BitBase?: true;
    readonly __brand_Component?: true;
}
//  sm2335::SM2335::Channel
export interface sm2335_SM2335_Channel {
    readonly __brand_sm2335_SM2335_Channel?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
}
//  sm300d2::SM300D2Sensor
export interface sm300d2_SM300D2Sensor {
    readonly __brand_sm300d2_SM300D2Sensor?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  sml::Sml
export interface sml_Sml {
    readonly __brand_sml_Sml?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  sml::SmlSensor
export interface sml_SmlSensor {
    readonly __brand_sml_SmlSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  sml::SmlTextSensor
export interface sml_SmlTextSensor {
    readonly __brand_sml_SmlTextSensor?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  smt100::SMT100Component
export interface smt100_SMT100Component {
    readonly __brand_smt100_SMT100Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  sn74hc165::SN74HC165Component
export interface sn74hc165_SN74HC165Component {
    readonly __brand_sn74hc165_SN74HC165Component?: true;
    readonly __brand_Component?: true;
}
//  sn74hc595::SN74HC595Component
export interface sn74hc595_SN74HC595Component {
    readonly __brand_sn74hc595_SN74HC595Component?: true;
}
//  sn74hc595::SN74HC595GPIOComponent
export interface sn74hc595_SN74HC595GPIOComponent {
    readonly __brand_sn74hc595_SN74HC595GPIOComponent?: true;
    readonly __brand_sn74hc595_SN74HC595Component?: true;
    readonly __brand_Component?: true;
}
//  sn74hc595::SN74HC595SPIComponent
export interface sn74hc595_SN74HC595SPIComponent {
    readonly __brand_sn74hc595_SN74HC595SPIComponent?: true;
    readonly __brand_sn74hc595_SN74HC595Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  sntp::SNTPComponent
export interface sntp_SNTPComponent {
    readonly __brand_sntp_SNTPComponent?: true;
    readonly __brand_time_RealTimeClock?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  sonoff_d1::SonoffD1Output
export interface sonoff_d1_SonoffD1Output {
    readonly __brand_sonoff_d1_SonoffD1Output?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_light_LightOutput?: true;
    readonly __brand_uart_UARTComponent?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_light_AddressableLightState?: true;
}
//  sound_level::SoundLevelComponent
export interface sound_level_SoundLevelComponent {
    readonly __brand_sound_level_SoundLevelComponent?: true;
    readonly __brand_Component?: true;
}
//  speaker::AudioPipeline
export interface speaker_AudioPipeline {
    readonly __brand_speaker_AudioPipeline?: true;
    readonly __brand_speaker_Speaker?: true;
    readonly __brand_speaker_SpeakerMediaPlayer?: true;
}
//  speaker::Speaker
export interface speaker_Speaker {
    readonly __brand_speaker_Speaker?: true;
}
//  speaker::SpeakerMediaPlayer
export interface speaker_SpeakerMediaPlayer {
    readonly __brand_speaker_SpeakerMediaPlayer?: true;
    readonly __brand_media_player_MediaPlayer?: true;
    readonly __brand_Component?: true;
}
//  speaker_source::PipelineContext
export interface speaker_source_PipelineContext {
    readonly __brand_speaker_source_PipelineContext?: true;
    readonly __brand_speaker_source_SpeakerSourceMediaPlayer?: true;
}
//  speaker_source::SpeakerSourceMediaPlayer
export interface speaker_source_SpeakerSourceMediaPlayer {
    readonly __brand_speaker_source_SpeakerSourceMediaPlayer?: true;
    readonly __brand_Component?: true;
    readonly __brand_media_player_MediaPlayer?: true;
}
//  speed::SpeedFan
export interface speed_SpeedFan {
    readonly __brand_speed_SpeedFan?: true;
    readonly __brand_Component?: true;
    readonly __brand_fan_Fan?: true;
    readonly __brand_EntityBase?: true;
}
//  spi::OctalSPIComponent
export interface spi_OctalSPIComponent {
    readonly __brand_spi_OctalSPIComponent?: true;
    readonly __brand_Component?: true;
}
//  spi::QuadSPIComponent
export interface spi_QuadSPIComponent {
    readonly __brand_spi_QuadSPIComponent?: true;
    readonly __brand_Component?: true;
}
//  spi::SPIComponent
export interface spi_SPIComponent {
    readonly __brand_spi_SPIComponent?: true;
    readonly __brand_Component?: true;
}
//  spi::SPIDevice
export interface spi_SPIDevice {
    readonly __brand_spi_SPIDevice?: true;
}
//  spi_device::SPIDeviceComponent
export interface spi_device_SPIDeviceComponent {
    readonly __brand_spi_device_SPIDeviceComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  spi_led_strip::SpiLedStrip
export interface spi_led_strip_SpiLedStrip {
    readonly __brand_spi_led_strip_SpiLedStrip?: true;
    readonly __brand_light_AddressableLight?: true;
    readonly __brand_light_LightOutput?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_light_AddressableLightState?: true;
}
//  sprinkler::Sprinkler
export interface sprinkler_Sprinkler {
    readonly __brand_sprinkler_Sprinkler?: true;
    readonly __brand_Component?: true;
}
//  sprinkler::SprinklerControllerNumber
export interface sprinkler_SprinklerControllerNumber {
    readonly __brand_sprinkler_SprinklerControllerNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  sprinkler::SprinklerControllerSwitch
export interface sprinkler_SprinklerControllerSwitch {
    readonly __brand_sprinkler_SprinklerControllerSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  sps30::SPS30Component
export interface sps30_SPS30Component {
    readonly __brand_sps30_SPS30Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensirion_common_SensirionI2CDevice?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ssd1306_base::SSD1306
export interface ssd1306_base_SSD1306 {
    readonly __brand_ssd1306_base_SSD1306?: true;
}
//  ssd1306_i2c::I2CSSD1306
export interface ssd1306_i2c_I2CSSD1306 {
    readonly __brand_ssd1306_i2c_I2CSSD1306?: true;
    readonly __brand_ssd1306_base_SSD1306?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_display_DisplayBuffer?: true;
    readonly __brand_display_Display?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ssd1306_spi::SPISSD1306
export interface ssd1306_spi_SPISSD1306 {
    readonly __brand_ssd1306_spi_SPISSD1306?: true;
    readonly __brand_ssd1306_base_SSD1306?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_display_DisplayBuffer?: true;
    readonly __brand_display_Display?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  ssd1322_base::SSD1322
export interface ssd1322_base_SSD1322 {
    readonly __brand_ssd1322_base_SSD1322?: true;
}
//  ssd1322_spi::SPISSD1322
export interface ssd1322_spi_SPISSD1322 {
    readonly __brand_ssd1322_spi_SPISSD1322?: true;
    readonly __brand_ssd1322_base_SSD1322?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_display_DisplayBuffer?: true;
    readonly __brand_display_Display?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  ssd1325_base::SSD1325
export interface ssd1325_base_SSD1325 {
    readonly __brand_ssd1325_base_SSD1325?: true;
}
//  ssd1325_spi::SPISSD1325
export interface ssd1325_spi_SPISSD1325 {
    readonly __brand_ssd1325_spi_SPISSD1325?: true;
    readonly __brand_ssd1325_base_SSD1325?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_display_DisplayBuffer?: true;
    readonly __brand_display_Display?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  ssd1327_base::SSD1327
export interface ssd1327_base_SSD1327 {
    readonly __brand_ssd1327_base_SSD1327?: true;
}
//  ssd1327_i2c::I2CSSD1327
export interface ssd1327_i2c_I2CSSD1327 {
    readonly __brand_ssd1327_i2c_I2CSSD1327?: true;
    readonly __brand_ssd1327_base_SSD1327?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_display_DisplayBuffer?: true;
    readonly __brand_display_Display?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ssd1327_spi::SPISSD1327
export interface ssd1327_spi_SPISSD1327 {
    readonly __brand_ssd1327_spi_SPISSD1327?: true;
    readonly __brand_ssd1327_base_SSD1327?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_display_DisplayBuffer?: true;
    readonly __brand_display_Display?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  ssd1331_base::SSD1331
export interface ssd1331_base_SSD1331 {
    readonly __brand_ssd1331_base_SSD1331?: true;
}
//  ssd1331_spi::SPISSD1331
export interface ssd1331_spi_SPISSD1331 {
    readonly __brand_ssd1331_spi_SPISSD1331?: true;
    readonly __brand_ssd1331_base_SSD1331?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_display_DisplayBuffer?: true;
    readonly __brand_display_Display?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  ssd1351_base::SSD1351
export interface ssd1351_base_SSD1351 {
    readonly __brand_ssd1351_base_SSD1351?: true;
}
//  ssd1351_spi::SPISSD1351
export interface ssd1351_spi_SPISSD1351 {
    readonly __brand_ssd1351_spi_SPISSD1351?: true;
    readonly __brand_ssd1351_base_SSD1351?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_display_DisplayBuffer?: true;
    readonly __brand_display_Display?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  st7567_base::ST7567
export interface st7567_base_ST7567 {
    readonly __brand_st7567_base_ST7567?: true;
}
//  st7567_i2c::I2CST7567
export interface st7567_i2c_I2CST7567 {
    readonly __brand_st7567_i2c_I2CST7567?: true;
    readonly __brand_st7567_base_ST7567?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_display_DisplayBuffer?: true;
    readonly __brand_display_Display?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  st7567_spi::SPIST7567
export interface st7567_spi_SPIST7567 {
    readonly __brand_st7567_spi_SPIST7567?: true;
    readonly __brand_st7567_base_ST7567?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_display_DisplayBuffer?: true;
    readonly __brand_display_Display?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  st7701s::ST7701S
export interface st7701s_ST7701S {
    readonly __brand_st7701s_ST7701S?: true;
    readonly __brand_display_Display?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  st7735::ST7735
export interface st7735_ST7735 {
    readonly __brand_st7735_ST7735?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_display_DisplayBuffer?: true;
    readonly __brand_display_Display?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  st7789v::ST7789V
export interface st7789v_ST7789V {
    readonly __brand_st7789v_ST7789V?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
    readonly __brand_display_DisplayBuffer?: true;
    readonly __brand_display_Display?: true;
}
//  st7920::ST7920
export interface st7920_ST7920 {
    readonly __brand_st7920_ST7920?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_display_DisplayBuffer?: true;
    readonly __brand_display_Display?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  statsd::StatsdComponent
export interface statsd_StatsdComponent {
    readonly __brand_statsd_StatsdComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  status::StatusBinarySensor
export interface status_StatusBinarySensor {
    readonly __brand_status_StatusBinarySensor?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  status_led::StatusLED
export interface status_led_StatusLED {
    readonly __brand_status_led_StatusLED?: true;
    readonly __brand_Component?: true;
}
//  status_led::StatusLEDLightOutput
export interface status_led_StatusLEDLightOutput {
    readonly __brand_status_led_StatusLEDLightOutput?: true;
    readonly __brand_light_LightOutput?: true;
    readonly __brand_Component?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_light_AddressableLightState?: true;
}
//  stepper::Stepper
export interface stepper_Stepper {
    readonly __brand_stepper_Stepper?: true;
}
//  sts3x::STS3XComponent
export interface sts3x_STS3XComponent {
    readonly __brand_sts3x_STS3XComponent?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  stts22h::STTS22HComponent
export interface stts22h_STTS22HComponent {
    readonly __brand_stts22h_STTS22HComponent?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  sun::Sun
export interface sun_Sun {
    readonly __brand_sun_Sun?: true;
}
//  sun::SunSensor
export interface sun_SunSensor {
    readonly __brand_sun_SunSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  sun::SunTextSensor
export interface sun_SunTextSensor {
    readonly __brand_sun_SunTextSensor?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  sun_gtil2::SunGTIL2
export interface sun_gtil2_SunGTIL2 {
    readonly __brand_sun_gtil2_SunGTIL2?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  switch_::Switch
export interface switch__Switch {
    readonly __brand_switch__Switch?: true;
}
//  switch_::SwitchBinarySensor
export interface switch__SwitchBinarySensor {
    readonly __brand_switch__SwitchBinarySensor?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  sx126x::SX126x
export interface sx126x_SX126x {
    readonly __brand_sx126x_SX126x?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  sx126x::SX126xListener
export interface sx126x_SX126xListener {
    readonly __brand_sx126x_SX126xListener?: true;
    readonly __brand_sx126x_SX126x?: true;
}
//  sx126x::SX126xTransport
export interface sx126x_SX126xTransport {
    readonly __brand_sx126x_SX126xTransport?: true;
    readonly __brand_packet_transport_PacketTransport?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sx126x_SX126xListener?: true;
    readonly __brand_sx126x_SX126x?: true;
}
//  sx127x::SX127x
export interface sx127x_SX127x {
    readonly __brand_sx127x_SX127x?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  sx127x::SX127xListener
export interface sx127x_SX127xListener {
    readonly __brand_sx127x_SX127xListener?: true;
    readonly __brand_sx127x_SX127x?: true;
}
//  sx127x::SX127xTransport
export interface sx127x_SX127xTransport {
    readonly __brand_sx127x_SX127xTransport?: true;
    readonly __brand_packet_transport_PacketTransport?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sx127x_SX127xListener?: true;
    readonly __brand_sx127x_SX127x?: true;
}
//  sx1509::SX1509BinarySensor
export interface sx1509_SX1509BinarySensor {
    readonly __brand_sx1509_SX1509BinarySensor?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
}
//  sx1509::SX1509Component
export interface sx1509_SX1509Component {
    readonly __brand_sx1509_SX1509Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
    readonly __brand_key_provider_KeyProvider?: true;
}
//  sx1509::SX1509FloatOutputChannel
export interface sx1509_SX1509FloatOutputChannel {
    readonly __brand_sx1509_SX1509FloatOutputChannel?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
    readonly __brand_Component?: true;
}
//  sy6970::SY6970BatteryVoltageSensor
export interface sy6970_SY6970BatteryVoltageSensor {
    readonly __brand_sy6970_SY6970BatteryVoltageSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  sy6970::SY6970BusStatusTextSensor
export interface sy6970_SY6970BusStatusTextSensor {
    readonly __brand_sy6970_SY6970BusStatusTextSensor?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
}
//  sy6970::SY6970ChargeCurrentSensor
export interface sy6970_SY6970ChargeCurrentSensor {
    readonly __brand_sy6970_SY6970ChargeCurrentSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  sy6970::SY6970ChargeDoneBinarySensor
export interface sy6970_SY6970ChargeDoneBinarySensor {
    readonly __brand_sy6970_SY6970ChargeDoneBinarySensor?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
}
//  sy6970::SY6970ChargeStatusTextSensor
export interface sy6970_SY6970ChargeStatusTextSensor {
    readonly __brand_sy6970_SY6970ChargeStatusTextSensor?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
}
//  sy6970::SY6970ChargingBinarySensor
export interface sy6970_SY6970ChargingBinarySensor {
    readonly __brand_sy6970_SY6970ChargingBinarySensor?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
}
//  sy6970::SY6970Component
export interface sy6970_SY6970Component {
    readonly __brand_sy6970_SY6970Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  sy6970::SY6970NtcStatusTextSensor
export interface sy6970_SY6970NtcStatusTextSensor {
    readonly __brand_sy6970_SY6970NtcStatusTextSensor?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
}
//  sy6970::SY6970PrechargeCurrentSensor
export interface sy6970_SY6970PrechargeCurrentSensor {
    readonly __brand_sy6970_SY6970PrechargeCurrentSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  sy6970::SY6970SystemVoltageSensor
export interface sy6970_SY6970SystemVoltageSensor {
    readonly __brand_sy6970_SY6970SystemVoltageSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  sy6970::SY6970VbusConnectedBinarySensor
export interface sy6970_SY6970VbusConnectedBinarySensor {
    readonly __brand_sy6970_SY6970VbusConnectedBinarySensor?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
}
//  sy6970::SY6970VbusVoltageSensor
export interface sy6970_SY6970VbusVoltageSensor {
    readonly __brand_sy6970_SY6970VbusVoltageSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  syslog::Syslog
export interface syslog_Syslog {
    readonly __brand_syslog_Syslog?: true;
    readonly __brand_Component?: true;
    readonly __brand_Parented?: true;
}
//  t6615::T6615Component
export interface t6615_T6615Component {
    readonly __brand_t6615_T6615Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  tc74::TC74Component
export interface tc74_TC74Component {
    readonly __brand_tc74_TC74Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  tca9548a::TCA9548AChannel
export interface tca9548a_TCA9548AChannel {
    readonly __brand_tca9548a_TCA9548AChannel?: true;
    readonly __brand_i2c_I2CBus?: true;
    readonly __brand_Component?: true;
}
//  tca9548a::TCA9548AComponent
export interface tca9548a_TCA9548AComponent {
    readonly __brand_tca9548a_TCA9548AComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  tca9555::TCA9555Component
export interface tca9555_TCA9555Component {
    readonly __brand_tca9555_TCA9555Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  tcl112::Tcl112Climate
export interface tcl112_Tcl112Climate {
    readonly __brand_tcl112_Tcl112Climate?: true;
    readonly __brand_climate_ir_ClimateIR?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_remote_base_RemoteReceiverListener?: true;
    readonly __brand_remote_base_RemoteTransmittable?: true;
}
//  tcs34725::TCS34725Component
export interface tcs34725_TCS34725Component {
    readonly __brand_tcs34725_TCS34725Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  tee501::TEE501Component
export interface tee501_TEE501Component {
    readonly __brand_tee501_TEE501Component?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  teleinfo::TeleInfo
export interface teleinfo_TeleInfo {
    readonly __brand_teleinfo_TeleInfo?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  teleinfo::TeleInfoSensor
export interface teleinfo_TeleInfoSensor {
    readonly __brand_teleinfo_TeleInfoSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  teleinfo::TeleInfoTextSensor
export interface teleinfo_TeleInfoTextSensor {
    readonly __brand_teleinfo_TeleInfoTextSensor?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  tem3200::TEM3200Component
export interface tem3200_TEM3200Component {
    readonly __brand_tem3200_TEM3200Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  template_::TemplateAlarmControlPanel
export interface template__TemplateAlarmControlPanel {
    readonly __brand_template__TemplateAlarmControlPanel?: true;
    readonly __brand_alarm_control_panel_AlarmControlPanel?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  template_::TemplateBinaryOutput
export interface template__TemplateBinaryOutput {
    readonly __brand_template__TemplateBinaryOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
}
//  template_::TemplateBinarySensor
export interface template__TemplateBinarySensor {
    readonly __brand_template__TemplateBinarySensor?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  template_::TemplateButton
export interface template__TemplateButton {
    readonly __brand_template__TemplateButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
}
//  template_::TemplateCover
export interface template__TemplateCover {
    readonly __brand_template__TemplateCover?: true;
    readonly __brand_cover_Cover?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  template_::TemplateDate
export interface template__TemplateDate {
    readonly __brand_template__TemplateDate?: true;
    readonly __brand_datetime_DateEntity?: true;
    readonly __brand_datetime_DateTimeBase?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_template__TemplateLock?: true;
    readonly __brand_template__TemplateValve?: true;
    readonly __brand_template__TemplateWaterHeater?: true;
    readonly __brand_datetime_DateTimeEntity?: true;
    readonly __brand_datetime_TimeEntity?: true;
}
//  template_::TemplateDateTime
export interface template__TemplateDateTime {
    readonly __brand_template__TemplateDateTime?: true;
    readonly __brand_datetime_DateTimeEntity?: true;
    readonly __brand_datetime_DateTimeBase?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  template_::TemplateEvent
export interface template__TemplateEvent {
    readonly __brand_template__TemplateEvent?: true;
    readonly __brand_event_Event?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  template_::TemplateFan
export interface template__TemplateFan {
    readonly __brand_template__TemplateFan?: true;
    readonly __brand_Component?: true;
    readonly __brand_fan_Fan?: true;
    readonly __brand_EntityBase?: true;
}
//  template_::TemplateFloatOutput
export interface template__TemplateFloatOutput {
    readonly __brand_template__TemplateFloatOutput?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
}
//  template_::TemplateLock
export interface template__TemplateLock {
    readonly __brand_template__TemplateLock?: true;
    readonly __brand_lock_Lock?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  template_::TemplateNumber
export interface template__TemplateNumber {
    readonly __brand_template__TemplateNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  template_::TemplateSelect
export interface template__TemplateSelect {
    readonly __brand_template__TemplateSelect?: true;
    readonly __brand_select_Select?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  template_::TemplateSensor
export interface template__TemplateSensor {
    readonly __brand_template__TemplateSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  template_::TemplateSwitch
export interface template__TemplateSwitch {
    readonly __brand_template__TemplateSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  template_::TemplateText
export interface template__TemplateText {
    readonly __brand_template__TemplateText?: true;
    readonly __brand_text_Text?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  template_::TemplateTextSensor
export interface template__TemplateTextSensor {
    readonly __brand_template__TemplateTextSensor?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  template_::TemplateTime
export interface template__TemplateTime {
    readonly __brand_template__TemplateTime?: true;
    readonly __brand_datetime_TimeEntity?: true;
    readonly __brand_datetime_DateTimeBase?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  template_::TemplateValve
export interface template__TemplateValve {
    readonly __brand_template__TemplateValve?: true;
    readonly __brand_valve_Valve?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  template_::TemplateWaterHeater
export interface template__TemplateWaterHeater {
    readonly __brand_template__TemplateWaterHeater?: true;
    readonly __brand_Component?: true;
    readonly __brand_water_heater_WaterHeater?: true;
    readonly __brand_EntityBase?: true;
}
//  text::Text
export interface text_Text {
    readonly __brand_text_Text?: true;
    readonly __brand_EntityBase?: true;
}
//  text_sensor::TextSensor
export interface text_sensor_TextSensor {
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
}
//  thermopro_ble::ThermoProBLE
export interface thermopro_ble_ThermoProBLE {
    readonly __brand_thermopro_ble_ThermoProBLE?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  thermostat::ThermostatClimate
export interface thermostat_ThermostatClimate {
    readonly __brand_thermostat_ThermostatClimate?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  thermostat::ThermostatClimateTargetTempConfig
export interface thermostat_ThermostatClimateTargetTempConfig {
    readonly __brand_thermostat_ThermostatClimateTargetTempConfig?: true;
}
//  time::RealTimeClock
export interface time_RealTimeClock {
    readonly __brand_time_RealTimeClock?: true;
}
//  time_based::TimeBasedCover
export interface time_based_TimeBasedCover {
    readonly __brand_time_based_TimeBasedCover?: true;
    readonly __brand_cover_Cover?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  tinyusb::TinyUSB
export interface tinyusb_TinyUSB {
    readonly __brand_tinyusb_TinyUSB?: true;
    readonly __brand_Component?: true;
}
//  tlc59208f::TLC59208FChannel
export interface tlc59208f_TLC59208FChannel {
    readonly __brand_tlc59208f_TLC59208FChannel?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
}
//  tlc59208f::TLC59208FOutput
export interface tlc59208f_TLC59208FOutput {
    readonly __brand_tlc59208f_TLC59208FOutput?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  tlc5947::TLC5947
export interface tlc5947_TLC5947 {
    readonly __brand_tlc5947_TLC5947?: true;
    readonly __brand_Component?: true;
}
//  tlc5947::TLC5947Channel
export interface tlc5947_TLC5947Channel {
    readonly __brand_tlc5947_TLC5947Channel?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
    readonly __brand_Parented?: true;
}
//  tlc5971::TLC5971
export interface tlc5971_TLC5971 {
    readonly __brand_tlc5971_TLC5971?: true;
    readonly __brand_Component?: true;
}
//  tlc5971::TLC5971Channel
export interface tlc5971_TLC5971Channel {
    readonly __brand_tlc5971_TLC5971Channel?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
    readonly __brand_Parented?: true;
}
//  tm1621::TM1621Display
export interface tm1621_TM1621Display {
    readonly __brand_tm1621_TM1621Display?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  tm1637::TM1637Display
export interface tm1637_TM1637Display {
    readonly __brand_tm1637_TM1637Display?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  tm1637::TM1637Key
export interface tm1637_TM1637Key {
    readonly __brand_tm1637_TM1637Key?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
}
//  tm1638::TM1638Component
export interface tm1638_TM1638Component {
    readonly __brand_tm1638_TM1638Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  tm1638::TM1638Key
export interface tm1638_TM1638Key {
    readonly __brand_tm1638_TM1638Key?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
}
//  tm1638::TM1638OutputLed
export interface tm1638_TM1638OutputLed {
    readonly __brand_tm1638_TM1638OutputLed?: true;
    readonly __brand_output_BinaryOutput?: true;
    readonly __brand_Component?: true;
}
//  tm1638::TM1638SwitchLed
export interface tm1638_TM1638SwitchLed {
    readonly __brand_tm1638_TM1638SwitchLed?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  tm1651::TM1651Display
export interface tm1651_TM1651Display {
    readonly __brand_tm1651_TM1651Display?: true;
    readonly __brand_Component?: true;
}
//  tmp102::TMP102Component
export interface tmp102_TMP102Component {
    readonly __brand_tmp102_TMP102Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  tmp1075::TMP1075Sensor
export interface tmp1075_TMP1075Sensor {
    readonly __brand_tmp1075_TMP1075Sensor?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  tmp117::TMP117Component
export interface tmp117_TMP117Component {
    readonly __brand_tmp117_TMP117Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  tof10120::TOF10120Sensor
export interface tof10120_TOF10120Sensor {
    readonly __brand_tof10120_TOF10120Sensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  tormatic::Tormatic
export interface tormatic_Tormatic {
    readonly __brand_tormatic_Tormatic?: true;
    readonly __brand_cover_Cover?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  toshiba::ToshibaClimate
export interface toshiba_ToshibaClimate {
    readonly __brand_toshiba_ToshibaClimate?: true;
    readonly __brand_climate_ir_ClimateIR?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_remote_base_RemoteReceiverListener?: true;
    readonly __brand_remote_base_RemoteTransmittable?: true;
}
//  total_daily_energy::TotalDailyEnergy
export interface total_daily_energy_TotalDailyEnergy {
    readonly __brand_total_daily_energy_TotalDailyEnergy?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  touchscreen::TouchListener
export interface touchscreen_TouchListener {
    readonly __brand_touchscreen_TouchListener?: true;
}
//  touchscreen::Touchscreen
export interface touchscreen_Touchscreen {
    readonly __brand_touchscreen_Touchscreen?: true;
}
//  touchscreen::TouchscreenBinarySensor
export interface touchscreen_TouchscreenBinarySensor {
    readonly __brand_touchscreen_TouchscreenBinarySensor?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_touchscreen_TouchListener?: true;
    readonly __brand_Parented?: true;
}
//  tsl2561::TSL2561Sensor
export interface tsl2561_TSL2561Sensor {
    readonly __brand_tsl2561_TSL2561Sensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  tsl2591::TSL2591Component
export interface tsl2591_TSL2591Component {
    readonly __brand_tsl2591_TSL2591Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  tt21100::TT21100Button
export interface tt21100_TT21100Button {
    readonly __brand_tt21100_TT21100Button?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_tt21100_TT21100ButtonListener?: true;
    readonly __brand_Parented?: true;
}
//  tt21100::TT21100ButtonListener
export interface tt21100_TT21100ButtonListener {
    readonly __brand_tt21100_TT21100ButtonListener?: true;
}
//  tt21100::TT21100Touchscreen
export interface tt21100_TT21100Touchscreen {
    readonly __brand_tt21100_TT21100Touchscreen?: true;
    readonly __brand_touchscreen_Touchscreen?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ttp229_bsf::TTP229BSFChannel
export interface ttp229_bsf_TTP229BSFChannel {
    readonly __brand_ttp229_bsf_TTP229BSFChannel?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
}
//  ttp229_bsf::TTP229BSFComponent
export interface ttp229_bsf_TTP229BSFComponent {
    readonly __brand_ttp229_bsf_TTP229BSFComponent?: true;
    readonly __brand_Component?: true;
}
//  ttp229_lsf::TTP229Channel
export interface ttp229_lsf_TTP229Channel {
    readonly __brand_ttp229_lsf_TTP229Channel?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
}
//  ttp229_lsf::TTP229LSFComponent
export interface ttp229_lsf_TTP229LSFComponent {
    readonly __brand_ttp229_lsf_TTP229LSFComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  tuya::Tuya
export interface tuya_Tuya {
    readonly __brand_tuya_Tuya?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  tuya::TuyaBinarySensor
export interface tuya_TuyaBinarySensor {
    readonly __brand_tuya_TuyaBinarySensor?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  tuya::TuyaClimate
export interface tuya_TuyaClimate {
    readonly __brand_tuya_TuyaClimate?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  tuya::TuyaCover
export interface tuya_TuyaCover {
    readonly __brand_tuya_TuyaCover?: true;
    readonly __brand_cover_Cover?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  tuya::TuyaFan
export interface tuya_TuyaFan {
    readonly __brand_tuya_TuyaFan?: true;
    readonly __brand_Component?: true;
    readonly __brand_fan_Fan?: true;
    readonly __brand_EntityBase?: true;
}
//  tuya::TuyaLight
export interface tuya_TuyaLight {
    readonly __brand_tuya_TuyaLight?: true;
    readonly __brand_light_LightOutput?: true;
    readonly __brand_Component?: true;
    readonly __brand_light_LightState?: true;
    readonly __brand_light_AddressableLightState?: true;
}
//  tuya::TuyaNumber
export interface tuya_TuyaNumber {
    readonly __brand_tuya_TuyaNumber?: true;
    readonly __brand_number_Number?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  tuya::TuyaSelect
export interface tuya_TuyaSelect {
    readonly __brand_tuya_TuyaSelect?: true;
    readonly __brand_select_Select?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  tuya::TuyaSensor
export interface tuya_TuyaSensor {
    readonly __brand_tuya_TuyaSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  tuya::TuyaSwitch
export interface tuya_TuyaSwitch {
    readonly __brand_tuya_TuyaSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  tuya::TuyaTextSensor
export interface tuya_TuyaTextSensor {
    readonly __brand_tuya_TuyaTextSensor?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  tx20::Tx20Component
export interface tx20_Tx20Component {
    readonly __brand_tx20_Tx20Component?: true;
    readonly __brand_Component?: true;
}
//  uart::UARTButton
export interface uart_UARTButton {
    readonly __brand_uart_UARTButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_Component?: true;
}
//  uart::UARTComponent
export interface uart_UARTComponent {
    readonly __brand_uart_UARTComponent?: true;
    readonly __brand_Component?: true;
}
//  uart::UARTDevice
export interface uart_UARTDevice {
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  uart::UARTEvent
export interface uart_UARTEvent {
    readonly __brand_uart_UARTEvent?: true;
    readonly __brand_event_Event?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_Component?: true;
}
//  uart::UARTSwitch
export interface uart_UARTSwitch {
    readonly __brand_uart_UARTSwitch?: true;
    readonly __brand_switch__Switch?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_Component?: true;
}
//  uart::UARTTransport
export interface uart_UARTTransport {
    readonly __brand_uart_UARTTransport?: true;
    readonly __brand_packet_transport_PacketTransport?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  udp::UDPComponent
export interface udp_UDPComponent {
    readonly __brand_udp_UDPComponent?: true;
    readonly __brand_Component?: true;
}
//  udp::UDPTransport
export interface udp_UDPTransport {
    readonly __brand_udp_UDPTransport?: true;
    readonly __brand_packet_transport_PacketTransport?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_udp_UDPComponent?: true;
}
//  ufire_ec::UFireECComponent
export interface ufire_ec_UFireECComponent {
    readonly __brand_ufire_ec_UFireECComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  ufire_ise::UFireISEComponent
export interface ufire_ise_UFireISEComponent {
    readonly __brand_ufire_ise_UFireISEComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  uln2003::ULN2003
export interface uln2003_ULN2003 {
    readonly __brand_uln2003_ULN2003?: true;
    readonly __brand_stepper_Stepper?: true;
    readonly __brand_Component?: true;
}
//  ultrasonic::UltrasonicSensorComponent
export interface ultrasonic_UltrasonicSensorComponent {
    readonly __brand_ultrasonic_UltrasonicSensorComponent?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  update::UpdateEntity
export interface update_UpdateEntity {
    readonly __brand_update_UpdateEntity?: true;
}
//  uponor_smatrix::UponorSmatrixClimate
export interface uponor_smatrix_UponorSmatrixClimate {
    readonly __brand_uponor_smatrix_UponorSmatrixClimate?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_uponor_smatrix_UponorSmatrixDevice?: true;
    readonly __brand_Parented?: true;
}
//  uponor_smatrix::UponorSmatrixComponent
export interface uponor_smatrix_UponorSmatrixComponent {
    readonly __brand_uponor_smatrix_UponorSmatrixComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  uponor_smatrix::UponorSmatrixDevice
export interface uponor_smatrix_UponorSmatrixDevice {
    readonly __brand_uponor_smatrix_UponorSmatrixDevice?: true;
}
//  uponor_smatrix::UponorSmatrixSensor
export interface uponor_smatrix_UponorSmatrixSensor {
    readonly __brand_uponor_smatrix_UponorSmatrixSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_uponor_smatrix_UponorSmatrixDevice?: true;
    readonly __brand_Parented?: true;
}
//  uptime::UptimeSecondsSensor
export interface uptime_UptimeSecondsSensor {
    readonly __brand_uptime_UptimeSecondsSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  uptime::UptimeTextSensor
export interface uptime_UptimeTextSensor {
    readonly __brand_uptime_UptimeTextSensor?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  uptime::UptimeTimestampSensor
export interface uptime_UptimeTimestampSensor {
    readonly __brand_uptime_UptimeTimestampSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  usb_cdc_acm::USBCDCACMComponent
export interface usb_cdc_acm_USBCDCACMComponent {
    readonly __brand_usb_cdc_acm_USBCDCACMComponent?: true;
    readonly __brand_Component?: true;
}
//  usb_cdc_acm::USBCDCACMInstance
export interface usb_cdc_acm_USBCDCACMInstance {
    readonly __brand_usb_cdc_acm_USBCDCACMInstance?: true;
    readonly __brand_uart_UARTComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_Parented?: true;
}
//  usb_host::USBClient
export interface usb_host_USBClient {
    readonly __brand_usb_host_USBClient?: true;
    readonly __brand_Component?: true;
}
//  usb_host::USBHost
export interface usb_host_USBHost {
    readonly __brand_usb_host_USBHost?: true;
    readonly __brand_Component?: true;
}
//  usb_uart::USBUartChannel
export interface usb_uart_USBUartChannel {
    readonly __brand_usb_uart_USBUartChannel?: true;
    readonly __brand_uart_UARTComponent?: true;
    readonly __brand_Component?: true;
}
//  usb_uart::USBUartComponent
export interface usb_uart_USBUartComponent {
    readonly __brand_usb_uart_USBUartComponent?: true;
}
//  usb_uart::USBUartTypeCH34X
export interface usb_uart_USBUartTypeCH34X {
    readonly __brand_usb_uart_USBUartTypeCH34X?: true;
    readonly __brand_usb_uart_USBUartComponent?: true;
    readonly __brand_Component?: true;
}
//  usb_uart::USBUartTypeCP210X
export interface usb_uart_USBUartTypeCP210X {
    readonly __brand_usb_uart_USBUartTypeCP210X?: true;
    readonly __brand_usb_uart_USBUartComponent?: true;
    readonly __brand_Component?: true;
}
//  usb_uart::USBUartTypeCdcAcm
export interface usb_uart_USBUartTypeCdcAcm {
    readonly __brand_usb_uart_USBUartTypeCdcAcm?: true;
    readonly __brand_usb_uart_USBUartComponent?: true;
    readonly __brand_Component?: true;
}
//  valve::Valve
export interface valve_Valve {
    readonly __brand_valve_Valve?: true;
    readonly __brand_EntityBase?: true;
}
//  vbus::DeltaSolBS2009BSensor
export interface vbus_DeltaSolBS2009BSensor {
    readonly __brand_vbus_DeltaSolBS2009BSensor?: true;
    readonly __brand_Component?: true;
}
//  vbus::DeltaSolBS2009Sensor
export interface vbus_DeltaSolBS2009Sensor {
    readonly __brand_vbus_DeltaSolBS2009Sensor?: true;
    readonly __brand_Component?: true;
}
//  vbus::DeltaSolBS2BSensor
export interface vbus_DeltaSolBS2BSensor {
    readonly __brand_vbus_DeltaSolBS2BSensor?: true;
    readonly __brand_Component?: true;
}
//  vbus::DeltaSolBS2Sensor
export interface vbus_DeltaSolBS2Sensor {
    readonly __brand_vbus_DeltaSolBS2Sensor?: true;
    readonly __brand_Component?: true;
}
//  vbus::DeltaSolBSPlusBSensor
export interface vbus_DeltaSolBSPlusBSensor {
    readonly __brand_vbus_DeltaSolBSPlusBSensor?: true;
    readonly __brand_Component?: true;
}
//  vbus::DeltaSolBSPlusSensor
export interface vbus_DeltaSolBSPlusSensor {
    readonly __brand_vbus_DeltaSolBSPlusSensor?: true;
    readonly __brand_Component?: true;
}
//  vbus::DeltaSolCBSensor
export interface vbus_DeltaSolCBSensor {
    readonly __brand_vbus_DeltaSolCBSensor?: true;
    readonly __brand_Component?: true;
}
//  vbus::DeltaSolCS2BSensor
export interface vbus_DeltaSolCS2BSensor {
    readonly __brand_vbus_DeltaSolCS2BSensor?: true;
    readonly __brand_Component?: true;
}
//  vbus::DeltaSolCS2Sensor
export interface vbus_DeltaSolCS2Sensor {
    readonly __brand_vbus_DeltaSolCS2Sensor?: true;
    readonly __brand_Component?: true;
}
//  vbus::DeltaSolCSPlusBSensor
export interface vbus_DeltaSolCSPlusBSensor {
    readonly __brand_vbus_DeltaSolCSPlusBSensor?: true;
    readonly __brand_Component?: true;
}
//  vbus::DeltaSolCSPlusSensor
export interface vbus_DeltaSolCSPlusSensor {
    readonly __brand_vbus_DeltaSolCSPlusSensor?: true;
    readonly __brand_Component?: true;
}
//  vbus::DeltaSolCSensor
export interface vbus_DeltaSolCSensor {
    readonly __brand_vbus_DeltaSolCSensor?: true;
    readonly __brand_Component?: true;
}
//  vbus::VBus
export interface vbus_VBus {
    readonly __brand_vbus_VBus?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  vbus::VBusCustomBSensor
export interface vbus_VBusCustomBSensor {
    readonly __brand_vbus_VBusCustomBSensor?: true;
    readonly __brand_Component?: true;
}
//  vbus::VBusCustomSensor
export interface vbus_VBusCustomSensor {
    readonly __brand_vbus_VBusCustomSensor?: true;
    readonly __brand_Component?: true;
}
//  vbus::VBusCustomSubBSensor
export interface vbus_VBusCustomSubBSensor {
    readonly __brand_vbus_VBusCustomSubBSensor?: true;
    readonly __brand_Component?: true;
}
//  vbus::VBusCustomSubSensor
export interface vbus_VBusCustomSubSensor {
    readonly __brand_vbus_VBusCustomSubSensor?: true;
    readonly __brand_Component?: true;
}
//  veml3235::VEML3235Sensor
export interface veml3235_VEML3235Sensor {
    readonly __brand_veml3235_VEML3235Sensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  veml7700::VEML7700Component
export interface veml7700_VEML7700Component {
    readonly __brand_veml7700_VEML7700Component?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  version::VersionTextSensor
export interface version_VersionTextSensor {
    readonly __brand_version_VersionTextSensor?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  vl53l0x::VL53L0XSensor
export interface vl53l0x_VL53L0XSensor {
    readonly __brand_vl53l0x_VL53L0XSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  voice_assistant::VoiceAssistant
export interface voice_assistant_VoiceAssistant {
    readonly __brand_voice_assistant_VoiceAssistant?: true;
    readonly __brand_Component?: true;
}
//  voltage_sampler::VoltageSampler
export interface voltage_sampler_VoltageSampler {
    readonly __brand_voltage_sampler_VoltageSampler?: true;
}
//  wake_on_lan::WakeOnLanButton
export interface wake_on_lan_WakeOnLanButton {
    readonly __brand_wake_on_lan_WakeOnLanButton?: true;
    readonly __brand_button_Button?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  water_heater::WaterHeater
export interface water_heater_WaterHeater {
    readonly __brand_water_heater_WaterHeater?: true;
}
//  waveshare_epaper::WaveshareEPaperBase
export interface waveshare_epaper_WaveshareEPaperBase {
    readonly __brand_waveshare_epaper_WaveshareEPaperBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
    readonly __brand_display_DisplayBuffer?: true;
    readonly __brand_display_Display?: true;
}
//  web_server::WebServer
export interface web_server_WebServer {
    readonly __brand_web_server_WebServer?: true;
    readonly __brand_Component?: true;
    readonly __brand_Controller?: true;
}
//  web_server::WebServerOTAComponent
export interface web_server_WebServerOTAComponent {
    readonly __brand_web_server_WebServerOTAComponent?: true;
    readonly __brand_ota_OTAComponent?: true;
    readonly __brand_Component?: true;
}
//  web_server_base::WebServerBase
export interface web_server_base_WebServerBase {
    readonly __brand_web_server_base_WebServerBase?: true;
}
//  weikai::WeikaiComponent
export interface weikai_WeikaiComponent {
    readonly __brand_weikai_WeikaiComponent?: true;
}
//  weikai_i2c::WeikaiComponentI2C
export interface weikai_i2c_WeikaiComponentI2C {
    readonly __brand_weikai_i2c_WeikaiComponentI2C?: true;
    readonly __brand_weikai_WeikaiComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  weikai_spi::WeikaiComponentSPI
export interface weikai_spi_WeikaiComponentSPI {
    readonly __brand_weikai_spi_WeikaiComponentSPI?: true;
    readonly __brand_weikai_WeikaiComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  whirlpool::WhirlpoolClimate
export interface whirlpool_WhirlpoolClimate {
    readonly __brand_whirlpool_WhirlpoolClimate?: true;
    readonly __brand_climate_ir_ClimateIR?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_remote_base_RemoteReceiverListener?: true;
    readonly __brand_remote_base_RemoteTransmittable?: true;
}
//  whynter::Whynter
export interface whynter_Whynter {
    readonly __brand_whynter_Whynter?: true;
    readonly __brand_climate_ir_ClimateIR?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_remote_base_RemoteReceiverListener?: true;
    readonly __brand_remote_base_RemoteTransmittable?: true;
}
//  wiegand::Wiegand
export interface wiegand_Wiegand {
    readonly __brand_wiegand_Wiegand?: true;
    readonly __brand_key_provider_KeyProvider?: true;
    readonly __brand_Component?: true;
}
//  wifi::WiFiAP
export interface wifi_WiFiAP {
    readonly __brand_wifi_WiFiAP?: true;
}
//  wifi::WiFiComponent
export interface wifi_WiFiComponent {
    readonly __brand_wifi_WiFiComponent?: true;
    readonly __brand_Component?: true;
}
//  wifi_info::BSSIDWiFiInfo
export interface wifi_info_BSSIDWiFiInfo {
    readonly __brand_wifi_info_BSSIDWiFiInfo?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  wifi_info::DNSAddressWifiInfo
export interface wifi_info_DNSAddressWifiInfo {
    readonly __brand_wifi_info_DNSAddressWifiInfo?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  wifi_info::IPAddressWiFiInfo
export interface wifi_info_IPAddressWiFiInfo {
    readonly __brand_wifi_info_IPAddressWiFiInfo?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  wifi_info::MacAddressWifiInfo
export interface wifi_info_MacAddressWifiInfo {
    readonly __brand_wifi_info_MacAddressWifiInfo?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  wifi_info::PowerSaveModeWiFiInfo
export interface wifi_info_PowerSaveModeWiFiInfo {
    readonly __brand_wifi_info_PowerSaveModeWiFiInfo?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  wifi_info::SSIDWiFiInfo
export interface wifi_info_SSIDWiFiInfo {
    readonly __brand_wifi_info_SSIDWiFiInfo?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  wifi_info::ScanResultsWiFiInfo
export interface wifi_info_ScanResultsWiFiInfo {
    readonly __brand_wifi_info_ScanResultsWiFiInfo?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  wifi_signal::WiFiSignalSensor
export interface wifi_signal_WiFiSignalSensor {
    readonly __brand_wifi_signal_WiFiSignalSensor?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
//  wireguard::Wireguard
export interface wireguard_Wireguard {
    readonly __brand_wireguard_Wireguard?: true;
    readonly __brand_Component?: true;
    readonly __brand_PollingComponent?: true;
}
//  wl_134::Wl134Component
export interface wl_134_Wl134Component {
    readonly __brand_wl_134_Wl134Component?: true;
    readonly __brand_text_sensor_TextSensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
}
//  wts01::WTS01Sensor
export interface wts01_WTS01Sensor {
    readonly __brand_wts01_WTS01Sensor?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  x9c::X9cOutput
export interface x9c_X9cOutput {
    readonly __brand_x9c_X9cOutput?: true;
    readonly __brand_output_FloatOutput?: true;
    readonly __brand_output_BinaryOutput?: true;
    readonly __brand_Component?: true;
}
//  xgzp68xx::XGZP68XXComponent
export interface xgzp68xx_XGZP68XXComponent {
    readonly __brand_xgzp68xx_XGZP68XXComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  xiaomi_ble::XiaomiListener
export interface xiaomi_ble_XiaomiListener {
    readonly __brand_xiaomi_ble_XiaomiListener?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  xiaomi_cgd1::XiaomiCGD1
export interface xiaomi_cgd1_XiaomiCGD1 {
    readonly __brand_xiaomi_cgd1_XiaomiCGD1?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  xiaomi_cgdk2::XiaomiCGDK2
export interface xiaomi_cgdk2_XiaomiCGDK2 {
    readonly __brand_xiaomi_cgdk2_XiaomiCGDK2?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  xiaomi_cgg1::XiaomiCGG1
export interface xiaomi_cgg1_XiaomiCGG1 {
    readonly __brand_xiaomi_cgg1_XiaomiCGG1?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  xiaomi_cgpr1::XiaomiCGPR1
export interface xiaomi_cgpr1_XiaomiCGPR1 {
    readonly __brand_xiaomi_cgpr1_XiaomiCGPR1?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
}
//  xiaomi_gcls002::XiaomiGCLS002
export interface xiaomi_gcls002_XiaomiGCLS002 {
    readonly __brand_xiaomi_gcls002_XiaomiGCLS002?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  xiaomi_hhccjcy01::XiaomiHHCCJCY01
export interface xiaomi_hhccjcy01_XiaomiHHCCJCY01 {
    readonly __brand_xiaomi_hhccjcy01_XiaomiHHCCJCY01?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  xiaomi_hhccjcy10::XiaomiHHCCJCY10
export interface xiaomi_hhccjcy10_XiaomiHHCCJCY10 {
    readonly __brand_xiaomi_hhccjcy10_XiaomiHHCCJCY10?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  xiaomi_hhccpot002::XiaomiHHCCPOT002
export interface xiaomi_hhccpot002_XiaomiHHCCPOT002 {
    readonly __brand_xiaomi_hhccpot002_XiaomiHHCCPOT002?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  xiaomi_jqjcy01ym::XiaomiJQJCY01YM
export interface xiaomi_jqjcy01ym_XiaomiJQJCY01YM {
    readonly __brand_xiaomi_jqjcy01ym_XiaomiJQJCY01YM?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  xiaomi_lywsd02::XiaomiLYWSD02
export interface xiaomi_lywsd02_XiaomiLYWSD02 {
    readonly __brand_xiaomi_lywsd02_XiaomiLYWSD02?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  xiaomi_lywsd02mmc::XiaomiLYWSD02MMC
export interface xiaomi_lywsd02mmc_XiaomiLYWSD02MMC {
    readonly __brand_xiaomi_lywsd02mmc_XiaomiLYWSD02MMC?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  xiaomi_lywsd03mmc::XiaomiLYWSD03MMC
export interface xiaomi_lywsd03mmc_XiaomiLYWSD03MMC {
    readonly __brand_xiaomi_lywsd03mmc_XiaomiLYWSD03MMC?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  xiaomi_lywsdcgq::XiaomiLYWSDCGQ
export interface xiaomi_lywsdcgq_XiaomiLYWSDCGQ {
    readonly __brand_xiaomi_lywsdcgq_XiaomiLYWSDCGQ?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  xiaomi_mhoc303::XiaomiMHOC303
export interface xiaomi_mhoc303_XiaomiMHOC303 {
    readonly __brand_xiaomi_mhoc303_XiaomiMHOC303?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  xiaomi_mhoc401::XiaomiMHOC401
export interface xiaomi_mhoc401_XiaomiMHOC401 {
    readonly __brand_xiaomi_mhoc401_XiaomiMHOC401?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  xiaomi_miscale::XiaomiMiscale
export interface xiaomi_miscale_XiaomiMiscale {
    readonly __brand_xiaomi_miscale_XiaomiMiscale?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  xiaomi_mjyd02yla::XiaomiMJYD02YLA
export interface xiaomi_mjyd02yla_XiaomiMJYD02YLA {
    readonly __brand_xiaomi_mjyd02yla_XiaomiMJYD02YLA?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
}
//  xiaomi_mue4094rt::XiaomiMUE4094RT
export interface xiaomi_mue4094rt_XiaomiMUE4094RT {
    readonly __brand_xiaomi_mue4094rt_XiaomiMUE4094RT?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
}
//  xiaomi_rtcgq02lm::XiaomiRTCGQ02LM
export interface xiaomi_rtcgq02lm_XiaomiRTCGQ02LM {
    readonly __brand_xiaomi_rtcgq02lm_XiaomiRTCGQ02LM?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  xiaomi_wx08zm::XiaomiWX08ZM
export interface xiaomi_wx08zm_XiaomiWX08ZM {
    readonly __brand_xiaomi_wx08zm_XiaomiWX08ZM?: true;
    readonly __brand_binary_sensor_BinarySensor?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
}
//  xiaomi_xmwsdj04mmc::XiaomiXMWSDJ04MMC
export interface xiaomi_xmwsdj04mmc_XiaomiXMWSDJ04MMC {
    readonly __brand_xiaomi_xmwsdj04mmc_XiaomiXMWSDJ04MMC?: true;
    readonly __brand_esp32_ble_tracker_ESPBTDeviceListener?: true;
    readonly __brand_Component?: true;
    readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true;
}
//  xl9535::XL9535Component
export interface xl9535_XL9535Component {
    readonly __brand_xl9535_XL9535Component?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
}
//  xpt2046::XPT2046Component
export interface xpt2046_XPT2046Component {
    readonly __brand_xpt2046_XPT2046Component?: true;
    readonly __brand_touchscreen_Touchscreen?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_spi_SPIDevice?: true;
}
//  yashima::YashimaClimate
export interface yashima_YashimaClimate {
    readonly __brand_yashima_YashimaClimate?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
}
//  zephyr::CdcAcm
export interface zephyr_CdcAcm {
    readonly __brand_zephyr_CdcAcm?: true;
    readonly __brand_Component?: true;
}
//  zephyr_ble_server::BLEServer
export interface zephyr_ble_server_BLEServer {
    readonly __brand_zephyr_ble_server_BLEServer?: true;
    readonly __brand_Component?: true;
}
//  zephyr_mcumgr::OTAComponent
export interface zephyr_mcumgr_OTAComponent {
    readonly __brand_zephyr_mcumgr_OTAComponent?: true;
    readonly __brand_ota_OTAComponent?: true;
    readonly __brand_Component?: true;
}
//  zhlt01::ZHLT01Climate
export interface zhlt01_ZHLT01Climate {
    readonly __brand_zhlt01_ZHLT01Climate?: true;
    readonly __brand_climate_ir_ClimateIR?: true;
    readonly __brand_climate_Climate?: true;
    readonly __brand_EntityBase?: true;
    readonly __brand_Component?: true;
    readonly __brand_remote_base_RemoteReceiverListener?: true;
    readonly __brand_remote_base_RemoteTransmittable?: true;
}
//  zigbee::ZigbeeBinarySensor
export interface zigbee_ZigbeeBinarySensor {
    readonly __brand_zigbee_ZigbeeBinarySensor?: true;
    readonly __brand_Component?: true;
    readonly __brand_zigbee_ZigbeeComponent?: true;
}
//  zigbee::ZigbeeComponent
export interface zigbee_ZigbeeComponent {
    readonly __brand_zigbee_ZigbeeComponent?: true;
    readonly __brand_Component?: true;
}
//  zigbee::ZigbeeNumber
export interface zigbee_ZigbeeNumber {
    readonly __brand_zigbee_ZigbeeNumber?: true;
    readonly __brand_Component?: true;
    readonly __brand_zigbee_ZigbeeComponent?: true;
}
//  zigbee::ZigbeeSensor
export interface zigbee_ZigbeeSensor {
    readonly __brand_zigbee_ZigbeeSensor?: true;
    readonly __brand_Component?: true;
    readonly __brand_zigbee_ZigbeeComponent?: true;
}
//  zigbee::ZigbeeSwitch
export interface zigbee_ZigbeeSwitch {
    readonly __brand_zigbee_ZigbeeSwitch?: true;
    readonly __brand_Component?: true;
    readonly __brand_zigbee_ZigbeeComponent?: true;
}
//  zigbee::ZigbeeTime
export interface zigbee_ZigbeeTime {
    readonly __brand_zigbee_ZigbeeTime?: true;
    readonly __brand_time_RealTimeClock?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_zigbee_ZigbeeComponent?: true;
}
//  zio_ultrasonic::ZioUltrasonicComponent
export interface zio_ultrasonic_ZioUltrasonicComponent {
    readonly __brand_zio_ultrasonic_ZioUltrasonicComponent?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
    readonly __brand_i2c_I2CDevice?: true;
    readonly __brand_sensor_Sensor?: true;
    readonly __brand_EntityBase?: true;
}
//  zwave_proxy::ZWaveProxy
export interface zwave_proxy_ZWaveProxy {
    readonly __brand_zwave_proxy_ZWaveProxy?: true;
    readonly __brand_Component?: true;
    readonly __brand_uart_UARTDevice?: true;
    readonly __brand_uart_UARTComponent?: true;
}
//  zyaura::ZyAuraSensor
export interface zyaura_ZyAuraSensor {
    readonly __brand_zyaura_ZyAuraSensor?: true;
    readonly __brand_PollingComponent?: true;
    readonly __brand_Component?: true;
}
;
export type A4988 = a4988_A4988;
export type ADC128S102 = adc128s102_ADC128S102;
export type ADE7880 = ade7880_ADE7880;
export type ADS1118 = ads1118_ADS1118;
export type AIC3204 = aic3204_AIC3204;
export type Alpha3 = alpha3_Alpha3;
export type AM2315C = am2315c_AM2315C;
export type Am43 = am43_Am43;
export type Animation = animation_Animation;
export type Anova = anova_Anova;
export type APDS9306 = apds9306_APDS9306;
export type APDS9960 = apds9960_APDS9960;
export type BL0906 = bl0906_BL0906;
export type BL0939 = bl0939_BL0939;
export type BL0940 = bl0940_BL0940;
export type BL0942 = bl0942_BL0942;
export type BM8563 = bm8563_BM8563;
export type BP1658CJ = bp1658cj_BP1658CJ;
export type BP5758D = bp5758d_BP5758D;
export type Button = button_Button;
export type Climate = climate_Climate;
export type Cover = cover_Cover;
export type DFPlayer = dfplayer_DFPlayer;
export type DHT = dht_DHT;
export type Display = display_Display;
export type ES7210 = es7210_ES7210;
export type ES7243E = es7243e_ES7243E;
export type ES8156 = es8156_ES8156;
export type ES8311 = es8311_ES8311;
export type ES8388 = es8388_ES8388;
export type Event = event_Event;
export type Fan = fan_Fan;
export type Font = font_Font;
export type GPS = gps_GPS;
export type Graph = graph_Graph;
export type IAQCore = iaqcore_IAQCore;
export type Image = image_Image;
export type Infrared = infrared_Infrared;
export type Inkplate = inkplate_Inkplate;
export type Kuntze = kuntze_Kuntze;
export type Lc709203f = lc709203f_Lc709203f;
export type LightWaveRF = lightwaverf_LightWaveRF;
export type Lock = lock_Lock;
export type Logger = logger_Logger;
export type MAX6956 = max6956_MAX6956;
export type MCP23008 = mcp23008_MCP23008;
export type MCP23016 = mcp23016_MCP23016;
export type MCP23017 = mcp23017_MCP23017;
export type MCP23S08 = mcp23s08_MCP23S08;
export type MCP23S17 = mcp23s17_MCP23S17;
export type MCP2515 = mcp2515_MCP2515;
export type MCP3008 = mcp3008_MCP3008;
export type MCP3204 = mcp3204_MCP3204;
export type MCP4725 = mcp4725_MCP4725;
export type MCP47A1 = mcp47a1_MCP47A1;
export type MicroNova = micronova_MicroNova;
export type Microphone = microphone_Microphone;
export type Modbus = modbus_Modbus;
export type Nextion = nextion_Nextion;
export type NTC = ntc_NTC;
export type Numeric = number_Number;
export type PCD8544 = pcd8544_PCD8544;
export type Pipsolar = pipsolar_Pipsolar;
export type PN532 = pn532_PN532;
export type PN7150 = pn7150_PN7150;
export type PN7160 = pn7160_PN7160;
export type PZEM004T = pzem004t_PZEM004T;
export type PZEMAC = pzemac_PZEMAC;
export type PZEMDC = pzemdc_PZEMDC;
export type RC522 = rc522_RC522;
export type Rtttl = rtttl_Rtttl;
export type RuuviTag = ruuvitag_RuuviTag;
export type Script = script_Script;
export type Sdl = sdl_Sdl;
export type Select = select_Select;
export type Sensor = sensor_Sensor;
export type Servo = servo_Servo;
export type SM16716 = sm16716_SM16716;
export type SM2135 = sm2135_SM2135;
export type SM2235 = sm2235_SM2235;
export type SM2335 = sm2335_SM2335;
export type Sml = sml_Sml;
export type Speaker = speaker_Speaker;
export type Sprinkler = sprinkler_Sprinkler;
export type ST7701S = st7701s_ST7701S;
export type ST7735 = st7735_ST7735;
export type ST7789V = st7789v_ST7789V;
export type ST7920 = st7920_ST7920;
export type Stepper = stepper_Stepper;
export type Sun = sun_Sun;
export type SX126x = sx126x_SX126x;
export type SX127x = sx127x_SX127x;
export type Syslog = syslog_Syslog;
export type TeleInfo = teleinfo_TeleInfo;
export type Text = text_Text;
export type TinyUSB = tinyusb_TinyUSB;
export type TLC5947 = tlc5947_TLC5947;
export type TLC5971 = tlc5971_TLC5971;
export type Tormatic = tormatic_Tormatic;
export type Touchscreen = touchscreen_Touchscreen;
export type Tuya = tuya_Tuya;
export type ULN2003 = uln2003_ULN2003;
export type Valve = valve_Valve;
export type VBus = vbus_VBus;
export type Whynter = whynter_Whynter;
export type Wiegand = wiegand_Wiegand;
export type Wireguard = wireguard_Wireguard;
