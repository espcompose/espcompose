import { DisplayRef, Ref, useHAEntity, theme } from "@espcompose/core";
import {
    Button, Card, HStack, Screen, Text, VStack,
    LightSlider, LightSwitch,
    ThemeProvider, darkTheme, lightTheme,
} from "@espcompose/ui";
import { HALight, MyButton } from "./button";

type UIProps = {
    display: Ref<DisplayRef>,
}

export const UI = (props: UIProps) => {

    const officeLight = useHAEntity('light.office');

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
                                <lvgl-label text={officeLight.stateText} />
                                <MyButton
                                    text={officeLight.isOn ? "Office Off" : "Office On"}
                                    onPress={() => { officeLight.toggle(); }}
                                />
                                
                                <HALight entity="light.office" text="Office" />
                                <HALight entity="light.gym" text="Gym" />
                                <HALight entity="light.air_hockey_light" text="Hockey" />

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
