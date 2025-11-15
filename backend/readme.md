# Acadevia Backend

A comprehensive backend API for the Acadevia gamified learning platform built with Node.js, Express, TypeScript, and Prisma.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Course Management**: Full CRUD operations for courses, lectures, and quizzes
- **Gamification**: Points, badges, achievements, and leaderboards
- **Real-time Communication**: Socket.io for live chat and notifications
- **File Upload**: AWS S3 integration for media files
- **Payment Processing**: Stripe and Razorpay integration
- **Email & SMS**: Twilio and SMTP support
- **Caching**: Redis for performance optimization
- **Database**: PostgreSQL with Prisma ORM

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v13 or higher)
- Redis (optional, for caching)
- AWS S3 bucket (for file uploads)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   
   # Seed the database
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Quick Setup

Run the setup script for automated installation:

```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middlewares/     # Express middlewares
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── sockets/         # Socket.io handlers
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── validations/     # Request validation schemas
│   ├── app.ts           # Express app configuration
│   └── server.ts        # Server entry point
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Database seeding
├── scripts/             # Utility scripts
└── tests/               # Test files
```

## 🗄️ Database Schema

The application uses PostgreSQL with the following main entities:

- **Users**: Students, instructors, and admins
- **Courses**: Learning content with lectures and quizzes
- **Enrollments**: Student course enrollments
- **Quiz Attempts**: Student quiz submissions
- **Game Progress**: Gamification tracking

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh-token` - Refresh JWT token

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses/:id/enroll` - Enroll in course
- `GET /api/courses/:id/lectures` - Get course lectures
- `GET /api/courses/:id/quizzes` - Get course quizzes

### Users
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/progress` - Get user progress

### Quizzes
- `POST /api/courses/:courseId/quizzes/:quizId/attempt` - Submit quiz
- `GET /api/courses/:courseId/quizzes/:quizId/attempts` - Get quiz attempts

## 🔐 Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 🎮 Gamification Features

- **Points System**: Earn points for completing activities
- **Badges**: Unlock badges for achievements
- **Levels**: Progress through levels based on experience
- **Leaderboards**: Compare progress with other students
- **Achievements**: Track learning milestones

## 🚀 Deployment

1. **Build the application**
   ```bash
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

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📊 Monitoring

- Health check endpoint: `GET /health`
- Database connection status
- Redis connection status
- API rate limiting
- Error logging with Winston

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run migrate` - Run database migrations
- `npm run generate` - Generate Prisma client
- `npm run seed` - Seed the database

### Code Style

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Contact the development team

## 🔄 Updates

- **v1.0.0**: Initial release with core features
- **v1.1.0**: Added gamification features
- **v1.2.0**: Real-time communication with Socket.io
- **v1.3.0**: Payment integration and file uploads