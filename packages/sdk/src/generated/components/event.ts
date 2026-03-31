// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent, _CoreEntityBase, _CoreMqttComponent, _UartDevice } from "../bases";
import type { template__TemplateEvent, uart_UARTEvent, web_server_WebServer } from "../markers";
interface EventWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface EventBaseProps extends _CoreEntityBase, _CoreMqttComponent {
    /** @yamlKey web_server */
    webServer?: EventWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "button" | "doorbell" | "" | "motion";
    /** @yamlKey on_event */
    onEvent?: TriggerHandler;
}
interface TemplateProps {
    /**
     * list: A list of custom event identifiers that this template event is capable of triggering. These identifiers can be ...
     * @yamlKey event_types
     */
    eventTypes: Array<string>;
}
interface UartProps extends _UartDevice, _CoreComponent {
    /** @yamlKey event_types */
    eventTypes: unknown;
}
export type EventProps = (EventBaseProps & {
    platform: "template";
} & TemplateProps & ComponentProps<template__TemplateEvent>) | (EventBaseProps & {
    platform: "uart";
} & UartProps & ComponentProps<uart_UARTEvent>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            event: EventProps;
        }
    }
}
