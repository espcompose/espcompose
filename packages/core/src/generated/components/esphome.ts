// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TriggerHandler } from "../../types";
import type { __marker_Area } from "../markers";
export interface EsphomeProjectProps {
    /** string: Name of the project */
    name: string;
    /** string: Version of the project */
    version: string;
    /**
     * [Automation](/automations): An automation to perform when the device firmware is updated. This compares the above `ve...
     * @yamlKey on_update
     */
    onUpdate?: TriggerHandler;
}
export interface EsphomeAreasProps {
    name: unknown;
}
export interface EsphomeDevicesProps {
    name: unknown;
    /** @yamlKey area_id */
    areaId?: RefProp<__marker_Area>;
}
export interface EsphomeProps {
    /** string: This is the name of the node. It should always be unique in your ESPHome network. May only contain lowercase ... */
    name: string;
    /**
     * string: This name is sent to the frontend and used by Home Assistant as the integration and device name. It also gets...
     * @yamlKey friendly_name
     */
    friendlyName?: string;
    /** string or [Area Configuration](https://esphome.io/components/esphome#esphome-area): The area configuration for this d... */
    area?: unknown;
    /** string: Additional text information about this node. Only for display in UI. */
    comment?: string;
    /**
     * string: Customize where ESPHome will store the build files for your node. By default, ESPHome puts the PlatformIO pro...
     * @yamlKey build_path
     */
    buildPath?: string;
    /**
     * mapping: Additional options to pass over to PlatformIO in the platformio.ini file. See [`platformio_options`](https:/...
     * @yamlKey platformio_options
     */
    platformioOptions?: Record<string, string>;
    /**
     * mapping: Environment variables to set during the build process. See [`environment_variables`](https://esphome.io/comp...
     * @yamlKey environment_variables
     */
    environmentVariables?: Record<string, string>;
    /**
     * [Automation](/automations): An automation to perform when the node starts. See [`on_boot`](https://esphome.io/compone...
     * @yamlKey on_boot
     */
    onBoot?: TriggerHandler;
    /**
     * [Automation](/automations): An automation to perform right before the node shuts down. See [`on_shutdown`](https://es...
     * @yamlKey on_shutdown
     */
    onShutdown?: TriggerHandler;
    /**
     * [Automation](/automations): An automation to perform on each `loop()` iteration. See [`on_loop`](https://esphome.io/c...
     * @yamlKey on_loop
     */
    onLoop?: TriggerHandler;
    /** list of files: A list of C/C++ files to include in the (auto-generated) `main` file. The paths in this list are relat... */
    includes?: Array<unknown>;
    /**
     * list of files: The same as `includes` but for files that require C linkage. All includes will be wrapped in `extern "...
     * @yamlKey includes_c
     */
    includesC?: Array<unknown>;
    /** list of libraries: A list of libraries to include in the project. See [`libraries`](https://esphome.io/components/esp... */
    libraries?: Array<string>;
    /**
     * boolean: Appends the last 3 bytes of the mac address of the device to the name in the form `<name>-aabbcc`. Defaults ...
     * @yamlKey name_add_mac_suffix
     */
    nameAddMacSuffix?: boolean;
    /**
     * boolean: If set, the scheduler will print debug information about scheduled tasks at log level DEBUG.
     * @yamlKey debug_scheduler
     */
    debugScheduler?: boolean;
    /** ESPHome Creator's Project information. See [Project information](https://esphome.io/components/esphome#esphome-creato... */
    project?: EsphomeProjectProps;
    /**
     * string: The minimum ESPHome version required to compile this configuration. See [Minimum ESPHome version](https://esp...
     * @yamlKey min_version
     */
    minVersion?: string;
    /**
     * int: The maximum number of simultaneous compile processes to run. Defaults to the number of cores of the CPU which is...
     * @yamlKey compile_process_limit
     */
    compileProcessLimit?: number;
    /** list of [Area Configuration](https://esphome.io/components/esphome#esphome-area): Additional areas that can be refere... */
    areas?: Array<EsphomeAreasProps>;
    /** list of [Sub-Devices](https://esphome.io/components/esphome#esphome-devices): Sub-devices to group entities under. */
    devices?: Array<EsphomeDevicesProps>;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            esphome: EsphomeProps & ComponentProps;
        }
    }
}
