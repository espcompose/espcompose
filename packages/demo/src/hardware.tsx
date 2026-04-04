import { Display, es8311_ES8311, i2c_I2CBus, i2s_audio_I2SAudioComponent, ledc_LEDCOutput, Ref, speaker_Speaker, useRef } from "@espcompose/core";

type Waveshare_ESP32P4_WIFI6_Touch_LCD_10_1Props = {
    display: Ref<Display>,
}

export const Waveshare_ESP32P4_WIFI6_Touch_LCD_10_1 = (props: Waveshare_ESP32P4_WIFI6_Touch_LCD_10_1Props) => {
    
    const i2c_bus = useRef<i2c_I2CBus>();
    const backlight_pwm = useRef<ledc_LEDCOutput>();
    const audio_bus = useRef<i2s_audio_I2SAudioComponent>();
    const es8311_dac = useRef<es8311_ES8311>();
    const speaker = useRef<speaker_Speaker>();

    return <>
        <esp32 
            board="esp32-p4"
            flashSize="32MB"
            cpuFrequency="360MHZ"
            framework={{ 
                type: 'esp-idf',
                version: 'latest',
                advanced: {
                    enableIdfExperimentalFeatures: true
                }
            }} 
        />
    
        <esp32_hosted
            variant="ESP32C6"
            resetPin={54}
            cmdPin={19}
            clkPin={18}
            d0Pin={14}
            d1Pin={15}
            d2Pin={16}
            d3Pin={17}
            activeHigh={true}
        />

        <psram
            mode="hex"
            speed="200MHz"
        />

        <preferences
            flashWriteInterval="5min"
        />

        <esp_ldo 
            voltage="2.5V"
            channel="3"
        />

        <i2c
            ref={i2c_bus}
            sda={7}
            scl={8}
            frequency="400kHz"
            scan
        />
    
        <touchscreen
            platform="gt911"
            i2cId={i2c_bus}
            updateInterval="50ms"
            transform={{
                swapXy: true,
                mirrorX: true,
                mirrorY: false
            }}
        />

        <output
            ref={backlight_pwm}
            platform="ledc"
            pin={26}
            inverted={false}
            frequency="1000Hz"
        />

        <light
            platform="monochromatic"
            name="Backlight"
            output={backlight_pwm}
            restoreMode="ALWAYS_ON"
            defaultTransitionLength={{
                milliseconds: 250
            }}
        />

        <display
            ref={props.display}
            platform="mipi_dsi"
            x:custom={{
                model: "WAVESHARE-P4-NANO-10.1",
                resetPin: {
                    number: "GPIO27"
                },
                rotation: 270,
                updateInterval: "never",
                autoClearEnabled: false,
                dimensions: {
                    width: 800,
                    height: 1280
                }
            }}
        />

        <i2s_audio
            ref={audio_bus}
            i2sMclkPin={13}
            i2sLrclkPin={10}
            i2sBclkPin={12}
        />

        <audio_dac
            ref={es8311_dac}
            platform="es8311"
            i2cId={i2c_bus}
            address={0x18}
        />

        <audio_adc
            platform="es7210"
            i2cId={i2c_bus}
            address={0x40}
        />

        <microphone
            platform="i2s_audio"
            i2sAudioId={audio_bus}
            i2sDinPin={11}
            sampleRate={16000}
            bitsPerSample="16bit"
            adcType="external"
        />

        <speaker
            ref={speaker}
            platform="i2s_audio"
            i2sAudioId={audio_bus}
            i2sDoutPin={9}
            audioDac={es8311_dac}
            dacType="external"
            channel="mono"
            bufferDuration={{
                milliseconds: 100
            }}
            bitsPerSample="16bit"
            sampleRate={48000}
        />

        {/* <speaker
            platform="mixer"
            outputSpeaker={speaker}
            sourceSpeakers={[
                {
                }
            ]}
        />

        <speaker
            platform="resampler"
            sampleRate={48000}
            bitsPerSample={16}
        />
    
        <speaker
            platform="resampler"
            sampleRate={48000}
            bitsPerSample={16}
        /> */}

        <switch
            platform="gpio"
            name="Speaker Enable"
            pin={53}
            restoreMode="RESTORE_DEFAULT_ON"
        />

    </>
};
