## Popup System Design: Mux Signal + Hook-Path Dedup

Design for a `usePopup()` hook in the UI library, enabling design-system components
(e.g., `<LightButton>`) to define custom popups with arbitrary child widgets. The
hook is unopinionated about popup content — there are no prescribed ok/cancel
buttons. The user provides a **render callback** that receives a `PopupController`
for dismissal, and can include any widgets with any action handlers. The core
scaling problem: N instances of the same component should share a single popup
widget subtree, not generate N copies.

The render callback is evaluated once per component instance at compile time.
Only the first instance's widget subtree is emitted; subsequent instances
contribute only their reactive bindings and action handlers to the mux tables.
This gives the user a simple, closure-based API while the system deduplicates
automatically.

---

### Problem Statement

In espcompose's static single-pass render model, every widget that could ever
appear must be pre-rendered into the IR. A naive `usePopup()` inside `<LightButton>`
would produce N separate popup widget subtrees hoisted to `top_layer` — each with
a backdrop, container, title, controls, and buttons. On ESP32 this is ~200 bytes
per LVGL object × ~6 objects × N instances = significant RAM waste for
structurally identical content.

---

### Chosen Approach: Mux Signal + Hook-Path Dedup

Two mechanisms working together:

1. **Hook-path deduplication** — `usePopup()` uses the function component call
   stack as an implicit dedup key. The first `<LightButton>` instance renders the
   popup subtree; subsequent instances get a handle to the same popup.

2. **C++ mux signal** — the generated C++ emits a `Signal<int32_t>` (the popup
   entity selector) plus switch-expression `Memo<T>` nodes for each reactive
   binding in the popup, and switch-dispatch for action handlers inside the
   popup. Each button's long-press action sets the mux index and shows the
   popup. The reactive `Scheduler::flush()` propagates the correct entity's
   values into the popup's widgets, and action handlers dispatch to the
   correct instance's compiled actions.

#### Why this approach

- **Fully reactive popups** — popup content stays live while open. If a light's
  brightness changes via the HA app, the popup's slider updates in real time.
  Script-based approaches show stale values from the moment of opening.
- **Minimal resource cost** — 1 popup (6 LVGL objects) + 1 mux signal (~32 bytes)
  + K switch-memos (~40 bytes each). For 8 entities with 3 reactive props each,
  total overhead is ~150 bytes vs. ~9,600 bytes for 8 full popup instances.
- **Zero per-instance scripts** — no YAML bloat. The show action is just a
  lambda setting the mux index + `lvgl.widget.show`.
- **Generalizable pattern** — the mux primitive applies beyond popups: shared
  detail panels, dynamic card content, parameterized pages. Building it for
  popup unlocks all of them.

---

### Architecture

#### User-Facing API

```tsx
function LightButton({ binding }: { binding: LightBinding }) {
  const light = binding;

  // Render callback receives a PopupController — no forward reference needed.
  // The factory is evaluated per instance, but only instance #0's widget
  // subtree is emitted. All instances' bindings and actions are muxed.
  const popup = usePopup((ctrl) => (
    <VStack>
      <Text variant="title" text={useMemo(() => light.isOn ? "On" : "Off")} />
      <Slider label="Brightness" value={light.brightness} />
      <HStack>
        {/* User decides what buttons exist and what they do */}
        <Button text="Toggle" onPress={async () => {
          light.toggle();     // muxed: dispatches to the correct entity
          ctrl.dismiss();
        }} />
        <Button text="Close" status="neutral" onPress={() => {
          ctrl.dismiss();
        }} />
      </HStack>
    </VStack>
  ));

  return (
    <Button
      text={useMemo(() => light.isOn ? "On" : "Off")}
      onLongPress={() => { popup.show(); }}
    />
  );
}

// Usage — 8 instances, 1 popup in top_layer
const kitchen = useHAEntity('light.kitchen');
const bedroom = useHAEntity('light.bedroom');
const livingRoom = useHAEntity('light.living_room');

<Screen>
  <LightButton binding={kitchen} />
  <LightButton binding={bedroom} />
  <LightButton binding={livingRoom} />
  {/* ... */}
</Screen>
```

