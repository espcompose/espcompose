// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_script_Script } from "../markers";
export interface ScriptParametersProps {
    string?: unknown;
}
export interface ScriptProps {
    /**
     * int: Allows limiting the maximum number of script instances.
     * @yamlKey max_runs
     */
    maxRuns?: number;
    /** string: Controls what happens when a script is invoked while it is still running from one or more previous invocation... */
    mode?: "parallel" | "queued" | "restart" | "single";
    /** [Script Parameters](https://esphome.io/components/script#script-parameters): A script can define one or more paramete... */
    parameters?: ScriptParametersProps;
    /** [Action](https://esphome.io/automations/actions#all-actions): The action to perform. */
    then: TriggerHandler;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            script: ScriptProps & ComponentProps<__marker_script_Script>;
        }
    }
}
