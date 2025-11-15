import { Request, Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../types/auth.types';
import { asyncHandler } from '../middlewares/error.middleware';

export class ChallengeController {
  // GET /challenges
  static getAllChallenges = asyncHandler(async (req: Request, res: Response) => {
    const { type, difficulty, limit = 10, offset = 0 } = req.query;

    const where: any = { isActive: true };
    if (type) where.type = type;
    if (difficulty) where.difficulty = parseInt(difficulty as string);

    const challenges = await prisma.challenge.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit as string),
      skip: parseInt(offset as string)
    });

    const total = await prisma.challenge.count({ where });

    res.status(200).json({
      success: true,
      data: challenges,
      pagination: {
        total,
        pages: Math.ceil(total / parseInt(limit as string)),
        page: Math.floor(parseInt(offset as string) / parseInt(limit as string)) + 1,
        limit: parseInt(limit as string)
      }
    });
  });

  // GET /challenges/:id
  static getChallengeById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const challenge = await prisma.challenge.findUnique({
      where: { id }
    });

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }

    res.status(200).json({
      success: true,
      data: challenge
    });
  });

  // POST /challenges/:id/attempt
  static attemptChallenge = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { answers, timeSpent } = req.body;
    const userId = req.userId!;

    const challenge = await prisma.challenge.findUnique({
      where: { id }
    });

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }

    // Calculate score based on answers (this would be more complex in reality)
    const score = Math.floor(Math.random() * 40) + 60; // Mock score calculation

    // Create challenge attempt
    const attempt = await prisma.challengeAttempt.create({
      data: {
        userId,
        challengeId: id,
        score,
        timeSpent: timeSpent || 0,
        completedAt: new Date()
      }
    });

    // Award points to user
    const pointsEarned = Math.floor(score / 10) * challenge.points;
    await prisma.user.update({
      where: { id: userId },
      data: {
        points: { increment: pointsEarned },
        experience: { increment: pointsEarned }
      }
    });

    // Check for level up
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { level: true, experience: true }
    });

    const newLevel = Math.floor((user?.experience || 0) / 1000) + 1;
    if (newLevel > (user?.level || 1)) {
      await prisma.user.update({
        where: { id: userId },
        data: { level: newLevel }
      });

      // Create level up notification
      await prisma.notification.create({
        data: {
          userId,
          title: 'Level Up! 🎉',
          message: `Congratulations! You've reached level ${newLevel}!`,
          type: 'ACHIEVEMENT'
        }
      });
    }

    res.status(200).json({
      success: true,
      data: {
        attemptId: attempt.id,
        score,
        pointsEarned,
        levelUp: newLevel > (user?.level || 1),
        newLevel: newLevel > (user?.level || 1) ? newLevel : null
      }
    });
  });

  // GET /challenges/:id/attempts
  static getChallengeAttempts = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.userId!;
    const { limit = 10, offset = 0 } = req.query;

    const attempts = await prisma.challengeAttempt.findMany({
      where: {
        userId,
        challengeId: id
      },
      orderBy: { completedAt: 'desc' },
      take: parseInt(limit as string),
      skip: parseInt(offset as string)
    });

    const total = await prisma.challengeAttempt.count({
      where: {
        userId,
        challengeId: id
      }
    });

    res.status(200).json({
      success: true,
      data: attempts,
      pagination: {
        total,
        pages: Math.ceil(total / parseInt(limit as string)),
        page: Math.floor(parseInt(offset as string) / parseInt(limit as string)) + 1,
        limit: parseInt(limit as string)
      }
    });
  });

  // GET /challenges/leaderboard/:id
  static getChallengeLeaderboard = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { limit = 10 } = req.query;

    const leaderboard = await prisma.challengeAttempt.findMany({
      where: { challengeId: id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      },
      orderBy: [
        { score: 'desc' },
        { timeSpent: 'asc' }
      ],
      take: parseInt(limit as string)
    });

    const leaderboardData = leaderboard.map((attempt, index) => ({
      rank: index + 1,
      user: {
        id: attempt.user.id,
        name: `${attempt.user.firstName} ${attempt.user.lastName}`.trim(),
        avatar: attempt.user.avatar
      },
      score: attempt.score,
      timeSpent: attempt.timeSpent,
      completedAt: attempt.completedAt
    }));

    res.status(200).json({
      success: true,
      data: leaderboardData
    });
  });

  // GET /challenges/user/stats
  static getUserChallengeStats = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId!;

    const stats = await prisma.challengeAttempt.aggregate({
      where: { userId },
      _count: { id: true },
      _avg: { score: true },
      _sum: { score: true }
    });

    const challengesByType = await prisma.challengeAttempt.groupBy({
      by: ['challengeId'],
      where: { userId },
      _count: { id: true },
      _avg: { score: true }
    });

    const bestScores = await prisma.challengeAttempt.findMany({
      where: { userId },
      include: {
        challenge: {
          select: {
            title: true,
            type: true
          }
        }
      },
      orderBy: { score: 'desc' },
      take: 5
    });

    res.status(200).json({
      success: true,
      data: {
        totalAttempts: stats._count.id,
        averageScore: Math.round(stats._avg.score || 0),
        totalScore: stats._sum.score || 0,
        challengesCompleted: challengesByType.length,
        bestScores: bestScores.map(attempt => ({
          challengeTitle: attempt.challenge.title,
          challengeType: attempt.challenge.type,
          score: attempt.score,
          completedAt: attempt.completedAt
        }))
      }
    });
  });
}
