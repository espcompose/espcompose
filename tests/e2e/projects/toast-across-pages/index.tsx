/**
 * E2E project: toast-across-pages
 *
 * Validates that Toast.Provider context propagates across intrinsic LVGL
 * element boundaries (lvgl-page). This exercises the scenario where
 * Toast.Provider wraps Screen elements and useToast() is called inside a
 * nested widget within a screen.
 *
 *   - Toast.Provider wraps multiple <Screen> elements (which compile to
 *     <lvgl-page> intrinsics)
 *   - useToast() is called in a deeply nested widget (ToastConsumer) inside
 *     one of those screens
 *   - The context must survive the two-phase rendering boundary (resolve →
 *     build intrinsic children)
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

const ToastConsumer = createLvglWidget(
  () => {
    const toast = useToast();

    return (
      <VStack gap="md">
        <Button text="Show Toast" onPress={() => { toast.show({ msg: "Hello!" }); }} />
        <Button text="Show Another" onPress={() => { toast.show({ msg: "Goodbye!" }); }} />
      </VStack>
    );
  },
);

function App() {
  const displayRef = useRef<DisplayRef>();

  return (
    <esphome name="toast-across-pages" comment="Toast across page boundaries E2E">
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
          <Toast.Provider autoHide="3s">
            <Screen padding="lg">
              <ToastConsumer />
            </Screen>
            <Screen padding="lg">
              <Button text="Empty Page" onPress={() => {}} />
            </Screen>
          </Toast.Provider>
        </UITheme.Provider>
      </lvgl>
    </esphome>
  );
}

export default <App />;
