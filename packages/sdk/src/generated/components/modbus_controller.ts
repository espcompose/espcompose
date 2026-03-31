// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, EmbedValue, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { modbus_Modbus, modbus_controller_ModbusController } from "../markers";
export interface ModbusControllerServerCourtesyResponseProps {
    /** boolean: Whether to enable the courtesy response feature. Defaults to `false`. */
    enabled?: boolean | EmbedValue<boolean>;
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
    address: number | EmbedValue<number>;
    /**
     * datatype of the mod_bus register data. The default data type for ModBUS is a 16 bit integer in big endian format (net...
     * @yamlKey value_type
     */
    valueType?: "RAW" | "U_WORD" | "S_WORD" | "U_DWORD" | "U_DWORD_R" | "S_DWORD" | "S_DWORD_R" | "U_QWORD" | "U_QWORD_R" | "S_QWORD" | "S_QWORD_R" | "FP32" | "FP32_R";
    /**
     * [lambda](/automations/templates#config-lambda): Lambda that returns the value of this register.
     * @yamlKey read_lambda
     */
    readLambda: unknown;
    /**
     * [lambda](/automations/templates#config-lambda): Lambda that sets the value of this register. A variable `x` of the ap...
     * @yamlKey write_lambda
     */
    writeLambda?: unknown;
}
export interface ModbusControllerProps extends _CoreComponent {
    /**
     * boolean: Whether to allow duplicate commands in the queue. Defaults to `false`.
     * @yamlKey allow_duplicate_commands
     */
    allowDuplicateCommands?: boolean | EmbedValue<boolean>;
    /**
     * [Time](/guides/configuration-types#time): minimum time in between 2 requests to the device. Default is `0ms`. Some Mo...
     * @yamlKey command_throttle
     */
    commandThrottle?: TimePeriod;
    /**
     * Configuration block to enable the courtesy response feature when the device is acting as a Modbus server.
     * @yamlKey server_courtesy_response
     */
    serverCourtesyResponse?: ModbusControllerServerCourtesyResponseProps;
    /**
     * integer: How many times a command will be retried if no response is received. It doesn't include the initial transmit...
     * @yamlKey max_cmd_retries
     */
    maxCmdRetries?: number | EmbedValue<number>;
    /**
     * integer: When a slave doesn't respond to a command, it is marked as offline, you can specify how many updates will be...
     * @yamlKey offline_skip_updates
     */
    offlineSkipUpdates?: number | EmbedValue<number>;
    /**
     * A list of registers that are responded to when acting as a server.
     * @yamlKey server_registers
     */
    serverRegisters?: Array<ModbusControllerServerRegistersProps>;
    /**
     * [Automation](/automations): An automation to perform when a modbus command has been sent. See [`on_command_sent`](htt...
     * @yamlKey on_command_sent
     */
    onCommandSent?: TriggerHandler;
    /**
     * [Automation](/automations): An automation to perform when a modbus controller goes online. See [`on_online`](https://...
     * @yamlKey on_online
     */
    onOnline?: TriggerHandler;
    /**
     * [Automation](/automations): An automation to perform when a modbus controller goes offline. See [`on_offline`](https:...
     * @yamlKey on_offline
     */
    onOffline?: TriggerHandler;
    /**
     * [Time](/guides/configuration-types#time): The interval that the sensors should be checked. Defaults to 60 seconds.
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the `modbus` hub.
     * @yamlKey modbus_id
     */
    modbusId?: RefProp<modbus_Modbus>;
    /** int: start address of the first register in a range (can be decimal or hexadecimal). */
    address?: number;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            modbus_controller: ModbusControllerProps & ComponentProps<modbus_controller_ModbusController>;
        }
    }
}
