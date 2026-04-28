/**
 * E2E project: useScript-mixed-bindings-device
 *
 * Validates that a single deduped script can carry multiple ref bindings
 * of different component types in its closure shape. Each call site
 * provides different (light, switch) ref pairs.
 *
 * Expected output:
 *   - Single ESPHome script with `closure_index: int` parameter
 *   - Closure struct with two int fields: `light_idx` and `sw_idx`
 *   - Two typed-pointer lookup arrays (one for lights, one for switches)
 *   - 2 call sites passing `closure_index: 0|1`
 *   - Lambda body toggles both via lookup arrays
 */
import { delay, useRef, useScript } from '@espcompose/core';
import type { LightOutputRef, FloatOutputRef, SwitchRef, Ref } from '@espcompose/core';

function makeTogglePairButton(
  light: Ref<LightOutputRef>,
  sw: Ref<SwitchRef>,
  pin: number,
  name: string,
) {
  const toggle = useScript(async () => {
    light.toggle();
    await delay(50);
    sw.toggle();
  });
  return (
    <binary_sensor platform="gpio" pin={pin} name={name}
      onPress={() => { toggle.execute(); }}
    />
  );
}

function App() {
  const out1 = useRef<FloatOutputRef>();
  const out2 = useRef<FloatOutputRef>();
  const kitchenLight = useRef<LightOutputRef>();
  const bedroomLight = useRef<LightOutputRef>();
  const kitchenSwitch = useRef<SwitchRef>();
  const bedroomSwitch = useRef<SwitchRef>();

  return (
    <esphome name="usescript-mixed-bindings-device" comment="Mixed closure bindings test">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid="HomeWifi" password="pass1234" />
      <api />
      <logger level="DEBUG" />

      <output platform="ledc" ref={out1} pin={18} frequency="1000Hz" />
      <output platform="ledc" ref={out2} pin={19} frequency="1000Hz" />

      <light ref={kitchenLight} platform="monochromatic" name="Kitchen Light" output={out1} />
      <light ref={bedroomLight} platform="monochromatic" name="Bedroom Light" output={out2} />

      <switch ref={kitchenSwitch} platform="gpio" pin={5} name="Kitchen Switch" />
      <switch ref={bedroomSwitch} platform="gpio" pin={12} name="Bedroom Switch" />

      {makeTogglePairButton(kitchenLight, kitchenSwitch, 4, "Btn Kitchen")}
      {makeTogglePairButton(bedroomLight, bedroomSwitch, 13, "Btn Bedroom")}
    </esphome>
  );
}

export default <App />;
