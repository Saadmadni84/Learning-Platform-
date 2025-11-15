#!/bin/bash

# Acadevia Database Setup Script
echo "🚀 Setting up Acadevia Database..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    print_status "Creating .env file..."
    cat > .env << EOF
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5432/acadevia

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production_$(date +%s)
REFRESH_JWT_SECRET=your_super_secret_refresh_jwt_key_here_change_in_production_$(date +%s)

# Payment Configuration (Optional)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=

# AWS Configuration (Optional)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1
AWS_S3_BUCKET=

# Email Configuration (Optional)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

# SMS Configuration (Optional)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# Cloudinary Configuration (Optional)
CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EOF
    print_success ".env file created"
else
    print_warning ".env file already exists, skipping creation"
fi

# Start Docker services
print_status "Starting Docker services (PostgreSQL and Redis)..."
docker-compose up -d postgres redis

# Wait for PostgreSQL to be ready
print_status "Waiting for PostgreSQL to be ready..."
sleep 10

# Check if PostgreSQL is ready
max_attempts=30
attempt=1
while [ $attempt -le $max_attempts ]; do
    if docker exec acadevia-postgres pg_isready -U postgres > /dev/null 2>&1; then
        print_success "PostgreSQL is ready!"
        break
    fi
    print_status "Waiting for PostgreSQL... (attempt $attempt/$max_attempts)"
    sleep 2
    attempt=$((attempt + 1))
done

if [ $attempt -gt $max_attempts ]; then
    print_error "PostgreSQL failed to start within expected time"
    exit 1
fi

# Install dependencies
print_status "Installing dependencies..."
npm install

# Generate Prisma client
print_status "Generating Prisma client..."
npx prisma generate

# Run database migrations
print_status "Running database migrations..."
npx prisma migrate dev --name init

# Seed the database
print_status "Seeding database..."
npm run seed

# Test database connection
print_status "Testing database connection..."
node -e "
const { checkDatabaseConnection } = require('./dist/config/database.js');
checkDatabaseConnection().then(success => {
  if (success) {
    console.log('✅ Database connection successful!');
    process.exit(0);
  } else {
    console.log('❌ Database connection failed!');
    process.exit(1);
  }
}).catch(err => {
  console.log('❌ Database connection error:', err.message);
  process.exit(1);
});
" 2>/dev/null || print_warning "Could not test connection (build required)"

print_success "Database setup completed!"
print_status "You can now start the backend with: npm run dev"
print_status "PostgreSQL is running on: localhost:5432"
print_status "Redis is running on: localhost:6379"
print_status "Backend will run on: localhost:5000"
