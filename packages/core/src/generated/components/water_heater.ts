// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent, _CoreEntityBase } from "../bases";
import type { __marker_template__TemplateWaterHeater } from "../markers";
interface WaterHeaterVisualProps {
    /**
     * float: Override the maximum temperature shown in the frontend.
     * @yamlKey max_temperature
     */
    maxTemperature?: number;
    /**
     * float: Override the minimum temperature shown in the frontend.
     * @yamlKey min_temperature
     */
    minTemperature?: number;
    /**
     * float: Override the temperature steps shown in the frontend.
     * @yamlKey target_temperature_step
     */
    targetTemperatureStep?: number;
}
interface WaterHeaterBaseProps extends _CoreEntityBase {
    /** [ID](https://esphome.io/guides/configuration-types#id): The water heater to control. */
    id?: unknown;
    /** string: The operation mode to set. See [Modes](https://esphome.io/components/water_heater#water-heater-modes) for ava... */
    mode?: string;
    /**
     * list: Static list of operation modes that will be exposed to the frontend (for example Home Assistant). When not spec...
     * @yamlKey supported_modes
     */
    supportedModes?: unknown;
    /**
     * float: The target temperature to set (e.g., `60.0`).
     * @yamlKey target_temperature
     */
    targetTemperature?: number;
    /** Configuration for the frontend representation. */
    visual?: WaterHeaterVisualProps;
}
interface TemplateProps extends _CoreComponent {
    /** [lambda](https://esphome.io/automations/templates#config-lambda): Lambda to be evaluated repeatedly to get the curren... */
    away?: unknown;
    /**
     * [lambda](https://esphome.io/automations/templates#config-lambda): Lambda to be evaluated repeatedly to get the curren...
     * @yamlKey current_temperature
     */
    currentTemperature?: unknown;
    /**
     * [lambda](https://esphome.io/automations/templates#config-lambda): Lambda to be evaluated repeatedly to get the curren...
     * @yamlKey is_on
     */
    isOn?: unknown;
    /** [lambda](https://esphome.io/automations/templates#config-lambda): Lambda to be evaluated repeatedly to get the curren... */
    mode?: unknown;
    /** boolean: Whether to operate in optimistic mode - when in this mode, any command sent to the template water heater wil... */
    optimistic?: boolean;
    /**
     * enum: Control how the water heater attempts to restore state on bootup.
     * @yamlKey restore_mode
     */
    restoreMode?: "NO_RESTORE" | "RESTORE" | "RESTORE_AND_CALL";
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action to perform when the water heater receives a ...
     * @yamlKey set_action
     */
    setAction?: TriggerHandler;
    /**
     * list: Static list of operation modes that will be exposed to the frontend (for example Home Assistant). This controls...
     * @yamlKey supported_modes
     */
    supportedModes?: Array<"ECO" | "ELECTRIC" | "GAS" | "HEAT_PUMP" | "HIGH_DEMAND" | "OFF" | "PERFORMANCE">;
    /**
     * [lambda](https://esphome.io/automations/templates#config-lambda): Lambda to be evaluated repeatedly to get the target...
     * @yamlKey target_temperature
     */
    targetTemperature?: unknown;
}
export type WaterHeaterProps = WaterHeaterBaseProps & {
    platform: "template";
} & TemplateProps & ComponentProps<__marker_template__TemplateWaterHeater>;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            water_heater: WaterHeaterProps;
        }
    }
}
