// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { runtime_stats_RuntimeStatsCollector } from "../markers";
export interface RuntimeStatsProps {
    /**
     * [Time](/guides/configuration-types#time): How often to log the statistics. Defaults to `60s`.
     * @yamlKey log_interval
     */
    logInterval?: TimePeriod;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            runtime_stats: RuntimeStatsProps & ComponentProps<runtime_stats_RuntimeStatsCollector>;
        }
    }
}
