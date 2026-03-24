// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { esp32_ble_ESP32BLE, esp32_ble_beacon_ESP32BLEBeacon } from "../markers";
export interface Esp32BleBeaconMinIntervalProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface Esp32BleBeaconMaxIntervalProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface Esp32BleBeaconProps extends _CoreComponent {
    /** @yamlKey ble_id */
    bleId?: RefProp<esp32_ble_ESP32BLE>;
    /** The type of beacon to create, currently only supports `iBeacon`. */
    type: "IBEACON";
    /** The [universally unique identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier) to identify the beacon. */
    uuid: unknown;
    /** int: The iBeacon major identifier of this beacon. Usually used to group beacons, for example for grouping all beacons... */
    major?: number;
    /** int: The iBeacon minor identifier of this beacon. Usually used to identify beacons within an iBeacon group. Defaults ... */
    minor?: number;
    /**
     * [Time](/guides/configuration-types#time): The iBeacon minimum transmit interval in milliseconds from 20 to 10240. Set...
     * @yamlKey min_interval
     */
    minInterval?: Esp32BleBeaconMinIntervalProps;
    /**
     * [Time](/guides/configuration-types#time): The iBeacon maximum transmit interval in milliseconds from 20 to 10240. Set...
     * @yamlKey max_interval
     */
    maxInterval?: Esp32BleBeaconMaxIntervalProps;
    /**
     * int: The RSSI of the iBeacon as measured 1 meter from the device. This is used to calibrate the ranging calculations ...
     * @yamlKey measured_power
     */
    measuredPower?: number;
    /**
     * int: The transmit power of the iBeacon in dBm. One of -12, -9, -6, -3, 0, 3, 6, 9. Defaults to `3dBm`. Not available ...
     * @yamlKey tx_power
     */
    txPower?: "0" | "3" | "6" | "9" | "-12" | "-9" | "-6" | "-3";
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            esp32_ble_beacon: Esp32BleBeaconProps & ComponentProps<esp32_ble_beacon_ESP32BLEBeacon>;
        }
    }
}
