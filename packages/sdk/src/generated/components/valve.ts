// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent, _CoreEntityBase, _CoreMqttCommandComponent } from "../bases";
import type { template__TemplateValve, web_server_WebServer } from "../markers";
interface ValveWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface ValveBaseProps extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey web_server */
    webServer?: ValveWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "" | "gas" | "water";
    /** @yamlKey position_command_topic */
    positionCommandTopic?: unknown;
    /** @yamlKey position_state_topic */
    positionStateTopic?: unknown;
    /** @yamlKey on_open */
    onOpen?: TriggerHandler;
    /** @yamlKey on_closed */
    onClosed?: TriggerHandler;
}
interface TemplateProps extends _CoreComponent {
    /** [lambda](/automations/templates#config-lambda): Lambda to be evaluated repeatedly to get the current state of the valve. */
    lambda?: unknown;
    /** boolean: Whether to operate in optimistic mode - when in this mode, any command sent to the template valve will immed... */
    optimistic?: boolean | EmbedValue<boolean>;
    /**
     * boolean: Whether the true state of the valve is not known. This will make the Home Assistant frontend show buttons fo...
     * @yamlKey assumed_state
     */
    assumedState?: boolean | EmbedValue<boolean>;
    /**
     * boolean: Whether this valve will publish its position as a floating point number. By default (`false` ), the valve on...
     * @yamlKey has_position
     */
    hasPosition?: boolean | EmbedValue<boolean>;
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote (like Home Assistant'...
     * @yamlKey open_action
     */
    openAction?: TriggerHandler;
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote requests the valve to...
     * @yamlKey close_action
     */
    closeAction?: TriggerHandler;
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote requests the valve to...
     * @yamlKey stop_action
     */
    stopAction?: TriggerHandler;
    /** @yamlKey toggle_action */
    toggleAction?: TriggerHandler;
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote (like Home Assistant'...
     * @yamlKey position_action
     */
    positionAction?: TriggerHandler;
    /**
     * enum: Control how the valve attempts to restore state on bootup.
     * @yamlKey restore_mode
     */
    restoreMode?: "NO_RESTORE" | "RESTORE" | "RESTORE_AND_CALL";
}
export type ValveProps = ValveBaseProps & {
    platform: "template";
} & TemplateProps & ComponentProps<template__TemplateValve>;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            valve: ValveProps;
        }
    }
}
