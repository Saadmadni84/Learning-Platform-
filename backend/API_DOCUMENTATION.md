# Acadevia Backend API Documentation

## Overview
This is the backend API for the Acadevia gamified learning platform. It provides endpoints for user management, course management, gamification features, challenges, quests, and notifications.

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### Authentication (`/auth`)

#### POST `/auth/signup`
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "STUDENT"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully. Please check your email for verification.",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "STUDENT"
  }
}
```

#### POST `/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "STUDENT",
    "points": 0,
    "level": 1
  },
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token"
}
```

#### POST `/auth/send-otp`
Send OTP for email verification.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

#### POST `/auth/verify-otp`
Verify OTP code.

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

### User Management (`/user`)

#### GET `/user/profile`
Get user profile information.

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "user@example.com",
    "points": 1500,
    "level": 3,
    "streakDays": 5,
    "completedCourses": 2,
    "avatar": "avatar_url"
  }
}
```

#### PUT `/user/profile`
Update user profile.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "user@example.com",
  "phoneNumber": "+1234567890",
  "bio": "Learning enthusiast",
  "interests": ["math", "science"]
}
```

### Dashboard (`/dashboard`)

#### GET `/dashboard/student`
Get student dashboard data.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalPoints": 1500,
    "globalRank": 15,
    "streakDays": 5,
    "completedLessons": 12,
    "averageScore": 85,
    "enrolledCourses": 3,
    "upcomingTests": 2,
    "recentBadges": [
      {
        "id": "badge_id",
        "name": "High Scorer",
        "icon": "🏆",
        "description": "Achieve a score of 90% or higher",
        "earnedAt": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

#### GET `/dashboard/leaderboard`
Get leaderboard data.

**Query Parameters:**
- `type`: `points` | `level` | `courses` (default: `points`)
- `limit`: number (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "user_id",
      "name": "John Doe",
      "avatar": "avatar_url",
      "points": 2500,
      "level": 5,
      "rank": 1,
      "stage": {
        "name": "Gold",
        "color": "from-amber-400 to-yellow-400",
        "emoji": "🥇"
      }
    }
  ]
}
```

#### GET `/dashboard/progress`
Get user progress data.

**Query Parameters:**
- `period`: `week` | `month` | `year` (default: `month`)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "subject": "Mathematics",
      "completion": 78,
      "xp": 1240,
      "streakDays": 12,
      "testsTaken": 6,
      "averageScore": 82,
      "weeklyScores": [
        { "label": "Mon", "value": 70, "date": "Mon" },
        { "label": "Tue", "value": 75, "date": "Tue" }
      ],
      "chapters": [
        { "label": "Fractions", "value": 90, "color": "#F59E0B" },
        { "label": "Decimals", "value": 75, "color": "#FBBF24" }
      ]
    }
  ]
}
```

### Courses (`/courses`)

#### GET `/courses`
Get all courses with filtering and pagination.

**Query Parameters:**
- `level`: `BEGINNER` | `INTERMEDIATE` | `ADVANCED`
- `search`: string
- `page`: number (default: 1)
- `limit`: number (default: 10)
- `sortBy`: string (default: `createdAt`)
- `sortOrder`: `asc` | `desc` (default: `desc`)

**Response:**
```json
{
  "success": true,
  "courses": [
    {
      "id": "course_id",
      "title": "Mathematics - Algebra & Geometry",
      "description": "Learn fundamental concepts",
      "thumbnail": "thumbnail_url",
      "level": "BEGINNER",
      "duration": 120,
      "price": 99.99,
      "instructor": {
        "firstName": "Dr. Sarah",
        "lastName": "Johnson",
        "avatar": "instructor_avatar"
      },
      "totalStudents": 150
    }
  ],
  "pagination": {
    "total": 50,
    "pages": 5,
    "page": 1,
    "limit": 10
  }
}
```

#### GET `/courses/:id`
Get course details by ID.

#### POST `/courses/:id/enroll`
Enroll in a course.

#### GET `/courses/:id/lectures`
Get course lectures.

#### GET `/courses/:id/quizzes`
Get course quizzes.

### Challenges (`/challenges`)

#### GET `/challenges`
Get all challenges.

**Query Parameters:**
- `type`: `MATH_SPRINT` | `SCIENCE_QUIZ` | `WORD_BUILDER` | `LOGIC_PUZZLE` | `GENERAL_KNOWLEDGE`
- `difficulty`: number (1-5)
- `limit`: number (default: 10)
- `offset`: number (default: 0)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "challenge_id",
      "title": "Math Sprint",
      "description": "Quick math challenges for all classes (6-12)",
      "type": "MATH_SPRINT",
      "difficulty": 1,
      "timeLimit": 300,
      "points": 50,
      "isActive": true
    }
  ],
  "pagination": {
    "total": 20,
    "pages": 2,
    "page": 1,
    "limit": 10
  }
}
```

