
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'
import { resolve } from 'path'
import fs from 'fs'

// Check if we're in a build context
const isBuild = process.argv.includes('build')
const isDev = process.env.NODE_ENV !== 'production'

// Log the current mode for debugging
console.log('Build command arguments:', process.argv)
console.log('Environment:', { NODE_ENV: process.env.NODE_ENV, isBuild, isDev })

// Create a simple script runner to bypass the missing npm scripts
if (!process.env.npm_lifecycle_event) {
  try {
    // This is a direct execution of Vite without going through npm scripts
    console.log('Direct Vite execution detected - setting up environment')
    
    if (isBuild && isDev) {
      process.env.npm_lifecycle_event = 'build:dev'
      console.log('Running in build:dev mode')
    } else if (isBuild) {
      process.env.npm_lifecycle_event = 'build'
      console.log('Running in build mode')
    } else {
      process.env.npm_lifecycle_event = 'dev'
      console.log('Running in dev mode')
    }
  } catch (error) {
    console.error('Error during script setup:', error)
  }
}

// Create a direct executable script for development and building
const scriptPath = resolve(process.cwd(), 'build.js')
if (!fs.existsSync(scriptPath)) {
  try {
    const scriptContent = `
// This file is a workaround for missing npm scripts
const { execSync } = require('child_process');
const args = process.argv.slice(2);

console.log('Running build script with args:', args);

try {
  if (args[0] === 'dev') {
    console.log('Starting development server...');
    execSync('npx vite', { stdio: 'inherit' });
  } else if (args[0] === 'build:dev') {
    console.log('Building for development...');
    execSync('npx vite build --mode development', { stdio: 'inherit' });
  } else if (args[0] === 'build') {
    console.log('Building for production...');
    execSync('npx vite build', { stdio: 'inherit' });
  } else {
    console.log('Unknown command. Available commands: dev, build, build:dev');
    process.exit(1);
  }
} catch (error) {
  console.error('Build script error:', error);
  process.exit(1);
}
`;
    fs.writeFileSync(scriptPath, scriptContent, 'utf-8');
    console.log('Created build.js script for direct execution');
    fs.chmodSync(scriptPath, '755'); // Make executable
  } catch (error) {
    console.error('Error creating build script:', error);
  }
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'handle-missing-scripts',
      config(config, { command }) {
        console.log(`Vite command: ${command}, npm_lifecycle_event: ${process.env.npm_lifecycle_event}`)
        return config
      },
      buildStart() {
        console.log('Build starting with configuration:', { 
          mode: process.env.NODE_ENV,
          command: process.env.npm_lifecycle_event 
        })
      }
    }
  ],
  server: {
    port: 8080
  },
  // Force Vite to use development mode when needed
  mode: process.env.npm_lifecycle_event === 'build:dev' ? 'development' : undefined,
  // Make sure we have the correct build options
  build: {
    sourcemap: process.env.npm_lifecycle_event === 'build:dev',
    minify: process.env.npm_lifecycle_event !== 'build:dev'
  }
})
