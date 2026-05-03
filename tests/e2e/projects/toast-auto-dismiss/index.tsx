/**
 * E2E project: toast-auto-dismiss
 *
 * Validates the useToast() auto-hide lifecycle:
 *
 *   - Default auto-hide (3s): generates a restart-mode script that
 *     sequences overlay_show → delay 3s → overlay_hide
 *   - Custom duration (5s): same pattern with delay 5s
 *   - Manual hide (autoHide: false): no lifecycle script, raw
 *     overlay_show / overlay_hide in the action tree
 *   - Button handler routes through script.execute (when auto-hide
 *     is active) instead of raw overlay_show
 */
import { DisplayRef, useRef, createLvglWidget } from '@espcompose/core';
import {
  Screen,
  VStack,
  Text,
  Button,
  Toast,
  UITheme,
  useToast,
} from '@espcompose/ui';

const ToastDemo = createLvglWidget(
  () => {
    // Default: auto-hide after 3s
    const toastDefault = useToast(() => (
      <Toast>
        <Text text="Default 3s toast" />
      </Toast>
    ));

    // Custom: auto-hide after 5s
    const toastCustom = useToast(() => (
      <Toast>
        <Text text="Custom 5s toast" />
      </Toast>
    ), { autoHide: '5s' });

    // Manual: no auto-hide
    const toastManual = useToast(() => (
      <Toast>
        <Text text="Manual toast" />
      </Toast>
    ), { autoHide: false });

    return (
      <VStack gap="md">
        <Button text="Show Default" onPress={() => { toastDefault.show(); }} />
        <Button text="Show Custom" onPress={() => { toastCustom.show(); }} />
        <Button text="Show Manual" onPress={() => { toastManual.show(); }} />
        <Button text="Dismiss Manual" onPress={() => { toastManual.hide(); }} />
      </VStack>
    );
  },
);

function App() {
  const displayRef = useRef<DisplayRef>();

  return (
    <esphome name="toast-auto-dismiss" comment="Toast auto-dismiss E2E">
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
            <ToastDemo />
          </Screen>
        </UITheme.Provider>
      </lvgl>
    </esphome>
  );
}

export default <App />;