#### ESPHome Output Structure

The popup goes into the LVGL `top_layer` section:

```yaml
lvgl:
  top_layer:
    widgets:
      # Backdrop — full-screen touch-eating overlay
      - obj:
          id: popup_LightButton_backdrop
          width: 100%
          height: 100%
          bg_color: 0x000000
          bg_opa: 128
          clickable: true
          hidden: true
      # Popup container
      - obj:
          id: popup_LightButton_container
          align: CENTER
          width: 80%
          height: SIZE_CONTENT
          hidden: true
          widgets:
            - label:
                id: popup_LightButton_title
                # ... reactive binding via mux memo
            - slider:
                id: popup_LightButton_slider
                # ... reactive binding via mux memo
            - obj: # user-defined button row
                widgets:
                  - button: { id: popup_LightButton_btn_0, text: "Toggle" }
                  - button: { id: popup_LightButton_btn_1, text: "Close" }
```

The popup infrastructure only manages the backdrop + container + show/hide.
Everything inside the container is user-provided children — the system does
not inject or prescribe any buttons.

#### Generated C++ (espcompose_bindings.h)

```cpp
// Mux signal — which entity is the popup currently showing?
Signal<int32_t> popup_LightButton_mux;

// Per-entity signals (already exist from useHAEntity)
Signal<bool> sig_ha_light_kitchen;
Signal<bool> sig_ha_light_bedroom;
// ...

// Switch-expression memo for popup title binding
Memo<bool> popup_LightButton_is_on([]() -> bool {
  switch (popup_LightButton_mux.get()) {
    case 0: return sig_ha_light_kitchen.get();
    case 1: return sig_ha_light_bedroom.get();
    // ...
    default: return false;
  }
});

// Show action (in each button's on_long_press): just sets mux + shows
// popup_LightButton_mux.set(0); // entity index for this button
// lv_obj_clear_flag(popup_LightButton_backdrop, LV_OBJ_FLAG_HIDDEN);
// lv_obj_clear_flag(popup_LightButton_container, LV_OBJ_FLAG_HIDDEN);
// Scheduler::instance().flush();

// Action mux — popup's "Toggle" button dispatches by mux index
void popup_LightButton_action_0() {
  switch (popup_LightButton_mux.get()) {
    case 0: call_ha_service("light/toggle", {{"entity_id", "light.kitchen"}}); break;
    case 1: call_ha_service("light/toggle", {{"entity_id", "light.bedroom"}}); break;
    // ...
  }
  // dismiss (shared across all instances)
  lv_obj_add_flag(&id(popup_LightButton_backdrop), LV_OBJ_FLAG_HIDDEN);
  lv_obj_add_flag(&id(popup_LightButton_container), LV_OBJ_FLAG_HIDDEN);
}
```

---

### Implementation Layers

#### 1. Hook Path Tracking (core)

Extend `_currentHookPath` in `hooks/useState.ts` from a flat string to a
component call stack. Push/pop the component function name during JSX traversal.

**Where to modify:**
- `packages/core/src/runtime.ts` — `toPlainObject()` where function components
  are called
- `packages/core/src/lvgl.ts` — `resolveLvglChildren()` where function
  components are resolved

```typescript
// Pseudocode for function component resolution
if (typeof el.type === 'function') {
  pushHookPath(el.type.name || 'anonymous');
  const result = el.type(el.props);
  popHookPath();
}
```

This improvement also benefits error messages for hook rule violations and
enables better deduplication for future hooks.

#### 2. Popup Scope Registry (core)

A side-channel registry (analogous to `withScriptScope` for scripts and
`reactiveScopeContext` for bindings) that collects popup definitions during
the render pass.

**Key types:**

