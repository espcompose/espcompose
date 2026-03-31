// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent, _CoreEntityBase, _CoreMqttCommandComponent } from "../bases";
import type { binary_sensor_BinarySensor, template__TemplateAlarmControlPanel, web_server_WebServer } from "../markers";
interface AlarmControlPanelWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface TemplateBinarySensorsProps {
    /** string: The id of the binary sensor component */
    input: RefProp<binary_sensor_BinarySensor>;
    /**
     * boolean: This binary sensor will not trigger the alarm when in `armed_home` state.
     * @yamlKey bypass_armed_home
     */
    bypassArmedHome?: boolean | EmbedValue<boolean>;
    /**
     * boolean: This binary sensor will not trigger the alarm when in `armed_night` state.
     * @yamlKey bypass_armed_night
     */
    bypassArmedNight?: boolean | EmbedValue<boolean>;
    /**
     * boolean: This binary sensor will be automatically bypassed if left on/open at the time of arming.
     * @yamlKey bypass_auto
     */
    bypassAuto?: boolean | EmbedValue<boolean>;
    /** boolean: When set `true`, the chime callback will be called whenever the sensor goes from closed to open. (`false` is... */
    chime?: boolean | EmbedValue<boolean>;
    /**
     * string: Sets the trigger mode for this sensor. One of `delayed`, `instant`, `instant_always`, or `delayed_follower`. ...
     * @yamlKey trigger_mode
     */
    triggerMode?: "DELAYED" | "INSTANT" | "DELAYED_FOLLOWER" | "INSTANT_ALWAYS";
}
interface AlarmControlPanelBaseProps extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey web_server */
    webServer?: AlarmControlPanelWebServerProps;
    /** @yamlKey on_state */
    onState?: TriggerHandler;
    /** @yamlKey on_triggered */
    onTriggered?: TriggerHandler;
    /** @yamlKey on_arming */
    onArming?: TriggerHandler;
    /** @yamlKey on_pending */
    onPending?: TriggerHandler;
    /** @yamlKey on_armed_home */
    onArmedHome?: TriggerHandler;
    /** @yamlKey on_armed_night */
    onArmedNight?: TriggerHandler;
    /** @yamlKey on_armed_away */
    onArmedAway?: TriggerHandler;
    /** @yamlKey on_disarmed */
    onDisarmed?: TriggerHandler;
    /** @yamlKey on_cleared */
    onCleared?: TriggerHandler;
    /** @yamlKey on_chime */
    onChime?: TriggerHandler;
    /** @yamlKey on_ready */
    onReady?: TriggerHandler;
}
interface TemplateProps extends _CoreComponent {
    /** list of string: A list of codes for disarming the alarm, if *requires_code_to_arm* set to true then for arming the al... */
    codes?: Array<string>;
    /**
     * boolean: Code required for arming the alarm, *codes* must be provided.
     * @yamlKey requires_code_to_arm
     */
    requiresCodeToArm?: boolean | EmbedValue<boolean>;
    /**
     * [Time](/guides/configuration-types#time): The exit delay before the alarm is armed to home mode.
     * @yamlKey arming_home_time
     */
    armingHomeTime?: TimePeriod;
    /**
     * [Time](/guides/configuration-types#time): The exit delay before the alarm is armed to night mode.
     * @yamlKey arming_night_time
     */
    armingNightTime?: TimePeriod;
    /**
     * [Time](/guides/configuration-types#time): The exit delay before the alarm is armed to away mode. Defaults to `0s`.
     * @yamlKey arming_away_time
     */
    armingAwayTime?: TimePeriod;
    /**
     * [Time](/guides/configuration-types#time): The entry delay before the alarm is triggered. Defaults to `0s`.
     * @yamlKey pending_time
     */
    pendingTime?: TimePeriod;
    /**
     * [Time](/guides/configuration-types#time): The time after a triggered alarm before resetting to previous state if the ...
     * @yamlKey trigger_time
     */
    triggerTime?: TimePeriod;
    /**
     * *list*: A list of binary sensors the panel should use. Each consists of:
     * @yamlKey binary_sensors
     */
    binarySensors?: Array<TemplateBinarySensorsProps>;
    /** @yamlKey restore_mode */
    restoreMode?: "ALWAYS_DISARMED" | "RESTORE_DEFAULT_DISARMED";
}
export type AlarmControlPanelProps = AlarmControlPanelBaseProps & {
    platform: "template";
} & TemplateProps & ComponentProps<template__TemplateAlarmControlPanel>;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            alarm_control_panel: AlarmControlPanelProps;
        }
    }
}
