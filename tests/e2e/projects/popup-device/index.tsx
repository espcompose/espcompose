/**
 * E2E project: popup-device
 *
 * Validates the dialog system end-to-end:
 *   - useDialog() with shared widget subtree deduplication
 *   - Multiple instances of the same component with different HA entities
 *   - Dialog backdrop + container in top_layer (1 set, not duplicated)
 *   - Mux signal + muxed bindings for divergent reactive values
 *   - dialog.show() / ctrl.hide() action lowering
 *
 * Expected compiler output:
 *   - top_layer with a hidden wrapper obj per dialog definition
 *   - Mux signal (sig_popup_<key>_mux) in espcompose_bindings.h
 *   - Muxed reactive bindings for divergent entity values
 *   - show() lambdas setting mux index + unhiding widgets
 *   - hide() lambdas hiding widgets
 */
import { DisplayRef, useRef, useHAEntity, createLvglWidget } from '@espcompose/core';
import {
  Screen,
  VStack,
  HStack,
  Text,
  Button,
  UITheme,
  useDialog,
} from '@espcompose/ui';

/**
 * LightButton — a button that opens a shared popup for controlling a light.
 *
 * Each instance binds to a different HA light entity. The popup is shared
 * (deduplicated) — only one set of popup widgets exists in top_layer, with
 * mux signals dispatching to the correct entity.
 */
const LightButton = createLvglWidget(
  ({ entityId, label }: { entityId: string; label: string }) => {
    const entity = useHAEntity(entityId, { domain: 'light' });

    const dialog = useDialog((ctrl) => (
      <>
        <Text variant="title" text={label} />
        <Text text={entity.stateText} />
        <HStack>
          <Button
            text="Toggle"
            status="primary"
            onPress={() => { entity.toggle(); }}
          />
          <Button
            text="Close"
            status="secondary"
            onPress={() => { ctrl.hide(); }}
          />
        </HStack>
      </>
    ));

    return (
      <Button
        text={label}
        onPress={() => { dialog.show(); }}
      />
    );
  },
);

function App() {
  const displayRef = useRef<DisplayRef>();

  return (
    <esphome name="popup-device" comment="Popup system E2E">
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
              <Text variant="title" text="Popup Test" />
              <LightButton entityId="light.bedroom" label="Bedroom" />
              <LightButton entityId="light.kitchen" label="Kitchen" />
            </VStack>
          </Screen>
        </UITheme.Provider>
      </lvgl>
    </esphome>
  );
}

export default <App />;
