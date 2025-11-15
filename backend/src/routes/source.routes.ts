import { Router } from 'express';
import { SourceController } from '../controllers/source.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

// All source routes require authentication
router.use(authenticateToken);

// Get course sources
router.get('/:courseId', SourceController.getCourseSources);

// Add source to course
router.post('/:courseId', SourceController.addCourseSource);

// Update course source
router.put('/:courseId/:sourceId', SourceController.updateCourseSource);

// Delete course source
router.delete('/:courseId/:sourceId', SourceController.deleteCourseSource);

// Reorder course sources
router.put('/:courseId/reorder', SourceController.reorderCourseSources);

export default router;
