#!/usr/bin/env node
/**
 * Copies sibling package build outputs into cli/assets/ so they can be
 * bundled with the published CLI package.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const assets = path.resolve(__dirname, '..', 'assets');

const copies = [
  { src: '../../esphome-target/assets/external-component', dest: 'external-component' },
  { src: '../src/assets/ir-viewer.html', dest: 'ir-viewer.html', file: true },
];

for (const { src, dest, file } of copies) {
  const target = path.join(assets, dest);
  if (file) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.resolve(__dirname, src), target);
  } else {
    fs.rmSync(target, { recursive: true, force: true });
    fs.cpSync(path.resolve(__dirname, src), target, { recursive: true });
  }
}
