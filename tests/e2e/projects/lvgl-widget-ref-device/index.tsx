/**
 * E2E test: lvgl-widget-ref-device
 *
 * Verifies that LVGL widget intrinsics (`<lvgl-slider>`, `<lvgl-button>`)
 * accept typed refs that expose widget-specific actions like
 * `widgetUpdate({...})`, `sliderUpdate({...})`, `widgetRedraw()`.
 */
import {
  DisplayRef,
  LvglSliderRef,
  LvglButtonRef,
  useRef,
} from '@espcompose/core';

function App() {
  const displayRef = useRef<DisplayRef>();
  const sliderRef = useRef<LvglSliderRef>();
  const buttonRef = useRef<LvglButtonRef>();

  return (
    <esphome name="lvgl-widget-ref-device" comment="Typed LVGL widget refs">
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

      <lvgl displays={[displayRef]}>
        <lvgl-page>
          {/* Slider whose press/release temporarily enlarges the knob via
              widget.update — exercises both ref typing and the ref-resolved
              native action lowering. */}
          <lvgl-slider
            ref={sliderRef}
            minValue={0}
            maxValue={255}
            onPress={() => { sliderRef.widgetUpdate({ knob: { padAll: 8 } }); }}
            onRelease={() => { sliderRef.widgetUpdate({ knob: { padAll: 4 } }); }}
          />

          {/* Button using the lv_obj_t-inherited widgetRedraw() action. */}
          <lvgl-button
            ref={buttonRef}
            onClick={() => { buttonRef.widgetRedraw(); }}
          />
        </lvgl-page>
      </lvgl>
    </esphome>
  );
}

export default <App />;
