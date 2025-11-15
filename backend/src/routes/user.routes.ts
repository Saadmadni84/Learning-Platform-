import { Router, Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validation.middleware';
import { updateProfileSchema, changePasswordSchema } from '../validations/user.validation';
import { AuthRequest } from '../types/auth.types';
import { asyncHandler } from '../middlewares/error.middleware';

const router = Router();

// Profile management
router.get('/profile', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  await UserController.getProfile(req, res);
}));

router.put('/profile', 
  authenticateToken,
  validateRequest(updateProfileSchema), 
  asyncHandler(async (req: AuthRequest, res: Response) => {
    await UserController.updateProfile(req, res);
  })
);

router.put('/change-password', 
  authenticateToken,
  validateRequest(changePasswordSchema), 
  asyncHandler(async (req: AuthRequest, res: Response) => {
    await UserController.changePassword(req, res);
  })
);

// User stats and progress
router.get('/stats', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  await UserController.getUserStats(req, res);
}));

router.get('/progress', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  await UserController.getUserProgress(req, res);
}));

router.get('/achievements', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  await UserController.getUserAchievements(req, res);
}));

// Course enrollment
router.get('/enrollments', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  await UserController.getUserEnrollments(req, res);
}));

router.get('/enrollments/:courseId', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  await UserController.getEnrollmentDetails(req, res);
}));

// Quiz attempts
router.get('/quiz-attempts', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  await UserController.getQuizAttempts(req, res);
}));

router.get('/quiz-attempts/:attemptId', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  await UserController.getQuizAttemptDetails(req, res);
}));

// Game progress
router.get('/game-progress', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  await UserController.getGameProgress(req, res);
}));

router.put('/game-progress', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  await UserController.updateGameProgress(req, res);
}));

// Leaderboard
router.get('/leaderboard', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  await UserController.getLeaderboard(req, res);
}));

export default router;
