#!/usr/bin/env node
/**
 * Copies sibling package build outputs into cli/assets/ so they can be
 * bundled with the published CLI package.
 */
const fs = require('fs');
const path = require('path');

const assets = path.resolve(__dirname, '..', 'assets');

const copies = [
  { src: '../../ir-viewer/dist',        dest: 'ir-viewer' },
  { src: '../../simulator-app/dist',    dest: 'simulator-app' },
  { src: '../../simulator-bridge/src',  dest: 'simulator-bridge' },
];

for (const { src, dest } of copies) {
  const target = path.join(assets, dest);
  fs.rmSync(target, { recursive: true, force: true });
  fs.cpSync(path.resolve(__dirname, src), target, { recursive: true });
}
