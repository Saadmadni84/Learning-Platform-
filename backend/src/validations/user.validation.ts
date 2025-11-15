import { z } from 'zod';

export const updateProfileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').optional(),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').optional(),
  dateOfBirth: z.string().optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  interests: z.array(z.string()).optional(),
  avatar: z.string().url('Invalid avatar URL').optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password is required'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const getUserStatsSchema = z.object({
  period: z.enum(['week', 'month', 'year', 'all']).default('month'),
});

export const getUserProgressSchema = z.object({
  courseId: z.string().uuid().optional(),
  limit: z.number().min(1).max(100).default(10),
  offset: z.number().min(0).default(0),
});

export const getEnrollmentDetailsSchema = z.object({
  courseId: z.string().uuid(),
});

export const getQuizAttemptsSchema = z.object({
  courseId: z.string().uuid().optional(),
  quizId: z.string().uuid().optional(),
  limit: z.number().min(1).max(100).default(10),
  offset: z.number().min(0).default(0),
});

export const getQuizAttemptDetailsSchema = z.object({
  attemptId: z.string().uuid(),
});

export const updateGameProgressSchema = z.object({
  courseId: z.string().uuid(),
  lectureId: z.string().uuid().optional(),
  quizId: z.string().uuid().optional(),
  points: z.number().min(0),
  badges: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
});

export const getLeaderboardSchema = z.object({
  period: z.enum(['week', 'month', 'year', 'all']).default('month'),
  limit: z.number().min(1).max(100).default(50),
  offset: z.number().min(0).default(0),
});
