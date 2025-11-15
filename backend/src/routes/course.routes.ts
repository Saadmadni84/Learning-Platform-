import { Router } from 'express';
import { CourseController } from '../controllers/course.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validation.middleware';
import { courseValidation } from '../validations/course.validation';

const router = Router();

// Public routes
router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getCourseById);
router.get('/:id/lectures', CourseController.getCourseLectures);
router.get('/:id/quizzes', CourseController.getCourseQuizzes);

// Protected routes (require authentication)
router.use(authenticateToken);

// Course enrollment
router.post('/:id/enroll', CourseController.enrollInCourse);
router.get('/:id/enrollment', CourseController.getEnrollmentStatus);
router.put('/:id/progress', CourseController.updateProgress);

// Quiz attempts
router.post('/:courseId/quizzes/:quizId/attempt', CourseController.attemptQuiz);
router.get('/:courseId/quizzes/:quizId/attempts', CourseController.getQuizAttempts);

// Instructor routes (require instructor role)
router.post('/', authenticateToken, CourseController.createCourse);
router.put('/:id', authenticateToken, CourseController.updateCourse);
router.delete('/:id', authenticateToken, CourseController.deleteCourse);

// Lecture management
router.post('/:id/lectures', authenticateToken, CourseController.createLecture);
router.put('/:courseId/lectures/:lectureId', authenticateToken, CourseController.updateLecture);
router.delete('/:courseId/lectures/:lectureId', authenticateToken, CourseController.deleteLecture);

// Quiz management
router.post('/:id/quizzes', authenticateToken, CourseController.createQuiz);
router.put('/:courseId/quizzes/:quizId', authenticateToken, CourseController.updateQuiz);
router.delete('/:courseId/quizzes/:quizId', authenticateToken, CourseController.deleteQuiz);

// Question management
router.post('/:courseId/quizzes/:quizId/questions', authenticateToken, CourseController.createQuestion);
router.put('/:courseId/quizzes/:quizId/questions/:questionId', authenticateToken, CourseController.updateQuestion);
router.delete('/:courseId/quizzes/:quizId/questions/:questionId', authenticateToken, CourseController.deleteQuestion);

export default router;

