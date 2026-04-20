// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent, _CoreEntityBase, _CoreMqttCommandComponent } from "../bases";
import type { __marker_copy_CopyLock, __marker_lock_Lock, __marker_output_BinaryOutput, __marker_output_OutputLock, __marker_template__TemplateLock, __marker_web_server_WebServer } from "../markers";
interface LockWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface LockBaseProps extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** string: Manually specify the ID for code generation. At least one of id and name must be specified. */
    id?: string;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the lock is locked. See [...
     * @yamlKey on_lock
     */
    onLock?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the lock is unlocked. See...
     * @yamlKey on_unlock
     */
    onUnlock?: TriggerHandler;
    /** @yamlKey web_server */
    webServer?: LockWebServerProps;
}
interface CopyProps extends _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The lock that should be mirrored.
     * @yamlKey source_id
     */
    sourceId: RefProp<__marker_lock_Lock>;
}
interface OutputProps extends _CoreComponent {
    /** [ID](https://esphome.io/guides/configuration-types#id): The ID of the output component to use. */
    output: RefProp<__marker_output_BinaryOutput>;
}
interface TemplateProps extends _CoreComponent {
    /**
     * boolean: Whether the true state of the lock is not known. This will make the Home Assistant frontend show buttons for...
     * @yamlKey assumed_state
     */
    assumedState?: boolean;
    /** [lambda](https://esphome.io/automations/templates#config-lambda): Lambda to be evaluated repeatedly to get the curren... */
    lambda?: unknown;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote (li...
     * @yamlKey lock_action
     */
    lockAction?: TriggerHandler;
    /** @yamlKey open_action */
    openAction?: TriggerHandler;
    /** boolean: Whether to operate in optimistic mode - when in this mode, any command sent to the template lock will immedi... */
    optimistic?: boolean;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote (li...
     * @yamlKey unlock_action
     */
    unlockAction?: TriggerHandler;
}
export type LockProps = (LockBaseProps & {
    platform: "copy";
} & CopyProps & ComponentProps<__marker_copy_CopyLock>) | (LockBaseProps & {
    platform: "output";
} & OutputProps & ComponentProps<__marker_output_OutputLock>) | (LockBaseProps & {
    platform: "template";
} & TemplateProps & ComponentProps<__marker_template__TemplateLock>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            lock: LockProps;
        }
    }
}
