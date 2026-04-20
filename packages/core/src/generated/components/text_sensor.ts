// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _BleClient, _CoreComponent, _CoreEntityBase, _CoreMqttComponent, _HomeassistantHomeAssistantImport, _ModbusControllerModbusitembaseschema, _Msa3xxMsaSensor, _PipsolarComponent, _PylontechComponent, _TeleinfoListener, _UartDevice } from "../bases";
import type { __marker_Color, __marker_Device, __marker_EntityBase, __marker_atm90e32_ATM90E32Component, __marker_ble_client_BLETextSensor, __marker_ble_scanner_BLEScanner, __marker_bme680_bsec_BME680BSECComponent, __marker_bme68x_bsec2_BME68xBSEC2Component, __marker_copy_CopyTextSensor, __marker_daly_bms_DalyBmsComponent, __marker_debug_DebugComponent, __marker_dlms_meter_DlmsMeterComponent, __marker_esp32_ble_tracker_ESP32BLETracker, __marker_esphome_dsmr_Dsmr, __marker_ezo_pmp_EzoPMP, __marker_gdk101_GDK101Component, __marker_haier_HonClimate, __marker_hlk_fm22x_HlkFm22xComponent, __marker_homeassistant_HomeassistantTextSensor, __marker_key_collector_KeyCollector, __marker_ld2410_LD2410Component, __marker_ld2412_LD2412Component, __marker_ld2420_LD2420Component, __marker_ld2420_LD2420TextSensor, __marker_ld2450_LD2450Component, __marker_libretiny_LTComponent, __marker_micronova_MicroNova, __marker_modbus_controller_ModbusTextSensor, __marker_mqtt_MQTTClientComponent, __marker_mqtt_subscribe_MQTTSubscribeTextSensor, __marker_nextion_Nextion, __marker_nextion_NextionTextSensor, __marker_pylontech_PylontechTextSensor, __marker_seeed_mr24hpc1_MR24HPC1Component, __marker_sml_Sml, __marker_sml_SmlTextSensor, __marker_sun_Sun, __marker_sun_SunTextSensor, __marker_sun_gtil2_SunGTIL2, __marker_sy6970_SY6970Component, __marker_teleinfo_TeleInfoTextSensor, __marker_template__TemplateTextSensor, __marker_text_Text, __marker_text_TextTextSensor, __marker_text_sensor_TextSensor, __marker_tuya_Tuya, __marker_tuya_TuyaTextSensor, __marker_uptime_UptimeTextSensor, __marker_version_VersionTextSensor, __marker_web_server_WebServer, __marker_wireguard_Wireguard, __marker_wl_134_Wl134Component } from "../markers";
interface TextSensorWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Atm90e32FrequencyStatusPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Atm90e32FrequencyStatusPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Atm90e32FrequencyStatusProps {
    availability?: Atm90e32FrequencyStatusPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Atm90e32FrequencyStatusPropsWebServerProps;
}
interface Atm90e32PhaseStatusPropsPhaseAPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Atm90e32PhaseStatusPropsPhaseAPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Atm90e32PhaseStatusPropsPhaseAProps {
    availability?: Atm90e32PhaseStatusPropsPhaseAPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Atm90e32PhaseStatusPropsPhaseAPropsWebServerProps;
}
interface Atm90e32PhaseStatusPropsPhaseBPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Atm90e32PhaseStatusPropsPhaseBPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Atm90e32PhaseStatusPropsPhaseBProps {
    availability?: Atm90e32PhaseStatusPropsPhaseBPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Atm90e32PhaseStatusPropsPhaseBPropsWebServerProps;
}
interface Atm90e32PhaseStatusPropsPhaseCPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Atm90e32PhaseStatusPropsPhaseCPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Atm90e32PhaseStatusPropsPhaseCProps {
    availability?: Atm90e32PhaseStatusPropsPhaseCPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Atm90e32PhaseStatusPropsPhaseCPropsWebServerProps;
}
interface Atm90e32PhaseStatusProps {
    /**
     * Phase A status field. All options from [Text Sensor](https://esphome.io/components/text_sensor#config-text_sensor). W...
     * @yamlKey phase_a
     */
    phaseA?: Atm90e32PhaseStatusPropsPhaseAProps;
    /**
     * Phase B phase status field. Same options as Phase A
     * @yamlKey phase_b
     */
    phaseB?: Atm90e32PhaseStatusPropsPhaseBProps;
    /**
     * Phase C phase status field. Same options as Phase A
     * @yamlKey phase_c
     */
    phaseC?: Atm90e32PhaseStatusPropsPhaseCProps;
}
interface Bme680BsecIaqAccuracyPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Bme680BsecIaqAccuracyPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Bme680BsecIaqAccuracyProps {
    availability?: Bme680BsecIaqAccuracyPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Bme680BsecIaqAccuracyPropsWebServerProps;
}
interface Bme68xBsec2IaqAccuracyPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Bme68xBsec2IaqAccuracyPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Bme68xBsec2IaqAccuracyProps {
    availability?: Bme68xBsec2IaqAccuracyPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Bme68xBsec2IaqAccuracyPropsWebServerProps;
}
interface DalyBmsStatusPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DalyBmsStatusPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DalyBmsStatusProps {
    availability?: DalyBmsStatusPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DalyBmsStatusPropsWebServerProps;
}
interface DebugDevicePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DebugDevicePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DebugDeviceProps {
    availability?: DebugDevicePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DebugDevicePropsWebServerProps;
}
interface DebugResetReasonPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DebugResetReasonPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DebugResetReasonProps {
    availability?: DebugResetReasonPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DebugResetReasonPropsWebServerProps;
}
interface DlmsMeterMeternumberPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DlmsMeterMeternumberPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DlmsMeterMeternumberProps {
    availability?: DlmsMeterMeternumberPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DlmsMeterMeternumberPropsWebServerProps;
}
interface DlmsMeterTimestampPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DlmsMeterTimestampPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DlmsMeterTimestampProps {
    availability?: DlmsMeterTimestampPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DlmsMeterTimestampPropsWebServerProps;
}
interface DsmrElectricityFailureLogPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DsmrElectricityFailureLogPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DsmrElectricityFailureLogProps {
    availability?: DsmrElectricityFailureLogPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DsmrElectricityFailureLogPropsWebServerProps;
}
interface DsmrElectricityTariffPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DsmrElectricityTariffPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DsmrElectricityTariffProps {
    availability?: DsmrElectricityTariffPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DsmrElectricityTariffPropsWebServerProps;
}
interface DsmrEquipmentIdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DsmrEquipmentIdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DsmrEquipmentIdProps {
    availability?: DsmrEquipmentIdPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DsmrEquipmentIdPropsWebServerProps;
}
interface DsmrFwCoreChecksumPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DsmrFwCoreChecksumPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DsmrFwCoreChecksumProps {
    availability?: DsmrFwCoreChecksumPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DsmrFwCoreChecksumPropsWebServerProps;
}
interface DsmrFwCoreVersionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DsmrFwCoreVersionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DsmrFwCoreVersionProps {
    availability?: DsmrFwCoreVersionPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DsmrFwCoreVersionPropsWebServerProps;
}
interface DsmrFwModuleChecksumPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DsmrFwModuleChecksumPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DsmrFwModuleChecksumProps {
    availability?: DsmrFwModuleChecksumPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DsmrFwModuleChecksumPropsWebServerProps;
}
interface DsmrFwModuleVersionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DsmrFwModuleVersionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DsmrFwModuleVersionProps {
    availability?: DsmrFwModuleVersionPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DsmrFwModuleVersionPropsWebServerProps;
}
interface DsmrGasDeliveredTextPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DsmrGasDeliveredTextPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DsmrGasDeliveredTextProps {
    availability?: DsmrGasDeliveredTextPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DsmrGasDeliveredTextPropsWebServerProps;
}
interface DsmrGasEquipmentIdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DsmrGasEquipmentIdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DsmrGasEquipmentIdProps {
    availability?: DsmrGasEquipmentIdPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DsmrGasEquipmentIdPropsWebServerProps;
}
interface DsmrGasEquipmentIdBePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DsmrGasEquipmentIdBePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DsmrGasEquipmentIdBeProps {
    availability?: DsmrGasEquipmentIdBePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DsmrGasEquipmentIdBePropsWebServerProps;
}
interface DsmrIdentificationPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DsmrIdentificationPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DsmrIdentificationProps {
    availability?: DsmrIdentificationPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DsmrIdentificationPropsWebServerProps;
}
interface DsmrMessageLongPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DsmrMessageLongPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DsmrMessageLongProps {
    availability?: DsmrMessageLongPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DsmrMessageLongPropsWebServerProps;
}
interface DsmrMessageShortPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DsmrMessageShortPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DsmrMessageShortProps {
    availability?: DsmrMessageShortPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DsmrMessageShortPropsWebServerProps;
}
interface DsmrP1VersionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DsmrP1VersionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DsmrP1VersionProps {
    availability?: DsmrP1VersionPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DsmrP1VersionPropsWebServerProps;
}
interface DsmrP1VersionBePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DsmrP1VersionBePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DsmrP1VersionBeProps {
    availability?: DsmrP1VersionBePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DsmrP1VersionBePropsWebServerProps;
}
interface DsmrSubEquipmentIdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DsmrSubEquipmentIdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DsmrSubEquipmentIdProps {
    availability?: DsmrSubEquipmentIdPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DsmrSubEquipmentIdPropsWebServerProps;
}
interface DsmrTelegramPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DsmrTelegramPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DsmrTelegramProps {
    availability?: DsmrTelegramPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DsmrTelegramPropsWebServerProps;
}
interface DsmrThermalEquipmentIdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DsmrThermalEquipmentIdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DsmrThermalEquipmentIdProps {
    availability?: DsmrThermalEquipmentIdPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DsmrThermalEquipmentIdPropsWebServerProps;
}
interface DsmrTimestampPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DsmrTimestampPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DsmrTimestampProps {
    availability?: DsmrTimestampPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DsmrTimestampPropsWebServerProps;
}
interface DsmrWaterEquipmentIdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DsmrWaterEquipmentIdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DsmrWaterEquipmentIdProps {
    availability?: DsmrWaterEquipmentIdPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: DsmrWaterEquipmentIdPropsWebServerProps;
}
interface EthernetInfoDnsAddressPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface EthernetInfoDnsAddressPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface EthernetInfoDnsAddressProps {
    availability?: EthernetInfoDnsAddressPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: EthernetInfoDnsAddressPropsWebServerProps;
}
interface EthernetInfoIpAddressPropsAddress0PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface EthernetInfoIpAddressPropsAddress0PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface EthernetInfoIpAddressPropsAddress0Props {
    availability?: EthernetInfoIpAddressPropsAddress0PropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: EthernetInfoIpAddressPropsAddress0PropsWebServerProps;
}
interface EthernetInfoIpAddressPropsAddress1PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface EthernetInfoIpAddressPropsAddress1PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface EthernetInfoIpAddressPropsAddress1Props {
    availability?: EthernetInfoIpAddressPropsAddress1PropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: EthernetInfoIpAddressPropsAddress1PropsWebServerProps;
}
interface EthernetInfoIpAddressPropsAddress2PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface EthernetInfoIpAddressPropsAddress2PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface EthernetInfoIpAddressPropsAddress2Props {
    availability?: EthernetInfoIpAddressPropsAddress2PropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: EthernetInfoIpAddressPropsAddress2PropsWebServerProps;
}
interface EthernetInfoIpAddressPropsAddress3PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface EthernetInfoIpAddressPropsAddress3PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface EthernetInfoIpAddressPropsAddress3Props {
    availability?: EthernetInfoIpAddressPropsAddress3PropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: EthernetInfoIpAddressPropsAddress3PropsWebServerProps;
}
interface EthernetInfoIpAddressPropsAddress4PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface EthernetInfoIpAddressPropsAddress4PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface EthernetInfoIpAddressPropsAddress4Props {
    availability?: EthernetInfoIpAddressPropsAddress4PropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: EthernetInfoIpAddressPropsAddress4PropsWebServerProps;
}
interface EthernetInfoIpAddressPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface EthernetInfoIpAddressPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface EthernetInfoIpAddressProps {
    /** @yamlKey address_0 */
    address0?: EthernetInfoIpAddressPropsAddress0Props;
    /** @yamlKey address_1 */
    address1?: EthernetInfoIpAddressPropsAddress1Props;
    /** @yamlKey address_2 */
    address2?: EthernetInfoIpAddressPropsAddress2Props;
    /** @yamlKey address_3 */
    address3?: EthernetInfoIpAddressPropsAddress3Props;
    /** @yamlKey address_4 */
    address4?: EthernetInfoIpAddressPropsAddress4Props;
    availability?: EthernetInfoIpAddressPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: EthernetInfoIpAddressPropsWebServerProps;
}
interface EthernetInfoMacAddressPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface EthernetInfoMacAddressPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface EthernetInfoMacAddressProps {
    availability?: EthernetInfoMacAddressPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: EthernetInfoMacAddressPropsWebServerProps;
}
interface EzoPmpCalibrationStatusPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface EzoPmpCalibrationStatusPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface EzoPmpCalibrationStatusProps {
    availability?: EzoPmpCalibrationStatusPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: EzoPmpCalibrationStatusPropsWebServerProps;
}
interface EzoPmpDosingModePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface EzoPmpDosingModePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface EzoPmpDosingModeProps {
    availability?: EzoPmpDosingModePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: EzoPmpDosingModePropsWebServerProps;
}
interface Gdk101VersionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Gdk101VersionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Gdk101VersionProps {
    availability?: Gdk101VersionPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Gdk101VersionPropsWebServerProps;
}
interface HaierApplianceNamePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface HaierApplianceNamePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface HaierApplianceNameProps {
    availability?: HaierApplianceNamePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: HaierApplianceNamePropsWebServerProps;
}
interface HaierCleaningStatusPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface HaierCleaningStatusPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface HaierCleaningStatusProps {
    availability?: HaierCleaningStatusPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: HaierCleaningStatusPropsWebServerProps;
}
interface HaierProtocolVersionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface HaierProtocolVersionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface HaierProtocolVersionProps {
    availability?: HaierProtocolVersionPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: HaierProtocolVersionPropsWebServerProps;
}
interface HlkFm22xLastFaceNamePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface HlkFm22xLastFaceNamePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface HlkFm22xLastFaceNameProps {
    availability?: HlkFm22xLastFaceNamePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: HlkFm22xLastFaceNamePropsWebServerProps;
}
interface HlkFm22xVersionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface HlkFm22xVersionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface HlkFm22xVersionProps {
    availability?: HlkFm22xVersionPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: HlkFm22xVersionPropsWebServerProps;
}
interface Ld2410MacAddressPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410MacAddressPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410MacAddressProps {
    availability?: Ld2410MacAddressPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2410MacAddressPropsWebServerProps;
}
interface Ld2410VersionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410VersionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410VersionProps {
    availability?: Ld2410VersionPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2410VersionPropsWebServerProps;
}
interface Ld2412MacAddressPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412MacAddressPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412MacAddressProps {
    availability?: Ld2412MacAddressPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2412MacAddressPropsWebServerProps;
}
interface Ld2412VersionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412VersionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412VersionProps {
    availability?: Ld2412VersionPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2412VersionPropsWebServerProps;
}
interface Ld2420FwVersionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420FwVersionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420FwVersionProps {
    availability?: Ld2420FwVersionPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2420FwVersionPropsWebServerProps;
}
interface Ld2450MacAddressPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450MacAddressPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450MacAddressProps {
    availability?: Ld2450MacAddressPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2450MacAddressPropsWebServerProps;
}
interface Ld2450Target1PropsDirectionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450Target1PropsDirectionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450Target1PropsDirectionProps {
    availability?: Ld2450Target1PropsDirectionPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2450Target1PropsDirectionPropsWebServerProps;
}
interface Ld2450Target1Props {
    direction?: Ld2450Target1PropsDirectionProps;
}
interface Ld2450Target2PropsDirectionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450Target2PropsDirectionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450Target2PropsDirectionProps {
    availability?: Ld2450Target2PropsDirectionPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2450Target2PropsDirectionPropsWebServerProps;
}
interface Ld2450Target2Props {
    direction?: Ld2450Target2PropsDirectionProps;
}
interface Ld2450Target3PropsDirectionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450Target3PropsDirectionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450Target3PropsDirectionProps {
    availability?: Ld2450Target3PropsDirectionPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2450Target3PropsDirectionPropsWebServerProps;
}
interface Ld2450Target3Props {
    direction?: Ld2450Target3PropsDirectionProps;
}
interface Ld2450VersionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450VersionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450VersionProps {
    availability?: Ld2450VersionPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2450VersionPropsWebServerProps;
}
interface LibretinyVersionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface LibretinyVersionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface LibretinyVersionProps {
    availability?: LibretinyVersionPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: LibretinyVersionPropsWebServerProps;
}
interface MicronovaStoveStatePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface MicronovaStoveStatePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface MicronovaStoveStateProps {
    availability?: MicronovaStoveStatePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey memory_address */
    memoryAddress?: unknown;
    /** @yamlKey memory_location */
    memoryLocation?: unknown;
    /** @yamlKey micronova_id */
    micronovaId?: RefProp<__marker_micronova_MicroNova>;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /** @yamlKey web_server */
    webServer?: MicronovaStoveStatePropsWebServerProps;
}
interface Msa3xxOrientationXyPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Msa3xxOrientationXyPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Msa3xxOrientationXyProps {
    availability?: Msa3xxOrientationXyPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Msa3xxOrientationXyPropsWebServerProps;
}
interface Msa3xxOrientationZPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Msa3xxOrientationZPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Msa3xxOrientationZProps {
    availability?: Msa3xxOrientationZPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Msa3xxOrientationZPropsWebServerProps;
}
interface OpenthreadInfoChannelPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthreadInfoChannelPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthreadInfoChannelProps {
    availability?: OpenthreadInfoChannelPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /** @yamlKey web_server */
    webServer?: OpenthreadInfoChannelPropsWebServerProps;
}
interface OpenthreadInfoEui64PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthreadInfoEui64PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthreadInfoEui64Props {
    availability?: OpenthreadInfoEui64PropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /** @yamlKey web_server */
    webServer?: OpenthreadInfoEui64PropsWebServerProps;
}
interface OpenthreadInfoExtAddrPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthreadInfoExtAddrPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthreadInfoExtAddrProps {
    availability?: OpenthreadInfoExtAddrPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /** @yamlKey web_server */
    webServer?: OpenthreadInfoExtAddrPropsWebServerProps;
}
interface OpenthreadInfoExtPanIdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthreadInfoExtPanIdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthreadInfoExtPanIdProps {
    availability?: OpenthreadInfoExtPanIdPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /** @yamlKey web_server */
    webServer?: OpenthreadInfoExtPanIdPropsWebServerProps;
}
interface OpenthreadInfoIpAddressPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthreadInfoIpAddressPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthreadInfoIpAddressProps {
    availability?: OpenthreadInfoIpAddressPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /** @yamlKey web_server */
    webServer?: OpenthreadInfoIpAddressPropsWebServerProps;
}
interface OpenthreadInfoNetworkKeyPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthreadInfoNetworkKeyPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthreadInfoNetworkKeyProps {
    availability?: OpenthreadInfoNetworkKeyPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /** @yamlKey web_server */
    webServer?: OpenthreadInfoNetworkKeyPropsWebServerProps;
}
interface OpenthreadInfoNetworkNamePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthreadInfoNetworkNamePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthreadInfoNetworkNameProps {
    availability?: OpenthreadInfoNetworkNamePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /** @yamlKey web_server */
    webServer?: OpenthreadInfoNetworkNamePropsWebServerProps;
}
interface OpenthreadInfoPanIdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthreadInfoPanIdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthreadInfoPanIdProps {
    availability?: OpenthreadInfoPanIdPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /** @yamlKey web_server */
    webServer?: OpenthreadInfoPanIdPropsWebServerProps;
}
interface OpenthreadInfoRloc16PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthreadInfoRloc16PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthreadInfoRloc16Props {
    availability?: OpenthreadInfoRloc16PropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /** @yamlKey web_server */
    webServer?: OpenthreadInfoRloc16PropsWebServerProps;
}
interface OpenthreadInfoRolePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthreadInfoRolePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthreadInfoRoleProps {
    availability?: OpenthreadInfoRolePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /** @yamlKey web_server */
    webServer?: OpenthreadInfoRolePropsWebServerProps;
}
interface PipsolarDeviceModePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarDeviceModePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarDeviceModeProps {
    availability?: PipsolarDeviceModePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: PipsolarDeviceModePropsWebServerProps;
}
interface PipsolarLastQflagPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarLastQflagPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarLastQflagProps {
    availability?: PipsolarLastQflagPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: PipsolarLastQflagPropsWebServerProps;
}
interface PipsolarLastQmnPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarLastQmnPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarLastQmnProps {
    availability?: PipsolarLastQmnPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: PipsolarLastQmnPropsWebServerProps;
}
interface PipsolarLastQmodPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarLastQmodPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarLastQmodProps {
    availability?: PipsolarLastQmodPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: PipsolarLastQmodPropsWebServerProps;
}
interface PipsolarLastQpigsPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarLastQpigsPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarLastQpigsProps {
    availability?: PipsolarLastQpigsPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: PipsolarLastQpigsPropsWebServerProps;
}
interface PipsolarLastQpiriPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarLastQpiriPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarLastQpiriProps {
    availability?: PipsolarLastQpiriPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: PipsolarLastQpiriPropsWebServerProps;
}
interface PipsolarLastQpiwsPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarLastQpiwsPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarLastQpiwsProps {
    availability?: PipsolarLastQpiwsPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: PipsolarLastQpiwsPropsWebServerProps;
}
interface PipsolarLastQtPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarLastQtPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarLastQtProps {
    availability?: PipsolarLastQtPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: PipsolarLastQtPropsWebServerProps;
}
interface PylontechBaseStatePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PylontechBaseStatePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PylontechBaseStateProps {
    availability?: PylontechBaseStatePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: PylontechBaseStatePropsWebServerProps;
}
interface PylontechCurrentStatePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PylontechCurrentStatePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PylontechCurrentStateProps {
    availability?: PylontechCurrentStatePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: PylontechCurrentStatePropsWebServerProps;
}
interface PylontechTemperatureStatePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PylontechTemperatureStatePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PylontechTemperatureStateProps {
    availability?: PylontechTemperatureStatePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: PylontechTemperatureStatePropsWebServerProps;
}
interface PylontechVoltageStatePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PylontechVoltageStatePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PylontechVoltageStateProps {
    availability?: PylontechVoltageStatePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: PylontechVoltageStatePropsWebServerProps;
}
interface SeeedMr24hpc1CustomModeEndPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SeeedMr24hpc1CustomModeEndPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SeeedMr24hpc1CustomModeEndProps {
    availability?: SeeedMr24hpc1CustomModeEndPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1CustomModeEndPropsWebServerProps;
}
interface SeeedMr24hpc1HardwareModelPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SeeedMr24hpc1HardwareModelPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SeeedMr24hpc1HardwareModelProps {
    availability?: SeeedMr24hpc1HardwareModelPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1HardwareModelPropsWebServerProps;
}
interface SeeedMr24hpc1HardwareVersionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SeeedMr24hpc1HardwareVersionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SeeedMr24hpc1HardwareVersionProps {
    availability?: SeeedMr24hpc1HardwareVersionPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1HardwareVersionPropsWebServerProps;
}
interface SeeedMr24hpc1HeartBeatPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SeeedMr24hpc1HeartBeatPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SeeedMr24hpc1HeartBeatProps {
    availability?: SeeedMr24hpc1HeartBeatPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1HeartBeatPropsWebServerProps;
}
interface SeeedMr24hpc1KeepAwayPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SeeedMr24hpc1KeepAwayPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SeeedMr24hpc1KeepAwayProps {
    availability?: SeeedMr24hpc1KeepAwayPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1KeepAwayPropsWebServerProps;
}
interface SeeedMr24hpc1MotionStatusPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SeeedMr24hpc1MotionStatusPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SeeedMr24hpc1MotionStatusProps {
    availability?: SeeedMr24hpc1MotionStatusPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1MotionStatusPropsWebServerProps;
}
interface SeeedMr24hpc1ProductIdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SeeedMr24hpc1ProductIdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SeeedMr24hpc1ProductIdProps {
    availability?: SeeedMr24hpc1ProductIdPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1ProductIdPropsWebServerProps;
}
interface SeeedMr24hpc1ProductModelPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SeeedMr24hpc1ProductModelPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SeeedMr24hpc1ProductModelProps {
    availability?: SeeedMr24hpc1ProductModelPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1ProductModelPropsWebServerProps;
}
interface SunGtil2SerialNumberPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SunGtil2SerialNumberPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SunGtil2SerialNumberProps {
    availability?: SunGtil2SerialNumberPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: SunGtil2SerialNumberPropsWebServerProps;
}
interface SunGtil2StatePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SunGtil2StatePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SunGtil2StateProps {
    availability?: SunGtil2StatePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: SunGtil2StatePropsWebServerProps;
}
interface Sy6970BusStatusPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Sy6970BusStatusPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Sy6970BusStatusProps {
    availability?: Sy6970BusStatusPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Sy6970BusStatusPropsWebServerProps;
}
interface Sy6970ChargeStatusPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Sy6970ChargeStatusPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Sy6970ChargeStatusProps {
    availability?: Sy6970ChargeStatusPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Sy6970ChargeStatusPropsWebServerProps;
}
interface Sy6970NtcStatusPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Sy6970NtcStatusPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Sy6970NtcStatusProps {
    availability?: Sy6970NtcStatusPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Sy6970NtcStatusPropsWebServerProps;
}
interface UptimeFormatProps {
    /** string: The string to use for the days element. Defaults to `d`. */
    days?: string;
    /** boolean: If set, the text will always include all elements, even if they are zero. Defaults to `false`. */
    expand?: boolean;
    /** string: The string to use for the hours element. Defaults to `h`. */
    hours?: string;
    /** string: The string to use for the minutes element. Defaults to `m`. */
    minutes?: string;
    /** string: The string to use for the seconds element. Defaults to `s`. */
    seconds?: string;
    /** string: The separator to use between the uptime values. Defaults to the empty string. */
    separator?: string;
}
interface WifiInfoBssidPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface WifiInfoBssidPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface WifiInfoBssidProps {
    availability?: WifiInfoBssidPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: WifiInfoBssidPropsWebServerProps;
}
interface WifiInfoDnsAddressPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface WifiInfoDnsAddressPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface WifiInfoDnsAddressProps {
    availability?: WifiInfoDnsAddressPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: WifiInfoDnsAddressPropsWebServerProps;
}
interface WifiInfoIpAddressPropsAddress0PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface WifiInfoIpAddressPropsAddress0PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface WifiInfoIpAddressPropsAddress0Props {
    availability?: WifiInfoIpAddressPropsAddress0PropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: WifiInfoIpAddressPropsAddress0PropsWebServerProps;
}
interface WifiInfoIpAddressPropsAddress1PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface WifiInfoIpAddressPropsAddress1PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface WifiInfoIpAddressPropsAddress1Props {
    availability?: WifiInfoIpAddressPropsAddress1PropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: WifiInfoIpAddressPropsAddress1PropsWebServerProps;
}
interface WifiInfoIpAddressPropsAddress2PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface WifiInfoIpAddressPropsAddress2PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface WifiInfoIpAddressPropsAddress2Props {
    availability?: WifiInfoIpAddressPropsAddress2PropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: WifiInfoIpAddressPropsAddress2PropsWebServerProps;
}
interface WifiInfoIpAddressPropsAddress3PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface WifiInfoIpAddressPropsAddress3PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface WifiInfoIpAddressPropsAddress3Props {
    availability?: WifiInfoIpAddressPropsAddress3PropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: WifiInfoIpAddressPropsAddress3PropsWebServerProps;
}
interface WifiInfoIpAddressPropsAddress4PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface WifiInfoIpAddressPropsAddress4PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface WifiInfoIpAddressPropsAddress4Props {
    availability?: WifiInfoIpAddressPropsAddress4PropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: WifiInfoIpAddressPropsAddress4PropsWebServerProps;
}
interface WifiInfoIpAddressPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface WifiInfoIpAddressPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface WifiInfoIpAddressProps {
    /** @yamlKey address_0 */
    address0?: WifiInfoIpAddressPropsAddress0Props;
    /** @yamlKey address_1 */
    address1?: WifiInfoIpAddressPropsAddress1Props;
    /** @yamlKey address_2 */
    address2?: WifiInfoIpAddressPropsAddress2Props;
    /** @yamlKey address_3 */
    address3?: WifiInfoIpAddressPropsAddress3Props;
    /** @yamlKey address_4 */
    address4?: WifiInfoIpAddressPropsAddress4Props;
    availability?: WifiInfoIpAddressPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: WifiInfoIpAddressPropsWebServerProps;
}
interface WifiInfoMacAddressPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface WifiInfoMacAddressPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface WifiInfoMacAddressProps {
    availability?: WifiInfoMacAddressPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: WifiInfoMacAddressPropsWebServerProps;
}
interface WifiInfoPowerSaveModePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface WifiInfoPowerSaveModePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface WifiInfoPowerSaveModeProps {
    availability?: WifiInfoPowerSaveModePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: WifiInfoPowerSaveModePropsWebServerProps;
}
interface WifiInfoScanResultsPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface WifiInfoScanResultsPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface WifiInfoScanResultsProps {
    availability?: WifiInfoScanResultsPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: WifiInfoScanResultsPropsWebServerProps;
}
interface WifiInfoSsidPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface WifiInfoSsidPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface WifiInfoSsidProps {
    availability?: WifiInfoSsidPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: WifiInfoSsidPropsWebServerProps;
}
interface WireguardAddressPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface WireguardAddressPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface WireguardAddressProps {
    availability?: WireguardAddressPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
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
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: WireguardAddressPropsWebServerProps;
}
interface TextSensorBaseProps extends _CoreEntityBase, _CoreMqttComponent {
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
    filters?: Array<unknown>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey web_server */
    webServer?: TextSensorWebServerProps;
}
interface Atm90e32Props {
    /**
     * Reports status based on frequency thresholds.
     * @yamlKey frequency_status
     */
    frequencyStatus?: Atm90e32FrequencyStatusProps;
    /** [ID](https://esphome.io/guides/configuration-types#id): The ID of the `atm90e32` sensor defined above. Required if us... */
    id?: RefProp<__marker_atm90e32_ATM90E32Component>;
    /**
     * Enables per-phase status conditions:
     * @yamlKey phase_status
     */
    phaseStatus?: Atm90e32PhaseStatusProps;
}
interface BleClientProps extends _CoreComponent, _BleClient {
    /** @yamlKey characteristic_uuid */
    characteristicUuid: unknown;
    /** @yamlKey descriptor_uuid */
    descriptorUuid?: unknown;
    notify?: boolean;
    /** @yamlKey on_notify */
    onNotify?: TriggerHandler;
    /** @yamlKey service_uuid */
    serviceUuid: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface BleScannerProps extends _CoreComponent {
    /** @yamlKey esp32_ble_id */
    esp32BleId?: RefProp<__marker_esp32_ble_tracker_ESP32BLETracker>;
}
interface Bme680BsecProps {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Sets the ID of the bme680_bsec component to refer to. Useful ...
     * @yamlKey bme680_bsec_id
     */
    bme680BsecId?: RefProp<__marker_bme680_bsec_BME680BSECComponent>;
    /**
     * The information for the IAQ accuracy sensor. Shows: Stabilizing, Uncertain, Calibrating, Calibrated.
     * @yamlKey iaq_accuracy
     */
    iaqAccuracy?: Bme680BsecIaqAccuracyProps;
}
interface Bme68xBsec2Props {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the `bme68x_bsec2_i2c` component the text sensor wi...
     * @yamlKey bme68x_bsec2_id
     */
    bme68xBsec2Id?: RefProp<__marker_bme68x_bsec2_BME68xBSEC2Component>;
    /**
     * Configuration for the IAQ accuracy sensor. Shows: `Stabilizing`, `Uncertain`, `Calibrating`, `Calibrated`.
     * @yamlKey iaq_accuracy
     */
    iaqAccuracy?: Bme68xBsec2IaqAccuracyProps;
}
interface CopyProps extends _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The text sensor that should be mirrored.
     * @yamlKey source_id
     */
    sourceId: RefProp<__marker_text_sensor_TextSensor>;
}
interface DalyBmsProps extends _CoreComponent {
    /** @yamlKey bms_daly_id */
    bmsDalyId?: RefProp<__marker_daly_bms_DalyBmsComponent>;
    /** The BMS Status (Charging, Discharging, Stationary). All options from [Text Sensor](https://esphome.io/components/text... */
    status?: DalyBmsStatusProps;
}
interface DebugProps {
    /** @yamlKey debug_id */
    debugId?: RefProp<__marker_debug_DebugComponent>;
    device?: DebugDeviceProps;
    /** @yamlKey reset_reason */
    resetReason?: DebugResetReasonProps;
}
interface DlmsMeterProps extends _CoreComponent {
    /** @yamlKey dlms_meter_id */
    dlmsMeterId?: RefProp<__marker_dlms_meter_DlmsMeterComponent>;
    meternumber?: DlmsMeterMeternumberProps;
    timestamp?: DlmsMeterTimestampProps;
}
interface DsmrProps extends _CoreComponent {
    /** @yamlKey dsmr_id */
    dsmrId?: RefProp<__marker_esphome_dsmr_Dsmr>;
    /** @yamlKey electricity_failure_log */
    electricityFailureLog?: DsmrElectricityFailureLogProps;
    /** @yamlKey electricity_tariff */
    electricityTariff?: DsmrElectricityTariffProps;
    /** @yamlKey equipment_id */
    equipmentId?: DsmrEquipmentIdProps;
    /** @yamlKey fw_core_checksum */
    fwCoreChecksum?: DsmrFwCoreChecksumProps;
    /** @yamlKey fw_core_version */
    fwCoreVersion?: DsmrFwCoreVersionProps;
    /** @yamlKey fw_module_checksum */
    fwModuleChecksum?: DsmrFwModuleChecksumProps;
    /** @yamlKey fw_module_version */
    fwModuleVersion?: DsmrFwModuleVersionProps;
    /** @yamlKey gas_delivered_text */
    gasDeliveredText?: DsmrGasDeliveredTextProps;
    /** @yamlKey gas_equipment_id */
    gasEquipmentId?: DsmrGasEquipmentIdProps;
    /** @yamlKey gas_equipment_id_be */
    gasEquipmentIdBe?: DsmrGasEquipmentIdBeProps;
    identification?: DsmrIdentificationProps;
    /** @yamlKey message_long */
    messageLong?: DsmrMessageLongProps;
    /** @yamlKey message_short */
    messageShort?: DsmrMessageShortProps;
    /** @yamlKey p1_version */
    p1Version?: DsmrP1VersionProps;
    /** @yamlKey p1_version_be */
    p1VersionBe?: DsmrP1VersionBeProps;
    /** @yamlKey sub_equipment_id */
    subEquipmentId?: DsmrSubEquipmentIdProps;
    telegram?: DsmrTelegramProps;
    /** @yamlKey thermal_equipment_id */
    thermalEquipmentId?: DsmrThermalEquipmentIdProps;
    timestamp?: DsmrTimestampProps;
    /** @yamlKey water_equipment_id */
    waterEquipmentId?: DsmrWaterEquipmentIdProps;
}
interface EthernetInfoProps {
    /**
     * Expose the DNS Address of the ESP as text sensor. [Text Sensor](https://esphome.io/components/text_sensor#config-text...
     * @yamlKey dns_address
     */
    dnsAddress?: EthernetInfoDnsAddressProps;
    /**
     * Expose the IP Address of the ESP as a text sensor. All options from [Text Sensor](https://esphome.io/components/text_...
     * @yamlKey ip_address
     */
    ipAddress?: EthernetInfoIpAddressProps;
    /**
     * Expose the MAC Address of the ESP as text sensor. [Text Sensor](https://esphome.io/components/text_sensor#config-text...
     * @yamlKey mac_address
     */
    macAddress?: EthernetInfoMacAddressProps;
}
interface EzoPmpProps {
    /** @yamlKey calibration_status */
    calibrationStatus?: EzoPmpCalibrationStatusProps;
    /** @yamlKey dosing_mode */
    dosingMode?: EzoPmpDosingModeProps;
    id?: RefProp<__marker_ezo_pmp_EzoPMP>;
}
interface Gdk101Props {
    /** @yamlKey gdk101_id */
    gdk101Id?: RefProp<__marker_gdk101_GDK101Component>;
    /** Firmware version of the module. All options from [Text Sensor](https://esphome.io/components/text_sensor#config-text_... */
    version: Gdk101VersionProps;
}
interface HaierProps {
    /**
     * A text sensor that indicates Haier appliance name. All options from [Text Sensor](https://esphome.io/components/text_...
     * @yamlKey appliance_name
     */
    applianceName?: HaierApplianceNameProps;
    /**
     * A text sensor that indicates cleaning status. Possible values "No cleaning", "Self clean", "56°C Steri-Clean". All op...
     * @yamlKey cleaning_status
     */
    cleaningStatus?: HaierCleaningStatusProps;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The id of haier climate component
     * @yamlKey haier_id
     */
    haierId?: RefProp<__marker_haier_HonClimate>;
    /**
     * A text sensor that indicates Haier protocol version. All options from [Text Sensor](https://esphome.io/components/tex...
     * @yamlKey protocol_version
     */
    protocolVersion?: HaierProtocolVersionProps;
}
interface HlkFm22xProps {
    /** @yamlKey hlk_fm22x_id */
    hlkFm22xId?: RefProp<__marker_hlk_fm22x_HlkFm22xComponent>;
    /** @yamlKey last_face_name */
    lastFaceName?: HlkFm22xLastFaceNameProps;
    version?: HlkFm22xVersionProps;
}
interface HomeassistantProps extends _HomeassistantHomeAssistantImport {
}
interface KeyCollectorProps {
    id?: unknown;
    /** @yamlKey source_id */
    sourceId?: RefProp<__marker_key_collector_KeyCollector>;
}
interface Ld2410Props {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID for the [Ld2410](https://esphome.io/c...
     * @yamlKey ld2410_id
     */
    ld2410Id?: RefProp<__marker_ld2410_LD2410Component>;
    /**
     * The bluetooth mac address. Will be set to `unknown` when bluetooth is off. All options from [Text Sensor](https://esp...
     * @yamlKey mac_address
     */
    macAddress?: Ld2410MacAddressProps;
    /** The firmware version. All options from [Text Sensor](https://esphome.io/components/text_sensor#config-text_sensor). */
    version?: Ld2410VersionProps;
}
interface Ld2412Props {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID for the component. Required when usin...
     * @yamlKey ld2412_id
     */
    ld2412Id?: RefProp<__marker_ld2412_LD2412Component>;
    /**
     * The bluetooth mac address. Will be set to `unknown` when bluetooth is off. All options from [Text Sensor](https://esp...
     * @yamlKey mac_address
     */
    macAddress?: Ld2412MacAddressProps;
    /** The firmware version. All options from [Text Sensor](https://esphome.io/components/text_sensor#config-text_sensor). */
    version?: Ld2412VersionProps;
}
interface Ld2420Props extends _CoreComponent {
    /**
     * Allows you to retrieve the [Ld2420](https://esphome.io/components/sensor/ld2420/) firmware version. May contain any o...
     * @yamlKey fw_version
     */
    fwVersion?: Ld2420FwVersionProps;
    /** @yamlKey ld2420_id */
    ld2420Id?: RefProp<__marker_ld2420_LD2420Component>;
}
interface Ld2450Props {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID for the [Ld2450](https://esphome.io/c...
     * @yamlKey ld2450_id
     */
    ld2450Id?: RefProp<__marker_ld2450_LD2450Component>;
    /**
     * The `ld2450` Bluetooth MAC address. All options from [Text Sensor](https://esphome.io/components/text_sensor#config-t...
     * @yamlKey mac_address
     */
    macAddress?: Ld2450MacAddressProps;
    /** @yamlKey target_1 */
    target1?: Ld2450Target1Props;
    /** @yamlKey target_2 */
    target2?: Ld2450Target2Props;
    /** @yamlKey target_3 */
    target3?: Ld2450Target3Props;
    /** The `ld2450` firmware version. All options from [Text Sensor](https://esphome.io/components/text_sensor#config-text_s... */
    version?: Ld2450VersionProps;
}
interface LibretinyProps {
    libretiny?: RefProp<__marker_libretiny_LTComponent>;
    version?: LibretinyVersionProps;
}
interface LvglProps {
    id?: unknown;
    widget: RefProp<unknown>;
}
interface MicronovaProps {
    /** @yamlKey micronova_id */
    micronovaId?: RefProp<__marker_micronova_MicroNova>;
    /** @yamlKey stove_state */
    stoveState?: MicronovaStoveStateProps;
}
interface ModbusControllerProps extends _CoreComponent, _ModbusControllerModbusitembaseschema {
    /** @yamlKey raw_encode */
    rawEncode?: "ANSI" | "COMMA" | "HEXBYTES" | "NONE";
    /** @yamlKey register_count */
    registerCount?: number;
    /** @yamlKey register_type */
    registerType?: "coil" | "custom" | "discrete_input" | "holding" | "read";
}
interface MqttSubscribeProps extends _CoreComponent {
    /** @yamlKey mqtt_parent_id */
    mqttParentId?: RefProp<__marker_mqtt_MQTTClientComponent>;
    /** int: The MQTT QoS to subscribe with. Defaults to `0`. */
    qos?: number;
    /** string: The MQTT topic to listen for string data. */
    topic: string;
}
interface Msa3xxProps extends _Msa3xxMsaSensor {
    /**
     * XY orientation. Can be one of `Portrait Upright`, `Portrait Upside Down`, `Landscape Left`, `Landscape Right`.
     * @yamlKey orientation_xy
     */
    orientationXy?: Msa3xxOrientationXyProps;
    /**
     * Z orientation. Can be one of `Upwards looking`, `Downwards looking`
     * @yamlKey orientation_z
     */
    orientationZ?: Msa3xxOrientationZProps;
}
interface NextionProps {
    /**
     * [Color](https://esphome.io/components/display#config-color): The background color
     * @yamlKey background_color
     */
    backgroundColor?: RefProp<__marker_Color>;
    /**
     * string: The name of the Nextion component.
     * @yamlKey component_name
     */
    componentName: string;
    /**
     * int: The font id for the component
     * @yamlKey font_id
     */
    fontId?: number;
    /**
     * [Color](https://esphome.io/components/display#config-color): The foreground color
     * @yamlKey foreground_color
     */
    foregroundColor?: RefProp<__marker_Color>;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the Nextion display.
     * @yamlKey nextion_id
     */
    nextionId?: RefProp<__marker_nextion_Nextion>;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The duration to update the sensor. If using a [Nextion Cu...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
    /** boolean: Visible or not */
    visible?: boolean;
}
interface OpenthreadInfoProps {
    /** Expose the Thread network channel (11-26) as a text sensor. All options from [Text Sensor](https://esphome.io/compone... */
    channel?: OpenthreadInfoChannelProps;
    /** Expose the EUI-64 address as a text sensor. This is the unique 64-bit identifier for the device. All options from [Te... */
    eui64?: OpenthreadInfoEui64Props;
    /**
     * Expose the IEEE 802.15.4 Extended MAC address as a text sensor. All options from [Text Sensor](https://esphome.io/com...
     * @yamlKey ext_addr
     */
    extAddr?: OpenthreadInfoExtAddrProps;
    /**
     * Expose the Extended PAN ID as a text sensor. This is a 64-bit extended identifier for the Thread network. All options...
     * @yamlKey ext_pan_id
     */
    extPanId?: OpenthreadInfoExtPanIdProps;
    /**
     * Expose the off-mesh routable IPv6 address of the Thread device as a text sensor. This is the address used for communi...
     * @yamlKey ip_address
     */
    ipAddress?: OpenthreadInfoIpAddressProps;
    /**
     * Expose the Thread network key as a text sensor. All options from [Text Sensor](https://esphome.io/components/text_sen...
     * @yamlKey network_key
     */
    networkKey?: OpenthreadInfoNetworkKeyProps;
    /**
     * Expose the Thread network name as a text sensor. All options from [Text Sensor](https://esphome.io/components/text_se...
     * @yamlKey network_name
     */
    networkName?: OpenthreadInfoNetworkNameProps;
    /**
     * Expose the Personal Area Network ID (PAN ID) as a text sensor. This is a 16-bit identifier for the Thread network. Al...
     * @yamlKey pan_id
     */
    panId?: OpenthreadInfoPanIdProps;
    /** Expose the Router Locator (RLOC16) address as a text sensor. This is a 16-bit address used for routing within the Thr... */
    rloc16?: OpenthreadInfoRloc16Props;
    /** Expose the current device role in the Thread network (Leader, Router, Child, Detached, etc.) as a text sensor. All op... */
    role?: OpenthreadInfoRoleProps;
}
interface PipsolarProps extends _PipsolarComponent {
    /**
     * device mode response
     * @yamlKey device_mode
     */
    deviceMode?: PipsolarDeviceModeProps;
    /**
     * last qflag reponse
     * @yamlKey last_qflag
     */
    lastQflag?: PipsolarLastQflagProps;
    /**
     * last qmn reponse
     * @yamlKey last_qmn
     */
    lastQmn?: PipsolarLastQmnProps;
    /**
     * last qmod reponse
     * @yamlKey last_qmod
     */
    lastQmod?: PipsolarLastQmodProps;
    /**
     * last qpigs reponse
     * @yamlKey last_qpigs
     */
    lastQpigs?: PipsolarLastQpigsProps;
    /**
     * last qpiri reponse
     * @yamlKey last_qpiri
     */
    lastQpiri?: PipsolarLastQpiriProps;
    /**
     * last qpiws reponse
     * @yamlKey last_qpiws
     */
    lastQpiws?: PipsolarLastQpiwsProps;
    /**
     * last qt reponse
     * @yamlKey last_qt
     */
    lastQt?: PipsolarLastQtProps;
}
interface PylontechProps extends _PylontechComponent {
    /**
     * Base state. Usually reads `Dischg`, `Charge` or `Idle`. All options from [Text Sensor](https://esphome.io/components/...
     * @yamlKey base_state
     */
    baseState?: PylontechBaseStateProps;
    /**
     * Current state. Usually reads `Normal`. All options from [Text Sensor](https://esphome.io/components/text_sensor#confi...
     * @yamlKey current_state
     */
    currentState?: PylontechCurrentStateProps;
    /**
     * Temperature state. Usually reads `Normal`. All options from [Text Sensor](https://esphome.io/components/text_sensor#c...
     * @yamlKey temperature_state
     */
    temperatureState?: PylontechTemperatureStateProps;
    /**
     * Voltage state. Usually reads `Normal`. All options from [Text Sensor](https://esphome.io/components/text_sensor#confi...
     * @yamlKey voltage_state
     */
    voltageState?: PylontechVoltageStateProps;
}
interface SeeedMr24hpc1Props {
    /**
     * Used to indicate whether or not the current radar is in a customised mode amongst the setup functions. There are thre...
     * @yamlKey custom_mode_end
     */
    customModeEnd?: SeeedMr24hpc1CustomModeEndProps;
    /**
     * The hardware model. All options from [Text Sensor](https://esphome.io/components/text_sensor#config-text_sensor).
     * @yamlKey hardware_model
     */
    hardwareModel?: SeeedMr24hpc1HardwareModelProps;
    /**
     * The hardware version. All options from [Text Sensor](https://esphome.io/components/text_sensor#config-text_sensor).
     * @yamlKey hardware_version
     */
    hardwareVersion?: SeeedMr24hpc1HardwareVersionProps;
    /**
     * Sensor operating status indicator. All options from [Text Sensor](https://esphome.io/components/text_sensor#config-te...
     * @yamlKey heart_beat
     */
    heartBeat?: SeeedMr24hpc1HeartBeatProps;
    /**
     * Indicator for detecting objects approaching or moving away. All options from [Text Sensor](https://esphome.io/compone...
     * @yamlKey keep_away
     */
    keepAway?: SeeedMr24hpc1KeepAwayProps;
    /**
     * An indicator that detects the movement or stationarity of an object. All options from [Text Sensor](https://esphome.i...
     * @yamlKey motion_status
     */
    motionStatus?: SeeedMr24hpc1MotionStatusProps;
    /** @yamlKey mr24hpc1_id */
    mr24hpc1Id?: RefProp<__marker_seeed_mr24hpc1_MR24HPC1Component>;
    /**
     * The product ID. All options from [Text Sensor](https://esphome.io/components/text_sensor#config-text_sensor).
     * @yamlKey product_id
     */
    productId?: SeeedMr24hpc1ProductIdProps;
    /**
     * The product model. All options from [Text Sensor](https://esphome.io/components/text_sensor#config-text_sensor).
     * @yamlKey product_model
     */
    productModel?: SeeedMr24hpc1ProductModelProps;
}
interface SmlProps extends _CoreComponent {
    /** string: Override the automatic interpretation of the transmitted binary data value. Possible values (`int`, `uint`, `... */
    format?: "" | "bool" | "hex" | "int" | "text" | "uint";
    /**
     * string: Specify the OBIS code you want to retrieve data for from the device. The format must be (A-B:C.D.E, e.g. 1-0:...
     * @yamlKey obis_code
     */
    obisCode: string;
    /**
     * string: Specify the device's server_id to retrieve the OBIS code from. Should be specified if more then one device is...
     * @yamlKey server_id
     */
    serverId?: string;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the [SML platform](https://esphome.io/components/sm...
     * @yamlKey sml_id
     */
    smlId?: RefProp<__marker_sml_Sml>;
}
interface SunProps extends _CoreComponent {
    /** float: The elevation to calculate the next sunrise/sunset event for. Defaults to -0.833° (the horizon, slightly less ... */
    elevation?: number;
    /** string: The format to format the time value with, see [strftime](https://esphome.io/components/time#strftime) for mor... */
    format?: string;
    /** @yamlKey sun_id */
    sunId?: RefProp<__marker_sun_Sun>;
    /** string: The type of value to track. One of `sunrise` and `sunset`. */
    type: "sunrise" | "sunset";
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface SunGtil2Props extends _CoreComponent {
    /**
     * The inverter's serial number. All options from [Text Sensor](https://esphome.io/components/text_sensor#config-text_se...
     * @yamlKey serial_number
     */
    serialNumber?: SunGtil2SerialNumberProps;
    /** The inverter's state. All options from [Text Sensor](https://esphome.io/components/text_sensor#config-text_sensor). */
    state?: SunGtil2StateProps;
    /**
     * Manually specify the ID of the sun_gtil2 instance if there are multiple.
     * @yamlKey sun_gtil2_id
     */
    sunGtil2Id?: RefProp<__marker_sun_gtil2_SunGTIL2>;
}
interface Sy6970Props {
    /** @yamlKey bus_status */
    busStatus?: Sy6970BusStatusProps;
    /** @yamlKey charge_status */
    chargeStatus?: Sy6970ChargeStatusProps;
    /** @yamlKey ntc_status */
    ntcStatus?: Sy6970NtcStatusProps;
    /** @yamlKey sy6970_id */
    sy6970Id?: RefProp<__marker_sy6970_SY6970Component>;
}
interface TeleinfoProps extends _TeleinfoListener {
}
interface TemplateProps extends _CoreComponent {
    /** [lambda](https://esphome.io/automations/templates#config-lambda): Lambda to be evaluated every update interval to get... */
    lambda?: unknown;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The interval to check the text sensor. Set to `never` to ...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
interface TextProps extends _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The source text to observe.
     * @yamlKey source_id
     */
    sourceId: RefProp<__marker_text_Text>;
}
interface TuyaProps extends _CoreComponent {
    /** @yamlKey sensor_datapoint */
    sensorDatapoint: number;
    /** @yamlKey tuya_id */
    tuyaId?: RefProp<__marker_tuya_Tuya>;
}
interface UptimeProps extends _CoreComponent {
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** list: Allows the customization of the output format. The following options are available: */
    format?: UptimeFormatProps;
    icon?: unknown;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The sensor reporting interval. Defaults to `30s`.
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
interface VersionProps extends _CoreComponent {
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /**
     * boolean: Allows you to hide the config hash from the version string. Defaults to `false`.
     * @yamlKey hide_hash
     */
    hideHash?: boolean;
    /**
     * boolean: Allows you to hide the compilation timestamp from the version string. Defaults to `false`.
     * @yamlKey hide_timestamp
     */
    hideTimestamp?: boolean;
    icon?: unknown;
}
interface WifiInfoProps {
    /** Expose the BSSID of the currently connected WiFi network as a text sensor. All options from [Text Sensor](https://esp... */
    bssid?: WifiInfoBssidProps;
    /**
     * Expose the DNS Address of the device as text sensor. [Text Sensor](https://esphome.io/components/text_sensor#config-t...
     * @yamlKey dns_address
     */
    dnsAddress?: WifiInfoDnsAddressProps;
    /**
     * Expose the IP Address of the device as a text sensor. All options from [Text Sensor](https://esphome.io/components/te...
     * @yamlKey ip_address
     */
    ipAddress?: WifiInfoIpAddressProps;
    /**
     * Expose the Mac Address of the WiFi card. All options from [Text Sensor](https://esphome.io/components/text_sensor#con...
     * @yamlKey mac_address
     */
    macAddress?: WifiInfoMacAddressProps;
    /** @yamlKey power_save_mode */
    powerSaveMode?: WifiInfoPowerSaveModeProps;
    /**
     * Expose the latest networks found during the latest scan. All options from [Text Sensor](https://esphome.io/components...
     * @yamlKey scan_results
     */
    scanResults?: WifiInfoScanResultsProps;
    /** Expose the SSID of the currently connected WiFi network as a text sensor. All options from [Text Sensor](https://esph... */
    ssid?: WifiInfoSsidProps;
}
interface WireguardProps {
    address?: WireguardAddressProps;
    /** @yamlKey wireguard_id */
    wireguardId?: RefProp<__marker_wireguard_Wireguard>;
}
interface Wl134Props extends _UartDevice {
    icon?: unknown;
    /** boolean: Reset the text sensor state back to "" 1s after reading a tag. Defaults to `false`. */
    reset?: boolean;
}
export type TextSensorProps = (TextSensorBaseProps & {
    platform: "atm90e32";
} & Atm90e32Props & ComponentProps<__marker_text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "ble_client";
} & BleClientProps & ComponentProps<__marker_ble_client_BLETextSensor>) | (TextSensorBaseProps & {
    platform: "ble_scanner";
} & BleScannerProps & ComponentProps<__marker_ble_scanner_BLEScanner>) | (TextSensorBaseProps & {
    platform: "bme680_bsec";
} & Bme680BsecProps & ComponentProps<__marker_text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "bme68x_bsec2";
} & Bme68xBsec2Props & ComponentProps<__marker_text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "copy";
} & CopyProps & ComponentProps<__marker_copy_CopyTextSensor>) | (TextSensorBaseProps & {
    platform: "daly_bms";
} & DalyBmsProps & ComponentProps<__marker_text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "debug";
} & DebugProps & ComponentProps<__marker_text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "dlms_meter";
} & DlmsMeterProps & ComponentProps<__marker_text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "dsmr";
} & DsmrProps & ComponentProps<__marker_text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "ethernet_info";
} & EthernetInfoProps & ComponentProps<__marker_text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "ezo_pmp";
} & EzoPmpProps & ComponentProps<__marker_text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "gdk101";
} & Gdk101Props & ComponentProps<__marker_text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "haier";
} & HaierProps & ComponentProps<__marker_text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "hlk_fm22x";
} & HlkFm22xProps & ComponentProps<__marker_text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "homeassistant";
} & HomeassistantProps & ComponentProps<__marker_homeassistant_HomeassistantTextSensor>) | (TextSensorBaseProps & {
    platform: "key_collector";
} & KeyCollectorProps & ComponentProps<__marker_text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "ld2410";
} & Ld2410Props & ComponentProps<__marker_EntityBase>) | (TextSensorBaseProps & {
    platform: "ld2412";
} & Ld2412Props & ComponentProps<__marker_EntityBase>) | (TextSensorBaseProps & {
    platform: "ld2420";
} & Ld2420Props & ComponentProps<__marker_ld2420_LD2420TextSensor>) | (TextSensorBaseProps & {
    platform: "ld2450";
} & Ld2450Props & ComponentProps<__marker_EntityBase>) | (TextSensorBaseProps & {
    platform: "libretiny";
} & LibretinyProps & ComponentProps<__marker_text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "lvgl";
} & LvglProps & ComponentProps<__marker_text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "micronova";
} & MicronovaProps & ComponentProps<__marker_text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "modbus_controller";
} & ModbusControllerProps & ComponentProps<__marker_modbus_controller_ModbusTextSensor>) | (TextSensorBaseProps & {
    platform: "mqtt_subscribe";
} & MqttSubscribeProps & ComponentProps<__marker_mqtt_subscribe_MQTTSubscribeTextSensor>) | (TextSensorBaseProps & {
    platform: "msa3xx";
} & Msa3xxProps & ComponentProps<__marker_text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "nextion";
} & NextionProps & ComponentProps<__marker_nextion_NextionTextSensor>) | (TextSensorBaseProps & {
    platform: "openthread_info";
} & OpenthreadInfoProps & ComponentProps<__marker_text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "pipsolar";
} & PipsolarProps & ComponentProps<__marker_text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "pylontech";
} & PylontechProps & ComponentProps<__marker_pylontech_PylontechTextSensor>) | (TextSensorBaseProps & {
    platform: "seeed_mr24hpc1";
} & SeeedMr24hpc1Props & ComponentProps<__marker_text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "sml";
} & SmlProps & ComponentProps<__marker_sml_SmlTextSensor>) | (TextSensorBaseProps & {
    platform: "sun";
} & SunProps & ComponentProps<__marker_sun_SunTextSensor>) | (TextSensorBaseProps & {
    platform: "sun_gtil2";
} & SunGtil2Props & ComponentProps<__marker_text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "sy6970";
} & Sy6970Props & ComponentProps<__marker_text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "teleinfo";
} & TeleinfoProps & ComponentProps<__marker_teleinfo_TeleInfoTextSensor>) | (TextSensorBaseProps & {
    platform: "template";
} & TemplateProps & ComponentProps<__marker_template__TemplateTextSensor>) | (TextSensorBaseProps & {
    platform: "text";
} & TextProps & ComponentProps<__marker_text_TextTextSensor>) | (TextSensorBaseProps & {
    platform: "tuya";
} & TuyaProps & ComponentProps<__marker_tuya_TuyaTextSensor>) | (TextSensorBaseProps & {
    platform: "uptime";
} & UptimeProps & ComponentProps<__marker_uptime_UptimeTextSensor>) | (TextSensorBaseProps & {
    platform: "version";
} & VersionProps & ComponentProps<__marker_version_VersionTextSensor>) | (TextSensorBaseProps & {
    platform: "wifi_info";
} & WifiInfoProps & ComponentProps<__marker_text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "wireguard";
} & WireguardProps & ComponentProps<__marker_text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "wl_134";
} & Wl134Props & ComponentProps<__marker_wl_134_Wl134Component>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            text_sensor: TextSensorProps;
        }
    }
}
