// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_api_APIServer } from "../markers";
export interface ApiActionsProps {
    action?: string;
    service?: string;
    /** @yamlKey supports_response */
    supportsResponse?: "none" | "only" | "optional" | "status";
    then?: TriggerHandler;
    variables?: Record<string, unknown>;
}
export interface ApiServicesProps {
    action?: string;
    service?: string;
    /** @yamlKey supports_response */
    supportsResponse?: "none" | "only" | "optional" | "status";
    then?: TriggerHandler;
    variables?: Record<string, unknown>;
}
export interface ApiProps extends _CoreComponent {
    /** list: A list of user-defined actions. See [User-defined Actions](https://esphome.io/components/api#api-device-actions). */
    actions?: ApiActionsProps;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The delay time for batching multiple state update message...
     * @yamlKey batch_delay
     */
    batchDelay?: TimePeriod;
    /**
     * boolean: Enable compilation of custom API services for external components that use the C++ `CustomAPIDevice` class. ...
     * @yamlKey custom_services
     */
    customServices?: boolean;
    /** If present, encryption will be enabled for the API. Using encryption helps to secure the communication between the de... */
    encryption?: unknown;
    /**
     * boolean: Enable compilation of Home Assistant service call support for external components that use the C++ `CustomAP...
     * @yamlKey homeassistant_services
     */
    homeassistantServices?: boolean;
    /**
     * boolean: Enable compilation of Home Assistant state subscription support for external components that use the C++ `Cu...
     * @yamlKey homeassistant_states
     */
    homeassistantStates?: boolean;
    /**
     * int: The maximum number of pending connections in the listen queue. Must be between 1 and 10. Defaults to `1` for ESP...
     * @yamlKey listen_backlog
     */
    listenBacklog?: number;
    /**
     * int: The maximum number of simultaneous API connections allowed. Must be between 1 and 20. Defaults to `4` for ESP826...
     * @yamlKey max_connections
     */
    maxConnections?: number;
    /**
     * int: The maximum number of messages that can be queued for sending per connection before the connection is dropped. M...
     * @yamlKey max_send_queue
     */
    maxSendQueue?: number;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when a client connects to the ...
     * @yamlKey on_client_connected
     */
    onClientConnected?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when a client disconnects from...
     * @yamlKey on_client_disconnected
     */
    onClientDisconnected?: TriggerHandler;
    /** int: The port to run the API server on. Defaults to `6053`. */
    port?: number;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The amount of time to wait before rebooting when no clien...
     * @yamlKey reboot_timeout
     */
    rebootTimeout?: TimePeriod;
    services?: ApiServicesProps;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            api: ApiProps & ComponentProps<__marker_api_APIServer>;
        }
    }
}
