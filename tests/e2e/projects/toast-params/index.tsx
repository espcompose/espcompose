/**
 * E2E project: toast-params
 *
 * Validates the parameterized Toast.Provider + useToast() feature:
 *
 *   - Toast.Provider uses useTransientOverlay<{msg: string}> internally
 *   - The factory's params.msg field is compiled to a global_read expression
 *   - show() requires passing { msg: string }
 *   - Show script receives userParams declarations and prepends irGlobalSet actions
 *   - The script_execute action forwards userArgs to the script
 */
import { DisplayRef, useRef, createLvglWidget } from '@espcompose/core';
import {
  Screen,
  Button,
  VStack,
  UITheme,
  Toast,
  useToast,
} from '@espcompose/ui';

const ParamToastDemo = createLvglWidget(
  () => {
    const toast = useToast();

    return (
      <VStack gap="md">
        <Button text="Show Info" onPress={() => { toast.show({ msg: "Info!" }); }} />
        <Button text="Show Warning" onPress={() => { toast.show({ msg: "Warning!" }); }} />
        <Button text="Show Error" onPress={() => { toast.show({ msg: "Error!" }); }} />
      </VStack>
    );
  },
);

function App() {
  const displayRef = useRef<DisplayRef>();

  return (
    <esphome name="toast-params" comment="Parameterized toast E2E">
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
            <Toast.Provider>
              <ParamToastDemo />
            </Toast.Provider>
          </Screen>
        </UITheme.Provider>
      </lvgl>
    </esphome>
  );
}

export default <App />;
