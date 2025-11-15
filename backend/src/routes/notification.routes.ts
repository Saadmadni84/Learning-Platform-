import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { validateNotificationQuery, validateCreateNotification } from '../validations/notification.validation';

const router = Router();

// Notification routes
router.get('/', authenticateToken, validateNotificationQuery, NotificationController.getNotifications);
router.put('/:id/read', authenticateToken, NotificationController.markAsRead);
router.put('/read-all', authenticateToken, NotificationController.markAllAsRead);
router.delete('/:id', authenticateToken, NotificationController.deleteNotification);
router.post('/', authenticateToken, validateCreateNotification, NotificationController.createNotification);
router.get('/stats', authenticateToken, NotificationController.getNotificationStats);

export default router;
