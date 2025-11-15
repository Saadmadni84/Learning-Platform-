import { Router } from 'express';
import { QuestController } from '../controllers/quest.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { validateQuestStart, validateQuestSubmit, validateDailyQuestComplete } from '../validations/quest.validation';

const router = Router();

// Quest routes
router.post('/start', authenticateToken, validateQuestStart, QuestController.startQuest);
router.post('/submit', authenticateToken, validateQuestSubmit, QuestController.submitQuest);
router.get('/daily', authenticateToken, QuestController.getDailyQuest);
router.post('/daily/complete', authenticateToken, validateDailyQuestComplete, QuestController.completeDailyQuest);
router.get('/achievements', authenticateToken, QuestController.getAchievements);

export default router;
