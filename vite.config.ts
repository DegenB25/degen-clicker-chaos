
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'

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

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'handle-missing-scripts',
      config(config, { command }) {
        console.log(`Vite command: ${command}, npm_lifecycle_event: ${process.env.npm_lifecycle_event}`)
        return config
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
