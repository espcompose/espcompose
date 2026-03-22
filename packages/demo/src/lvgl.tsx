import { Display, ESPCompose, Ref } from "@esphome/compose";
import { Button, Screen, Text, VStack } from "@esphome/compose-ui";

type UIProps = {
    display: Ref<Display>,
}

export const UI = (props: UIProps) => {
    
    return <>
        <lvgl
            byteOrder="little_endian"
            bufferSize="100%"
            drawRounding={2}
            displays={[
                props.display
            ]}
        >
            <Screen>
                <VStack height="100%" width="100%">
                    <Text text="Hello World!" />
                    <Button text="Click Me" />
                </VStack>
            </Screen>
        </lvgl>
    </>
}
