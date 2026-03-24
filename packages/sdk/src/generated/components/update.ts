// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent, _CoreEntityBase, _CoreMqttCommandComponent, _Esp32HostedUpdateBase } from "../bases";
import type { http_request_HttpRequestComponent, http_request_HttpRequestUpdate, http_request_OtaHttpRequestComponent, mqtt_MQTTUpdateComponent, web_server_WebServer } from "../markers";
interface UpdateWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface UpdateBaseProps extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey web_server */
    webServer?: UpdateWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "" | "firmware";
    /** @yamlKey on_update_available */
    onUpdateAvailable?: () => void;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
}
interface Esp32HostedEmbeddedProps extends _Esp32HostedUpdateBase {
    path: unknown;
    sha256: unknown;
}
interface Esp32HostedHttpProps extends _Esp32HostedUpdateBase {
    /** @yamlKey http_request_id */
    httpRequestId?: RefProp<http_request_HttpRequestComponent>;
    source: unknown;
}
interface HttpRequestProps extends _CoreComponent {
    /** @yamlKey ota_id */
    otaId?: RefProp<http_request_OtaHttpRequestComponent>;
    /** @yamlKey http_request_id */
    httpRequestId?: RefProp<http_request_HttpRequestComponent>;
    source: unknown;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
export type UpdateProps = (UpdateBaseProps & {
    platform: "esp32_hosted";
    type: "embedded";
} & Esp32HostedEmbeddedProps & ComponentProps<mqtt_MQTTUpdateComponent>) | (UpdateBaseProps & {
    platform: "esp32_hosted";
    type: "http";
} & Esp32HostedHttpProps & ComponentProps<mqtt_MQTTUpdateComponent>) | (UpdateBaseProps & {
    platform: "http_request";
} & HttpRequestProps & ComponentProps<http_request_HttpRequestUpdate>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            update: UpdateProps;
        }
    }
}
