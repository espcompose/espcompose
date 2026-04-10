---
sidebar_label: Simulator
sidebar_position: 3
---

# Simulator

The ESPCompose simulator lets you preview and interact with your LVGL UI in the browser — no hardware required. It compiles your project to Semantic IR, starts a local dev server, and hot-reloads the browser whenever you save a source file.

## Starting the simulator

From inside your project directory:

```bash
npx espcompose simulate
```

Or pass a path to the project:

```bash
npx espcompose simulate ./my-device
```

The simulator opens `http://127.0.0.1:5420` in your default browser automatically.

## Options

| Flag | Default | Description |
|------|---------|-------------|
| `-p, --port <port>` | `5420` | Port for the dev server |
| `--ha-bridge` | off | Connect to a real Home Assistant instance |
| `--no-open` | — | Do not open the browser automatically |
| `--debug` | off | Keep `.espcompose-build/` intermediate files for inspection |

## Mock bridge (default)

By default the simulator runs with a built-in mock bridge. Entity state is simulated locally — you can toggle lights, adjust sliders, and exercise your UI without a real Home Assistant instance. This is the fastest way to iterate on layouts.

## Real Home Assistant bridge (`--ha-bridge`)

Pass `--ha-bridge` to replace the mock with the Python HA bridge:

```bash
npx espcompose simulate --ha-bridge
```

The bridge spawns a Python process that runs a minimal ESPHome Native API server. Home Assistant can connect to the simulator as if it were a real device. Entity state flows from HA into the simulator UI in real time, and commands triggered in the UI (button presses, slider changes, etc.) are sent back to HA.

### Prerequisites

- Python 3.11+
- The bridge dependencies are bundled with the CLI — no separate install needed.
- Home Assistant must be able to reach the machine running the simulator on the configured port (default `5420`).

### Adding the device in Home Assistant

1. In Home Assistant, go to **Settings → Devices & Services → Add Integration**.
2. Search for **ESPHome** and add a new device.
3. Enter the hostname/IP of the machine running `espcompose simulate` and port `6053` (the ESPHome Native API port the bridge listens on).
4. Home Assistant will discover the entities defined in your project and start syncing state.

## Hot reload

Both bridge modes support hot reload. When you save any source file in your project, the simulator recompiles in the background and pushes the updated Semantic IR to the browser over WebSocket — no manual refresh needed.

Build errors are surfaced directly in the simulator UI so you can fix them without leaving the browser.

## Changing the port

```bash
npx espcompose simulate --port 3000
```

The browser will open at `http://127.0.0.1:3000`.
