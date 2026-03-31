// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _BleClient, _CoreComponent, _CoreEntityBase, _CoreMqttComponent, _HomeassistantHomeAssistantImport, _ModbusControllerModbusitembaseschema, _Msa3xxMsaSensor, _PipsolarComponent, _PylontechComponent, _TeleinfoListener, _UartDevice } from "../bases";
import type { Color, EntityBase, atm90e32_ATM90E32Component, ble_client_BLETextSensor, ble_scanner_BLEScanner, bme680_bsec_BME680BSECComponent, bme68x_bsec2_BME68xBSEC2Component, copy_CopyTextSensor, daly_bms_DalyBmsComponent, debug_DebugComponent, dlms_meter_DlmsMeterComponent, esp32_ble_tracker_ESP32BLETracker, esphome_dsmr_Dsmr, ezo_pmp_EzoPMP, gdk101_GDK101Component, haier_HonClimate, hlk_fm22x_HlkFm22xComponent, homeassistant_HomeassistantTextSensor, key_collector_KeyCollector, ld2410_LD2410Component, ld2412_LD2412Component, ld2420_LD2420Component, ld2420_LD2420TextSensor, ld2450_LD2450Component, libretiny_LTComponent, micronova_MicroNova, modbus_controller_ModbusTextSensor, mqtt_MQTTClientComponent, mqtt_subscribe_MQTTSubscribeTextSensor, nextion_Nextion, nextion_NextionTextSensor, pylontech_PylontechTextSensor, seeed_mr24hpc1_MR24HPC1Component, sml_Sml, sml_SmlTextSensor, sun_Sun, sun_SunTextSensor, sun_gtil2_SunGTIL2, sy6970_SY6970Component, teleinfo_TeleInfoTextSensor, template__TemplateTextSensor, text_sensor_TextSensor, tuya_Tuya, tuya_TuyaTextSensor, uptime_UptimeTextSensor, version_VersionTextSensor, web_server_WebServer, wireguard_Wireguard, wl_134_Wl134Component } from "../markers";
interface TextSensorWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface EthernetInfoIpAddressPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface EthernetInfoIpAddressPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface EthernetInfoIpAddressPropsAddress0PropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface EthernetInfoIpAddressPropsAddress0PropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface EthernetInfoIpAddressPropsAddress0Props {
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
    availability?: EthernetInfoIpAddressPropsAddress0PropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: EthernetInfoIpAddressPropsAddress0PropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface EthernetInfoIpAddressPropsAddress1PropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface EthernetInfoIpAddressPropsAddress1PropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface EthernetInfoIpAddressPropsAddress1Props {
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
    availability?: EthernetInfoIpAddressPropsAddress1PropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: EthernetInfoIpAddressPropsAddress1PropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface EthernetInfoIpAddressPropsAddress2PropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface EthernetInfoIpAddressPropsAddress2PropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface EthernetInfoIpAddressPropsAddress2Props {
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
    availability?: EthernetInfoIpAddressPropsAddress2PropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: EthernetInfoIpAddressPropsAddress2PropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface EthernetInfoIpAddressPropsAddress3PropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface EthernetInfoIpAddressPropsAddress3PropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface EthernetInfoIpAddressPropsAddress3Props {
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
    availability?: EthernetInfoIpAddressPropsAddress3PropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: EthernetInfoIpAddressPropsAddress3PropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface EthernetInfoIpAddressPropsAddress4PropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface EthernetInfoIpAddressPropsAddress4PropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface EthernetInfoIpAddressPropsAddress4Props {
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
    availability?: EthernetInfoIpAddressPropsAddress4PropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: EthernetInfoIpAddressPropsAddress4PropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface EthernetInfoIpAddressProps {
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
    availability?: EthernetInfoIpAddressPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: EthernetInfoIpAddressPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
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
}
interface EthernetInfoDnsAddressPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface EthernetInfoDnsAddressPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface EthernetInfoDnsAddressProps {
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
    availability?: EthernetInfoDnsAddressPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: EthernetInfoDnsAddressPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface EthernetInfoMacAddressPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface EthernetInfoMacAddressPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface EthernetInfoMacAddressProps {
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
    availability?: EthernetInfoMacAddressPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: EthernetInfoMacAddressPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface OpenthreadInfoIpAddressPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthreadInfoIpAddressPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthreadInfoIpAddressProps {
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
    availability?: OpenthreadInfoIpAddressPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthreadInfoIpAddressPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface OpenthreadInfoRolePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthreadInfoRolePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthreadInfoRoleProps {
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
    availability?: OpenthreadInfoRolePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthreadInfoRolePropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface OpenthreadInfoRloc16PropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthreadInfoRloc16PropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthreadInfoRloc16Props {
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
    availability?: OpenthreadInfoRloc16PropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthreadInfoRloc16PropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface OpenthreadInfoExtAddrPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthreadInfoExtAddrPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthreadInfoExtAddrProps {
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
    availability?: OpenthreadInfoExtAddrPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthreadInfoExtAddrPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface OpenthreadInfoEui64PropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthreadInfoEui64PropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthreadInfoEui64Props {
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
    availability?: OpenthreadInfoEui64PropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthreadInfoEui64PropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface OpenthreadInfoChannelPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthreadInfoChannelPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthreadInfoChannelProps {
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
    availability?: OpenthreadInfoChannelPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthreadInfoChannelPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface OpenthreadInfoNetworkNamePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthreadInfoNetworkNamePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthreadInfoNetworkNameProps {
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
    availability?: OpenthreadInfoNetworkNamePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthreadInfoNetworkNamePropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface OpenthreadInfoNetworkKeyPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthreadInfoNetworkKeyPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthreadInfoNetworkKeyProps {
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
    availability?: OpenthreadInfoNetworkKeyPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthreadInfoNetworkKeyPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface OpenthreadInfoPanIdPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthreadInfoPanIdPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthreadInfoPanIdProps {
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
    availability?: OpenthreadInfoPanIdPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthreadInfoPanIdPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface OpenthreadInfoExtPanIdPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthreadInfoExtPanIdPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthreadInfoExtPanIdProps {
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
    availability?: OpenthreadInfoExtPanIdPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthreadInfoExtPanIdPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface WifiInfoIpAddressPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface WifiInfoIpAddressPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface WifiInfoIpAddressPropsAddress0PropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface WifiInfoIpAddressPropsAddress0PropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface WifiInfoIpAddressPropsAddress0Props {
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
    availability?: WifiInfoIpAddressPropsAddress0PropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: WifiInfoIpAddressPropsAddress0PropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface WifiInfoIpAddressPropsAddress1PropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface WifiInfoIpAddressPropsAddress1PropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface WifiInfoIpAddressPropsAddress1Props {
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
    availability?: WifiInfoIpAddressPropsAddress1PropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: WifiInfoIpAddressPropsAddress1PropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface WifiInfoIpAddressPropsAddress2PropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface WifiInfoIpAddressPropsAddress2PropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface WifiInfoIpAddressPropsAddress2Props {
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
    availability?: WifiInfoIpAddressPropsAddress2PropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: WifiInfoIpAddressPropsAddress2PropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface WifiInfoIpAddressPropsAddress3PropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface WifiInfoIpAddressPropsAddress3PropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface WifiInfoIpAddressPropsAddress3Props {
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
    availability?: WifiInfoIpAddressPropsAddress3PropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: WifiInfoIpAddressPropsAddress3PropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface WifiInfoIpAddressPropsAddress4PropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface WifiInfoIpAddressPropsAddress4PropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface WifiInfoIpAddressPropsAddress4Props {
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
    availability?: WifiInfoIpAddressPropsAddress4PropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: WifiInfoIpAddressPropsAddress4PropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface WifiInfoIpAddressProps {
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
    availability?: WifiInfoIpAddressPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: WifiInfoIpAddressPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
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
}
interface WifiInfoScanResultsPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface WifiInfoScanResultsPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface WifiInfoScanResultsProps {
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
    availability?: WifiInfoScanResultsPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: WifiInfoScanResultsPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface WifiInfoSsidPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface WifiInfoSsidPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface WifiInfoSsidProps {
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
    availability?: WifiInfoSsidPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: WifiInfoSsidPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface WifiInfoBssidPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface WifiInfoBssidPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface WifiInfoBssidProps {
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
    availability?: WifiInfoBssidPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: WifiInfoBssidPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface WifiInfoMacAddressPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface WifiInfoMacAddressPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface WifiInfoMacAddressProps {
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
    availability?: WifiInfoMacAddressPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: WifiInfoMacAddressPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface WifiInfoDnsAddressPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface WifiInfoDnsAddressPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface WifiInfoDnsAddressProps {
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
    availability?: WifiInfoDnsAddressPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: WifiInfoDnsAddressPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface WifiInfoPowerSaveModePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface WifiInfoPowerSaveModePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface WifiInfoPowerSaveModeProps {
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
    availability?: WifiInfoPowerSaveModePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: WifiInfoPowerSaveModePropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface Atm90e32PhaseStatusPropsPhaseAPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Atm90e32PhaseStatusPropsPhaseAPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Atm90e32PhaseStatusPropsPhaseAProps {
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
    availability?: Atm90e32PhaseStatusPropsPhaseAPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Atm90e32PhaseStatusPropsPhaseAPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface Atm90e32PhaseStatusPropsPhaseBPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Atm90e32PhaseStatusPropsPhaseBPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Atm90e32PhaseStatusPropsPhaseBProps {
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
    availability?: Atm90e32PhaseStatusPropsPhaseBPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Atm90e32PhaseStatusPropsPhaseBPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface Atm90e32PhaseStatusPropsPhaseCPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Atm90e32PhaseStatusPropsPhaseCPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Atm90e32PhaseStatusPropsPhaseCProps {
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
    availability?: Atm90e32PhaseStatusPropsPhaseCPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Atm90e32PhaseStatusPropsPhaseCPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface Atm90e32PhaseStatusProps {
    /**
     * Phase A status field. All options from [Text Sensor](/components/text_sensor#config-text_sensor). Will Report:
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
interface Atm90e32FrequencyStatusPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Atm90e32FrequencyStatusPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Atm90e32FrequencyStatusProps {
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
    availability?: Atm90e32FrequencyStatusPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Atm90e32FrequencyStatusPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface Bme680BsecIaqAccuracyPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Bme680BsecIaqAccuracyPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Bme680BsecIaqAccuracyProps {
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
    availability?: Bme680BsecIaqAccuracyPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Bme680BsecIaqAccuracyPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface Bme68xBsec2IaqAccuracyPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Bme68xBsec2IaqAccuracyPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Bme68xBsec2IaqAccuracyProps {
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
    availability?: Bme68xBsec2IaqAccuracyPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Bme68xBsec2IaqAccuracyPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DalyBmsStatusPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DalyBmsStatusPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DalyBmsStatusProps {
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
    availability?: DalyBmsStatusPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DalyBmsStatusPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DebugDevicePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DebugDevicePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DebugDeviceProps {
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
    availability?: DebugDevicePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DebugDevicePropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DebugResetReasonPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DebugResetReasonPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DebugResetReasonProps {
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
    availability?: DebugResetReasonPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DebugResetReasonPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DlmsMeterTimestampPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DlmsMeterTimestampPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DlmsMeterTimestampProps {
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
    availability?: DlmsMeterTimestampPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DlmsMeterTimestampPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DlmsMeterMeternumberPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DlmsMeterMeternumberPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DlmsMeterMeternumberProps {
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
    availability?: DlmsMeterMeternumberPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DlmsMeterMeternumberPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DsmrIdentificationPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DsmrIdentificationPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DsmrIdentificationProps {
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
    availability?: DsmrIdentificationPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DsmrIdentificationPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DsmrP1VersionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DsmrP1VersionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DsmrP1VersionProps {
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
    availability?: DsmrP1VersionPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DsmrP1VersionPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DsmrP1VersionBePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DsmrP1VersionBePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DsmrP1VersionBeProps {
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
    availability?: DsmrP1VersionBePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DsmrP1VersionBePropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DsmrTimestampPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DsmrTimestampPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DsmrTimestampProps {
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
    availability?: DsmrTimestampPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DsmrTimestampPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DsmrElectricityTariffPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DsmrElectricityTariffPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DsmrElectricityTariffProps {
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
    availability?: DsmrElectricityTariffPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DsmrElectricityTariffPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DsmrElectricityFailureLogPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DsmrElectricityFailureLogPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DsmrElectricityFailureLogProps {
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
    availability?: DsmrElectricityFailureLogPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DsmrElectricityFailureLogPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DsmrMessageShortPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DsmrMessageShortPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DsmrMessageShortProps {
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
    availability?: DsmrMessageShortPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DsmrMessageShortPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DsmrMessageLongPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DsmrMessageLongPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DsmrMessageLongProps {
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
    availability?: DsmrMessageLongPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DsmrMessageLongPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DsmrEquipmentIdPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DsmrEquipmentIdPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DsmrEquipmentIdProps {
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
    availability?: DsmrEquipmentIdPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DsmrEquipmentIdPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DsmrGasEquipmentIdPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DsmrGasEquipmentIdPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DsmrGasEquipmentIdProps {
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
    availability?: DsmrGasEquipmentIdPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DsmrGasEquipmentIdPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DsmrGasEquipmentIdBePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DsmrGasEquipmentIdBePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DsmrGasEquipmentIdBeProps {
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
    availability?: DsmrGasEquipmentIdBePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DsmrGasEquipmentIdBePropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DsmrThermalEquipmentIdPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DsmrThermalEquipmentIdPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DsmrThermalEquipmentIdProps {
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
    availability?: DsmrThermalEquipmentIdPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DsmrThermalEquipmentIdPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DsmrWaterEquipmentIdPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DsmrWaterEquipmentIdPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DsmrWaterEquipmentIdProps {
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
    availability?: DsmrWaterEquipmentIdPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DsmrWaterEquipmentIdPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DsmrSubEquipmentIdPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DsmrSubEquipmentIdPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DsmrSubEquipmentIdProps {
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
    availability?: DsmrSubEquipmentIdPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DsmrSubEquipmentIdPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DsmrGasDeliveredTextPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DsmrGasDeliveredTextPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DsmrGasDeliveredTextProps {
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
    availability?: DsmrGasDeliveredTextPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DsmrGasDeliveredTextPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DsmrFwCoreChecksumPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DsmrFwCoreChecksumPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DsmrFwCoreChecksumProps {
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
    availability?: DsmrFwCoreChecksumPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DsmrFwCoreChecksumPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DsmrFwCoreVersionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DsmrFwCoreVersionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DsmrFwCoreVersionProps {
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
    availability?: DsmrFwCoreVersionPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DsmrFwCoreVersionPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DsmrFwModuleChecksumPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DsmrFwModuleChecksumPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DsmrFwModuleChecksumProps {
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
    availability?: DsmrFwModuleChecksumPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DsmrFwModuleChecksumPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DsmrFwModuleVersionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DsmrFwModuleVersionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DsmrFwModuleVersionProps {
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
    availability?: DsmrFwModuleVersionPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DsmrFwModuleVersionPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface DsmrTelegramPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DsmrTelegramPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DsmrTelegramProps {
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
    availability?: DsmrTelegramPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DsmrTelegramPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface EzoPmpDosingModePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface EzoPmpDosingModePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface EzoPmpDosingModeProps {
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
    availability?: EzoPmpDosingModePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: EzoPmpDosingModePropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface EzoPmpCalibrationStatusPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface EzoPmpCalibrationStatusPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface EzoPmpCalibrationStatusProps {
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
    availability?: EzoPmpCalibrationStatusPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: EzoPmpCalibrationStatusPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface Gdk101VersionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Gdk101VersionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Gdk101VersionProps {
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
    availability?: Gdk101VersionPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Gdk101VersionPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface HaierCleaningStatusPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface HaierCleaningStatusPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface HaierCleaningStatusProps {
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
    availability?: HaierCleaningStatusPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: HaierCleaningStatusPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface HaierProtocolVersionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface HaierProtocolVersionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface HaierProtocolVersionProps {
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
    availability?: HaierProtocolVersionPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: HaierProtocolVersionPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface HaierApplianceNamePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface HaierApplianceNamePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface HaierApplianceNameProps {
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
    availability?: HaierApplianceNamePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: HaierApplianceNamePropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface HlkFm22xVersionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface HlkFm22xVersionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface HlkFm22xVersionProps {
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
    availability?: HlkFm22xVersionPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: HlkFm22xVersionPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface HlkFm22xLastFaceNamePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface HlkFm22xLastFaceNamePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface HlkFm22xLastFaceNameProps {
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
    availability?: HlkFm22xLastFaceNamePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: HlkFm22xLastFaceNamePropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface Ld2410VersionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2410VersionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2410VersionProps {
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
    availability?: Ld2410VersionPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Ld2410VersionPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface Ld2410MacAddressPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2410MacAddressPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2410MacAddressProps {
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
    availability?: Ld2410MacAddressPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Ld2410MacAddressPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface Ld2412VersionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2412VersionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2412VersionProps {
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
    availability?: Ld2412VersionPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Ld2412VersionPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface Ld2412MacAddressPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2412MacAddressPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2412MacAddressProps {
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
    availability?: Ld2412MacAddressPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Ld2412MacAddressPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface Ld2420FwVersionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2420FwVersionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2420FwVersionProps {
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
    availability?: Ld2420FwVersionPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Ld2420FwVersionPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface Ld2450VersionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2450VersionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2450VersionProps {
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
    availability?: Ld2450VersionPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Ld2450VersionPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface Ld2450MacAddressPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2450MacAddressPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2450MacAddressProps {
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
    availability?: Ld2450MacAddressPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Ld2450MacAddressPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface Ld2450Target1PropsDirectionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2450Target1PropsDirectionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2450Target1PropsDirectionProps {
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
    availability?: Ld2450Target1PropsDirectionPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Ld2450Target1PropsDirectionPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface Ld2450Target1Props {
    direction?: Ld2450Target1PropsDirectionProps;
}
interface Ld2450Target2PropsDirectionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2450Target2PropsDirectionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2450Target2PropsDirectionProps {
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
    availability?: Ld2450Target2PropsDirectionPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Ld2450Target2PropsDirectionPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface Ld2450Target2Props {
    direction?: Ld2450Target2PropsDirectionProps;
}
interface Ld2450Target3PropsDirectionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2450Target3PropsDirectionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2450Target3PropsDirectionProps {
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
    availability?: Ld2450Target3PropsDirectionPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Ld2450Target3PropsDirectionPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface Ld2450Target3Props {
    direction?: Ld2450Target3PropsDirectionProps;
}
interface LibretinyVersionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface LibretinyVersionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface LibretinyVersionProps {
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
    availability?: LibretinyVersionPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: LibretinyVersionPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface MicronovaStoveStatePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface MicronovaStoveStatePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface MicronovaStoveStateProps {
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
    availability?: MicronovaStoveStatePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: MicronovaStoveStatePropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** @yamlKey micronova_id */
    micronovaId?: RefProp<micronova_MicroNova>;
    /** @yamlKey memory_location */
    memoryLocation?: unknown;
    /** @yamlKey memory_address */
    memoryAddress?: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface Msa3xxOrientationXyPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Msa3xxOrientationXyPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Msa3xxOrientationXyProps {
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
    availability?: Msa3xxOrientationXyPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Msa3xxOrientationXyPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface Msa3xxOrientationZPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Msa3xxOrientationZPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Msa3xxOrientationZProps {
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
    availability?: Msa3xxOrientationZPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Msa3xxOrientationZPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface PipsolarDeviceModePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarDeviceModePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarDeviceModeProps {
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
    availability?: PipsolarDeviceModePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarDeviceModePropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface PipsolarLastQpigsPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarLastQpigsPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarLastQpigsProps {
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
    availability?: PipsolarLastQpigsPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarLastQpigsPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface PipsolarLastQpiriPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarLastQpiriPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarLastQpiriProps {
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
    availability?: PipsolarLastQpiriPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarLastQpiriPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface PipsolarLastQmodPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarLastQmodPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarLastQmodProps {
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
    availability?: PipsolarLastQmodPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarLastQmodPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface PipsolarLastQflagPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarLastQflagPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarLastQflagProps {
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
    availability?: PipsolarLastQflagPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarLastQflagPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface PipsolarLastQpiwsPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarLastQpiwsPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarLastQpiwsProps {
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
    availability?: PipsolarLastQpiwsPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarLastQpiwsPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface PipsolarLastQtPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarLastQtPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarLastQtProps {
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
    availability?: PipsolarLastQtPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarLastQtPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface PipsolarLastQmnPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarLastQmnPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarLastQmnProps {
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
    availability?: PipsolarLastQmnPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarLastQmnPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface PylontechBaseStatePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PylontechBaseStatePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PylontechBaseStateProps {
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
    availability?: PylontechBaseStatePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PylontechBaseStatePropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface PylontechVoltageStatePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PylontechVoltageStatePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PylontechVoltageStateProps {
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
    availability?: PylontechVoltageStatePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PylontechVoltageStatePropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface PylontechCurrentStatePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PylontechCurrentStatePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PylontechCurrentStateProps {
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
    availability?: PylontechCurrentStatePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PylontechCurrentStatePropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface PylontechTemperatureStatePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PylontechTemperatureStatePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PylontechTemperatureStateProps {
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
    availability?: PylontechTemperatureStatePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PylontechTemperatureStatePropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface SeeedMr24hpc1HeartBeatPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SeeedMr24hpc1HeartBeatPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SeeedMr24hpc1HeartBeatProps {
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
    availability?: SeeedMr24hpc1HeartBeatPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1HeartBeatPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface SeeedMr24hpc1ProductModelPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SeeedMr24hpc1ProductModelPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SeeedMr24hpc1ProductModelProps {
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
    availability?: SeeedMr24hpc1ProductModelPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1ProductModelPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface SeeedMr24hpc1ProductIdPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SeeedMr24hpc1ProductIdPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SeeedMr24hpc1ProductIdProps {
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
    availability?: SeeedMr24hpc1ProductIdPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1ProductIdPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface SeeedMr24hpc1HardwareModelPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SeeedMr24hpc1HardwareModelPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SeeedMr24hpc1HardwareModelProps {
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
    availability?: SeeedMr24hpc1HardwareModelPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1HardwareModelPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface SeeedMr24hpc1HardwareVersionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SeeedMr24hpc1HardwareVersionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SeeedMr24hpc1HardwareVersionProps {
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
    availability?: SeeedMr24hpc1HardwareVersionPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1HardwareVersionPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface SeeedMr24hpc1KeepAwayPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SeeedMr24hpc1KeepAwayPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SeeedMr24hpc1KeepAwayProps {
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
    availability?: SeeedMr24hpc1KeepAwayPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1KeepAwayPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface SeeedMr24hpc1MotionStatusPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SeeedMr24hpc1MotionStatusPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SeeedMr24hpc1MotionStatusProps {
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
    availability?: SeeedMr24hpc1MotionStatusPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1MotionStatusPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface SeeedMr24hpc1CustomModeEndPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SeeedMr24hpc1CustomModeEndPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SeeedMr24hpc1CustomModeEndProps {
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
    availability?: SeeedMr24hpc1CustomModeEndPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1CustomModeEndPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface SunGtil2StatePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SunGtil2StatePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SunGtil2StateProps {
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
    availability?: SunGtil2StatePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: SunGtil2StatePropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface SunGtil2SerialNumberPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SunGtil2SerialNumberPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SunGtil2SerialNumberProps {
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
    availability?: SunGtil2SerialNumberPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: SunGtil2SerialNumberPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface Sy6970BusStatusPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Sy6970BusStatusPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Sy6970BusStatusProps {
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
    availability?: Sy6970BusStatusPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Sy6970BusStatusPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface Sy6970ChargeStatusPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Sy6970ChargeStatusPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Sy6970ChargeStatusProps {
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
    availability?: Sy6970ChargeStatusPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Sy6970ChargeStatusPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface Sy6970NtcStatusPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Sy6970NtcStatusPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Sy6970NtcStatusProps {
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
    availability?: Sy6970NtcStatusPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Sy6970NtcStatusPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface UptimeFormatProps {
    /** string: The string to use for the days element. Defaults to `d`. */
    days?: string | EmbedValue<string>;
    /** string: The string to use for the hours element. Defaults to `h`. */
    hours?: string | EmbedValue<string>;
    /** string: The string to use for the minutes element. Defaults to `m`. */
    minutes?: string | EmbedValue<string>;
    /** string: The string to use for the seconds element. Defaults to `s`. */
    seconds?: string | EmbedValue<string>;
    /** string: The separator to use between the uptime values. Defaults to the empty string. */
    separator?: string | EmbedValue<string>;
    /** boolean: If set, the text will always include all elements, even if they are zero. Defaults to `false`. */
    expand?: boolean | EmbedValue<boolean>;
}
interface WireguardAddressPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface WireguardAddressPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface WireguardAddressProps {
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
    availability?: WireguardAddressPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: WireguardAddressPropsWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface TextSensorBaseProps extends _CoreEntityBase, _CoreMqttComponent {
    /** @yamlKey web_server */
    webServer?: TextSensorWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey on_raw_value */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
}
interface BleScannerProps extends _CoreComponent {
    /** @yamlKey esp32_ble_id */
    esp32BleId?: RefProp<esp32_ble_tracker_ESP32BLETracker>;
}
interface EthernetInfoProps {
    /**
     * Expose the IP Address of the ESP as a text sensor. All options from [Text Sensor](/components/text_sensor#config-text...
     * @yamlKey ip_address
     */
    ipAddress?: EthernetInfoIpAddressProps;
    /**
     * Expose the DNS Address of the ESP as text sensor. [Text Sensor](/components/text_sensor#config-text_sensor).
     * @yamlKey dns_address
     */
    dnsAddress?: EthernetInfoDnsAddressProps;
    /**
     * Expose the MAC Address of the ESP as text sensor. [Text Sensor](/components/text_sensor#config-text_sensor).
     * @yamlKey mac_address
     */
    macAddress?: EthernetInfoMacAddressProps;
}
interface OpenthreadInfoProps {
    /**
     * Expose the off-mesh routable IPv6 address of the Thread device as a text sensor. This is the address used for communi...
     * @yamlKey ip_address
     */
    ipAddress?: OpenthreadInfoIpAddressProps;
    /** Expose the current device role in the Thread network (Leader, Router, Child, Detached, etc.) as a text sensor. All op... */
    role?: OpenthreadInfoRoleProps;
    /** Expose the Router Locator (RLOC16) address as a text sensor. This is a 16-bit address used for routing within the Thr... */
    rloc16?: OpenthreadInfoRloc16Props;
    /**
     * Expose the IEEE 802.15.4 Extended MAC address as a text sensor. All options from [Text Sensor](/components/text_senso...
     * @yamlKey ext_addr
     */
    extAddr?: OpenthreadInfoExtAddrProps;
    /** Expose the EUI-64 address as a text sensor. This is the unique 64-bit identifier for the device. All options from [Te... */
    eui64?: OpenthreadInfoEui64Props;
    /** Expose the Thread network channel (11-26) as a text sensor. All options from [Text Sensor](/components/text_sensor#co... */
    channel?: OpenthreadInfoChannelProps;
    /**
     * Expose the Thread network name as a text sensor. All options from [Text Sensor](/components/text_sensor#config-text_s...
     * @yamlKey network_name
     */
    networkName?: OpenthreadInfoNetworkNameProps;
    /**
     * Expose the Thread network key as a text sensor. All options from [Text Sensor](/components/text_sensor#config-text_se...
     * @yamlKey network_key
     */
    networkKey?: OpenthreadInfoNetworkKeyProps;
    /**
     * Expose the Personal Area Network ID (PAN ID) as a text sensor. This is a 16-bit identifier for the Thread network. Al...
     * @yamlKey pan_id
     */
    panId?: OpenthreadInfoPanIdProps;
    /**
     * Expose the Extended PAN ID as a text sensor. This is a 64-bit extended identifier for the Thread network. All options...
     * @yamlKey ext_pan_id
     */
    extPanId?: OpenthreadInfoExtPanIdProps;
}
interface VersionProps extends _CoreComponent {
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /**
     * boolean: Allows you to hide the config hash from the version string. Defaults to `false`.
     * @yamlKey hide_hash
     */
    hideHash?: boolean | EmbedValue<boolean>;
    /**
     * boolean: Allows you to hide the compilation timestamp from the version string. Defaults to `false`.
     * @yamlKey hide_timestamp
     */
    hideTimestamp?: boolean | EmbedValue<boolean>;
}
interface WifiInfoProps {
    /**
     * Expose the IP Address of the device as a text sensor. All options from [Text Sensor](/components/text_sensor#config-t...
     * @yamlKey ip_address
     */
    ipAddress?: WifiInfoIpAddressProps;
    /**
     * Expose the latest networks found during the latest scan. All options from [Text Sensor](/components/text_sensor#confi...
     * @yamlKey scan_results
     */
    scanResults?: WifiInfoScanResultsProps;
    /** Expose the SSID of the currently connected WiFi network as a text sensor. All options from [Text Sensor](/components/... */
    ssid?: WifiInfoSsidProps;
    /** Expose the BSSID of the currently connected WiFi network as a text sensor. All options from [Text Sensor](/components... */
    bssid?: WifiInfoBssidProps;
    /**
     * Expose the Mac Address of the WiFi card. All options from [Text Sensor](/components/text_sensor#config-text_sensor).
     * @yamlKey mac_address
     */
    macAddress?: WifiInfoMacAddressProps;
    /**
     * Expose the DNS Address of the device as text sensor. [Text Sensor](/components/text_sensor#config-text_sensor).
     * @yamlKey dns_address
     */
    dnsAddress?: WifiInfoDnsAddressProps;
    /** @yamlKey power_save_mode */
    powerSaveMode?: WifiInfoPowerSaveModeProps;
}
interface Wl134Props extends _UartDevice {
    icon?: unknown;
    /** boolean: Reset the text sensor state back to "" 1s after reading a tag. Defaults to `false`. */
    reset?: boolean | EmbedValue<boolean>;
}
interface Atm90e32Props {
    /** [ID](/guides/configuration-types#id): The ID of the `atm90e32` sensor defined above. Required if using more than one ... */
    id?: RefProp<atm90e32_ATM90E32Component>;
    /**
     * Enables per-phase status conditions:
     * @yamlKey phase_status
     */
    phaseStatus?: Atm90e32PhaseStatusProps;
    /**
     * Reports status based on frequency thresholds.
     * @yamlKey frequency_status
     */
    frequencyStatus?: Atm90e32FrequencyStatusProps;
}
interface BleClientProps extends _CoreComponent, _BleClient {
    /** @yamlKey service_uuid */
    serviceUuid: unknown;
    /** @yamlKey characteristic_uuid */
    characteristicUuid: unknown;
    /** @yamlKey descriptor_uuid */
    descriptorUuid?: unknown;
    notify?: boolean | EmbedValue<boolean>;
    /** @yamlKey on_notify */
    onNotify?: TriggerHandler;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface Bme680BsecProps {
    /**
     * [ID](/guides/configuration-types#id): Sets the ID of the bme680_bsec component to refer to. Useful when working with ...
     * @yamlKey bme680_bsec_id
     */
    bme680BsecId?: RefProp<bme680_bsec_BME680BSECComponent>;
    /**
     * The information for the IAQ accuracy sensor. Shows: Stabilizing, Uncertain, Calibrating, Calibrated.
     * @yamlKey iaq_accuracy
     */
    iaqAccuracy?: Bme680BsecIaqAccuracyProps;
}
interface Bme68xBsec2Props {
    /**
     * [ID](/guides/configuration-types#id): The ID of the `bme68x_bsec2_i2c` component the text sensor will refer to. Usefu...
     * @yamlKey bme68x_bsec2_id
     */
    bme68xBsec2Id?: RefProp<bme68x_bsec2_BME68xBSEC2Component>;
    /**
     * Configuration for the IAQ accuracy sensor. Shows: `Stabilizing`, `Uncertain`, `Calibrating`, `Calibrated`.
     * @yamlKey iaq_accuracy
     */
    iaqAccuracy?: Bme68xBsec2IaqAccuracyProps;
}
interface CopyProps extends _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): The text sensor that should be mirrored.
     * @yamlKey source_id
     */
    sourceId: RefProp<text_sensor_TextSensor>;
}
interface DalyBmsProps extends _CoreComponent {
    /** @yamlKey bms_daly_id */
    bmsDalyId?: RefProp<daly_bms_DalyBmsComponent>;
    /** The BMS Status (Charging, Discharging, Stationary). All options from [Text Sensor](/components/text_sensor#config-tex... */
    status?: DalyBmsStatusProps;
}
interface DebugProps {
    /** @yamlKey debug_id */
    debugId?: RefProp<debug_DebugComponent>;
    device?: DebugDeviceProps;
    /** @yamlKey reset_reason */
    resetReason?: DebugResetReasonProps;
}
interface DlmsMeterProps extends _CoreComponent {
    /** @yamlKey dlms_meter_id */
    dlmsMeterId?: RefProp<dlms_meter_DlmsMeterComponent>;
    timestamp?: DlmsMeterTimestampProps;
    meternumber?: DlmsMeterMeternumberProps;
}
interface DsmrProps extends _CoreComponent {
    /** @yamlKey dsmr_id */
    dsmrId?: RefProp<esphome_dsmr_Dsmr>;
    identification?: DsmrIdentificationProps;
    /** @yamlKey p1_version */
    p1Version?: DsmrP1VersionProps;
    /** @yamlKey p1_version_be */
    p1VersionBe?: DsmrP1VersionBeProps;
    timestamp?: DsmrTimestampProps;
    /** @yamlKey electricity_tariff */
    electricityTariff?: DsmrElectricityTariffProps;
    /** @yamlKey electricity_failure_log */
    electricityFailureLog?: DsmrElectricityFailureLogProps;
    /** @yamlKey message_short */
    messageShort?: DsmrMessageShortProps;
    /** @yamlKey message_long */
    messageLong?: DsmrMessageLongProps;
    /** @yamlKey equipment_id */
    equipmentId?: DsmrEquipmentIdProps;
    /** @yamlKey gas_equipment_id */
    gasEquipmentId?: DsmrGasEquipmentIdProps;
    /** @yamlKey gas_equipment_id_be */
    gasEquipmentIdBe?: DsmrGasEquipmentIdBeProps;
    /** @yamlKey thermal_equipment_id */
    thermalEquipmentId?: DsmrThermalEquipmentIdProps;
    /** @yamlKey water_equipment_id */
    waterEquipmentId?: DsmrWaterEquipmentIdProps;
    /** @yamlKey sub_equipment_id */
    subEquipmentId?: DsmrSubEquipmentIdProps;
    /** @yamlKey gas_delivered_text */
    gasDeliveredText?: DsmrGasDeliveredTextProps;
    /** @yamlKey fw_core_checksum */
    fwCoreChecksum?: DsmrFwCoreChecksumProps;
    /** @yamlKey fw_core_version */
    fwCoreVersion?: DsmrFwCoreVersionProps;
    /** @yamlKey fw_module_checksum */
    fwModuleChecksum?: DsmrFwModuleChecksumProps;
    /** @yamlKey fw_module_version */
    fwModuleVersion?: DsmrFwModuleVersionProps;
    telegram?: DsmrTelegramProps;
}
interface EzoPmpProps {
    id?: RefProp<ezo_pmp_EzoPMP>;
    /** @yamlKey dosing_mode */
    dosingMode?: EzoPmpDosingModeProps;
    /** @yamlKey calibration_status */
    calibrationStatus?: EzoPmpCalibrationStatusProps;
}
interface Gdk101Props {
    /** @yamlKey gdk101_id */
    gdk101Id?: RefProp<gdk101_GDK101Component>;
    /** Firmware version of the module. All options from [Text Sensor](/components/text_sensor#config-text_sensor). */
    version: Gdk101VersionProps;
}
interface HaierProps {
    /**
     * [ID](/guides/configuration-types#id): The id of haier climate component
     * @yamlKey haier_id
     */
    haierId?: RefProp<haier_HonClimate>;
    /**
     * A text sensor that indicates cleaning status. Possible values "No cleaning", "Self clean", "56°C Steri-Clean". All op...
     * @yamlKey cleaning_status
     */
    cleaningStatus?: HaierCleaningStatusProps;
    /**
     * A text sensor that indicates Haier protocol version. All options from [Text Sensor](/components/text_sensor#config-te...
     * @yamlKey protocol_version
     */
    protocolVersion?: HaierProtocolVersionProps;
    /**
     * A text sensor that indicates Haier appliance name. All options from [Text Sensor](/components/text_sensor#config-text...
     * @yamlKey appliance_name
     */
    applianceName?: HaierApplianceNameProps;
}
interface HlkFm22xProps {
    /** @yamlKey hlk_fm22x_id */
    hlkFm22xId?: RefProp<hlk_fm22x_HlkFm22xComponent>;
    version?: HlkFm22xVersionProps;
    /** @yamlKey last_face_name */
    lastFaceName?: HlkFm22xLastFaceNameProps;
}
interface HomeassistantProps extends _HomeassistantHomeAssistantImport {
}
interface KeyCollectorProps {
    id?: unknown;
    /** @yamlKey source_id */
    sourceId?: RefProp<key_collector_KeyCollector>;
}
interface Ld2410Props {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID for the [Ld2410](/components/sensor/ld2410/) component ...
     * @yamlKey ld2410_id
     */
    ld2410Id?: RefProp<ld2410_LD2410Component>;
    /** The firmware version. All options from [Text Sensor](/components/text_sensor#config-text_sensor). */
    version?: Ld2410VersionProps;
    /**
     * The bluetooth mac address. Will be set to `unknown` when bluetooth is off. All options from [Text Sensor](/components...
     * @yamlKey mac_address
     */
    macAddress?: Ld2410MacAddressProps;
}
interface Ld2412Props {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID for the component. Required when using multiple compone...
     * @yamlKey ld2412_id
     */
    ld2412Id?: RefProp<ld2412_LD2412Component>;
    /** The firmware version. All options from [Text Sensor](/components/text_sensor#config-text_sensor). */
    version?: Ld2412VersionProps;
    /**
     * The bluetooth mac address. Will be set to `unknown` when bluetooth is off. All options from [Text Sensor](/components...
     * @yamlKey mac_address
     */
    macAddress?: Ld2412MacAddressProps;
}
interface Ld2420Props extends _CoreComponent {
    /** @yamlKey ld2420_id */
    ld2420Id?: RefProp<ld2420_LD2420Component>;
    /**
     * Allows you to retrieve the [Ld2420](/components/sensor/ld2420/) firmware version. May contain any options from [Text ...
     * @yamlKey fw_version
     */
    fwVersion?: Ld2420FwVersionProps;
}
interface Ld2450Props {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID for the [Ld2450](/components/sensor/ld2450/) component.
     * @yamlKey ld2450_id
     */
    ld2450Id?: RefProp<ld2450_LD2450Component>;
    /** The `ld2450` firmware version. All options from [Text Sensor](/components/text_sensor#config-text_sensor). */
    version?: Ld2450VersionProps;
    /**
     * The `ld2450` Bluetooth MAC address. All options from [Text Sensor](/components/text_sensor#config-text_sensor).
     * @yamlKey mac_address
     */
    macAddress?: Ld2450MacAddressProps;
    /** @yamlKey target_1 */
    target1?: Ld2450Target1Props;
    /** @yamlKey target_2 */
    target2?: Ld2450Target2Props;
    /** @yamlKey target_3 */
    target3?: Ld2450Target3Props;
}
interface LibretinyProps {
    libretiny?: RefProp<libretiny_LTComponent>;
    version?: LibretinyVersionProps;
}
interface LvglProps {
    id?: unknown;
    widget: RefProp<unknown>;
}
interface MicronovaProps {
    /** @yamlKey micronova_id */
    micronovaId?: RefProp<micronova_MicroNova>;
    /** @yamlKey stove_state */
    stoveState?: MicronovaStoveStateProps;
}
interface ModbusControllerProps extends _CoreComponent, _ModbusControllerModbusitembaseschema {
    /** @yamlKey register_type */
    registerType?: "custom" | "coil" | "holding" | "discrete_input" | "read";
    /** @yamlKey register_count */
    registerCount?: number | EmbedValue<number>;
    /** @yamlKey raw_encode */
    rawEncode?: "NONE" | "HEXBYTES" | "COMMA" | "ANSI";
}
interface MqttSubscribeProps extends _CoreComponent {
    /** @yamlKey mqtt_parent_id */
    mqttParentId?: RefProp<mqtt_MQTTClientComponent>;
    /** string: The MQTT topic to listen for string data. */
    topic: string;
    /** int: The MQTT QoS to subscribe with. Defaults to `0`. */
    qos?: number;
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
     * [Time](/guides/configuration-types#time): The duration to update the sensor. If using a [Nextion Custom Text Sensor P...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
    /**
     * [ID](/guides/configuration-types#id): The ID of the Nextion display.
     * @yamlKey nextion_id
     */
    nextionId?: RefProp<nextion_Nextion>;
    /**
     * [Color](/components/display#config-color): The background color
     * @yamlKey background_color
     */
    backgroundColor?: RefProp<Color>;
    /**
     * [Color](/components/display#config-color): The foreground color
     * @yamlKey foreground_color
     */
    foregroundColor?: RefProp<Color>;
    /** boolean: Visible or not */
    visible?: boolean | EmbedValue<boolean>;
    /**
     * string: The name of the Nextion component.
     * @yamlKey component_name
     */
    componentName: string;
    /**
     * int: The font id for the component
     * @yamlKey font_id
     */
    fontId?: number | EmbedValue<number>;
}
interface PipsolarProps extends _PipsolarComponent {
    /**
     * device mode response
     * @yamlKey device_mode
     */
    deviceMode?: PipsolarDeviceModeProps;
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
     * last qmod reponse
     * @yamlKey last_qmod
     */
    lastQmod?: PipsolarLastQmodProps;
    /**
     * last qflag reponse
     * @yamlKey last_qflag
     */
    lastQflag?: PipsolarLastQflagProps;
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
    /**
     * last qmn reponse
     * @yamlKey last_qmn
     */
    lastQmn?: PipsolarLastQmnProps;
}
interface PylontechProps extends _PylontechComponent {
    /**
     * Base state. Usually reads `Dischg`, `Charge` or `Idle`. All options from [Text Sensor](/components/text_sensor#config...
     * @yamlKey base_state
     */
    baseState?: PylontechBaseStateProps;
    /**
     * Voltage state. Usually reads `Normal`. All options from [Text Sensor](/components/text_sensor#config-text_sensor).
     * @yamlKey voltage_state
     */
    voltageState?: PylontechVoltageStateProps;
    /**
     * Current state. Usually reads `Normal`. All options from [Text Sensor](/components/text_sensor#config-text_sensor).
     * @yamlKey current_state
     */
    currentState?: PylontechCurrentStateProps;
    /**
     * Temperature state. Usually reads `Normal`. All options from [Text Sensor](/components/text_sensor#config-text_sensor).
     * @yamlKey temperature_state
     */
    temperatureState?: PylontechTemperatureStateProps;
}
interface SeeedMr24hpc1Props {
    /** @yamlKey mr24hpc1_id */
    mr24hpc1Id?: RefProp<seeed_mr24hpc1_MR24HPC1Component>;
    /**
     * Sensor operating status indicator. All options from [Text Sensor](/components/text_sensor#config-text_sensor).
     * @yamlKey heart_beat
     */
    heartBeat?: SeeedMr24hpc1HeartBeatProps;
    /**
     * The product model. All options from [Text Sensor](/components/text_sensor#config-text_sensor).
     * @yamlKey product_model
     */
    productModel?: SeeedMr24hpc1ProductModelProps;
    /**
     * The product ID. All options from [Text Sensor](/components/text_sensor#config-text_sensor).
     * @yamlKey product_id
     */
    productId?: SeeedMr24hpc1ProductIdProps;
    /**
     * The hardware model. All options from [Text Sensor](/components/text_sensor#config-text_sensor).
     * @yamlKey hardware_model
     */
    hardwareModel?: SeeedMr24hpc1HardwareModelProps;
    /**
     * The hardware version. All options from [Text Sensor](/components/text_sensor#config-text_sensor).
     * @yamlKey hardware_version
     */
    hardwareVersion?: SeeedMr24hpc1HardwareVersionProps;
    /**
     * Indicator for detecting objects approaching or moving away. All options from [Text Sensor](/components/text_sensor#co...
     * @yamlKey keep_away
     */
    keepAway?: SeeedMr24hpc1KeepAwayProps;
    /**
     * An indicator that detects the movement or stationarity of an object. All options from [Text Sensor](/components/text_...
     * @yamlKey motion_status
     */
    motionStatus?: SeeedMr24hpc1MotionStatusProps;
    /**
     * Used to indicate whether or not the current radar is in a customised mode amongst the setup functions. There are thre...
     * @yamlKey custom_mode_end
     */
    customModeEnd?: SeeedMr24hpc1CustomModeEndProps;
}
interface SmlProps {
    /**
     * [ID](/guides/configuration-types#id): The ID of the [SML platform](https://esphome.io/components/sml#sml-platform)
     * @yamlKey sml_id
     */
    smlId?: RefProp<sml_Sml>;
    /**
     * string: Specify the OBIS code you want to retrieve data for from the device. The format must be (A-B:C.D.E, e.g. 1-0:...
     * @yamlKey obis_code
     */
    obisCode: string;
    /**
     * string: Specify the device's server_id to retrieve the OBIS code from. Should be specified if more then one device is...
     * @yamlKey server_id
     */
    serverId?: string | EmbedValue<string>;
    /** string: Override the automatic interpretation of the transmitted binary data value. Possible values (`int`, `uint`, `... */
    format?: "text" | "bool" | "int" | "uint" | "hex" | "";
}
interface SunProps extends _CoreComponent {
    /** @yamlKey sun_id */
    sunId?: RefProp<sun_Sun>;
    /** string: The type of value to track. One of `sunrise` and `sunset`. */
    type: "sunset" | "sunrise";
    /** float: The elevation to calculate the next sunrise/sunset event for. Defaults to -0.833° (the horizon, slightly less ... */
    elevation?: number;
    /** string: The format to format the time value with, see [strftime](/components/time#strftime) for more information. Def... */
    format?: string | EmbedValue<string>;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface SunGtil2Props extends _CoreComponent {
    /**
     * Manually specify the ID of the sun_gtil2 instance if there are multiple.
     * @yamlKey sun_gtil2_id
     */
    sunGtil2Id?: RefProp<sun_gtil2_SunGTIL2>;
    /** The inverter's state. All options from [Text Sensor](/components/text_sensor#config-text_sensor). */
    state?: SunGtil2StateProps;
    /**
     * The inverter's serial number. All options from [Text Sensor](/components/text_sensor#config-text_sensor).
     * @yamlKey serial_number
     */
    serialNumber?: SunGtil2SerialNumberProps;
}
interface Sy6970Props {
    /** @yamlKey sy6970_id */
    sy6970Id?: RefProp<sy6970_SY6970Component>;
    /** @yamlKey bus_status */
    busStatus?: Sy6970BusStatusProps;
    /** @yamlKey charge_status */
    chargeStatus?: Sy6970ChargeStatusProps;
    /** @yamlKey ntc_status */
    ntcStatus?: Sy6970NtcStatusProps;
}
interface TeleinfoProps extends _TeleinfoListener {
}
interface TemplateProps extends _CoreComponent {
    /** [lambda](/automations/templates#config-lambda): Lambda to be evaluated every update interval to get the new value of ... */
    lambda?: unknown;
    /**
     * [Time](/guides/configuration-types#time): The interval to check the text sensor. Set to `never` to disable updates. D...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
interface TuyaProps extends _CoreComponent {
    /** @yamlKey tuya_id */
    tuyaId?: RefProp<tuya_Tuya>;
    /** @yamlKey sensor_datapoint */
    sensorDatapoint: number | EmbedValue<number>;
}
interface UptimeProps extends _CoreComponent {
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** list: Allows the customization of the output format. The following options are available: */
    format?: UptimeFormatProps;
    /**
     * [Time](/guides/configuration-types#time): The sensor reporting interval. Defaults to `30s`.
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
interface WireguardProps {
    /** @yamlKey wireguard_id */
    wireguardId?: RefProp<wireguard_Wireguard>;
    address?: WireguardAddressProps;
}
export type TextSensorProps = (TextSensorBaseProps & {
    platform: "ble_scanner";
} & BleScannerProps & ComponentProps<ble_scanner_BLEScanner>) | (TextSensorBaseProps & {
    platform: "ethernet_info";
} & EthernetInfoProps & ComponentProps<text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "openthread_info";
} & OpenthreadInfoProps & ComponentProps<text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "version";
} & VersionProps & ComponentProps<version_VersionTextSensor>) | (TextSensorBaseProps & {
    platform: "wifi_info";
} & WifiInfoProps & ComponentProps<text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "wl_134";
} & Wl134Props & ComponentProps<wl_134_Wl134Component>) | (TextSensorBaseProps & {
    platform: "atm90e32";
} & Atm90e32Props & ComponentProps<text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "ble_client";
} & BleClientProps & ComponentProps<ble_client_BLETextSensor>) | (TextSensorBaseProps & {
    platform: "bme680_bsec";
} & Bme680BsecProps & ComponentProps<text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "bme68x_bsec2";
} & Bme68xBsec2Props & ComponentProps<text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "copy";
} & CopyProps & ComponentProps<copy_CopyTextSensor>) | (TextSensorBaseProps & {
    platform: "daly_bms";
} & DalyBmsProps & ComponentProps<text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "debug";
} & DebugProps & ComponentProps<text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "dlms_meter";
} & DlmsMeterProps & ComponentProps<text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "dsmr";
} & DsmrProps & ComponentProps<text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "ezo_pmp";
} & EzoPmpProps & ComponentProps<text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "gdk101";
} & Gdk101Props & ComponentProps<text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "haier";
} & HaierProps & ComponentProps<text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "hlk_fm22x";
} & HlkFm22xProps & ComponentProps<text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "homeassistant";
} & HomeassistantProps & ComponentProps<homeassistant_HomeassistantTextSensor>) | (TextSensorBaseProps & {
    platform: "key_collector";
} & KeyCollectorProps & ComponentProps<text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "ld2410";
} & Ld2410Props & ComponentProps<EntityBase>) | (TextSensorBaseProps & {
    platform: "ld2412";
} & Ld2412Props & ComponentProps<EntityBase>) | (TextSensorBaseProps & {
    platform: "ld2420";
} & Ld2420Props & ComponentProps<ld2420_LD2420TextSensor>) | (TextSensorBaseProps & {
    platform: "ld2450";
} & Ld2450Props & ComponentProps<EntityBase>) | (TextSensorBaseProps & {
    platform: "libretiny";
} & LibretinyProps & ComponentProps<text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "lvgl";
} & LvglProps & ComponentProps<text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "micronova";
} & MicronovaProps & ComponentProps<text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "modbus_controller";
} & ModbusControllerProps & ComponentProps<modbus_controller_ModbusTextSensor>) | (TextSensorBaseProps & {
    platform: "mqtt_subscribe";
} & MqttSubscribeProps & ComponentProps<mqtt_subscribe_MQTTSubscribeTextSensor>) | (TextSensorBaseProps & {
    platform: "msa3xx";
} & Msa3xxProps & ComponentProps<text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "nextion";
} & NextionProps & ComponentProps<nextion_NextionTextSensor>) | (TextSensorBaseProps & {
    platform: "pipsolar";
} & PipsolarProps & ComponentProps<text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "pylontech";
} & PylontechProps & ComponentProps<pylontech_PylontechTextSensor>) | (TextSensorBaseProps & {
    platform: "seeed_mr24hpc1";
} & SeeedMr24hpc1Props & ComponentProps<text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "sml";
} & SmlProps & ComponentProps<sml_SmlTextSensor>) | (TextSensorBaseProps & {
    platform: "sun";
} & SunProps & ComponentProps<sun_SunTextSensor>) | (TextSensorBaseProps & {
    platform: "sun_gtil2";
} & SunGtil2Props & ComponentProps<text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "sy6970";
} & Sy6970Props & ComponentProps<text_sensor_TextSensor>) | (TextSensorBaseProps & {
    platform: "teleinfo";
} & TeleinfoProps & ComponentProps<teleinfo_TeleInfoTextSensor>) | (TextSensorBaseProps & {
    platform: "template";
} & TemplateProps & ComponentProps<template__TemplateTextSensor>) | (TextSensorBaseProps & {
    platform: "tuya";
} & TuyaProps & ComponentProps<tuya_TuyaTextSensor>) | (TextSensorBaseProps & {
    platform: "uptime";
} & UptimeProps & ComponentProps<uptime_UptimeTextSensor>) | (TextSensorBaseProps & {
    platform: "wireguard";
} & WireguardProps & ComponentProps<text_sensor_TextSensor>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            text_sensor: TextSensorProps;
        }
    }
}
