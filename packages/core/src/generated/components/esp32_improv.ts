// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_binary_sensor_BinarySensor, __marker_esp32_improv_ESP32ImprovComponent, __marker_output_BinaryOutput } from "../markers";
export interface Esp32ImprovProps extends _CoreComponent {
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The amount of time until authorization times out and need...
     * @yamlKey authorized_duration
     */
    authorizedDuration?: TimePeriod;
    /** [ID](https://esphome.io/guides/configuration-types#id): A [binary sensor](https://esphome.io/components/binary_sensor... */
    authorizer: RefProp<__marker_binary_sensor_BinarySensor>;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The amount of time to identify for. Defaults to `10s`.
     * @yamlKey identify_duration
     */
    identifyDuration?: TimePeriod;
    /**
     * string: The URL to open after provisioning is complete. Defaults to `https://my.home-assistant.io/redirect/config_flo...
     * @yamlKey next_url
     */
    nextUrl?: string;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when provisioning has completed. See [`on_pro...
     * @yamlKey on_provisioned
     */
    onProvisioned?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when the device begins the provisioning proce...
     * @yamlKey on_provisioning
     */
    onProvisioning?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when Improv is waiting for authorization and/...
     * @yamlKey on_start
     */
    onStart?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when an Improv state change happens. See [`on...
     * @yamlKey on_state
     */
    onState?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when Improv has stopped. See [`on_stop`](http...
     * @yamlKey on_stop
     */
    onStop?: TriggerHandler;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): An [output](https://esphome.io/components/output/) to display...
     * @yamlKey status_indicator
     */
    statusIndicator?: RefProp<__marker_output_BinaryOutput>;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The amount of time to wait before starting the Improv ser...
     * @yamlKey wifi_timeout
     */
    wifiTimeout?: TimePeriod;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            esp32_improv: Esp32ImprovProps & ComponentProps<__marker_esp32_improv_ESP32ImprovComponent>;
        }
    }
}
