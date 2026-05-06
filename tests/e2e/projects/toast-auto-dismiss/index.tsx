/**
 * E2E project: toast-auto-dismiss
 *
 * Validates the Toast.Provider auto-hide lifecycle:
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
  Button,
  UITheme,
  Toast,
  useToast,
} from '@espcompose/ui';

const DefaultToastConsumer = createLvglWidget(
  () => {
    const toast = useToast();
    return (
      <Button text="Show Default" onPress={() => { toast.show({ msg: 'Default 3s toast' }); }} />
    );
  },
);

const CustomToastConsumer = createLvglWidget(
  () => {
    const toast = useToast();
    return (
      <Button text="Show Custom" onPress={() => { toast.show({ msg: 'Custom 5s toast' }); }} />
    );
  },
);

const ManualToastConsumer = createLvglWidget(
  () => {
    const toast = useToast();
    return (
      <VStack gap="md">
        <Button text="Show Manual" onPress={() => { toast.show({ msg: 'Manual toast' }); }} />
        <Button text="Dismiss Manual" onPress={() => { toast.hide(); }} />
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
            <VStack gap="md">
              <Toast.Provider autoHide="3s">
                <DefaultToastConsumer />
              </Toast.Provider>
              <Toast.Provider autoHide="5s">
                <CustomToastConsumer />
              </Toast.Provider>
              <Toast.Provider autoHide={false}>
                <ManualToastConsumer />
              </Toast.Provider>
            </VStack>
          </Screen>
        </UITheme.Provider>
      </lvgl>
    </esphome>
  );
}

export default <App />;
