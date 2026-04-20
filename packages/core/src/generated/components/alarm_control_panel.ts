// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent, _CoreEntityBase, _CoreMqttCommandComponent } from "../bases";
import type { __marker_binary_sensor_BinarySensor, __marker_template__TemplateAlarmControlPanel, __marker_web_server_WebServer } from "../markers";
interface AlarmControlPanelWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface TemplateBinarySensorsProps {
    /**
     * boolean: This binary sensor will not trigger the alarm when in `armed_home` state.
     * @yamlKey bypass_armed_home
     */
    bypassArmedHome?: boolean;
    /**
     * boolean: This binary sensor will not trigger the alarm when in `armed_night` state.
     * @yamlKey bypass_armed_night
     */
    bypassArmedNight?: boolean;
    /**
     * boolean: This binary sensor will be automatically bypassed if left on/open at the time of arming.
     * @yamlKey bypass_auto
     */
    bypassAuto?: boolean;
    /** boolean: When set `true`, the chime callback will be called whenever the sensor goes from closed to open. (`false` is... */
    chime?: boolean;
    /** string: The id of the binary sensor component */
    input: RefProp<__marker_binary_sensor_BinarySensor>;
    /**
     * string: Sets the trigger mode for this sensor. One of `delayed`, `instant`, `instant_always`, or `delayed_follower`. ...
     * @yamlKey trigger_mode
     */
    triggerMode?: "DELAYED" | "DELAYED_FOLLOWER" | "INSTANT" | "INSTANT_ALWAYS";
}
interface AlarmControlPanelBaseProps extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** string: Manually specify the ID for code generation. At least one of id and name must be specified. */
    id?: string;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the alarm state changes t...
     * @yamlKey on_armed_away
     */
    onArmedAway?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the alarm state changes t...
     * @yamlKey on_armed_home
     */
    onArmedHome?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the alarm state changes t...
     * @yamlKey on_armed_night
     */
    onArmedNight?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the alarm state changes t...
     * @yamlKey on_arming
     */
    onArming?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when a zone has been marked as...
     * @yamlKey on_chime
     */
    onChime?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the alarm clears. See [`o...
     * @yamlKey on_cleared
     */
    onCleared?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the alarm state changes t...
     * @yamlKey on_disarmed
     */
    onDisarmed?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the alarm state changes t...
     * @yamlKey on_pending
     */
    onPending?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the logical 'and' of all ...
     * @yamlKey on_ready
     */
    onReady?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the alarm changes state. ...
     * @yamlKey on_state
     */
    onState?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the alarm triggers. See [...
     * @yamlKey on_triggered
     */
    onTriggered?: TriggerHandler;
    /** @yamlKey web_server */
    webServer?: AlarmControlPanelWebServerProps;
}
interface TemplateProps extends _CoreComponent {
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The exit delay before the alarm is armed to away mode. De...
     * @yamlKey arming_away_time
     */
    armingAwayTime?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The exit delay before the alarm is armed to home mode.
     * @yamlKey arming_home_time
     */
    armingHomeTime?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The exit delay before the alarm is armed to night mode.
     * @yamlKey arming_night_time
     */
    armingNightTime?: TimePeriod;
    /**
     * *list*: A list of binary sensors the panel should use. Each consists of:
     * @yamlKey binary_sensors
     */
    binarySensors?: Array<TemplateBinarySensorsProps>;
    /** list of string: A list of codes for disarming the alarm, if *requires_code_to_arm* set to true then for arming the al... */
    codes?: Array<string>;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The entry delay before the alarm is triggered. Defaults t...
     * @yamlKey pending_time
     */
    pendingTime?: TimePeriod;
    /**
     * boolean: Code required for arming the alarm, *codes* must be provided.
     * @yamlKey requires_code_to_arm
     */
    requiresCodeToArm?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "ALWAYS_DISARMED" | "RESTORE_DEFAULT_DISARMED";
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The time after a triggered alarm before resetting to prev...
     * @yamlKey trigger_time
     */
    triggerTime?: TimePeriod;
}
export type AlarmControlPanelProps = AlarmControlPanelBaseProps & {
    platform: "template";
} & TemplateProps & ComponentProps<__marker_template__TemplateAlarmControlPanel>;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            alarm_control_panel: AlarmControlPanelProps;
        }
    }
}
