import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import courseRoutes from './course.routes';
import paymentRoutes from './payment.routes';
import uploadRoutes from './upload.routes';
import dashboardRoutes from './dashboard.routes';
import challengeRoutes from './challenge.routes';
import questRoutes from './quest.routes';
import notificationRoutes from './notification.routes';
import sourceRoutes from './source.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/courses', courseRoutes);
router.use('/payments', paymentRoutes);
router.use('/upload', uploadRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/challenges', challengeRoutes);
router.use('/quest', questRoutes);
router.use('/notifications', notificationRoutes);
router.use('/sources', sourceRoutes);

export default router;
