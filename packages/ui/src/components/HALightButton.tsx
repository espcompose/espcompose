import type { WidgetProps } from '@espcompose/core';
import { createLvglWidget, useHAEntity, useMemo } from '@espcompose/core';
import { Button } from './Button';
import { Popup } from './Popup';
import { Slider } from './Slider';
import { HStack, VStack } from './Space';
import { Text } from './Text';
import { usePopup } from '../hooks/usePopup';

export type HALightButtonProps = WidgetProps<{
  entityId: `light.${string}`;
  label?: string;
  title?: string;
}, 'entityId' | 'label' | 'title'>;

export const HALightButton = createLvglWidget<HALightButtonProps>(
  (props) => {
    const light = useHAEntity(props.entityId, { domain: 'light' });
    const toggleLabel = useMemo(() => (light.isOn ? 'Turn Off' : 'Turn On'));

    const popup = usePopup((ctrl) => (
      <Popup onBackdropPress={() => { ctrl.hide(); }}>
        <VStack gap="md" style={{ width: '100%' }}>
          <HStack align="spaceBetween" crossAlign="center" style={{ width: '100%' }}>
            <Text variant="subtitle" text={props.title ?? props.label ?? props.entityId} />
            <Button
              text="X"
              size="xs"
              variant="outline"
              status="secondary"
              onPress={() => { ctrl.hide(); }}
            />
          </HStack>

          <Button
            status="primary"
            text={toggleLabel}
            onPress={() => { light.toggle(); }}
          />

          <Text variant="caption" text="Brightness" />
          <Slider
            min={0}
            max={255}
            value={light.brightness}
            onChange={(args) => { light.turnOn({ brightness: args.x }); }}
          />
        </VStack>
      </Popup>
    ));

    return (
      <Button
        text={props.label ?? props.entityId}
        onPress={() => { popup.show(); }}
        style={props.style}
      />
    );
  },
);
