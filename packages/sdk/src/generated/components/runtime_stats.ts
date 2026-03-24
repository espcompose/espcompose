// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { runtime_stats_RuntimeStatsCollector } from "../markers";
export interface RuntimeStatsLogIntervalProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface RuntimeStatsProps {
    /**
     * [Time](/guides/configuration-types#time): How often to log the statistics. Defaults to `60s`.
     * @yamlKey log_interval
     */
    logInterval?: RuntimeStatsLogIntervalProps;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            runtime_stats: RuntimeStatsProps & ComponentProps<runtime_stats_RuntimeStatsCollector>;
        }
    }
}
