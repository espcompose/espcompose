/**
 * Screensaver.Provider + useScreensaver() — Context-based screensaver system.
 *
 * The Provider component stores configuration (timeout, displayOffAfter,
 * hooks) in context.  A descendant component calls `useScreensaver()` with
 * the screensaver's content; the library auto-wraps it in a fullscreen
 * overlay whose touch handler dismisses the screensaver.
 *
 * The `mode: 'restart'` script is the idiomatic ESPHome pattern for
 * resettable timers: each `.execute()` call restarts the countdown
 * from scratch without polling.
 *
 * State machine:
 *
 *   IDLE -(timeout)-> SCREENSAVER -(displayOffAfter)-> DISPLAY_OFF
 *     ^                    |                                |
 *     +----(resume)--------+--------(resume)----------------+
 *
 * Terminology:
 *   - **suspend** — activate the screensaver (show overlay)
 *   - **resume** — dismiss the screensaver (hide overlay, restore display)
 *   - **enable/disable** — start/stop the inactivity timer
 *   - **reset** — restart the inactivity countdown
 *
 * @example
 * const suspend = useScript(async () => { backlightRef.turnOff(); });
 * const wake = useScript(async () => { backlightRef.turnOn(); });
 * const hooks = useController<ScreensaverHooks>({
 *   onSuspend: suspend,
 *   onResume: wake,
 * });
 *
 * <Screensaver.Provider timeout="20s" displayOffAfter="60s" hooks={hooks}>
 *   <MyApp />
 * </Screensaver.Provider>
 *
 * // Inside MyApp or any descendant — just pass the content:
 * const screensaver = useScreensaver(<Clock />);
 * // screensaver.suspend(), screensaver.resume(), screensaver.enable(),
 * // screensaver.disable(), screensaver.reset()
 */

import type { EspComposeElement } from '@espcompose/core';
import {
  createElement,
  createContext,
  useContext,
  createLvglContextProvider,
  useOverlay,
  useOverlayTier,
  useScript,
  useGlobal,
  useController,
  delay,
  parseDurationToMs,
} from '@espcompose/core';
import { registerComponent, generateId } from '@espcompose/core/internals';
import type { Controller } from '@espcompose/core';

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

/**
 * Controller returned by `useScreensaver()`.
 *
 * - `suspend()` — immediately activates the screensaver (bypasses timeout).
 * - `resume()` — dismisses the screensaver and restarts the idle timer.
 * - `enable()` — starts the inactivity timer.
 * - `disable()` — stops the inactivity timer and dismisses if active.
 * - `reset()` — restarts the inactivity countdown. If the screensaver is
 *   active, dismisses it first.
 */
export interface ScreensaverController {
  suspend(): void;
  resume(): void;
  enable(): void;
  disable(): void;
  reset(): void;
}

/**
 * Lifecycle hooks for the screensaver.
 *
 * Build with `useController<ScreensaverHooks>()` and pass to the provider
 * via the `hooks` prop.
 *
 * @example
 * const hooks = useController<ScreensaverHooks>({
 *   onSuspend: useScript(async () => { backlightRef.turnOff(); }),
 *   onResume: useScript(async () => { backlightRef.turnOn(); }),
 * });
 */
export interface ScreensaverHooks {
  /** Called when the display should be powered down (after `displayOffAfter`). */
  onSuspend(): void;
  /** Called when the screensaver is dismissed (touch or programmatic). */
  onResume(): void;
}

/** Content for the screensaver — rendered fullscreen, dismissed on touch. */
export type ScreensaverContent = EspComposeElement | EspComposeElement[];

export interface ScreensaverProviderProps {
  /**
   * Inactivity duration before the screensaver activates.
   * ESPHome duration literal (e.g. `'5min'`, `'30s'`).
   */
  timeout: string;

  /**
   * Duration after the screensaver activates before `hooks.onSuspend()` fires.
   * When omitted, the display stays on while the screensaver is showing.
   * ESPHome duration literal (e.g. `'10min'`).
   */
  displayOffAfter?: string;

  /**
   * Lifecycle hooks controller for display power management.
   * Build with `useController<ScreensaverHooks>()`.
   *
   * When omitted, no suspend or resume actions are performed —
   * the screensaver overlay is shown/hidden without side effects.
   */
  hooks?: Controller<ScreensaverHooks>;

  /** Child elements that can access `useScreensaver()`. */
  children?: EspComposeElement | EspComposeElement[];
}

// ────────────────────────────────────────────────────────────────────────────
// Context (stores provider config for the useScreensaver hook)
// ────────────────────────────────────────────────────────────────────────────

interface ScreensaverConfig {
  timeout: string;
  displayOffAfter: string;
  hooks: Controller<ScreensaverHooks> | undefined;
}

const ScreensaverConfigCtx = createContext<ScreensaverConfig | null>(null);

// ────────────────────────────────────────────────────────────────────────────
// Provider (config only — no scripts, no overlay)
// ────────────────────────────────────────────────────────────────────────────

/**
 * Screensaver.Provider — stores screensaver configuration in context.
 *
 * A descendant component must call `useScreensaver(content)` to create
 * the overlay, scripts, and controller.
 */
function ScreensaverProvider(props: ScreensaverProviderProps): EspComposeElement {
  const {
    timeout,
    displayOffAfter = '9999h',
    hooks,
    children,
  } = props;

  const config: ScreensaverConfig = { timeout, displayOffAfter, hooks };

  return createElement('context', { context: ScreensaverConfigCtx, value: config }, children);
}

// ────────────────────────────────────────────────────────────────────────────
// Consumer hook — creates overlay, scripts, and controller
// ────────────────────────────────────────────────────────────────────────────

