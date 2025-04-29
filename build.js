
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
