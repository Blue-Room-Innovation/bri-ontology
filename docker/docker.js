#!/usr/bin/env node
// Cross-platform Docker wrapper for build and run operations

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const IMAGE_NAME = 'bri-ontology-tooling:latest';
const DOCKERFILE = path.join(__dirname, 'Dockerfile');

function showUsage() {
  console.log(`
Docker Wrapper - Build and run ontology tools in Docker

Usage:
  node docker.js build                    Build the Docker image
  node docker.js run <npm-script> [args]  Run an npm script in Docker
  node docker.js shell                    Open interactive bash shell

Examples:
  node docker.js build
  node docker.js run config:show
  node docker.js run generate:types
  node docker.js run validate:owl:with-codelists
  node docker.js shell
`);
  process.exit(1);
}

function build() {
  console.log('🐳 Building Docker image:', IMAGE_NAME);
  
  const workspaceRoot = path.resolve(__dirname, '..');
  
  try {
    execSync(`docker build -t ${IMAGE_NAME} -f ${DOCKERFILE} ${workspaceRoot}`, {
      stdio: 'inherit',
      shell: true
    });
    
    console.log('\n✅ Docker image built successfully!');
    console.log('\n📋 Available commands:');
    console.log('  node docker/docker.js run config:show');
    console.log('  node docker/docker.js run validate:owl:with-codelists');
    console.log('  node docker/docker.js run generate:types');
    console.log('  node docker/docker.js run build:all');
  } catch (error) {
    console.error('\n❌ Build failed!');
    process.exit(1);
  }
}

function run(npmScript, ...args) {
  if (!npmScript) {
    console.error('❌ Error: npm script name required');
    showUsage();
  }
  
  console.log('🐳 Running:', 'npm run', npmScript, ...args);
  
  const workspaceRoot = path.resolve(__dirname, '..');
  const allArgs = [npmScript, ...args].join(' ');
  
  // Build docker run command with volume mount
  const cmd = `docker run --rm -v "${workspaceRoot}:/workspace" -w /workspace ${IMAGE_NAME} npm run ${allArgs}`;
  
  try {
    execSync(cmd, { stdio: 'inherit', shell: true });
  } catch (error) {
    process.exit(error.status || 1);
  }
}

function shell() {
  console.log('🐳 Opening interactive shell in Docker container...');
  
  const workspaceRoot = path.resolve(__dirname, '..');
  const cmd = `docker run --rm -it -v "${workspaceRoot}:/workspace" -w /workspace ${IMAGE_NAME} bash`;
  
  try {
    execSync(cmd, { stdio: 'inherit', shell: true });
  } catch (error) {
    process.exit(error.status || 1);
  }
}

// Main
const command = process.argv[2];

if (!command) {
  showUsage();
}

switch (command) {
  case 'build':
    build();
    break;
  case 'run':
    run(...process.argv.slice(3));
    break;
  case 'shell':
    shell();
    break;
  case 'help':
  case '--help':
  case '-h':
    showUsage();
    break;
  default:
    console.error(`❌ Unknown command: ${command}`);
    showUsage();
}
