// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreEntityBase, _CoreMqttCommandComponent, _TemplateDatetime_Base } from "../bases";
import type { __marker_template__TemplateDate, __marker_template__TemplateDateTime, __marker_template__TemplateTime, __marker_time_RealTimeClock, __marker_web_server_WebServer } from "../markers";
interface DatetimeWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DatetimeBaseProps extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey on_value */
    onValue?: TriggerHandler;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the time entity. Automatically set to the ID of a t...
     * @yamlKey time_id
     */
    timeId?: RefProp<__marker_time_RealTimeClock>;
    /** @yamlKey web_server */
    webServer?: DatetimeWebServerProps;
}
interface TemplateDATEProps extends _TemplateDatetime_Base {
    /**
     * string: The value to set the state to on setup if not restored with `restore_value`. Can be one of:
     * @yamlKey initial_value
     */
    initialValue?: string;
    type?: "DATE";
}
interface TemplateDATETIMEProps extends _TemplateDatetime_Base {
    /**
     * string: The value to set the state to on setup if not restored with `restore_value`. Can be one of:
     * @yamlKey initial_value
     */
    initialValue?: string;
    /** @yamlKey on_time */
    onTime?: TriggerHandler;
    type?: "DATETIME";
}
interface TemplateTIMEProps extends _TemplateDatetime_Base {
    /**
     * string: The value to set the state to on setup if not restored with `restore_value`. Can be one of:
     * @yamlKey initial_value
     */
    initialValue?: string;
    /** @yamlKey on_time */
    onTime?: TriggerHandler;
    type?: "TIME";
}
export type DatetimeProps = (DatetimeBaseProps & {
    platform: "template";
    type: "DATE";
} & TemplateDATEProps & ComponentProps<__marker_template__TemplateDate>) | (DatetimeBaseProps & {
    platform: "template";
    type: "DATETIME";
} & TemplateDATETIMEProps & ComponentProps<__marker_template__TemplateDateTime>) | (DatetimeBaseProps & {
    platform: "template";
    type: "TIME";
} & TemplateTIMEProps & ComponentProps<__marker_template__TemplateTime>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            datetime: DatetimeProps;
        }
    }
}
