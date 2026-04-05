/**
 * E2E test project: style-device
 *
 * Validates the CSS-like style system end-to-end:
 * - `style` prop with CSS-like property names (backgroundColor → bg_color)
 * - Shorthand expansion (paddingHorizontal → pad_left + pad_right)
 * - State nesting (pressed state in style object)
 * - Part nesting (indicator part with style)
 * - mergeStyles() combining multiple style objects
 */
import { DisplayRef, useRef, mergeStyles } from '@espcompose/core';
import type { CssStyle } from '@espcompose/core';

const baseStyle: CssStyle = {
  backgroundColor: '#333333',
  padding: 8,
  borderRadius: 4,
};

const buttonStyle: CssStyle = {
  backgroundColor: '#1E88E5',
  color: '#FFFFFF',
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 8,
  pressed: {
    backgroundColor: '#1565C0',
  },
};

function App() {
  const displayRef = useRef<DisplayRef>();

  return (
    <esphome name="style-device" comment="CSS-like style system E2E test">
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
        <lvgl-page>
          {/* Test 1: Basic CSS-like style prop */}
          <lvgl-button
            style={{
              left: 10,
              top: 10,
              width: 200,
              height: 50,
              ...buttonStyle,
            }}
          >
            <lvgl-label text="Styled Button" x:custom={{ align: 'CENTER' }} />
          </lvgl-button>

          {/* Test 2: Inline style prop */}
          <lvgl-button
            style={{
              left: 10,
              top: 70,
              width: 200,
              height: 50,
              backgroundColor: '#FF0000',
            }}
          >
            <lvgl-label text="Styled Red" x:custom={{ align: 'CENTER' }} />
          </lvgl-button>

          {/* Test 3: mergeStyles combining base + specific */}
          <lvgl-obj
            style={mergeStyles(
              { left: 10, top: 130, width: 200, height: 80 },
              baseStyle,
              { backgroundColor: '#424242', borderRadius: 12 },
            )}
          >
            <lvgl-label text="Merged" x:custom={{ align: 'CENTER' }} />
          </lvgl-obj>

          {/* Test 4: Slider with part styling */}
          <lvgl-slider
            value={50}
            minValue={0}
            maxValue={100}
            style={{
              left: 10,
              top: 220,
              width: 200,
              backgroundColor: '#555555',
              indicator: {
                backgroundColor: '#1E88E5',
              },
              knob: {
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
              },
            }}
          />
        </lvgl-page>
      </lvgl>
    </esphome>
  );
}

export default <App />;
