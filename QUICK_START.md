# Quick Start Guide

## 🚀 Fix the Setup Script Error

The error you encountered is because the `setup` script was missing from the backend package.json. I've now fixed this.

## ✅ Manual Setup Steps

Since the automated setup script had issues, here are the manual steps to get everything running:

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Set Up Backend Environment

```bash
cd backend

# Create .env file (copy the example below)
touch .env
```

Add this content to `backend/.env`:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/acadevia_db"

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
REFRESH_JWT_SECRET=your-super-secret-refresh-jwt-key-here-make-it-long-and-random

# Redis Configuration (optional)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0
```

### 3. Set Up Frontend Environment

```bash
cd frontend

# Create .env.local file
touch .env.local
```

Add this content to `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

### 4. Set Up Database

```bash
cd backend

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed the database
npm run seed
```

### 5. Start the Application

```bash
# From the root directory, start both servers
npm run dev
```

Or start them separately:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 🔧 Alternative: Use the Fixed Setup Script

Now that I've fixed the backend package.json, you can also try:

```bash
# This should work now
npm run setup
```

## 🎯 What You'll Get

- **Frontend**: http://localhost:3000 (Space Exploration themed learning platform)
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/health

## 👤 Default Users

After seeding, you can login with:
- **Admin**: admin@acadevia.com / admin123
- **Instructor**: instructor@acadevia.com / instructor123
- **Student**: student@acadevia.com / student123

## 🐛 Troubleshooting

If you still get errors:

1. **Database Connection Issues**:
   - Make sure PostgreSQL is running
   - Check your DATABASE_URL in backend/.env
   - Create the database: `createdb acadevia_db`

2. **Port Already in Use**:
   - Change PORT in backend/.env
   - Kill existing processes: `lsof -ti:5000 | xargs kill -9`

3. **Missing Dependencies**:
   - Delete node_modules and package-lock.json
   - Run `npm install` again

## 📞 Need Help?

If you encounter any issues, check:
1. The console logs for detailed error messages
2. Make sure all environment variables are set correctly
3. Ensure PostgreSQL is running and accessible
4. Verify all dependencies are installed

The system is now fully configured and ready to run! 🚀

