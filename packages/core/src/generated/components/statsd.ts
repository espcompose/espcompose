// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_binary_sensor_BinarySensor, __marker_sensor_Sensor, __marker_statsd_StatsdComponent } from "../markers";
export interface StatsdBinarySensorsProps {
    id: RefProp<__marker_binary_sensor_BinarySensor>;
    name: string;
}
export interface StatsdSensorsProps {
    id: RefProp<__marker_sensor_Sensor>;
    name: string;
}
export interface StatsdProps extends _CoreComponent {
    /** @yamlKey binary_sensors */
    binarySensors?: Array<StatsdBinarySensorsProps>;
    /** ip: The Host IP of your StatsD Server. */
    host: string;
    /** uint16: The Port of your StatsD Server. Defaults to `8125`. */
    port?: number;
    /** string: The prefix to automatically prepend every metric with. Defaults to `""`. */
    prefix?: string;
    sensors?: Array<StatsdSensorsProps>;
    /**
     * uint16: How often to send the metrics. Defaults to `10s`.
     * @yamlKey update_interval
     */
    updateInterval?: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            statsd: StatsdProps & ComponentProps<__marker_statsd_StatsdComponent>;
        }
    }
}
