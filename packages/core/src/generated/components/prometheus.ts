// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_prometheus_PrometheusHandler, __marker_web_server_base_WebServerBase } from "../markers";
export interface PrometheusRelabelPropsStringProps {
    id?: string;
    name?: string;
}
export interface PrometheusRelabelProps {
    string?: PrometheusRelabelPropsStringProps;
}
export interface PrometheusProps extends _CoreComponent {
    /**
     * boolean: Whether `internal` entities should be displayed on the web interface. Defaults to `false`.
     * @yamlKey include_internal
     */
    includeInternal?: boolean;
    /** Override metric labels. See [`relabel`](https://esphome.io/components/prometheus#prometheus-relabel) */
    relabel?: PrometheusRelabelProps;
    /** @yamlKey web_server_base_id */
    webServerBaseId?: RefProp<__marker_web_server_base_WebServerBase>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            prometheus: PrometheusProps & ComponentProps<__marker_prometheus_PrometheusHandler>;
        }
    }
}
