// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent, _CoreEntityBase, _CoreMqttCommandComponent, _Esp32HostedUpdateBase } from "../bases";
import type { __marker_http_request_HttpRequestComponent, __marker_http_request_HttpRequestUpdate, __marker_http_request_OtaHttpRequestComponent, __marker_mqtt_MQTTUpdateComponent, __marker_web_server_WebServer } from "../markers";
interface UpdateWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface UpdateBaseProps extends _CoreEntityBase, _CoreMqttCommandComponent {
    /**
     * string: The device class for the update entity. See [https://www.home-assistant.io/integrations/binary_sensor/#device...
     * @yamlKey device_class
     */
    deviceClass?: "" | "firmware";
    /** [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID used for code generation. At least on... */
    id?: unknown;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when an update is available.
     * @yamlKey on_update_available
     */
    onUpdateAvailable?: TriggerHandler;
    /** @yamlKey web_server */
    webServer?: UpdateWebServerProps;
}
interface Esp32HostedEmbeddedProps extends _Esp32HostedUpdateBase {
    path: unknown;
    sha256: unknown;
}
interface Esp32HostedHttpProps extends _Esp32HostedUpdateBase {
    /** @yamlKey http_request_id */
    httpRequestId?: RefProp<__marker_http_request_HttpRequestComponent>;
    source: unknown;
}
interface HttpRequestProps extends _CoreComponent {
    /** @yamlKey http_request_id */
    httpRequestId?: RefProp<__marker_http_request_HttpRequestComponent>;
    /** @yamlKey ota_id */
    otaId?: RefProp<__marker_http_request_OtaHttpRequestComponent>;
    source: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
export type UpdateProps = (UpdateBaseProps & {
    platform: "esp32_hosted";
    type: "embedded";
} & Esp32HostedEmbeddedProps & ComponentProps<__marker_mqtt_MQTTUpdateComponent>) | (UpdateBaseProps & {
    platform: "esp32_hosted";
    type: "http";
} & Esp32HostedHttpProps & ComponentProps<__marker_mqtt_MQTTUpdateComponent>) | (UpdateBaseProps & {
    platform: "http_request";
} & HttpRequestProps & ComponentProps<__marker_http_request_HttpRequestUpdate>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            update: UpdateProps;
        }
    }
}
