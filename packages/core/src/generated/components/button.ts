// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, MACAddress, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent, _CoreEntityBase, _CoreMqttCommandComponent, _UartDevice } from "../bases";
import type { __marker_Device, __marker_EntityBase, __marker_atm90e32_ATM90E32Component, __marker_bl0940_BL0940, __marker_bl0940_CalibrationResetButton, __marker_button_Button, __marker_copy_CopyButton, __marker_factory_reset_FactoryResetButton, __marker_haier_HonClimate, __marker_ld2410_LD2410Component, __marker_ld2412_LD2412Component, __marker_ld2420_LD2420Component, __marker_ld2450_LD2450Component, __marker_micronova_MicroNova, __marker_mqtt_MQTTButtonComponent, __marker_output_BinaryOutput, __marker_output_OutputButton, __marker_restart_RestartButton, __marker_safe_mode_SafeModeButton, __marker_safe_mode_SafeModeComponent, __marker_seeed_mr24hpc1_MR24HPC1Component, __marker_seeed_mr60fda2_MR60FDA2Component, __marker_shutdown_ShutdownButton, __marker_template__TemplateButton, __marker_uart_UARTButton, __marker_wake_on_lan_WakeOnLanButton, __marker_web_server_WebServer } from "../markers";
interface ButtonWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Atm90e32ClearGainCalibrationPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Atm90e32ClearGainCalibrationPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Atm90e32ClearGainCalibrationProps {
    availability?: Atm90e32ClearGainCalibrationPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Atm90e32ClearGainCalibrationPropsWebServerProps;
}
interface Atm90e32ClearOffsetCalibrationPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Atm90e32ClearOffsetCalibrationPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Atm90e32ClearOffsetCalibrationProps {
    availability?: Atm90e32ClearOffsetCalibrationPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Atm90e32ClearOffsetCalibrationPropsWebServerProps;
}
interface Atm90e32ClearPowerOffsetCalibrationPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Atm90e32ClearPowerOffsetCalibrationPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Atm90e32ClearPowerOffsetCalibrationProps {
    availability?: Atm90e32ClearPowerOffsetCalibrationPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Atm90e32ClearPowerOffsetCalibrationPropsWebServerProps;
}
interface Atm90e32RunGainCalibrationPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Atm90e32RunGainCalibrationPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Atm90e32RunGainCalibrationProps {
    availability?: Atm90e32RunGainCalibrationPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Atm90e32RunGainCalibrationPropsWebServerProps;
}
interface Atm90e32RunOffsetCalibrationPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Atm90e32RunOffsetCalibrationPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Atm90e32RunOffsetCalibrationProps {
    availability?: Atm90e32RunOffsetCalibrationPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Atm90e32RunOffsetCalibrationPropsWebServerProps;
}
interface Atm90e32RunPowerOffsetCalibrationPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Atm90e32RunPowerOffsetCalibrationPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Atm90e32RunPowerOffsetCalibrationProps {
    availability?: Atm90e32RunPowerOffsetCalibrationPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Atm90e32RunPowerOffsetCalibrationPropsWebServerProps;
}
interface HaierSelfCleaningPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface HaierSelfCleaningPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface HaierSelfCleaningProps {
    availability?: HaierSelfCleaningPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: HaierSelfCleaningPropsWebServerProps;
}
interface HaierSteriCleaningPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface HaierSteriCleaningPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface HaierSteriCleaningProps {
    availability?: HaierSteriCleaningPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: HaierSteriCleaningPropsWebServerProps;
}
interface Ld2410FactoryResetPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410FactoryResetPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410FactoryResetProps {
    availability?: Ld2410FactoryResetPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2410FactoryResetPropsWebServerProps;
}
interface Ld2410QueryParamsPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410QueryParamsPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410QueryParamsProps {
    availability?: Ld2410QueryParamsPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2410QueryParamsPropsWebServerProps;
}
interface Ld2410RestartPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410RestartPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410RestartProps {
    availability?: Ld2410RestartPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2410RestartPropsWebServerProps;
}
interface Ld2412FactoryResetPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412FactoryResetPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412FactoryResetProps {
    availability?: Ld2412FactoryResetPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2412FactoryResetPropsWebServerProps;
}
interface Ld2412QueryParamsPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412QueryParamsPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412QueryParamsProps {
    availability?: Ld2412QueryParamsPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2412QueryParamsPropsWebServerProps;
}
interface Ld2412RestartPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412RestartPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412RestartProps {
    availability?: Ld2412RestartPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2412RestartPropsWebServerProps;
}
interface Ld2412StartDynamicBackgroundCorrectionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412StartDynamicBackgroundCorrectionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412StartDynamicBackgroundCorrectionProps {
    availability?: Ld2412StartDynamicBackgroundCorrectionPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2412StartDynamicBackgroundCorrectionPropsWebServerProps;
}
interface Ld2420ApplyConfigPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420ApplyConfigPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420ApplyConfigProps {
    availability?: Ld2420ApplyConfigPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2420ApplyConfigPropsWebServerProps;
}
interface Ld2420FactoryResetPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420FactoryResetPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420FactoryResetProps {
    availability?: Ld2420FactoryResetPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2420FactoryResetPropsWebServerProps;
}
interface Ld2420RestartModulePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420RestartModulePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420RestartModuleProps {
    availability?: Ld2420RestartModulePropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2420RestartModulePropsWebServerProps;
}
interface Ld2420RevertConfigPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420RevertConfigPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420RevertConfigProps {
    availability?: Ld2420RevertConfigPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2420RevertConfigPropsWebServerProps;
}
interface Ld2450FactoryResetPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450FactoryResetPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450FactoryResetProps {
    availability?: Ld2450FactoryResetPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2450FactoryResetPropsWebServerProps;
}
interface Ld2450RestartPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450RestartPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450RestartProps {
    availability?: Ld2450RestartPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: Ld2450RestartPropsWebServerProps;
}
interface MicronovaCustomButtonPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface MicronovaCustomButtonPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface MicronovaCustomButtonProps {
    availability?: MicronovaCustomButtonPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** @yamlKey memory_address */
    memoryAddress: unknown;
    /** @yamlKey memory_data */
    memoryData: unknown;
    /** @yamlKey memory_location */
    memoryLocation: unknown;
    /** @yamlKey micronova_id */
    micronovaId?: RefProp<__marker_micronova_MicroNova>;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: MicronovaCustomButtonPropsWebServerProps;
}
interface SeeedMr24hpc1CustomSetEndPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SeeedMr24hpc1CustomSetEndPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SeeedMr24hpc1CustomSetEndProps {
    availability?: SeeedMr24hpc1CustomSetEndPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1CustomSetEndPropsWebServerProps;
}
interface SeeedMr24hpc1RestartPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SeeedMr24hpc1RestartPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SeeedMr24hpc1RestartProps {
    availability?: SeeedMr24hpc1RestartPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1RestartPropsWebServerProps;
}
interface SeeedMr60fda2FactoryResetPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SeeedMr60fda2FactoryResetPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SeeedMr60fda2FactoryResetProps {
    availability?: SeeedMr60fda2FactoryResetPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: SeeedMr60fda2FactoryResetPropsWebServerProps;
}
interface SeeedMr60fda2GetRadarParametersPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SeeedMr60fda2GetRadarParametersPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SeeedMr60fda2GetRadarParametersProps {
    availability?: SeeedMr60fda2GetRadarParametersPropsAvailabilityProps;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the button in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the button. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey web_server */
    webServer?: SeeedMr60fda2GetRadarParametersPropsWebServerProps;
}
interface ButtonBaseProps extends _CoreEntityBase, _CoreMqttCommandComponent {
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** string: Manually specify the ID for code generation. At least one of id and name must be specified. */
    id?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /** @yamlKey web_server */
    webServer?: ButtonWebServerProps;
}
interface Atm90e32Props {
    /**
     * A button to clear the gain calibration from flash memory and use default values, or values defined under `gain_voltag...
     * @yamlKey clear_gain_calibration
     */
    clearGainCalibration?: Atm90e32ClearGainCalibrationProps;
    /**
     * A button to clear the gain calibration from flash memory and use default values, or values defined under `offset_volt...
     * @yamlKey clear_offset_calibration
     */
    clearOffsetCalibration?: Atm90e32ClearOffsetCalibrationProps;
    /**
     * A button to clear the gain calibration from flash memory and use default values, or values defined under `offset_acti...
     * @yamlKey clear_power_offset_calibration
     */
    clearPowerOffsetCalibration?: Atm90e32ClearPowerOffsetCalibrationProps;
    /** [ID](https://esphome.io/guides/configuration-types#id): The ID of the `atm90e32` sensor defined above. Required if us... */
    id?: RefProp<__marker_atm90e32_ATM90E32Component>;
    /**
     * A button to run the gain calibration. `enable_gain_calibration` must be `True`. These values can be permanently store...
     * @yamlKey run_gain_calibration
     */
    runGainCalibration?: Atm90e32RunGainCalibrationProps;
    /**
     * A button to run the offset calibration. `enable_offset_calibration` must be `True`. These values can be permanently s...
     * @yamlKey run_offset_calibration
     */
    runOffsetCalibration?: Atm90e32RunOffsetCalibrationProps;
    /**
     * A button to run the power offset calibration. `enable_offset_calibration` must be `True`. These values can be permane...
     * @yamlKey run_power_offset_calibration
     */
    runPowerOffsetCalibration?: Atm90e32RunPowerOffsetCalibrationProps;
}
interface Bl0940Props extends _CoreComponent {
    /** @yamlKey bl0940_id */
    bl0940Id?: RefProp<__marker_bl0940_BL0940>;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    icon?: unknown;
}
interface CopyProps extends _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The button that should be mirrored.
     * @yamlKey source_id
     */
    sourceId: RefProp<__marker_button_Button>;
}
interface FactoryResetProps extends _CoreComponent {
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    icon?: unknown;
}
interface HaierProps {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The id of Haier climate component
     * @yamlKey haier_id
     */
    haierId?: RefProp<__marker_haier_HonClimate>;
    /**
     * A button that starts Haier climate self cleaning. All options from [Button](https://esphome.io/components/button#conf...
     * @yamlKey self_cleaning
     */
    selfCleaning?: HaierSelfCleaningProps;
    /**
     * A button that starts Haier climate 56°C Steri-Clean. All options from [Button](https://esphome.io/components/button#c...
     * @yamlKey steri_cleaning
     */
    steriCleaning?: HaierSteriCleaningProps;
}
interface Ld2410Props {
    /**
     * This command is used to restore all configuration values to their original values. All options from [Button](https://...
     * @yamlKey factory_reset
     */
    factoryReset?: Ld2410FactoryResetProps;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID for the [Ld2410](https://esphome.io/c...
     * @yamlKey ld2410_id
     */
    ld2410Id?: RefProp<__marker_ld2410_LD2410Component>;
    /**
     * Refresh all sensors values of the device. All options from [Button](https://esphome.io/components/button#config-button).
     * @yamlKey query_params
     */
    queryParams?: Ld2410QueryParamsProps;
    /** Restart the device. All options from [Button](https://esphome.io/components/button#config-button). */
    restart?: Ld2410RestartProps;
}
interface Ld2412Props {
    /**
     * This command is used to restore all configuration values to their original values. All options from [Button](https://...
     * @yamlKey factory_reset
     */
    factoryReset?: Ld2412FactoryResetProps;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID for the component. Required when usin...
     * @yamlKey ld2412_id
     */
    ld2412Id?: RefProp<__marker_ld2412_LD2412Component>;
    /**
     * Refresh all sensors values of the device. All options from [Button](https://esphome.io/components/button#config-button).
     * @yamlKey query_params
     */
    queryParams?: Ld2412QueryParamsProps;
    /** Restart the device. All options from [Button](https://esphome.io/components/button#config-button). */
    restart?: Ld2412RestartProps;
    /**
     * Start the Dynamic Background Correction All options from [Button](https://esphome.io/components/button#config-button).
     * @yamlKey start_dynamic_background_correction
     */
    startDynamicBackgroundCorrection?: Ld2412StartDynamicBackgroundCorrectionProps;
}
interface Ld2420Props {
    /**
     * Saves both manual config tuning or the auto calibrate still and move threshold config settings. May contain any optio...
     * @yamlKey apply_config
     */
    applyConfig: Ld2420ApplyConfigProps;
    /**
     * Restores a base set of LD2420 configuration values. May contain any options from [Button](https://esphome.io/componen...
     * @yamlKey factory_reset
     */
    factoryReset?: Ld2420FactoryResetProps;
    /** @yamlKey ld2420_id */
    ld2420Id?: RefProp<__marker_ld2420_LD2420Component>;
    /**
     * Reboots the LD2420 modules. May contain any options from [Button](https://esphome.io/components/button#config-button).
     * @yamlKey restart_module
     */
    restartModule?: Ld2420RestartModuleProps;
    /**
     * Undoes in-progress edits prior to their application via the `apply_config` button. May contain any options from [Butt...
     * @yamlKey revert_config
     */
    revertConfig?: Ld2420RevertConfigProps;
}
interface Ld2450Props {
    /**
     * Resets the `ld2450` to its factory default configuration/values. All options from [Button](https://esphome.io/compone...
     * @yamlKey factory_reset
     */
    factoryReset?: Ld2450FactoryResetProps;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID for the [Ld2450](https://esphome.io/c...
     * @yamlKey ld2450_id
     */
    ld2450Id?: RefProp<__marker_ld2450_LD2450Component>;
    /** Restart the `ld2450` device. All options from [Button](https://esphome.io/components/button#config-button). */
    restart?: Ld2450RestartProps;
}
interface MicronovaProps {
    /** @yamlKey custom_button */
    customButton?: MicronovaCustomButtonProps;
    /** @yamlKey micronova_id */
    micronovaId?: RefProp<__marker_micronova_MicroNova>;
}
interface OutputProps extends _CoreComponent {
    /** [Time](https://esphome.io/guides/configuration-types#time): How long the output should be set when the button is pres... */
    duration: TimePeriod;
    /** [ID](https://esphome.io/guides/configuration-types#id): The ID of the output component to use. */
    output: RefProp<__marker_output_BinaryOutput>;
}
interface RestartProps extends _CoreComponent {
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    icon?: unknown;
}
interface SafeModeProps extends _CoreComponent {
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    icon?: unknown;
    /** @yamlKey safe_mode */
    safeMode?: RefProp<__marker_safe_mode_SafeModeComponent>;
}
interface SeeedMr24hpc1Props {
    /**
     * Valid only in [custom mode settings](https://esphome.io/components/seeed_mr24hpc1#seeed_mr24hpc1-custom_mode). This b...
     * @yamlKey custom_set_end
     */
    customSetEnd?: SeeedMr24hpc1CustomSetEndProps;
    /** @yamlKey mr24hpc1_id */
    mr24hpc1Id?: RefProp<__marker_seeed_mr24hpc1_MR24HPC1Component>;
    /** Restart the device. All options from [Button](https://esphome.io/components/button#config-button). */
    restart?: SeeedMr24hpc1RestartProps;
}
interface SeeedMr60fda2Props {
    /**
     * Restore all radar settings to factory parameters. All options from [Button](https://esphome.io/components/button#conf...
     * @yamlKey factory_reset
     */
    factoryReset?: SeeedMr60fda2FactoryResetProps;
    /**
     * Get all the current setup parameters of the radar. All options from [Button](https://esphome.io/components/button#con...
     * @yamlKey get_radar_parameters
     */
    getRadarParameters?: SeeedMr60fda2GetRadarParametersProps;
    /** @yamlKey mr60fda2_id */
    mr60fda2Id?: RefProp<__marker_seeed_mr60fda2_MR60FDA2Component>;
}
interface ShutdownProps extends _CoreComponent {
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    icon?: unknown;
}
interface UartProps extends _UartDevice, _CoreComponent {
    data: unknown;
}
interface WakeOnLanProps extends _CoreComponent {
    /**
     * MAC Address: The MAC Address of the target computer.
     * @yamlKey target_mac_address
     */
    targetMacAddress: MACAddress;
}
export type ButtonProps = (ButtonBaseProps & {
    platform: "atm90e32";
} & Atm90e32Props & ComponentProps<__marker_mqtt_MQTTButtonComponent>) | (ButtonBaseProps & {
    platform: "bl0940";
} & Bl0940Props & ComponentProps<__marker_bl0940_CalibrationResetButton>) | (ButtonBaseProps & {
    platform: "copy";
} & CopyProps & ComponentProps<__marker_copy_CopyButton>) | (ButtonBaseProps & {
    platform: "factory_reset";
} & FactoryResetProps & ComponentProps<__marker_factory_reset_FactoryResetButton>) | (ButtonBaseProps & {
    platform: "haier";
} & HaierProps & ComponentProps<__marker_mqtt_MQTTButtonComponent>) | (ButtonBaseProps & {
    platform: "ld2410";
} & Ld2410Props & ComponentProps<__marker_EntityBase>) | (ButtonBaseProps & {
    platform: "ld2412";
} & Ld2412Props & ComponentProps<__marker_EntityBase>) | (ButtonBaseProps & {
    platform: "ld2420";
} & Ld2420Props & ComponentProps<__marker_mqtt_MQTTButtonComponent>) | (ButtonBaseProps & {
    platform: "ld2450";
} & Ld2450Props & ComponentProps<__marker_EntityBase>) | (ButtonBaseProps & {
    platform: "micronova";
} & MicronovaProps & ComponentProps<__marker_mqtt_MQTTButtonComponent>) | (ButtonBaseProps & {
    platform: "output";
} & OutputProps & ComponentProps<__marker_output_OutputButton>) | (ButtonBaseProps & {
    platform: "restart";
} & RestartProps & ComponentProps<__marker_restart_RestartButton>) | (ButtonBaseProps & {
    platform: "safe_mode";
} & SafeModeProps & ComponentProps<__marker_safe_mode_SafeModeButton>) | (ButtonBaseProps & {
    platform: "seeed_mr24hpc1";
} & SeeedMr24hpc1Props & ComponentProps<__marker_mqtt_MQTTButtonComponent>) | (ButtonBaseProps & {
    platform: "seeed_mr60fda2";
} & SeeedMr60fda2Props & ComponentProps<__marker_mqtt_MQTTButtonComponent>) | (ButtonBaseProps & {
    platform: "shutdown";
} & ShutdownProps & ComponentProps<__marker_shutdown_ShutdownButton>) | (ButtonBaseProps & {
    platform: "template";
} & ComponentProps<__marker_template__TemplateButton>) | (ButtonBaseProps & {
    platform: "uart";
} & UartProps & ComponentProps<__marker_uart_UARTButton>) | (ButtonBaseProps & {
    platform: "wake_on_lan";
} & WakeOnLanProps & ComponentProps<__marker_wake_on_lan_WakeOnLanButton>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            button: ButtonProps;
        }
    }
}
