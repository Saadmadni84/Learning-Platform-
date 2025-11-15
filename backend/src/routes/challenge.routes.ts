import { Router } from 'express';
import { ChallengeController } from '../controllers/challenge.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { validateChallengeAttempt, validateChallengeQuery } from '../validations/challenge.validation';

const router = Router();

// Challenge routes
router.get('/', validateChallengeQuery, ChallengeController.getAllChallenges);
router.get('/:id', ChallengeController.getChallengeById);
router.post('/:id/attempt', authenticateToken, validateChallengeAttempt, ChallengeController.attemptChallenge);
router.get('/:id/attempts', authenticateToken, ChallengeController.getChallengeAttempts);
router.get('/:id/leaderboard', ChallengeController.getChallengeLeaderboard);
router.get('/user/stats', authenticateToken, ChallengeController.getUserChallengeStats);

export default router;
