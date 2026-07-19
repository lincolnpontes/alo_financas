import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'www');
const files = [
  'index.html',
  'style.css',
  'app.js',
  'manifest.json',
  'service-worker.js',
  'icon.svg',
  'xlsx.full.min.js',
  'exceljs.min.js'
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await Promise.all(files.map(file => cp(resolve(root, file), resolve(output, file))));
