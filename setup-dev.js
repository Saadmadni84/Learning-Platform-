#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Starting Acadevia Development Environment');
console.log('==============================================');

// Check if Node.js is installed
function checkNode() {
  return new Promise((resolve) => {
    exec('node --version', (error) => {
      if (error) {
        console.log('❌ Node.js is not installed. Please install Node.js first.');
        process.exit(1);
      }
      resolve();
    });
  });
}

// Check if npm is installed
function checkNpm() {
  return new Promise((resolve) => {
    exec('npm --version', (error) => {
      if (error) {
        console.log('❌ npm is not installed. Please install npm first.');
        process.exit(1);
      }
      resolve();
    });
  });
}

// Check if port is in use
function checkPort(port) {
  return new Promise((resolve) => {
    exec(`lsof -ti:${port}`, (error) => {
      if (error) {
        resolve(false); // Port is free
      } else {
        console.log(`⚠️  Port ${port} is already in use`);
        resolve(true); // Port is in use
      }
    });
  });
}

// Install dependencies
function installDependencies() {
  return new Promise((resolve) => {
    console.log('📦 Installing dependencies...');
    
    // Install root dependencies
    if (!fs.existsSync('node_modules')) {
      console.log('Installing root dependencies...');
      const rootInstall = spawn('npm', ['install'], { stdio: 'inherit' });
      rootInstall.on('close', (code) => {
        if (code !== 0) {
          console.log('❌ Failed to install root dependencies');
          process.exit(1);
        }
        resolve();
      });
    } else {
      resolve();
    }
  });
}

// Install frontend dependencies
function installFrontendDeps() {
  return new Promise((resolve) => {
    if (!fs.existsSync('frontend/node_modules')) {
      console.log('Installing frontend dependencies...');
      const frontendInstall = spawn('npm', ['install'], { 
        cwd: 'frontend', 
        stdio: 'inherit' 
      });
      frontendInstall.on('close', (code) => {
        if (code !== 0) {
          console.log('❌ Failed to install frontend dependencies');
          process.exit(1);
        }
        resolve();
      });
    } else {
      resolve();
    }
  });
}

// Install backend dependencies
function installBackendDeps() {
  return new Promise((resolve) => {
    if (!fs.existsSync('backend/node_modules')) {
      console.log('Installing backend dependencies...');
      const backendInstall = spawn('npm', ['install'], { 
        cwd: 'backend', 
        stdio: 'inherit' 
      });
      backendInstall.on('close', (code) => {
        if (code !== 0) {
          console.log('❌ Failed to install backend dependencies');
          process.exit(1);
        }
        resolve();
      });
    } else {
      resolve();
    }
  });
}

// Setup environment files
function setupEnvironment() {
  console.log('🔧 Setting up environment files...');
  
  // Backend .env
  if (!fs.existsSync('backend/.env')) {
    if (fs.existsSync('backend/.env.example')) {
      fs.copyFileSync('backend/.env.example', 'backend/.env');
      console.log('✅ Created backend/.env from example');
    } else {
      console.log('⚠️  No .env.example found in backend directory');
      console.log('📝 Please create backend/.env with required environment variables');
    }
  }
  
  // Frontend .env.local
  if (!fs.existsSync('frontend/.env.local')) {
    if (fs.existsSync('frontend/.env.local.example')) {
      fs.copyFileSync('frontend/.env.local.example', 'frontend/.env.local');
      console.log('✅ Created frontend/.env.local from example');
    } else {
      console.log('⚠️  No .env.local.example found in frontend directory');
      console.log('📝 Please create frontend/.env.local with required environment variables');
    }
  }
}

// Setup database
function setupDatabase() {
  return new Promise((resolve) => {
    console.log('🗄️  Setting up database...');
    const dbSetup = spawn('npm', ['run', 'generate'], { 
      cwd: 'backend', 
      stdio: 'pipe' 
    });
    
    dbSetup.on('close', (code) => {
      if (code !== 0) {
        console.log('⚠️  Database setup failed (this is normal if database is not configured)');
      }
      resolve();
    });
  });
}

// Start services
function startServices() {
  console.log('🎯 Starting services...');
  console.log('Backend will run on: http://localhost:5000');
  console.log('Frontend will run on: http://localhost:3000');
  console.log('==============================================');
  
  // Start backend
  const backend = spawn('npm', ['run', 'dev'], { 
    cwd: 'backend', 
    stdio: 'inherit' 
  });
  
  // Start frontend
  const frontend = spawn('npm', ['run', 'dev'], { 
    cwd: 'frontend', 
    stdio: 'inherit' 
  });
  
  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down services...');
    backend.kill();
    frontend.kill();
    process.exit(0);
  });
  
  process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down services...');
    backend.kill();
    frontend.kill();
    process.exit(0);
  });
}

// Main function
async function main() {
  try {
    await checkNode();
    await checkNpm();
    
    const port3000InUse = await checkPort(3000);
    const port5000InUse = await checkPort(5000);
    
    if (port3000InUse) {
      console.log('❌ Port 3000 (Frontend) is already in use');
      process.exit(1);
    }
    
    if (port5000InUse) {
      console.log('❌ Port 5000 (Backend) is already in use');
      process.exit(1);
    }
    
    await installDependencies();
    await installFrontendDeps();
    await installBackendDeps();
    setupEnvironment();
    await setupDatabase();
    startServices();
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
