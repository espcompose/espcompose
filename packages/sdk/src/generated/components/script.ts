// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { script_Script } from "../markers";
export interface ScriptProps {
    /** string: Controls what happens when a script is invoked while it is still running from one or more previous invocation... */
    mode?: "single" | "restart" | "queued" | "parallel";
    /**
     * int: Allows limiting the maximum number of script instances.
     * @yamlKey max_runs
     */
    maxRuns?: number;
    /** [Script Parameters](https://esphome.io/components/script#script-parameters): A script can define one or more paramete... */
    parameters?: Record<string, unknown>;
    /** [Action](/automations/actions#all-actions): The action to perform. */
    then?: () => void;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            script: ScriptProps & ComponentProps<script_Script>;
        }
    }
}
