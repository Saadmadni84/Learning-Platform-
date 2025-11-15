import { Request, Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../types/auth.types';
import { asyncHandler } from '../middlewares/error.middleware';

export class QuestController {
  // POST /quest/start
  static startQuest = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { difficulty = 'easy', subject } = req.body;
    const userId = req.userId!;

    // Generate quest based on difficulty and subject
    const quest = await generateQuest(difficulty, subject, userId);

    res.status(200).json({
      success: true,
      data: quest
    });
  });

  // POST /quest/submit
  static submitQuest = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { questId, answers, timeSpent } = req.body;
    const userId = req.userId!;

    // Calculate score based on answers
    const score = calculateQuestScore(answers);
    const pointsEarned = Math.floor(score / 10) * 10;

    // Update user points and experience
    await prisma.user.update({
      where: { id: userId },
      data: {
        points: { increment: pointsEarned },
        experience: { increment: pointsEarned }
      }
    });

    // Check for achievements
    const achievements = await checkQuestAchievements(userId, score, timeSpent);

    res.status(200).json({
      success: true,
      data: {
        score,
        pointsEarned,
        achievements
      }
    });
  });

  // GET /quest/daily
  static getDailyQuest = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId!;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if user already completed today's quest
    const existingQuest = await prisma.gameProgress.findFirst({
      where: {
        userId,
        type: 'DAILY_LOGIN',
        createdAt: { gte: today }
      }
    });

    if (existingQuest) {
      return res.status(200).json({
        success: true,
        data: {
          completed: true,
          quest: existingQuest
        }
      });
    }

    // Generate daily quest
    const dailyQuest = await generateDailyQuest(userId);

    res.status(200).json({
      success: true,
      data: {
        completed: false,
        quest: dailyQuest
      }
    });
  });

  // POST /quest/daily/complete
  static completeDailyQuest = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId!;
    const { questType, data } = req.body;

    // Create daily quest completion
    await prisma.gameProgress.create({
      data: {
        userId,
        type: 'DAILY_LOGIN',
        pointsEarned: 50,
        experienceGained: 50
      }
    });

    // Update user streak
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { streakDays: true, lastLoginAt: true }
    });

    const today = new Date();
    const lastLogin = user?.lastLoginAt;
    const isConsecutiveDay = lastLogin && 
      today.getTime() - lastLogin.getTime() <= 24 * 60 * 60 * 1000;

    const newStreak = isConsecutiveDay ? (user?.streakDays || 0) + 1 : 1;

    await prisma.user.update({
      where: { id: userId },
      data: {
        streakDays: newStreak,
        lastLoginAt: today,
        points: { increment: 50 }
      }
    });

    // Check for streak achievements
    if (newStreak % 7 === 0) {
      await prisma.notification.create({
        data: {
          userId,
          title: 'Streak Achievement! 🔥',
          message: `Amazing! You've maintained a ${newStreak}-day streak!`,
          type: 'STREAK_ACHIEVEMENT'
        }
      });
    }

    res.status(200).json({
      success: true,
      data: {
        streakDays: newStreak,
        pointsEarned: 50
      }
    });
  });

  // GET /quest/achievements
  static getAchievements = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId!;

    const achievements = await prisma.userAchievement.findMany({
      where: { userId },
      include: {
        badge: true
      },
      orderBy: { earnedAt: 'desc' }
    });

    const availableBadges = await prisma.badge.findMany({
      where: {
        NOT: {
          achievements: {
            some: { userId }
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: {
        earned: achievements,
        available: availableBadges
      }
    });
  });
}

// Helper functions
async function generateQuest(difficulty: string, subject: string, userId: string) {
  const questTypes = {
    easy: ['math-basics', 'vocabulary', 'general-knowledge'],
    medium: ['algebra', 'science-concepts', 'reading-comprehension'],
    hard: ['advanced-math', 'physics', 'literature-analysis']
  };

  const questType = questTypes[difficulty as keyof typeof questTypes][0];
  
  return {
    id: `quest_${Date.now()}`,
    type: questType,
    difficulty,
    subject,
    questions: generateQuestions(questType, difficulty),
    timeLimit: getTimeLimit(difficulty),
    points: getPoints(difficulty)
  };
}

async function generateDailyQuest(userId: string) {
  const questTypes = [
    'Complete 3 math problems',
    'Read for 15 minutes',
    'Take a science quiz',
    'Practice vocabulary',
    'Review yesterday\'s lesson'
  ];

  const randomQuest = questTypes[Math.floor(Math.random() * questTypes.length)];

  return {
    id: `daily_${Date.now()}`,
    title: randomQuest,
    type: 'DAILY_LOGIN',
    points: 50,
    description: 'Complete this daily quest to maintain your learning streak!'
  };
}

function generateQuestions(questType: string, difficulty: string) {
  // This would generate actual questions based on type and difficulty
  // For now, returning mock data
  return [
    {
      id: 'q1',
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correct: '4',
      points: 10
    },
    {
      id: 'q2',
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correct: 'Paris',
      points: 10
    }
  ];
}

function getTimeLimit(difficulty: string): number {
  const limits = { easy: 300, medium: 600, hard: 900 }; // seconds
  return limits[difficulty as keyof typeof limits] || 300;
}

function getPoints(difficulty: string): number {
  const points = { easy: 50, medium: 100, hard: 200 };
  return points[difficulty as keyof typeof points] || 50;
}

function calculateQuestScore(answers: any[]): number {
  // Mock score calculation
  return Math.floor(Math.random() * 40) + 60;
}

async function checkQuestAchievements(userId: string, score: number, timeSpent: number) {
  const achievements = [];

  // Check for high score achievement
  if (score >= 90) {
    const badge = await prisma.badge.findFirst({
      where: { name: 'High Scorer' }
    });

    if (badge) {
      await prisma.userAchievement.create({
        data: {
          userId,
          badgeId: badge.id
        }
      });
      achievements.push(badge);
    }
  }

  // Check for speed achievement
  if (timeSpent < 60) { // Less than 1 minute
    const badge = await prisma.badge.findFirst({
      where: { name: 'Speed Demon' }
    });

    if (badge) {
      await prisma.userAchievement.create({
        data: {
          userId,
          badgeId: badge.id
        }
      });
      achievements.push(badge);
    }
  }

  return achievements;
}
