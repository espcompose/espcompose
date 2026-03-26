import { Display, ESPCompose, Ref, useHAEntity } from "@esphome/compose";
import {
    Button, Card, HStack, Screen, SliderField, SwitchField, Text, VStack,
    darkTheme, lightTheme, createLvglThemeProps, applyTheme,
} from "@esphome/compose-ui";

type UIProps = {
    display: Ref<Display>,
}

export const UI = (props: UIProps) => {
    const officeLight = useHAEntity('light.office');

    return <>
        <lvgl
            byteOrder="little_endian"
            bufferSize="100%"
            drawRounding={2}
            displays={[props.display]}
            {...createLvglThemeProps(darkTheme)}
        >
            <Screen>
                <VStack>
                    <Text variant="title" text="Theme Demo" />

                    <Card>
                        <SliderField label="Brightness" min={0} max={255} />
                        <SwitchField label="Power" />
                    </Card>

                    <Card>
                        <HStack>
                            <lvgl-label text={officeLight.stateText} />
                            <Button
                                text="Toggle Office"
                                onPress={() => { officeLight.toggle(); }}
                            />
                        </HStack>
                    </Card>

                    <HStack>
                        <Button text="Dark Theme" status="primary" onPress={() => { applyTheme(darkTheme); }} />
                        <Button text="Light Theme" status="secondary" onPress={() => { applyTheme(lightTheme); }} />
                    </HStack>
                </VStack>
            </Screen>
        </lvgl>
    </>
}