```typescript
interface PopupDefinition {
  /** Dedup key derived from hook path (component identity). */
  templateKey: string;
  /** The rendered widget subtree for top_layer (from first instance only). */
  backdropElement: EspComposeElement;
  containerElement: EspComposeElement;
  /** Per-instance data, accumulated across all callers. */
  instances: PopupInstance[];
}

interface PopupInstance {
  /** Mux index (0, 1, 2... in order of discovery). */
  index: number;
  /** Reactive bindings captured during this instance's factory eval. */
  reactiveBindings: IRBinding[];
  /** Compiled action handlers captured during this instance's factory eval. */
  actionHandlers: Map<string, IRActionNode[]>;
  /** Map from popup binding → source signal for this instance's entity. */
  sourceMap: Map<string, IRReactiveNode>;
}
```

Note that `reactiveBindings` and `actionHandlers` live on each instance, not
on the definition. This is because every instance's render callback is
evaluated (to capture its unique closures), even though only instance #0's
widget subtree is serialized.

**Registry API:**
- `registerPopup(key, definition)` — first caller, stores the definition
- `addPopupInstance(key, instance)` — subsequent callers, appends an instance
- `getPopupDefinitions()` — compiler retrieves all popups post-render

#### 3. Mux Expression Node (core IR)

Add a `mux` node kind to `ExprIR` (`packages/core/src/ir/expr-types.ts`):

```typescript
interface ExprMux {
  kind: 'mux';
  /** Expression yielding the selector index (the mux signal). */
  index: ExprNode;
  /** Ordered case expressions — one per popup instance. */
  cases: ExprNode[];
  /** C++ return type. */
  type: ExprType;
}
```

#### 4. Mux Codegen (target-esphome)

Extend `exprToCpp()` in `packages/target-esphome/src/expr-to-cpp.ts`:

```typescript
case 'mux': {
  const idx = exprToCpp(node.index, ctx);
  const cases = node.cases.map((c, i) =>
    `case ${i}: return ${exprToCpp(c, ctx)};`
  );
  return `([&]() -> ${node.cppType} { switch(${idx}) { ${cases.join(' ')} default: return {}; } })()`;
}
```

Extend `buildRuntimeConfig()` in `reactive-config.ts` to emit mux signals and
switch-memos from popup definitions.

#### 5. Top Layer Serialization (core)

Extend `buildLvglSection()` in `packages/core/src/lvgl.ts` to emit
`top_layer: { widgets: [...] }` from collected popup definitions. Currently
the function handles `pages` and `widgets` — `top_layer` is a third output
channel, structurally identical to a page.

#### 6. `usePopup()` Hook (core hooks)

**Render callback pattern.** `usePopup` takes a factory function, not a
children prop. This avoids a forward-reference problem: with `children`,
the JSX is evaluated before `usePopup()` returns, so `popup.dismiss()`
would reference an uninitialized variable. The factory receives the
controller as a parameter, so it's always in scope.

Every instance evaluates the factory (to capture its unique closures and
reactive bindings), but only the first instance's widget subtree is
serialized into the IR. Subsequent instances contribute only their
binding records and action handler records to the mux tables.

```typescript
type PopupFactory = (ctrl: PopupController) => EspComposeElement;

function usePopup(factory: PopupFactory): PopupController {
  assertHookContext('usePopup()');
  const templateKey = getCurrentHookPath();
  const ctrl = createPopupController(templateKey);

  // Evaluate the factory — captures this instance's closures
  const children = factory(ctrl);

  if (popupRegistry.has(templateKey)) {
    // Subsequent caller — discard widget subtree, keep bindings + actions
    const def = popupRegistry.get(templateKey);
    const instance = capturePopupInstance(def.instances.length);
    def.instances.push(instance);
  } else {
    // First caller — store widget subtree + first instance data
    const definition = buildPopupDefinition(children, templateKey);
    const instance = capturePopupInstance(0);
    definition.instances.push(instance);
    popupRegistry.set(templateKey, definition);
  }

  return ctrl;
}
```

