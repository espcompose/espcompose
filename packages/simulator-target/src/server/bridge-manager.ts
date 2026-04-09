// ────────────────────────────────────────────────────────────────────────────
// BridgeManager — Python bridge process lifecycle management
//
// Spawns, monitors, and communicates with the Python ESPHome bridge process
// via newline-delimited JSON on stdio. Handles venv auto-bootstrap, readiness
// detection, graceful shutdown, and crash recovery with exponential backoff.
// ────────────────────────────────────────────────────────────────────────────

import { spawn, execSync, type ChildProcess } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import {
  isBridgeToNodeMessage,
  type NodeToBridgeMessage,
  type BridgeToNodeMessage,
} from './bridge-protocol';

// ── Public interface ─────────────────────────────────────────────────────────

export type BridgeStatus = 'stopped' | 'starting' | 'ready' | 'error';

export interface BridgeManagerOptions {
  /** Override path to the Python bridge main.py (defaults to bundled asset). */
  bridgePath?: string;
  /** Python executable name or path. Default: 'python3'. */
  pythonPath?: string;
  /** Project directory — venv is created at <projectDir>/.espcompose/bridge-venv/. */
  projectDir: string;
  /** Timeout in ms for bridge_ready after spawn. Default: 10000. */
  readyTimeoutMs?: number;
  /** Called when a message arrives from the Python bridge. */
  onMessage?: (msg: BridgeToNodeMessage) => void;
  /** Called when bridge status changes. */
  onStatusChange?: (status: BridgeStatus, error?: string) => void;
}

export interface BridgeManager {
  /** Current bridge status. */
  readonly status: BridgeStatus;
  /** Send a message to the Python bridge. No-op if bridge is not running. */
  send(msg: NodeToBridgeMessage): void;
  /** Gracefully shut down the bridge process. */
  close(): Promise<void>;
}

// ── Venv constants ───────────────────────────────────────────────────────────

const VENV_SUBDIR = path.join('.espcompose', 'bridge-venv');

// ── Implementation ───────────────────────────────────────────────────────────

const MAX_RESTART_DELAY_MS = 10_000;
const INITIAL_RESTART_DELAY_MS = 1_000;

