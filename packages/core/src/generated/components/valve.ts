// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent, _CoreEntityBase, _CoreMqttCommandComponent } from "../bases";
import type { __marker_template__TemplateValve, __marker_web_server_WebServer } from "../markers";
interface ValveWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface ValveBaseProps extends _CoreEntityBase, _CoreMqttCommandComponent {
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/components/valve/](https://www.home-assis...
     * @yamlKey device_class
     */
    deviceClass?: "" | "gas" | "water";
    /** @yamlKey on_closed */
    onClosed?: TriggerHandler;
    /** @yamlKey on_open */
    onOpen?: TriggerHandler;
    /**
     * string: The topic to receive valve position commands on.
     * @yamlKey position_command_topic
     */
    positionCommandTopic?: string;
    /**
     * string: The topic to publish valve position changes to.
     * @yamlKey position_state_topic
     */
    positionStateTopic?: string;
    /** @yamlKey web_server */
    webServer?: ValveWebServerProps;
}
interface TemplateProps extends _CoreComponent {
    /**
     * boolean: Whether the true state of the valve is not known. This will make the Home Assistant frontend show buttons fo...
     * @yamlKey assumed_state
     */
    assumedState?: boolean;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote req...
     * @yamlKey close_action
     */
    closeAction?: TriggerHandler;
    /**
     * boolean: Whether this valve will publish its position as a floating point number. By default (`false` ), the valve on...
     * @yamlKey has_position
     */
    hasPosition?: boolean;
    /** [lambda](https://esphome.io/automations/templates#config-lambda): Lambda to be evaluated repeatedly to get the curren... */
    lambda?: unknown;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote (li...
     * @yamlKey open_action
     */
    openAction?: TriggerHandler;
    /** boolean: Whether to operate in optimistic mode - when in this mode, any command sent to the template valve will immed... */
    optimistic?: boolean;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote (li...
     * @yamlKey position_action
     */
    positionAction?: TriggerHandler;
    /**
     * enum: Control how the valve attempts to restore state on bootup.
     * @yamlKey restore_mode
     */
    restoreMode?: "NO_RESTORE" | "RESTORE" | "RESTORE_AND_CALL";
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote req...
     * @yamlKey stop_action
     */
    stopAction?: TriggerHandler;
    /** @yamlKey toggle_action */
    toggleAction?: TriggerHandler;
}
export type ValveProps = ValveBaseProps & {
    platform: "template";
} & TemplateProps & ComponentProps<__marker_template__TemplateValve>;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            valve: ValveProps;
        }
    }
}
