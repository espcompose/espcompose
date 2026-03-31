// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { binary_sensor_BinarySensor, sensor_Sensor, statsd_StatsdComponent } from "../markers";
export interface StatsdSensorsProps {
    id: RefProp<sensor_Sensor>;
    name: string | EmbedValue<string>;
}
export interface StatsdBinarySensorsProps {
    id: RefProp<binary_sensor_BinarySensor>;
    name: string | EmbedValue<string>;
}
export interface StatsdProps extends _CoreComponent {
    /** ip: The Host IP of your StatsD Server. */
    host: string | EmbedValue<string>;
    /** uint16: The Port of your StatsD Server. Defaults to `8125`. */
    port?: number | EmbedValue<number>;
    /** string: The prefix to automatically prepend every metric with. Defaults to `""`. */
    prefix?: string | EmbedValue<string>;
    sensors?: Array<StatsdSensorsProps>;
    /** @yamlKey binary_sensors */
    binarySensors?: Array<StatsdBinarySensorsProps>;
    /**
     * uint16: How often to send the metrics. Defaults to `10s`.
     * @yamlKey update_interval
     */
    updateInterval?: unknown;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            statsd: StatsdProps & ComponentProps<statsd_StatsdComponent>;
        }
    }
}
