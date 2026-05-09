/**
 * E2E project: popup-stacked-device
 *
 * Validates the visibility stack system (`<Popup.Provider maxDepth={3}>`).
 *
 * This test uses two different popup-bearing component types (LightPopup
 * and FanPopup) with multiple instances of each, wrapped in a
 * Popup.Provider. This exercises:
 *   - Stack globals (depth, template[], instance[])
 *   - Per-template show/hide scripts with overflow guard
 *   - Same-template restore (mux swap)
 *   - Cross-template restore via shared coordinator script
 *   - Per-template re-show helper scripts (parameterized inst)
 *   - Backward-compatible `usePopup` integration
 */
import {
  DisplayRef,
  useRef,
  useHAEntity,
  createLvglWidget,
  type LightBinding,
  type WidgetProps,
} from '@espcompose/core';
import {
  Screen,
  VStack,
  HStack,
  Text,
  Button,
  Popup,
  UITheme,
  Slider,
  usePopup,
} from '@espcompose/ui';

// ── Component A: light popup ─────────────────────────────────────────────

type LightPopupProps = WidgetProps<{
  label: string;
  entity: LightBinding;
}>;

const LightPopup = createLvglWidget<LightPopupProps>((props) => {
  const popup = usePopup((ctrl) => (
    <Popup onBackdropPress={() => { ctrl.hide(); }}>
      <VStack gap="md" style={{ width: '100%' }}>
        <Text variant="subtitle" text={props.label} />
        <Button text="Toggle" onPress={() => { props.entity.toggle(); }} />
        <Slider
          min={0}
          max={255}
          value={props.entity.brightness}
          onChange={(args) => { props.entity.turnOn({ brightness: args.x }); }}
        />
        <Button text="Close" onPress={() => { ctrl.hide(); }} />
      </VStack>
    </Popup>
  ));

  return (
    <Button
      text={props.label}
      onPress={() => { popup.show(); }}
    />
  );
});

// ── Component B: fan popup ───────────────────────────────────────────────

type FanPopupProps = WidgetProps<{
  label: string;
  entity: LightBinding;
}>;

const FanPopup = createLvglWidget<FanPopupProps>((props) => {
  const popup = usePopup((ctrl) => (
    <Popup onBackdropPress={() => { ctrl.hide(); }}>
      <VStack gap="md" style={{ width: '100%' }}>
        <Text variant="subtitle" text={props.label} />
        <Button text="On/Off" onPress={() => { props.entity.toggle(); }} />
        <Button text="Close" onPress={() => { ctrl.hide(); }} />
      </VStack>
    </Popup>
  ));

  return (
    <Button
      text={props.label}
      onPress={() => { popup.show(); }}
    />
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
    <esphome name="popup-stacked-device" comment="Stacked popup E2E">
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
          <Popup.Provider maxDepth={3}>
            <Screen padding="md">
              <VStack gap="md">
                <Text variant="title" text="Stacked Popups" />
                <LightPopup label="Bedroom Light" entity={light1} />
                <LightPopup label="Kitchen Light" entity={light2} />
                <FanPopup label="Ceiling Fan" entity={fan1} />
                <FanPopup label="Desk Fan" entity={fan2} />
              </VStack>
            </Screen>
          </Popup.Provider>
        </UITheme.Provider>
      </lvgl>
    </esphome>
  );
}

export default <App />;
