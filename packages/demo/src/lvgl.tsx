import { Display, ESPCompose, Ref } from "@esphome/compose";
import {
    Button, Card, HStack, Screen, SliderField, SwitchField, Text, VStack,
    darkTheme, lightTheme, createLvglThemeProps, createThemeSwitchActions,
} from "@esphome/compose-ui";

type UIProps = {
    display: Ref<Display>,
}

export const UI = (props: UIProps) => {
    
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

                    <HStack>
                        <Button text="Dark Theme" status="primary" onPress={createThemeSwitchActions(darkTheme)} />
                        <Button text="Light Theme" status="secondary" onPress={createThemeSwitchActions(lightTheme)} />
                    </HStack>
                </VStack>
            </Screen>
        </lvgl>
    </>
}
