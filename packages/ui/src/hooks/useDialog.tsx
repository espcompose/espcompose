/**
 * useDialog — Modal dialog with baked-in backdrop and themed container.
 *
 * Dialogs occupy the base overlay tier (z-order 0). They are drawn above
 * normal content but below toasts and notifications.
 *
 * The hook internally renders a full-screen semi-transparent backdrop with
 * dismiss-on-tap behavior, and a centered themed container around the user's
 * content. Users only provide the dialog body — no wrapper component needed.
 *
 * When used inside a `<Dialog.Provider maxDepth={N}>`, dialogs participate
 * in the visibility stack — showing a new dialog saves the current one,
 * and dismissing restores it. Without a provider, behaves as depth-1
 * (simple show/hide, no stacking).
 */

import { useOverlay, useVisibility, useVisibilityStack, useThemeSettings, adaptiveScreen, useOverlayTier, useContext } from '@espcompose/core';
import type { VisibilityController, EspComposeElement, SizeValue } from '@espcompose/core';
import { useSpacing } from './useSpacing';
import { UITheme } from '../theme/theme';
import { Text } from '../components/Text';
import { HStack } from '../components/Space';
import { mdiGlyphs } from '../theme/fonts';
import type { SpacingToken } from '../theme/types';
import { Backdrop } from '../components';
import { Dialog } from '../components/Dialog';
import { DialogTierContext } from '../providers/Dialog';

export type DialogController = VisibilityController;

export type DialogFactory = (ctrl: DialogController) => EspComposeElement | EspComposeElement[];

export interface DialogOptions {
  /** Dialog title displayed in the title bar. */
  title?: string;
  /** Hide the title bar chrome (title text and close button). Default: false. */
  hideTitleBar?: boolean;
  /** Padding inside the container. Default: 'lg'. */
  padding?: SpacingToken;
  /** Width of the dialog container. Default: adaptive by display class. */
  width?: SizeValue;
  /** Height of the dialog container. Default: 'fit-content'. */
  height?: SizeValue;
}

/**
 * Create a modal dialog overlay (z-order 0).
 *
 * The hook renders a full-screen backdrop (dismiss-on-tap) and a themed
 * centered container around your content. You only provide the body.
 *
 * @param factory  Render callback `(ctrl) => <content>`
 * @param options  Optional styling overrides
 * @returns        A `VisibilityController` with `.show()` / `.hide()`.
 *
 * @example
 * const dialog = useDialog((ctrl) => (
 *   <VStack gap="md">
 *     <Text text="Hello" />
 *     <Button text="Close" onPress={() => { ctrl.hide(); }} />
 *   </VStack>
 * ));
 *
 * <Button text="Open" onPress={() => { dialog.show(); }} />
 */
export function useDialog(factory: DialogFactory, options?: DialogOptions): DialogController {
  const stack = useVisibilityStack();

  // Get tier from context (Dialog.Provider) or create a fallback tier
  const contextTier = useContext(DialogTierContext);
  const tier = contextTier ?? useOverlayTier(
    { zOrder: 50 },
    <Backdrop
      style={{
        width: '100%',
        height: '100%',
      }}
    />,
  );

  // NOTE: Backdrop is now managed at the tier level (shared across all dialogs
  // in this tier). Individual dialog factories only return content widgets.

  const ctrl = useOverlay({ tier }, (overlayCtrl) => {
    const theme = UITheme.use();
    const settings = useThemeSettings();
    const width = options?.width ?? adaptiveScreen(settings ?? {}, {
      micro: '95%' as SizeValue,
      tiny: '90%' as SizeValue,
      compact: '85%' as SizeValue,
      medium: '75%' as SizeValue,
      large: '60%' as SizeValue,
      panel: '50%' as SizeValue,
      default: '85%' as SizeValue,
    });
    const height = options?.height ?? 'fit-content';

    const content = factory(overlayCtrl);
    const showTitleBar = !options?.hideTitleBar;

    const titleBar: EspComposeElement = (
      <HStack align="spaceBetween" crossAlign="center" style={{ width: '100%' }}>
        <Text variant="subtitle" text={options?.title ?? ''} />
        <lvgl-obj
          onPress={() => { overlayCtrl.hide(); }}
          style={{
            width: 'fit-content',
            height: 'fit-content',
            backgroundOpacity: 'transparent',
            borderWidth: 0,
            padding: 4,
          }}
        >
          <lvgl-label
            text={mdiGlyphs.close}
            style={{
              font: theme?.typography?.subtitle,
              color: theme?.colors?.textSecondary,
              placeSelf: 'center',
            }}
          />
        </lvgl-obj>
      </HStack>
    );

    const bodyChildren: EspComposeElement[] = Array.isArray(content) ? content : [content];

    const scrollRegion: EspComposeElement = (
      <lvgl-obj
        style={{
          width: '100%',
          height: 'fit-content',
          backgroundOpacity: 'transparent',
          borderWidth: 0,
          padding: 0,
          scrollbarMode: 'auto',
          display: 'flex',
          flexDirection: 'column',
          rowGap: useSpacing('md'),
        }}
      >
        {bodyChildren}
      </lvgl-obj>
    );

    const containerChildren: EspComposeElement[] = showTitleBar
      ? [titleBar, scrollRegion]
      : [scrollRegion];

    return [
      // Full-screen transparent dismiss layer — clicking outside the dialog
      // dismisses it. The visual backdrop is shared at the tier level; this
      // is just the per-overlay click target.
      <lvgl-obj
        onPress={() => { overlayCtrl.hide(); }}
        style={{
          width: '100%',
          height: '100%',
          backgroundOpacity: 'transparent',
          borderWidth: 0,
          padding: 0,
        }}
      />,
      <Dialog
        padding={options?.padding ?? 'lg'}
        style={{
          width: width,
          height: height,
          placeSelf: 'center',
          shadowColor: '#000000',
          shadowOpacity: '25%',
          shadowOffsetX: 6,
          shadowOffsetY: 6,
          shadowWidth: 6,
          shadowSpread: 0,
        }}
      >
        {containerChildren}
      </Dialog>,
    ];
  });

  if (stack) {
    return stack.register(ctrl); //, { afterShow: enterScript, beforeHide: exitScript });
  }
  return useVisibility(ctrl); //, { afterShow: enterScript, beforeHide: exitScript });
}
