/**
 * E2E project: toast-queue
 *
 * Validates the useToast() queue and overflow behaviors:
 *
 *   - overflow: 'replace' (default): generates a restart-mode script
 *   - overflow: 'queue' with queueLength: 3: generates a queued-mode
 *     script with max_runs: 3
 *   - overflow: 'drop': generates a single-mode script (drop while active)
 *   - maxVisible: 2: generates two independent overlay definitions
 *     with per-slot stacking via slotIndex
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

const ToastQueueDemo = createLvglWidget(
  () => {
    // Default: overflow 'replace' (restart mode)
    const toastReplace = useToast(() => (
      <Toast>
        <Text text="Replace toast" />
      </Toast>
    ));

    // Queued: overflow 'queue' with queueLength: 3
    const toastQueued = useToast(() => (
      <Toast>
        <Text text="Queued toast" />
      </Toast>
    ), { overflow: 'queue', queueLength: 3 });

    // Drop: overflow 'drop' (single mode)
    const toastDrop = useToast(() => (
      <Toast>
        <Text text="Drop toast" />
      </Toast>
    ), { overflow: 'drop' });

    // Multi-slot: maxVisible 2 with slotIndex-based offset
    const toastMulti = useToast((_ctrl, slotIndex) => (
      <Toast bottomOffset={slotIndex * 60}>
        <Text text="Multi toast" />
      </Toast>
    ), { maxVisible: 2 });

    return (
      <VStack gap="md">
        <Button text="Show Replace" onPress={() => { toastReplace.show(); }} />
        <Button text="Show Queued" onPress={() => { toastQueued.show(); }} />
        <Button text="Show Drop" onPress={() => { toastDrop.show(); }} />
        <Button text="Show Multi" onPress={() => { toastMulti.show(); }} />
      </VStack>
    );
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
            <ToastQueueDemo />
          </Screen>
        </UITheme.Provider>
      </lvgl>
    </esphome>
  );
}

export default <App />;
