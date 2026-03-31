// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent, _CoreEntityBase } from "../bases";
import type { template__TemplateWaterHeater } from "../markers";
interface WaterHeaterVisualProps {
    /** @yamlKey min_temperature */
    minTemperature?: unknown;
    /** @yamlKey max_temperature */
    maxTemperature?: unknown;
    /** @yamlKey target_temperature_step */
    targetTemperatureStep?: unknown;
}
interface WaterHeaterBaseProps extends _CoreEntityBase {
    visual?: WaterHeaterVisualProps;
}
interface TemplateProps extends _CoreComponent {
    /** boolean: Whether to operate in optimistic mode - when in this mode, any command sent to the template water heater wil... */
    optimistic?: boolean | EmbedValue<boolean>;
    /**
     * [Action](/automations/actions#all-actions): The action to perform when the water heater receives a command (mode chan...
     * @yamlKey set_action
     */
    setAction?: TriggerHandler;
    /**
     * enum: Control how the water heater attempts to restore state on bootup.
     * @yamlKey restore_mode
     */
    restoreMode?: "NO_RESTORE" | "RESTORE" | "RESTORE_AND_CALL";
    /**
     * [lambda](/automations/templates#config-lambda): Lambda to be evaluated repeatedly to get the current temperature of t...
     * @yamlKey current_temperature
     */
    currentTemperature?: unknown;
    /**
     * [lambda](/automations/templates#config-lambda): Lambda to be evaluated repeatedly to get the target temperature of th...
     * @yamlKey target_temperature
     */
    targetTemperature?: unknown;
    /** [lambda](/automations/templates#config-lambda): Lambda to be evaluated repeatedly to get the current operation mode. ... */
    mode?: unknown;
    /**
     * list: Static list of operation modes that will be exposed to the frontend (for example Home Assistant). This controls...
     * @yamlKey supported_modes
     */
    supportedModes?: Array<"OFF" | "ECO" | "ELECTRIC" | "PERFORMANCE" | "HIGH_DEMAND" | "HEAT_PUMP" | "GAS">;
    /** [lambda](/automations/templates#config-lambda): Lambda to be evaluated repeatedly to get the current away mode state.... */
    away?: unknown;
    /**
     * [lambda](/automations/templates#config-lambda): Lambda to be evaluated repeatedly to get the current On/Off state. Ex...
     * @yamlKey is_on
     */
    isOn?: unknown;
}
export type WaterHeaterProps = WaterHeaterBaseProps & {
    platform: "template";
} & TemplateProps & ComponentProps<template__TemplateWaterHeater>;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            water_heater: WaterHeaterProps;
        }
    }
}
