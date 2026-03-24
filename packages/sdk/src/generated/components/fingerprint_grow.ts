// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { fingerprint_grow_FingerprintGrowComponent, uart_UARTComponent } from "../markers";
export interface FingerprintGrowIdlePeriodToSleepProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface FingerprintGrowProps extends _CoreComponent {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): Pin connected to the reader's finger detection signal (WAKEUP) ...
     * @yamlKey sensing_pin
     */
    sensingPin?: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): Output pin responsible for toogling the sensor power on and off.
     * @yamlKey sensor_power_pin
     */
    sensorPowerPin?: Pin;
    /**
     * [Time](/guides/configuration-types#time): The sensor idle period to wait before powering it off (sleep). Defaults to ...
     * @yamlKey idle_period_to_sleep
     */
    idlePeriodToSleep?: FingerprintGrowIdlePeriodToSleepProps;
    /** int: Password to use for authentication. Defaults to `0x00`. */
    password?: number;
    /**
     * int: Sets a new password to use for authentication. See [Setting a New Password](https://esphome.io/components/finger...
     * @yamlKey new_password
     */
    newPassword?: number;
    /**
     * [Automation](/automations): An action to be performed when the finger touches the sensor. See [`on_finger_scan_start`...
     * @yamlKey on_finger_scan_start
     */
    onFingerScanStart?: () => void;
    /**
     * [Automation](/automations): An action to be performed when an enrolled fingerprint is scanned. See [`on_finger_scan_m...
     * @yamlKey on_finger_scan_matched
     */
    onFingerScanMatched?: () => void;
    /**
     * [Automation](/automations): An action to be performed when an unknown fingerprint is scanned. See [`on_finger_scan_un...
     * @yamlKey on_finger_scan_unmatched
     */
    onFingerScanUnmatched?: () => void;
    /**
     * [Automation](/automations): An action to be performed when the finger is not entirely touching the sensor. See [`on_f...
     * @yamlKey on_finger_scan_misplaced
     */
    onFingerScanMisplaced?: () => void;
    /**
     * [Automation](/automations): An action to be performed when the scan of a fingerprint failed. See [`on_finger_scan_inv...
     * @yamlKey on_finger_scan_invalid
     */
    onFingerScanInvalid?: () => void;
    /**
     * [Automation](/automations): An action to be performed when a fingerprint is scanned during enrollment. See [`on_enrol...
     * @yamlKey on_enrollment_scan
     */
    onEnrollmentScan?: () => void;
    /**
     * [Automation](/automations): An action to be performed when a fingerprint is enrolled. See [`on_enrollment_done` Trigg...
     * @yamlKey on_enrollment_done
     */
    onEnrollmentDone?: () => void;
    /**
     * [Automation](/automations): An action to be performed when a fingerprint enrollment failed. See [`on_enrollment_faile...
     * @yamlKey on_enrollment_failed
     */
    onEnrollmentFailed?: () => void;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the UART hub.
     * @yamlKey uart_id
     */
    uartId?: RefProp<uart_UARTComponent>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            fingerprint_grow: FingerprintGrowProps & ComponentProps<fingerprint_grow_FingerprintGrowComponent>;
        }
    }
}
