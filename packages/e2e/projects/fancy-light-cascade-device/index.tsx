/**
 * E2E project: fancy-light-cascade-device
 *
 * Validates ReactiveNode propagation through a 3-layer component cascade:
 *   App (entity bindings + memos) → FancyLightButton → LightButton → Button → lvgl-button + lvgl-label
 *
 * The reactive label memos are created at the top level (where useHAEntity()
 * and useMemo() are statically resolvable by the compiler), then the resulting
 * ReactiveNode values flow as props through 3 component layers down to the
 * leaf <lvgl-button> + <lvgl-label> widgets.
 *
 * Expected compiler output:
 *   - HA sensor + light entity signals
 *   - Memo chain (sensor.value → statusText, light.isOn → label)
 *   - Theme signals wired through Button internals
 *   - Widget bindings receiving reactive values that traversed 3 component layers
 */
import { DisplayRef, useRef, useHAEntity, useMemo, theme } from '@espcompose/core';
import type { EspComposeElement, TriggerHandler, BindProp } from '@espcompose/core';
import {
  Screen,
  VStack,
  Button,
  ThemeProvider,
  darkTheme,
  lightTheme,
} from '@espcompose/ui';
import type { StatusToken } from '@espcompose/ui';

// ── Layer 3 (innermost): LightButton ──────────────────────────────────────
// Wraps the design-system Button, forwarding reactive label and actions.

interface LightButtonProps {
  label: BindProp<string>;
  status: StatusToken;
  onPress?: TriggerHandler;
}

function LightButton(props: LightButtonProps): EspComposeElement {
  return (
    <Button
      text={props.label}
      status={props.status}
      onPress={props.onPress}
    />
  );
}

// ── Layer 2: FancyLightButton ─────────────────────────────────────────────
// Receives a reactive label (already a ReactiveNode from useMemo) and
// forwards it through to LightButton. Tests that ReactiveNodes survive
// prop passing through multiple component layers.

interface FancyLightButtonProps {
  label: BindProp<string>;
  status: StatusToken;
  onPress?: TriggerHandler;
}

function FancyLightButton(props: FancyLightButtonProps): EspComposeElement {
  return (
    <LightButton
      label={props.label}
      status={props.status}
      onPress={props.onPress}
    />
  );
}

// ── Layer 1 (top-level): App ──────────────────────────────────────────────
// Entity bindings and memos live here (the compiler requires literal entity
// IDs and statically analyzable useMemo bodies). The resulting ReactiveNodes
// flow down through FancyLightButton → LightButton → Button.

function App() {
  const displayRef = useRef<DisplayRef>();
  const tempSensor = useHAEntity('sensor.living_room_temperature');
  const kitchenLight = useHAEntity('light.kitchen_floods');
  const bedroomLight = useHAEntity('light.bedroom_lamp');

  // Sensor-derived reactive label
  const statusText = useMemo(
    () => tempSensor.value > 75 ? 'Hot!' : tempSensor.value > 65 ? 'Comfortable' : 'Cool',
  );

  // Light-derived reactive labels (memo chain: entity signal → derived text)
  const kitchenLabel = useMemo(
    () => kitchenLight.isOn ? 'Kitchen: On' : 'Kitchen: Off',
  );
  const bedroomLabel = useMemo(
    () => bedroomLight.isOn ? 'Bedroom: On' : 'Bedroom: Off',
  );

  return (
    <esphome name="fancy-light-cascade-device" comment="Component cascade E2E">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid="HomeWifi" password="s3cr3t!!" />
      <api />
      <logger level="DEBUG" />

      <spi clkPin={18} mosiPin={23} />

      <display
        platform="ili9xxx"
        ref={displayRef}
        model="ILI9341"
        invertColors={false}
        dataRate="40MHz"
        csPin={5}
        dcPin={27}
        resetPin={33}
      />

      <lvgl displays={[displayRef]}>
        <ThemeProvider themes={{ dark: darkTheme, light: lightTheme }} default="dark">
          <Screen padding="lg">
            <VStack>
              {/* Temperature status — reactive text from sensor */}
              <lvgl-label text={statusText} />

              {/* 3-layer cascade: FancyLightButton → LightButton → Button
                  ReactiveNode memos flow through props across all 3 layers */}
              <FancyLightButton
                label={kitchenLabel}
                status="primary"
                onPress={() => { kitchenLight.toggle(); }}
              />
              <FancyLightButton
                label={bedroomLabel}
                status="secondary"
                onPress={() => { bedroomLight.toggle(); }}
              />

              {/* Theme switching */}
              <Button
                text="Toggle Theme"
                status="success"
                onPress={() => { theme.select('light'); }}
              />
            </VStack>
          </Screen>
        </ThemeProvider>
      </lvgl>
    </esphome>
  );
}

export default <App />;
