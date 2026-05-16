/**
 * E2E project: screensaver-device
 *
 * Validates the screensaver system end-to-end:
 *   - Screensaver.Provider with config context
 *   - useScreensaver() with content factory and overlay tier z-order 1000
 *   - Idle timer script with mode: 'restart'
 *   - Controller with suspend/resume/enable/disable/reset
 *   - hooks controller (ScreensaverHooks) for backlight management
 *   - Screensaver content overlay with onPress self-dismiss
 *   - Global boolean state tracking (isActive)
 */
import {
  DisplayRef,
  useRef,
  useScript,
  useController,
  createElement,
  createEspHomeComponent,
  createLvglWidget,
} from '@espcompose/core';
import type { Ref, FloatOutputRef, LightOutputRef } from '@espcompose/core';
import {
  Screen,
  VStack,
  Text,
  Button,
  UITheme,
  Screensaver,
  useScreensaver,
} from '@espcompose/ui';
import type { ScreensaverHooks } from '@espcompose/ui';

// ────────────────────────────────────────────────────────────────────────────
// Hardware component — display + backlight
// ────────────────────────────────────────────────────────────────────────────

const Hardware = createEspHomeComponent(
  ({
    displayRef,
    backlightPwm,
    backlightRef,
  }: {
    displayRef: Ref<DisplayRef>;
    backlightPwm: Ref<FloatOutputRef>;
    backlightRef: Ref<LightOutputRef>;
  }) => {
    return (
      <>
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

        <output platform="ledc" ref={backlightPwm} pin={26} frequency="1000Hz" />
        <light
          ref={backlightRef}
          platform="monochromatic"
          output={backlightPwm}
          name="Display Backlight"
          restoreMode="ALWAYS_ON"
        />
      </>
    );
  },
);

// ────────────────────────────────────────────────────────────────────────────
// Main app UI — consumes useScreensaver with content factory
// ────────────────────────────────────────────────────────────────────────────

const MainUI = createLvglWidget(() => {
  const screensaver = useScreensaver(
    <lvgl-obj
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: '#000000',
        backgroundOpacity: '80%',
      }}
    />,
  );

  return (
    <Screen>
      <VStack gap="md">
        <Text variant="title" text="Screensaver Test" />
        <Button
          text="Suspend"
          onPress={() => { screensaver.suspend(); }}
        />
      </VStack>
    </Screen>
  );
});

// ────────────────────────────────────────────────────────────────────────────
// App root
// ────────────────────────────────────────────────────────────────────────────

function App() {
  const displayRef = useRef<DisplayRef>();
  const backlightPwm = useRef<FloatOutputRef>();
  const backlightRef = useRef<LightOutputRef>();

  const suspendScript = useScript(async () => {
    backlightRef.turnOff();
  });
  const resumeScript = useScript(async () => {
    backlightRef.turnOn();
  });
  const hooks = useController<ScreensaverHooks>({
    onSuspend: suspendScript,
    onResume: resumeScript,
  });

  return (
    <esphome name="screensaver-device" comment="Screensaver system E2E">
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid="HomeWifi" password="s3cr3t!!" />
      <api />
      <logger level="DEBUG" />

      <Hardware
        displayRef={displayRef}
        backlightPwm={backlightPwm}
        backlightRef={backlightRef}
      />

      <lvgl displays={[displayRef]}>
        <UITheme.Provider default="dark">
          <Screensaver.Provider
            timeout="5min"
            displayOffAfter="10min"
            hooks={hooks}
          >
            <MainUI />
          </Screensaver.Provider>
        </UITheme.Provider>
      </lvgl>
    </esphome>
  );
}

export default <App />;
