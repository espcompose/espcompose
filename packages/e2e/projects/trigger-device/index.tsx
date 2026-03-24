/**
 * Sample project: trigger-device
 *
 * Demonstrates the automation API: useRef with marker types for typed component
 * actions, arrow function triggers, and named script functions that call ref actions.
 */
import { ESPCompose, delay, logger, useRef } from '@esphome/compose';
import type { output_FloatOutput, light_LightOutput, switch__Switch } from '@esphome/compose';

const lightRef = useRef<light_LightOutput>();
const switchRef = useRef<switch__Switch>();
const outputRef = useRef<output_FloatOutput>();

/**
 * Named script: toggleAll
 * Toggles both the light and switch, with a delay between.
 */
function toggleAll(): void {
  lightRef.toggle();
  delay(200);
  switchRef.toggle();
}

/**
 * Named script: dimLight
 * Turns the light on at half brightness.
 */
function dimLight(): void {
  lightRef.turnOn({ brightness: 0.5 });
  logger.log('Light dimmed to 50%');
}

export default (
  <esphome name="trigger-device" comment="Device demonstrating automation API">
    <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
    <wifi ssid="HomeWifi" password="s3cr3t!!" />
    <api />
    <logger level="DEBUG" />
    <output platform="ledc" ref={outputRef} pin={19} frequency="1000Hz" />
    <light ref={lightRef} platform="monochromatic" name="Desk Light" output={outputRef} />
    <switch ref={switchRef} platform="gpio" pin={5} name="Relay" />
    <binary_sensor
      platform="gpio"
      pin={4}
      name="Button"
      onPress={toggleAll}
      onRelease={() => {
        lightRef.turnOff();
        delay(100);
        switchRef.turnOff();
      }}
      onDoubleClick={dimLight}
    />
  </esphome>
);
