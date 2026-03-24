// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _BthomeMithermometerBleDevice, _CoreComponent, _CoreEntityBase, _CoreMqttComponent, _HomeassistantHomeAssistantImport, _ModbusControllerModbusitembaseschema, _Msa3xxMsaSensor, _NextionBinarySensorConfigBinarySensor, _PacketTransportBinarySensorStatusSensor, _PipsolarComponent, _Touchscreen } from "../bases";
import type { EntityBase, analog_threshold_AnalogThresholdBinarySensor, apds9960_APDS9960, as3935_AS3935Component, binary_sensor_BinarySensor, ble_presence_BLEPresenceDevice, cap1188_CAP1188Channel, cap1188_CAP1188Component, copy_CopyBinarySensor, cst226_CST226Button, cst226_CST226Touchscreen, cst816_CST816Touchscreen, daly_bms_DalyBmsComponent, dfrobot_sen0395_DfrobotSen0395Component, display_DisplayPage, esp32_ble_tracker_ESP32BLETracker, esp32_touch_ESP32TouchBinarySensor, esp32_touch_ESP32TouchComponent, ezo_pmp_EzoPMP, fingerprint_grow_FingerprintGrowComponent, gdk101_GDK101Component, gpio_GPIOBinarySensor, gt911_GT911Button, gt911_GT911Touchscreen, haier_HonClimate, hlk_fm22x_HlkFm22xComponent, homeassistant_HomeassistantBinarySensor, hydreon_rgxx_HydreonRGxxBinaryComponent, hydreon_rgxx_HydreonRGxxComponent, i2c_I2CBus, ld2410_LD2410Component, ld2412_LD2412Component, ld2420_LD2420BinarySensor, ld2420_LD2420Component, ld2450_LD2450Component, lvgl_LvPseudoButton, m5stack_8angle_M5Stack8AngleComponent, m5stack_8angle_M5Stack8AngleSwitchBinarySensor, matrix_keypad_MatrixKeypad, matrix_keypad_MatrixKeypadBinarySensor, modbus_controller_ModbusBinarySensor, mpr121_MPR121BinarySensor, mpr121_MPR121Component, nextion_NextionBinarySensor, nfc_NfcTagBinarySensor, nfc_Nfcc, opentherm_OpenthermHub, packet_transport_PacketTransport, pn532_PN532, pn532_PN532BinarySensor, qwiic_pir_QwiicPIRComponent, rc522_RC522, rc522_RC522BinarySensor, rd03d_RD03DComponent, rdm6300_RDM6300BinarySensor, rdm6300_RDM6300Component, remote_base_RemoteReceiverBase, sdl_Sdl, seeed_mr24hpc1_MR24HPC1Component, seeed_mr60bha2_MR60BHA2Component, seeed_mr60fda2_MR60FDA2Component, sensor_Sensor, sim800l_Sim800LComponent, status_StatusBinarySensor, switch__Switch, switch__SwitchBinarySensor, sx1509_SX1509BinarySensor, sx1509_SX1509Component, sy6970_SY6970Component, template__TemplateBinarySensor, tm1637_TM1637Display, tm1637_TM1637Key, tm1638_TM1638Component, tm1638_TM1638Key, touchscreen_Touchscreen, touchscreen_TouchscreenBinarySensor, tt21100_TT21100Button, tt21100_TT21100Touchscreen, ttp229_bsf_TTP229BSFChannel, ttp229_bsf_TTP229BSFComponent, ttp229_lsf_TTP229Channel, ttp229_lsf_TTP229LSFComponent, tuya_Tuya, tuya_TuyaBinarySensor, udp_UDPComponent, vbus_DeltaSolBS2009BSensor, vbus_DeltaSolBS2BSensor, vbus_DeltaSolBSPlusBSensor, vbus_DeltaSolCBSensor, vbus_DeltaSolCS2BSensor, vbus_DeltaSolCSPlusBSensor, vbus_VBus, vbus_VBusCustomBSensor, web_server_WebServer, wireguard_Wireguard, xiaomi_cgpr1_XiaomiCGPR1, xiaomi_mjyd02yla_XiaomiMJYD02YLA, xiaomi_mue4094rt_XiaomiMUE4094RT, xiaomi_rtcgq02lm_XiaomiRTCGQ02LM, xiaomi_wx08zm_XiaomiWX08ZM, zigbee_ZigbeeComponent } from "../markers";
interface BinarySensorWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface AnalogThresholdThresholdProps {
    /** float: Upper threshold, that needs to be crossed to transition from `low` to `high` states. */
    upper: unknown;
    /** float: Lower threshold, that needs to be crossed to transition from `high` to `low` states. */
    lower: unknown;
}
interface BlePresenceTimeoutProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface HaierOutdoorFanStatusPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface HaierOutdoorFanStatusPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface HaierOutdoorFanStatusProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: HaierOutdoorFanStatusPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: HaierOutdoorFanStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface HaierDefrostStatusPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface HaierDefrostStatusPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface HaierDefrostStatusProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: HaierDefrostStatusPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: HaierDefrostStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface HaierCompressorStatusPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface HaierCompressorStatusPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface HaierCompressorStatusProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: HaierCompressorStatusPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: HaierCompressorStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface HaierIndoorFanStatusPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface HaierIndoorFanStatusPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface HaierIndoorFanStatusProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: HaierIndoorFanStatusPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: HaierIndoorFanStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface HaierFourWayValveStatusPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface HaierFourWayValveStatusPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface HaierFourWayValveStatusProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: HaierFourWayValveStatusPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: HaierFourWayValveStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface HaierIndoorElectricHeatingStatusPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface HaierIndoorElectricHeatingStatusPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface HaierIndoorElectricHeatingStatusProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: HaierIndoorElectricHeatingStatusPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: HaierIndoorElectricHeatingStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface HydreonRgxxTooColdPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface HydreonRgxxTooColdPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface HydreonRgxxTooColdProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: HydreonRgxxTooColdPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: HydreonRgxxTooColdPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface HydreonRgxxLensBadPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface HydreonRgxxLensBadPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface HydreonRgxxLensBadProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: HydreonRgxxLensBadPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: HydreonRgxxLensBadPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface HydreonRgxxEmSatPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface HydreonRgxxEmSatPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface HydreonRgxxEmSatProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: HydreonRgxxEmSatPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: HydreonRgxxEmSatPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface QwiicPirDebounceProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface XiaomiCgpr1BatteryLevelPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface XiaomiCgpr1BatteryLevelPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface XiaomiCgpr1BatteryLevelPropsExpireAfterProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface XiaomiCgpr1BatteryLevelProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: XiaomiCgpr1BatteryLevelPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: XiaomiCgpr1BatteryLevelPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: unknown;
    /** @yamlKey accuracy_decimals */
    accuracyDecimals?: unknown;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey state_class */
    stateClass?: "" | "measurement" | "total_increasing" | "total" | "measurement_angle";
    /** @yamlKey force_update */
    forceUpdate?: boolean;
    /** @yamlKey expire_after */
    expireAfter?: XiaomiCgpr1BatteryLevelPropsExpireAfterProps;
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: () => void;
    /** @yamlKey on_raw_value */
    onRawValue?: () => void;
    /** @yamlKey on_value_range */
    onValueRange?: () => void;
}
interface XiaomiCgpr1IdleTimePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface XiaomiCgpr1IdleTimePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface XiaomiCgpr1IdleTimePropsExpireAfterProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface XiaomiCgpr1IdleTimeProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: XiaomiCgpr1IdleTimePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: XiaomiCgpr1IdleTimePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: unknown;
    /** @yamlKey accuracy_decimals */
    accuracyDecimals?: unknown;
    /** @yamlKey device_class */
    deviceClass?: "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
    /** @yamlKey state_class */
    stateClass?: "" | "measurement" | "total_increasing" | "total" | "measurement_angle";
    /** @yamlKey force_update */
    forceUpdate?: boolean;
    /** @yamlKey expire_after */
    expireAfter?: XiaomiCgpr1IdleTimePropsExpireAfterProps;
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: () => void;
    /** @yamlKey on_raw_value */
    onRawValue?: () => void;
    /** @yamlKey on_value_range */
    onValueRange?: () => void;
}
interface XiaomiCgpr1IlluminancePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface XiaomiCgpr1IlluminancePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface XiaomiCgpr1IlluminancePropsExpireAfterProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface XiaomiCgpr1IlluminanceProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: XiaomiCgpr1IlluminancePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: XiaomiCgpr1IlluminancePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: unknown;
    /** @yamlKey accuracy_decimals */
    accuracyDecimals?: unknown;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey state_class */
    stateClass?: "" | "measurement" | "total_increasing" | "total" | "measurement_angle";
    /** @yamlKey force_update */
    forceUpdate?: boolean;
    /** @yamlKey expire_after */
    expireAfter?: XiaomiCgpr1IlluminancePropsExpireAfterProps;
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: () => void;
    /** @yamlKey on_raw_value */
    onRawValue?: () => void;
    /** @yamlKey on_value_range */
    onValueRange?: () => void;
}
interface XiaomiMjyd02ylaIdleTimePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface XiaomiMjyd02ylaIdleTimePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface XiaomiMjyd02ylaIdleTimePropsExpireAfterProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface XiaomiMjyd02ylaIdleTimeProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: XiaomiMjyd02ylaIdleTimePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: XiaomiMjyd02ylaIdleTimePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: unknown;
    /** @yamlKey accuracy_decimals */
    accuracyDecimals?: unknown;
    /** @yamlKey device_class */
    deviceClass?: "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
    /** @yamlKey state_class */
    stateClass?: "" | "measurement" | "total_increasing" | "total" | "measurement_angle";
    /** @yamlKey force_update */
    forceUpdate?: boolean;
    /** @yamlKey expire_after */
    expireAfter?: XiaomiMjyd02ylaIdleTimePropsExpireAfterProps;
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: () => void;
    /** @yamlKey on_raw_value */
    onRawValue?: () => void;
    /** @yamlKey on_value_range */
    onValueRange?: () => void;
}
interface XiaomiMjyd02ylaBatteryLevelPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface XiaomiMjyd02ylaBatteryLevelPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface XiaomiMjyd02ylaBatteryLevelPropsExpireAfterProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface XiaomiMjyd02ylaBatteryLevelProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: XiaomiMjyd02ylaBatteryLevelPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: XiaomiMjyd02ylaBatteryLevelPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: unknown;
    /** @yamlKey accuracy_decimals */
    accuracyDecimals?: unknown;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey state_class */
    stateClass?: unknown;
    /** @yamlKey force_update */
    forceUpdate?: boolean;
    /** @yamlKey expire_after */
    expireAfter?: XiaomiMjyd02ylaBatteryLevelPropsExpireAfterProps;
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: () => void;
    /** @yamlKey on_raw_value */
    onRawValue?: () => void;
    /** @yamlKey on_value_range */
    onValueRange?: () => void;
}
interface XiaomiMjyd02ylaIlluminancePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface XiaomiMjyd02ylaIlluminancePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface XiaomiMjyd02ylaIlluminancePropsExpireAfterProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface XiaomiMjyd02ylaIlluminanceProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: XiaomiMjyd02ylaIlluminancePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: XiaomiMjyd02ylaIlluminancePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: unknown;
    /** @yamlKey accuracy_decimals */
    accuracyDecimals?: unknown;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey state_class */
    stateClass?: unknown;
    /** @yamlKey force_update */
    forceUpdate?: boolean;
    /** @yamlKey expire_after */
    expireAfter?: XiaomiMjyd02ylaIlluminancePropsExpireAfterProps;
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: () => void;
    /** @yamlKey on_raw_value */
    onRawValue?: () => void;
    /** @yamlKey on_value_range */
    onValueRange?: () => void;
}
interface XiaomiMjyd02ylaLightPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface XiaomiMjyd02ylaLightPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface XiaomiMjyd02ylaLightProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: XiaomiMjyd02ylaLightPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: XiaomiMjyd02ylaLightPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface XiaomiMue4094rtTimeoutProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface XiaomiWx08zmTabletPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface XiaomiWx08zmTabletPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface XiaomiWx08zmTabletPropsExpireAfterProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface XiaomiWx08zmTabletProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: XiaomiWx08zmTabletPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: XiaomiWx08zmTabletPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: unknown;
    /** @yamlKey accuracy_decimals */
    accuracyDecimals?: unknown;
    /** @yamlKey device_class */
    deviceClass?: "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
    /** @yamlKey state_class */
    stateClass?: unknown;
    /** @yamlKey force_update */
    forceUpdate?: boolean;
    /** @yamlKey expire_after */
    expireAfter?: XiaomiWx08zmTabletPropsExpireAfterProps;
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: () => void;
    /** @yamlKey on_raw_value */
    onRawValue?: () => void;
    /** @yamlKey on_value_range */
    onValueRange?: () => void;
}
interface XiaomiWx08zmBatteryLevelPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface XiaomiWx08zmBatteryLevelPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface XiaomiWx08zmBatteryLevelPropsExpireAfterProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface XiaomiWx08zmBatteryLevelProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: XiaomiWx08zmBatteryLevelPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: XiaomiWx08zmBatteryLevelPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: unknown;
    /** @yamlKey accuracy_decimals */
    accuracyDecimals?: unknown;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey state_class */
    stateClass?: unknown;
    /** @yamlKey force_update */
    forceUpdate?: boolean;
    /** @yamlKey expire_after */
    expireAfter?: XiaomiWx08zmBatteryLevelPropsExpireAfterProps;
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: () => void;
    /** @yamlKey on_raw_value */
    onRawValue?: () => void;
    /** @yamlKey on_value_range */
    onValueRange?: () => void;
}
interface DalyBmsChargingMosEnabledPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DalyBmsChargingMosEnabledPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DalyBmsChargingMosEnabledProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: DalyBmsChargingMosEnabledPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DalyBmsChargingMosEnabledPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface DalyBmsDischargingMosEnabledPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface DalyBmsDischargingMosEnabledPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface DalyBmsDischargingMosEnabledProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: DalyBmsDischargingMosEnabledPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: DalyBmsDischargingMosEnabledPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface EzoPmpPumpStatePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface EzoPmpPumpStatePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface EzoPmpPumpStateProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: EzoPmpPumpStatePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: EzoPmpPumpStatePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface EzoPmpIsPausedPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface EzoPmpIsPausedPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface EzoPmpIsPausedProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: EzoPmpIsPausedPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: EzoPmpIsPausedPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface Gdk101VibrationsPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Gdk101VibrationsPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Gdk101VibrationsProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Gdk101VibrationsPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Gdk101VibrationsPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface Ld2410HasTargetPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2410HasTargetPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2410HasTargetProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2410HasTargetPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Ld2410HasTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: unknown;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface Ld2410HasMovingTargetPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2410HasMovingTargetPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2410HasMovingTargetProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2410HasMovingTargetPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Ld2410HasMovingTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: unknown;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface Ld2410HasStillTargetPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2410HasStillTargetPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2410HasStillTargetProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2410HasStillTargetPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Ld2410HasStillTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: unknown;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface Ld2410OutPinPresenceStatusPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2410OutPinPresenceStatusPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2410OutPinPresenceStatusProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2410OutPinPresenceStatusPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Ld2410OutPinPresenceStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: unknown;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface Ld2412DynamicBackgroundCorrectionStatusPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2412DynamicBackgroundCorrectionStatusPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2412DynamicBackgroundCorrectionStatusProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2412DynamicBackgroundCorrectionStatusPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Ld2412DynamicBackgroundCorrectionStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface Ld2412HasTargetPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2412HasTargetPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2412HasTargetProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2412HasTargetPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Ld2412HasTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: unknown;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface Ld2412HasMovingTargetPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2412HasMovingTargetPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2412HasMovingTargetProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2412HasMovingTargetPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Ld2412HasMovingTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: unknown;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface Ld2412HasStillTargetPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2412HasStillTargetPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2412HasStillTargetProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2412HasStillTargetPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Ld2412HasStillTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: unknown;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface Ld2420HasTargetPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2420HasTargetPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2420HasTargetProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2420HasTargetPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Ld2420HasTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface Ld2450HasTargetPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2450HasTargetPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2450HasTargetProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2450HasTargetPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Ld2450HasTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: unknown;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface Ld2450HasMovingTargetPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2450HasMovingTargetPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2450HasMovingTargetProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2450HasMovingTargetPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Ld2450HasMovingTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: unknown;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface Ld2450HasStillTargetPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Ld2450HasStillTargetPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Ld2450HasStillTargetProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Ld2450HasStillTargetPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Ld2450HasStillTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: unknown;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface Msa3xxTapPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Msa3xxTapPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Msa3xxTapProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Msa3xxTapPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Msa3xxTapPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface Msa3xxDoubleTapPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Msa3xxDoubleTapPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Msa3xxDoubleTapProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Msa3xxDoubleTapPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Msa3xxDoubleTapPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface Msa3xxActivePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Msa3xxActivePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Msa3xxActiveProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Msa3xxActivePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Msa3xxActivePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermFaultIndicationPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermFaultIndicationPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermFaultIndicationProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermFaultIndicationPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermFaultIndicationPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermChActivePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermChActivePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermChActiveProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermChActivePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermChActivePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermDhwActivePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermDhwActivePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermDhwActiveProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermDhwActivePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermDhwActivePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermFlameOnPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermFlameOnPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermFlameOnProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermFlameOnPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermFlameOnPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermCoolingActivePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermCoolingActivePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermCoolingActiveProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermCoolingActivePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermCoolingActivePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermCh2ActivePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermCh2ActivePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermCh2ActiveProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermCh2ActivePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermCh2ActivePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermDiagnosticIndicationPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermDiagnosticIndicationPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermDiagnosticIndicationProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermDiagnosticIndicationPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermDiagnosticIndicationPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermElectricityProductionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermElectricityProductionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermElectricityProductionProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermElectricityProductionPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermElectricityProductionPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermDhwPresentPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermDhwPresentPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermDhwPresentProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermDhwPresentPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermDhwPresentPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermControlTypeOnOffPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermControlTypeOnOffPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermControlTypeOnOffProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermControlTypeOnOffPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermControlTypeOnOffPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermCoolingSupportedPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermCoolingSupportedPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermCoolingSupportedProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermCoolingSupportedPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermCoolingSupportedPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermDhwStorageTankPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermDhwStorageTankPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermDhwStorageTankProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermDhwStorageTankPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermDhwStorageTankPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermControllerPumpControlAllowedPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermControllerPumpControlAllowedPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermControllerPumpControlAllowedProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermControllerPumpControlAllowedPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermControllerPumpControlAllowedPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermCh2PresentPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermCh2PresentPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermCh2PresentProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermCh2PresentPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermCh2PresentPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermWaterFillingPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermWaterFillingPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermWaterFillingProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermWaterFillingPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermWaterFillingPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermHeatModePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermHeatModePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermHeatModeProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermHeatModePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermHeatModePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermDhwSetpointTransferEnabledPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermDhwSetpointTransferEnabledPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermDhwSetpointTransferEnabledProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermDhwSetpointTransferEnabledPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermDhwSetpointTransferEnabledPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermMaxChSetpointTransferEnabledPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermMaxChSetpointTransferEnabledPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermMaxChSetpointTransferEnabledProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermMaxChSetpointTransferEnabledPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermMaxChSetpointTransferEnabledPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermDhwSetpointRwPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermDhwSetpointRwPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermDhwSetpointRwProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermDhwSetpointRwPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermDhwSetpointRwPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermMaxChSetpointRwPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermMaxChSetpointRwPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermMaxChSetpointRwProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermMaxChSetpointRwPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermMaxChSetpointRwPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermServiceRequestPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermServiceRequestPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermServiceRequestProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermServiceRequestPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermServiceRequestPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermLockoutResetPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermLockoutResetPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermLockoutResetProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermLockoutResetPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermLockoutResetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermLowWaterPressurePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermLowWaterPressurePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermLowWaterPressureProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermLowWaterPressurePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermLowWaterPressurePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermFlameFaultPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermFlameFaultPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermFlameFaultProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermFlameFaultPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermFlameFaultPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermAirPressureFaultPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermAirPressureFaultPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermAirPressureFaultProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermAirPressureFaultPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermAirPressureFaultPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface OpenthermWaterOverTempPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface OpenthermWaterOverTempPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface OpenthermWaterOverTempProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: OpenthermWaterOverTempPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: OpenthermWaterOverTempPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarAddSbuPriorityVersionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarAddSbuPriorityVersionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarAddSbuPriorityVersionProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarAddSbuPriorityVersionPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarAddSbuPriorityVersionPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarConfigurationStatusPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarConfigurationStatusPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarConfigurationStatusProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarConfigurationStatusPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarConfigurationStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarSccFirmwareVersionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarSccFirmwareVersionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarSccFirmwareVersionProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarSccFirmwareVersionPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarSccFirmwareVersionPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarLoadStatusPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarLoadStatusPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarLoadStatusProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarLoadStatusPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarLoadStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarBatteryVoltageToSteadyWhileChargingPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarBatteryVoltageToSteadyWhileChargingPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarBatteryVoltageToSteadyWhileChargingProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarBatteryVoltageToSteadyWhileChargingPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarBatteryVoltageToSteadyWhileChargingPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarChargingStatusPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarChargingStatusPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarChargingStatusProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarChargingStatusPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarChargingStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarSccChargingStatusPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarSccChargingStatusPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarSccChargingStatusProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarSccChargingStatusPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarSccChargingStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarAcChargingStatusPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarAcChargingStatusPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarAcChargingStatusProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarAcChargingStatusPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarAcChargingStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarChargingToFloatingModePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarChargingToFloatingModePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarChargingToFloatingModeProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarChargingToFloatingModePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarChargingToFloatingModePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarSwitchOnPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarSwitchOnPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarSwitchOnProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarSwitchOnPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarSwitchOnPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarDustproofInstalledPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarDustproofInstalledPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarDustproofInstalledProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarDustproofInstalledPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarDustproofInstalledPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarSilenceBuzzerOpenBuzzerPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarSilenceBuzzerOpenBuzzerPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarSilenceBuzzerOpenBuzzerProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarSilenceBuzzerOpenBuzzerPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarSilenceBuzzerOpenBuzzerPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarOverloadBypassFunctionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarOverloadBypassFunctionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarOverloadBypassFunctionProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarOverloadBypassFunctionPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarOverloadBypassFunctionPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarLcdEscapeToDefaultPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarLcdEscapeToDefaultPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarLcdEscapeToDefaultProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarLcdEscapeToDefaultPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarLcdEscapeToDefaultPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarOverloadRestartFunctionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarOverloadRestartFunctionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarOverloadRestartFunctionProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarOverloadRestartFunctionPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarOverloadRestartFunctionPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarOverTemperatureRestartFunctionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarOverTemperatureRestartFunctionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarOverTemperatureRestartFunctionProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarOverTemperatureRestartFunctionPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarOverTemperatureRestartFunctionPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarBacklightOnPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarBacklightOnPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarBacklightOnProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarBacklightOnPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarBacklightOnPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarAlarmOnWhenPrimarySourceInterruptPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarAlarmOnWhenPrimarySourceInterruptPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarAlarmOnWhenPrimarySourceInterruptProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarAlarmOnWhenPrimarySourceInterruptPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarAlarmOnWhenPrimarySourceInterruptPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarFaultCodeRecordPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarFaultCodeRecordPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarFaultCodeRecordProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarFaultCodeRecordPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultCodeRecordPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarPowerSavingPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarPowerSavingPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarPowerSavingProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarPowerSavingPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarPowerSavingPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarWarningsPresentPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarWarningsPresentPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarWarningsPresentProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarWarningsPresentPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningsPresentPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarFaultsPresentPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarFaultsPresentPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarFaultsPresentProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarFaultsPresentPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultsPresentPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarWarningPowerLossPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarWarningPowerLossPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarWarningPowerLossProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarWarningPowerLossPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningPowerLossPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarFaultInverterFaultPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarFaultInverterFaultPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarFaultInverterFaultProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarFaultInverterFaultPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultInverterFaultPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarFaultBusOverPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarFaultBusOverPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarFaultBusOverProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarFaultBusOverPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultBusOverPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarFaultBusUnderPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarFaultBusUnderPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarFaultBusUnderProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarFaultBusUnderPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultBusUnderPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarFaultBusSoftFailPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarFaultBusSoftFailPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarFaultBusSoftFailProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarFaultBusSoftFailPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultBusSoftFailPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarWarningLineFailPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarWarningLineFailPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarWarningLineFailProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarWarningLineFailPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningLineFailPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarFaultOpvshortPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarFaultOpvshortPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarFaultOpvshortProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarFaultOpvshortPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultOpvshortPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarFaultInverterVoltageTooLowPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarFaultInverterVoltageTooLowPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarFaultInverterVoltageTooLowProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarFaultInverterVoltageTooLowPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultInverterVoltageTooLowPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarFaultInverterVoltageTooHighPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarFaultInverterVoltageTooHighPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarFaultInverterVoltageTooHighProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarFaultInverterVoltageTooHighPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultInverterVoltageTooHighPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarWarningOverTemperaturePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarWarningOverTemperaturePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarWarningOverTemperatureProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarWarningOverTemperaturePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningOverTemperaturePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarWarningFanLockPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarWarningFanLockPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarWarningFanLockProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarWarningFanLockPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningFanLockPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarWarningBatteryVoltageHighPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarWarningBatteryVoltageHighPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarWarningBatteryVoltageHighProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarWarningBatteryVoltageHighPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningBatteryVoltageHighPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarWarningBatteryLowAlarmPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarWarningBatteryLowAlarmPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarWarningBatteryLowAlarmProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarWarningBatteryLowAlarmPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningBatteryLowAlarmPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarWarningBatteryUnderShutdownPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarWarningBatteryUnderShutdownPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarWarningBatteryUnderShutdownProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarWarningBatteryUnderShutdownPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningBatteryUnderShutdownPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarWarningBatteryDeratingPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarWarningBatteryDeratingPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarWarningBatteryDeratingProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarWarningBatteryDeratingPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningBatteryDeratingPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarWarningOverLoadPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarWarningOverLoadPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarWarningOverLoadProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarWarningOverLoadPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningOverLoadPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarWarningEepromFailedPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarWarningEepromFailedPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarWarningEepromFailedProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarWarningEepromFailedPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningEepromFailedPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarFaultInverterOverCurrentPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarFaultInverterOverCurrentPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarFaultInverterOverCurrentProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarFaultInverterOverCurrentPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultInverterOverCurrentPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarFaultInverterSoftFailedPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarFaultInverterSoftFailedPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarFaultInverterSoftFailedProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarFaultInverterSoftFailedPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultInverterSoftFailedPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarFaultSelfTestFailedPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarFaultSelfTestFailedPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarFaultSelfTestFailedProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarFaultSelfTestFailedPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultSelfTestFailedPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarFaultOpDcVoltageOverPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarFaultOpDcVoltageOverPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarFaultOpDcVoltageOverProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarFaultOpDcVoltageOverPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultOpDcVoltageOverPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarFaultBatteryOpenPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarFaultBatteryOpenPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarFaultBatteryOpenProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarFaultBatteryOpenPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultBatteryOpenPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarFaultCurrentSensorFailedPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarFaultCurrentSensorFailedPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarFaultCurrentSensorFailedProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarFaultCurrentSensorFailedPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultCurrentSensorFailedPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarFaultBatteryShortPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarFaultBatteryShortPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarFaultBatteryShortProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarFaultBatteryShortPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultBatteryShortPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarWarningPowerLimitPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarWarningPowerLimitPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarWarningPowerLimitProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarWarningPowerLimitPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningPowerLimitPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarWarningPvVoltageHighPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarWarningPvVoltageHighPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarWarningPvVoltageHighProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarWarningPvVoltageHighPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningPvVoltageHighPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarFaultMpptOverloadPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarFaultMpptOverloadPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarFaultMpptOverloadProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarFaultMpptOverloadPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultMpptOverloadPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarWarningMpptOverloadPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarWarningMpptOverloadPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarWarningMpptOverloadProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarWarningMpptOverloadPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningMpptOverloadPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarWarningBatteryTooLowToChargePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarWarningBatteryTooLowToChargePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarWarningBatteryTooLowToChargeProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarWarningBatteryTooLowToChargePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningBatteryTooLowToChargePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarFaultDcDcOverCurrentPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarFaultDcDcOverCurrentPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarFaultDcDcOverCurrentProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarFaultDcDcOverCurrentPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultDcDcOverCurrentPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarFaultCodePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarFaultCodePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarFaultCodeProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarFaultCodePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarFaultCodePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarWarningLowPvEnergyPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarWarningLowPvEnergyPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarWarningLowPvEnergyProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarWarningLowPvEnergyPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningLowPvEnergyPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarWarningHighAcInputDuringBusSoftStartPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarWarningHighAcInputDuringBusSoftStartPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarWarningHighAcInputDuringBusSoftStartProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarWarningHighAcInputDuringBusSoftStartPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningHighAcInputDuringBusSoftStartPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface PipsolarWarningBatteryEqualizationPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface PipsolarWarningBatteryEqualizationPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface PipsolarWarningBatteryEqualizationProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: PipsolarWarningBatteryEqualizationPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: PipsolarWarningBatteryEqualizationPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface Rd03dTargetPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Rd03dTargetPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Rd03dTargetProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Rd03dTargetPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Rd03dTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface Rd03dTarget1PropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Rd03dTarget1PropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Rd03dTarget1Props {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Rd03dTarget1PropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Rd03dTarget1PropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface Rd03dTarget2PropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Rd03dTarget2PropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Rd03dTarget2Props {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Rd03dTarget2PropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Rd03dTarget2PropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface Rd03dTarget3PropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Rd03dTarget3PropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Rd03dTarget3Props {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Rd03dTarget3PropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Rd03dTarget3PropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface RemoteReceiverBeo4Props {
    /** int: The 8-bit source to trigger on, e.g. 0x00=video, 0x01=audio,..., see dumper output for more info. */
    source: unknown;
    /** int: The 8-bit command to listen for, e.g. 0x00=number0, 0x0C=standby,..., see dumper output for more info. */
    command: unknown;
    /** @yamlKey command_repeats */
    commandRepeats?: number;
}
interface RemoteReceiverByronsxProps {
    /** int: The 8-bit ID code to trigger on, see dumper output for more info. */
    address: unknown;
    /** int: The 4-bit command to listen for. If omitted, will match on any command. */
    command?: "1" | "2" | "3" | "5" | "6" | "9" | "13" | "14" | "16";
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
    /** int: The 24-bit ID code to trigger on. */
    id: unknown;
    /** int: The 8-bit channel to listen for. */
    channel: unknown;
    /** int: The 4-bit button to listen for. */
    button: unknown;
    /** int: The 4-bit check to listen for. Includes an indication that a button is being held down. */
    check: unknown;
}
interface RemoteReceiverDysonProps {
    /** int: The 16-bit code to trigger on, e.g. 0x1200=power, 0x1215=fan++,0x122a=swing..., see dumper output for more info. */
    code: unknown;
    /** int: The 8-bit rolling index [0..3], to be increased with every transmit, see dumper output for more info. */
    index?: unknown;
}
interface RemoteReceiverJvcProps {
    /** int: The JVC code to trigger on, see dumper output for more info. */
    data: unknown;
}
interface RemoteReceiverLgProps {
    /** int: The LG code to trigger on, see dumper output for more info. */
    data: unknown;
    /** int: The number of bits of the remote code. Defaults to `28`. */
    nbits?: "28" | "32";
}
interface RemoteReceiverMagiquestProps {
    /**
     * int: The MagiQuest wand ID to trigger on, see dumper output for more info.
     * @yamlKey wand_id
     */
    wandId: unknown;
    /** int: The magnitude of swishes and swirls of the wand. If omitted, will match on any activation of the wand. */
    magnitude?: unknown;
}
interface RemoteReceiverKeeloqProps {
    /** int: The 32-bit ID code to trigger on, see dumper output for more info. */
    address: unknown;
    code: unknown;
    /** int: The 8-bit switch/command to listen for. If omitted, will match on any command/button. */
    command?: unknown;
    level?: boolean;
}
interface RemoteReceiverNecProps {
    /** int: The address to trigger on, see dumper output for more info. */
    address: unknown;
    /** int: The NEC command to listen for. */
    command: unknown;
    /** @yamlKey command_repeats */
    commandRepeats?: number;
}
interface RemoteReceiverPioneerProps {
    /**
     * int: The remote control code to trigger on, see dumper output for more details.
     * @yamlKey rc_code_1
     */
    rcCode1: unknown;
    /** @yamlKey rc_code_2 */
    rcCode2?: unknown;
}
interface RemoteReceiverProntoProps {
    /** string: The code to listen for, see [transmitter description](/components/remote_transmitter#remote_transmitter-trans... */
    data: string;
    /** integer: This parameter allows you to manually specify the allowed difference between what Pronto code is specified, ... */
    delta?: number;
}
interface RemoteReceiverGoboxProps {
    /** int: The Go-Box code to trigger on, see dumper output for more info. */
    code: number;
}
interface RemoteReceiverRoombaProps {
    /** int: The Roomba code to trigger on, see dumper output for more info. */
    data: unknown;
}
interface RemoteReceiverSonyProps {
    /** int: The Sony code to trigger on, see dumper output for more info. */
    data: unknown;
    /** int: The number of bits of the remote code. Defaults to `12`. */
    nbits?: "12" | "15" | "20";
}
interface RemoteReceiverSymphonyProps {
    /** int: The Symphony code to trigger on, see dumper output for more info. */
    data: unknown;
    /** int: The number of bits of the remote code. Typical values: `8`, `12`, or `16`. */
    nbits: number;
    /** @yamlKey command_repeats */
    commandRepeats?: number;
}
interface RemoteReceiverRawProps {
    /** list: The code to listen for, see [transmitter description](/components/remote_transmitter#remote_transmitter-transmi... */
    code: unknown;
}
interface RemoteReceiverDraytonProps {
    /** int: The 16-bit ID code to trigger on, see dumper output for more info. */
    address: unknown;
    /** int: The 7-bit switch/channel to listen for. */
    channel: unknown;
    /** int: The 5-bit command to listen for. */
    command: unknown;
}
interface RemoteReceiverRc5Props {
    /** int: The address to trigger on, see dumper output for more info. */
    address: unknown;
    /** int: The RC5 command to listen for. */
    command: unknown;
}
interface RemoteReceiverRc6Props {
    /** int: The address to trigger on, see dumper output for more info. */
    address: unknown;
    /** int: The RC6 command to listen for. */
    command: unknown;
}
interface RemoteReceiverRcSwitchRawProps {
    /** string: The remote code to listen for, copy this from the dumper output. To ignore a bit in the received data, use `x... */
    code: unknown;
    /** The RC Switch protocol to use, see [RC Switch Protocol](/components/remote_transmitter#remote_transmitter-rc_switch-p... */
    protocol?: Record<string, unknown>;
}
interface RemoteReceiverRcSwitchTypeAProps {
    /** string: The group, binary string. */
    group: unknown;
    /** string: The device in the group, binary string. */
    device: unknown;
    /** boolean: The on/off state to trigger on. */
    state: boolean;
    /** The RC Switch protocol to use, see [RC Switch Protocol](/components/remote_transmitter#remote_transmitter-rc_switch-p... */
    protocol?: Record<string, unknown>;
}
interface RemoteReceiverRcSwitchTypeBProps {
    /** int: The address, int from 1 to 4. */
    address: number;
    /** int: The channel, int from 1 to 4. */
    channel: number;
    /** boolean: The on/off state to trigger on. */
    state: boolean;
    /** The RC Switch protocol to use, see [RC Switch Protocol](/components/remote_transmitter#remote_transmitter-rc_switch-p... */
    protocol?: Record<string, unknown>;
}
interface RemoteReceiverRcSwitchTypeCProps {
    /** string: The family. Range is `a` to `p`. */
    family: "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p";
    /** int: The group. Range is 1 to 4. */
    group: number;
    /** int: The device. Range is 1 to 4. */
    device: number;
    /** boolean: The on/off state to trigger on. */
    state: boolean;
    /** The RC Switch protocol to use, see [RC Switch Protocol](/components/remote_transmitter#remote_transmitter-rc_switch-p... */
    protocol?: Record<string, unknown>;
}
interface RemoteReceiverRcSwitchTypeDPropsRepeatPropsWaitTimeProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface RemoteReceiverRcSwitchTypeDPropsRepeatProps {
    times: number;
    /** @yamlKey wait_time */
    waitTime?: RemoteReceiverRcSwitchTypeDPropsRepeatPropsWaitTimeProps;
}
interface RemoteReceiverRcSwitchTypeDProps {
    /** int: The group. Range is 1 to 4. */
    group: "a" | "b" | "c" | "d";
    /** int: The device. Range is 1 to 3. */
    device: number;
    /** boolean: The on/off state to trigger on. */
    state: boolean;
    /** The RC Switch protocol to use, see [RC Switch Protocol](/components/remote_transmitter#remote_transmitter-rc_switch-p... */
    protocol?: Record<string, unknown>;
    repeat?: RemoteReceiverRcSwitchTypeDPropsRepeatProps;
}
interface RemoteReceiverSamsungProps {
    /** int: The data to trigger on, see dumper output for more info. */
    data: unknown;
    /** int: The number of bits of the remote code. Defaults to `32`. */
    nbits?: number;
}
interface RemoteReceiverSamsung36Props {
    /** int: The address to trigger on, see dumper output for more info. */
    address: unknown;
    /** int: The command. */
    command: unknown;
}
interface RemoteReceiverToshibaAcProps {
    /**
     * int: The remote control code to trigger on, see dumper output for more details.
     * @yamlKey rc_code_1
     */
    rcCode1: unknown;
    /**
     * int: The second part of the remote control code to trigger on, see dumper output for more details.
     * @yamlKey rc_code_2
     */
    rcCode2?: unknown;
}
interface RemoteReceiverPanasonicProps {
    /** int: The address to trigger on, see dumper output for more info. */
    address: unknown;
    /** int: The command. */
    command: unknown;
}
interface RemoteReceiverNexaProps {
    /** int: The Nexa device code to trigger on, see dumper output for more info. */
    device: unknown;
    /** int: The Nexa group code to trigger on, see dumper output for more info. */
    group: unknown;
    /** int: The Nexa state code to trigger on, see dumper output for more info. */
    state: unknown;
    /** int: The Nexa channel code to trigger on, see dumper output for more info. */
    channel: unknown;
    /** int: The Nexa level code to trigger on, see dumper output for more info. */
    level: unknown;
}
interface RemoteReceiverMideaProps {
    /** 5-bytes list: The code to listen for, see [transmitter description](/components/remote_transmitter#remote_transmitter... */
    code: unknown;
}
interface RemoteReceiverAehaProps {
    /** int: The address to trigger on, see dumper output for more info. */
    address: unknown;
    /** 3-35 bytes list: The code to listen for, see [transmitter description](/components/remote_transmitter#remote_transmit... */
    data: unknown;
}
interface RemoteReceiverHaierProps {
    /** 13-bytes list: The code to listen for, see [transmitter description](/components/remote_transmitter#remote_transmitte... */
    code: unknown;
}
interface RemoteReceiverAbbwelcomeProps {
    /**
     * int: The source address to trigger on.
     * @yamlKey source_address
     */
    sourceAddress: unknown;
    /**
     * int: The destination address to trigger on.
     * @yamlKey destination_address
     */
    destinationAddress: unknown;
    /** boolean: `true` if the message was re-transmitted. Defaults to `false`. */
    retransmission?: boolean;
    /**
     * boolean: The length of the source and destination address. `false` means two bytes and `true` means three bytes. Defa...
     * @yamlKey three_byte_address
     */
    threeByteAddress?: boolean;
    /**
     * int: The message type to trigger on.
     * @yamlKey message_type
     */
    messageType: unknown;
    /**
     * int: The random message ID to trigger on, see dumper output for more info. Defaults to any ID.
     * @yamlKey message_id
     */
    messageId?: unknown;
    /** 0-7 bytes list: The code to listen for. Usually you only need to copy this directly from the dumper output. Defaults ... */
    data?: unknown;
}
interface RemoteReceiverMirageProps {
    /** 14-bytes list: The code to listen for, see [transmitter description](/components/remote_transmitter#remote_transmitte... */
    code: unknown;
}
interface RemoteReceiverTotoProps {
    /**
     * int: The first 4-bit Toto code (usually a command parameter) to trigger on. Range is 0 to 0xF.
     * @yamlKey rc_code_1
     */
    rcCode1?: unknown;
    /**
     * int: The second 4-bit Toto code (usually a command parameter) to trigger on. Range is 0 to 0xF.
     * @yamlKey rc_code_2
     */
    rcCode2?: unknown;
    /** int: The 1-byte Toto command code to trigger on. Range is 0 to 0xFF. */
    command: unknown;
}
interface SeeedMr24hpc1HasTargetPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SeeedMr24hpc1HasTargetPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SeeedMr24hpc1HasTargetProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: SeeedMr24hpc1HasTargetPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: SeeedMr24hpc1HasTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface SeeedMr60bha2HasTargetPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SeeedMr60bha2HasTargetPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SeeedMr60bha2HasTargetProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: SeeedMr60bha2HasTargetPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: SeeedMr60bha2HasTargetPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface SeeedMr60fda2PeopleExistPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SeeedMr60fda2PeopleExistPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SeeedMr60fda2PeopleExistProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: SeeedMr60fda2PeopleExistPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: SeeedMr60fda2PeopleExistPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface SeeedMr60fda2FallDetectedPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface SeeedMr60fda2FallDetectedPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface SeeedMr60fda2FallDetectedProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: SeeedMr60fda2FallDetectedPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: SeeedMr60fda2FallDetectedPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface Sim800lRegisteredPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Sim800lRegisteredPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Sim800lRegisteredProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Sim800lRegisteredPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Sim800lRegisteredPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface Sy6970VbusConnectedPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Sy6970VbusConnectedPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Sy6970VbusConnectedProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Sy6970VbusConnectedPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Sy6970VbusConnectedPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface Sy6970ChargingPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Sy6970ChargingPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Sy6970ChargingProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Sy6970ChargingPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Sy6970ChargingPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface Sy6970ChargeDonePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface Sy6970ChargeDonePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface Sy6970ChargeDoneProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: Sy6970ChargeDonePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: Sy6970ChargeDonePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolBsPlusRelay1PropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolBsPlusRelay1PropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolBsPlusRelay1Props {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolBsPlusRelay1PropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBsPlusRelay1PropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolBsPlusRelay2PropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolBsPlusRelay2PropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolBsPlusRelay2Props {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolBsPlusRelay2PropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBsPlusRelay2PropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolBsPlusSensor1ErrorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolBsPlusSensor1ErrorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolBsPlusSensor1ErrorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolBsPlusSensor1ErrorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBsPlusSensor1ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolBsPlusSensor2ErrorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolBsPlusSensor2ErrorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolBsPlusSensor2ErrorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolBsPlusSensor2ErrorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBsPlusSensor2ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolBsPlusSensor3ErrorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolBsPlusSensor3ErrorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolBsPlusSensor3ErrorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolBsPlusSensor3ErrorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBsPlusSensor3ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolBsPlusSensor4ErrorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolBsPlusSensor4ErrorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolBsPlusSensor4ErrorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolBsPlusSensor4ErrorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBsPlusSensor4ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolBsPlusCollectorMaxPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolBsPlusCollectorMaxPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolBsPlusCollectorMaxProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolBsPlusCollectorMaxPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBsPlusCollectorMaxPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolBsPlusCollectorMinPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolBsPlusCollectorMinPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolBsPlusCollectorMinProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolBsPlusCollectorMinPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBsPlusCollectorMinPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolBsPlusCollectorFrostPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolBsPlusCollectorFrostPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolBsPlusCollectorFrostProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolBsPlusCollectorFrostPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBsPlusCollectorFrostPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolBsPlusTubeCollectorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolBsPlusTubeCollectorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolBsPlusTubeCollectorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolBsPlusTubeCollectorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBsPlusTubeCollectorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolBsPlusRecoolingPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolBsPlusRecoolingPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolBsPlusRecoolingProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolBsPlusRecoolingPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBsPlusRecoolingPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolBsPlusHqmPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolBsPlusHqmPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolBsPlusHqmProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolBsPlusHqmPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBsPlusHqmPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolBs2009Sensor1ErrorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolBs2009Sensor1ErrorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolBs2009Sensor1ErrorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolBs2009Sensor1ErrorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBs2009Sensor1ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolBs2009Sensor2ErrorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolBs2009Sensor2ErrorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolBs2009Sensor2ErrorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolBs2009Sensor2ErrorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBs2009Sensor2ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolBs2009Sensor3ErrorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolBs2009Sensor3ErrorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolBs2009Sensor3ErrorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolBs2009Sensor3ErrorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBs2009Sensor3ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolBs2009Sensor4ErrorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolBs2009Sensor4ErrorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolBs2009Sensor4ErrorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolBs2009Sensor4ErrorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBs2009Sensor4ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolBs2009FrostProtectionActivePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolBs2009FrostProtectionActivePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolBs2009FrostProtectionActiveProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolBs2009FrostProtectionActivePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBs2009FrostProtectionActivePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolBs2Sensor1ErrorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolBs2Sensor1ErrorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolBs2Sensor1ErrorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolBs2Sensor1ErrorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBs2Sensor1ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolBs2Sensor2ErrorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolBs2Sensor2ErrorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolBs2Sensor2ErrorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolBs2Sensor2ErrorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBs2Sensor2ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolBs2Sensor3ErrorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolBs2Sensor3ErrorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolBs2Sensor3ErrorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolBs2Sensor3ErrorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBs2Sensor3ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolBs2Sensor4ErrorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolBs2Sensor4ErrorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolBs2Sensor4ErrorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolBs2Sensor4ErrorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolBs2Sensor4ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolCSensor1ErrorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolCSensor1ErrorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolCSensor1ErrorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolCSensor1ErrorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCSensor1ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolCSensor2ErrorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolCSensor2ErrorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolCSensor2ErrorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolCSensor2ErrorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCSensor2ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolCSensor3ErrorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolCSensor3ErrorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolCSensor3ErrorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolCSensor3ErrorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCSensor3ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolCSensor4ErrorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolCSensor4ErrorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolCSensor4ErrorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolCSensor4ErrorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCSensor4ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolCs2Sensor1ErrorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolCs2Sensor1ErrorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolCs2Sensor1ErrorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolCs2Sensor1ErrorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCs2Sensor1ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolCs2Sensor2ErrorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolCs2Sensor2ErrorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolCs2Sensor2ErrorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolCs2Sensor2ErrorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCs2Sensor2ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolCs2Sensor3ErrorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolCs2Sensor3ErrorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolCs2Sensor3ErrorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolCs2Sensor3ErrorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCs2Sensor3ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolCs2Sensor4ErrorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolCs2Sensor4ErrorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolCs2Sensor4ErrorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolCs2Sensor4ErrorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCs2Sensor4ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolCsPlusSensor1ErrorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolCsPlusSensor1ErrorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolCsPlusSensor1ErrorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolCsPlusSensor1ErrorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCsPlusSensor1ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolCsPlusSensor2ErrorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolCsPlusSensor2ErrorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolCsPlusSensor2ErrorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolCsPlusSensor2ErrorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCsPlusSensor2ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolCsPlusSensor3ErrorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolCsPlusSensor3ErrorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolCsPlusSensor3ErrorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolCsPlusSensor3ErrorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCsPlusSensor3ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusDeltasolCsPlusSensor4ErrorPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusDeltasolCsPlusSensor4ErrorPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusDeltasolCsPlusSensor4ErrorProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusDeltasolCsPlusSensor4ErrorPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusDeltasolCsPlusSensor4ErrorPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface VbusCustomBinarySensorsPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface VbusCustomBinarySensorsPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface VbusCustomBinarySensorsProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: VbusCustomBinarySensorsPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: VbusCustomBinarySensorsPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
    lambda: unknown;
}
interface WireguardStatusPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface WireguardStatusPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface WireguardStatusProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: WireguardStatusPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: WireguardStatusPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface WireguardEnabledPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface WireguardEnabledPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface WireguardEnabledProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: WireguardEnabledPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: WireguardEnabledPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface XiaomiRtcgq02lmMotionPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface XiaomiRtcgq02lmMotionPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface XiaomiRtcgq02lmMotionPropsTimeoutProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface XiaomiRtcgq02lmMotionProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: XiaomiRtcgq02lmMotionPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: XiaomiRtcgq02lmMotionPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
    timeout?: XiaomiRtcgq02lmMotionPropsTimeoutProps;
}
interface XiaomiRtcgq02lmLightPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface XiaomiRtcgq02lmLightPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface XiaomiRtcgq02lmLightProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: XiaomiRtcgq02lmLightPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: XiaomiRtcgq02lmLightPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface XiaomiRtcgq02lmButtonPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface XiaomiRtcgq02lmButtonPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface XiaomiRtcgq02lmButtonPropsTimeoutProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface XiaomiRtcgq02lmButtonProps {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: XiaomiRtcgq02lmButtonPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: XiaomiRtcgq02lmButtonPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
    timeout?: XiaomiRtcgq02lmButtonPropsTimeoutProps;
}
interface BinarySensorBaseProps extends _CoreEntityBase, _CoreMqttComponent {
    /** @yamlKey web_server */
    webServer?: BinarySensorWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
interface AnalogThresholdProps extends _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): The ID of the source sensor.
     * @yamlKey sensor_id
     */
    sensorId: RefProp<sensor_Sensor>;
    /** float: Configures the reference for comparison. Accepts either a shorthand */
    threshold: AnalogThresholdThresholdProps;
}
interface As3935Props {
    /** @yamlKey as3935_id */
    as3935Id?: RefProp<as3935_AS3935Component>;
}
interface BlePresenceProps extends _CoreComponent {
    /**
     * MAC Address: The MAC address to track for this
     * @yamlKey mac_address
     */
    macAddress?: unknown;
    /** 16 byte hex string: The Identity Resolving Key (IRK) to track for this */
    irk?: unknown;
    /**
     * string: 16 bit, 32 bit, or 128 bit BLE Service UUID
     * @yamlKey service_uuid
     */
    serviceUuid?: unknown;
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
    ibeaconUuid?: unknown;
    /** [Time](/guides/configuration-types#time): The delay after last detecting the device before publishing not present state. */
    timeout?: BlePresenceTimeoutProps;
    /**
     * int: at which minimum RSSI level would the component report the device be present.
     * @yamlKey min_rssi
     */
    minRssi?: number;
    /** @yamlKey esp32_ble_id */
    esp32BleId?: RefProp<esp32_ble_tracker_ESP32BLETracker>;
}
interface CopyProps extends _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): The binary sensor that should be mirrored.
     * @yamlKey source_id
     */
    sourceId: RefProp<binary_sensor_BinarySensor>;
}
interface Cst226Props {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the touchscreen.
     * @yamlKey cst226_id
     */
    cst226Id?: RefProp<cst226_CST226Touchscreen>;
}
interface GpioProps extends _CoreComponent {
    /** [Pin Schema](/guides/configuration-types#pin-schema): The pin to monitor. */
    pin: Pin;
    /**
     * boolean: Use hardware interrupts instead of polling for better performance and lower CPU usage. Defaults to `true` fo...
     * @yamlKey use_interrupt
     */
    useInterrupt?: boolean;
    /**
     * string: The type of interrupt to use. One of:
     * @yamlKey interrupt_type
     */
    interruptType?: "RISING" | "FALLING" | "ANY";
}
interface Gt911Props {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the touchscreen.
     * @yamlKey gt911_id
     */
    gt911Id?: RefProp<gt911_GT911Touchscreen>;
    /** int: Internal index of the touch button, between 0 and 3. The default is 0. */
    index?: number;
}
interface HaierProps {
    /**
     * [ID](/guides/configuration-types#id): The id of haier climate component
     * @yamlKey haier_id
     */
    haierId?: RefProp<haier_HonClimate>;
    /**
     * A binary sensor that indicates outdoor fan activity. All options from [Binary Sensor](/components/binary_sensor#confi...
     * @yamlKey outdoor_fan_status
     */
    outdoorFanStatus?: HaierOutdoorFanStatusProps;
    /**
     * A binary sensor that indicates defrost procedure activity. All options from [Binary Sensor](/components/binary_sensor...
     * @yamlKey defrost_status
     */
    defrostStatus?: HaierDefrostStatusProps;
    /**
     * A binary sensor that indicates Haier climate compressor activity. All options from [Binary Sensor](/components/binary...
     * @yamlKey compressor_status
     */
    compressorStatus?: HaierCompressorStatusProps;
    /**
     * A binary sensor that indicates indoor fan activity. All options from [Binary Sensor](/components/binary_sensor#config...
     * @yamlKey indoor_fan_status
     */
    indoorFanStatus?: HaierIndoorFanStatusProps;
    /**
     * A binary sensor that indicates four way valve status. All options from [Binary Sensor](/components/binary_sensor#conf...
     * @yamlKey four_way_valve_status
     */
    fourWayValveStatus?: HaierFourWayValveStatusProps;
    /**
     * A binary sensor that indicates electrical heating system activity. All options from [Binary Sensor](/components/binar...
     * @yamlKey indoor_electric_heating_status
     */
    indoorElectricHeatingStatus?: HaierIndoorElectricHeatingStatusProps;
}
interface HomeassistantProps extends _HomeassistantHomeAssistantImport {
}
interface HydreonRgxxProps {
    /**
     * [ID](/guides/configuration-types#id): The ID of the Hydreon Rain Sensor display.
     * @yamlKey hydreon_rgxx_id
     */
    hydreonRgxxId?: RefProp<hydreon_rgxx_HydreonRGxxComponent>;
    /**
     * `true` if the sensor reports being too cold. Hydreon only mentions this feature for the RG-9.
     * @yamlKey too_cold
     */
    tooCold?: HydreonRgxxTooColdProps;
    /**
     * `true` if the sensor reports the lens being bad.
     * @yamlKey lens_bad
     */
    lensBad?: HydreonRgxxLensBadProps;
    /**
     * `true` if the sensor reports the Emitter being saturated.
     * @yamlKey em_sat
     */
    emSat?: HydreonRgxxEmSatProps;
}
interface NextionProps extends _NextionBinarySensorConfigBinarySensor, _CoreComponent {
    /**
     * string: The ID of the page the component is on. Use `0` for the default page.
     * @yamlKey page_id
     */
    pageId?: number;
    /**
     * string: The ID (the number, not name!) of the component to track.
     * @yamlKey component_id
     */
    componentId?: number;
    /**
     * [Time](/guides/configuration-types#time): The duration to update the sensor. If using a [Nextion Custom Binary Sensor...
     * @yamlKey update_interval
     */
    updateInterval?: unknown;
}
interface NfcProps extends _CoreComponent {
    /** @yamlKey nfcc_id */
    nfccId?: RefProp<nfc_Nfcc>;
    /**
     * string: A (sub)string that must appear in the tag's NDEF message. May not be used with `tag_id` and/or `uid` (below).
     * @yamlKey ndef_contains
     */
    ndefContains?: string;
    /**
     * string: A string that identifies the tag; in effect, its name. Specifically, this looks for the Home Assistant URI en...
     * @yamlKey tag_id
     */
    tagId?: string;
    /** string: The unique ID of the NFC tag. This is a hyphen-separated list of hexadecimal values. For example: `74-10-37-9... */
    uid?: unknown;
}
interface PacketTransportDataProps {
    /** @yamlKey transport_id */
    transportId?: RefProp<packet_transport_PacketTransport>;
    /**
     * [ID](/guides/configuration-types#id): The ID of the original binary sensor in the provider device. If not specified d...
     * @yamlKey remote_id
     */
    remoteId?: string;
    /** string: The name of the provider node. */
    provider: unknown;
}
interface PacketTransportStatusProps extends _PacketTransportBinarySensorStatusSensor {
}
interface QwiicPirProps extends _CoreComponent {
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** [Time](/guides/configuration-types#time): Only valid when using `NATIVE` debounce mode. Configures the debounce time ... */
    debounce?: QwiicPirDebounceProps;
    /**
     * enum: How the component debounces the motion sensor's signal. Must be one of `HYBRID`, `NATIVE`, or `RAW`. See [Debou...
     * @yamlKey debounce_mode
     */
    debounceMode?: "RAW" | "NATIVE" | "HYBRID";
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    address?: unknown;
}
interface Rc522Props {
    /** @yamlKey rc522_id */
    rc522Id?: RefProp<rc522_RC522>;
    uid: unknown;
}
interface SdlProps extends _CoreComponent {
    id?: unknown;
    /** The ID of an [SDL key](https://www.libsdl.org/release/SDL-1.2.15/docs/html/sdlkey.html). */
    key: "SDLK_UNKNOWN" | "SDLK_RETURN" | "SDLK_ESCAPE" | "SDLK_BACKSPACE" | "SDLK_TAB" | "SDLK_SPACE" | "SDLK_EXCLAIM" | "SDLK_QUOTEDBL" | "SDLK_HASH" | "SDLK_PERCENT" | "SDLK_DOLLAR" | "SDLK_AMPERSAND" | "SDLK_QUOTE" | "SDLK_LEFTPAREN" | "SDLK_RIGHTPAREN" | "SDLK_ASTERISK" | "SDLK_PLUS" | "SDLK_COMMA" | "SDLK_MINUS" | "SDLK_PERIOD" | "SDLK_SLASH" | "SDLK_0" | "SDLK_1" | "SDLK_2" | "SDLK_3" | "SDLK_4" | "SDLK_5" | "SDLK_6" | "SDLK_7" | "SDLK_8" | "SDLK_9" | "SDLK_COLON" | "SDLK_SEMICOLON" | "SDLK_LESS" | "SDLK_EQUALS" | "SDLK_GREATER" | "SDLK_QUESTION" | "SDLK_AT" | "SDLK_LEFTBRACKET" | "SDLK_BACKSLASH" | "SDLK_RIGHTBRACKET" | "SDLK_CARET" | "SDLK_UNDERSCORE" | "SDLK_BACKQUOTE" | "SDLK_a" | "SDLK_b" | "SDLK_c" | "SDLK_d" | "SDLK_e" | "SDLK_f" | "SDLK_g" | "SDLK_h" | "SDLK_i" | "SDLK_j" | "SDLK_k" | "SDLK_l" | "SDLK_m" | "SDLK_n" | "SDLK_o" | "SDLK_p" | "SDLK_q" | "SDLK_r" | "SDLK_s" | "SDLK_t" | "SDLK_u" | "SDLK_v" | "SDLK_w" | "SDLK_x" | "SDLK_y" | "SDLK_z" | "SDLK_CAPSLOCK" | "SDLK_F1" | "SDLK_F2" | "SDLK_F3" | "SDLK_F4" | "SDLK_F5" | "SDLK_F6" | "SDLK_F7" | "SDLK_F8" | "SDLK_F9" | "SDLK_F10" | "SDLK_F11" | "SDLK_F12" | "SDLK_PRINTSCREEN" | "SDLK_SCROLLLOCK" | "SDLK_PAUSE" | "SDLK_INSERT" | "SDLK_HOME" | "SDLK_PAGEUP" | "SDLK_DELETE" | "SDLK_END" | "SDLK_PAGEDOWN" | "SDLK_RIGHT" | "SDLK_LEFT" | "SDLK_DOWN" | "SDLK_UP" | "SDLK_NUMLOCKCLEAR" | "SDLK_KP_DIVIDE" | "SDLK_KP_MULTIPLY" | "SDLK_KP_MINUS" | "SDLK_KP_PLUS" | "SDLK_KP_ENTER" | "SDLK_KP_1" | "SDLK_KP_2" | "SDLK_KP_3" | "SDLK_KP_4" | "SDLK_KP_5" | "SDLK_KP_6" | "SDLK_KP_7" | "SDLK_KP_8" | "SDLK_KP_9" | "SDLK_KP_0" | "SDLK_KP_PERIOD" | "SDLK_APPLICATION" | "SDLK_POWER" | "SDLK_KP_EQUALS" | "SDLK_F13" | "SDLK_F14" | "SDLK_F15" | "SDLK_F16" | "SDLK_F17" | "SDLK_F18" | "SDLK_F19" | "SDLK_F20" | "SDLK_F21" | "SDLK_F22" | "SDLK_F23" | "SDLK_F24" | "SDLK_EXECUTE" | "SDLK_HELP" | "SDLK_MENU" | "SDLK_SELECT" | "SDLK_STOP" | "SDLK_AGAIN" | "SDLK_UNDO" | "SDLK_CUT" | "SDLK_COPY" | "SDLK_PASTE" | "SDLK_FIND" | "SDLK_MUTE" | "SDLK_VOLUMEUP" | "SDLK_VOLUMEDOWN" | "SDLK_KP_COMMA" | "SDLK_KP_EQUALSAS400" | "SDLK_ALTERASE" | "SDLK_SYSREQ" | "SDLK_CANCEL" | "SDLK_CLEAR" | "SDLK_PRIOR" | "SDLK_RETURN2" | "SDLK_SEPARATOR" | "SDLK_OUT" | "SDLK_OPER" | "SDLK_CLEARAGAIN" | "SDLK_CRSEL" | "SDLK_EXSEL" | "SDLK_KP_00" | "SDLK_KP_000" | "SDLK_THOUSANDSSEPARATOR" | "SDLK_DECIMALSEPARATOR" | "SDLK_CURRENCYUNIT" | "SDLK_CURRENCYSUBUNIT" | "SDLK_KP_LEFTPAREN" | "SDLK_KP_RIGHTPAREN" | "SDLK_KP_LEFTBRACE" | "SDLK_KP_RIGHTBRACE" | "SDLK_KP_TAB" | "SDLK_KP_BACKSPACE" | "SDLK_KP_A" | "SDLK_KP_B" | "SDLK_KP_C" | "SDLK_KP_D" | "SDLK_KP_E" | "SDLK_KP_F" | "SDLK_KP_XOR" | "SDLK_KP_POWER" | "SDLK_KP_PERCENT" | "SDLK_KP_LESS" | "SDLK_KP_GREATER" | "SDLK_KP_AMPERSAND" | "SDLK_KP_DBLAMPERSAND" | "SDLK_KP_VERTICALBAR" | "SDLK_KP_DBLVERTICALBAR" | "SDLK_KP_COLON" | "SDLK_KP_HASH" | "SDLK_KP_SPACE" | "SDLK_KP_AT" | "SDLK_KP_EXCLAM" | "SDLK_KP_MEMSTORE" | "SDLK_KP_MEMRECALL" | "SDLK_KP_MEMCLEAR" | "SDLK_KP_MEMADD" | "SDLK_KP_MEMSUBTRACT" | "SDLK_KP_MEMMULTIPLY" | "SDLK_KP_MEMDIVIDE" | "SDLK_KP_PLUSMINUS" | "SDLK_KP_CLEAR" | "SDLK_KP_CLEARENTRY" | "SDLK_KP_BINARY" | "SDLK_KP_OCTAL" | "SDLK_KP_DECIMAL" | "SDLK_KP_HEXADECIMAL" | "SDLK_LCTRL" | "SDLK_LSHIFT" | "SDLK_LALT" | "SDLK_LGUI" | "SDLK_RCTRL" | "SDLK_RSHIFT" | "SDLK_RALT" | "SDLK_RGUI" | "SDLK_MODE" | "SDLK_AUDIONEXT" | "SDLK_AUDIOPREV" | "SDLK_AUDIOSTOP" | "SDLK_AUDIOPLAY" | "SDLK_AUDIOMUTE" | "SDLK_MEDIASELECT" | "SDLK_WWW" | "SDLK_MAIL" | "SDLK_CALCULATOR" | "SDLK_COMPUTER" | "SDLK_AC_SEARCH" | "SDLK_AC_HOME" | "SDLK_AC_BACK" | "SDLK_AC_FORWARD" | "SDLK_AC_STOP" | "SDLK_AC_REFRESH" | "SDLK_AC_BOOKMARKS" | "SDLK_BRIGHTNESSDOWN" | "SDLK_BRIGHTNESSUP" | "SDLK_DISPLAYSWITCH" | "SDLK_KBDILLUMTOGGLE" | "SDLK_KBDILLUMDOWN" | "SDLK_KBDILLUMUP" | "SDLK_EJECT" | "SDLK_SLEEP" | "SDLK_APP1" | "SDLK_APP2" | "SDLK_AUDIOREWIND" | "SDLK_AUDIOFASTFORWARD" | "SDLK_SOFTLEFT" | "SDLK_SOFTRIGHT" | "SDLK_CALL" | "SDLK_ENDCALL";
    /** @yamlKey sdl_id */
    sdlId?: RefProp<sdl_Sdl>;
}
interface StatusProps extends _CoreComponent {
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /**
     * [Time](/guides/configuration-types#time): The interval to check the connection status. Defaults to `1s`.
     * @yamlKey update_interval
     */
    updateInterval?: unknown;
}
interface SwitchProps extends _CoreComponent {
    /**
     * [ID](/guides/configuration-types#id): The source switch to observe.
     * @yamlKey source_id
     */
    sourceId: RefProp<switch__Switch>;
}
interface Tm1637Props {
    /**
     * :[ID](/guides/configuration-types#id): The id of the tm1637 that should be used to scan the keys in case you are usin...
     * @yamlKey tm1637_id
     */
    tm1637Id?: RefProp<tm1637_TM1637Display>;
    /** integer: The keycode for the connected key (Seg0 = 0, Seg1 = 1 etc,). Range is from 0 to 15. */
    key: number;
}
interface Tm1638Props {
    /** @yamlKey tm1638_id */
    tm1638Id?: RefProp<tm1638_TM1638Component>;
    key: number;
}
interface TouchscreenProps extends _CoreComponent {
    /** @yamlKey touchscreen_id */
    touchscreenId?: RefProp<touchscreen_Touchscreen>;
    /** @yamlKey use_raw */
    useRaw?: boolean;
    /** @yamlKey x_min */
    xMin: number;
    /** @yamlKey x_max */
    xMax: number;
    /** @yamlKey y_min */
    yMin: number;
    /** @yamlKey y_max */
    yMax: number;
    /** @yamlKey page_id */
    pageId?: RefProp<display_DisplayPage>;
    pages?: Array<RefProp<display_DisplayPage>>;
}
interface Tt21100Props {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the touchscreen.
     * @yamlKey tt21100_id
     */
    tt21100Id?: RefProp<tt21100_TT21100Touchscreen>;
    /** int: Internal index of the touch button, between 0 and 3. */
    index: number;
}
interface XiaomiCgpr1Props extends _BthomeMithermometerBleDevice, _CoreComponent {
    /** @yamlKey device_class */
    deviceClass?: unknown;
    bindkey: unknown;
    /** @yamlKey mac_address */
    macAddress: unknown;
    /** @yamlKey battery_level */
    batteryLevel?: XiaomiCgpr1BatteryLevelProps;
    /** @yamlKey idle_time */
    idleTime?: XiaomiCgpr1IdleTimeProps;
    illuminance?: XiaomiCgpr1IlluminanceProps;
}
interface XiaomiMjyd02ylaProps extends _BthomeMithermometerBleDevice, _CoreComponent {
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey mac_address */
    macAddress: unknown;
    bindkey: unknown;
    /** @yamlKey idle_time */
    idleTime?: XiaomiMjyd02ylaIdleTimeProps;
    /** @yamlKey battery_level */
    batteryLevel?: XiaomiMjyd02ylaBatteryLevelProps;
    illuminance?: XiaomiMjyd02ylaIlluminanceProps;
    light?: XiaomiMjyd02ylaLightProps;
}
interface XiaomiMue4094rtProps extends _BthomeMithermometerBleDevice, _CoreComponent {
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey mac_address */
    macAddress: unknown;
    timeout?: XiaomiMue4094rtTimeoutProps;
}
interface XiaomiWx08zmProps extends _BthomeMithermometerBleDevice, _CoreComponent {
    /** @yamlKey mac_address */
    macAddress: unknown;
    tablet?: XiaomiWx08zmTabletProps;
    /** @yamlKey battery_level */
    batteryLevel?: XiaomiWx08zmBatteryLevelProps;
}
interface Apds9960Props {
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey apds9960_id */
    apds9960Id?: RefProp<apds9960_APDS9960>;
    /** string: The direction to measure. One of: */
    direction: "up" | "down" | "left" | "right";
}
interface Cap1188Props {
    /**
     * [ID](/guides/configuration-types#id): The ID of the CAP1188 defined above. Useful for multiple CAP1188's on the I²C bus.
     * @yamlKey cap1188_id
     */
    cap1188Id?: RefProp<cap1188_CAP1188Component>;
    /** int: The channel number the CAP1188 the touchkey is connected to. */
    channel: number;
}
interface Cst816Props extends _Touchscreen {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The touch detection pin.
     * @yamlKey interrupt_pin
     */
    interruptPin?: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The chip reset pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /**
     * boolean: Skip reading the chip ID on startup. May be required for some variants (e.g. CST816S) that do not respond to...
     * @yamlKey skip_probe
     */
    skipProbe?: boolean;
    /** @yamlKey i2c_id */
    i2cId?: RefProp<i2c_I2CBus>;
    address?: unknown;
}
interface DalyBmsProps extends _CoreComponent {
    /** @yamlKey bms_daly_id */
    bmsDalyId?: RefProp<daly_bms_DalyBmsComponent>;
    /**
     * The BMS charging MOS status to enable the recharge of the battery. All options from [Binary Sensor](/components/binar...
     * @yamlKey charging_mos_enabled
     */
    chargingMosEnabled?: DalyBmsChargingMosEnabledProps;
    /**
     * The BMS discharging mos status to enable the load. All options from [Binary Sensor](/components/binary_sensor#config-...
     * @yamlKey discharging_mos_enabled
     */
    dischargingMosEnabled?: DalyBmsDischargingMosEnabledProps;
}
interface DfrobotSen0395Props {
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /**
     * [ID](/guides/configuration-types#id): The ID of the DFRobot mmWave component defined above. Required when multiple in...
     * @yamlKey dfrobot_sen0395_id
     */
    dfrobotSen0395Id?: RefProp<dfrobot_sen0395_DfrobotSen0395Component>;
}
interface Esp32TouchProps {
    /** @yamlKey esp32_touch_id */
    esp32TouchId?: RefProp<esp32_touch_ESP32TouchComponent>;
    /** [Pin](/guides/configuration-types#pin): The pin to detect touch */
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
    id?: RefProp<ezo_pmp_EzoPMP>;
    /** @yamlKey pump_state */
    pumpState?: EzoPmpPumpStateProps;
    /** @yamlKey is_paused */
    isPaused?: EzoPmpIsPausedProps;
}
interface FingerprintGrowProps {
    /** @yamlKey fingerprint_grow_id */
    fingerprintGrowId?: RefProp<fingerprint_grow_FingerprintGrowComponent>;
    icon?: unknown;
}
interface Gdk101Props {
    /** @yamlKey gdk101_id */
    gdk101Id?: RefProp<gdk101_GDK101Component>;
    /** Vibration status. All options from [Binary Sensor](/components/binary_sensor#config-binary_sensor). */
    vibrations: Gdk101VibrationsProps;
}
interface HlkFm22xProps {
    /** @yamlKey hlk_fm22x_id */
    hlkFm22xId?: RefProp<hlk_fm22x_HlkFm22xComponent>;
    icon?: unknown;
}
interface Ld2410Props {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID for the [Ld2410](/components/sensor/ld2410/) component ...
     * @yamlKey ld2410_id
     */
    ld2410Id?: RefProp<ld2410_LD2410Component>;
    /**
     * If true target detect either still or in movement. All options from [Binary Sensor](/components/binary_sensor#config-...
     * @yamlKey has_target
     */
    hasTarget?: Ld2410HasTargetProps;
    /**
     * If true a moving target is detected. All options from [Binary Sensor](/components/binary_sensor#config-binary_sensor).
     * @yamlKey has_moving_target
     */
    hasMovingTarget?: Ld2410HasMovingTargetProps;
    /**
     * If true a still target is detected. All options from [Binary Sensor](/components/binary_sensor#config-binary_sensor).
     * @yamlKey has_still_target
     */
    hasStillTarget?: Ld2410HasStillTargetProps;
    /**
     * When in [engineering mode](https://esphome.io/components/sensor/ld2410#ld2410-engineering-mode), indicates the status...
     * @yamlKey out_pin_presence_status
     */
    outPinPresenceStatus?: Ld2410OutPinPresenceStatusProps;
}
interface Ld2412Props {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID for the component. Required when using multiple compone...
     * @yamlKey ld2412_id
     */
    ld2412Id?: RefProp<ld2412_LD2412Component>;
    /**
     * True while the sensor is performing dynamic background correction. All options from [Binary Sensor](/components/binar...
     * @yamlKey dynamic_background_correction_status
     */
    dynamicBackgroundCorrectionStatus?: Ld2412DynamicBackgroundCorrectionStatusProps;
    /**
     * If true target detect either still or in movement. All options from [Binary Sensor](/components/binary_sensor#config-...
     * @yamlKey has_target
     */
    hasTarget?: Ld2412HasTargetProps;
    /**
     * True if a moving target is detected. All options from [Binary Sensor](/components/binary_sensor#config-binary_sensor).
     * @yamlKey has_moving_target
     */
    hasMovingTarget?: Ld2412HasMovingTargetProps;
    /**
     * True if a still target is detected. All options from [Binary Sensor](/components/binary_sensor#config-binary_sensor).
     * @yamlKey has_still_target
     */
    hasStillTarget?: Ld2412HasStillTargetProps;
}
interface Ld2420Props extends _CoreComponent {
    /** @yamlKey ld2420_id */
    ld2420Id?: RefProp<ld2420_LD2420Component>;
    /**
     * If a target is detected with either still or in movement has_target will be set true for the duration of the presence...
     * @yamlKey has_target
     */
    hasTarget?: Ld2420HasTargetProps;
}
interface Ld2450Props {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID for the [Ld2450](/components/sensor/ld2450/) component.
     * @yamlKey ld2450_id
     */
    ld2450Id?: RefProp<ld2450_LD2450Component>;
    /**
     * True if either target is still or in movement. All options from [Binary Sensor](/components/binary_sensor#config-bina...
     * @yamlKey has_target
     */
    hasTarget?: Ld2450HasTargetProps;
    /**
     * True if a moving target is detected. All options from [Binary Sensor](/components/binary_sensor#config-binary_sensor).
     * @yamlKey has_moving_target
     */
    hasMovingTarget?: Ld2450HasMovingTargetProps;
    /**
     * True if a still target is detected. All options from [Binary Sensor](/components/binary_sensor#config-binary_sensor).
     * @yamlKey has_still_target
     */
    hasStillTarget?: Ld2450HasStillTargetProps;
}
interface LvglProps {
    id?: unknown;
    widget: RefProp<lvgl_LvPseudoButton>;
}
interface M5stack8angleProps extends _CoreComponent {
    /** @yamlKey m5stack_8angle_id */
    m5stack8angleId?: RefProp<m5stack_8angle_M5Stack8AngleComponent>;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
interface MatrixKeypadProps {
    /**
     * [ID](/guides/configuration-types#id): The ID of the keypad to process keypresses from.
     * @yamlKey keypad_id
     */
    keypadId?: RefProp<matrix_keypad_MatrixKeypad>;
    /** integer: The row of the key. */
    row?: number;
    /** integer: The column of the key. */
    col?: number;
    /** string: The key from `keys` configuration entry above. */
    key?: string;
}
interface ModbusControllerProps extends _CoreComponent, _ModbusControllerModbusitembaseschema {
    /** @yamlKey register_type */
    registerType?: "custom" | "coil" | "holding" | "discrete_input" | "read";
}
interface Mpr121Props {
    /**
     * [ID](/guides/configuration-types#id): The ID of the MPR121 defined above. Useful for multiple MPR121's on the I²C bus
     * @yamlKey mpr121_id
     */
    mpr121Id?: RefProp<mpr121_MPR121Component>;
    /** int: The channel number at the MPR121 the touchkey is connected to. */
    channel: number;
    /**
     * int: A per-channel override of the global touch_threshold value. If not specified, uses the global value.
     * @yamlKey touch_threshold
     */
    touchThreshold?: number;
    /**
     * int: A per-channel override of the global release_threshold value. If not specified, uses the global value.
     * @yamlKey release_threshold
     */
    releaseThreshold?: number;
}
interface Msa3xxProps extends _Msa3xxMsaSensor {
    /** Single tap detection. */
    tap?: Msa3xxTapProps;
    /**
     * Double tap detection.
     * @yamlKey double_tap
     */
    doubleTap?: Msa3xxDoubleTapProps;
    /** Movement detection. */
    active?: Msa3xxActiveProps;
}
interface OpenthermProps extends _CoreComponent {
    /** @yamlKey opentherm_id */
    openthermId?: RefProp<opentherm_OpenthermHub>;
    /** @yamlKey fault_indication */
    faultIndication?: OpenthermFaultIndicationProps;
    /** @yamlKey ch_active */
    chActive?: OpenthermChActiveProps;
    /** @yamlKey dhw_active */
    dhwActive?: OpenthermDhwActiveProps;
    /** @yamlKey flame_on */
    flameOn?: OpenthermFlameOnProps;
    /** @yamlKey cooling_active */
    coolingActive?: OpenthermCoolingActiveProps;
    /** @yamlKey ch2_active */
    ch2Active?: OpenthermCh2ActiveProps;
    /** @yamlKey diagnostic_indication */
    diagnosticIndication?: OpenthermDiagnosticIndicationProps;
    /** @yamlKey electricity_production */
    electricityProduction?: OpenthermElectricityProductionProps;
    /** @yamlKey dhw_present */
    dhwPresent?: OpenthermDhwPresentProps;
    /** @yamlKey control_type_on_off */
    controlTypeOnOff?: OpenthermControlTypeOnOffProps;
    /** @yamlKey cooling_supported */
    coolingSupported?: OpenthermCoolingSupportedProps;
    /** @yamlKey dhw_storage_tank */
    dhwStorageTank?: OpenthermDhwStorageTankProps;
    /** @yamlKey controller_pump_control_allowed */
    controllerPumpControlAllowed?: OpenthermControllerPumpControlAllowedProps;
    /** @yamlKey ch2_present */
    ch2Present?: OpenthermCh2PresentProps;
    /** @yamlKey water_filling */
    waterFilling?: OpenthermWaterFillingProps;
    /** @yamlKey heat_mode */
    heatMode?: OpenthermHeatModeProps;
    /** @yamlKey dhw_setpoint_transfer_enabled */
    dhwSetpointTransferEnabled?: OpenthermDhwSetpointTransferEnabledProps;
    /** @yamlKey max_ch_setpoint_transfer_enabled */
    maxChSetpointTransferEnabled?: OpenthermMaxChSetpointTransferEnabledProps;
    /** @yamlKey dhw_setpoint_rw */
    dhwSetpointRw?: OpenthermDhwSetpointRwProps;
    /** @yamlKey max_ch_setpoint_rw */
    maxChSetpointRw?: OpenthermMaxChSetpointRwProps;
    /** @yamlKey service_request */
    serviceRequest?: OpenthermServiceRequestProps;
    /** @yamlKey lockout_reset */
    lockoutReset?: OpenthermLockoutResetProps;
    /** @yamlKey low_water_pressure */
    lowWaterPressure?: OpenthermLowWaterPressureProps;
    /** @yamlKey flame_fault */
    flameFault?: OpenthermFlameFaultProps;
    /** @yamlKey air_pressure_fault */
    airPressureFault?: OpenthermAirPressureFaultProps;
    /** @yamlKey water_over_temp */
    waterOverTemp?: OpenthermWaterOverTempProps;
}
interface PipsolarProps extends _PipsolarComponent {
    /**
     * add sbu priority version
     * @yamlKey add_sbu_priority_version
     */
    addSbuPriorityVersion?: PipsolarAddSbuPriorityVersionProps;
    /**
     * configuration status
     * @yamlKey configuration_status
     */
    configurationStatus?: PipsolarConfigurationStatusProps;
    /**
     * scc firmware version
     * @yamlKey scc_firmware_version
     */
    sccFirmwareVersion?: PipsolarSccFirmwareVersionProps;
    /**
     * load status
     * @yamlKey load_status
     */
    loadStatus?: PipsolarLoadStatusProps;
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
     * scc charging status
     * @yamlKey scc_charging_status
     */
    sccChargingStatus?: PipsolarSccChargingStatusProps;
    /**
     * ac charging status
     * @yamlKey ac_charging_status
     */
    acChargingStatus?: PipsolarAcChargingStatusProps;
    /**
     * charging to floating mode
     * @yamlKey charging_to_floating_mode
     */
    chargingToFloatingMode?: PipsolarChargingToFloatingModeProps;
    /**
     * switch on
     * @yamlKey switch_on
     */
    switchOn?: PipsolarSwitchOnProps;
    /**
     * dustproof installed
     * @yamlKey dustproof_installed
     */
    dustproofInstalled?: PipsolarDustproofInstalledProps;
    /**
     * silence buzzer open buzzer
     * @yamlKey silence_buzzer_open_buzzer
     */
    silenceBuzzerOpenBuzzer?: PipsolarSilenceBuzzerOpenBuzzerProps;
    /**
     * overload bypass function
     * @yamlKey overload_bypass_function
     */
    overloadBypassFunction?: PipsolarOverloadBypassFunctionProps;
    /**
     * lcd escape to default
     * @yamlKey lcd_escape_to_default
     */
    lcdEscapeToDefault?: PipsolarLcdEscapeToDefaultProps;
    /**
     * overload restart function
     * @yamlKey overload_restart_function
     */
    overloadRestartFunction?: PipsolarOverloadRestartFunctionProps;
    /**
     * over temperature restart function
     * @yamlKey over_temperature_restart_function
     */
    overTemperatureRestartFunction?: PipsolarOverTemperatureRestartFunctionProps;
    /**
     * backlight on
     * @yamlKey backlight_on
     */
    backlightOn?: PipsolarBacklightOnProps;
    /**
     * alarm on when primary source interrupt
     * @yamlKey alarm_on_when_primary_source_interrupt
     */
    alarmOnWhenPrimarySourceInterrupt?: PipsolarAlarmOnWhenPrimarySourceInterruptProps;
    /**
     * fault code record
     * @yamlKey fault_code_record
     */
    faultCodeRecord?: PipsolarFaultCodeRecordProps;
    /**
     * power saving
     * @yamlKey power_saving
     */
    powerSaving?: PipsolarPowerSavingProps;
    /**
     * warnings present
     * @yamlKey warnings_present
     */
    warningsPresent?: PipsolarWarningsPresentProps;
    /**
     * faults present
     * @yamlKey faults_present
     */
    faultsPresent?: PipsolarFaultsPresentProps;
    /**
     * warning power loss
     * @yamlKey warning_power_loss
     */
    warningPowerLoss?: PipsolarWarningPowerLossProps;
    /**
     * fault inverter fault
     * @yamlKey fault_inverter_fault
     */
    faultInverterFault?: PipsolarFaultInverterFaultProps;
    /**
     * fault bus over
     * @yamlKey fault_bus_over
     */
    faultBusOver?: PipsolarFaultBusOverProps;
    /**
     * fault bus under
     * @yamlKey fault_bus_under
     */
    faultBusUnder?: PipsolarFaultBusUnderProps;
    /**
     * fault bus soft fail
     * @yamlKey fault_bus_soft_fail
     */
    faultBusSoftFail?: PipsolarFaultBusSoftFailProps;
    /**
     * warning line fail
     * @yamlKey warning_line_fail
     */
    warningLineFail?: PipsolarWarningLineFailProps;
    /**
     * fault opvshort
     * @yamlKey fault_opvshort
     */
    faultOpvshort?: PipsolarFaultOpvshortProps;
    /**
     * fault inverter voltage too low
     * @yamlKey fault_inverter_voltage_too_low
     */
    faultInverterVoltageTooLow?: PipsolarFaultInverterVoltageTooLowProps;
    /**
     * fault inverter voltage too high
     * @yamlKey fault_inverter_voltage_too_high
     */
    faultInverterVoltageTooHigh?: PipsolarFaultInverterVoltageTooHighProps;
    /**
     * warning over temperature
     * @yamlKey warning_over_temperature
     */
    warningOverTemperature?: PipsolarWarningOverTemperatureProps;
    /**
     * warning fan lock
     * @yamlKey warning_fan_lock
     */
    warningFanLock?: PipsolarWarningFanLockProps;
    /**
     * warning battery voltage high
     * @yamlKey warning_battery_voltage_high
     */
    warningBatteryVoltageHigh?: PipsolarWarningBatteryVoltageHighProps;
    /**
     * warning battery low alarm
     * @yamlKey warning_battery_low_alarm
     */
    warningBatteryLowAlarm?: PipsolarWarningBatteryLowAlarmProps;
    /**
     * warning battery under shutdown
     * @yamlKey warning_battery_under_shutdown
     */
    warningBatteryUnderShutdown?: PipsolarWarningBatteryUnderShutdownProps;
    /**
     * warning battery derating
     * @yamlKey warning_battery_derating
     */
    warningBatteryDerating?: PipsolarWarningBatteryDeratingProps;
    /**
     * warning over load
     * @yamlKey warning_over_load
     */
    warningOverLoad?: PipsolarWarningOverLoadProps;
    /**
     * warning eeprom failed
     * @yamlKey warning_eeprom_failed
     */
    warningEepromFailed?: PipsolarWarningEepromFailedProps;
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
     * fault_self_test_failed
     * @yamlKey fault_self_test_failed
     */
    faultSelfTestFailed?: PipsolarFaultSelfTestFailedProps;
    /**
     * fault op dc voltage over
     * @yamlKey fault_op_dc_voltage_over
     */
    faultOpDcVoltageOver?: PipsolarFaultOpDcVoltageOverProps;
    /**
     * fault battery open
     * @yamlKey fault_battery_open
     */
    faultBatteryOpen?: PipsolarFaultBatteryOpenProps;
    /**
     * fault current sensor failed
     * @yamlKey fault_current_sensor_failed
     */
    faultCurrentSensorFailed?: PipsolarFaultCurrentSensorFailedProps;
    /**
     * fault battery short
     * @yamlKey fault_battery_short
     */
    faultBatteryShort?: PipsolarFaultBatteryShortProps;
    /**
     * warning power limit
     * @yamlKey warning_power_limit
     */
    warningPowerLimit?: PipsolarWarningPowerLimitProps;
    /**
     * warning pv voltage high
     * @yamlKey warning_pv_voltage_high
     */
    warningPvVoltageHigh?: PipsolarWarningPvVoltageHighProps;
    /**
     * fault mppt overload
     * @yamlKey fault_mppt_overload
     */
    faultMpptOverload?: PipsolarFaultMpptOverloadProps;
    /**
     * warning mppt overload
     * @yamlKey warning_mppt_overload
     */
    warningMpptOverload?: PipsolarWarningMpptOverloadProps;
    /**
     * warning battery too low to charge
     * @yamlKey warning_battery_too_low_to_charge
     */
    warningBatteryTooLowToCharge?: PipsolarWarningBatteryTooLowToChargeProps;
    /**
     * fault dc dc over current
     * @yamlKey fault_dc_dc_over_current
     */
    faultDcDcOverCurrent?: PipsolarFaultDcDcOverCurrentProps;
    /**
     * fault code
     * @yamlKey fault_code
     */
    faultCode?: PipsolarFaultCodeProps;
    /**
     * warning low pv energy
     * @yamlKey warning_low_pv_energy
     */
    warningLowPvEnergy?: PipsolarWarningLowPvEnergyProps;
    /**
     * warning high ac input during bus soft start
     * @yamlKey warning_high_ac_input_during_bus_soft_start
     */
    warningHighAcInputDuringBusSoftStart?: PipsolarWarningHighAcInputDuringBusSoftStartProps;
    /**
     * warning battery equalization
     * @yamlKey warning_battery_equalization
     */
    warningBatteryEqualization?: PipsolarWarningBatteryEqualizationProps;
}
interface Pn532Props {
    /** @yamlKey pn532_id */
    pn532Id?: RefProp<pn532_PN532>;
    uid: unknown;
}
interface Rc522SpiProps {
    /** @yamlKey rc522_id */
    rc522Id?: RefProp<rc522_RC522>;
    uid: unknown;
}
interface Rd03dProps {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the RD-03D component.
     * @yamlKey rd03d_id
     */
    rd03dId?: RefProp<rd03d_RD03DComponent>;
    /** True if any target is detected. All options from [Binary Sensor](/components/binary_sensor#config-binary_sensor). */
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
    rdm6300Id?: RefProp<rdm6300_RDM6300Component>;
    /** int: The unique ID of the NFC/RFID tag. */
    uid: number;
}
interface RemoteReceiverProps extends _CoreComponent {
    /** Trigger on a decoded B&O Beo4 infrared remote code with the given data. */
    beo4?: RemoteReceiverBeo4Props;
    /** Trigger on a decoded Byron SX Doorbell RF remote code with the given data. */
    byronsx?: RemoteReceiverByronsxProps;
    /** Trigger on a decoded CanalSat remote code with the given data. */
    canalsat?: Record<string, unknown>;
    /** Trigger on a decoded CanalSatLD remote code with the given data. */
    canalsatld?: Record<string, unknown>;
    /** Trigger on a decoded Coolix remote code with the given data. It is possible to directly specify a 24-bit code, it wil... */
    coolix?: RemoteReceiverCoolixProps;
    /** Trigger on a decoded Dish Network remote code with the given data. Beware that Dish remotes use a different carrier f... */
    dish?: RemoteReceiverDishProps;
    /** Trigger on a decoded Dooya RF remote code with the given data. */
    dooya?: RemoteReceiverDooyaProps;
    /** Trigger on a decoded dyson cool AM07 infrared remote code with the given data. */
    dyson?: RemoteReceiverDysonProps;
    /** Trigger on a decoded JVC remote code with the given data. */
    jvc?: RemoteReceiverJvcProps;
    /** Trigger on a decoded LG remote code with the given data. */
    lg?: RemoteReceiverLgProps;
    /** Trigger on a decoded MagiQuest wand remote code with the given wand ID. */
    magiquest?: RemoteReceiverMagiquestProps;
    /** Trigger on a decoded KeeLoq RF remote code with the given data. */
    keeloq?: RemoteReceiverKeeloqProps;
    /** Trigger on a decoded NEC remote code with the given data. */
    nec?: RemoteReceiverNecProps;
    /** Trigger on a decoded Pioneer remote code with the given data. */
    pioneer?: RemoteReceiverPioneerProps;
    /** Trigger on a Pronto remote code with the given code. */
    pronto?: RemoteReceiverProntoProps;
    /** Trigger on a decoded Go-Box remote code with the given data. */
    gobox?: RemoteReceiverGoboxProps;
    /** Trigger on a decoded Roomba remote code with the given data. */
    roomba?: RemoteReceiverRoombaProps;
    /** Trigger on a decoded Sony remote code with the given data. */
    sony?: RemoteReceiverSonyProps;
    /** Trigger on a decoded Symphony remote code with the given data. */
    symphony?: RemoteReceiverSymphonyProps;
    /** Trigger on a raw remote code with the given code. */
    raw?: RemoteReceiverRawProps;
    /** Trigger on a decoded Drayton Digistat RF remote code with the given data. */
    drayton?: RemoteReceiverDraytonProps;
    /** Trigger on a decoded RC5 remote code with the given data. */
    rc5?: RemoteReceiverRc5Props;
    /** Trigger on a decoded RC6 remote code with the given data. */
    rc6?: RemoteReceiverRc6Props;
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
    /** Trigger on a decoded Samsung remote code with the given data. */
    samsung?: RemoteReceiverSamsungProps;
    /** Trigger on a decoded Samsung36 remote code with the given data. */
    samsung36?: RemoteReceiverSamsung36Props;
    /**
     * Trigger on a decoded Toshiba AC remote code with the given data.
     * @yamlKey toshiba_ac
     */
    toshibaAc?: RemoteReceiverToshibaAcProps;
    /** Trigger on a decoded Panasonic remote code with the given data. */
    panasonic?: RemoteReceiverPanasonicProps;
    /** Trigger on a decoded Nexa RF code with the given data. */
    nexa?: RemoteReceiverNexaProps;
    /** Trigger on a Midea remote code with the given code. */
    midea?: RemoteReceiverMideaProps;
    /** Trigger on a decoded AEHA remote code with the given data. */
    aeha?: RemoteReceiverAehaProps;
    /** Trigger on a Haier remote code with the given code. */
    haier?: RemoteReceiverHaierProps;
    /** Trigger on a decoded ABB-Welcome code with the given data, see the [transmitter description](/components/remote_trans... */
    abbwelcome?: RemoteReceiverAbbwelcomeProps;
    /** Trigger on a Mirage remote code with the given code. */
    mirage?: RemoteReceiverMirageProps;
    /** Trigger on a decoded Toto remote code with the given data. */
    toto?: RemoteReceiverTotoProps;
    /**
     * [ID](/guides/configuration-types#id): The remote receiver to receive the remote code with. Required if multiple recei...
     * @yamlKey receiver_id
     */
    receiverId?: RefProp<remote_base_RemoteReceiverBase>;
}
interface SeeedMr24hpc1Props {
    /** @yamlKey mr24hpc1_id */
    mr24hpc1Id?: RefProp<seeed_mr24hpc1_MR24HPC1Component>;
    /**
     * If true target detect either still or in movement. All options from [Binary Sensor](/components/binary_sensor#config-...
     * @yamlKey has_target
     */
    hasTarget?: SeeedMr24hpc1HasTargetProps;
}
interface SeeedMr60bha2Props {
    /** @yamlKey mr60bha2_id */
    mr60bha2Id?: RefProp<seeed_mr60bha2_MR60BHA2Component>;
    /**
     * If true when target (person) is detected. All options from [Binary Sensor](/components/binary_sensor#config-binary_se...
     * @yamlKey has_target
     */
    hasTarget?: SeeedMr60bha2HasTargetProps;
}
interface SeeedMr60fda2Props {
    /** @yamlKey mr60fda2_id */
    mr60fda2Id?: RefProp<seeed_mr60fda2_MR60FDA2Component>;
    /**
     * If true when target (person) is detected. All options from [Binary Sensor](/components/binary_sensor#config-binary_se...
     * @yamlKey people_exist
     */
    peopleExist?: SeeedMr60fda2PeopleExistProps;
    /**
     * An indication of whether the radar has detected a fall. All options from [Text Sensor](/components/text_sensor#config...
     * @yamlKey fall_detected
     */
    fallDetected?: SeeedMr60fda2FallDetectedProps;
}
interface Sim800lProps {
    /** @yamlKey sim800l_id */
    sim800lId?: RefProp<sim800l_Sim800LComponent>;
    /** Indicates if the SIM800L has successfully registered in the cellular network. */
    registered?: Sim800lRegisteredProps;
}
interface Sx1509Props {
    /** @yamlKey sx1509_id */
    sx1509Id?: RefProp<sx1509_SX1509Component>;
    /** int: The row number for this key on the keypad. */
    row: number;
    /** int: The column number for this key on the keypad. */
    col: number;
}
interface Sy6970Props {
    /** @yamlKey sy6970_id */
    sy6970Id?: RefProp<sy6970_SY6970Component>;
    /** @yamlKey vbus_connected */
    vbusConnected?: Sy6970VbusConnectedProps;
    charging?: Sy6970ChargingProps;
    /** @yamlKey charge_done */
    chargeDone?: Sy6970ChargeDoneProps;
}
interface TemplateProps extends _CoreComponent {
    lambda?: unknown;
    /** [Condition](/automations/actions#all-conditions): The condition to check to determine the value of the binary sensor.... */
    condition?: unknown;
}
interface Ttp229BsfProps {
    /** @yamlKey ttp229_id */
    ttp229Id?: RefProp<ttp229_bsf_TTP229BSFComponent>;
    channel: number;
}
interface Ttp229LsfProps {
    /** @yamlKey ttp229_id */
    ttp229Id?: RefProp<ttp229_lsf_TTP229LSFComponent>;
    channel: number;
}
interface TuyaProps extends _CoreComponent {
    /** @yamlKey tuya_id */
    tuyaId?: RefProp<tuya_Tuya>;
    /** @yamlKey sensor_datapoint */
    sensorDatapoint: number;
}
interface UdpProps {
    /** int: The destination UDP port number to use. Defaults to `18511`. Different listen and broadcast ports can be specifi... */
    port?: number;
    /**
     * IPv4 address: Changes to multicast, adding an address to listen to. Defaults to no multicast address, just local netw...
     * @yamlKey listen_address
     */
    listenAddress?: unknown;
    /** list of IPv4 addresses: One or more IP addresses to broadcast data to. Defaults to `255.255.255.255` which is the loc... */
    addresses?: Array<unknown>;
    /** @yamlKey on_receive */
    onReceive?: () => void;
    providers?: unknown;
    encryption?: unknown;
    /** @yamlKey ping_pong_enable */
    pingPongEnable?: unknown;
    /** @yamlKey rolling_code_enable */
    rollingCodeEnable?: unknown;
    sensors?: unknown;
    /** @yamlKey binary_sensors */
    binarySensors?: unknown;
}
interface VbusDeltasolBsPlusProps extends _CoreComponent {
    /** @yamlKey vbus_id */
    vbusId?: RefProp<vbus_VBus>;
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
    /** @yamlKey collector_max */
    collectorMax?: VbusDeltasolBsPlusCollectorMaxProps;
    /** @yamlKey collector_min */
    collectorMin?: VbusDeltasolBsPlusCollectorMinProps;
    /** @yamlKey collector_frost */
    collectorFrost?: VbusDeltasolBsPlusCollectorFrostProps;
    /** @yamlKey tube_collector */
    tubeCollector?: VbusDeltasolBsPlusTubeCollectorProps;
    recooling?: VbusDeltasolBsPlusRecoolingProps;
    hqm?: VbusDeltasolBsPlusHqmProps;
}
interface VbusDeltasolBs2009Props extends _CoreComponent {
    /** @yamlKey vbus_id */
    vbusId?: RefProp<vbus_VBus>;
    /** @yamlKey sensor1_error */
    sensor1Error?: VbusDeltasolBs2009Sensor1ErrorProps;
    /** @yamlKey sensor2_error */
    sensor2Error?: VbusDeltasolBs2009Sensor2ErrorProps;
    /** @yamlKey sensor3_error */
    sensor3Error?: VbusDeltasolBs2009Sensor3ErrorProps;
    /** @yamlKey sensor4_error */
    sensor4Error?: VbusDeltasolBs2009Sensor4ErrorProps;
    /** @yamlKey frost_protection_active */
    frostProtectionActive?: VbusDeltasolBs2009FrostProtectionActiveProps;
}
interface VbusDeltasolBs2Props extends _CoreComponent {
    /** @yamlKey vbus_id */
    vbusId?: RefProp<vbus_VBus>;
    /** @yamlKey sensor1_error */
    sensor1Error?: VbusDeltasolBs2Sensor1ErrorProps;
    /** @yamlKey sensor2_error */
    sensor2Error?: VbusDeltasolBs2Sensor2ErrorProps;
    /** @yamlKey sensor3_error */
    sensor3Error?: VbusDeltasolBs2Sensor3ErrorProps;
    /** @yamlKey sensor4_error */
    sensor4Error?: VbusDeltasolBs2Sensor4ErrorProps;
}
interface VbusDeltasolCProps extends _CoreComponent {
    /** @yamlKey vbus_id */
    vbusId?: RefProp<vbus_VBus>;
    /** @yamlKey sensor1_error */
    sensor1Error?: VbusDeltasolCSensor1ErrorProps;
    /** @yamlKey sensor2_error */
    sensor2Error?: VbusDeltasolCSensor2ErrorProps;
    /** @yamlKey sensor3_error */
    sensor3Error?: VbusDeltasolCSensor3ErrorProps;
    /** @yamlKey sensor4_error */
    sensor4Error?: VbusDeltasolCSensor4ErrorProps;
}
interface VbusDeltasolCs2Props extends _CoreComponent {
    /** @yamlKey vbus_id */
    vbusId?: RefProp<vbus_VBus>;
    /** @yamlKey sensor1_error */
    sensor1Error?: VbusDeltasolCs2Sensor1ErrorProps;
    /** @yamlKey sensor2_error */
    sensor2Error?: VbusDeltasolCs2Sensor2ErrorProps;
    /** @yamlKey sensor3_error */
    sensor3Error?: VbusDeltasolCs2Sensor3ErrorProps;
    /** @yamlKey sensor4_error */
    sensor4Error?: VbusDeltasolCs2Sensor4ErrorProps;
}
interface VbusDeltasolCsPlusProps extends _CoreComponent {
    /** @yamlKey vbus_id */
    vbusId?: RefProp<vbus_VBus>;
    /** @yamlKey sensor1_error */
    sensor1Error?: VbusDeltasolCsPlusSensor1ErrorProps;
    /** @yamlKey sensor2_error */
    sensor2Error?: VbusDeltasolCsPlusSensor2ErrorProps;
    /** @yamlKey sensor3_error */
    sensor3Error?: VbusDeltasolCsPlusSensor3ErrorProps;
    /** @yamlKey sensor4_error */
    sensor4Error?: VbusDeltasolCsPlusSensor4ErrorProps;
}
interface VbusCustomProps extends _CoreComponent {
    /** @yamlKey vbus_id */
    vbusId?: RefProp<vbus_VBus>;
    command?: number;
    source?: number;
    dest?: number;
    /** @yamlKey binary_sensors */
    binarySensors?: Array<VbusCustomBinarySensorsProps>;
}
interface WireguardProps {
    /** @yamlKey wireguard_id */
    wireguardId?: RefProp<wireguard_Wireguard>;
    status?: WireguardStatusProps;
    enabled?: WireguardEnabledProps;
}
interface XiaomiRtcgq02lmProps {
    id?: RefProp<xiaomi_rtcgq02lm_XiaomiRTCGQ02LM>;
    motion?: XiaomiRtcgq02lmMotionProps;
    light?: XiaomiRtcgq02lmLightProps;
    button?: XiaomiRtcgq02lmButtonProps;
}
export type BinarySensorProps = (BinarySensorBaseProps & {
    platform: "analog_threshold";
} & AnalogThresholdProps & ComponentProps<analog_threshold_AnalogThresholdBinarySensor>) | (BinarySensorBaseProps & {
    platform: "as3935";
} & As3935Props & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "ble_presence";
} & BlePresenceProps & ComponentProps<ble_presence_BLEPresenceDevice>) | (BinarySensorBaseProps & {
    platform: "copy";
} & CopyProps & ComponentProps<copy_CopyBinarySensor>) | (BinarySensorBaseProps & {
    platform: "cst226";
} & Cst226Props & ComponentProps<cst226_CST226Button>) | (BinarySensorBaseProps & {
    platform: "custom";
} & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "gpio";
} & GpioProps & ComponentProps<gpio_GPIOBinarySensor>) | (BinarySensorBaseProps & {
    platform: "gt911";
} & Gt911Props & ComponentProps<gt911_GT911Button>) | (BinarySensorBaseProps & {
    platform: "haier";
} & HaierProps & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "homeassistant";
} & HomeassistantProps & ComponentProps<homeassistant_HomeassistantBinarySensor>) | (BinarySensorBaseProps & {
    platform: "hydreon_rgxx";
} & HydreonRgxxProps & ComponentProps<hydreon_rgxx_HydreonRGxxBinaryComponent>) | (BinarySensorBaseProps & {
    platform: "nextion";
} & NextionProps & ComponentProps<nextion_NextionBinarySensor>) | (BinarySensorBaseProps & {
    platform: "nfc";
} & NfcProps & ComponentProps<nfc_NfcTagBinarySensor>) | (BinarySensorBaseProps & {
    platform: "packet_transport";
    type: "data";
} & PacketTransportDataProps & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "packet_transport";
    type: "status";
} & PacketTransportStatusProps & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "qwiic_pir";
} & QwiicPirProps & ComponentProps<qwiic_pir_QwiicPIRComponent>) | (BinarySensorBaseProps & {
    platform: "rc522";
} & Rc522Props & ComponentProps<rc522_RC522BinarySensor>) | (BinarySensorBaseProps & {
    platform: "sdl";
} & SdlProps & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "status";
} & StatusProps & ComponentProps<status_StatusBinarySensor>) | (BinarySensorBaseProps & {
    platform: "switch";
} & SwitchProps & ComponentProps<switch__SwitchBinarySensor>) | (BinarySensorBaseProps & {
    platform: "tm1637";
} & Tm1637Props & ComponentProps<tm1637_TM1637Key>) | (BinarySensorBaseProps & {
    platform: "tm1638";
} & Tm1638Props & ComponentProps<tm1638_TM1638Key>) | (BinarySensorBaseProps & {
    platform: "touchscreen";
} & TouchscreenProps & ComponentProps<touchscreen_TouchscreenBinarySensor>) | (BinarySensorBaseProps & {
    platform: "tt21100";
} & Tt21100Props & ComponentProps<tt21100_TT21100Button>) | (BinarySensorBaseProps & {
    platform: "xiaomi_cgpr1";
} & XiaomiCgpr1Props & ComponentProps<xiaomi_cgpr1_XiaomiCGPR1>) | (BinarySensorBaseProps & {
    platform: "xiaomi_mjyd02yla";
} & XiaomiMjyd02ylaProps & ComponentProps<xiaomi_mjyd02yla_XiaomiMJYD02YLA>) | (BinarySensorBaseProps & {
    platform: "xiaomi_mue4094rt";
} & XiaomiMue4094rtProps & ComponentProps<xiaomi_mue4094rt_XiaomiMUE4094RT>) | (BinarySensorBaseProps & {
    platform: "xiaomi_wx08zm";
} & XiaomiWx08zmProps & ComponentProps<xiaomi_wx08zm_XiaomiWX08ZM>) | (BinarySensorBaseProps & {
    platform: "apds9960";
} & Apds9960Props & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "cap1188";
} & Cap1188Props & ComponentProps<cap1188_CAP1188Channel>) | (BinarySensorBaseProps & {
    platform: "cst816";
} & Cst816Props & ComponentProps<cst816_CST816Touchscreen>) | (BinarySensorBaseProps & {
    platform: "daly_bms";
} & DalyBmsProps & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "dfrobot_sen0395";
} & DfrobotSen0395Props & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "esp32_touch";
} & Esp32TouchProps & ComponentProps<esp32_touch_ESP32TouchBinarySensor>) | (BinarySensorBaseProps & {
    platform: "ezo_pmp";
} & EzoPmpProps & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "fingerprint_grow";
} & FingerprintGrowProps & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "gdk101";
} & Gdk101Props & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "hlk_fm22x";
} & HlkFm22xProps & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "ld2410";
} & Ld2410Props & ComponentProps<EntityBase>) | (BinarySensorBaseProps & {
    platform: "ld2412";
} & Ld2412Props & ComponentProps<EntityBase>) | (BinarySensorBaseProps & {
    platform: "ld2420";
} & Ld2420Props & ComponentProps<ld2420_LD2420BinarySensor>) | (BinarySensorBaseProps & {
    platform: "ld2450";
} & Ld2450Props & ComponentProps<EntityBase>) | (BinarySensorBaseProps & {
    platform: "lvgl";
} & LvglProps & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "m5stack_8angle";
} & M5stack8angleProps & ComponentProps<m5stack_8angle_M5Stack8AngleSwitchBinarySensor>) | (BinarySensorBaseProps & {
    platform: "matrix_keypad";
} & MatrixKeypadProps & ComponentProps<matrix_keypad_MatrixKeypadBinarySensor>) | (BinarySensorBaseProps & {
    platform: "modbus_controller";
} & ModbusControllerProps & ComponentProps<modbus_controller_ModbusBinarySensor>) | (BinarySensorBaseProps & {
    platform: "mpr121";
} & Mpr121Props & ComponentProps<mpr121_MPR121BinarySensor>) | (BinarySensorBaseProps & {
    platform: "msa3xx";
} & Msa3xxProps & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "opentherm";
} & OpenthermProps & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "pipsolar";
} & PipsolarProps & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "pn532";
} & Pn532Props & ComponentProps<pn532_PN532BinarySensor>) | (BinarySensorBaseProps & {
    platform: "rc522_spi";
} & Rc522SpiProps & ComponentProps<rc522_RC522BinarySensor>) | (BinarySensorBaseProps & {
    platform: "rd03d";
} & Rd03dProps & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "rdm6300";
} & Rdm6300Props & ComponentProps<rdm6300_RDM6300BinarySensor>) | (BinarySensorBaseProps & {
    platform: "remote_receiver";
} & RemoteReceiverProps & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "seeed_mr24hpc1";
} & SeeedMr24hpc1Props & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "seeed_mr60bha2";
} & SeeedMr60bha2Props & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "seeed_mr60fda2";
} & SeeedMr60fda2Props & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "sim800l";
} & Sim800lProps & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "sx1509";
} & Sx1509Props & ComponentProps<sx1509_SX1509BinarySensor>) | (BinarySensorBaseProps & {
    platform: "sy6970";
} & Sy6970Props & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "template";
} & TemplateProps & ComponentProps<template__TemplateBinarySensor>) | (BinarySensorBaseProps & {
    platform: "ttp229_bsf";
} & Ttp229BsfProps & ComponentProps<ttp229_bsf_TTP229BSFChannel>) | (BinarySensorBaseProps & {
    platform: "ttp229_lsf";
} & Ttp229LsfProps & ComponentProps<ttp229_lsf_TTP229Channel>) | (BinarySensorBaseProps & {
    platform: "tuya";
} & TuyaProps & ComponentProps<tuya_TuyaBinarySensor>) | (BinarySensorBaseProps & {
    platform: "udp";
} & UdpProps & ComponentProps<udp_UDPComponent>) | (BinarySensorBaseProps & {
    platform: "vbus";
    model: "deltasol_bs_plus";
} & VbusDeltasolBsPlusProps & ComponentProps<vbus_DeltaSolBSPlusBSensor>) | (BinarySensorBaseProps & {
    platform: "vbus";
    model: "deltasol_bs_2009";
} & VbusDeltasolBs2009Props & ComponentProps<vbus_DeltaSolBS2009BSensor>) | (BinarySensorBaseProps & {
    platform: "vbus";
    model: "deltasol_bs2";
} & VbusDeltasolBs2Props & ComponentProps<vbus_DeltaSolBS2BSensor>) | (BinarySensorBaseProps & {
    platform: "vbus";
    model: "deltasol_c";
} & VbusDeltasolCProps & ComponentProps<vbus_DeltaSolCBSensor>) | (BinarySensorBaseProps & {
    platform: "vbus";
    model: "deltasol_cs2";
} & VbusDeltasolCs2Props & ComponentProps<vbus_DeltaSolCS2BSensor>) | (BinarySensorBaseProps & {
    platform: "vbus";
    model: "deltasol_cs_plus";
} & VbusDeltasolCsPlusProps & ComponentProps<vbus_DeltaSolCSPlusBSensor>) | (BinarySensorBaseProps & {
    platform: "vbus";
    model: "custom";
} & VbusCustomProps & ComponentProps<vbus_VBusCustomBSensor>) | (BinarySensorBaseProps & {
    platform: "wireguard";
} & WireguardProps & ComponentProps<binary_sensor_BinarySensor>) | (BinarySensorBaseProps & {
    platform: "xiaomi_rtcgq02lm";
} & XiaomiRtcgq02lmProps & ComponentProps<binary_sensor_BinarySensor>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            binary_sensor: BinarySensorProps;
        }
    }
}
