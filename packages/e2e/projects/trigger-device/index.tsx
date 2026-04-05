/**
 * Sample project: trigger-device
 *
 * Demonstrates the automation API: useRef with marker types for typed component
 * actions, createScript() triggers, and bare arrow functions for anonymous triggers.
 * Ref actions are resolved at compile time via the action tree compiler.
 */
import { delay, logger, useRef, useScript } from '@espcompose/core';
import type { FloatOutputRef, LightOutputRef, SwitchRef } from '@espcompose/core';

function App() {
  const lightRef = useRef<LightOutputRef>();
  const switchRef = useRef<SwitchRef>();
  const outputRef = useRef<FloatOutputRef>();

  /** Named script: toggleAll — toggles both the light and switch, with a delay between. */
  const toggleAll = useScript(async () => {
    lightRef.toggle();
    await delay(200);
    switchRef.toggle();
  });

  /** Named script: dimLight — turns the light on at half brightness. */
  const dimLight = useScript(async () => {
    lightRef.turnOn({ brightness: 0.5 });
    logger.log('Light dimmed to 50%');
  });

  return (
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
        onPress={async () => { await toggleAll(); }}
        onRelease={async () => {
          lightRef.turnOff();
          await delay(100);
          switchRef.turnOff();
        }}
        onDoubleClick={async () => { await dimLight(); }}
      />
    </esphome>
  );
}

export default <App />;
