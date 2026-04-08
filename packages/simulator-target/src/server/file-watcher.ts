// ────────────────────────────────────────────────────────────────────────────
// File watcher — watches project source files for changes and triggers
// recompilation. Uses Node.js 22+ native recursive fs.watch.
// ────────────────────────────────────────────────────────────────────────────

import * as fs from 'fs';
import * as path from 'path';

// ── Public interface ─────────────────────────────────────────────────────────

export interface FileWatcherOptions {
  /** Absolute path to the project directory to watch. */
  projectDir: string;
  /** File extensions to watch. Default: ['.ts', '.tsx', '.js', '.jsx']. */
  extensions?: string[];
  /** Debounce interval in ms. Default: 300. */
  debounceMs?: number;
  /** Callback invoked when a watched file changes. */
  onChange: () => void | Promise<void>;
}

export interface FileWatcher {
  /** Stop watching and release resources. */
  close(): void;
}

// ── Directories / files to always ignore ─────────────────────────────────────

const IGNORED_SEGMENTS = new Set([
  'node_modules',
  '.espcompose-build',
  '.espcompose',
  'dist',
  '.git',
]);

function shouldIgnore(filePath: string): boolean {
  const segments = filePath.split(path.sep);
  return segments.some((s) => IGNORED_SEGMENTS.has(s));
}

// ── Implementation ───────────────────────────────────────────────────────────

export function startFileWatcher(options: FileWatcherOptions): FileWatcher {
  const {
    projectDir,
    extensions = ['.ts', '.tsx', '.js', '.jsx'],
    debounceMs = 300,
    onChange,
  } = options;

  const extSet = new Set(extensions);
  let timer: ReturnType<typeof setTimeout> | null = null;
  let running = false;

  const watcher = fs.watch(
    projectDir,
    { recursive: true },
    (_event, filename) => {
      if (!filename) return;
      if (shouldIgnore(filename)) return;

      const ext = path.extname(filename).toLowerCase();
      if (!extSet.has(ext)) return;

      // Debounce: reset timer on every qualifying event
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        // Prevent overlapping rebuilds
        if (running) return;
        running = true;
        Promise.resolve(onChange())
          .catch((err) => {
            console.error('[FileWatcher] onChange error:', err);
          })
          .finally(() => {
            running = false;
          });
      }, debounceMs);
    },
  );

  watcher.on('error', (err) => {
    console.error('[FileWatcher] watcher error:', err);
  });

  return {
    close() {
      if (timer) clearTimeout(timer);
      watcher.close();
    },
  };
}
