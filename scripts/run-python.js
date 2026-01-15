#!/usr/bin/env node
// Cross-platform wrapper to run Python CLI with venv

const { execSync } = require('child_process');
const { existsSync } = require('fs');
const path = require('path');

const isWindows = process.platform === 'win32';
const venvPython = isWindows 
  ? path.join('.venv', 'Scripts', 'python.exe')
  : path.join('.venv', 'bin', 'python');

const pythonCmd = existsSync(venvPython) ? venvPython : (isWindows ? 'python' : 'python3');

const args = process.argv.slice(2);
const cmd = `${pythonCmd} ${args.join(' ')}`;

try {
  execSync(cmd, { stdio: 'inherit', shell: true });
} catch (error) {
  process.exit(error.status || 1);
}
