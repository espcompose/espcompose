// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent, _CoreEntityBase, _CoreMqttComponent } from "../bases";
import type { copy_CopyText, lvgl_LVGLText, template__TemplateText, text_Text, web_server_WebServer } from "../markers";
interface TextWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface TextBaseProps extends _CoreEntityBase, _CoreMqttComponent {
    /** @yamlKey web_server */
    webServer?: TextWebServerProps;
    /** @yamlKey on_value */
    onValue?: TriggerHandler;
    mode: "TEXT" | "PASSWORD";
}
interface CopyProps extends _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): The text that should be mirrored.
     * @yamlKey source_id
     */
    sourceId: RefProp<text_Text>;
}
interface LvglProps {
    widget: RefProp<unknown>;
}
interface TemplateProps extends _CoreComponent {
    /**
     * int: The minimum length this text can be. Defaults to `0`.
     * @yamlKey min_length
     */
    minLength?: number;
    /**
     * int: The maximum length this text can be. Defaults to `255`.
     * @yamlKey max_length
     */
    maxLength?: number;
    pattern?: string;
    /** [lambda](/automations/templates#config-lambda): Lambda to be evaluated every update interval to get the current value... */
    lambda?: unknown;
    /** boolean: Whether to operate in optimistic mode - when in this mode, any command sent to the template text will immedi... */
    optimistic?: boolean;
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote (like Home Assistant'...
     * @yamlKey set_action
     */
    setAction?: TriggerHandler;
    /**
     * String: The value to set the state to on setup if not restored with `restore_value`. Cannot be used with `lambda`. De...
     * @yamlKey initial_value
     */
    initialValue?: string;
    /**
     * boolean: Saves and loads the state to RTC/Flash. Cannot be used with `lambda`. Defaults to `false`.
     * @yamlKey restore_value
     */
    restoreValue?: boolean;
    /**
     * [Time](/guides/configuration-types#time): The interval on which to update the text by executing the `lambda`. Default...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
export type TextProps = (TextBaseProps & {
    platform: "copy";
} & CopyProps & ComponentProps<copy_CopyText>) | (TextBaseProps & {
    platform: "lvgl";
} & LvglProps & ComponentProps<lvgl_LVGLText>) | (TextBaseProps & {
    platform: "template";
} & TemplateProps & ComponentProps<template__TemplateText>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            text: TextProps;
        }
    }
}
