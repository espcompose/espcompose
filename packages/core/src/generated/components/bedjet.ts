// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_bedjet_BedJetHub, __marker_ble_client_BLEClient, __marker_time_RealTimeClock } from "../markers";
export interface BedjetProps extends _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): The ID of a [Time](/components/time/) which can be used to set the time on the ...
     * @yamlKey time_id
     */
    timeId?: RefProp<__marker_time_RealTimeClock>;
    /** @yamlKey receive_timeout */
    receiveTimeout?: TimePeriod;
    /**
     * [ID](/guides/configuration-types#id): The ID of the BLE Client.
     * @yamlKey ble_client_id
     */
    bleClientId?: RefProp<__marker_ble_client_BLEClient>;
    /**
     * [Time](/guides/configuration-types#time): The interval to dispatch status changes to child components. Defaults to `5...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            bedjet: BedjetProps & ComponentProps<__marker_bedjet_BedJetHub>;
        }
    }
}
