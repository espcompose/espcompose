/**
 * E2E project: toast-queue
 *
 * Validates the Toast.Provider queue and overflow behaviors:
 *
 *   - overflow: 'replace' (default): generates a restart-mode script
 *   - overflow: 'queue' with queueLength: 3: generates a queued-mode
 *     script with max_runs: 3
 *   - overflow: 'drop': generates a single-mode script (drop while active)
 *   - maxVisible: 2: generates two independent overlay definitions
 *     with compacted stacking
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

const ReplaceConsumer = createLvglWidget(
  () => {
    const toast = useToast();
    return <Button text="Show Replace" onPress={() => { toast.show({ msg: 'Replace toast' }); }} />;
  },
);

const QueuedConsumer = createLvglWidget(
  () => {
    const toast = useToast();
    return <Button text="Show Queued" onPress={() => { toast.show({ msg: 'Queued toast' }); }} />;
  },
);

const DropConsumer = createLvglWidget(
  () => {
    const toast = useToast();
    return <Button text="Show Drop" onPress={() => { toast.show({ msg: 'Drop toast' }); }} />;
  },
);

const MultiConsumer = createLvglWidget(
  () => {
    const toast = useToast();
    return <Button text="Show Multi" onPress={() => { toast.show({ msg: 'Multi toast' }); }} />;
  },
);

function App() {
  const displayRef = useRef<DisplayRef>();

  return (
    <esphome name="toast-queue" comment="Toast queue E2E">
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
              <Toast.Provider>
                <ReplaceConsumer />
              </Toast.Provider>
              <Toast.Provider overflow="queue" queueLength={3}>
                <QueuedConsumer />
              </Toast.Provider>
              <Toast.Provider overflow="drop">
                <DropConsumer />
              </Toast.Provider>
              <Toast.Provider maxVisible={2}>
                <MultiConsumer />
              </Toast.Provider>
            </VStack>
          </Screen>
        </UITheme.Provider>
      </lvgl>
    </esphome>
  );
}

export default <App />;
