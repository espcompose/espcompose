// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_key_collector_KeyCollector, __marker_key_provider_KeyProvider } from "../markers";
export interface KeyCollectorProps extends _CoreComponent {
    /**
     * string: Keys allowed to be used. If not specified, then any otherwise unused keys will be allowed.
     * @yamlKey allowed_keys
     */
    allowedKeys?: string;
    /**
     * string: Keys used to delete the last pressed key. Like *Backspace* on a keyboard.
     * @yamlKey back_keys
     */
    backKeys?: string;
    /**
     * string: Keys used to cancel building the key sequence.
     * @yamlKey clear_keys
     */
    clearKeys?: string;
    /**
     * boolean: If enabled, this key collector will be enabled on boot. Defaults to `true`.
     * @yamlKey enable_on_boot
     */
    enableOnBoot?: boolean;
    /**
     * boolean: Only trigger `on_result` automation when one of the `end_keys` was pressed, and not when `max_length` charac...
     * @yamlKey end_key_required
     */
    endKeyRequired?: boolean;
    /**
     * string: Keys used to *finish* the key sequence and trigger the `on_result` automation.
     * @yamlKey end_keys
     */
    endKeys?: string;
    /**
     * integer: The maximum length of the desired key sequence. After this limit is reached, the collector will either ignor...
     * @yamlKey max_length
     */
    maxLength?: number;
    /**
     * integer: The minimum length of the desired key sequence. Below this limit, `on_result` automation will not trigger ev...
     * @yamlKey min_length
     */
    minLength?: number;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when keys are pressed. The current key sequenc...
     * @yamlKey on_progress
     */
    onProgress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the key sequence has been finished (eg. `...
     * @yamlKey on_result
     */
    onResult?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform if the timeout happens. The current key sequen...
     * @yamlKey on_timeout
     */
    onTimeout?: TriggerHandler;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the key collector component to monitor.
     * @yamlKey source_id
     */
    sourceId: Array<RefProp<__marker_key_provider_KeyProvider>>;
    /**
     * string: Keys used to *start* the key sequence; when set, no keys will be accepted until one of the start keys is pres...
     * @yamlKey start_keys
     */
    startKeys?: string;
    /** [Time](https://esphome.io/guides/configuration-types#time): Timeout after which to cancel building the key sequence. */
    timeout?: TimePeriod;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            key_collector: KeyCollectorProps & ComponentProps<__marker_key_collector_KeyCollector>;
        }
    }
}
