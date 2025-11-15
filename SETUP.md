# Acadevia - Complete Setup Guide

This guide will help you set up the complete Acadevia gamified learning platform with both frontend and backend components.

## 🏗️ Project Structure

```
Acadevia/
├── frontend/          # Next.js React frontend
├── backend/           # Node.js Express backend
├── package.json       # Root package.json for scripts
└── SETUP.md          # This setup guide
```

## 📋 Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **PostgreSQL** (v13 or higher) - [Download here](https://www.postgresql.org/download/)
- **Git** - [Download here](https://git-scm.com/downloads)
- **Redis** (optional, for caching) - [Download here](https://redis.io/download)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Acadevia
```

### 2. Install Dependencies

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

### 3. Environment Setup

#### Backend Environment

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/acadevia_db"

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
REFRESH_JWT_SECRET=your-super-secret-refresh-jwt-key-here

# Redis Configuration (optional)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# Payment Configuration (optional)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# AWS Configuration (optional)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-s3-bucket-name

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# SMS Configuration (optional)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

#### Frontend Environment

Create a `.env.local` file in the `frontend` directory:

```bash
cd frontend
touch .env.local
```

Add the following to `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

### 4. Database Setup

#### Create PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE acadevia_db;

# Create user (optional)
CREATE USER acadevia_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE acadevia_db TO acadevia_user;

# Exit PostgreSQL
\q
```

#### Run Database Migrations

```bash
cd backend

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed the database
npm run seed
```

### 5. Start the Application

#### Start Backend Server

```bash
cd backend
npm run dev
```

The backend will be available at: `http://localhost:5000`

#### Start Frontend Server

```bash
cd frontend
npm run dev
```

The frontend will be available at: `http://localhost:3000`

## 🔧 Development Scripts

### Root Level Scripts

```bash
# Install all dependencies
npm run install:all

# Start both frontend and backend
npm run dev

# Build both frontend and backend
npm run build

# Run tests for both
npm run test
```

### Backend Scripts

```bash
cd backend

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database operations
npm run migrate        # Run migrations
npm run generate       # Generate Prisma client
npm run seed          # Seed database

# Testing
npm test              # Run tests
npm run test:watch    # Run tests in watch mode
```

### Frontend Scripts

```bash
cd frontend

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Linting and formatting
npm run lint          # Run ESLint
npm run lint:fix      # Fix ESLint errors
npm run format        # Format code with Prettier

# Testing
npm run test          # Run tests
npm run test:watch    # Run tests in watch mode
```

## 🗄️ Database Schema

The application uses the following main entities:

- **Users**: Students, instructors, and admins with gamification features
- **Courses**: Learning content with metadata
- **Lectures**: Individual lessons within courses
- **Quizzes**: Assessments with questions
- **Enrollments**: Student course enrollments with progress tracking
- **Quiz Attempts**: Student quiz submissions and scores
- **Game Progress**: Gamification tracking (points, badges, achievements)

## 🔐 Default Users

After seeding the database, you can use these default accounts:

- **Admin**: `admin@acadevia.com` / `admin123`
- **Instructor**: `instructor@acadevia.com` / `instructor123`
- **Student**: `student@acadevia.com` / `student123`

## 🎮 Features

### Frontend Features
- **Space Exploration Theme**: Galaxy backgrounds, twinkling stars, planets
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Socket.io integration for live features
- **Gamification UI**: Points, badges, leaderboards, progress tracking
- **Course Management**: Browse, enroll, and track course progress
- **Quiz System**: Interactive quizzes with immediate feedback

### Backend Features
- **RESTful API**: Complete CRUD operations for all entities
- **Authentication**: JWT-based auth with role-based access control
- **Real-time Communication**: Socket.io for chat and notifications
- **File Upload**: AWS S3 integration for media files
- **Payment Processing**: Stripe and Razorpay integration
- **Email & SMS**: Twilio and SMTP support
- **Caching**: Redis for performance optimization
- **Database**: PostgreSQL with Prisma ORM

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh-token` - Refresh JWT token
- `POST /api/auth/send-otp` - Send OTP for verification
- `POST /api/auth/verify-otp` - Verify OTP

### Courses
- `GET /api/courses` - Get all courses (with pagination and filters)
- `GET /api/courses/:id` - Get course details
- `POST /api/courses/:id/enroll` - Enroll in course
- `GET /api/courses/:id/lectures` - Get course lectures
- `GET /api/courses/:id/quizzes` - Get course quizzes
- `GET /api/courses/:id/enrollment` - Get enrollment status
- `PUT /api/courses/:id/progress` - Update course progress

### Users
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/progress` - Get user progress and achievements

### Quizzes
- `POST /api/courses/:courseId/quizzes/:quizId/attempt` - Submit quiz
- `GET /api/courses/:courseId/quizzes/:quizId/attempts` - Get quiz attempts

## 🚀 Deployment

### Backend Deployment

1. **Build the application**
   ```bash
   cd backend
   npm run build
   ```

2. **Set production environment variables**
   ```bash
   NODE_ENV=production
   DATABASE_URL=your-production-database-url
   # ... other production variables
   ```

3. **Run database migrations**
   ```bash
   npx prisma migrate deploy
   ```

4. **Start the production server**
   ```bash
   npm start
   ```

### Frontend Deployment

1. **Build the application**
   ```bash
   cd frontend
   npm run build
   ```

2. **Set production environment variables**
   ```bash
   NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
   NEXT_PUBLIC_SOCKET_URL=https://your-api-domain.com
   ```

3. **Deploy to your hosting platform**
   - Vercel (recommended for Next.js)
   - Netlify
   - AWS Amplify
   - Or any other hosting service

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check DATABASE_URL in .env file
   - Verify database credentials

2. **Port Already in Use**
   - Change PORT in backend .env file
   - Kill existing processes using the port

3. **CORS Issues**
   - Check FRONTEND_URL in backend .env file
   - Ensure frontend and backend URLs match

4. **Build Errors**
   - Clear node_modules and reinstall dependencies
   - Check for TypeScript errors
   - Ensure all environment variables are set

### Getting Help

- Check the console logs for detailed error messages
- Review the API documentation
- Check the database connection
- Verify environment variables

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Socket.io Documentation](https://socket.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

---

**Happy Learning! 🚀📚**

