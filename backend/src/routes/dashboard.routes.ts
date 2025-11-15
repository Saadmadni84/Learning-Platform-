import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

// Dashboard routes
router.get('/student', authenticateToken, DashboardController.getStudentDashboard);
router.get('/leaderboard', DashboardController.getLeaderboard);
router.get('/progress', authenticateToken, DashboardController.getProgress);
router.get('/notifications', authenticateToken, DashboardController.getNotifications);
router.put('/notifications/:id/read', authenticateToken, DashboardController.markNotificationAsRead);

export default router;
