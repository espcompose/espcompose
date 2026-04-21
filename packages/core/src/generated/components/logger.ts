// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_logger_Logger } from "../markers";
export interface LoggerLogsProps {
    "a01nyub.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "a02yyuw.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "a4988.stepper"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ac_dimmer */
    acDimmer?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey adalight_light_effect */
    adalightLightEffect?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "adc.common"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "adc.esp32"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "adc.esp8266"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "adc.libretiny"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "adc.rp2040"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "adc.zephyr"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    adc128s102?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "adc128s102.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey addressable_light.display */
    "addressableLight.display"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ade7880?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ade7953?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ads1115?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "ads1115.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ads1118?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "ads1118.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ags10?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    aht10?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    aic3204?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey airthings_ble */
    airthingsBle?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey airthings_wave_base */
    airthingsWaveBase?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey airthings_wave_mini */
    airthingsWaveMini?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey airthings_wave_plus */
    airthingsWavePlus?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey alarm_control_panel */
    alarmControlPanel?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    alpha3?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    am2315c?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    am2320?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    am43?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey am43_cover */
    am43Cover?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey analog_threshold.binary_sensor */
    "analogThreshold.binarySensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    anova?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    apds9306?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    apds9960?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    api?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "api.connection"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey api.frame_helper */
    "api.frameHelper"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "api.noise"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "api.plaintext"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "api.proto"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "api.service"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    app?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    aqi?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    as3935?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey as3935_i2c */
    as3935I2c?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey as3935_spi */
    as3935Spi?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    as5600?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "as5600.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    as7341?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey async_tcp */
    asyncTcp?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    at581x?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey atc_mithermometer */
    atcMithermometer?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    atm90e26?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    atm90e32?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "atm90e32.button"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey audio_file_media_source */
    audioFileMediaSource?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey audio_reader */
    audioReader?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "audio.decoder"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    automation?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "ax15231.touchscreen"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey b_parasite */
    bParasite?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "ballu.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey bang_bang.climate */
    "bangBang.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey beken_spi_led_strip */
    bekenSpiLedStrip?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "bh1750.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "bh1900nux.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey binary_sensor */
    binarySensor?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey binary_sensor_map */
    binarySensorMap?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey binary_sensor.automation */
    "binarySensor.automation"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "binary.fan"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    bl0906?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    bl0939?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    bl0940?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey bl0940.button.calibration_reset */
    "bl0940.button.calibrationReset"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "bl0940.number"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    bl0942?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ble_binary_output */
    bleBinaryOutput?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ble_client */
    bleClient?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ble_nus */
    bleNus?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ble_presence */
    blePresence?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ble_rssi */
    bleRssi?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ble_rssi_sensor */
    bleRssiSensor?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ble_scanner */
    bleScanner?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ble_sensor */
    bleSensor?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ble_switch */
    bleSwitch?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ble_text_sensor */
    bleTextSensor?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey bluetooth_proxy */
    bluetoothProxy?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey bluetooth_proxy.connection */
    "bluetoothProxy.connection"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    bm8563?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "bme280.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey bme680_bsec.sensor */
    "bme680Bsec.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "bme680.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey bme68x_bsec2_i2c.sensor */
    "bme68xBsec2I2c.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey bme68x_bsec2.sensor */
    "bme68xBsec2.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    bmi160?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "bmp085.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "bmp280.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey bmp3xx_i2c.sensor */
    "bmp3xxI2c.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey bmp3xx_spi.sensor */
    "bmp3xxSpi.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "bmp3xx.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    bmp581?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey bmp581_spi */
    bmp581Spi?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    bp1658cj?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    bp5758d?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey bthome_mithermometer */
    bthomeMithermometer?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    button?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey camera_encoder */
    cameraEncoder?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    canbus?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    cap1188?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey captive_portal */
    captivePortal?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey captive_portal.dns */
    "captivePortal.dns"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    cc1101?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ccs811?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    cd74hc4067?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ch422g?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ch423?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    climate?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey climate_ir */
    climateIr?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey climate.climate_ir_lg */
    "climate.climateIrLg"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey climate.hitachi_ac344 */
    "climate.hitachiAc344"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey climate.hitachi_ac424 */
    "climate.hitachiAc424"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "climate.whynter"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    cm1106?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    combination?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    component?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "coolix.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey copy.binary_sensor */
    "copy.binarySensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "copy.button"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "copy.cover"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "copy.fan"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "copy.lock"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "copy.number"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "copy.select"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "copy.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "copy.switch"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "copy.text"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey copy.text_sensor */
    "copy.textSensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    cover?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    cs5460a?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    cse7761?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    cse7766?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey CST226.binary_sensor */
    "cST226.binarySensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "cst226.touchscreen"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ct_clamp */
    ctClamp?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey current_based.cover */
    "currentBased.cover"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    dac7678?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey daikin_brc.climate */
    "daikinBrc.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "daikin.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "dallas.temp.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey daly_bms */
    dalyBms?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey datetime.date_entity */
    "datetime.dateEntity"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey datetime.datetime_entity */
    "datetime.datetimeEntity"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey datetime.time_entity */
    "datetime.timeEntity"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    debug?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey deep_sleep */
    deepSleep?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey deep_sleep.bk72xx */
    "deepSleep.bk72xx"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "delonghi.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey dew_point.sensor */
    "dewPoint.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    dfplayer?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey dfrobot_sen0395 */
    dfrobotSen0395?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey dfrobot_sen0395.commands */
    "dfrobotSen0395.commands"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    dfu?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    dht?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    dht12?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    display?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey display.pvvx_mithermometer */
    "display.pvvxMithermometer"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "display.tm1637"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "display.tm1638"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    dps310?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ds1307?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "ds2484.onewire"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    dsmr?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey duty_cycle */
    dutyCycle?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey duty_time_sensor */
    dutyTimeSensor?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    e131?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey e131_addressable_light_effect */
    e131AddressableLightEffect?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ee895?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ektf2232?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey EMC2101 */
    eMC2101?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey EMC2101.sensor */
    "eMC2101.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "emmeti.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    emontx?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey emontx_sensor */
    emontxSensor?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "endstop.cover"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ens160?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ens160_i2c.sensor */
    "ens160I2c.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ens160_spi.sensor */
    "ens160Spi.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ens210?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey entity_base */
    entityBase?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey epaper_spi */
    epaperSpi?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey epaper_spi.waveshare */
    "epaperSpi.waveshare"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    es7210?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    es7243e?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    es8156?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    es8311?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    es8388?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey esp_ldo */
    espLdo?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    esp32?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey esp32_ble */
    esp32Ble?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey esp32_ble_beacon */
    esp32BleBeacon?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey esp32_ble_client */
    esp32BleClient?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey esp32_ble_server */
    esp32BleServer?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey esp32_ble_server.characteristic */
    "esp32BleServer.characteristic"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey esp32_ble_server.descriptor */
    "esp32BleServer.descriptor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey esp32_ble_server.service */
    "esp32BleServer.service"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey esp32_ble_tracker */
    esp32BleTracker?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey esp32_ble.advertising */
    "esp32Ble.advertising"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey esp32_camera */
    esp32Camera?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey esp32_camera_web_server */
    esp32CameraWebServer?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey esp32_can */
    esp32Can?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey esp32_dac */
    esp32Dac?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey esp32_hosted.update */
    "esp32Hosted.update"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey esp32_improv.component */
    "esp32Improv.component"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey esp32_rmt_led_strip */
    esp32RmtLedStrip?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey esp32_touch */
    esp32Touch?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "esp32.crash"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    esp8266?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey esp8266_pwm */
    esp8266Pwm?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "esphome.ota"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "espnow.transport"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ethernet?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ethernet_info */
    ethernetInfo?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    event?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey exposure_notifications */
    exposureNotifications?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ezo-pmp */
    ezoPmp?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey factory_reset */
    factoryReset?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey factory_reset.button */
    "factoryReset.button"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey factory_reset.switch */
    "factoryReset.switch"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    fan?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "fan.hbridge"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    fastled?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "feedback.cover"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey fingerprint_grow */
    fingerprintGrow?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    font?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    fs3000?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "ft5x06.touchscreen"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey FT63X6 */
    fT63X6?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey fujitsu_general.climate */
    "fujitsuGeneral.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    gcja5?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    gdk101?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey gl_r01_i2c */
    glR01I2c?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    gp2y1010au0f?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    gp8403?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "gp8403.output"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey gpio.binary_sensor */
    "gpio.binarySensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey gpio.one_wire */
    "gpio.oneWire"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "gpio.output"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    gps?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "gps.time"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    graph?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey graphical_display_menu */
    graphicalDisplayMenu?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "gree.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "gree.switch"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey grove_gas_mc_v2 */
    groveGasMcV2?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey GroveMotorDriveTB6612FNG */
    groveMotorDriveTB6612FNG?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey growatt_solar */
    growattSolar?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey GT911.binary_sensor */
    "gT911.binarySensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "gt911.touchscreen"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "haier.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey havells_solar */
    havellsSolar?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    hc8?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    hdc1080?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    hdc2010?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    hdc2080?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "hdc302x.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "he60r.cover"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "heatpumpir.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "helpers.host"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey hlk_fm22x */
    hlkFm22x?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    hlw8012?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    hlw8032?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "hm3301.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    hmc5883l?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey homeassistant.binary_sensor */
    "homeassistant.binarySensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "homeassistant.number"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "homeassistant.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "homeassistant.switch"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey homeassistant.text_sensor */
    "homeassistant.textSensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "homeassistant.time"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey honeywell_hih.i2c */
    "honeywellHih.i2c"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    honeywellabp?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    honeywellabp2?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    host?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "hrxl.maxsonar.wr.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    hte501?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey http_request */
    httpRequest?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey http_request.arduino */
    "httpRequest.arduino"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey http_request.host */
    "httpRequest.host"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey http_request.idf */
    "httpRequest.idf"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey http_request.ota */
    "httpRequest.ota"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey http_request.update */
    "httpRequest.update"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey http_request.watchdog */
    "httpRequest.watchdog"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    htu21d?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    htu31d?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    hub75?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey hw_timer_esp_idf */
    hwTimerEspIdf?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    hx711?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey hydreon_rgxx.sensor */
    "hydreonRgxx.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    hyt271?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    i2c?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey i2c_device */
    i2cDevice?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "i2c.arduino"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "i2c.idf"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "i2c.zephyr"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey i2s_audio.microphone */
    "i2sAudio.microphone"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey i2s_audio.speaker */
    "i2sAudio.speaker"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    iaqcore?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey image_decoder */
    imageDecoder?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey image_decoder.bmp */
    "imageDecoder.bmp"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey image_decoder.jpeg */
    "imageDecoder.jpeg"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey image_decoder.png */
    "imageDecoder.png"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey improv_serial */
    improvSerial?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ina219?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ina226?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ina260?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ina2xx?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ina2xx_i2c */
    ina2xxI2c?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ina2xx_spi */
    ina2xxSpi?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ina3221?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    infrared?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey inkbird_ibsth1_mini */
    inkbirdIbsth1Mini?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    inkplate?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    integration?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey internal_temperature */
    internalTemperature?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey internal_temperature.bk72xx */
    "internalTemperature.bk72xx"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey internal_temperature.esp32 */
    "internalTemperature.esp32"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey internal_temperature.rp2040 */
    "internalTemperature.rp2040"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey internal_temperature.zephyr */
    "internalTemperature.zephyr"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ir_rf_proxy */
    irRfProxy?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey jsn_sr04t.sensor */
    "jsnSr04t.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    json?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey kamstrup_kmp */
    kamstrupKmp?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey key_collector */
    keyCollector?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "kmeteriso.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    kuntze?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "lc709203f.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    lcd?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey lcd_gpio */
    lcdGpio?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey lcd_menu */
    lcdMenu?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey lcd_pcf8574 */
    lcdPcf8574?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ld2410?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ld2412?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ld2420?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ld2420.binary_sensor */
    "ld2420.binarySensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "ld2420.button"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "ld2420.number"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "ld2420.select"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "ld2420.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ld2420.text_sensor */
    "ld2420.textSensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ld2450?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "ledc.output"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "libretiny.pwm"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    light?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "light.addressable"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "light.automation"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "lightwaverf.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey lilygo_t5_47.touchscreen */
    "lilygoT547.touchscreen"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    lm75b?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    lock?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    logger?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "lt.component"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "lt.gpio"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ltr_als_ps */
    ltrAlsPs?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ltr390?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ltr501?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    lvgl?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey m5stack_8angle */
    m5stack8angle?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey m5stack_8angle.light */
    "m5stack8angle.light"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey matrix_keypad */
    matrixKeypad?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    max17043?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    max31855?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    max31856?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    max31865?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "max44009.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    max6675?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    max6956?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey max6956_led_channel */
    max6956LedChannel?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    max7219?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    max7219DIGIT?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    max9611?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mcp23008?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mcp23016?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mcp23017?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mcp23s08?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mcp23s17?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey mcp23x08_base */
    mcp23x08Base?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey mcp23x17_base */
    mcp23x17Base?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mcp2515?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mcp3008?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "mcp3008.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mcp3204?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "mcp3204.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mcp3221?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mcp4461?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "mcp4461.output"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mcp4725?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mcp4728?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mcp47a1?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mcp9600?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mcp9808?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mdns?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey media_player */
    mediaPlayer?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mhz19?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey micro_wake_word */
    microWakeWord?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    micronova?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "micronova.button"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "micronova.number"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "micronova.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "micronova.switch"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey micronova.text_sensor */
    "micronova.textSensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey mics_4514 */
    mics4514?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey midea_ir.climate */
    "mideaIr.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey mitsubishi_cn105.climate */
    "mitsubishiCn105.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey mitsubishi_cn105.driver */
    "mitsubishiCn105.driver"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "mitsubishi.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mlx90393?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mlx90614?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mmc5603?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mmc5983?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    modbus?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey modbus_controller */
    modbusController?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey modbus_controller.binary_sensor */
    "modbusController.binarySensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey modbus_controller.output */
    "modbusController.output"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey modbus_controller.select */
    "modbusController.select"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey modbus_controller.sensor */
    "modbusController.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey modbus_controller.switch */
    "modbusController.switch"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey modbus_controller.text_sensor */
    "modbusController.textSensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey modbus_helpers */
    modbusHelpers?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "modbus.number"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey mopeka_ble */
    mopekaBle?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey mopeka_pro_check */
    mopekaProCheck?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey mopeka_std_check */
    mopekaStdCheck?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mpl3115a2?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mpr121?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mpu6050?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mpu6886?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    mqtt?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey mqtt_subscribe.sensor */
    "mqttSubscribe.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey mqtt_subscribe.text_sensor */
    "mqttSubscribe.textSensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey mqtt.alarm_control_panel */
    "mqtt.alarmControlPanel"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey mqtt.binary_sensor */
    "mqtt.binarySensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "mqtt.button"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "mqtt.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "mqtt.component"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "mqtt.cover"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "mqtt.custom"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "mqtt.datetime"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "mqtt.datetime.datetime"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "mqtt.datetime.time"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "mqtt.event"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "mqtt.fan"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "mqtt.idf"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "mqtt.light"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "mqtt.lock"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "mqtt.number"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "mqtt.select"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "mqtt.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "mqtt.switch"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "mqtt.text"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey mqtt.text_sensor */
    "mqtt.textSensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "mqtt.update"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "mqtt.valve"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ms5611?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ms8607?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    msa3xx?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    multipart?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "my9231.output"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    nau7802?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey NciMessage */
    nciMessage?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    nextion?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey nextion_binarysensor */
    nextionBinarysensor?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey nextion_sensor */
    nextionSensor?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey nextion_switch */
    nextionSwitch?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey nextion_textsensor */
    nextionTextsensor?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "nextion.upload"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "nextion.upload.arduino"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "nextion.upload.esp32"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    nfc?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey nfc.binary_sensor */
    "nfc.binarySensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "nfc.helpers"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey nfc.ndef_message */
    "nfc.ndefMessage"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey nfc.ndef_record */
    "nfc.ndefRecord"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey nfc.ndef_record_text */
    "nfc.ndefRecordText"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey nfc.ndef_record_uri */
    "nfc.ndefRecordUri"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "nfc.tag"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "noblex.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    npi19?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ntc?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    number?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "number.automation"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "number.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey one_wire */
    oneWire?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey online_image */
    onlineImage?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey online_image.download_buffer */
    "onlineImage.downloadBuffer"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    opentherm?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "opentherm.number"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "opentherm.output"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "opentherm.switch"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    openthread?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey openthread_info */
    openthreadInfo?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "opt3001.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ota.arduino_libretiny */
    "ota.arduinoLibretiny"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ota.arduino_rp2040 */
    "ota.arduinoRp2040"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "ota.esp8266"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "ota.idf"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "output.automation"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "output.button"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "output.float"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "output.lock"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey output.sigma_delta */
    "output.sigmaDelta"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey output.slow_pwm */
    "output.slowPwm"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "output.switch"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey packet_transport */
    packetTransport?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "partition.light"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    pca6416a?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    pca9554?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    pca9685?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey pcd_8544 */
    pcd8544?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    pcf85063?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey PCF8563 */
    pCF8563?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    pcf8574?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    pi4ioe5v6408?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "pid.autotune"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "pid.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "pid.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    pipsolar?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "pipsolar.output"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "pipsolar.switch"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    pm1006?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    pm2005?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    pmsa003i?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    pmsx003?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    pmwcs3?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    pn532?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey pn532_i2c */
    pn532I2c?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey pn532_spi */
    pn532Spi?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey pn532.mifare_classic */
    "pn532.mifareClassic"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey pn532.mifare_ultralight */
    "pn532.mifareUltralight"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    pn7150?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey pn7150_i2c */
    pn7150I2c?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey pn7150.mifare_classic */
    "pn7150.mifareClassic"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey pn7150.mifare_ultralight */
    "pn7150.mifareUltralight"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    pn7160?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey pn7160_i2c */
    pn7160I2c?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey pn7160_spi */
    pn7160Spi?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey pn7160.mifare_classic */
    "pn7160.mifareClassic"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey pn7160.mifare_ultralight */
    "pn7160.mifareUltralight"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey power_supply */
    powerSupply?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    preferences?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    psram?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey pulse_counter */
    pulseCounter?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey pulse_meter */
    pulseMeter?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey pulse_width */
    pulseWidth?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey pvvx_mithermometer */
    pvvxMithermometer?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    pylontech?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "pylontech.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "pylontech.textsensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    pzem004t?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    pzemac?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    pzemdc?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    qmc5883l?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    qmp6988?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey qr_code */
    qrCode?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey qwiic_pir */
    qwiicPir?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey radon_eye_ble */
    radonEyeBle?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey radon_eye_rd200 */
    radonEyeRd200?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    rc522?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey rc522_i2c */
    rc522I2c?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey rc522_spi */
    rc522Spi?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    rd03d?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    rdm6300?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey remote_base */
    remoteBase?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey remote_receiver */
    remoteReceiver?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey remote_receiver.esp32 */
    "remoteReceiver.esp32"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey remote_transmitter */
    remoteTransmitter?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.abbwelcome"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.aeha"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.beo4"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.brennenstuhl"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.byronsx"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.coolix"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.dish"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.dooya"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.drayton"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.dyson"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.gobox"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.haier"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.jvc"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.keeloq"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.lg"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.magiquest"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.midea"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.mirage"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.nec"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.nexa"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.panasonic"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.pioneer"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.pronto"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.raw"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey remote.rc_switch */
    "remote.rcSwitch"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.rc5"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.roomba"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.samsung"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.samsung36"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.sony"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.symphony"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.toshibaac"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "remote.toto"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey resampler_speaker */
    resamplerSpeaker?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    resistance?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    restart?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "restart.button"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey rf_bridge */
    rfBridge?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey rotary_encoder */
    rotaryEncoder?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    rp2040?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey rp2040_ble */
    rp2040Ble?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey rp2040_pwm */
    rp2040Pwm?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "rp2040.crash"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    rtttl?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey runtime_image */
    runtimeImage?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ruuvi_ble */
    ruuviBle?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ruuvitag?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    rx8130?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey safe_mode */
    safeMode?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey safe_mode.button */
    "safeMode.button"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey safe_mode.switch */
    "safeMode.switch"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    scd30?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    scd4x?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    scheduler?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    script?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey sdm_meter */
    sdmMeter?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "sdp3x.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sds011?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey seeed_mr24hpc1 */
    seeedMr24hpc1?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey seeed_mr60bha2 */
    seeedMr60bha2?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey seeed_mr60fda2 */
    seeedMr60fda2?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey selec_meter */
    selecMeter?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    select?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey sen0321_sensor.sensor */
    "sen0321Sensor.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey sen21231_sensor.sensor */
    "sen21231Sensor.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sen5x?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sen6x?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    senseair?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey sensirion_i2c */
    sensirionI2c?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sensor?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "sensor.automation"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "sensor.filter"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey serial_proxy */
    serialProxy?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    servo?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sfa30?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sgp30?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sgp4x?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sht3xd?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sht4x?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    shtcx?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "shutdown.button"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "shutdown.switch"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sim800l?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey sm10bit_base */
    sm10bitBase?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sm16716?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sm2135?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sm2235?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sm2335?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sm300d2?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sml?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey sml_sensor */
    smlSensor?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey sml_text_sensor */
    smlTextSensor?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    smt100?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sn74hc165?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sn74hc595?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sntp?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "socket.lwip"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey sonoff_d1 */
    sonoffD1?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey sound_level */
    soundLevel?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    spa06?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey spa06_i2c */
    spa06I2c?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey spa06_spi */
    spa06Spi?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey speaker_media_player */
    speakerMediaPlayer?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey speaker_media_player.pipeline */
    "speakerMediaPlayer.pipeline"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey speaker_mixer */
    speakerMixer?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey speaker_source_media_player */
    speakerSourceMediaPlayer?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "speed.fan"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey spi_device */
    spiDevice?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey spi-esp-arduino */
    spiEspArduino?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey spi-esp-idf */
    spiEspIdf?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sprinkler?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sps30?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ssd1306?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ssd1306_i2c */
    ssd1306I2c?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ssd1306_spi */
    ssd1306Spi?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ssd1322?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ssd1322_spi */
    ssd1322Spi?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ssd1325?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ssd1325_spi */
    ssd1325Spi?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ssd1327?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ssd1327_i2c */
    ssd1327I2c?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ssd1327_spi */
    ssd1327Spi?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ssd1331?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ssd1331_spi */
    ssd1331Spi?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    ssd1351?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ssd1351_spi */
    ssd1351Spi?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    st7567?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey st7567_i2c */
    st7567I2c?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey st7567_spi */
    st7567Spi?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    st7735?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    st7789v?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    st7920?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    statsD?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    status?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey status_led */
    statusLed?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    stepper?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sts3x?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    stts22h?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sun?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey sun_gtil2 */
    sunGtil2?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "sun.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey sun.text_sensor */
    "sun.textSensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    switch?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "switch.automation"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey switch.binary_sensor */
    "switch.binarySensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "switch.gpio"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "switch.hbridge"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sx126x?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey sx126x_transport */
    sx126xTransport?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sx127x?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey sx127x_transport */
    sx127xTransport?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sx1509?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey sx1509_float_channel */
    sx1509FloatChannel?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey sx1509_gpio_pin */
    sx1509GpioPin?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    sy6970?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    t6615?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    tc74?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    tca9548a?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    tca9555?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "tcl112.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    tcs34725?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    tee501?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    teleinfo?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey teleinfo_sensor */
    teleinfoSensor?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey teleinfo_text_sensor */
    teleinfoTextSensor?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    tem3200?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey template.alarm_control_panel */
    "template.alarmControlPanel"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey template.binary_sensor */
    "template.binarySensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "template.cover"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "template.date"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "template.datetime"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "template.fan"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "template.lock"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "template.number"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "template.select"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "template.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "template.switch"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "template.text"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey template.text_sensor */
    "template.textSensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "template.time"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "template.valve"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey template.water_heater */
    "template.waterHeater"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    text?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey text_sensor */
    textSensor?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey text_sensor.filter */
    "textSensor.filter"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey text.text_sensor */
    "text.textSensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey thermopro_ble */
    thermoproBle?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "thermostat.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    time?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey time_based.cover */
    "timeBased.cover"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    tlc59208f?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    tlc5947?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    tlc5971?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    tm1621?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "tm1638.led"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "tm1651.display"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    tmp102?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    tmp1075?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    tmp117?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    tof10120?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "tormatic.cover"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "toshiba.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey total_daily_energy */
    totalDailyEnergy?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    touchscreen?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    tsl2561?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "tsl2591.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    tt21100?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey tt21100.binary_sensor */
    "tt21100.binarySensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ttp229_bsf */
    ttp229Bsf?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ttp229_lsf */
    ttp229Lsf?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    tuya?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "tuya.automation"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey tuya.binary_sensor */
    "tuya.binarySensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "tuya.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "tuya.cover"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "tuya.fan"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "tuya.light"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "tuya.number"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "tuya.select"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "tuya.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "tuya.switch"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey tuya.text_sensor */
    "tuya.textSensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    tx20?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    uart?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey uart_debug */
    uartDebug?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey uart_transport */
    uartTransport?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey uart.arduino_esp8266 */
    "uart.arduinoEsp8266"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey uart.arduino_rp2040 */
    "uart.arduinoRp2040"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "uart.button"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "uart.event"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "uart.host"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "uart.idf"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "uart.lt"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "uart.switch"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    udp?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey udp_transport */
    udpTransport?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ufire_ec */
    ufireEc?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey ufire_ise */
    ufireIse?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "uln2003.stepper"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "ultrasonic.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    update?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey uponor_smatrix */
    uponorSmatrix?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey uponor_smatrix.climate */
    "uponorSmatrix.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey uponor_smatrix.sensor */
    "uponorSmatrix.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "uptime.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey usb_cdc_acm */
    usbCdcAcm?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    valve?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    vbus?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey vbus.binary_sensor */
    "vbus.binarySensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "vbus.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "veml3235.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    veml7700?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey version.text_sensor */
    "version.textSensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    vl53l0x?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey voice_assistant */
    voiceAssistant?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey wake_on_lan.button */
    "wakeOnLan.button"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey water_heater */
    waterHeater?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey waveshare_2.13v3 */
    "waveshare2.13v3"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey waveshare_epaper */
    waveshareEpaper?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey web_server */
    webServer?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey web_server_idf */
    webServerIdf?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey web_server.ota */
    "webServer.ota"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    weikai?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey weikai_i2c */
    weikaiI2c?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey weikai_spi */
    weikaiSpi?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "whirlpool.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    wiegand?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    wifi?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey wifi_esp32 */
    wifiEsp32?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey wifi_esp8266 */
    wifiEsp8266?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey wifi_info */
    wifiInfo?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey wifi_lt */
    wifiLt?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey wifi_pico_w */
    wifiPicoW?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey wifi_signal.sensor */
    "wifiSignal.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    wireguard?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey wl_134.sensor */
    "wl134.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey wled_light_effect */
    wledLightEffect?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    wts01?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "x9c.output"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "xgzp68xx.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey xiaomi_ble */
    xiaomiBle?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey xiaomi_cgd1 */
    xiaomiCgd1?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey xiaomi_cgdk2 */
    xiaomiCgdk2?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey xiaomi_cgg1 */
    xiaomiCgg1?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey xiaomi_cgpr1 */
    xiaomiCgpr1?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey xiaomi_gcls002 */
    xiaomiGcls002?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey xiaomi_hhccjcy01 */
    xiaomiHhccjcy01?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey xiaomi_hhccjcy10 */
    xiaomiHhccjcy10?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey xiaomi_hhccpot002 */
    xiaomiHhccpot002?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey xiaomi_jqjcy01ym */
    xiaomiJqjcy01ym?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey xiaomi_lywsd02 */
    xiaomiLywsd02?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey xiaomi_lywsd02mmc */
    xiaomiLywsd02mmc?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey xiaomi_lywsd03mmc */
    xiaomiLywsd03mmc?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey xiaomi_lywsdcgq */
    xiaomiLywsdcgq?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey xiaomi_mhoc303 */
    xiaomiMhoc303?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey xiaomi_mhoc401 */
    xiaomiMhoc401?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey xiaomi_miscale */
    xiaomiMiscale?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey xiaomi_mjyd02yla */
    xiaomiMjyd02yla?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey xiaomi_mue4094rt */
    xiaomiMue4094rt?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey xiaomi_rtcgq02lm */
    xiaomiRtcgq02lm?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey xiaomi_wx08zm */
    xiaomiWx08zm?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey xiaomi_xmwsdj04mmc */
    xiaomiXmwsdj04mmc?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    xl9535?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    xpt2046?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "yashima.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    zephyr?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey zephyr_ble_server */
    zephyrBleServer?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey zephyr_mcumgr */
    zephyrMcumgr?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "zhlt01.climate"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    zigbee?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey zigbee_on_off.switch */
    "zigbeeOnOff.switch"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey zigbee.binary_sensor */
    "zigbee.binarySensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "zigbee.number"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "zigbee.sensor"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    "zigbee.time"?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey zio_ultrasonic */
    zioUltrasonic?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** @yamlKey zwave_proxy */
    zwaveProxy?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    zyaura?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
}
export interface LoggerProps extends _CoreComponent {
    /**
     * int: The baud rate to use for the serial
     * @yamlKey baud_rate
     */
    baudRate?: number;
    /**
     * boolean: Causes ESPHome to sequentially drive DTR and RTS false after opening
     * @yamlKey deassert_rts_dtr
     */
    deassertRtsDtr?: boolean;
    /**
     * boolean: Displays early debug information, such as the boot reason.
     * @yamlKey early_message
     */
    earlyMessage?: boolean;
    /**
     * boolean: If set to false, disables storing
     * @yamlKey esp8266_store_log_strings_in_flash
     */
    esp8266StoreLogStringsInFlash?: boolean;
    /**
     * string: The Hardware UART to use for logging. The default varies depending on
     * @yamlKey hardware_uart
     */
    hardwareUart?: string;
    /**
     * string: The initial log level, which may be varied at run time. Defaults to the same value as `level`.
     * @yamlKey initial_level
     */
    initialLevel?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** string: The global log level. Any log message */
    level?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    /** mapping: Manually set the log level for a */
    logs?: LoggerLogsProps;
    /**
     * [Automation](https://esphome.io/automations): An action to be
     * @yamlKey on_message
     */
    onMessage?: TriggerHandler;
    /**
     * boolean: Enable runtime per-tag log level changes. This is automatically enabled
     * @yamlKey runtime_tag_levels
     */
    runtimeTagLevels?: boolean;
    /**
     * int: ESP32, LibreTiny and nRF52 only: The size of the internal thread-safe ring buffer for task log messages.
     * @yamlKey task_log_buffer_size
     */
    taskLogBufferSize?: number;
    /**
     * int: The size of the buffer used
     * @yamlKey tx_buffer_size
     */
    txBufferSize?: number;
    /**
     * boolean: Waits for the CDC port before starting setup (10-second timeout).
     * @yamlKey wait_for_cdc
     */
    waitForCdc?: boolean;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            logger: LoggerProps & ComponentProps<__marker_logger_Logger>;
        }
    }
}
