// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreEntityBase, _CoreMqttCommandComponent, _TemplateDatetime_Base } from "../bases";
import type { template__TemplateDate, template__TemplateDateTime, template__TemplateTime, time_RealTimeClock, web_server_WebServer } from "../markers";
interface DatetimeWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DatetimeBaseProps extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey on_value */
    onValue?: () => void;
    /** @yamlKey time_id */
    timeId?: RefProp<time_RealTimeClock>;
    /** @yamlKey web_server */
    webServer?: DatetimeWebServerProps;
}
interface TemplateDATEProps extends _TemplateDatetime_Base {
    type?: "DATE";
    /**
     * string: The value to set the state to on setup if not restored with `restore_value`. Can be one of:
     * @yamlKey initial_value
     */
    initialValue?: unknown;
}
interface TemplateTIMEProps extends _TemplateDatetime_Base {
    type?: "TIME";
    /** @yamlKey on_time */
    onTime?: () => void;
    /**
     * string: The value to set the state to on setup if not restored with `restore_value`. Can be one of:
     * @yamlKey initial_value
     */
    initialValue?: unknown;
}
interface TemplateDATETIMEProps extends _TemplateDatetime_Base {
    type?: "DATETIME";
    /** @yamlKey on_time */
    onTime?: () => void;
    /**
     * string: The value to set the state to on setup if not restored with `restore_value`. Can be one of:
     * @yamlKey initial_value
     */
    initialValue?: unknown;
}
export type DatetimeProps = (DatetimeBaseProps & {
    platform: "template";
    type: "DATE";
} & TemplateDATEProps & ComponentProps<template__TemplateDate>) | (DatetimeBaseProps & {
    platform: "template";
    type: "TIME";
} & TemplateTIMEProps & ComponentProps<template__TemplateTime>) | (DatetimeBaseProps & {
    platform: "template";
    type: "DATETIME";
} & TemplateDATETIMEProps & ComponentProps<template__TemplateDateTime>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            datetime: DatetimeProps;
        }
    }
}
