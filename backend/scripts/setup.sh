#!/bin/bash

echo "🚀 Setting up Acadevia Backend..."

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

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ .env file created. Please update the values in .env file."
    else
        echo "❌ .env.example file not found. Please create .env file manually."
        exit 1
    fi
fi

# Check if PostgreSQL is running
echo "🐘 Checking PostgreSQL connection..."
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL client not found. Please install PostgreSQL."
    echo "   You can continue without it, but you'll need to set up the database manually."
else
    echo "✅ PostgreSQL client found."
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "🗄️  Running database migrations..."
npx prisma migrate dev --name init

# Seed the database
echo "🌱 Seeding database..."
npm run seed

echo "✅ Backend setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Update the .env file with your actual configuration values"
echo "2. Make sure PostgreSQL is running and accessible"
echo "3. Run 'npm run dev' to start the development server"
echo ""
echo "🔗 API will be available at: http://localhost:5000"
echo "📊 Health check: http://localhost:5000/health"
echo ""
echo "👤 Default users created:"
echo "   Admin: admin@acadevia.com / admin123"
echo "   Instructor: instructor@acadevia.com / instructor123"
echo "   Student: student@acadevia.com / student123"

