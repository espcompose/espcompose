
type MyButtonProps = {
    text?: string,
    bgColor?: string,
}

export const MyButton = (props: MyButtonProps) => {
    return (
        <lvgl-button
            lineRounded={true}
            text={props.text}
            bgColor={props.bgColor}
            textColor="0xAAAAAA"
            height="80"
            width="160"
        >
        </lvgl-button>
    );
}