export async function createBridgeManager(options: BridgeManagerOptions): Promise<BridgeManager> {
  const {
    bridgePath = defaultBridgePath(),
    pythonPath = 'python3',
    projectDir,
    readyTimeoutMs = 10_000,
    onMessage,
    onStatusChange,
  } = options;

  // ── Ensure venv and dependencies ───────────────────────────────────────

  const venvDir = path.join(projectDir, VENV_SUBDIR);
  const venvPython = path.join(venvDir, 'bin', 'python');
  const venvPip = path.join(venvDir, 'bin', 'pip');

  await ensureVenv(pythonPath, venvDir, venvPython, venvPip);

  // ── Bridge process state ───────────────────────────────────────────────

  let child: ChildProcess | null = null;
  let status: BridgeStatus = 'stopped';
  let readyTimer: ReturnType<typeof setTimeout> | null = null;
  let intentionalShutdown = false;
  let restartDelay = INITIAL_RESTART_DELAY_MS;
  let restartTimer: ReturnType<typeof setTimeout> | null = null;

  function setStatus(newStatus: BridgeStatus, error?: string): void {
    status = newStatus;
    onStatusChange?.(newStatus, error);
  }

  function startProcess(): void {
    intentionalShutdown = false;
    setStatus('starting');

    child = spawn(venvPython, [bridgePath], {
      stdio: ['pipe', 'pipe', 'inherit'],  // stderr inherited for debug logs
    });

    // Read stdout line-by-line for JSON messages
    const rl = readline.createInterface({ input: child.stdout! });
    rl.on('line', (line: string) => {
      try {
        const parsed: unknown = JSON.parse(line);
        if (isBridgeToNodeMessage(parsed)) {
          handleBridgeMessage(parsed);
          onMessage?.(parsed);
        }
      } catch {
        // Ignore malformed lines
      }
    });

    // Readiness timeout
    readyTimer = setTimeout(() => {
      if (status === 'starting') {
        console.error('  ✗ Bridge did not become ready within timeout');
        setStatus('error', 'Bridge ready timeout');
      }
    }, readyTimeoutMs);

    child.on('exit', (code, signal) => {
      clearReadyTimer();
      child = null;

      if (intentionalShutdown) {
        setStatus('stopped');
        return;
      }

      const reason = signal ? `signal ${signal}` : `exit code ${code}`;
      console.error(`  ✗ Bridge process exited unexpectedly (${reason})`);
      setStatus('error', `Process exited: ${reason}`);

      // Auto-restart with exponential backoff
      restartTimer = setTimeout(() => {
        console.log(`  ↻ Restarting bridge (backoff ${restartDelay}ms)…`);
        restartDelay = Math.min(restartDelay * 2, MAX_RESTART_DELAY_MS);
        startProcess();
      }, restartDelay);
    });

    child.on('error', (err) => {
      clearReadyTimer();
      child = null;
      console.error(`  ✗ Failed to spawn bridge: ${err.message}`);
      setStatus('error', err.message);
    });
  }

  function handleBridgeMessage(msg: BridgeToNodeMessage): void {
    if (msg.type === 'bridge_ready') {
      clearReadyTimer();
      restartDelay = INITIAL_RESTART_DELAY_MS;  // Reset backoff on success
      console.log(`  ✓ Bridge ready (port ${msg.payload.port}, v${msg.payload.version})`);
      setStatus('ready');
    } else if (msg.type === 'bridge_error' && msg.payload.fatal) {
      console.error(`  ✗ Bridge fatal error: ${msg.payload.message}`);
      setStatus('error', msg.payload.message);
    }
  }

  function clearReadyTimer(): void {
    if (readyTimer) {
      clearTimeout(readyTimer);
      readyTimer = null;
    }
  }

  function send(msg: NodeToBridgeMessage): void {
    if (child?.stdin?.writable) {
      child.stdin.write(JSON.stringify(msg) + '\n');
    }
  }

  async function close(): Promise<void> {
    intentionalShutdown = true;
    clearReadyTimer();
    if (restartTimer) {
      clearTimeout(restartTimer);
      restartTimer = null;
    }

    if (!child) {
      setStatus('stopped');
      return;
    }

    return new Promise<void>((resolve) => {
      const killTimer = setTimeout(() => {
        child?.kill('SIGKILL');
      }, 3_000);

      child!.on('exit', () => {
        clearTimeout(killTimer);
        child = null;
        setStatus('stopped');
        resolve();
      });

      // Close stdin to signal graceful shutdown, then SIGTERM
      child!.stdin?.end();
      child!.kill('SIGTERM');
    });
  }

  // Start immediately
  startProcess();

  return {
    get status() {
      return status;
    },
    send,
    close,
  };
}

// ── Venv bootstrap ───────────────────────────────────────────────────────────

async function ensureVenv(
  pythonPath: string,
  venvDir: string,
  venvPython: string,
  venvPip: string,
): Promise<void> {
  if (!fs.existsSync(venvPython)) {
    console.log('  Setting up Python environment for HA bridge…');
    fs.mkdirSync(path.dirname(venvDir), { recursive: true });
    execSync(`${pythonPath} -m venv "${venvDir}"`, { stdio: 'inherit' });
  }

  // Install dependencies from requirements.txt if it has any non-comment lines
  const requirementsPath = path.join(defaultBridgePath(), '..', 'requirements.txt');
  if (fs.existsSync(requirementsPath)) {
    const content = fs.readFileSync(requirementsPath, 'utf-8');
    const hasPackages = content.split('\n').some(l => l.trim() && !l.trim().startsWith('#'));
    if (hasPackages) {
      try {
        // Quick check: pip install with --dry-run-like approach — just run it;
        // pip is idempotent for already-installed packages.
        console.log('  Installing bridge dependencies…');
        execSync(`"${venvPip}" install --quiet -r "${requirementsPath}"`, { stdio: 'inherit' });
      } catch (err) {
        throw new Error(`Failed to install bridge dependencies: ${(err as Error).message}`);
      }
    }
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function defaultBridgePath(): string {
  return path.join(__dirname, '..', 'assets', 'simulator-bridge', 'main.py');
}