**Why evaluate every instance?** The factory closes over each instance's
entity bindings (`light.toggle()`, `light.isOn`, etc.). Even though the
widget tree is structurally identical, the compiled action bodies differ
per instance (kitchen light vs. bedroom light). The popup registry
captures these per-instance action lists to build the mux switch table.

**Compile-time cost:** Each evaluation creates JS element objects that are
immediately discarded for instances 2-N. This is negligible — small JS
objects during the build, not device-side allocation.

---

**`PopupController`** — passed into the factory and also returned from
`usePopup()`:

```typescript
interface PopupController {
  readonly [BINDING_BRAND]?: true;
  /** Show the popup — sets mux index + unhides backdrop & container. */
  show(): void;
  /** Dismiss the popup — hides backdrop & container. */
  dismiss(): void;
}
```

The controller is `BINDING_BRAND`-marked so both `show()` and `dismiss()`
can be called inside trigger handler bodies (`onPress`, `onLongPress`, etc.).
The user decides _when_ to dismiss — from any button, swipe handler, or timer.

**Usage:**

```tsx
const popup = usePopup((ctrl) => (
  <VStack>
    <Text variant="title" text="Settings" />
    {/* ctrl is a function parameter — no forward reference */}
    <Button text="Done" onPress={() => { ctrl.dismiss(); }} />
    <Button text="Reset" onPress={async () => {
      await someScript();
      ctrl.dismiss();
    }} />
  </VStack>
));

// popup.show() is used externally
<Button onLongPress={() => { popup.show(); }} />
```

#### 7. Action Compiler Support

The action tree compiler needs to recognize:
- `popup.show()` / `ctrl.show()` → lambda: `popup_mux.set(N)` + `lv_obj_clear_flag(backdrop, LV_OBJ_FLAG_HIDDEN)` + `lv_obj_clear_flag(container, LV_OBJ_FLAG_HIDDEN)` + `Scheduler::flush()`
- `ctrl.dismiss()` → `lv_obj_add_flag(backdrop, LV_OBJ_FLAG_HIDDEN)` + `lv_obj_add_flag(container, LV_OBJ_FLAG_HIDDEN)`

These are similar to existing ref action methods — compile-time no-ops with
`BINDING_BRAND` that the AST transformer recognizes. `dismiss()` is intentionally
named differently from `hide()` to avoid confusion with `lvgl.widget.hide`
which operates on arbitrary widgets.

