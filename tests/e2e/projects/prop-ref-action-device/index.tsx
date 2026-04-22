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
  createLvglWidget,
  createEspHomeComponent,
} from '@espcompose/core';
import {
  Screen,
  Button,
  Text,
  VStack,
  UITheme,
} from '@espcompose/ui';

interface UIProps {
  display: Ref<DisplayRef>;
  lvgl: Ref<LvglComponentRef>;
}

interface PageProps {
  lvgl: Ref<LvglComponentRef>;
  targetPage: Ref;
}

/** Component using destructured ref props with pageShow({ id }). */
const NavButton = createLvglWidget<PageProps>(
  ({ lvgl, targetPage }) => {
    return (
      <Button text="Go" onPress={() => { lvgl.pageShow({ id: targetPage }); }} />
    );
  },
);

/** Component using un-destructured props.ref access in pageShow({ id }). */
const NavButtonViaProps = createLvglWidget<PageProps>(
  (props) => {
    return (
      <Button text="GoProps" onPress={() => { props.lvgl.pageShow({ id: props.targetPage }); }} />
    );
  },
);

/** UI component that receives the lvgl ref through props. */
const UI = createEspHomeComponent(
  (props: UIProps) => {
    const screen1Ref = useRef();
    return (
      <lvgl ref={props.lvgl} displays={[props.display]}>
        <UITheme.Provider>
          <Screen ref={screen1Ref}>
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

          <Screen>
            <VStack>
              <Text variant="title" text="Page 3" />
              <NavButton lvgl={props.lvgl} targetPage={screen1Ref} />
              <NavButtonViaProps lvgl={props.lvgl} targetPage={screen1Ref} />
            </VStack>
          </Screen>
        </UITheme.Provider>
      </lvgl>
    );
  },
);

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