#### GET `/challenges/:id`
Get challenge details.

#### POST `/challenges/:id/attempt`
Attempt a challenge.

**Request Body:**
```json
{
  "answers": [
    {
      "questionId": "question_id",
      "answer": "selected_answer"
    }
  ],
  "timeSpent": 120
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "attemptId": "attempt_id",
    "score": 85,
    "pointsEarned": 42,
    "levelUp": false,
    "newLevel": null
  }
}
```

#### GET `/challenges/:id/leaderboard`
Get challenge leaderboard.

#### GET `/challenges/user/stats`
Get user challenge statistics.

### Quests (`/quest`)

#### POST `/quest/start`
Start a new quest.

**Request Body:**
```json
{
  "difficulty": "easy",
  "subject": "mathematics"
}
```

#### POST `/quest/submit`
Submit quest answers.

**Request Body:**
```json
{
  "questId": "quest_id",
  "answers": [
    {
      "questionId": "question_id",
      "answer": "selected_answer"
    }
  ],
  "timeSpent": 180
}
```

#### GET `/quest/daily`
Get daily quest.

#### POST `/quest/daily/complete`
Complete daily quest.

**Request Body:**
```json
{
  "questType": "daily_login",
  "data": {}
}
```

#### GET `/quest/achievements`
Get user achievements.

### Notifications (`/notifications`)

#### GET `/notifications`
Get user notifications.

**Query Parameters:**
- `limit`: number (default: 20)
- `offset`: number (default: 0)
- `type`: `ACHIEVEMENT` | `COURSE_UPDATE` | `QUIZ_REMINDER` | `STREAK_REMINDER` | `GENERAL`
- `unreadOnly`: boolean

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "notification_id",
      "title": "New Achievement! 🏆",
      "message": "You've earned the 'High Scorer' badge!",
      "type": "ACHIEVEMENT",
      "isRead": false,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 15,
    "pages": 1,
    "page": 1,
    "limit": 20
  },
  "unreadCount": 5
}
```

#### PUT `/notifications/:id/read`
Mark notification as read.

#### PUT `/notifications/read-all`
Mark all notifications as read.

#### DELETE `/notifications/:id`
Delete notification.

#### GET `/notifications/stats`
Get notification statistics.

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid or missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

## Rate Limiting

The API implements rate limiting:
- 100 requests per 15 minutes per IP address
- Additional limits may apply to specific endpoints

## WebSocket Support

The API supports real-time features via WebSocket connections:
- Connection URL: `ws://localhost:5000`
- Events: notifications, leaderboard updates, progress updates

## Database Schema

The API uses PostgreSQL with Prisma ORM. Key models include:
- `User` - User accounts and profiles
- `Course` - Learning courses
- `Challenge` - Gamified challenges
- `Badge` - Achievement badges
- `Notification` - User notifications
- `GameProgress` - Gamification progress tracking

## Environment Variables

Required environment variables:
```
DATABASE_URL=postgresql://username:password@localhost:5432/acadevia
JWT_SECRET=your_jwt_secret
REFRESH_JWT_SECRET=your_refresh_jwt_secret
FRONTEND_URL=http://localhost:3000
```

## Development Setup

1. Install dependencies: `npm install`
2. Set up environment variables
3. Run database migrations: `npm run migrate`
4. Seed the database: `npm run seed`
5. Start the server: `npm run dev`

## Testing

Run tests with: `npm test`

## Deployment

The application can be deployed using Docker:
```bash
docker-compose up -d
```
