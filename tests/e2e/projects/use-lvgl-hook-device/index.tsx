/**
 * E2E test: use-lvgl-hook-device
 *
 * Exercises the useLvgl() hook for implicit LVGL ref access:
 * - Child components call useLvgl() instead of receiving the ref as a prop
 * - Page navigation actions (pageNext, pagePrevious, pageShow) via the hook
 * - Verifies that the ref resolves correctly even without an explicit ref prop on <lvgl>
 */
import {
  DisplayRef,
  Ref,
  useRef,
  useLvgl,
  ThemeProvider,
  createLvglWidget,
  createEspHomeComponent,
} from '@espcompose/core';
import {
  Screen,
  Button,
  Text,
  VStack,
  darkTheme,
  lightTheme,
} from '@espcompose/ui';

/** Component using useLvgl() with pageNext — no lvgl prop needed. */
const NextButton = createLvglWidget(
  () => {
    const lvgl = useLvgl();
    return (
      <Button text="Next" onPress={() => { lvgl.pageNext(); }} />
    );
  },
);

/** Component using useLvgl() with pagePrevious. */
const BackButton = createLvglWidget(
  () => {
    const lvgl = useLvgl();
    return (
      <Button text="Back" onPress={() => { lvgl.pagePrevious(); }} />
    );
  },
);

interface GoToButtonProps {
  targetPage: Ref;
}

/** Component using useLvgl() with pageShow({ id }). */
const GoToButton = createLvglWidget<GoToButtonProps>(
  ({ targetPage }) => {
    const lvgl = useLvgl();
    return (
      <Button text="Go" onPress={() => { lvgl.pageShow({ id: targetPage }); }} />
    );
  },
);

const UI = createEspHomeComponent(
  ({ display }: { display: Ref<DisplayRef> }) => {
    const screen1Ref = useRef();
    return (
      <lvgl displays={[display]}>
        <ThemeProvider themes={{ dark: darkTheme, light: lightTheme }}>
          <Screen ref={screen1Ref}>
            <VStack>
              <Text variant="title" text="Page 1" />
              <NextButton />
            </VStack>
          </Screen>

          <Screen>
            <VStack>
              <Text variant="title" text="Page 2" />
              <BackButton />
            </VStack>
          </Screen>

          <Screen>
            <VStack>
              <Text variant="title" text="Page 3" />
              <GoToButton targetPage={screen1Ref} />
            </VStack>
          </Screen>
        </ThemeProvider>
      </lvgl>
    );
  },
);

function App() {
  const displayRef = useRef<DisplayRef>();

  return (
    <esphome name="use-lvgl-hook-device" comment="useLvgl() hook test">
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

      <UI display={displayRef} />
    </esphome>
  );
}

export default <App />;
