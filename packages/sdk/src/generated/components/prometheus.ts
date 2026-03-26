// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { prometheus_PrometheusHandler, web_server_base_WebServerBase } from "../markers";
export interface PrometheusProps extends _CoreComponent {
    /** @yamlKey web_server_base_id */
    webServerBaseId?: RefProp<web_server_base_WebServerBase>;
    /**
     * boolean: Whether `internal` entities should be displayed on the web interface. Defaults to `false`.
     * @yamlKey include_internal
     */
    includeInternal?: boolean;
    /** Override metric labels. See [`relabel`](https://esphome.io/components/prometheus#prometheus-relabel) */
    relabel?: Record<string, unknown>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            prometheus: PrometheusProps & ComponentProps<prometheus_PrometheusHandler>;
        }
    }
}