**Action muxing.** Action handlers _inside_ the popup (e.g., a "Toggle"
button's `onPress`) also need to dispatch to the correct entity. The action
compiler generates a switch on the mux signal for these handlers:

```cpp
// Generated for popup's "Toggle" button onPress
void popup_LightButton_action_0() {
  switch (popup_LightButton_mux.get()) {
    case 0: call_ha_service("light/toggle", {{"entity_id", "light.kitchen"}}); break;
    case 1: call_ha_service("light/toggle", {{"entity_id", "light.bedroom"}}); break;
    // ...
  }
  // dismiss is shared — not muxed
  lv_obj_add_flag(&id(popup_LightButton_backdrop), LV_OBJ_FLAG_HIDDEN);
  lv_obj_add_flag(&id(popup_LightButton_container), LV_OBJ_FLAG_HIDDEN);
}
```

This works because every instance's factory is evaluated, capturing each
instance's compiled action list. The popup registry accumulates these into
a mux switch table — symmetric with how reactive bindings are muxed.

`ctrl.dismiss()` calls within action handlers are **not muxed** — they
compile to the same hide calls regardless of which entity is active.

#### 8. UI Library Component (ui)

A `Popup` wrapper component and themed defaults for the chrome only:

- Backdrop: `bg_color` from theme `colors.overlay`, `bg_opa: 128`
- Container: theme `colors.surface`, `radius` from theme, padding from theme

The UI component does **not** inject any buttons or controls. It provides
only the backdrop/container chrome. All content — including any dismiss
buttons — is the user's responsibility via `children`.

Optionally, a convenience `<PopupFooter>` component could provide a standard
button row layout without prescribing which buttons exist:

```tsx
// Optional convenience — not part of the core popup system
function PopupFooter({ children }: { children: EspComposeElement }) {
  return <HStack gap="sm" justify="end">{children}</HStack>;
}
```

#### 9. Intent System

Add popup-related intents to `intent-registry.ts`:
- New intent `lvgl:overlay` for top-layer widgets
- `usePopup`'s rendered subtree validates children as `lvgl:widget`

#### 10. Simulator Backend

`packages/target-simulator` needs to render `top_layer` popups:
- Absolutely-positioned overlay div with semi-transparent backdrop
- Popup container centered within the overlay
- Show/hide toggled by simulated mux signal changes

---

### Resource Comparison

| Approach | LVGL objects | Scripts | C++ nodes | RAM overhead |
|---|---|---|---|---|
| Naive (N popups) | 6N | 0 | N binding sets | ~1,200N bytes |
| N scripts + 1 popup | 6 | N | standard | 6 objects + N scripts |
| **Mux signal (chosen)** | **6** | **0** | **1 signal + K memos** | **~150 bytes (K=3, N=8)** |

---

### Ordering of Work

1. **Hook path tracking** — prerequisite for dedup; also independently valuable
2. **Mux `ExprIR` node + `exprToCpp` case** — small, testable in isolation
3. **Popup scope registry** — the core side-channel, similar to existing registries
4. **`top_layer` serialization** — extend `buildLvglSection()`
5. **`usePopup()` hook** — wires everything together
6. **Action compiler: show/dismiss + action muxing** — `show()`/`dismiss()` as action primitives; mux switch generation for action handlers inside popups
7. **UI Popup component** — themed wrapper using the hook
8. **Simulator support** — overlay rendering for `top_layer`

Steps 1-2 are independently useful and can land first. Steps 3-6 form the core
feature (action muxing in step 6 is the most complex). Steps 7-8 are the
user-facing polish.

---

### Future Extensions

The mux signal pattern generalizes beyond popups:

- **Shared detail panels** — a sidebar showing details for the focused list item
- **Dynamic card content** — a card whose labels change based on selected
  room/zone
- **Parameterized pages** — a single "entity detail" page reused across
  navigation instead of N copies
- **`useAlert()`** — a simpler popup variant backed by ESPHome `msgboxes`
  (title + body + buttonmatrix) for cases that don't need custom widgets

All are the same pattern: one widget subtree, a selector signal, reactive
data flow through the mux.

---

### Design Decisions Log

**Render callback instead of children prop.** A `children`-based API creates
a forward reference: `popup.dismiss()` is used inside the JSX that's passed
_to_ `usePopup()`, before the return value is assigned. While this technically
works in JS (closures capture by reference, and action handlers are compiled
at build time, never called at render), it reads as broken code. The factory
pattern `usePopup((ctrl) => ...)` avoids this — `ctrl` is a function
parameter, unambiguously in scope.

**Evaluate factory N times, emit once.** Every `<LightButton>` instance's factory
is evaluated so the compiler captures its unique closures (entity-specific
reactive bindings and action handlers). Only instance #0's widget subtree is
serialized into the IR. The compile-time cost of creating and discarding
element objects for instances 2-N is negligible (small JS objects during build).

**Action muxing is symmetric with binding muxing.** Just as reactive bindings
are muxed (a `Memo<T>` that switches on the mux signal to read the correct
entity's value), action handlers inside the popup are muxed (a C++ function
that switches on the mux signal to call the correct entity's service).
This symmetry keeps the mental model simple: the mux signal selects _everything_
about which entity the popup operates on, both reads and writes.

**No prescribed buttons.** The popup system manages only the backdrop +
container + show/dismiss lifecycle. All content — buttons, sliders, labels —
is the user's responsibility. This avoids baking in assumptions about popup
layout that would need to be worked around later.

**`dismiss()` not `hide()`.** Named to avoid confusion with
`lvgl.widget.hide`, which is a general-purpose action on arbitrary widgets.
`dismiss()` is popup-specific and always hides both the backdrop and container.
