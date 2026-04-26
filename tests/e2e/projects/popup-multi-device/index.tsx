/**
 * E2E project: popup-multi-device
 *
 * Validates the popup system with many instances (>5) of the same component,
 * each bound to a different HA entity.  This is the "light switch grid"
 * pattern where a single popup definition is shared across all instances.
 *
 * Critical pattern: the entity binding is created OUTSIDE the component
 * (via useHAEntity in the parent) and passed in as a prop.  The popup
 * closure captures props.entity — NOT a locally-created entity.  This is
 * the exact pattern from the demo project that triggers the memo name
 * leak bug.
 *
 * Regression target: the YAML backend must reference the correct sequential
 * C++ memo names (memo_0, memo_1, …) for popup widget bindings, NOT the
 * raw IRReactiveNode nodeId.  With the old code-path the YAML emitted
 * `espcompose::memo_<randomId>.get()` which doesn't exist in the bindings
 * header — a hard C++ compile error.
 */
import {
  DisplayRef,
  useRef,
  useHAEntity,
  usePopup,
  createLvglWidget,
  LVGL_INTENTS,
  type LightBinding,
  type SwitchBinding,
  type WidgetProps,
} from '@espcompose/core';
import {
  Screen,
  VStack,
  HStack,
  Text,
  Button,
  Switch,
  Popup,
  UITheme,
} from '@espcompose/ui';

// ── Reusable component with a popup ──────────────────────────────────────
// Entity binding is passed in as a prop — NOT created inside this component.
// This is the critical pattern that differs from the simple case.

type LightSwitchProps = WidgetProps<{
  text: string;
  entity: LightBinding | SwitchBinding;
}>;

const LightSwitch = createLvglWidget<LightSwitchProps>((props) => {
  const popup = usePopup((ctrl) => (
    <Popup onBackdropPress={() => { ctrl.dismiss(); }}>
      <Text text="Control" />
      <Button text="Toggle" onPress={() => { props.entity.toggle(); }} />
      <Button text="Close" onPress={() => { ctrl.dismiss(); }} />
    </Popup>
  ));

  return (
    <HStack align="spaceBetween" crossAlign="center">
      <Text text={props.text} />
      <Switch value={props.entity.isOn} onChange={() => { props.entity.toggle(); }} />
      <Button text="…" size="xs" onPress={() => { popup.show(); }} />
    </HStack>
  );
});

// ── App ──────────────────────────────────────────────────────────────────
// Entity bindings created HERE in the parent, passed to LightSwitch as props.

function App() {
  const displayRef = useRef<DisplayRef>();

  const light1 = useHAEntity('light.kitchen_floods', { domain: 'light' });
  const light2 = useHAEntity('light.kitchen_island', { domain: 'light' });
  const light3 = useHAEntity('light.living_room', { domain: 'light' });
  const light4 = useHAEntity('light.dining_room', { domain: 'light' });
  const light5 = useHAEntity('light.bedroom', { domain: 'light' });
  const light6 = useHAEntity('light.office', { domain: 'light' });
  const light7 = useHAEntity('light.deck', { domain: 'light' });
  const light8 = useHAEntity('light.garage', { domain: 'light' });

  return (
    <esphome name="popup-multi-device" comment="Many-instance popup E2E">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid="TestWifi" password="testpass" />
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
        <UITheme.Provider default="dark">
          <Screen padding="md">
            <VStack gap="md">
              <Text variant="title" text="Lights" />
              <LightSwitch text="Kitchen Floods" entity={light1} />
              <LightSwitch text="Kitchen Island" entity={light2} />
              <LightSwitch text="Living Room" entity={light3} />
              <LightSwitch text="Dining Room" entity={light4} />
              <LightSwitch text="Bedroom" entity={light5} />
              <LightSwitch text="Office" entity={light6} />
              <LightSwitch text="Deck Lights" entity={light7} />
              <LightSwitch text="Garage Lights" entity={light8} />
            </VStack>
          </Screen>
        </UITheme.Provider>
      </lvgl>
    </esphome>
  );
}

export default <App />;
