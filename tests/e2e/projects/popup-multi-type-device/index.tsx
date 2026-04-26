/**
 * E2E project: popup-multi-type-device
 *
 * Validates that TWO DIFFERENT component types each defining their own
 * usePopup() produce distinct popup template keys.  This is the exact
 * scenario that would collide when anonymous components share the same
 * wireframe name.
 *
 * Both LightControl and FanControl are anonymous arrow functions passed to
 * createLvglWidget.  The wireframe counter must assign each a unique
 * identity so the two popup definitions produce separate LVGL top_layer
 * widgets and mux signals.
 */
import {
  DisplayRef,
  useRef,
  useHAEntity,
  usePopup,
  createLvglWidget,
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

// ── Component A: light popup ─────────────────────────────────────────────

type LightControlProps = WidgetProps<{
  text: string;
  entity: LightBinding | SwitchBinding;
}>;

const LightControl = createLvglWidget<LightControlProps>((props) => {
  const popup = usePopup((ctrl) => (
    <Popup onBackdropPress={() => { ctrl.dismiss(); }}>
      <Text text="Light Control" />
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

// ── Component B: fan popup ───────────────────────────────────────────────

type FanControlProps = WidgetProps<{
  text: string;
  entity: LightBinding | SwitchBinding;
}>;

const FanControl = createLvglWidget<FanControlProps>((props) => {
  const popup = usePopup((ctrl) => (
    <Popup onBackdropPress={() => { ctrl.dismiss(); }}>
      <Text text="Fan Control" />
      <Button text="On/Off" onPress={() => { props.entity.toggle(); }} />
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

function App() {
  const displayRef = useRef<DisplayRef>();

  const light1 = useHAEntity('light.bedroom', { domain: 'light' });
  const light2 = useHAEntity('light.kitchen', { domain: 'light' });
  const fan1 = useHAEntity('light.ceiling_fan', { domain: 'light' });
  const fan2 = useHAEntity('light.desk_fan', { domain: 'light' });

  return (
    <esphome name="popup-multi-type-device" comment="Multi-type popup E2E">
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
              <Text variant="title" text="Controls" />
              <LightControl text="Bedroom" entity={light1} />
              <LightControl text="Kitchen" entity={light2} />
              <FanControl text="Ceiling Fan" entity={fan1} />
              <FanControl text="Desk Fan" entity={fan2} />
            </VStack>
          </Screen>
        </UITheme.Provider>
      </lvgl>
    </esphome>
  );
}

export default <App />;