/**
 * Create the screensaver overlay and return a controller.
 *
 * Must be called within a `<Screensaver.Provider>`. The library renders
 * the supplied content inside a fullscreen overlay whose built-in touch
 * handler dismisses the screensaver and fires `onResume`.
 *
 * @param content  The screensaver's widget tree.
 * @returns A branded `ScreensaverController`.
 *
 * @example
 * const screensaver = useScreensaver(<Clock />);
 */
export function useScreensaver(content: ScreensaverContent): Controller<ScreensaverController> {
  const config = useContext(ScreensaverConfigCtx);
  if (!config) {
    throw new Error('useScreensaver() must be used within a <Screensaver.Provider>.');
  }

  const { timeout, displayOffAfter, hooks } = config;

  // Parse duration strings to milliseconds at render time so the captured
  // closure values are plain numbers. (If they're left as strings, the C++
  // closure field becomes `std::string` which can't be returned from a
  // delay lambda expecting `uint32_t`.)
  const timeoutMs = parseDurationToMs(timeout as Parameters<typeof parseDurationToMs>[0]);
  const displayOffAfterMs = parseDurationToMs(displayOffAfter as Parameters<typeof parseDurationToMs>[0]);

  // ── Noop hooks (always created — hooks can't be conditional) ────────────
  const noopSuspend = useScript(async () => {});
  const noopResume = useScript(async () => {});
  const noopHooks = useController<ScreensaverHooks>({
    onSuspend: noopSuspend,
    onResume: noopResume,
  });
  const effectiveHooks = hooks ?? noopHooks;

  // ── State ───────────────────────────────────────────────────────────────
  const isActive = useGlobal('boolean', { initialValue: false });

  // ── Overlay tier (topmost) ──────────────────────────────────────────────
  const screensaverTier = useOverlayTier({ zOrder: 1000, bringToFront: false });

  // Closure slot for the controller we build inside the factory below.
  // All scripts reference `overlayCtrl` (the factory arg) instead of the
  // outer `overlay` result, which breaks the script ↔ overlay forward-ref
  // cycle. Scripts are declared in topological order within the factory.
  let ctrl!: Controller<ScreensaverController>;

  useOverlay({ tier: screensaverTier }, (overlayCtrl) => {
    // ── Idle timer script (mode: 'restart') ───────────────────────────────
    // Declared first so resume/reset/disable can reference it.
    const idleScript = useScript(async () => {
      await delay(timeoutMs);

      overlayCtrl.show();
      isActive.set(true);

      await delay(displayOffAfterMs);
      effectiveHooks.onSuspend();
    }, { mode: 'restart' });
    // Auto-start the idle timer on boot. ESPHome scripts don't auto-run, so
    // we register a one-shot `interval:` automation with `startup_delay: 0s`
    // and a long `interval:` so it effectively fires once at boot. The
    // script has `mode: 'restart'`, so any later activity-driven
    // `.execute()` just resets the timer.
    registerComponent({
      kind: 'component',
      section: 'interval',
      id: generateId('ivl_screensaver'),
      config: {
        interval: '24h',
        startup_delay: '0s',
        then: [
          { 'script.execute': { id: idleScript.id, closure_index: 0 } },
        ],
      },
    });
    // ── Resume script ─────────────────────────────────────────────────────
    const resumeScript = useScript(async () => {
      overlayCtrl.hide();
      isActive.set(false);
      effectiveHooks.onResume();
      idleScript.execute();
    });

    // ── Suspend script (bypass timeout) ───────────────────────────────────
    const suspendScript = useScript(async () => {
      idleScript.stop();
      overlayCtrl.show();
      isActive.set(true);

      await delay(displayOffAfterMs);
      effectiveHooks.onSuspend();
    });

    // ── Enable script ─────────────────────────────────────────────────────
    const enableScript = useScript(async () => {
      idleScript.execute();
    });

    // ── Disable script ────────────────────────────────────────────────────
    const disableScript = useScript(async () => {
      idleScript.stop();
      // eslint-disable-next-line @espcompose/eslint/no-untracked-signal -- global read in action condition
      if (isActive.value === true) {
        overlayCtrl.hide();
        isActive.set(false);
        effectiveHooks.onResume();
      }
    });

    // ── Reset script ──────────────────────────────────────────────────────
    const resetScript = useScript(async () => {
      // eslint-disable-next-line @espcompose/eslint/no-untracked-signal -- global read in action condition
      if (isActive.value === true) {
        overlayCtrl.hide();
        isActive.set(false);
        effectiveHooks.onResume();
      }
      idleScript.execute();
    });

    ctrl = useController<ScreensaverController>({
      suspend: suspendScript,
      resume: resumeScript,
      enable: enableScript,
      disable: disableScript,
      reset: resetScript,
    });

    // Library-owned fullscreen wrapper with built-in touch-to-dismiss.
    // `resumeScript` is declared above, so the onPress handler has no
    // forward references. JSX (not createElement) is required so the
    // compiler can transform `onPress` into an action.
    return (
      <lvgl-obj style={{ height: '100%', width: '100%' }}>
        {content}
        <lvgl-obj
          onPress={() => { resumeScript.execute(); }}
          style={{ height: '100%', width: '100%', opacity: 'transparent' }}
        />
      </lvgl-obj>
    );
  });

  return ctrl;
}

// ────────────────────────────────────────────────────────────────────────────
// Namespace export
// ────────────────────────────────────────────────────────────────────────────

/**
 * Screensaver namespace — provides `Screensaver.Provider` for use in JSX.
 *
 * @example
 * <Screensaver.Provider timeout="20s" displayOffAfter="60s" hooks={hooks}>
 *   <MyApp />
 * </Screensaver.Provider>
 */
export const Screensaver = {
  Provider: createLvglContextProvider(ScreensaverProvider),
};
