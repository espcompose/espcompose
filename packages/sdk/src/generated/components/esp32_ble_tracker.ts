// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { esp32_ble_ESP32BLE, esp32_ble_tracker_ESP32BLETracker } from "../markers";
export interface Esp32BleTrackerScanParametersPropsDurationProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface Esp32BleTrackerScanParametersPropsIntervalProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface Esp32BleTrackerScanParametersPropsWindowProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface Esp32BleTrackerScanParametersProps {
    /** [Time](/guides/configuration-types#time): The duration of each complete scan. This has no real impact on the device b... */
    duration?: Esp32BleTrackerScanParametersPropsDurationProps;
    /** [Time](/guides/configuration-types#time): The interval between each consecutive scan window. This is the time the ESP... */
    interval?: Esp32BleTrackerScanParametersPropsIntervalProps;
    /** [Time](/guides/configuration-types#time): The time the ESP is actively listening for packets on a channel during each... */
    window?: Esp32BleTrackerScanParametersPropsWindowProps;
    /** boolean: Whether to actively send scan requests to request more data after having received an advertising packet. Wit... */
    active?: boolean;
    /** boolean: Whether to scan continuously (forever) or to only scan when asked to start a scan (with start_scan action). ... */
    continuous?: boolean;
}
export interface Esp32BleTrackerProps extends _CoreComponent {
    /** @yamlKey ble_id */
    bleId?: RefProp<esp32_ble_ESP32BLE>;
    /**
     * int: DEPRECATED - This option has been moved to the [Esp32 Ble](/components/esp32_ble/) component. Please configure `...
     * @yamlKey max_connections
     */
    maxConnections?: number;
    /**
     * Advanced parameters for configuring the scan behavior of the ESP32. See also [this guide by Texas Instruments](https:...
     * @yamlKey scan_parameters
     */
    scanParameters?: Esp32BleTrackerScanParametersProps;
    /**
     * [Automation](/automations): An automation to perform when a Bluetooth advertising is received. See [`on_ble_advertise...
     * @yamlKey on_ble_advertise
     */
    onBleAdvertise?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a Bluetooth advertising with service data is received. See ...
     * @yamlKey on_ble_service_data_advertise
     */
    onBleServiceDataAdvertise?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a Bluetooth advertising with manufacturer data is received....
     * @yamlKey on_ble_manufacturer_data_advertise
     */
    onBleManufacturerDataAdvertise?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a BLE scan has completed (the duration of the scan). This w...
     * @yamlKey on_scan_end
     */
    onScanEnd?: () => void;
    /**
     * boolean: When enabled, software coexistence will briefly prioritize Bluetooth over Wi-Fi during the initial establish...
     * @yamlKey software_coexistence
     */
    softwareCoexistence?: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            esp32_ble_tracker: Esp32BleTrackerProps & ComponentProps<esp32_ble_tracker_ESP32BLETracker>;
        }
    }
}
