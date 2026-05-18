/**
 * E2E project: popup-nested-toast
 *
 * Validates nested overlay hooks — Toast.Provider inside a useDialog() factory.
 *
 * Expected behaviour:
 *   - Both dialog and toast overlay definitions are emitted into top_layer
 *   - toast.show() / toast.hide() inside the dialog's trigger handler
 *     correctly references the toast overlay wrapper
 *   - Pressing the toggle button inside the dialog triggers the entity
 *     toggle AND shows the toast
 */
import { DisplayRef, useRef, useHAEntity, createLvglWidget, delay } from '@espcompose/core';
import {
  Screen,
  VStack,
  Text,
  Button,
  UITheme,
  useDialog,
  Toast,
  useToast,
} from '@espcompose/ui';

/**
 * PopupContent — rendered inside the dialog; uses toast from context.
 */
const PopupContent = createLvglWidget(
  ({ entityId, label, onClose }: { entityId: string; label: string; onClose: () => void }) => {
    const entity = useHAEntity(entityId, { domain: 'light' });
    const toast = useToast();

    return (
      <>
        <Text text={label} />
        <Button
          text="Toggle"
          onPress={async () => {
            entity.toggle();
            toast.show({ msg: 'Toggled!' });
            await delay(2000);
            toast.hide();
          }}
        />
        <Button
          text="Close"
          onPress={onClose}
        />
      </>
    );
  },
);

/**
 * DeviceCard — a button that opens a popup containing a nested toast trigger.
 */
const DeviceCard = createLvglWidget(
  ({ entityId, label }: { entityId: string; label: string }) => {
    const dialog = useDialog((ctrl) => (
      <Toast.Provider>
        <PopupContent entityId={entityId} label={label} onClose={() => { ctrl.hide(); }} />
      </Toast.Provider>
    ));

    return (
      <Button
        text={label}
        onPress={() => { dialog.show(); }}
      />
    );
  },
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
