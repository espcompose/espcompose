---
id: intro
title: Introduction
sidebar_position: 1
---

# Introduction

**ESPCompose** is a TypeScript-to-ESPHome compiler. You write device configurations and touchscreen UIs in JSX/TSX, and the compiler produces standard ESPHome YAML and C++ that runs on ESP32 microcontrollers — no YAML by hand, no lambda string escaping, no copy-paste boilerplate.

```tsx
import { secret, useHAEntity } from '@espcompose/core';
import { Screen, VStack, Text, Button } from '@espcompose/ui';

const LightToggle = ({ entity, label }) => {
  const light = useHAEntity(entity);
  return (
    <Button
      text={light.isOn ? `${label} On` : `${label} Off`}
      onPress={() => { light.toggle(); }}
    />
  );
};

export default (
  <esphome name="my-panel">
    <esp32 board="esp32-s3-devkitc-1" framework={{ type: 'esp-idf' }} />
    <wifi ssid={secret('wifi_ssid')} password={secret('wifi_password')} />
    <api />
    <lvgl displays={[display]}>
      <Screen>
        <VStack>
          <Text variant="title" text="Living Room" />
          <LightToggle entity="light.office" label="Office" />
          <LightToggle entity="light.gym" label="Gym" />
        </VStack>
      </Screen>
    </lvgl>
  </esphome>
);
```

That entire file — device setup, UI layout, and Home Assistant integration — compiles down to ESPHome YAML and C++ headers in a single `npx espcompose transpile`.

## Why ESPCompose?

### Reusable Components

Extract any piece of configuration or UI into a function component. Share it across devices, publish it as a library, or import one from the community. No more copying YAML blocks between files.

### Real Data Binding

`useHAEntity()` binds a Home Assistant entity to your UI. The compiler generates a C++ signal graph that updates widgets automatically when entity state changes — no lambdas, no template sensors, no manual plumbing.

### Type-Safe Everything

Every ESPHome platform, LVGL widget, and UI component has full TypeScript types, auto-generated from the ESPHome schema. Your editor catches typos, invalid props, and missing config *before* anything hits the device.

### A Design System for LVGL

The `@espcompose/ui` package provides high-level components — `Screen`, `Card`, `VStack`, `HStack`, `Button`, `Slider`, `Switch`, `Text`, and more — with built-in theming, flex layouts, and runtime theme switching. You can drop down to raw LVGL intrinsic elements whenever you need full control.

### Instant Preview

Run `espcompose run --host` to preview your LVGL UI on your local machine using SDL2 — no hardware required. The `--host` flag targets the ESPHome host platform, compiling and running your project locally with an SDL2 display window. Use `--width` and `--height` to override display dimensions.

### Works With the Ecosystem

ESPCompose generates *standard* ESPHome YAML. It doesn't replace ESPHome — it sits on top of it. Your existing ESPHome add-ons and tooling continue to work. And because it's built on Node.js, you can pull in any NPM package to power your build pipeline.

## How It Works

The compiler runs a multi-phase pipeline:

1. **Type-check** your TSX source with the TypeScript compiler
2. **Lint** with custom ESPCompose ESLint rules
3. **Transform** the AST — extracting reactive expressions and compiling action handlers into structured IR
4. **Bundle** with esbuild into a single module
5. **Execute** the bundle in Node.js to produce a target-agnostic **Semantic IR**
6. **Emit** to a target backend — ESPHome YAML + C++ headers for devices, or a local SDL2 preview with `--host`

The Semantic IR is the key abstraction: a typed, target-agnostic tree that carries every detail — reactive bindings, refs, actions, secrets, assets — so backends can emit to any format without the compiler knowing or caring what comes next.

For a deeper dive, see the [Architecture Overview](architecture/architecture.md).

## Getting Started

Set up your first project in under a minute:

```bash
npx @espcompose/cli init my-device
cd my-device
npm install
npx espcompose transpile
```

The generated YAML lands in `.espcompose/esphome.yaml`, ready for `esphome run`. See the [Getting Started guide](./getting-started.md) for the full walkthrough.

## Get Involved

ESPCompose is a new project in active development, and this is the best time to shape it. Whether that means reporting a bug, requesting a feature, contributing a component, or just sharing what you're building — we want to hear from you.

- [**GitHub**](https://github.com/espcompose/espcompose) — star the repo, file issues, open PRs
- [**Discord**](https://discord.gg/JjKTDUQW) — chat with the team and other builders
- [**Demo Repo**](https://github.com/espcompose/espcompose-demo) — a working example project to clone and explore

The foundation is here. Help us build what comes next.
