#!/bin/bash

# Development script to run both backend and frontend
# This script sets up the development environment and runs both services

echo "🚀 Starting Acadevia Development Environment"
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Function to check if port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null; then
        echo "⚠️  Port $port is already in use"
        return 1
    fi
    return 0
}

# Check if required ports are available
echo "🔍 Checking ports..."
if ! check_port 3000; then
    echo "❌ Port 3000 (Frontend) is already in use"
    exit 1
fi

if ! check_port 5000; then
    echo "❌ Port 5000 (Backend) is already in use"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
echo "📦 Installing dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing root dependencies..."
    npm install
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

if [ ! -d "backend/node_modules" ]; then
    echo "Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

# Check if .env files exist
echo "🔧 Checking environment configuration..."

if [ ! -f "backend/.env" ]; then
    echo "⚠️  Backend .env file not found. Creating from example..."
    if [ -f "backend/.env.example" ]; then
        cp backend/.env.example backend/.env
        echo "✅ Created backend/.env from example"
        echo "📝 Please update backend/.env with your configuration"
    else
        echo "❌ No .env.example found in backend directory"
        echo "📝 Please create backend/.env with required environment variables"
    fi
fi

if [ ! -f "frontend/.env.local" ]; then
    echo "⚠️  Frontend .env.local file not found. Creating from example..."
    if [ -f "frontend/.env.local.example" ]; then
        cp frontend/.env.local.example frontend/.env.local
        echo "✅ Created frontend/.env.local from example"
        echo "📝 Please update frontend/.env.local with your configuration"
    else
        echo "❌ No .env.local.example found in frontend directory"
        echo "📝 Please create frontend/.env.local with required environment variables"
    fi
fi

# Setup database if needed
echo "🗄️  Setting up database..."
cd backend
if [ -f "package.json" ]; then
    echo "Running database setup..."
    npm run generate 2>/dev/null || echo "⚠️  Prisma generate failed (this is normal if database is not configured)"
    npm run migrate 2>/dev/null || echo "⚠️  Database migration failed (this is normal if database is not configured)"
fi
cd ..

# Start services
echo "🎯 Starting services..."
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:3000"
echo "=============================================="

# Use concurrently to run both services
if command -v npx &> /dev/null; then
    npx concurrently \
        --names "BACKEND,FRONTEND" \
        --prefix-colors "blue,green" \
        "cd backend && npm run dev" \
        "cd frontend && npm run dev"
else
    echo "❌ npx not found. Please install npm globally or use node_modules/.bin/concurrently"
    echo "Alternatively, run the following commands in separate terminals:"
    echo "Terminal 1: cd backend && npm run dev"
    echo "Terminal 2: cd frontend && npm run dev"
fi
