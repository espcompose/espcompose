// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent, _CoreEntityBase, _CoreMqttComponent } from "../bases";
import type { __marker_copy_CopyText, __marker_lvgl_LVGLText, __marker_template__TemplateText, __marker_text_Text, __marker_web_server_WebServer } from "../markers";
interface TextWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface TextBaseProps extends _CoreEntityBase, _CoreMqttComponent {
    /** string: Defines how the text should be displayed in the frontend. One of `text` or `password`. */
    mode: "PASSWORD" | "TEXT";
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler;
    /** @yamlKey web_server */
    webServer?: TextWebServerProps;
}
interface CopyProps extends _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The text that should be mirrored.
     * @yamlKey source_id
     */
    sourceId: RefProp<__marker_text_Text>;
}
interface LvglProps {
    widget: RefProp<unknown>;
}
interface TemplateProps extends _CoreComponent {
    /**
     * String: The value to set the state to on setup if not restored with `restore_value`. Cannot be used with `lambda`. De...
     * @yamlKey initial_value
     */
    initialValue?: string;
    /** [lambda](https://esphome.io/automations/templates#config-lambda): Lambda to be evaluated every update interval to get... */
    lambda?: unknown;
    /**
     * int: The maximum length this text can be. Defaults to `255`.
     * @yamlKey max_length
     */
    maxLength?: number;
    /**
     * int: The minimum length this text can be. Defaults to `0`.
     * @yamlKey min_length
     */
    minLength?: number;
    /** boolean: Whether to operate in optimistic mode - when in this mode, any command sent to the template text will immedi... */
    optimistic?: boolean;
    pattern?: string;
    /**
     * boolean: Saves and loads the state to RTC/Flash. Cannot be used with `lambda`. Defaults to `false`.
     * @yamlKey restore_value
     */
    restoreValue?: boolean;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote (li...
     * @yamlKey set_action
     */
    setAction?: TriggerHandler;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The interval on which to update the text by executing the...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
export type TextProps = (TextBaseProps & {
    platform: "copy";
} & CopyProps & ComponentProps<__marker_copy_CopyText>) | (TextBaseProps & {
    platform: "lvgl";
} & LvglProps & ComponentProps<__marker_lvgl_LVGLText>) | (TextBaseProps & {
    platform: "template";
} & TemplateProps & ComponentProps<__marker_template__TemplateText>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            text: TextProps;
        }
    }
}
