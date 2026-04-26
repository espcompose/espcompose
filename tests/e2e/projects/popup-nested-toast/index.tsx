/**
 * E2E project: popup-nested-toast
 *
 * Validates nested overlay hooks — useToast() inside a usePopup() factory.
 *
 * Expected behaviour:
 *   - Both popup and toast overlay definitions are emitted into top_layer
 *   - toast.show() / toast.dismiss() inside the popup's trigger handler
 *     correctly references the toast overlay wrapper
 *   - Pressing the toggle button inside the popup triggers the entity
 *     toggle AND shows the toast
 */
import { DisplayRef, useRef, useHAEntity, createLvglWidget, delay, LVGL_INTENTS } from '@espcompose/core';
import {
  Screen,
  VStack,
  Text,
  Button,
  Popup,
  Toast,
  UITheme,
  usePopup,
  useToast,
} from '@espcompose/ui';

/**
 * DeviceCard — a button that opens a popup containing a nested toast trigger.
 */
const DeviceCard = createLvglWidget(
  ({ entityId, label }: { entityId: string; label: string }) => {
    const entity = useHAEntity(entityId, { domain: 'light' });

    const popup = usePopup((ctrl) => {
      const toast = useToast(() => (
        <Toast>
          <Text text="Toggled!" />
        </Toast>
      ));

      return (
        <Popup onBackdropPress={() => { ctrl.dismiss(); }}>
          <Text text={label} />
          <Button
            text="Toggle"
            onPress={async () => {
              entity.toggle();
              toast.show();
              await delay(2000);
              toast.dismiss();
            }}
          />
          <Button
            text="Close"
            onPress={() => { ctrl.dismiss(); }}
          />
        </Popup>
      );
    });

    return (
      <Button
        text={label}
        onPress={() => { popup.show(); }}
      />
    );
  },
  { allowedChildIntents: [LVGL_INTENTS.WIDGET] as const },
);

function App() {
  const displayRef = useRef<DisplayRef>();

  return (
    <esphome name="popup-nested-toast" comment="Nested overlay E2E">
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
        <UITheme.Provider default="dark">
          <Screen padding="lg">
            <VStack gap="md">
              <Text variant="title" text="Nested Toast Test" />
              <DeviceCard entityId="light.bedroom" label="Bedroom" />
              <DeviceCard entityId="light.kitchen" label="Kitchen" />
            </VStack>
          </Screen>
        </UITheme.Provider>
      </lvgl>
    </esphome>
  );
}

export default <App />;
