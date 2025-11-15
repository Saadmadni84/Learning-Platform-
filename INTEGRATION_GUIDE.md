# Acadevia Platform - Backend & Frontend Integration Guide

This guide explains how to set up and run the complete Acadevia platform with both backend and frontend services integrated.

## 🏗️ Architecture Overview

The Acadevia platform consists of:

- **Backend**: Node.js/Express API server with Prisma ORM
- **Frontend**: Next.js React application
- **Database**: PostgreSQL with Prisma migrations
- **Real-time**: Socket.IO for live communication
- **Authentication**: JWT-based auth system

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- Redis (optional, for caching)

### 1. Install Dependencies

```bash
# Install all dependencies (root, frontend, and backend)
npm run install:all
```

### 2. Database Setup

```bash
# Generate Prisma client
cd backend && npm run generate

# Run database migrations
npm run migrate

# Seed the database (optional)
npm run seed
```

### 3. Environment Configuration

Create the following environment files:

#### Backend (.env)
```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/acadevia_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
REFRESH_JWT_SECRET=your-super-secret-refresh-jwt-key-here

# Redis Configuration (Optional)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0
```

#### Frontend (.env.local)
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_WS_URL=http://localhost:5000

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key
```

### 4. Start Development Servers

#### Option 1: Automated Setup
```bash
# Run the automated setup script
npm run dev:setup
```

#### Option 2: Manual Setup
```bash
# Terminal 1: Start Backend
cd backend && npm run dev

# Terminal 2: Start Frontend
cd frontend && npm run dev
```

#### Option 3: Concurrently
```bash
# Start both services simultaneously
npm run dev
```

## 🔧 Configuration Details

### Backend Configuration

The backend is configured with:

- **CORS**: Configured to allow frontend requests
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Authentication**: JWT-based with refresh tokens
- **Socket.IO**: Real-time communication
- **File Upload**: Support for images, videos, and documents

### Frontend Configuration

The frontend includes:

- **API Client**: Axios-based with interceptors
- **Socket Client**: Real-time communication
- **Authentication**: Token-based auth with auto-refresh
- **State Management**: Redux Toolkit
- **UI Components**: Custom component library

## 📡 API Integration

### API Client Usage

```typescript
import { api } from '@/lib/api';

// Authentication
const loginResponse = await api.auth.login({
  email: 'user@example.com',
  password: 'password'
});

// Get user profile
const profile = await api.user.getProfile();

// Get courses
const courses = await api.course.getAll();
```

### Custom Hooks

```typescript
import { useAuth, useCourses } from '@/hooks/useApi';

function MyComponent() {
  const { login, logout, getProfile } = useAuth();
  const { getAll: getCourses } = useCourses();
  
  // Use the hooks...
}
```

### Socket.IO Integration

```typescript
import socketService from '@/lib/socket';

// Connect to socket
const socket = socketService.connect(token);

// Join a game
socketService.joinGame('game-id');

// Listen for game updates
socketService.onGameUpdate((data) => {
  console.log('Game update:', data);
});
```

## 🗄️ Database Schema

The platform uses Prisma ORM with the following main entities:

- **User**: User accounts and profiles
- **Course**: Educational courses
- **Challenge**: Mini-games and challenges
- **Quest**: Learning quests and missions
- **Source**: Learning materials and resources
- **Progress**: User progress tracking
- **Achievement**: User achievements and badges

## 🔐 Authentication Flow

1. **Login**: User provides credentials
2. **Token Generation**: Backend generates JWT and refresh token
3. **Token Storage**: Frontend stores tokens in localStorage
4. **API Requests**: Frontend includes JWT in Authorization header
5. **Token Refresh**: Automatic refresh when token expires
6. **Logout**: Tokens are cleared from storage

## 🎮 Game Integration

The platform includes several mini-games:

- **Math Sprint**: Math problem solving
- **Science Guess**: Science knowledge quiz
- **Word Builder**: Word unscrambling game
- **Logic Puzzle**: Logic and reasoning challenges

Each game integrates with the backend for:
- Score tracking
- Progress saving
- Leaderboards
- Achievement unlocking

## 📊 Real-time Features

Socket.IO enables real-time features:

- **Live Notifications**: Instant notifications
- **Game Updates**: Real-time game state updates
- **Chat**: Real-time messaging
- **Progress Sync**: Live progress updates

## 🚀 Deployment

### Production Build

```bash
# Build both frontend and backend
npm run build

# Start production servers
npm start
```

### Docker Deployment

```bash
# Build Docker images
docker-compose build

# Start services
docker-compose up
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run backend tests only
npm run test:backend

# Run frontend tests only
npm run test:frontend
```

## 📝 API Documentation

The backend includes comprehensive API documentation:

- **Auth Endpoints**: `/api/auth/*`
- **User Endpoints**: `/api/user/*`
- **Course Endpoints**: `/api/course/*`
- **Challenge Endpoints**: `/api/challenge/*`
- **Quest Endpoints**: `/api/quest/*`
- **Source Endpoints**: `/api/source/*`
- **Upload Endpoints**: `/api/upload/*`

## 🔧 Troubleshooting

### Common Issues

1. **Port Conflicts**: Ensure ports 3000 and 5000 are available
2. **Database Connection**: Check DATABASE_URL configuration
3. **CORS Issues**: Verify FRONTEND_URL in backend .env
4. **Token Issues**: Check JWT_SECRET configuration

### Debug Mode

```bash
# Enable debug logging
DEBUG=* npm run dev:backend
```

## 📚 Additional Resources

- [Backend API Documentation](./backend/API_DOCUMENTATION.md)
- [Frontend Component Library](./frontend/src/components/)
- [Database Schema](./backend/prisma/schema.prisma)
- [Deployment Guide](./DEPLOYMENT.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
