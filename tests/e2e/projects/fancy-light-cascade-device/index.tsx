/**
 * E2E project: fancy-light-cascade-device
 *
 * Validates entity binding propagation through a 3-layer component cascade:
 *   App (useHAEntity) → FancyLightButton → LightButton → Button → lvgl-button + lvgl-label
 *
 * Entity binding objects (LightBinding) are passed as props through multiple
 * component layers. Inner components use `useMemo(() => props.entity.isOn ? ...)`
 * and `onPress={() => { props.entity.toggle(); }}` — exercising the compiler's
 * slot mechanism (expression side) and type-based action resolution (action side).
 *
 * Expected compiler output:
 *   - HA sensor + light entity signals
 *   - Slotted memos resolved at render time (entity.isOn → label text)
 *   - Type-based HA actions (entity.toggle() via inferHAEntityDomainFromType)
 *   - Theme signals wired through Button internals
 *   - Widget bindings receiving reactive values that traversed 3 component layers
 */
import { DisplayRef, useRef, useHAEntity, useMemo, theme, ThemeProvider, createLvglWidget } from '@espcompose/core';
import type { EspComposeElement, TriggerHandler, Reactive, LightBinding } from '@espcompose/core';
import {
  Screen,
  VStack,
  Button,
  darkTheme,
  lightTheme,
} from '@espcompose/ui';
import type { StatusToken } from '@espcompose/ui';

// ── Layer 3 (innermost): LightButton ──────────────────────────────────────
// Wraps the design-system Button, forwarding reactive label and actions.

interface LightButtonProps {
  label: Reactive<string>;
  status: StatusToken;
  onPress?: TriggerHandler;
}

const LightButton = createLvglWidget<LightButtonProps>(
  (props) => {
    return (
      <Button
        text={props.label}
        status={props.status}
        onPress={props.onPress}
      />
    );
  },
);

// ── Layer 2: FancyLightButton ─────────────────────────────────────────────
// Receives a LightBinding entity and derives reactive label + action locally.
// Tests that the compiler's slot mechanism and type-based action resolution
// work through props (not just direct useHAEntity() variables).

interface FancyLightButtonProps {
  entity: LightBinding;
  label: string;
  status: StatusToken;
}

const FancyLightButton = createLvglWidget<FancyLightButtonProps>(
  (props) => {
    // useMemo with props.entity.isOn → goes through slot path in expr-compiler
    const lightLabel = useMemo(
      () => props.entity.isOn ? 'On' : 'Off',
    );

    return (
      <LightButton
        label={lightLabel}
        status={props.status}
        // onPress with props.entity.toggle() → goes through type-based action resolution
        onPress={() => { props.entity.toggle(); }}
      />
    );
  },
);

// ── Layer 1 (top-level): App ──────────────────────────────────────────────
// Entity bindings created here, then passed as props to inner layers.
// The inner components compile useMemo()/actions using the slot mechanism.

function App() {
  const displayRef = useRef<DisplayRef>();
  const tempSensor = useHAEntity('sensor.living_room_temperature');
  const kitchenLight = useHAEntity('light.kitchen_floods');
  const bedroomLight = useHAEntity('light.bedroom_lamp');

  // Sensor-derived reactive label (direct, non-slotted — entity var is local)
  const statusText = useMemo(
    () => tempSensor.value > 75 ? 'Hot!' : tempSensor.value > 65 ? 'Comfortable' : 'Cool',
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

              {/* 3-layer cascade: entity bindings flow through props.
                  FancyLightButton derives memos + actions from props.entity */}
              <FancyLightButton
                entity={kitchenLight}
                label="Kitchen"
                status="primary"
              />
              <FancyLightButton
                entity={bedroomLight}
                label="Bedroom"
                status="secondary"
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
