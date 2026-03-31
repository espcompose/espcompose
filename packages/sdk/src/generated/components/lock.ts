// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent, _CoreEntityBase, _CoreMqttCommandComponent } from "../bases";
import type { copy_CopyLock, lock_Lock, output_BinaryOutput, output_OutputLock, template__TemplateLock, web_server_WebServer } from "../markers";
interface LockWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface LockBaseProps extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey web_server */
    webServer?: LockWebServerProps;
    /** @yamlKey on_lock */
    onLock?: TriggerHandler;
    /** @yamlKey on_unlock */
    onUnlock?: TriggerHandler;
}
interface CopyProps extends _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): The lock that should be mirrored.
     * @yamlKey source_id
     */
    sourceId: RefProp<lock_Lock>;
}
interface OutputProps extends _CoreComponent {
    /** [ID](/guides/configuration-types#id): The ID of the output component to use. */
    output: RefProp<output_BinaryOutput>;
}
interface TemplateProps extends _CoreComponent {
    /** [lambda](/automations/templates#config-lambda): Lambda to be evaluated repeatedly to get the current state of the lock. */
    lambda?: unknown;
    /** boolean: Whether to operate in optimistic mode - when in this mode, any command sent to the template lock will immedi... */
    optimistic?: boolean | EmbedValue<boolean>;
    /**
     * boolean: Whether the true state of the lock is not known. This will make the Home Assistant frontend show buttons for...
     * @yamlKey assumed_state
     */
    assumedState?: boolean | EmbedValue<boolean>;
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote (like Home Assistant'...
     * @yamlKey unlock_action
     */
    unlockAction?: TriggerHandler;
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote (like Home Assistant'...
     * @yamlKey lock_action
     */
    lockAction?: TriggerHandler;
    /** @yamlKey open_action */
    openAction?: TriggerHandler;
}
export type LockProps = (LockBaseProps & {
    platform: "copy";
} & CopyProps & ComponentProps<copy_CopyLock>) | (LockBaseProps & {
    platform: "output";
} & OutputProps & ComponentProps<output_OutputLock>) | (LockBaseProps & {
    platform: "template";
} & TemplateProps & ComponentProps<template__TemplateLock>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            lock: LockProps;
        }
    }
}
