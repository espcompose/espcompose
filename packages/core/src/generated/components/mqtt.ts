// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { __marker_mqtt_MQTTClientComponent } from "../markers";
export interface MqttBirthMessageProps {
    payload: unknown;
    qos?: unknown;
    retain?: boolean;
    topic: unknown;
}
export interface MqttLogTopicProps {
    /** string: The log level to use for MQTT logs. See [Log Levels](https://esphome.io/components/logger#logger-log_levels) ... */
    level?: "DEBUG" | "ERROR" | "INFO" | "NONE" | "VERBOSE" | "VERY_VERBOSE" | "WARN";
    qos?: unknown;
    retain?: boolean;
    topic: unknown;
}
export interface MqttShutdownMessageProps {
    payload: unknown;
    qos?: unknown;
    retain?: boolean;
    topic: unknown;
}
export interface MqttWillMessageProps {
    payload: unknown;
    qos?: unknown;
    retain?: boolean;
    topic: unknown;
}
export interface MqttProps {
    /**
     * [MQTTMessage](https://esphome.io/components/mqtt#mqtt-message): The message to send when a connection to the broker i...
     * @yamlKey birth_message
     */
    birthMessage?: MqttBirthMessageProps;
    /** string: The host of your MQTT broker. */
    broker: string;
    /**
     * string: Only on ESP32. CA certificate in PEM format. See [TLS (ESP32)](https://esphome.io/components/mqtt#mqtt-tls-id...
     * @yamlKey certificate_authority
     */
    certificateAuthority?: string;
    /**
     * boolean: Whether the broker will clean the MQTT session after disconnect. Defaults to `false`.
     * @yamlKey clean_session
     */
    cleanSession?: boolean;
    /**
     * string: Only on `esp32`. Client certificate in PEM format.
     * @yamlKey client_certificate
     */
    clientCertificate?: string;
    /**
     * string: Only on `esp32`. Client private key in PEM format.
     * @yamlKey client_certificate_key
     */
    clientCertificateKey?: string;
    /**
     * string: The client id to use for opening connections. See [Defaults](https://esphome.io/components/mqtt#mqtt-defaults...
     * @yamlKey client_id
     */
    clientId?: string;
    /**
     * boolean: If Home Assistant automatic device discovery should be enabled. Defaults to `true`.
     * @yamlKey discover_ip
     */
    discoverIp?: boolean;
    /** boolean: Manually enable/disable */
    discovery?: "CLEAN";
    /**
     * string: The object_id generator to use. Can be one of `none` or `device_name`. Defaults to `none` which does not gene...
     * @yamlKey discovery_object_id_generator
     */
    discoveryObjectIdGenerator?: "device_name" | "none";
    /**
     * string: The prefix to use for Home Assistant's MQTT discovery. Should not contain trailing slash. Defaults to `homeas...
     * @yamlKey discovery_prefix
     */
    discoveryPrefix?: string;
    /**
     * boolean: Whether to retain MQTT discovery messages so that entities are added automatically on Home Assistant restart...
     * @yamlKey discovery_retain
     */
    discoveryRetain?: boolean;
    /**
     * string: The unique_id generator to use. Can be one of `legacy` or `mac`. Defaults to `legacy`, which generates unique...
     * @yamlKey discovery_unique_id_generator
     */
    discoveryUniqueIdGenerator?: "legacy" | "mac";
    /**
     * boolean: If enabled, MQTT will be enabled on boot. Defaults to `true`.
     * @yamlKey enable_on_boot
     */
    enableOnBoot?: boolean;
    /**
     * bool: Only on ESP32. If true publishing the message happens from a separate mqtt task. The client only enqueues the m...
     * @yamlKey idf_send_async
     */
    idfSendAsync?: boolean;
    /** [Time](https://esphome.io/guides/configuration-types#time): The time to keep the MQTT socket alive, decreasing this c... */
    keepalive?: TimePeriod;
    /**
     * [MQTTMessage](https://esphome.io/components/mqtt#mqtt-message): The topic to send MQTT log messages to. Use `null` if...
     * @yamlKey log_topic
     */
    logTopic?: MqttLogTopicProps;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when a connection to the broker is established.
     * @yamlKey on_connect
     */
    onConnect?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when the connection to the broker is dropped.
     * @yamlKey on_disconnect
     */
    onDisconnect?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when a JSON message on a specific MQTT topic ...
     * @yamlKey on_json_message
     */
    onJsonMessage?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when a message on a specific MQTT topic is re...
     * @yamlKey on_message
     */
    onMessage?: TriggerHandler;
    /** string: The password to use for authentication. Empty (the default) means no authentication. */
    password?: string;
    /** port: Port of the ESPHome API (if enabled). */
    port?: number;
    /**
     * bool: Publish `None` instead of `NaN` to handle Unknown/Unavailable sensor states in Home Assistant. Defaults to `fal...
     * @yamlKey publish_nan_as_none
     */
    publishNanAsNone?: boolean;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The amount of time to wait before rebooting when no MQTT ...
     * @yamlKey reboot_timeout
     */
    rebootTimeout?: TimePeriod;
    /**
     * [MQTTMessage](https://esphome.io/components/mqtt#mqtt-message): The message to send when the node shuts down and the ...
     * @yamlKey shutdown_message
     */
    shutdownMessage?: MqttShutdownMessageProps;
    /**
     * bool: Only on ESP32. Don't verify if the common name in the server certificate matches the value of `broker`.
     * @yamlKey skip_cert_cn_check
     */
    skipCertCnCheck?: boolean;
    /**
     * string: The prefix used for all MQTT messages. Should not contain trailing slash. Defaults to `<APP_NAME>`. Use `null...
     * @yamlKey topic_prefix
     */
    topicPrefix?: string;
    /**
     * boolean: Whether to use [Abbreviations](https://www.home-assistant.io/docs/mqtt/discovery/) in discovery messages. De...
     * @yamlKey use_abbreviations
     */
    useAbbreviations?: boolean;
    /** string: The username to use for authentication. Empty (the default) means no authentication. */
    username?: string;
    /**
     * bool: Blocks other components from starting until the MQTT connection is established. Defaults to `false`.
     * @yamlKey wait_for_connection
     */
    waitForConnection?: boolean;
    /**
     * [MQTTMessage](https://esphome.io/components/mqtt#mqtt-message): The message to send when the MQTT connection is dropp...
     * @yamlKey will_message
     */
    willMessage?: MqttWillMessageProps;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            mqtt: MqttProps & ComponentProps<__marker_mqtt_MQTTClientComponent>;
        }
    }
}
