/**
 * E2E test: prop-ref-action-device
 *
 * Exercises ref action calls through property access chains (props.lvgl.pageNext()).
 * This tests type-based resolution in the action compiler — the ref is not a direct
 * local variable but received via function component props.
 */
import {
  DisplayRef,
  LvglComponentRef,
  Ref,
  useRef,
} from '@espcompose/core';
import {
  Screen,
  Button,
  Text,
  VStack,
  ThemeProvider,
  darkTheme,
  lightTheme,
} from '@espcompose/ui';

interface UIProps {
  display: Ref<DisplayRef>;
  lvgl: Ref<LvglComponentRef>;
}

/** UI component that receives the lvgl ref through props. */
function UI(props: UIProps) {
  return (
    <lvgl ref={props.lvgl} displays={[props.display]}>
      <ThemeProvider themes={{ dark: darkTheme, light: lightTheme }}>
        <Screen>
          <VStack>
            <Text variant="title" text="Page 1" />
            <Button text="Next" onPress={() => { props.lvgl.pageNext(); }} />
          </VStack>
        </Screen>

        <Screen>
          <VStack>
            <Text variant="title" text="Page 2" />
            <Button text="Back" onPress={() => { props.lvgl.pagePrevious(); }} />
          </VStack>
        </Screen>
      </ThemeProvider>
    </lvgl>
  );
}

function App() {
  const displayRef = useRef<DisplayRef>();
  const lvgl = useRef<LvglComponentRef>();

  return (
    <esphome name="prop-ref-action-device" comment="Ref action through props test">
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

      <UI display={displayRef} lvgl={lvgl} />
    </esphome>
  );
}

export default <App />;
