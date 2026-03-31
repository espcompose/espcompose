// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { binary_sensor_BinarySensor, esp32_improv_ESP32ImprovComponent, output_BinaryOutput } from "../markers";
export interface Esp32ImprovProps extends _CoreComponent {
    /** [ID](/guides/configuration-types#id): A [binary sensor](/components/binary_sensor/) to authorize with. Also accepts `... */
    authorizer: RefProp<binary_sensor_BinarySensor>;
    /**
     * [ID](/guides/configuration-types#id): An [output](/components/output/) to display feedback to the user.
     * @yamlKey status_indicator
     */
    statusIndicator?: RefProp<output_BinaryOutput>;
    /**
     * [Time](/guides/configuration-types#time): The amount of time to identify for. Defaults to `10s`.
     * @yamlKey identify_duration
     */
    identifyDuration?: TimePeriod;
    /**
     * [Time](/guides/configuration-types#time): The amount of time until authorization times out and needs to be re-authori...
     * @yamlKey authorized_duration
     */
    authorizedDuration?: TimePeriod;
    /**
     * [Time](/guides/configuration-types#time): The amount of time to wait before starting the Improv service after Wi-Fi i...
     * @yamlKey wifi_timeout
     */
    wifiTimeout?: TimePeriod;
    /**
     * [Automation](/automations): An action to be performed when provisioning has completed. See [`on_provisioned`](https:/...
     * @yamlKey on_provisioned
     */
    onProvisioned?: TriggerHandler;
    /**
     * [Automation](/automations): An action to be performed when the device begins the provisioning process. See [`on_provi...
     * @yamlKey on_provisioning
     */
    onProvisioning?: TriggerHandler;
    /**
     * [Automation](/automations): An action to be performed when Improv is waiting for authorization and/or upon authorizat...
     * @yamlKey on_start
     */
    onStart?: TriggerHandler;
    /**
     * [Automation](/automations): An action to be performed when an Improv state change happens. See [`on_state`](https://e...
     * @yamlKey on_state
     */
    onState?: TriggerHandler;
    /**
     * [Automation](/automations): An action to be performed when Improv has stopped. See [`on_stop`](https://esphome.io/com...
     * @yamlKey on_stop
     */
    onStop?: TriggerHandler;
    /**
     * string: The URL to open after provisioning is complete. Defaults to `https://my.home-assistant.io/redirect/config_flo...
     * @yamlKey next_url
     */
    nextUrl?: string;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            esp32_improv: Esp32ImprovProps & ComponentProps<esp32_improv_ESP32ImprovComponent>;
        }
    }
}
