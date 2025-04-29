
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'

// This is a workaround to check if we're in a build context
const isBuild = process.argv.includes('build')
const isDev = process.env.NODE_ENV !== 'production'

// Attempt to create a minimal package.json scripts setup via environment variables
// This won't modify the actual file but will set up the environment
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

export default defineConfig({
  plugins: [react()],
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
