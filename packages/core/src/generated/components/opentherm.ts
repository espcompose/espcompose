// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_opentherm_OpenthermHub, __marker_sensor_Sensor } from "../markers";
export interface OpenthermProps extends _CoreComponent {
    /**
     * number: The pin of the OpenTherm hardware bridge which is usually labeled `out` on the board.
     * @yamlKey in_pin
     */
    inPin: Pin;
    /**
     * number: The pin of the OpenTherm hardware bridge which is usually labeled `in` on the board.
     * @yamlKey out_pin
     */
    outPin: Pin;
    /** @yamlKey ch_enable */
    chEnable?: boolean;
    /** @yamlKey dhw_enable */
    dhwEnable?: boolean;
    /** @yamlKey cooling_enable */
    coolingEnable?: boolean;
    /** @yamlKey otc_active */
    otcActive?: boolean;
    /** @yamlKey ch2_active */
    ch2Active?: boolean;
    /** @yamlKey summer_mode_active */
    summerModeActive?: boolean;
    /** @yamlKey dhw_block */
    dhwBlock?: boolean;
    /**
     * boolean: Synchronous communication mode prevents other components from disabling interrupts while we are talking to t...
     * @yamlKey sync_mode
     */
    syncMode?: boolean;
    /** @yamlKey before_send */
    beforeSend?: TriggerHandler;
    /** @yamlKey before_process_response */
    beforeProcessResponse?: TriggerHandler;
    /** @yamlKey t_set */
    tSet?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey t_set_ch2 */
    tSetCh2?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey cooling_control */
    coolingControl?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey t_dhw_set */
    tDhwSet?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey max_t_set */
    maxTSet?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey t_room_set */
    tRoomSet?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey t_room_set_ch2 */
    tRoomSetCh2?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey t_room */
    tRoom?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey max_rel_mod_level */
    maxRelModLevel?: RefProp<__marker_sensor_Sensor>;
    /** @yamlKey otc_hc_ratio */
    otcHcRatio?: RefProp<__marker_sensor_Sensor>;
    /**
     * byte [0-255]: Controller product type
     * @yamlKey controller_product_type
     */
    controllerProductType?: number;
    /**
     * byte [0-255]: Controller product version
     * @yamlKey controller_product_version
     */
    controllerProductVersion?: number;
    /**
     * float: Version of OpenTherm implemented by controller
     * @yamlKey opentherm_version_controller
     */
    openthermVersionController?: number;
    /**
     * byte [0-255]: Controller configuration
     * @yamlKey controller_configuration
     */
    controllerConfiguration?: number;
    /**
     * byte [0-255]: Controller ID code
     * @yamlKey controller_id
     */
    controllerId?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            opentherm: OpenthermProps & ComponentProps<__marker_opentherm_OpenthermHub>;
        }
    }
}
