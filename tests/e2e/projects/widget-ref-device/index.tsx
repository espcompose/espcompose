/**
 * E2E test: widget-ref-device
 *
 * Verifies that refs can be passed to design system widgets (e.g. <Screen>)
 * and are correctly forwarded to the underlying intrinsic element.
 */
import {
  DisplayRef,
  LvglComponentRef,
  useRef,
  ThemeProvider,
} from '@espcompose/core';
import {
  Screen,
  Button,
  Text,
  VStack,
  darkTheme,
} from '@espcompose/ui';

function App() {
  const displayRef = useRef<DisplayRef>();
  const lvgl = useRef<LvglComponentRef>();
  const screenRef = useRef();

  return (
    <esphome name="widget-ref-device" comment="Widget ref forwarding test">
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
        csPin={5}
        dcPin={27}
        resetPin={33}
      />

      <lvgl ref={lvgl} displays={[displayRef]}>
        <ThemeProvider themes={{ dark: darkTheme }}>
          <Screen ref={screenRef} padding="md">
            <VStack>
              <Text variant="title" text="Ref Forwarding" />
              <Button text="Next" onPress={() => { lvgl.pageNext(); }} />
            </VStack>
          </Screen>
        </ThemeProvider>
      </lvgl>
    </esphome>
  );
}

export default <App />;
