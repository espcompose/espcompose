// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, MACAddress, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _BthomeMithermometerBleDevice, _CoreComponent, _CoreEntityBase, _CoreMqttComponent, _HomeassistantHomeAssistantImport, _ModbusControllerModbusitembaseschema, _Msa3xxMsaSensor, _NextionBinarySensorConfigBinarySensor, _PacketTransportBinarySensorStatusSensor, _PipsolarComponent } from "../bases";
import type { __marker_Device, __marker_EntityBase, __marker_analog_threshold_AnalogThresholdBinarySensor, __marker_apds9960_APDS9960, __marker_as3935_AS3935Component, __marker_binary_sensor_BinarySensor, __marker_ble_presence_BLEPresenceDevice, __marker_cap1188_CAP1188Channel, __marker_cap1188_CAP1188Component, __marker_copy_CopyBinarySensor, __marker_cst226_CST226Button, __marker_cst226_CST226Touchscreen, __marker_daly_bms_DalyBmsComponent, __marker_dfrobot_sen0395_DfrobotSen0395Component, __marker_display_DisplayPage, __marker_esp32_ble_tracker_ESP32BLETracker, __marker_esp32_touch_ESP32TouchBinarySensor, __marker_esp32_touch_ESP32TouchComponent, __marker_ezo_pmp_EzoPMP, __marker_fingerprint_grow_FingerprintGrowComponent, __marker_gdk101_GDK101Component, __marker_gpio_GPIOBinarySensor, __marker_gt911_GT911Button, __marker_gt911_GT911Touchscreen, __marker_haier_HonClimate, __marker_hlk_fm22x_HlkFm22xComponent, __marker_homeassistant_HomeassistantBinarySensor, __marker_hydreon_rgxx_HydreonRGxxBinaryComponent, __marker_hydreon_rgxx_HydreonRGxxComponent, __marker_i2c_I2CBus, __marker_ld2410_LD2410Component, __marker_ld2412_LD2412Component, __marker_ld2420_LD2420BinarySensor, __marker_ld2420_LD2420Component, __marker_ld2450_LD2450Component, __marker_lvgl_LvPseudoButton, __marker_m5stack_8angle_M5Stack8AngleComponent, __marker_m5stack_8angle_M5Stack8AngleSwitchBinarySensor, __marker_matrix_keypad_MatrixKeypad, __marker_matrix_keypad_MatrixKeypadBinarySensor, __marker_modbus_controller_ModbusBinarySensor, __marker_mpr121_MPR121BinarySensor, __marker_mpr121_MPR121Component, __marker_nextion_NextionBinarySensor, __marker_nfc_NfcTagBinarySensor, __marker_nfc_Nfcc, __marker_opentherm_OpenthermHub, __marker_packet_transport_PacketTransport, __marker_pn532_PN532, __marker_pn532_PN532BinarySensor, __marker_qwiic_pir_QwiicPIRComponent, __marker_rc522_RC522, __marker_rc522_RC522BinarySensor, __marker_rd03d_RD03DComponent, __marker_rdm6300_RDM6300BinarySensor, __marker_rdm6300_RDM6300Component, __marker_remote_base_RemoteReceiverBase, __marker_sdl_Sdl, __marker_seeed_mr24hpc1_MR24HPC1Component, __marker_seeed_mr60bha2_MR60BHA2Component, __marker_seeed_mr60fda2_MR60FDA2Component, __marker_sensor_Sensor, __marker_sim800l_Sim800LComponent, __marker_status_StatusBinarySensor, __marker_switch__Switch, __marker_switch__SwitchBinarySensor, __marker_sx1509_SX1509BinarySensor, __marker_sx1509_SX1509Component, __marker_sy6970_SY6970Component, __marker_template__TemplateBinarySensor, __marker_tm1637_TM1637Display, __marker_tm1637_TM1637Key, __marker_tm1638_TM1638Component, __marker_tm1638_TM1638Key, __marker_touchscreen_Touchscreen, __marker_touchscreen_TouchscreenBinarySensor, __marker_tt21100_TT21100Button, __marker_tt21100_TT21100Touchscreen, __marker_ttp229_bsf_TTP229BSFChannel, __marker_ttp229_bsf_TTP229BSFComponent, __marker_ttp229_lsf_TTP229Channel, __marker_ttp229_lsf_TTP229LSFComponent, __marker_tuya_Tuya, __marker_tuya_TuyaBinarySensor, __marker_vbus_DeltaSolBS2009BSensor, __marker_vbus_DeltaSolBS2BSensor, __marker_vbus_DeltaSolBSPlusBSensor, __marker_vbus_DeltaSolCBSensor, __marker_vbus_DeltaSolCS2BSensor, __marker_vbus_DeltaSolCS4BSensor, __marker_vbus_DeltaSolCSPlusBSensor, __marker_vbus_VBus, __marker_vbus_VBusCustomBSensor, __marker_web_server_WebServer, __marker_wireguard_Wireguard, __marker_xiaomi_cgpr1_XiaomiCGPR1, __marker_xiaomi_mjyd02yla_XiaomiMJYD02YLA, __marker_xiaomi_mue4094rt_XiaomiMUE4094RT, __marker_xiaomi_rtcgq02lm_XiaomiRTCGQ02LM, __marker_xiaomi_wx08zm_XiaomiWX08ZM, __marker_zigbee_ZigbeeComponent } from "../markers";
interface BinarySensorWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DalyBmsChargingMosEnabledPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DalyBmsChargingMosEnabledPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DalyBmsChargingMosEnabledProps {
    availability?: DalyBmsChargingMosEnabledPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: DalyBmsChargingMosEnabledPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface DalyBmsDischargingMosEnabledPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface DalyBmsDischargingMosEnabledPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface DalyBmsDischargingMosEnabledProps {
    availability?: DalyBmsDischargingMosEnabledPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: DalyBmsDischargingMosEnabledPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface EzoPmpIsPausedPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface EzoPmpIsPausedPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface EzoPmpIsPausedProps {
    availability?: EzoPmpIsPausedPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: EzoPmpIsPausedPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface EzoPmpPumpStatePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface EzoPmpPumpStatePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface EzoPmpPumpStateProps {
    availability?: EzoPmpPumpStatePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: EzoPmpPumpStatePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Gdk101VibrationsPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Gdk101VibrationsPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Gdk101VibrationsProps {
    availability?: Gdk101VibrationsPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: Gdk101VibrationsPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface HaierCompressorStatusPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface HaierCompressorStatusPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface HaierCompressorStatusProps {
    availability?: HaierCompressorStatusPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: HaierCompressorStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface HaierDefrostStatusPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface HaierDefrostStatusPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface HaierDefrostStatusProps {
    availability?: HaierDefrostStatusPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: HaierDefrostStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface HaierFourWayValveStatusPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface HaierFourWayValveStatusPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface HaierFourWayValveStatusProps {
    availability?: HaierFourWayValveStatusPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: HaierFourWayValveStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface HaierIndoorElectricHeatingStatusPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface HaierIndoorElectricHeatingStatusPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface HaierIndoorElectricHeatingStatusProps {
    availability?: HaierIndoorElectricHeatingStatusPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: HaierIndoorElectricHeatingStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface HaierIndoorFanStatusPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface HaierIndoorFanStatusPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface HaierIndoorFanStatusProps {
    availability?: HaierIndoorFanStatusPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: HaierIndoorFanStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface HaierOutdoorFanStatusPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface HaierOutdoorFanStatusPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface HaierOutdoorFanStatusProps {
    availability?: HaierOutdoorFanStatusPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: HaierOutdoorFanStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface HydreonRgxxEmSatPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface HydreonRgxxEmSatPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface HydreonRgxxEmSatProps {
    availability?: HydreonRgxxEmSatPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: HydreonRgxxEmSatPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface HydreonRgxxLensBadPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface HydreonRgxxLensBadPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface HydreonRgxxLensBadProps {
    availability?: HydreonRgxxLensBadPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: HydreonRgxxLensBadPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface HydreonRgxxTooColdPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface HydreonRgxxTooColdPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface HydreonRgxxTooColdProps {
    availability?: HydreonRgxxTooColdPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: HydreonRgxxTooColdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410HasMovingTargetPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410HasMovingTargetPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410HasMovingTargetProps {
    availability?: Ld2410HasMovingTargetPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2410HasMovingTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410HasStillTargetPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410HasStillTargetPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410HasStillTargetProps {
    availability?: Ld2410HasStillTargetPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2410HasStillTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410HasTargetPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410HasTargetPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410HasTargetProps {
    availability?: Ld2410HasTargetPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2410HasTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2410OutPinPresenceStatusPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2410OutPinPresenceStatusPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2410OutPinPresenceStatusProps {
    availability?: Ld2410OutPinPresenceStatusPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2410OutPinPresenceStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412DynamicBackgroundCorrectionStatusPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412DynamicBackgroundCorrectionStatusPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412DynamicBackgroundCorrectionStatusProps {
    availability?: Ld2412DynamicBackgroundCorrectionStatusPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2412DynamicBackgroundCorrectionStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412HasMovingTargetPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412HasMovingTargetPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412HasMovingTargetProps {
    availability?: Ld2412HasMovingTargetPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2412HasMovingTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412HasStillTargetPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412HasStillTargetPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412HasStillTargetProps {
    availability?: Ld2412HasStillTargetPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2412HasStillTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2412HasTargetPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2412HasTargetPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2412HasTargetProps {
    availability?: Ld2412HasTargetPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2412HasTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2420HasTargetPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2420HasTargetPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2420HasTargetProps {
    availability?: Ld2420HasTargetPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2420HasTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2450HasMovingTargetPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450HasMovingTargetPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450HasMovingTargetProps {
    availability?: Ld2450HasMovingTargetPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2450HasMovingTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2450HasStillTargetPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450HasStillTargetPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450HasStillTargetProps {
    availability?: Ld2450HasStillTargetPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2450HasStillTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Ld2450HasTargetPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Ld2450HasTargetPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Ld2450HasTargetProps {
    availability?: Ld2450HasTargetPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: Ld2450HasTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Msa3xxActivePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Msa3xxActivePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Msa3xxActiveProps {
    availability?: Msa3xxActivePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: Msa3xxActivePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Msa3xxDoubleTapPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Msa3xxDoubleTapPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Msa3xxDoubleTapProps {
    availability?: Msa3xxDoubleTapPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: Msa3xxDoubleTapPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Msa3xxTapPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Msa3xxTapPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Msa3xxTapProps {
    availability?: Msa3xxTapPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: Msa3xxTapPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermAirPressureFaultPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermAirPressureFaultPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermAirPressureFaultProps {
    availability?: OpenthermAirPressureFaultPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermAirPressureFaultPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermChActivePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermChActivePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermChActiveProps {
    availability?: OpenthermChActivePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermChActivePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermCh2ActivePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermCh2ActivePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermCh2ActiveProps {
    availability?: OpenthermCh2ActivePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermCh2ActivePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermCh2PresentPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermCh2PresentPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermCh2PresentProps {
    availability?: OpenthermCh2PresentPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermCh2PresentPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermControlTypeOnOffPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermControlTypeOnOffPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermControlTypeOnOffProps {
    availability?: OpenthermControlTypeOnOffPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermControlTypeOnOffPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermControllerPumpControlAllowedPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermControllerPumpControlAllowedPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermControllerPumpControlAllowedProps {
    availability?: OpenthermControllerPumpControlAllowedPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermControllerPumpControlAllowedPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermCoolingActivePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermCoolingActivePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermCoolingActiveProps {
    availability?: OpenthermCoolingActivePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermCoolingActivePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermCoolingSupportedPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermCoolingSupportedPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermCoolingSupportedProps {
    availability?: OpenthermCoolingSupportedPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermCoolingSupportedPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermDhwActivePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermDhwActivePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermDhwActiveProps {
    availability?: OpenthermDhwActivePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermDhwActivePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermDhwPresentPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermDhwPresentPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermDhwPresentProps {
    availability?: OpenthermDhwPresentPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermDhwPresentPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermDhwSetpointRwPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermDhwSetpointRwPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermDhwSetpointRwProps {
    availability?: OpenthermDhwSetpointRwPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermDhwSetpointRwPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermDhwSetpointTransferEnabledPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermDhwSetpointTransferEnabledPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermDhwSetpointTransferEnabledProps {
    availability?: OpenthermDhwSetpointTransferEnabledPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermDhwSetpointTransferEnabledPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermDhwStorageTankPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermDhwStorageTankPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermDhwStorageTankProps {
    availability?: OpenthermDhwStorageTankPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermDhwStorageTankPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermDiagnosticIndicationPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermDiagnosticIndicationPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermDiagnosticIndicationProps {
    availability?: OpenthermDiagnosticIndicationPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermDiagnosticIndicationPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermElectricityProductionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermElectricityProductionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermElectricityProductionProps {
    availability?: OpenthermElectricityProductionPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermElectricityProductionPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermFaultIndicationPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermFaultIndicationPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermFaultIndicationProps {
    availability?: OpenthermFaultIndicationPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermFaultIndicationPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermFlameFaultPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermFlameFaultPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermFlameFaultProps {
    availability?: OpenthermFlameFaultPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermFlameFaultPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermFlameOnPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermFlameOnPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermFlameOnProps {
    availability?: OpenthermFlameOnPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermFlameOnPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermHeatModePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermHeatModePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermHeatModeProps {
    availability?: OpenthermHeatModePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermHeatModePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermLockoutResetPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermLockoutResetPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermLockoutResetProps {
    availability?: OpenthermLockoutResetPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermLockoutResetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermLowWaterPressurePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermLowWaterPressurePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermLowWaterPressureProps {
    availability?: OpenthermLowWaterPressurePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermLowWaterPressurePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermMaxChSetpointRwPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermMaxChSetpointRwPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermMaxChSetpointRwProps {
    availability?: OpenthermMaxChSetpointRwPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermMaxChSetpointRwPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermMaxChSetpointTransferEnabledPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermMaxChSetpointTransferEnabledPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermMaxChSetpointTransferEnabledProps {
    availability?: OpenthermMaxChSetpointTransferEnabledPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermMaxChSetpointTransferEnabledPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermServiceRequestPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermServiceRequestPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermServiceRequestProps {
    availability?: OpenthermServiceRequestPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermServiceRequestPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermWaterFillingPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermWaterFillingPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermWaterFillingProps {
    availability?: OpenthermWaterFillingPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermWaterFillingPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface OpenthermWaterOverTempPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface OpenthermWaterOverTempPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface OpenthermWaterOverTempProps {
    availability?: OpenthermWaterOverTempPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: OpenthermWaterOverTempPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarAcChargingStatusPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarAcChargingStatusPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarAcChargingStatusProps {
    availability?: PipsolarAcChargingStatusPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarAcChargingStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarAddSbuPriorityVersionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarAddSbuPriorityVersionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarAddSbuPriorityVersionProps {
    availability?: PipsolarAddSbuPriorityVersionPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarAddSbuPriorityVersionPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarAlarmOnWhenPrimarySourceInterruptPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarAlarmOnWhenPrimarySourceInterruptPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarAlarmOnWhenPrimarySourceInterruptProps {
    availability?: PipsolarAlarmOnWhenPrimarySourceInterruptPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarAlarmOnWhenPrimarySourceInterruptPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarBacklightOnPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarBacklightOnPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarBacklightOnProps {
    availability?: PipsolarBacklightOnPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarBacklightOnPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarBatteryVoltageToSteadyWhileChargingPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarBatteryVoltageToSteadyWhileChargingPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarBatteryVoltageToSteadyWhileChargingProps {
    availability?: PipsolarBatteryVoltageToSteadyWhileChargingPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarBatteryVoltageToSteadyWhileChargingPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarChargingStatusPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarChargingStatusPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarChargingStatusProps {
    availability?: PipsolarChargingStatusPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarChargingStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarChargingToFloatingModePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarChargingToFloatingModePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarChargingToFloatingModeProps {
    availability?: PipsolarChargingToFloatingModePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarChargingToFloatingModePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarConfigurationStatusPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarConfigurationStatusPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarConfigurationStatusProps {
    availability?: PipsolarConfigurationStatusPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarConfigurationStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarDustproofInstalledPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarDustproofInstalledPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarDustproofInstalledProps {
    availability?: PipsolarDustproofInstalledPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarDustproofInstalledPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarFaultBatteryOpenPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarFaultBatteryOpenPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarFaultBatteryOpenProps {
    availability?: PipsolarFaultBatteryOpenPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultBatteryOpenPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarFaultBatteryShortPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarFaultBatteryShortPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarFaultBatteryShortProps {
    availability?: PipsolarFaultBatteryShortPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultBatteryShortPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarFaultBusOverPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarFaultBusOverPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarFaultBusOverProps {
    availability?: PipsolarFaultBusOverPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultBusOverPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarFaultBusSoftFailPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarFaultBusSoftFailPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarFaultBusSoftFailProps {
    availability?: PipsolarFaultBusSoftFailPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultBusSoftFailPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarFaultBusUnderPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarFaultBusUnderPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarFaultBusUnderProps {
    availability?: PipsolarFaultBusUnderPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultBusUnderPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarFaultCodePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarFaultCodePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarFaultCodeProps {
    availability?: PipsolarFaultCodePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultCodePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarFaultCodeRecordPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarFaultCodeRecordPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarFaultCodeRecordProps {
    availability?: PipsolarFaultCodeRecordPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultCodeRecordPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarFaultCurrentSensorFailedPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarFaultCurrentSensorFailedPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarFaultCurrentSensorFailedProps {
    availability?: PipsolarFaultCurrentSensorFailedPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultCurrentSensorFailedPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarFaultDcDcOverCurrentPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarFaultDcDcOverCurrentPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarFaultDcDcOverCurrentProps {
    availability?: PipsolarFaultDcDcOverCurrentPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultDcDcOverCurrentPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarFaultInverterFaultPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarFaultInverterFaultPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarFaultInverterFaultProps {
    availability?: PipsolarFaultInverterFaultPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultInverterFaultPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarFaultInverterOverCurrentPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarFaultInverterOverCurrentPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarFaultInverterOverCurrentProps {
    availability?: PipsolarFaultInverterOverCurrentPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultInverterOverCurrentPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarFaultInverterSoftFailedPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarFaultInverterSoftFailedPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarFaultInverterSoftFailedProps {
    availability?: PipsolarFaultInverterSoftFailedPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultInverterSoftFailedPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarFaultInverterVoltageTooHighPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarFaultInverterVoltageTooHighPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarFaultInverterVoltageTooHighProps {
    availability?: PipsolarFaultInverterVoltageTooHighPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultInverterVoltageTooHighPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarFaultInverterVoltageTooLowPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarFaultInverterVoltageTooLowPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarFaultInverterVoltageTooLowProps {
    availability?: PipsolarFaultInverterVoltageTooLowPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultInverterVoltageTooLowPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarFaultMpptOverloadPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarFaultMpptOverloadPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarFaultMpptOverloadProps {
    availability?: PipsolarFaultMpptOverloadPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultMpptOverloadPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarFaultOpDcVoltageOverPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarFaultOpDcVoltageOverPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarFaultOpDcVoltageOverProps {
    availability?: PipsolarFaultOpDcVoltageOverPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultOpDcVoltageOverPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarFaultOpvshortPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarFaultOpvshortPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarFaultOpvshortProps {
    availability?: PipsolarFaultOpvshortPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultOpvshortPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarFaultSelfTestFailedPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarFaultSelfTestFailedPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarFaultSelfTestFailedProps {
    availability?: PipsolarFaultSelfTestFailedPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultSelfTestFailedPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarFaultsPresentPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarFaultsPresentPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarFaultsPresentProps {
    availability?: PipsolarFaultsPresentPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultsPresentPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarLcdEscapeToDefaultPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarLcdEscapeToDefaultPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarLcdEscapeToDefaultProps {
    availability?: PipsolarLcdEscapeToDefaultPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarLcdEscapeToDefaultPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarLoadStatusPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarLoadStatusPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarLoadStatusProps {
    availability?: PipsolarLoadStatusPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarLoadStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarOverTemperatureRestartFunctionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarOverTemperatureRestartFunctionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarOverTemperatureRestartFunctionProps {
    availability?: PipsolarOverTemperatureRestartFunctionPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarOverTemperatureRestartFunctionPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarOverloadBypassFunctionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarOverloadBypassFunctionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarOverloadBypassFunctionProps {
    availability?: PipsolarOverloadBypassFunctionPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarOverloadBypassFunctionPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarOverloadRestartFunctionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarOverloadRestartFunctionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarOverloadRestartFunctionProps {
    availability?: PipsolarOverloadRestartFunctionPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarOverloadRestartFunctionPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarPowerSavingPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarPowerSavingPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarPowerSavingProps {
    availability?: PipsolarPowerSavingPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarPowerSavingPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarSccChargingStatusPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarSccChargingStatusPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarSccChargingStatusProps {
    availability?: PipsolarSccChargingStatusPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarSccChargingStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarSccFirmwareVersionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarSccFirmwareVersionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarSccFirmwareVersionProps {
    availability?: PipsolarSccFirmwareVersionPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarSccFirmwareVersionPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarSilenceBuzzerOpenBuzzerPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarSilenceBuzzerOpenBuzzerPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarSilenceBuzzerOpenBuzzerProps {
    availability?: PipsolarSilenceBuzzerOpenBuzzerPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarSilenceBuzzerOpenBuzzerPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarSwitchOnPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarSwitchOnPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarSwitchOnProps {
    availability?: PipsolarSwitchOnPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarSwitchOnPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarWarningBatteryDeratingPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarWarningBatteryDeratingPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarWarningBatteryDeratingProps {
    availability?: PipsolarWarningBatteryDeratingPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningBatteryDeratingPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarWarningBatteryEqualizationPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarWarningBatteryEqualizationPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarWarningBatteryEqualizationProps {
    availability?: PipsolarWarningBatteryEqualizationPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningBatteryEqualizationPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarWarningBatteryLowAlarmPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarWarningBatteryLowAlarmPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarWarningBatteryLowAlarmProps {
    availability?: PipsolarWarningBatteryLowAlarmPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningBatteryLowAlarmPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarWarningBatteryTooLowToChargePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarWarningBatteryTooLowToChargePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarWarningBatteryTooLowToChargeProps {
    availability?: PipsolarWarningBatteryTooLowToChargePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningBatteryTooLowToChargePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarWarningBatteryUnderShutdownPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarWarningBatteryUnderShutdownPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarWarningBatteryUnderShutdownProps {
    availability?: PipsolarWarningBatteryUnderShutdownPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningBatteryUnderShutdownPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarWarningBatteryVoltageHighPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarWarningBatteryVoltageHighPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarWarningBatteryVoltageHighProps {
    availability?: PipsolarWarningBatteryVoltageHighPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningBatteryVoltageHighPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarWarningEepromFailedPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarWarningEepromFailedPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarWarningEepromFailedProps {
    availability?: PipsolarWarningEepromFailedPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningEepromFailedPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarWarningFanLockPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarWarningFanLockPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarWarningFanLockProps {
    availability?: PipsolarWarningFanLockPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningFanLockPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarWarningHighAcInputDuringBusSoftStartPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarWarningHighAcInputDuringBusSoftStartPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarWarningHighAcInputDuringBusSoftStartProps {
    availability?: PipsolarWarningHighAcInputDuringBusSoftStartPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningHighAcInputDuringBusSoftStartPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarWarningLineFailPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarWarningLineFailPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarWarningLineFailProps {
    availability?: PipsolarWarningLineFailPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningLineFailPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarWarningLowPvEnergyPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarWarningLowPvEnergyPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarWarningLowPvEnergyProps {
    availability?: PipsolarWarningLowPvEnergyPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningLowPvEnergyPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarWarningMpptOverloadPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarWarningMpptOverloadPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarWarningMpptOverloadProps {
    availability?: PipsolarWarningMpptOverloadPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningMpptOverloadPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarWarningOverLoadPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarWarningOverLoadPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarWarningOverLoadProps {
    availability?: PipsolarWarningOverLoadPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningOverLoadPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarWarningOverTemperaturePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarWarningOverTemperaturePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarWarningOverTemperatureProps {
    availability?: PipsolarWarningOverTemperaturePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningOverTemperaturePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarWarningPowerLimitPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarWarningPowerLimitPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarWarningPowerLimitProps {
    availability?: PipsolarWarningPowerLimitPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningPowerLimitPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarWarningPowerLossPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarWarningPowerLossPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarWarningPowerLossProps {
    availability?: PipsolarWarningPowerLossPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningPowerLossPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarWarningPvVoltageHighPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarWarningPvVoltageHighPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarWarningPvVoltageHighProps {
    availability?: PipsolarWarningPvVoltageHighPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningPvVoltageHighPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface PipsolarWarningsPresentPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface PipsolarWarningsPresentPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface PipsolarWarningsPresentProps {
    availability?: PipsolarWarningsPresentPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningsPresentPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Rd03dTargetPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Rd03dTargetPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Rd03dTargetProps {
    availability?: Rd03dTargetPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: Rd03dTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Rd03dTarget1PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Rd03dTarget1PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Rd03dTarget1Props {
    availability?: Rd03dTarget1PropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: Rd03dTarget1PropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Rd03dTarget2PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Rd03dTarget2PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Rd03dTarget2Props {
    availability?: Rd03dTarget2PropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: Rd03dTarget2PropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Rd03dTarget3PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Rd03dTarget3PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Rd03dTarget3Props {
    availability?: Rd03dTarget3PropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: Rd03dTarget3PropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface RemoteReceiverAbbwelcomeProps {
    /** 0-7 bytes list: The code to listen for. Usually you only need to copy this directly from the dumper output. Defaults ... */
    data?: unknown;
    /**
     * int: The destination address to trigger on.
     * @yamlKey destination_address
     */
    destinationAddress: number;
    /**
     * int: The random message ID to trigger on, see dumper output for more info. Defaults to any ID.
     * @yamlKey message_id
     */
    messageId?: number;
    /**
     * int: The message type to trigger on.
     * @yamlKey message_type
     */
    messageType: number;
    /** boolean: `true` if the message was re-transmitted. Defaults to `false`. */
    retransmission?: boolean;
    /**
     * int: The source address to trigger on.
     * @yamlKey source_address
     */
    sourceAddress: number;
    /**
     * boolean: The length of the source and destination address. `false` means two bytes and `true` means three bytes. Defa...
     * @yamlKey three_byte_address
     */
    threeByteAddress?: boolean;
}
interface RemoteReceiverAehaProps {
    /** int: The address to trigger on, see dumper output for more info. */
    address: number;
    /** 3-35 bytes list: The code to listen for, see [transmitter description](https://esphome.io/components/remote_transmitt... */
    data: unknown;
}
interface RemoteReceiverBeo4Props {
    /** int: The 8-bit command to listen for, e.g. 0x00=number0, 0x0C=standby,..., see dumper output for more info. */
    command: number;
    /** @yamlKey command_repeats */
    commandRepeats?: number;
    /** int: The 8-bit source to trigger on, e.g. 0x00=video, 0x01=audio,..., see dumper output for more info. */
    source: number;
}
interface RemoteReceiverBrennenstuhlProps {
    /** int: The 24-bit code to trigger on, see dumper output for more info. */
    code: number;
}
interface RemoteReceiverByronsxProps {
    /** int: The 8-bit ID code to trigger on, see dumper output for more info. */
    address: number;
    /** int: The 4-bit command to listen for. If omitted, will match on any command. */
    command?: "1" | "13" | "14" | "16" | "2" | "3" | "5" | "6" | "9";
}
interface RemoteReceiverCanalsatProps {
    /** int: The address (or subdevice) to trigger on, see dumper output for more info. Defaults to `0`. */
    address?: number;
    /** int: The command to listen for. */
    command: number;
    /** int: The device to trigger on, see dumper output for more info. */
    device: number;
}
interface RemoteReceiverCanalsatldProps {
    /** int: The address (or subdevice) to trigger on, see dumper output for more info. Defaults to `0`. */
    address?: number;
    /** int: The command to listen for. */
    command: number;
    /** int: The device to trigger on, see dumper output for more info. */
    device: number;
}
interface RemoteReceiverCoolixProps {
    /** uint32_t: The first 24-bit Coolix code to trigger on, see dumper output for more info. */
    first: unknown;
    /** uint32_t: The second 24-bit Coolix code to trigger on, see dumper output for more info. If not set, trigger on only s... */
    second?: unknown;
}
interface RemoteReceiverDishProps {
    /** int: The number of the receiver to target, between 1 and 16 inclusive. Defaults to `1`. */
    address?: number;
    /** int: The Dish command to listen for, between 0 and 63 inclusive. */
    command: number;
}
interface RemoteReceiverDooyaProps {
    /** int: The 4-bit button to listen for. */
    button: number;
    /** int: The 8-bit channel to listen for. */
    channel: number;
    /** int: The 4-bit check to listen for. Includes an indication that a button is being held down. */
    check: number;
    /** int: The 24-bit ID code to trigger on. */
    id: number;
}
interface RemoteReceiverDraytonProps {
    /** int: The 16-bit ID code to trigger on, see dumper output for more info. */
    address: number;
    /** int: The 7-bit switch/channel to listen for. */
    channel: number;
    /** int: The 5-bit command to listen for. */
    command: number;
}
interface RemoteReceiverDysonProps {
    /** int: The 16-bit code to trigger on, e.g. 0x1200=power, 0x1215=fan++,0x122a=swing..., see dumper output for more info. */
    code: number;
    /** int: The 8-bit rolling index [0..3], to be increased with every transmit, see dumper output for more info. */
    index?: number;
}
interface RemoteReceiverGoboxProps {
    /** int: The Go-Box code to trigger on, see dumper output for more info. */
    code: number;
}
interface RemoteReceiverHaierProps {
    /** 13-bytes list: The code to listen for, see [transmitter description](https://esphome.io/components/remote_transmitter... */
    code: unknown;
}
interface RemoteReceiverJvcProps {
    /** int: The JVC code to trigger on, see dumper output for more info. */
    data: number;
}
interface RemoteReceiverKeeloqProps {
    /** int: The 32-bit ID code to trigger on, see dumper output for more info. */
    address: number;
    code: unknown;
    /** int: The 8-bit switch/command to listen for. If omitted, will match on any command/button. */
    command?: number;
    level?: boolean;
}
interface RemoteReceiverLgProps {
    /** int: The LG code to trigger on, see dumper output for more info. */
    data: number;
    /** int: The number of bits of the remote code. Defaults to `28`. */
    nbits?: "28" | "32";
}
interface RemoteReceiverMagiquestProps {
    /** int: The magnitude of swishes and swirls of the wand. If omitted, will match on any activation of the wand. */
    magnitude?: number;
    /**
     * int: The MagiQuest wand ID to trigger on, see dumper output for more info.
     * @yamlKey wand_id
     */
    wandId: number;
}
interface RemoteReceiverMideaProps {
    /** 5-bytes list: The code to listen for, see [transmitter description](https://esphome.io/components/remote_transmitter#... */
    code: unknown;
}
interface RemoteReceiverMirageProps {
    /** 14-bytes list: The code to listen for, see [transmitter description](https://esphome.io/components/remote_transmitter... */
    code: unknown;
}
interface RemoteReceiverNecProps {
    /** int: The address to trigger on, see dumper output for more info. */
    address: number;
    /** int: The NEC command to listen for. */
    command: number;
    /** @yamlKey command_repeats */
    commandRepeats?: number;
}
interface RemoteReceiverNexaProps {
    /** int: The Nexa channel code to trigger on, see dumper output for more info. */
    channel: number;
    /** int: The Nexa device code to trigger on, see dumper output for more info. */
    device: number;
    /** int: The Nexa group code to trigger on, see dumper output for more info. */
    group: number;
    /** int: The Nexa level code to trigger on, see dumper output for more info. */
    level: number;
    /** int: The Nexa state code to trigger on, see dumper output for more info. */
    state: number;
}
interface RemoteReceiverPanasonicProps {
    /** int: The address to trigger on, see dumper output for more info. */
    address: number;
    /** int: The command. */
    command: number;
}
interface RemoteReceiverPioneerProps {
    /**
     * int: The remote control code to trigger on, see dumper output for more details.
     * @yamlKey rc_code_1
     */
    rcCode1: number;
    /** @yamlKey rc_code_2 */
    rcCode2?: number;
}
interface RemoteReceiverProntoProps {
    /** string: The code to listen for, see [transmitter description](https://esphome.io/components/remote_transmitter#remote... */
    data: string;
    /** integer: This parameter allows you to manually specify the allowed difference between what Pronto code is specified, ... */
    delta?: number;
}
interface RemoteReceiverRawProps {
    /** list: The code to listen for, see [transmitter description](https://esphome.io/components/remote_transmitter#remote_t... */
    code: unknown;
}
interface RemoteReceiverRcSwitchRawProps {
    /** string: The remote code to listen for, copy this from the dumper output. To ignore a bit in the received data, use `x... */
    code: string;
    /** The RC Switch protocol to use, see [RC Switch Protocol](https://esphome.io/components/remote_transmitter#remote_trans... */
    protocol?: Record<string, unknown>;
}
interface RemoteReceiverRcSwitchTypeAProps {
    /** string: The device in the group, binary string. */
    device: string;
    /** string: The group, binary string. */
    group: string;
    /** The RC Switch protocol to use, see [RC Switch Protocol](https://esphome.io/components/remote_transmitter#remote_trans... */
    protocol?: Record<string, unknown>;
    /** boolean: The on/off state to trigger on. */
    state: boolean;
}
interface RemoteReceiverRcSwitchTypeBProps {
    /** int: The address, int from 1 to 4. */
    address: number;
    /** int: The channel, int from 1 to 4. */
    channel: number;
    /** The RC Switch protocol to use, see [RC Switch Protocol](https://esphome.io/components/remote_transmitter#remote_trans... */
    protocol?: Record<string, unknown>;
    /** boolean: The on/off state to trigger on. */
    state: boolean;
}
interface RemoteReceiverRcSwitchTypeCProps {
    /** int: The device. Range is 1 to 4. */
    device: number;
    /** string: The family. Range is `a` to `p`. */
    family: "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p";
    /** int: The group. Range is 1 to 4. */
    group: number;
    /** The RC Switch protocol to use, see [RC Switch Protocol](https://esphome.io/components/remote_transmitter#remote_trans... */
    protocol?: Record<string, unknown>;
    /** boolean: The on/off state to trigger on. */
    state: boolean;
}
interface RemoteReceiverRcSwitchTypeDPropsRepeatProps {
    times: number;
    /** @yamlKey wait_time */
    waitTime?: TimePeriod;
}
interface RemoteReceiverRcSwitchTypeDProps {
    /** int: The device. Range is 1 to 3. */
    device: number;
    /** int: The group. Range is 1 to 4. */
    group: "a" | "b" | "c" | "d";
    /** The RC Switch protocol to use, see [RC Switch Protocol](https://esphome.io/components/remote_transmitter#remote_trans... */
    protocol?: Record<string, unknown>;
    repeat?: RemoteReceiverRcSwitchTypeDPropsRepeatProps;
    /** boolean: The on/off state to trigger on. */
    state: boolean;
}
interface RemoteReceiverRc5Props {
    /** int: The address to trigger on, see dumper output for more info. */
    address: number;
    /** int: The RC5 command to listen for. */
    command: number;
}
interface RemoteReceiverRc6Props {
    /** int: The address to trigger on, see dumper output for more info. */
    address: number;
    /** int: The RC6 command to listen for. */
    command: number;
}
interface RemoteReceiverRoombaProps {
    /** int: The Roomba code to trigger on, see dumper output for more info. */
    data: number;
}
interface RemoteReceiverSamsungProps {
    /** int: The data to trigger on, see dumper output for more info. */
    data: number;
    /** int: The number of bits of the remote code. Defaults to `32`. */
    nbits?: number;
}
interface RemoteReceiverSamsung36Props {
    /** int: The address to trigger on, see dumper output for more info. */
    address: number;
    /** int: The command. */
    command: number;
}
interface RemoteReceiverSonyProps {
    /** int: The Sony code to trigger on, see dumper output for more info. */
    data: number;
    /** int: The number of bits of the remote code. Defaults to `12`. */
    nbits?: "12" | "15" | "20";
}
interface RemoteReceiverSymphonyProps {
    /** @yamlKey command_repeats */
    commandRepeats?: number;
    /** int: The Symphony code to trigger on, see dumper output for more info. */
    data: number;
    /** int: The number of bits of the remote code. Typical values: `8`, `12`, or `16`. */
    nbits: number;
}
interface RemoteReceiverToshibaAcProps {
    /**
     * int: The remote control code to trigger on, see dumper output for more details.
     * @yamlKey rc_code_1
     */
    rcCode1: number;
    /**
     * int: The second part of the remote control code to trigger on, see dumper output for more details.
     * @yamlKey rc_code_2
     */
    rcCode2?: number;
}
interface RemoteReceiverTotoProps {
    /** int: The 1-byte Toto command code to trigger on. Range is 0 to 0xFF. */
    command: number;
    /**
     * int: The first 4-bit Toto code (usually a command parameter) to trigger on. Range is 0 to 0xF.
     * @yamlKey rc_code_1
     */
    rcCode1?: number;
    /**
     * int: The second 4-bit Toto code (usually a command parameter) to trigger on. Range is 0 to 0xF.
     * @yamlKey rc_code_2
     */
    rcCode2?: number;
}
interface SeeedMr24hpc1HasTargetPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SeeedMr24hpc1HasTargetPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SeeedMr24hpc1HasTargetProps {
    availability?: SeeedMr24hpc1HasTargetPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1HasTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface SeeedMr60bha2HasTargetPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SeeedMr60bha2HasTargetPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SeeedMr60bha2HasTargetProps {
    availability?: SeeedMr60bha2HasTargetPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: SeeedMr60bha2HasTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface SeeedMr60fda2FallDetectedPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SeeedMr60fda2FallDetectedPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SeeedMr60fda2FallDetectedProps {
    availability?: SeeedMr60fda2FallDetectedPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: SeeedMr60fda2FallDetectedPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface SeeedMr60fda2PeopleExistPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface SeeedMr60fda2PeopleExistPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface SeeedMr60fda2PeopleExistProps {
    availability?: SeeedMr60fda2PeopleExistPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: SeeedMr60fda2PeopleExistPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Sim800lRegisteredPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Sim800lRegisteredPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Sim800lRegisteredProps {
    availability?: Sim800lRegisteredPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: Sim800lRegisteredPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Sy6970ChargeDonePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Sy6970ChargeDonePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Sy6970ChargeDoneProps {
    availability?: Sy6970ChargeDonePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: Sy6970ChargeDonePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Sy6970ChargingPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Sy6970ChargingPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Sy6970ChargingProps {
    availability?: Sy6970ChargingPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: Sy6970ChargingPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface Sy6970VbusConnectedPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface Sy6970VbusConnectedPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface Sy6970VbusConnectedProps {
    availability?: Sy6970VbusConnectedPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: Sy6970VbusConnectedPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusCustomBinarySensorsPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusCustomBinarySensorsPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusCustomBinarySensorsProps {
    availability?: VbusCustomBinarySensorsPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    lambda: unknown;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusCustomBinarySensorsPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolBs2009FrostProtectionActivePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolBs2009FrostProtectionActivePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolBs2009FrostProtectionActiveProps {
    availability?: VbusDeltasolBs2009FrostProtectionActivePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBs2009FrostProtectionActivePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolBs2009Sensor1ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolBs2009Sensor1ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolBs2009Sensor1ErrorProps {
    availability?: VbusDeltasolBs2009Sensor1ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBs2009Sensor1ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolBs2009Sensor2ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolBs2009Sensor2ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolBs2009Sensor2ErrorProps {
    availability?: VbusDeltasolBs2009Sensor2ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBs2009Sensor2ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolBs2009Sensor3ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolBs2009Sensor3ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolBs2009Sensor3ErrorProps {
    availability?: VbusDeltasolBs2009Sensor3ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBs2009Sensor3ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolBs2009Sensor4ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolBs2009Sensor4ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolBs2009Sensor4ErrorProps {
    availability?: VbusDeltasolBs2009Sensor4ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBs2009Sensor4ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolBsPlusCollectorFrostPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolBsPlusCollectorFrostPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolBsPlusCollectorFrostProps {
    availability?: VbusDeltasolBsPlusCollectorFrostPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBsPlusCollectorFrostPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolBsPlusCollectorMaxPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolBsPlusCollectorMaxPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolBsPlusCollectorMaxProps {
    availability?: VbusDeltasolBsPlusCollectorMaxPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBsPlusCollectorMaxPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolBsPlusCollectorMinPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolBsPlusCollectorMinPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolBsPlusCollectorMinProps {
    availability?: VbusDeltasolBsPlusCollectorMinPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBsPlusCollectorMinPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolBsPlusHqmPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolBsPlusHqmPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolBsPlusHqmProps {
    availability?: VbusDeltasolBsPlusHqmPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBsPlusHqmPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolBsPlusRecoolingPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolBsPlusRecoolingPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolBsPlusRecoolingProps {
    availability?: VbusDeltasolBsPlusRecoolingPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBsPlusRecoolingPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolBsPlusRelay1PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolBsPlusRelay1PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolBsPlusRelay1Props {
    availability?: VbusDeltasolBsPlusRelay1PropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBsPlusRelay1PropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolBsPlusRelay2PropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolBsPlusRelay2PropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolBsPlusRelay2Props {
    availability?: VbusDeltasolBsPlusRelay2PropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBsPlusRelay2PropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolBsPlusSensor1ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolBsPlusSensor1ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolBsPlusSensor1ErrorProps {
    availability?: VbusDeltasolBsPlusSensor1ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBsPlusSensor1ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolBsPlusSensor2ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolBsPlusSensor2ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolBsPlusSensor2ErrorProps {
    availability?: VbusDeltasolBsPlusSensor2ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBsPlusSensor2ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolBsPlusSensor3ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolBsPlusSensor3ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolBsPlusSensor3ErrorProps {
    availability?: VbusDeltasolBsPlusSensor3ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBsPlusSensor3ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolBsPlusSensor4ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolBsPlusSensor4ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolBsPlusSensor4ErrorProps {
    availability?: VbusDeltasolBsPlusSensor4ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBsPlusSensor4ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolBsPlusTubeCollectorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolBsPlusTubeCollectorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolBsPlusTubeCollectorProps {
    availability?: VbusDeltasolBsPlusTubeCollectorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBsPlusTubeCollectorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolBs2Sensor1ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolBs2Sensor1ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolBs2Sensor1ErrorProps {
    availability?: VbusDeltasolBs2Sensor1ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBs2Sensor1ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolBs2Sensor2ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolBs2Sensor2ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolBs2Sensor2ErrorProps {
    availability?: VbusDeltasolBs2Sensor2ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBs2Sensor2ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolBs2Sensor3ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolBs2Sensor3ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolBs2Sensor3ErrorProps {
    availability?: VbusDeltasolBs2Sensor3ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBs2Sensor3ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolBs2Sensor4ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolBs2Sensor4ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolBs2Sensor4ErrorProps {
    availability?: VbusDeltasolBs2Sensor4ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBs2Sensor4ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolCSensor1ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolCSensor1ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolCSensor1ErrorProps {
    availability?: VbusDeltasolCSensor1ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCSensor1ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolCSensor2ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolCSensor2ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolCSensor2ErrorProps {
    availability?: VbusDeltasolCSensor2ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCSensor2ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolCSensor3ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolCSensor3ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolCSensor3ErrorProps {
    availability?: VbusDeltasolCSensor3ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCSensor3ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolCSensor4ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolCSensor4ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolCSensor4ErrorProps {
    availability?: VbusDeltasolCSensor4ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCSensor4ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolCsPlusSensor1ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolCsPlusSensor1ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolCsPlusSensor1ErrorProps {
    availability?: VbusDeltasolCsPlusSensor1ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCsPlusSensor1ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolCsPlusSensor2ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolCsPlusSensor2ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolCsPlusSensor2ErrorProps {
    availability?: VbusDeltasolCsPlusSensor2ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCsPlusSensor2ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolCsPlusSensor3ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolCsPlusSensor3ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolCsPlusSensor3ErrorProps {
    availability?: VbusDeltasolCsPlusSensor3ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCsPlusSensor3ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolCsPlusSensor4ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolCsPlusSensor4ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolCsPlusSensor4ErrorProps {
    availability?: VbusDeltasolCsPlusSensor4ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCsPlusSensor4ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolCs2Sensor1ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolCs2Sensor1ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolCs2Sensor1ErrorProps {
    availability?: VbusDeltasolCs2Sensor1ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCs2Sensor1ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolCs2Sensor2ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolCs2Sensor2ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolCs2Sensor2ErrorProps {
    availability?: VbusDeltasolCs2Sensor2ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCs2Sensor2ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolCs2Sensor3ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolCs2Sensor3ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolCs2Sensor3ErrorProps {
    availability?: VbusDeltasolCs2Sensor3ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCs2Sensor3ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolCs2Sensor4ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolCs2Sensor4ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolCs2Sensor4ErrorProps {
    availability?: VbusDeltasolCs2Sensor4ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCs2Sensor4ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolCs4Sensor1ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolCs4Sensor1ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolCs4Sensor1ErrorProps {
    availability?: VbusDeltasolCs4Sensor1ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCs4Sensor1ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolCs4Sensor2ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolCs4Sensor2ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolCs4Sensor2ErrorProps {
    availability?: VbusDeltasolCs4Sensor2ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCs4Sensor2ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolCs4Sensor3ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolCs4Sensor3ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolCs4Sensor3ErrorProps {
    availability?: VbusDeltasolCs4Sensor3ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCs4Sensor3ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface VbusDeltasolCs4Sensor4ErrorPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface VbusDeltasolCs4Sensor4ErrorPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface VbusDeltasolCs4Sensor4ErrorProps {
    availability?: VbusDeltasolCs4Sensor4ErrorPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCs4Sensor4ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface WireguardEnabledPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface WireguardEnabledPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface WireguardEnabledProps {
    availability?: WireguardEnabledPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: WireguardEnabledPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface WireguardStatusPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface WireguardStatusPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface WireguardStatusProps {
    availability?: WireguardStatusPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: WireguardStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface XiaomiCgpr1BatteryLevelPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface XiaomiCgpr1BatteryLevelPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface XiaomiCgpr1BatteryLevelProps {
    /**
     * int: Set the number of digits after the decimal point that data consumers should use. While this does not change the ...
     * @yamlKey accuracy_decimals
     */
    accuracyDecimals?: number;
    availability?: XiaomiCgpr1BatteryLevelPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/sensor/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
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
    entityCategory?: "" | "diagnostic";
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Manually set the time in which the sensor values should b...
     * @yamlKey expire_after
     */
    expireAfter?: TimePeriod;
    /** Specify filters to use for some basic transforming of values. See [Sensor Filters](https://esphome.io/components/sens... */
    filters?: Array<unknown>;
    /**
     * boolean: If true, this option will force the frontend (usually Home Assistant) to create a state changed event when t...
     * @yamlKey force_update
     */
    forceUpdate?: boolean;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a raw value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /**
     * string: The state class for the sensor. See [https://developers.home-assistant.io/docs/core/entity/sensor/#available-...
     * @yamlKey state_class
     */
    stateClass?: "" | "measurement" | "measurement_angle" | "total" | "total_increasing";
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement the sensor should advertise its values with. This does not actually do a...
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: XiaomiCgpr1BatteryLevelPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface XiaomiCgpr1IdleTimePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface XiaomiCgpr1IdleTimePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface XiaomiCgpr1IdleTimeProps {
    /**
     * int: Set the number of digits after the decimal point that data consumers should use. While this does not change the ...
     * @yamlKey accuracy_decimals
     */
    accuracyDecimals?: number;
    availability?: XiaomiCgpr1IdleTimePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/sensor/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
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
    entityCategory?: "" | "diagnostic";
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Manually set the time in which the sensor values should b...
     * @yamlKey expire_after
     */
    expireAfter?: TimePeriod;
    /** Specify filters to use for some basic transforming of values. See [Sensor Filters](https://esphome.io/components/sens... */
    filters?: Array<unknown>;
    /**
     * boolean: If true, this option will force the frontend (usually Home Assistant) to create a state changed event when t...
     * @yamlKey force_update
     */
    forceUpdate?: boolean;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a raw value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /**
     * string: The state class for the sensor. See [https://developers.home-assistant.io/docs/core/entity/sensor/#available-...
     * @yamlKey state_class
     */
    stateClass?: "" | "measurement" | "measurement_angle" | "total" | "total_increasing";
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement the sensor should advertise its values with. This does not actually do a...
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: XiaomiCgpr1IdleTimePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface XiaomiCgpr1IlluminancePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface XiaomiCgpr1IlluminancePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface XiaomiCgpr1IlluminanceProps {
    /**
     * int: Set the number of digits after the decimal point that data consumers should use. While this does not change the ...
     * @yamlKey accuracy_decimals
     */
    accuracyDecimals?: number;
    availability?: XiaomiCgpr1IlluminancePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/sensor/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
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
    entityCategory?: "" | "diagnostic";
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Manually set the time in which the sensor values should b...
     * @yamlKey expire_after
     */
    expireAfter?: TimePeriod;
    /** Specify filters to use for some basic transforming of values. See [Sensor Filters](https://esphome.io/components/sens... */
    filters?: Array<unknown>;
    /**
     * boolean: If true, this option will force the frontend (usually Home Assistant) to create a state changed event when t...
     * @yamlKey force_update
     */
    forceUpdate?: boolean;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a raw value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /**
     * string: The state class for the sensor. See [https://developers.home-assistant.io/docs/core/entity/sensor/#available-...
     * @yamlKey state_class
     */
    stateClass?: "" | "measurement" | "measurement_angle" | "total" | "total_increasing";
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement the sensor should advertise its values with. This does not actually do a...
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: XiaomiCgpr1IlluminancePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface XiaomiMjyd02ylaBatteryLevelPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface XiaomiMjyd02ylaBatteryLevelPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface XiaomiMjyd02ylaBatteryLevelProps {
    /**
     * int: Set the number of digits after the decimal point that data consumers should use. While this does not change the ...
     * @yamlKey accuracy_decimals
     */
    accuracyDecimals?: number;
    availability?: XiaomiMjyd02ylaBatteryLevelPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/sensor/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
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
    entityCategory?: "" | "diagnostic";
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Manually set the time in which the sensor values should b...
     * @yamlKey expire_after
     */
    expireAfter?: TimePeriod;
    /** Specify filters to use for some basic transforming of values. See [Sensor Filters](https://esphome.io/components/sens... */
    filters?: Array<unknown>;
    /**
     * boolean: If true, this option will force the frontend (usually Home Assistant) to create a state changed event when t...
     * @yamlKey force_update
     */
    forceUpdate?: boolean;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a raw value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /**
     * string: The state class for the sensor. See [https://developers.home-assistant.io/docs/core/entity/sensor/#available-...
     * @yamlKey state_class
     */
    stateClass?: "" | "measurement" | "measurement_angle" | "total" | "total_increasing";
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement the sensor should advertise its values with. This does not actually do a...
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: XiaomiMjyd02ylaBatteryLevelPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface XiaomiMjyd02ylaIdleTimePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface XiaomiMjyd02ylaIdleTimePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface XiaomiMjyd02ylaIdleTimeProps {
    /**
     * int: Set the number of digits after the decimal point that data consumers should use. While this does not change the ...
     * @yamlKey accuracy_decimals
     */
    accuracyDecimals?: number;
    availability?: XiaomiMjyd02ylaIdleTimePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/sensor/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
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
    entityCategory?: "" | "diagnostic";
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Manually set the time in which the sensor values should b...
     * @yamlKey expire_after
     */
    expireAfter?: TimePeriod;
    /** Specify filters to use for some basic transforming of values. See [Sensor Filters](https://esphome.io/components/sens... */
    filters?: Array<unknown>;
    /**
     * boolean: If true, this option will force the frontend (usually Home Assistant) to create a state changed event when t...
     * @yamlKey force_update
     */
    forceUpdate?: boolean;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a raw value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /**
     * string: The state class for the sensor. See [https://developers.home-assistant.io/docs/core/entity/sensor/#available-...
     * @yamlKey state_class
     */
    stateClass?: "" | "measurement" | "measurement_angle" | "total" | "total_increasing";
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement the sensor should advertise its values with. This does not actually do a...
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: XiaomiMjyd02ylaIdleTimePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface XiaomiMjyd02ylaIlluminancePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface XiaomiMjyd02ylaIlluminancePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface XiaomiMjyd02ylaIlluminanceProps {
    /**
     * int: Set the number of digits after the decimal point that data consumers should use. While this does not change the ...
     * @yamlKey accuracy_decimals
     */
    accuracyDecimals?: number;
    availability?: XiaomiMjyd02ylaIlluminancePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/sensor/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
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
    entityCategory?: "" | "diagnostic";
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Manually set the time in which the sensor values should b...
     * @yamlKey expire_after
     */
    expireAfter?: TimePeriod;
    /** Specify filters to use for some basic transforming of values. See [Sensor Filters](https://esphome.io/components/sens... */
    filters?: Array<unknown>;
    /**
     * boolean: If true, this option will force the frontend (usually Home Assistant) to create a state changed event when t...
     * @yamlKey force_update
     */
    forceUpdate?: boolean;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a raw value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /**
     * string: The state class for the sensor. See [https://developers.home-assistant.io/docs/core/entity/sensor/#available-...
     * @yamlKey state_class
     */
    stateClass?: "" | "measurement" | "measurement_angle" | "total" | "total_increasing";
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement the sensor should advertise its values with. This does not actually do a...
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: XiaomiMjyd02ylaIlluminancePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface XiaomiMjyd02ylaLightPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface XiaomiMjyd02ylaLightPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface XiaomiMjyd02ylaLightProps {
    availability?: XiaomiMjyd02ylaLightPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: XiaomiMjyd02ylaLightPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface XiaomiRtcgq02lmButtonPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface XiaomiRtcgq02lmButtonPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface XiaomiRtcgq02lmButtonProps {
    availability?: XiaomiRtcgq02lmButtonPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    timeout?: TimePeriod;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: XiaomiRtcgq02lmButtonPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface XiaomiRtcgq02lmLightPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface XiaomiRtcgq02lmLightPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface XiaomiRtcgq02lmLightProps {
    availability?: XiaomiRtcgq02lmLightPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: XiaomiRtcgq02lmLightPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface XiaomiRtcgq02lmMotionPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface XiaomiRtcgq02lmMotionPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface XiaomiRtcgq02lmMotionProps {
    availability?: XiaomiRtcgq02lmMotionPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
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
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    timeout?: TimePeriod;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: XiaomiRtcgq02lmMotionPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface XiaomiWx08zmBatteryLevelPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface XiaomiWx08zmBatteryLevelPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface XiaomiWx08zmBatteryLevelProps {
    /**
     * int: Set the number of digits after the decimal point that data consumers should use. While this does not change the ...
     * @yamlKey accuracy_decimals
     */
    accuracyDecimals?: number;
    availability?: XiaomiWx08zmBatteryLevelPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/sensor/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
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
    entityCategory?: "" | "diagnostic";
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Manually set the time in which the sensor values should b...
     * @yamlKey expire_after
     */
    expireAfter?: TimePeriod;
    /** Specify filters to use for some basic transforming of values. See [Sensor Filters](https://esphome.io/components/sens... */
    filters?: Array<unknown>;
    /**
     * boolean: If true, this option will force the frontend (usually Home Assistant) to create a state changed event when t...
     * @yamlKey force_update
     */
    forceUpdate?: boolean;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a raw value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /**
     * string: The state class for the sensor. See [https://developers.home-assistant.io/docs/core/entity/sensor/#available-...
     * @yamlKey state_class
     */
    stateClass?: "" | "measurement" | "measurement_angle" | "total" | "total_increasing";
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement the sensor should advertise its values with. This does not actually do a...
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: XiaomiWx08zmBatteryLevelPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface XiaomiWx08zmTabletPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface XiaomiWx08zmTabletPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface XiaomiWx08zmTabletProps {
    /**
     * int: Set the number of digits after the decimal point that data consumers should use. While this does not change the ...
     * @yamlKey accuracy_decimals
     */
    accuracyDecimals?: number;
    availability?: XiaomiWx08zmTabletPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/sensor/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
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
    entityCategory?: "" | "diagnostic";
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Manually set the time in which the sensor values should b...
     * @yamlKey expire_after
     */
    expireAfter?: TimePeriod;
    /** Specify filters to use for some basic transforming of values. See [Sensor Filters](https://esphome.io/components/sens... */
    filters?: Array<unknown>;
    /**
     * boolean: If true, this option will force the frontend (usually Home Assistant) to create a state changed event when t...
     * @yamlKey force_update
     */
    forceUpdate?: boolean;
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a raw value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /**
     * string: The state class for the sensor. See [https://developers.home-assistant.io/docs/core/entity/sensor/#available-...
     * @yamlKey state_class
     */
    stateClass?: "" | "measurement" | "measurement_angle" | "total" | "total_increasing";
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement the sensor should advertise its values with. This does not actually do a...
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: XiaomiWx08zmTabletPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface BinarySensorBaseProps extends _CoreEntityBase, _CoreMqttComponent {
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: BinarySensorWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface AnalogThresholdProps extends _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the source sensor.
     * @yamlKey sensor_id
     */
    sensorId: RefProp<__marker_sensor_Sensor>;
    /** float: Configures the reference for comparison. Accepts either a shorthand */
    threshold: number;
}
interface Apds9960Props {
    /** @yamlKey apds9960_id */
    apds9960Id?: RefProp<__marker_apds9960_APDS9960>;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** string: The direction to measure. One of: */
    direction: "down" | "left" | "right" | "up";
}
interface As3935Props {
    /** @yamlKey as3935_id */
    as3935Id?: RefProp<__marker_as3935_AS3935Component>;
}
interface BlePresenceProps extends _CoreComponent {
    /** @yamlKey esp32_ble_id */
    esp32BleId?: RefProp<__marker_esp32_ble_tracker_ESP32BLETracker>;
    /**
     * int: The iBeacon major identifier of the beacon that needs
     * @yamlKey ibeacon_major
     */
    ibeaconMajor?: number;
    /**
     * int: The iBeacon minor identifier of the beacon that needs
     * @yamlKey ibeacon_minor
     */
    ibeaconMinor?: number;
    /**
     * string: The [universally unique identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)
     * @yamlKey ibeacon_uuid
     */
    ibeaconUuid?: string;
    /** 16 byte hex string: The Identity Resolving Key (IRK) to track for this */
    irk?: unknown;
    /**
     * MAC Address: The MAC address to track for this
     * @yamlKey mac_address
     */
    macAddress?: MACAddress;
    /**
     * int: at which minimum RSSI level would the component report the device be present.
     * @yamlKey min_rssi
     */
    minRssi?: number;
    /**
     * string: 16 bit, 32 bit, or 128 bit BLE Service UUID
     * @yamlKey service_uuid
     */
    serviceUuid?: string;
    /** [Time](https://esphome.io/guides/configuration-types#time): The delay after last detecting the device before publishi... */
    timeout?: TimePeriod;
}
interface Cap1188Props {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the CAP1188 defined above. Useful for multiple CAP1...
     * @yamlKey cap1188_id
     */
    cap1188Id?: RefProp<__marker_cap1188_CAP1188Component>;
    /** int: The channel number the CAP1188 the touchkey is connected to. */
    channel: number;
}
interface CopyProps extends _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The binary sensor that should be mirrored.
     * @yamlKey source_id
     */
    sourceId: RefProp<__marker_binary_sensor_BinarySensor>;
}
interface Cst226Props extends _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the touchscreen.
     * @yamlKey cst226_id
     */
    cst226Id?: RefProp<__marker_cst226_CST226Touchscreen>;
}
interface DalyBmsProps extends _CoreComponent {
    /** @yamlKey bms_daly_id */
    bmsDalyId?: RefProp<__marker_daly_bms_DalyBmsComponent>;
    /**
     * The BMS charging MOS status to enable the recharge of the battery. All options from [Binary Sensor](https://esphome.i...
     * @yamlKey charging_mos_enabled
     */
    chargingMosEnabled?: DalyBmsChargingMosEnabledProps;
    /**
     * The BMS discharging mos status to enable the load. All options from [Binary Sensor](https://esphome.io/components/bin...
     * @yamlKey discharging_mos_enabled
     */
    dischargingMosEnabled?: DalyBmsDischargingMosEnabledProps;
}
interface DfrobotSen0395Props {
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the DFRobot mmWave component defined above. Require...
     * @yamlKey dfrobot_sen0395_id
     */
    dfrobotSen0395Id?: RefProp<__marker_dfrobot_sen0395_DfrobotSen0395Component>;
}
interface Esp32TouchProps {
    /** @yamlKey esp32_touch_id */
    esp32TouchId?: RefProp<__marker_esp32_touch_ESP32TouchComponent>;
    /** [Pin](https://esphome.io/guides/configuration-types#pin): The pin to detect touch */
    pin: unknown;
    /** `int`: The threshold to use to detect touch events. See */
    threshold: number;
    /**
     * `int`: The threshold to use to detect touch events to wake-up from deep sleep.
     * @yamlKey wakeup_threshold
     */
    wakeupThreshold?: number;
}
interface EzoPmpProps {
    id?: RefProp<__marker_ezo_pmp_EzoPMP>;
    /** @yamlKey is_paused */
    isPaused?: EzoPmpIsPausedProps;
    /** @yamlKey pump_state */
    pumpState?: EzoPmpPumpStateProps;
}
interface FingerprintGrowProps {
    /** @yamlKey fingerprint_grow_id */
    fingerprintGrowId?: RefProp<__marker_fingerprint_grow_FingerprintGrowComponent>;
    icon?: unknown;
}
interface Gdk101Props {
    /** @yamlKey gdk101_id */
    gdk101Id?: RefProp<__marker_gdk101_GDK101Component>;
    /** Vibration status. All options from [Binary Sensor](https://esphome.io/components/binary_sensor#config-binary_sensor). */
    vibrations: Gdk101VibrationsProps;
}
interface GpioProps extends _CoreComponent {
    /**
     * string: The type of interrupt to use. One of:
     * @yamlKey interrupt_type
     */
    interruptType?: "ANY" | "FALLING" | "RISING";
    /** [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin to monitor. */
    pin: Pin;
    /**
     * boolean: Use hardware interrupts instead of polling for better performance and lower CPU usage. Defaults to `true` fo...
     * @yamlKey use_interrupt
     */
    useInterrupt?: boolean;
}
interface Gt911Props {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the touchscreen.
     * @yamlKey gt911_id
     */
    gt911Id?: RefProp<__marker_gt911_GT911Touchscreen>;
    /** int: Internal index of the touch button, between 0 and 3. The default is 0. */
    index?: number;
}
interface HaierProps {
    /**
     * A binary sensor that indicates Haier climate compressor activity. All options from [Binary Sensor](https://esphome.io...
     * @yamlKey compressor_status
     */
    compressorStatus?: HaierCompressorStatusProps;
    /**
     * A binary sensor that indicates defrost procedure activity. All options from [Binary Sensor](https://esphome.io/compon...
     * @yamlKey defrost_status
     */
    defrostStatus?: HaierDefrostStatusProps;
    /**
     * A binary sensor that indicates four way valve status. All options from [Binary Sensor](https://esphome.io/components/...
     * @yamlKey four_way_valve_status
     */
    fourWayValveStatus?: HaierFourWayValveStatusProps;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The id of haier climate component
     * @yamlKey haier_id
     */
    haierId?: RefProp<__marker_haier_HonClimate>;
    /**
     * A binary sensor that indicates electrical heating system activity. All options from [Binary Sensor](https://esphome.i...
     * @yamlKey indoor_electric_heating_status
     */
    indoorElectricHeatingStatus?: HaierIndoorElectricHeatingStatusProps;
    /**
     * A binary sensor that indicates indoor fan activity. All options from [Binary Sensor](https://esphome.io/components/bi...
     * @yamlKey indoor_fan_status
     */
    indoorFanStatus?: HaierIndoorFanStatusProps;
    /**
     * A binary sensor that indicates outdoor fan activity. All options from [Binary Sensor](https://esphome.io/components/b...
     * @yamlKey outdoor_fan_status
     */
    outdoorFanStatus?: HaierOutdoorFanStatusProps;
}
interface HlkFm22xProps {
    /** @yamlKey hlk_fm22x_id */
    hlkFm22xId?: RefProp<__marker_hlk_fm22x_HlkFm22xComponent>;
    icon?: unknown;
}
interface HomeassistantProps extends _HomeassistantHomeAssistantImport {
}
interface HydreonRgxxProps {
    /**
     * `true` if the sensor reports the Emitter being saturated.
     * @yamlKey em_sat
     */
    emSat?: HydreonRgxxEmSatProps;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the Hydreon Rain Sensor display.
     * @yamlKey hydreon_rgxx_id
     */
    hydreonRgxxId?: RefProp<__marker_hydreon_rgxx_HydreonRGxxComponent>;
    /**
     * `true` if the sensor reports the lens being bad.
     * @yamlKey lens_bad
     */
    lensBad?: HydreonRgxxLensBadProps;
    /**
     * `true` if the sensor reports being too cold. Hydreon only mentions this feature for the RG-9.
     * @yamlKey too_cold
     */
    tooCold?: HydreonRgxxTooColdProps;
}
interface Ld2410Props {
    /**
     * If true a moving target is detected. All options from [Binary Sensor](https://esphome.io/components/binary_sensor#con...
     * @yamlKey has_moving_target
     */
    hasMovingTarget?: Ld2410HasMovingTargetProps;
    /**
     * If true a still target is detected. All options from [Binary Sensor](https://esphome.io/components/binary_sensor#conf...
     * @yamlKey has_still_target
     */
    hasStillTarget?: Ld2410HasStillTargetProps;
    /**
     * If true target detect either still or in movement. All options from [Binary Sensor](https://esphome.io/components/bin...
     * @yamlKey has_target
     */
    hasTarget?: Ld2410HasTargetProps;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID for the [Ld2410](https://esphome.io/c...
     * @yamlKey ld2410_id
     */
    ld2410Id?: RefProp<__marker_ld2410_LD2410Component>;
    /**
     * When in [engineering mode](https://esphome.io/components/sensor/ld2410#ld2410-engineering-mode), indicates the status...
     * @yamlKey out_pin_presence_status
     */
    outPinPresenceStatus?: Ld2410OutPinPresenceStatusProps;
}
interface Ld2412Props {
    /**
     * True while the sensor is performing dynamic background correction. All options from [Binary Sensor](https://esphome.i...
     * @yamlKey dynamic_background_correction_status
     */
    dynamicBackgroundCorrectionStatus?: Ld2412DynamicBackgroundCorrectionStatusProps;
    /**
     * True if a moving target is detected. All options from [Binary Sensor](https://esphome.io/components/binary_sensor#con...
     * @yamlKey has_moving_target
     */
    hasMovingTarget?: Ld2412HasMovingTargetProps;
    /**
     * True if a still target is detected. All options from [Binary Sensor](https://esphome.io/components/binary_sensor#conf...
     * @yamlKey has_still_target
     */
    hasStillTarget?: Ld2412HasStillTargetProps;
    /**
     * If true target detect either still or in movement. All options from [Binary Sensor](https://esphome.io/components/bin...
     * @yamlKey has_target
     */
    hasTarget?: Ld2412HasTargetProps;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID for the component. Required when usin...
     * @yamlKey ld2412_id
     */
    ld2412Id?: RefProp<__marker_ld2412_LD2412Component>;
}
interface Ld2420Props extends _CoreComponent {
    /**
     * If a target is detected with either still or in movement has_target will be set true for the duration of the presence...
     * @yamlKey has_target
     */
    hasTarget?: Ld2420HasTargetProps;
    /** @yamlKey ld2420_id */
    ld2420Id?: RefProp<__marker_ld2420_LD2420Component>;
}
interface Ld2450Props {
    /**
     * True if a moving target is detected. All options from [Binary Sensor](https://esphome.io/components/binary_sensor#con...
     * @yamlKey has_moving_target
     */
    hasMovingTarget?: Ld2450HasMovingTargetProps;
    /**
     * True if a still target is detected. All options from [Binary Sensor](https://esphome.io/components/binary_sensor#conf...
     * @yamlKey has_still_target
     */
    hasStillTarget?: Ld2450HasStillTargetProps;
    /**
     * True if either target is still or in movement. All options from [Binary Sensor](https://esphome.io/components/binary_...
     * @yamlKey has_target
     */
    hasTarget?: Ld2450HasTargetProps;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID for the [Ld2450](https://esphome.io/c...
     * @yamlKey ld2450_id
     */
    ld2450Id?: RefProp<__marker_ld2450_LD2450Component>;
}
interface LvglProps {
    id?: unknown;
    widget: RefProp<__marker_lvgl_LvPseudoButton>;
}
interface M5stack8angleProps extends _CoreComponent {
    /** @yamlKey m5stack_8angle_id */
    m5stack8angleId?: RefProp<__marker_m5stack_8angle_M5Stack8AngleComponent>;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface MatrixKeypadProps {
    /** integer: The column of the key. */
    col?: number;
    /** string: The key from `keys` configuration entry above. */
    key?: string;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the keypad to process keypresses from.
     * @yamlKey keypad_id
     */
    keypadId?: RefProp<__marker_matrix_keypad_MatrixKeypad>;
    /** integer: The row of the key. */
    row?: number;
}
interface ModbusControllerProps extends _CoreComponent, _ModbusControllerModbusitembaseschema {
    /** @yamlKey register_type */
    registerType?: "coil" | "custom" | "discrete_input" | "holding" | "read";
}
interface Mpr121Props {
    /** int: The channel number at the MPR121 the touchkey is connected to. */
    channel: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the MPR121 defined above. Useful for multiple MPR12...
     * @yamlKey mpr121_id
     */
    mpr121Id?: RefProp<__marker_mpr121_MPR121Component>;
    /**
     * int: A per-channel override of the global release_threshold value. If not specified, uses the global value.
     * @yamlKey release_threshold
     */
    releaseThreshold?: number;
    /**
     * int: A per-channel override of the global touch_threshold value. If not specified, uses the global value.
     * @yamlKey touch_threshold
     */
    touchThreshold?: number;
}
interface Msa3xxProps extends _Msa3xxMsaSensor {
    /** Movement detection. */
    active?: Msa3xxActiveProps;
    /**
     * Double tap detection.
     * @yamlKey double_tap
     */
    doubleTap?: Msa3xxDoubleTapProps;
    /** Single tap detection. */
    tap?: Msa3xxTapProps;
}
interface NextionProps extends _NextionBinarySensorConfigBinarySensor, _CoreComponent {
    /**
     * string: The ID (the number, not name!) of the component to track.
     * @yamlKey component_id
     */
    componentId?: number;
    /**
     * string: The ID of the page the component is on. Use `0` for the default page.
     * @yamlKey page_id
     */
    pageId?: number;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The duration to update the sensor. If using a [Nextion Cu...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
interface NfcProps extends _CoreComponent {
    /**
     * string: A (sub)string that must appear in the tag's NDEF message. May not be used with `tag_id` and/or `uid` (below).
     * @yamlKey ndef_contains
     */
    ndefContains?: string;
    /** @yamlKey nfcc_id */
    nfccId?: RefProp<__marker_nfc_Nfcc>;
    /**
     * string: A string that identifies the tag; in effect, its name. Specifically, this looks for the Home Assistant URI en...
     * @yamlKey tag_id
     */
    tagId?: string;
    /** string: The unique ID of the NFC tag. This is a hyphen-separated list of hexadecimal values. For example: `74-10-37-9... */
    uid?: string;
}
interface OpenthermProps extends _CoreComponent {
    /** @yamlKey air_pressure_fault */
    airPressureFault?: OpenthermAirPressureFaultProps;
    /** @yamlKey ch_active */
    chActive?: OpenthermChActiveProps;
    /** @yamlKey ch2_active */
    ch2Active?: OpenthermCh2ActiveProps;
    /** @yamlKey ch2_present */
    ch2Present?: OpenthermCh2PresentProps;
    /** @yamlKey control_type_on_off */
    controlTypeOnOff?: OpenthermControlTypeOnOffProps;
    /** @yamlKey controller_pump_control_allowed */
    controllerPumpControlAllowed?: OpenthermControllerPumpControlAllowedProps;
    /** @yamlKey cooling_active */
    coolingActive?: OpenthermCoolingActiveProps;
    /** @yamlKey cooling_supported */
    coolingSupported?: OpenthermCoolingSupportedProps;
    /** @yamlKey dhw_active */
    dhwActive?: OpenthermDhwActiveProps;
    /** @yamlKey dhw_present */
    dhwPresent?: OpenthermDhwPresentProps;
    /** @yamlKey dhw_setpoint_rw */
    dhwSetpointRw?: OpenthermDhwSetpointRwProps;
    /** @yamlKey dhw_setpoint_transfer_enabled */
    dhwSetpointTransferEnabled?: OpenthermDhwSetpointTransferEnabledProps;
    /** @yamlKey dhw_storage_tank */
    dhwStorageTank?: OpenthermDhwStorageTankProps;
    /** @yamlKey diagnostic_indication */
    diagnosticIndication?: OpenthermDiagnosticIndicationProps;
    /** @yamlKey electricity_production */
    electricityProduction?: OpenthermElectricityProductionProps;
    /** @yamlKey fault_indication */
    faultIndication?: OpenthermFaultIndicationProps;
    /** @yamlKey flame_fault */
    flameFault?: OpenthermFlameFaultProps;
    /** @yamlKey flame_on */
    flameOn?: OpenthermFlameOnProps;
    /** @yamlKey heat_mode */
    heatMode?: OpenthermHeatModeProps;
    /** @yamlKey lockout_reset */
    lockoutReset?: OpenthermLockoutResetProps;
    /** @yamlKey low_water_pressure */
    lowWaterPressure?: OpenthermLowWaterPressureProps;
    /** @yamlKey max_ch_setpoint_rw */
    maxChSetpointRw?: OpenthermMaxChSetpointRwProps;
    /** @yamlKey max_ch_setpoint_transfer_enabled */
    maxChSetpointTransferEnabled?: OpenthermMaxChSetpointTransferEnabledProps;
    /** @yamlKey opentherm_id */
    openthermId?: RefProp<__marker_opentherm_OpenthermHub>;
    /** @yamlKey service_request */
    serviceRequest?: OpenthermServiceRequestProps;
    /** @yamlKey water_filling */
    waterFilling?: OpenthermWaterFillingProps;
    /** @yamlKey water_over_temp */
    waterOverTemp?: OpenthermWaterOverTempProps;
}
interface PacketTransportDataProps {
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /** string: The name of the binary sensor. */
    name?: string;
    /** string: The name of the provider node. */
    provider: string;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the original binary sensor in the provider device. ...
     * @yamlKey remote_id
     */
    remoteId?: string;
    /** @yamlKey transport_id */
    transportId?: RefProp<__marker_packet_transport_PacketTransport>;
}
interface PacketTransportStatusProps extends _PacketTransportBinarySensorStatusSensor {
}
interface PipsolarProps extends _PipsolarComponent {
    /**
     * ac charging status
     * @yamlKey ac_charging_status
     */
    acChargingStatus?: PipsolarAcChargingStatusProps;
    /**
     * add sbu priority version
     * @yamlKey add_sbu_priority_version
     */
    addSbuPriorityVersion?: PipsolarAddSbuPriorityVersionProps;
    /**
     * alarm on when primary source interrupt
     * @yamlKey alarm_on_when_primary_source_interrupt
     */
    alarmOnWhenPrimarySourceInterrupt?: PipsolarAlarmOnWhenPrimarySourceInterruptProps;
    /**
     * backlight on
     * @yamlKey backlight_on
     */
    backlightOn?: PipsolarBacklightOnProps;
    /**
     * battery voltage to steady while charging
     * @yamlKey battery_voltage_to_steady_while_charging
     */
    batteryVoltageToSteadyWhileCharging?: PipsolarBatteryVoltageToSteadyWhileChargingProps;
    /**
     * charging status
     * @yamlKey charging_status
     */
    chargingStatus?: PipsolarChargingStatusProps;
    /**
     * charging to floating mode
     * @yamlKey charging_to_floating_mode
     */
    chargingToFloatingMode?: PipsolarChargingToFloatingModeProps;
    /**
     * configuration status
     * @yamlKey configuration_status
     */
    configurationStatus?: PipsolarConfigurationStatusProps;
    /**
     * dustproof installed
     * @yamlKey dustproof_installed
     */
    dustproofInstalled?: PipsolarDustproofInstalledProps;
    /**
     * fault battery open
     * @yamlKey fault_battery_open
     */
    faultBatteryOpen?: PipsolarFaultBatteryOpenProps;
    /**
     * fault battery short
     * @yamlKey fault_battery_short
     */
    faultBatteryShort?: PipsolarFaultBatteryShortProps;
    /**
     * fault bus over
     * @yamlKey fault_bus_over
     */
    faultBusOver?: PipsolarFaultBusOverProps;
    /**
     * fault bus soft fail
     * @yamlKey fault_bus_soft_fail
     */
    faultBusSoftFail?: PipsolarFaultBusSoftFailProps;
    /**
     * fault bus under
     * @yamlKey fault_bus_under
     */
    faultBusUnder?: PipsolarFaultBusUnderProps;
    /**
     * fault code
     * @yamlKey fault_code
     */
    faultCode?: PipsolarFaultCodeProps;
    /**
     * fault code record
     * @yamlKey fault_code_record
     */
    faultCodeRecord?: PipsolarFaultCodeRecordProps;
    /**
     * fault current sensor failed
     * @yamlKey fault_current_sensor_failed
     */
    faultCurrentSensorFailed?: PipsolarFaultCurrentSensorFailedProps;
    /**
     * fault dc dc over current
     * @yamlKey fault_dc_dc_over_current
     */
    faultDcDcOverCurrent?: PipsolarFaultDcDcOverCurrentProps;
    /**
     * fault inverter fault
     * @yamlKey fault_inverter_fault
     */
    faultInverterFault?: PipsolarFaultInverterFaultProps;
    /**
     * fault inverter over current
     * @yamlKey fault_inverter_over_current
     */
    faultInverterOverCurrent?: PipsolarFaultInverterOverCurrentProps;
    /**
     * fault inverter soft failed
     * @yamlKey fault_inverter_soft_failed
     */
    faultInverterSoftFailed?: PipsolarFaultInverterSoftFailedProps;
    /**
     * fault inverter voltage too high
     * @yamlKey fault_inverter_voltage_too_high
     */
    faultInverterVoltageTooHigh?: PipsolarFaultInverterVoltageTooHighProps;
    /**
     * fault inverter voltage too low
     * @yamlKey fault_inverter_voltage_too_low
     */
    faultInverterVoltageTooLow?: PipsolarFaultInverterVoltageTooLowProps;
    /**
     * fault mppt overload
     * @yamlKey fault_mppt_overload
     */
    faultMpptOverload?: PipsolarFaultMpptOverloadProps;
    /**
     * fault op dc voltage over
     * @yamlKey fault_op_dc_voltage_over
     */
    faultOpDcVoltageOver?: PipsolarFaultOpDcVoltageOverProps;
    /**
     * fault opvshort
     * @yamlKey fault_opvshort
     */
    faultOpvshort?: PipsolarFaultOpvshortProps;
    /**
     * fault_self_test_failed
     * @yamlKey fault_self_test_failed
     */
    faultSelfTestFailed?: PipsolarFaultSelfTestFailedProps;
    /**
     * faults present
     * @yamlKey faults_present
     */
    faultsPresent?: PipsolarFaultsPresentProps;
    /**
     * lcd escape to default
     * @yamlKey lcd_escape_to_default
     */
    lcdEscapeToDefault?: PipsolarLcdEscapeToDefaultProps;
    /**
     * load status
     * @yamlKey load_status
     */
    loadStatus?: PipsolarLoadStatusProps;
    /**
     * over temperature restart function
     * @yamlKey over_temperature_restart_function
     */
    overTemperatureRestartFunction?: PipsolarOverTemperatureRestartFunctionProps;
    /**
     * overload bypass function
     * @yamlKey overload_bypass_function
     */
    overloadBypassFunction?: PipsolarOverloadBypassFunctionProps;
    /**
     * overload restart function
     * @yamlKey overload_restart_function
     */
    overloadRestartFunction?: PipsolarOverloadRestartFunctionProps;
    /**
     * power saving
     * @yamlKey power_saving
     */
    powerSaving?: PipsolarPowerSavingProps;
    /**
     * scc charging status
     * @yamlKey scc_charging_status
     */
    sccChargingStatus?: PipsolarSccChargingStatusProps;
    /**
     * scc firmware version
     * @yamlKey scc_firmware_version
     */
    sccFirmwareVersion?: PipsolarSccFirmwareVersionProps;
    /**
     * silence buzzer open buzzer
     * @yamlKey silence_buzzer_open_buzzer
     */
    silenceBuzzerOpenBuzzer?: PipsolarSilenceBuzzerOpenBuzzerProps;
    /**
     * switch on
     * @yamlKey switch_on
     */
    switchOn?: PipsolarSwitchOnProps;
    /**
     * warning battery derating
     * @yamlKey warning_battery_derating
     */
    warningBatteryDerating?: PipsolarWarningBatteryDeratingProps;
    /**
     * warning battery equalization
     * @yamlKey warning_battery_equalization
     */
    warningBatteryEqualization?: PipsolarWarningBatteryEqualizationProps;
    /**
     * warning battery low alarm
     * @yamlKey warning_battery_low_alarm
     */
    warningBatteryLowAlarm?: PipsolarWarningBatteryLowAlarmProps;
    /**
     * warning battery too low to charge
     * @yamlKey warning_battery_too_low_to_charge
     */
    warningBatteryTooLowToCharge?: PipsolarWarningBatteryTooLowToChargeProps;
    /**
     * warning battery under shutdown
     * @yamlKey warning_battery_under_shutdown
     */
    warningBatteryUnderShutdown?: PipsolarWarningBatteryUnderShutdownProps;
    /**
     * warning battery voltage high
     * @yamlKey warning_battery_voltage_high
     */
    warningBatteryVoltageHigh?: PipsolarWarningBatteryVoltageHighProps;
    /**
     * warning eeprom failed
     * @yamlKey warning_eeprom_failed
     */
    warningEepromFailed?: PipsolarWarningEepromFailedProps;
    /**
     * warning fan lock
     * @yamlKey warning_fan_lock
     */
    warningFanLock?: PipsolarWarningFanLockProps;
    /**
     * warning high ac input during bus soft start
     * @yamlKey warning_high_ac_input_during_bus_soft_start
     */
    warningHighAcInputDuringBusSoftStart?: PipsolarWarningHighAcInputDuringBusSoftStartProps;
    /**
     * warning line fail
     * @yamlKey warning_line_fail
     */
    warningLineFail?: PipsolarWarningLineFailProps;
    /**
     * warning low pv energy
     * @yamlKey warning_low_pv_energy
     */
    warningLowPvEnergy?: PipsolarWarningLowPvEnergyProps;
    /**
     * warning mppt overload
     * @yamlKey warning_mppt_overload
     */
    warningMpptOverload?: PipsolarWarningMpptOverloadProps;
    /**
     * warning over load
     * @yamlKey warning_over_load
     */
    warningOverLoad?: PipsolarWarningOverLoadProps;
    /**
     * warning over temperature
     * @yamlKey warning_over_temperature
     */
    warningOverTemperature?: PipsolarWarningOverTemperatureProps;
    /**
     * warning power limit
     * @yamlKey warning_power_limit
     */
    warningPowerLimit?: PipsolarWarningPowerLimitProps;
    /**
     * warning power loss
     * @yamlKey warning_power_loss
     */
    warningPowerLoss?: PipsolarWarningPowerLossProps;
    /**
     * warning pv voltage high
     * @yamlKey warning_pv_voltage_high
     */
    warningPvVoltageHigh?: PipsolarWarningPvVoltageHighProps;
    /**
     * warnings present
     * @yamlKey warnings_present
     */
    warningsPresent?: PipsolarWarningsPresentProps;
}
interface Pn532Props {
    /** @yamlKey pn532_id */
    pn532Id?: RefProp<__marker_pn532_PN532>;
    uid: unknown;
}
interface QwiicPirProps extends _CoreComponent {
    address?: number;
    /** [Time](https://esphome.io/guides/configuration-types#time): Only valid when using `NATIVE` debounce mode. Configures ... */
    debounce?: TimePeriod;
    /**
     * enum: How the component debounces the motion sensor's signal. Must be one of `HYBRID`, `NATIVE`, or `RAW`. See [Debou...
     * @yamlKey debounce_mode
     */
    debounceMode?: "HYBRID" | "NATIVE" | "RAW";
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<__marker_i2c_I2CBus>;
}
interface Rc522Props {
    /** @yamlKey rc522_id */
    rc522Id?: RefProp<__marker_rc522_RC522>;
    uid: unknown;
}
interface Rc522SpiProps {
    /** @yamlKey rc522_id */
    rc522Id?: RefProp<__marker_rc522_RC522>;
    uid: unknown;
}
interface Rd03dProps {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the RD-03D component.
     * @yamlKey rd03d_id
     */
    rd03dId?: RefProp<__marker_rd03d_RD03DComponent>;
    /** True if any target is detected. All options from [Binary Sensor](https://esphome.io/components/binary_sensor#config-b... */
    target?: Rd03dTargetProps;
    /** @yamlKey target_1 */
    target1?: Rd03dTarget1Props;
    /** @yamlKey target_2 */
    target2?: Rd03dTarget2Props;
    /** @yamlKey target_3 */
    target3?: Rd03dTarget3Props;
}
interface Rdm6300Props {
    /** @yamlKey rdm6300_id */
    rdm6300Id?: RefProp<__marker_rdm6300_RDM6300Component>;
    /** int: The unique ID of the NFC/RFID tag. */
    uid: number;
}
interface RemoteReceiverProps extends _CoreComponent {
    /** Trigger on a decoded ABB-Welcome code with the given data, see the [transmitter description](https://esphome.io/compo... */
    abbwelcome?: RemoteReceiverAbbwelcomeProps;
    /** Trigger on a decoded AEHA remote code with the given data. */
    aeha?: RemoteReceiverAehaProps;
    /** Trigger on a decoded B&O Beo4 infrared remote code with the given data. */
    beo4?: RemoteReceiverBeo4Props;
    /** Trigger on a decoded brennenstuhl RF code with the given data. */
    brennenstuhl?: RemoteReceiverBrennenstuhlProps;
    /** Trigger on a decoded Byron SX Doorbell RF remote code with the given data. */
    byronsx?: RemoteReceiverByronsxProps;
    /** Trigger on a decoded CanalSat remote code with the given data. */
    canalsat?: RemoteReceiverCanalsatProps;
    /** Trigger on a decoded CanalSatLD remote code with the given data. */
    canalsatld?: RemoteReceiverCanalsatldProps;
    /** Trigger on a decoded Coolix remote code with the given data. It is possible to directly specify a 24-bit code, it wil... */
    coolix?: RemoteReceiverCoolixProps;
    /** Trigger on a decoded Dish Network remote code with the given data. Beware that Dish remotes use a different carrier f... */
    dish?: RemoteReceiverDishProps;
    /** Trigger on a decoded Dooya RF remote code with the given data. */
    dooya?: RemoteReceiverDooyaProps;
    /** Trigger on a decoded Drayton Digistat RF remote code with the given data. */
    drayton?: RemoteReceiverDraytonProps;
    /** Trigger on a decoded dyson cool AM07 infrared remote code with the given data. */
    dyson?: RemoteReceiverDysonProps;
    /** Trigger on a decoded Go-Box remote code with the given data. */
    gobox?: RemoteReceiverGoboxProps;
    /** Trigger on a Haier remote code with the given code. */
    haier?: RemoteReceiverHaierProps;
    /** Trigger on a decoded JVC remote code with the given data. */
    jvc?: RemoteReceiverJvcProps;
    /** Trigger on a decoded KeeLoq RF remote code with the given data. */
    keeloq?: RemoteReceiverKeeloqProps;
    /** Trigger on a decoded LG remote code with the given data. */
    lg?: RemoteReceiverLgProps;
    /** Trigger on a decoded MagiQuest wand remote code with the given wand ID. */
    magiquest?: RemoteReceiverMagiquestProps;
    /** Trigger on a Midea remote code with the given code. */
    midea?: RemoteReceiverMideaProps;
    /** Trigger on a Mirage remote code with the given code. */
    mirage?: RemoteReceiverMirageProps;
    /** Trigger on a decoded NEC remote code with the given data. */
    nec?: RemoteReceiverNecProps;
    /** Trigger on a decoded Nexa RF code with the given data. */
    nexa?: RemoteReceiverNexaProps;
    /** Trigger on a decoded Panasonic remote code with the given data. */
    panasonic?: RemoteReceiverPanasonicProps;
    /** Trigger on a decoded Pioneer remote code with the given data. */
    pioneer?: RemoteReceiverPioneerProps;
    /** Trigger on a Pronto remote code with the given code. */
    pronto?: RemoteReceiverProntoProps;
    /** Trigger on a raw remote code with the given code. */
    raw?: RemoteReceiverRawProps;
    /**
     * Trigger on a decoded RC Switch raw remote code with the given data.
     * @yamlKey rc_switch_raw
     */
    rcSwitchRaw?: RemoteReceiverRcSwitchRawProps;
    /**
     * Trigger on a decoded RC Switch Type A remote code with the given data.
     * @yamlKey rc_switch_type_a
     */
    rcSwitchTypeA?: RemoteReceiverRcSwitchTypeAProps;
    /**
     * Trigger on a decoded RC Switch Type B remote code with the given data.
     * @yamlKey rc_switch_type_b
     */
    rcSwitchTypeB?: RemoteReceiverRcSwitchTypeBProps;
    /**
     * Trigger on a decoded RC Switch Type C remote code with the given data.
     * @yamlKey rc_switch_type_c
     */
    rcSwitchTypeC?: RemoteReceiverRcSwitchTypeCProps;
    /**
     * Trigger on a decoded RC Switch Type D remote code with the given data.
     * @yamlKey rc_switch_type_d
     */
    rcSwitchTypeD?: RemoteReceiverRcSwitchTypeDProps;
    /** Trigger on a decoded RC5 remote code with the given data. */
    rc5?: RemoteReceiverRc5Props;
    /** Trigger on a decoded RC6 remote code with the given data. */
    rc6?: RemoteReceiverRc6Props;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The remote receiver to receive the remote code with. Required...
     * @yamlKey receiver_id
     */
    receiverId?: RefProp<__marker_remote_base_RemoteReceiverBase>;
    /** Trigger on a decoded Roomba remote code with the given data. */
    roomba?: RemoteReceiverRoombaProps;
    /** Trigger on a decoded Samsung remote code with the given data. */
    samsung?: RemoteReceiverSamsungProps;
    /** Trigger on a decoded Samsung36 remote code with the given data. */
    samsung36?: RemoteReceiverSamsung36Props;
    /** Trigger on a decoded Sony remote code with the given data. */
    sony?: RemoteReceiverSonyProps;
    /** Trigger on a decoded Symphony remote code with the given data. */
    symphony?: RemoteReceiverSymphonyProps;
    /**
     * Trigger on a decoded Toshiba AC remote code with the given data.
     * @yamlKey toshiba_ac
     */
    toshibaAc?: RemoteReceiverToshibaAcProps;
    /** Trigger on a decoded Toto remote code with the given data. */
    toto?: RemoteReceiverTotoProps;
}
interface SdlProps extends _CoreComponent {
    id?: unknown;
    /** The ID of an [SDL key](https://www.libsdl.org/release/SDL-1.2.15/docs/html/sdlkey.html). */
    key: "SDLK_0" | "SDLK_1" | "SDLK_2" | "SDLK_3" | "SDLK_4" | "SDLK_5" | "SDLK_6" | "SDLK_7" | "SDLK_8" | "SDLK_9" | "SDLK_AC_BACK" | "SDLK_AC_BOOKMARKS" | "SDLK_AC_FORWARD" | "SDLK_AC_HOME" | "SDLK_AC_REFRESH" | "SDLK_AC_SEARCH" | "SDLK_AC_STOP" | "SDLK_AGAIN" | "SDLK_ALTERASE" | "SDLK_AMPERSAND" | "SDLK_APP1" | "SDLK_APP2" | "SDLK_APPLICATION" | "SDLK_ASTERISK" | "SDLK_AT" | "SDLK_AUDIOFASTFORWARD" | "SDLK_AUDIOMUTE" | "SDLK_AUDIONEXT" | "SDLK_AUDIOPLAY" | "SDLK_AUDIOPREV" | "SDLK_AUDIOREWIND" | "SDLK_AUDIOSTOP" | "SDLK_BACKQUOTE" | "SDLK_BACKSLASH" | "SDLK_BACKSPACE" | "SDLK_BRIGHTNESSDOWN" | "SDLK_BRIGHTNESSUP" | "SDLK_CALCULATOR" | "SDLK_CALL" | "SDLK_CANCEL" | "SDLK_CAPSLOCK" | "SDLK_CARET" | "SDLK_CLEAR" | "SDLK_CLEARAGAIN" | "SDLK_COLON" | "SDLK_COMMA" | "SDLK_COMPUTER" | "SDLK_COPY" | "SDLK_CRSEL" | "SDLK_CURRENCYSUBUNIT" | "SDLK_CURRENCYUNIT" | "SDLK_CUT" | "SDLK_DECIMALSEPARATOR" | "SDLK_DELETE" | "SDLK_DISPLAYSWITCH" | "SDLK_DOLLAR" | "SDLK_DOWN" | "SDLK_EJECT" | "SDLK_END" | "SDLK_ENDCALL" | "SDLK_EQUALS" | "SDLK_ESCAPE" | "SDLK_EXCLAIM" | "SDLK_EXECUTE" | "SDLK_EXSEL" | "SDLK_F1" | "SDLK_F10" | "SDLK_F11" | "SDLK_F12" | "SDLK_F13" | "SDLK_F14" | "SDLK_F15" | "SDLK_F16" | "SDLK_F17" | "SDLK_F18" | "SDLK_F19" | "SDLK_F2" | "SDLK_F20" | "SDLK_F21" | "SDLK_F22" | "SDLK_F23" | "SDLK_F24" | "SDLK_F3" | "SDLK_F4" | "SDLK_F5" | "SDLK_F6" | "SDLK_F7" | "SDLK_F8" | "SDLK_F9" | "SDLK_FIND" | "SDLK_GREATER" | "SDLK_HASH" | "SDLK_HELP" | "SDLK_HOME" | "SDLK_INSERT" | "SDLK_KBDILLUMDOWN" | "SDLK_KBDILLUMTOGGLE" | "SDLK_KBDILLUMUP" | "SDLK_KP_0" | "SDLK_KP_00" | "SDLK_KP_000" | "SDLK_KP_1" | "SDLK_KP_2" | "SDLK_KP_3" | "SDLK_KP_4" | "SDLK_KP_5" | "SDLK_KP_6" | "SDLK_KP_7" | "SDLK_KP_8" | "SDLK_KP_9" | "SDLK_KP_A" | "SDLK_KP_AMPERSAND" | "SDLK_KP_AT" | "SDLK_KP_B" | "SDLK_KP_BACKSPACE" | "SDLK_KP_BINARY" | "SDLK_KP_C" | "SDLK_KP_CLEAR" | "SDLK_KP_CLEARENTRY" | "SDLK_KP_COLON" | "SDLK_KP_COMMA" | "SDLK_KP_D" | "SDLK_KP_DBLAMPERSAND" | "SDLK_KP_DBLVERTICALBAR" | "SDLK_KP_DECIMAL" | "SDLK_KP_DIVIDE" | "SDLK_KP_E" | "SDLK_KP_ENTER" | "SDLK_KP_EQUALS" | "SDLK_KP_EQUALSAS400" | "SDLK_KP_EXCLAM" | "SDLK_KP_F" | "SDLK_KP_GREATER" | "SDLK_KP_HASH" | "SDLK_KP_HEXADECIMAL" | "SDLK_KP_LEFTBRACE" | "SDLK_KP_LEFTPAREN" | "SDLK_KP_LESS" | "SDLK_KP_MEMADD" | "SDLK_KP_MEMCLEAR" | "SDLK_KP_MEMDIVIDE" | "SDLK_KP_MEMMULTIPLY" | "SDLK_KP_MEMRECALL" | "SDLK_KP_MEMSTORE" | "SDLK_KP_MEMSUBTRACT" | "SDLK_KP_MINUS" | "SDLK_KP_MULTIPLY" | "SDLK_KP_OCTAL" | "SDLK_KP_PERCENT" | "SDLK_KP_PERIOD" | "SDLK_KP_PLUS" | "SDLK_KP_PLUSMINUS" | "SDLK_KP_POWER" | "SDLK_KP_RIGHTBRACE" | "SDLK_KP_RIGHTPAREN" | "SDLK_KP_SPACE" | "SDLK_KP_TAB" | "SDLK_KP_VERTICALBAR" | "SDLK_KP_XOR" | "SDLK_LALT" | "SDLK_LCTRL" | "SDLK_LEFT" | "SDLK_LEFTBRACKET" | "SDLK_LEFTPAREN" | "SDLK_LESS" | "SDLK_LGUI" | "SDLK_LSHIFT" | "SDLK_MAIL" | "SDLK_MEDIASELECT" | "SDLK_MENU" | "SDLK_MINUS" | "SDLK_MODE" | "SDLK_MUTE" | "SDLK_NUMLOCKCLEAR" | "SDLK_OPER" | "SDLK_OUT" | "SDLK_PAGEDOWN" | "SDLK_PAGEUP" | "SDLK_PASTE" | "SDLK_PAUSE" | "SDLK_PERCENT" | "SDLK_PERIOD" | "SDLK_PLUS" | "SDLK_POWER" | "SDLK_PRINTSCREEN" | "SDLK_PRIOR" | "SDLK_QUESTION" | "SDLK_QUOTE" | "SDLK_QUOTEDBL" | "SDLK_RALT" | "SDLK_RCTRL" | "SDLK_RETURN" | "SDLK_RETURN2" | "SDLK_RGUI" | "SDLK_RIGHT" | "SDLK_RIGHTBRACKET" | "SDLK_RIGHTPAREN" | "SDLK_RSHIFT" | "SDLK_SCROLLLOCK" | "SDLK_SELECT" | "SDLK_SEMICOLON" | "SDLK_SEPARATOR" | "SDLK_SLASH" | "SDLK_SLEEP" | "SDLK_SOFTLEFT" | "SDLK_SOFTRIGHT" | "SDLK_SPACE" | "SDLK_STOP" | "SDLK_SYSREQ" | "SDLK_TAB" | "SDLK_THOUSANDSSEPARATOR" | "SDLK_UNDERSCORE" | "SDLK_UNDO" | "SDLK_UNKNOWN" | "SDLK_UP" | "SDLK_VOLUMEDOWN" | "SDLK_VOLUMEUP" | "SDLK_WWW" | "SDLK_a" | "SDLK_b" | "SDLK_c" | "SDLK_d" | "SDLK_e" | "SDLK_f" | "SDLK_g" | "SDLK_h" | "SDLK_i" | "SDLK_j" | "SDLK_k" | "SDLK_l" | "SDLK_m" | "SDLK_n" | "SDLK_o" | "SDLK_p" | "SDLK_q" | "SDLK_r" | "SDLK_s" | "SDLK_t" | "SDLK_u" | "SDLK_v" | "SDLK_w" | "SDLK_x" | "SDLK_y" | "SDLK_z";
    /** @yamlKey sdl_id */
    sdlId?: RefProp<__marker_sdl_Sdl>;
}
interface SeeedMr24hpc1Props {
    /**
     * If true target detect either still or in movement. All options from [Binary Sensor](https://esphome.io/components/bin...
     * @yamlKey has_target
     */
    hasTarget?: SeeedMr24hpc1HasTargetProps;
    /** @yamlKey mr24hpc1_id */
    mr24hpc1Id?: RefProp<__marker_seeed_mr24hpc1_MR24HPC1Component>;
}
interface SeeedMr60bha2Props {
    /**
     * If true when target (person) is detected. All options from [Binary Sensor](https://esphome.io/components/binary_senso...
     * @yamlKey has_target
     */
    hasTarget?: SeeedMr60bha2HasTargetProps;
    /** @yamlKey mr60bha2_id */
    mr60bha2Id?: RefProp<__marker_seeed_mr60bha2_MR60BHA2Component>;
}
interface SeeedMr60fda2Props {
    /**
     * An indication of whether the radar has detected a fall. All options from [Text Sensor](https://esphome.io/components/...
     * @yamlKey fall_detected
     */
    fallDetected?: SeeedMr60fda2FallDetectedProps;
    /** @yamlKey mr60fda2_id */
    mr60fda2Id?: RefProp<__marker_seeed_mr60fda2_MR60FDA2Component>;
    /**
     * If true when target (person) is detected. All options from [Binary Sensor](https://esphome.io/components/binary_senso...
     * @yamlKey people_exist
     */
    peopleExist?: SeeedMr60fda2PeopleExistProps;
}
interface Sim800lProps {
    /** Indicates if the SIM800L has successfully registered in the cellular network. */
    registered?: Sim800lRegisteredProps;
    /** @yamlKey sim800l_id */
    sim800lId?: RefProp<__marker_sim800l_Sim800LComponent>;
}
interface StatusProps extends _CoreComponent {
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The interval to check the connection status. Defaults to ...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
interface SwitchProps extends _CoreComponent {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The source switch to observe.
     * @yamlKey source_id
     */
    sourceId: RefProp<__marker_switch__Switch>;
}
interface Sx1509Props {
    /** int: The column number for this key on the keypad. */
    col: number;
    /** int: The row number for this key on the keypad. */
    row: number;
    /** @yamlKey sx1509_id */
    sx1509Id?: RefProp<__marker_sx1509_SX1509Component>;
}
interface Sy6970Props {
    /** @yamlKey charge_done */
    chargeDone?: Sy6970ChargeDoneProps;
    charging?: Sy6970ChargingProps;
    /** @yamlKey sy6970_id */
    sy6970Id?: RefProp<__marker_sy6970_SY6970Component>;
    /** @yamlKey vbus_connected */
    vbusConnected?: Sy6970VbusConnectedProps;
}
interface TemplateProps extends _CoreComponent {
    /** [Condition](https://esphome.io/automations/actions#all-conditions): The condition to check to determine the value of ... */
    condition?: unknown;
    lambda?: unknown;
}
interface Tm1637Props {
    /** integer: The keycode for the connected key (Seg0 = 0, Seg1 = 1 etc,). Range is from 0 to 15. */
    key: number;
    /** string: The name for the binary sensor. */
    name?: string;
    /**
     * :[ID](https://esphome.io/guides/configuration-types#id): The id of the tm1637 that should be used to scan the keys in...
     * @yamlKey tm1637_id
     */
    tm1637Id?: RefProp<__marker_tm1637_TM1637Display>;
}
interface Tm1638Props {
    key: number;
    /** @yamlKey tm1638_id */
    tm1638Id?: RefProp<__marker_tm1638_TM1638Component>;
}
interface TouchscreenProps extends _CoreComponent {
    /** @yamlKey page_id */
    pageId?: RefProp<__marker_display_DisplayPage>;
    pages?: Array<RefProp<__marker_display_DisplayPage>>;
    /** @yamlKey touchscreen_id */
    touchscreenId?: RefProp<__marker_touchscreen_Touchscreen>;
    /** @yamlKey use_raw */
    useRaw?: boolean;
    /** @yamlKey x_max */
    xMax: number;
    /** @yamlKey x_min */
    xMin: number;
    /** @yamlKey y_max */
    yMax: number;
    /** @yamlKey y_min */
    yMin: number;
}
interface Tt21100Props extends _CoreComponent {
    /** int: Internal index of the touch button, between 0 and 3. */
    index: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the touchscreen.
     * @yamlKey tt21100_id
     */
    tt21100Id?: RefProp<__marker_tt21100_TT21100Touchscreen>;
}
interface Ttp229BsfProps {
    channel: number;
    /** @yamlKey ttp229_id */
    ttp229Id?: RefProp<__marker_ttp229_bsf_TTP229BSFComponent>;
}
interface Ttp229LsfProps {
    channel: number;
    /** @yamlKey ttp229_id */
    ttp229Id?: RefProp<__marker_ttp229_lsf_TTP229LSFComponent>;
}
interface TuyaProps extends _CoreComponent {
    /** @yamlKey sensor_datapoint */
    sensorDatapoint: number;
    /** @yamlKey tuya_id */
    tuyaId?: RefProp<__marker_tuya_Tuya>;
}
interface VbusCustomProps extends _CoreComponent {
    /** @yamlKey binary_sensors */
    binarySensors?: Array<VbusCustomBinarySensorsProps>;
    command?: number;
    dest?: number;
    source?: number;
    /** @yamlKey vbus_id */
    vbusId?: RefProp<__marker_vbus_VBus>;
}
interface VbusDeltasolBs2009Props extends _CoreComponent {
    /** @yamlKey frost_protection_active */
    frostProtectionActive?: VbusDeltasolBs2009FrostProtectionActiveProps;
    /** @yamlKey sensor1_error */
    sensor1Error?: VbusDeltasolBs2009Sensor1ErrorProps;
    /** @yamlKey sensor2_error */
    sensor2Error?: VbusDeltasolBs2009Sensor2ErrorProps;
    /** @yamlKey sensor3_error */
    sensor3Error?: VbusDeltasolBs2009Sensor3ErrorProps;
    /** @yamlKey sensor4_error */
    sensor4Error?: VbusDeltasolBs2009Sensor4ErrorProps;
    /** @yamlKey vbus_id */
    vbusId?: RefProp<__marker_vbus_VBus>;
}
interface VbusDeltasolBsPlusProps extends _CoreComponent {
    /** @yamlKey collector_frost */
    collectorFrost?: VbusDeltasolBsPlusCollectorFrostProps;
    /** @yamlKey collector_max */
    collectorMax?: VbusDeltasolBsPlusCollectorMaxProps;
    /** @yamlKey collector_min */
    collectorMin?: VbusDeltasolBsPlusCollectorMinProps;
    hqm?: VbusDeltasolBsPlusHqmProps;
    recooling?: VbusDeltasolBsPlusRecoolingProps;
    relay1?: VbusDeltasolBsPlusRelay1Props;
    relay2?: VbusDeltasolBsPlusRelay2Props;
    /** @yamlKey sensor1_error */
    sensor1Error?: VbusDeltasolBsPlusSensor1ErrorProps;
    /** @yamlKey sensor2_error */
    sensor2Error?: VbusDeltasolBsPlusSensor2ErrorProps;
    /** @yamlKey sensor3_error */
    sensor3Error?: VbusDeltasolBsPlusSensor3ErrorProps;
    /** @yamlKey sensor4_error */
    sensor4Error?: VbusDeltasolBsPlusSensor4ErrorProps;
    /** @yamlKey tube_collector */
    tubeCollector?: VbusDeltasolBsPlusTubeCollectorProps;
    /** @yamlKey vbus_id */
    vbusId?: RefProp<__marker_vbus_VBus>;
}
interface VbusDeltasolBs2Props extends _CoreComponent {
    /** @yamlKey sensor1_error */
    sensor1Error?: VbusDeltasolBs2Sensor1ErrorProps;
    /** @yamlKey sensor2_error */
    sensor2Error?: VbusDeltasolBs2Sensor2ErrorProps;
    /** @yamlKey sensor3_error */
    sensor3Error?: VbusDeltasolBs2Sensor3ErrorProps;
    /** @yamlKey sensor4_error */
    sensor4Error?: VbusDeltasolBs2Sensor4ErrorProps;
    /** @yamlKey vbus_id */
    vbusId?: RefProp<__marker_vbus_VBus>;
}
interface VbusDeltasolCProps extends _CoreComponent {
    /** @yamlKey sensor1_error */
    sensor1Error?: VbusDeltasolCSensor1ErrorProps;
    /** @yamlKey sensor2_error */
    sensor2Error?: VbusDeltasolCSensor2ErrorProps;
    /** @yamlKey sensor3_error */
    sensor3Error?: VbusDeltasolCSensor3ErrorProps;
    /** @yamlKey sensor4_error */
    sensor4Error?: VbusDeltasolCSensor4ErrorProps;
    /** @yamlKey vbus_id */
    vbusId?: RefProp<__marker_vbus_VBus>;
}
interface VbusDeltasolCsPlusProps extends _CoreComponent {
    /** @yamlKey sensor1_error */
    sensor1Error?: VbusDeltasolCsPlusSensor1ErrorProps;
    /** @yamlKey sensor2_error */
    sensor2Error?: VbusDeltasolCsPlusSensor2ErrorProps;
    /** @yamlKey sensor3_error */
    sensor3Error?: VbusDeltasolCsPlusSensor3ErrorProps;
    /** @yamlKey sensor4_error */
    sensor4Error?: VbusDeltasolCsPlusSensor4ErrorProps;
    /** @yamlKey vbus_id */
    vbusId?: RefProp<__marker_vbus_VBus>;
}
interface VbusDeltasolCs2Props extends _CoreComponent {
    /** @yamlKey sensor1_error */
    sensor1Error?: VbusDeltasolCs2Sensor1ErrorProps;
    /** @yamlKey sensor2_error */
    sensor2Error?: VbusDeltasolCs2Sensor2ErrorProps;
    /** @yamlKey sensor3_error */
    sensor3Error?: VbusDeltasolCs2Sensor3ErrorProps;
    /** @yamlKey sensor4_error */
    sensor4Error?: VbusDeltasolCs2Sensor4ErrorProps;
    /** @yamlKey vbus_id */
    vbusId?: RefProp<__marker_vbus_VBus>;
}
interface VbusDeltasolCs4Props extends _CoreComponent {
    /** @yamlKey sensor1_error */
    sensor1Error?: VbusDeltasolCs4Sensor1ErrorProps;
    /** @yamlKey sensor2_error */
    sensor2Error?: VbusDeltasolCs4Sensor2ErrorProps;
    /** @yamlKey sensor3_error */
    sensor3Error?: VbusDeltasolCs4Sensor3ErrorProps;
    /** @yamlKey sensor4_error */
    sensor4Error?: VbusDeltasolCs4Sensor4ErrorProps;
    /** @yamlKey vbus_id */
    vbusId?: RefProp<__marker_vbus_VBus>;
}
interface WireguardProps {
    enabled?: WireguardEnabledProps;
    status?: WireguardStatusProps;
    /** @yamlKey wireguard_id */
    wireguardId?: RefProp<__marker_wireguard_Wireguard>;
}
interface XiaomiCgpr1Props extends _BthomeMithermometerBleDevice, _CoreComponent {
    /** @yamlKey battery_level */
    batteryLevel?: XiaomiCgpr1BatteryLevelProps;
    bindkey: unknown;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey idle_time */
    idleTime?: XiaomiCgpr1IdleTimeProps;
    illuminance?: XiaomiCgpr1IlluminanceProps;
    /** @yamlKey mac_address */
    macAddress: unknown;
}
interface XiaomiMjyd02ylaProps extends _BthomeMithermometerBleDevice, _CoreComponent {
    /** @yamlKey battery_level */
    batteryLevel?: XiaomiMjyd02ylaBatteryLevelProps;
    bindkey: unknown;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey idle_time */
    idleTime?: XiaomiMjyd02ylaIdleTimeProps;
    illuminance?: XiaomiMjyd02ylaIlluminanceProps;
    light?: XiaomiMjyd02ylaLightProps;
    /** @yamlKey mac_address */
    macAddress: unknown;
}
interface XiaomiMue4094rtProps extends _BthomeMithermometerBleDevice, _CoreComponent {
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey mac_address */
    macAddress: unknown;
    timeout?: TimePeriod;
}
interface XiaomiRtcgq02lmProps {
    button?: XiaomiRtcgq02lmButtonProps;
    id?: RefProp<__marker_xiaomi_rtcgq02lm_XiaomiRTCGQ02LM>;
    light?: XiaomiRtcgq02lmLightProps;
    motion?: XiaomiRtcgq02lmMotionProps;
}
interface XiaomiWx08zmProps extends _BthomeMithermometerBleDevice, _CoreComponent {
    /** @yamlKey battery_level */
    batteryLevel?: XiaomiWx08zmBatteryLevelProps;
    /** @yamlKey mac_address */
    macAddress: unknown;
    tablet?: XiaomiWx08zmTabletProps;
}
export type BinarySensorProps = (BinarySensorBaseProps & {
    platform: "analog_threshold";
} & AnalogThresholdProps & ComponentProps<__marker_analog_threshold_AnalogThresholdBinarySensor>) | (BinarySensorBaseProps & {
    platform: "apds9960";
} & Apds9960Props & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "as3935";
} & As3935Props & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "ble_presence";
} & BlePresenceProps & ComponentProps<__marker_ble_presence_BLEPresenceDevice>) | (BinarySensorBaseProps & {
    platform: "cap1188";
} & Cap1188Props & ComponentProps<__marker_cap1188_CAP1188Channel>) | (BinarySensorBaseProps & {
    platform: "copy";
} & CopyProps & ComponentProps<__marker_copy_CopyBinarySensor>) | (BinarySensorBaseProps & {
    platform: "cst226";
} & Cst226Props & ComponentProps<__marker_cst226_CST226Button>) | (BinarySensorBaseProps & {
    platform: "daly_bms";
} & DalyBmsProps & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "dfrobot_sen0395";
} & DfrobotSen0395Props & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "esp32_touch";
} & Esp32TouchProps & ComponentProps<__marker_esp32_touch_ESP32TouchBinarySensor>) | (BinarySensorBaseProps & {
    platform: "ezo_pmp";
} & EzoPmpProps & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "fingerprint_grow";
} & FingerprintGrowProps & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "gdk101";
} & Gdk101Props & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "gpio";
} & GpioProps & ComponentProps<__marker_gpio_GPIOBinarySensor>) | (BinarySensorBaseProps & {
    platform: "gt911";
} & Gt911Props & ComponentProps<__marker_gt911_GT911Button>) | (BinarySensorBaseProps & {
    platform: "haier";
} & HaierProps & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "hlk_fm22x";
} & HlkFm22xProps & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "homeassistant";
} & HomeassistantProps & ComponentProps<__marker_homeassistant_HomeassistantBinarySensor>) | (BinarySensorBaseProps & {
    platform: "hydreon_rgxx";
} & HydreonRgxxProps & ComponentProps<__marker_hydreon_rgxx_HydreonRGxxBinaryComponent>) | (BinarySensorBaseProps & {
    platform: "ld2410";
} & Ld2410Props & ComponentProps<__marker_EntityBase>) | (BinarySensorBaseProps & {
    platform: "ld2412";
} & Ld2412Props & ComponentProps<__marker_EntityBase>) | (BinarySensorBaseProps & {
    platform: "ld2420";
} & Ld2420Props & ComponentProps<__marker_ld2420_LD2420BinarySensor>) | (BinarySensorBaseProps & {
    platform: "ld2450";
} & Ld2450Props & ComponentProps<__marker_EntityBase>) | (BinarySensorBaseProps & {
    platform: "lvgl";
} & LvglProps & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "m5stack_8angle";
} & M5stack8angleProps & ComponentProps<__marker_m5stack_8angle_M5Stack8AngleSwitchBinarySensor>) | (BinarySensorBaseProps & {
    platform: "matrix_keypad";
} & MatrixKeypadProps & ComponentProps<__marker_matrix_keypad_MatrixKeypadBinarySensor>) | (BinarySensorBaseProps & {
    platform: "modbus_controller";
} & ModbusControllerProps & ComponentProps<__marker_modbus_controller_ModbusBinarySensor>) | (BinarySensorBaseProps & {
    platform: "mpr121";
} & Mpr121Props & ComponentProps<__marker_mpr121_MPR121BinarySensor>) | (BinarySensorBaseProps & {
    platform: "msa3xx";
} & Msa3xxProps & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "nextion";
} & NextionProps & ComponentProps<__marker_nextion_NextionBinarySensor>) | (BinarySensorBaseProps & {
    platform: "nfc";
} & NfcProps & ComponentProps<__marker_nfc_NfcTagBinarySensor>) | (BinarySensorBaseProps & {
    platform: "opentherm";
} & OpenthermProps & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "packet_transport";
    type: "data";
} & PacketTransportDataProps & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "packet_transport";
    type: "status";
} & PacketTransportStatusProps & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "pipsolar";
} & PipsolarProps & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "pn532";
} & Pn532Props & ComponentProps<__marker_pn532_PN532BinarySensor>) | (BinarySensorBaseProps & {
    platform: "qwiic_pir";
} & QwiicPirProps & ComponentProps<__marker_qwiic_pir_QwiicPIRComponent>) | (BinarySensorBaseProps & {
    platform: "rc522";
} & Rc522Props & ComponentProps<__marker_rc522_RC522BinarySensor>) | (BinarySensorBaseProps & {
    platform: "rc522_spi";
} & Rc522SpiProps & ComponentProps<__marker_rc522_RC522BinarySensor>) | (BinarySensorBaseProps & {
    platform: "rd03d";
} & Rd03dProps & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "rdm6300";
} & Rdm6300Props & ComponentProps<__marker_rdm6300_RDM6300BinarySensor>) | (BinarySensorBaseProps & {
    platform: "remote_receiver";
} & RemoteReceiverProps & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "sdl";
} & SdlProps & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "seeed_mr24hpc1";
} & SeeedMr24hpc1Props & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "seeed_mr60bha2";
} & SeeedMr60bha2Props & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "seeed_mr60fda2";
} & SeeedMr60fda2Props & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "sim800l";
} & Sim800lProps & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "status";
} & StatusProps & ComponentProps<__marker_status_StatusBinarySensor>) | (BinarySensorBaseProps & {
    platform: "switch";
} & SwitchProps & ComponentProps<__marker_switch__SwitchBinarySensor>) | (BinarySensorBaseProps & {
    platform: "sx1509";
} & Sx1509Props & ComponentProps<__marker_sx1509_SX1509BinarySensor>) | (BinarySensorBaseProps & {
    platform: "sy6970";
} & Sy6970Props & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "template";
} & TemplateProps & ComponentProps<__marker_template__TemplateBinarySensor>) | (BinarySensorBaseProps & {
    platform: "tm1637";
} & Tm1637Props & ComponentProps<__marker_tm1637_TM1637Key>) | (BinarySensorBaseProps & {
    platform: "tm1638";
} & Tm1638Props & ComponentProps<__marker_tm1638_TM1638Key>) | (BinarySensorBaseProps & {
    platform: "touchscreen";
} & TouchscreenProps & ComponentProps<__marker_touchscreen_TouchscreenBinarySensor>) | (BinarySensorBaseProps & {
    platform: "tt21100";
} & Tt21100Props & ComponentProps<__marker_tt21100_TT21100Button>) | (BinarySensorBaseProps & {
    platform: "ttp229_bsf";
} & Ttp229BsfProps & ComponentProps<__marker_ttp229_bsf_TTP229BSFChannel>) | (BinarySensorBaseProps & {
    platform: "ttp229_lsf";
} & Ttp229LsfProps & ComponentProps<__marker_ttp229_lsf_TTP229Channel>) | (BinarySensorBaseProps & {
    platform: "tuya";
} & TuyaProps & ComponentProps<__marker_tuya_TuyaBinarySensor>) | (BinarySensorBaseProps & {
    platform: "vbus";
    model: "custom";
} & VbusCustomProps & ComponentProps<__marker_vbus_VBusCustomBSensor>) | (BinarySensorBaseProps & {
    platform: "vbus";
    model: "deltasol_bs_2009";
} & VbusDeltasolBs2009Props & ComponentProps<__marker_vbus_DeltaSolBS2009BSensor>) | (BinarySensorBaseProps & {
    platform: "vbus";
    model: "deltasol_bs_plus";
} & VbusDeltasolBsPlusProps & ComponentProps<__marker_vbus_DeltaSolBSPlusBSensor>) | (BinarySensorBaseProps & {
    platform: "vbus";
    model: "deltasol_bs2";
} & VbusDeltasolBs2Props & ComponentProps<__marker_vbus_DeltaSolBS2BSensor>) | (BinarySensorBaseProps & {
    platform: "vbus";
    model: "deltasol_c";
} & VbusDeltasolCProps & ComponentProps<__marker_vbus_DeltaSolCBSensor>) | (BinarySensorBaseProps & {
    platform: "vbus";
    model: "deltasol_cs_plus";
} & VbusDeltasolCsPlusProps & ComponentProps<__marker_vbus_DeltaSolCSPlusBSensor>) | (BinarySensorBaseProps & {
    platform: "vbus";
    model: "deltasol_cs2";
} & VbusDeltasolCs2Props & ComponentProps<__marker_vbus_DeltaSolCS2BSensor>) | (BinarySensorBaseProps & {
    platform: "vbus";
    model: "deltasol_cs4";
} & VbusDeltasolCs4Props & ComponentProps<__marker_vbus_DeltaSolCS4BSensor>) | (BinarySensorBaseProps & {
    platform: "wireguard";
} & WireguardProps & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "xiaomi_cgpr1";
} & XiaomiCgpr1Props & ComponentProps<__marker_xiaomi_cgpr1_XiaomiCGPR1>) | (BinarySensorBaseProps & {
    platform: "xiaomi_mjyd02yla";
} & XiaomiMjyd02ylaProps & ComponentProps<__marker_xiaomi_mjyd02yla_XiaomiMJYD02YLA>) | (BinarySensorBaseProps & {
    platform: "xiaomi_mue4094rt";
} & XiaomiMue4094rtProps & ComponentProps<__marker_xiaomi_mue4094rt_XiaomiMUE4094RT>) | (BinarySensorBaseProps & {
    platform: "xiaomi_rtcgq02lm";
} & XiaomiRtcgq02lmProps & ComponentProps<__marker_binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "xiaomi_wx08zm";
} & XiaomiWx08zmProps & ComponentProps<__marker_xiaomi_wx08zm_XiaomiWX08ZM>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            binary_sensor: BinarySensorProps;
        }
    }
}
