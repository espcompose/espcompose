// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { __marker_mqtt_MQTTClientComponent } from "../markers";
export interface MqttBirthMessageProps {
    topic: unknown;
    qos?: unknown;
    retain?: boolean;
    payload: unknown;
}
export interface MqttWillMessageProps {
    topic: unknown;
    qos?: unknown;
    retain?: boolean;
    payload: unknown;
}
export interface MqttShutdownMessageProps {
    topic: unknown;
    qos?: unknown;
    retain?: boolean;
    payload: unknown;
}
export interface MqttLogTopicProps {
    topic: unknown;
    qos?: unknown;
    retain?: boolean;
    /** string: The log level to use for MQTT logs. See [Log Levels](/components/logger#logger-log_levels) for options. */
    level?: "NONE" | "ERROR" | "WARN" | "INFO" | "DEBUG" | "VERBOSE" | "VERY_VERBOSE";
}
export interface MqttProps {
    /** string: The host of your MQTT broker. */
    broker: string;
    /**
     * boolean: If enabled, MQTT will be enabled on boot. Defaults to `true`.
     * @yamlKey enable_on_boot
     */
    enableOnBoot?: boolean;
    /** port: Port of the ESPHome API (if enabled). */
    port?: number;
    /** string: The username to use for authentication. Empty (the default) means no authentication. */
    username?: string;
    /** string: The password to use for authentication. Empty (the default) means no authentication. */
    password?: string;
    /**
     * boolean: Whether the broker will clean the MQTT session after disconnect. Defaults to `false`.
     * @yamlKey clean_session
     */
    cleanSession?: boolean;
    /**
     * string: The client id to use for opening connections. See [Defaults](https://esphome.io/components/mqtt#mqtt-defaults...
     * @yamlKey client_id
     */
    clientId?: string;
    /**
     * bool: Only on ESP32. If true publishing the message happens from a separate mqtt task. The client only enqueues the m...
     * @yamlKey idf_send_async
     */
    idfSendAsync?: boolean;
    /**
     * string: Only on ESP32. CA certificate in PEM format. See [TLS (ESP32)](https://esphome.io/components/mqtt#mqtt-tls-id...
     * @yamlKey certificate_authority
     */
    certificateAuthority?: string;
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
     * bool: Only on ESP32. Don't verify if the common name in the server certificate matches the value of `broker`.
     * @yamlKey skip_cert_cn_check
     */
    skipCertCnCheck?: boolean;
    /** boolean: Manually enable/disable */
    discovery?: "CLEAN";
    /**
     * boolean: Whether to retain MQTT discovery messages so that entities are added automatically on Home Assistant restart...
     * @yamlKey discovery_retain
     */
    discoveryRetain?: boolean;
    /**
     * boolean: If Home Assistant automatic device discovery should be enabled. Defaults to `true`.
     * @yamlKey discover_ip
     */
    discoverIp?: boolean;
    /**
     * string: The prefix to use for Home Assistant's MQTT discovery. Should not contain trailing slash. Defaults to `homeas...
     * @yamlKey discovery_prefix
     */
    discoveryPrefix?: string;
    /**
     * string: The unique_id generator to use. Can be one of `legacy` or `mac`. Defaults to `legacy`, which generates unique...
     * @yamlKey discovery_unique_id_generator
     */
    discoveryUniqueIdGenerator?: "legacy" | "mac";
    /**
     * string: The object_id generator to use. Can be one of `none` or `device_name`. Defaults to `none` which does not gene...
     * @yamlKey discovery_object_id_generator
     */
    discoveryObjectIdGenerator?: "none" | "device_name";
    /**
     * boolean: Whether to use [Abbreviations](https://www.home-assistant.io/docs/mqtt/discovery/) in discovery messages. De...
     * @yamlKey use_abbreviations
     */
    useAbbreviations?: boolean;
    /**
     * [MQTTMessage](https://esphome.io/components/mqtt#mqtt-message): The message to send when a connection to the broker i...
     * @yamlKey birth_message
     */
    birthMessage?: MqttBirthMessageProps;
    /**
     * [MQTTMessage](https://esphome.io/components/mqtt#mqtt-message): The message to send when the MQTT connection is dropp...
     * @yamlKey will_message
     */
    willMessage?: MqttWillMessageProps;
    /**
     * [MQTTMessage](https://esphome.io/components/mqtt#mqtt-message): The message to send when the node shuts down and the ...
     * @yamlKey shutdown_message
     */
    shutdownMessage?: MqttShutdownMessageProps;
    /**
     * string: The prefix used for all MQTT messages. Should not contain trailing slash. Defaults to `<APP_NAME>`. Use `null...
     * @yamlKey topic_prefix
     */
    topicPrefix?: string;
    /**
     * [MQTTMessage](https://esphome.io/components/mqtt#mqtt-message): The topic to send MQTT log messages to. Use `null` if...
     * @yamlKey log_topic
     */
    logTopic?: MqttLogTopicProps;
    /** [Time](/guides/configuration-types#time): The time to keep the MQTT socket alive, decreasing this can help with overa... */
    keepalive?: TimePeriod;
    /**
     * [Time](/guides/configuration-types#time): The amount of time to wait before rebooting when no MQTT connection exists....
     * @yamlKey reboot_timeout
     */
    rebootTimeout?: TimePeriod;
    /**
     * [Automation](/automations): An action to be performed when a connection to the broker is established.
     * @yamlKey on_connect
     */
    onConnect?: TriggerHandler;
    /**
     * [Automation](/automations): An action to be performed when the connection to the broker is dropped.
     * @yamlKey on_disconnect
     */
    onDisconnect?: TriggerHandler;
    /**
     * [Automation](/automations): An action to be performed when a message on a specific MQTT topic is received. See [`on_m...
     * @yamlKey on_message
     */
    onMessage?: TriggerHandler;
    /**
     * [Automation](/automations): An action to be performed when a JSON message on a specific MQTT topic is received. See [...
     * @yamlKey on_json_message
     */
    onJsonMessage?: TriggerHandler;
    /**
     * bool: Publish `None` instead of `NaN` to handle Unknown/Unavailable sensor states in Home Assistant. Defaults to `fal...
     * @yamlKey publish_nan_as_none
     */
    publishNanAsNone?: boolean;
    /**
     * bool: Blocks other components from starting until the MQTT connection is established. Defaults to `false`.
     * @yamlKey wait_for_connection
     */
    waitForConnection?: boolean;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            mqtt: MqttProps & ComponentProps<__marker_mqtt_MQTTClientComponent>;
        }
    }
}
