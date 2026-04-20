// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_modbus_Modbus, __marker_modbus_controller_ModbusController } from "../markers";
export interface ModbusControllerServerCourtesyResponseProps {
    /** boolean: Whether to enable the courtesy response feature. Defaults to `false`. */
    enabled?: boolean;
    /**
     * integer: The highest Modbus register address (inclusive) up to which undefined registers are allowed to be read and w...
     * @yamlKey register_last_address
     */
    registerLastAddress?: number;
    /**
     * integer: The 16-bit value (range: 0–65535) to return for undefined registers within the address range defined by `reg...
     * @yamlKey register_value
     */
    registerValue?: number;
}
export interface ModbusControllerServerRegistersProps {
    /** integer: start address of the first register in a range */
    address: number;
    /**
     * [lambda](https://esphome.io/automations/templates#config-lambda): Lambda that returns the value of this register.
     * @yamlKey read_lambda
     */
    readLambda: unknown;
    /**
     * datatype of the mod_bus register data. The default data type for ModBUS is a 16 bit integer in big endian format (net...
     * @yamlKey value_type
     */
    valueType?: "FP32" | "FP32_R" | "RAW" | "S_DWORD" | "S_DWORD_R" | "S_QWORD" | "S_QWORD_R" | "S_WORD" | "U_DWORD" | "U_DWORD_R" | "U_QWORD" | "U_QWORD_R" | "U_WORD";
    /**
     * [lambda](https://esphome.io/automations/templates#config-lambda): Lambda that sets the value of this register. A vari...
     * @yamlKey write_lambda
     */
    writeLambda?: unknown;
}
export interface ModbusControllerProps extends _CoreComponent {
    /** int: start address of the first register in a range (can be decimal or hexadecimal). */
    address: number;
    /**
     * boolean: Whether to allow duplicate commands in the queue. Defaults to `false`.
     * @yamlKey allow_duplicate_commands
     */
    allowDuplicateCommands?: boolean;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): minimum time in between 2 requests to the device. Default...
     * @yamlKey command_throttle
     */
    commandThrottle?: TimePeriod;
    /**
     * integer: How many times a command will be retried if no response is received. It doesn't include the initial transmit...
     * @yamlKey max_cmd_retries
     */
    maxCmdRetries?: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the `modbus` hub.
     * @yamlKey modbus_id
     */
    modbusId?: RefProp<__marker_modbus_Modbus>;
    /**
     * integer: When a slave doesn't respond to a command, it is marked as offline, you can specify how many updates will be...
     * @yamlKey offline_skip_updates
     */
    offlineSkipUpdates?: number;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a modbus command has been sent. See [`on_...
     * @yamlKey on_command_sent
     */
    onCommandSent?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a modbus controller goes offline. See [`o...
     * @yamlKey on_offline
     */
    onOffline?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a modbus controller goes online. See [`on...
     * @yamlKey on_online
     */
    onOnline?: TriggerHandler;
    /**
     * Configuration block to enable the courtesy response feature when the device is acting as a Modbus server.
     * @yamlKey server_courtesy_response
     */
    serverCourtesyResponse?: ModbusControllerServerCourtesyResponseProps;
    /**
     * A list of registers that are responded to when acting as a server.
     * @yamlKey server_registers
     */
    serverRegisters?: Array<ModbusControllerServerRegistersProps>;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The interval that the sensors should be checked. Defaults...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            modbus_controller: ModbusControllerProps & ComponentProps<__marker_modbus_controller_ModbusController>;
        }
    }
}
