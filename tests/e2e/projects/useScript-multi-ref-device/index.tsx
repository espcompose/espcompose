/**
 * E2E project: useScript-multi-ref-device
 *
 * Validates the multi-instance ref dedup pattern enabled by Phase 2 of the
 * canonical execution model.
 *
 * Three buttons each trigger a blink script on a different `LightOutputRef`.
 * A shared helper function `makeBlinkButton` produces the `useScript()` call
 * AND the button JSX, ensuring the compiled body is identical across all
 * call sites (same body hash) and the `.execute()` call is in the same
 * scope as `useScript()` (so the transformer recognizes the script handle).
 *
 * Expected output:
 *   - Single ESPHome script with `closure_index: int` parameter
 *   - Generated C++ typed-pointer lookup array via `decltype(id(X))*`
 *   - 3 call sites, each passing `closure_index: 0|1|2`
 *   - Lambda body references the lookup array for toggle actions
 */
import { delay, useRef, useScript } from '@espcompose/core';
import type { LightOutputRef, FloatOutputRef, Ref } from '@espcompose/core';

function makeBlinkButton(light: Ref<LightOutputRef>, pin: number, name: string) {
  const blink = useScript(async () => {
    light.toggle();
    await delay(100);
    light.toggle();
  });
  return (
    <binary_sensor platform="gpio" pin={pin} name={name}
      onPress={() => { blink.execute(); }}
    />
  );
}

function App() {
  const out1 = useRef<FloatOutputRef>();
  const out2 = useRef<FloatOutputRef>();
  const out3 = useRef<FloatOutputRef>();
  const kitchen = useRef<LightOutputRef>();
  const bedroom = useRef<LightOutputRef>();
  const living = useRef<LightOutputRef>();

  return (
    <esphome name="usescript-multi-ref-device" comment="Multi-instance ref dedup test">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid="HomeWifi" password="pass1234" />
      <api />
      <logger level="DEBUG" />

      <output platform="ledc" ref={out1} pin={18} frequency="1000Hz" />
      <output platform="ledc" ref={out2} pin={19} frequency="1000Hz" />
      <output platform="ledc" ref={out3} pin={21} frequency="1000Hz" />

      <light ref={kitchen} platform="monochromatic" name="Kitchen" output={out1} />
      <light ref={bedroom} platform="monochromatic" name="Bedroom" output={out2} />
      <light ref={living}  platform="monochromatic" name="Living"  output={out3} />

      {makeBlinkButton(kitchen, 4, "Btn Kitchen")}
      {makeBlinkButton(bedroom, 12, "Btn Bedroom")}
      {makeBlinkButton(living, 13, "Btn Living")}
    </esphome>
  );
}

export default <App />;
