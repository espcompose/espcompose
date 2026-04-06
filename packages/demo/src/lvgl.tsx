import { DisplayRef, Ref, useHAEntity, theme } from "@espcompose/core";
import {
    Button, Card, HStack, Screen, Text, VStack,
    LightSlider, LightSwitch, LightButton, SensorText,
    ThemeProvider, darkTheme, lightTheme,
} from "@espcompose/ui";

type UIProps = {
    display: Ref<DisplayRef>,
}

export const UI = (props: UIProps) => {

    const officeLight = useHAEntity('light.office');
    const gymLight = useHAEntity('light.gym');
    const hockeyLight = useHAEntity('light.air_hockey_light');

    return <>
        <lvgl
            byteOrder="little_endian"
            bufferSize="100%"
            drawRounding={2}
            displays={[props.display]}
        >
            <ThemeProvider themes={{ dark: darkTheme, light: lightTheme }}>
                <Screen>
                    <VStack>
                        <Text variant="title" text="Theme Demo" />

                        <Card>
                            <LightSlider
                                binding={officeLight}
                                label="Brightness"
                                min={0}
                                max={255}
                            />

                            <LightSwitch binding={officeLight} label="Power" />
                        </Card>

                        <Card>
                            <HStack>
                                <SensorText binding={officeLight} label="Office" />
                                <Button
                                    size="lg"
                                    text={officeLight.isOn ? "Office On" : "Office Off"}
                                    onPress={() => { officeLight.toggle(); }}
                                />

                                <LightButton binding={officeLight} label="Office" size="sm" />


                                <LightButton binding={officeLight} label="Office" />
                                <LightButton binding={gymLight} label="Gym" />
                                <LightButton binding={hockeyLight} label="Hockey" />

                            </HStack>
                        </Card>

                        <HStack>
                            <Button text="Dark Theme" status="primary" onPress={() => { theme.select('dark'); }} />
                            <Button text="Light Theme" status="secondary" onPress={() => { theme.select('light'); }} />
                        </HStack>
                    </VStack>
                </Screen>
            </ThemeProvider>
        </lvgl>
    </>
}
