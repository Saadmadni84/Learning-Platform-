import { Request, Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../types/auth.types';
import { asyncHandler } from '../middlewares/error.middleware';

export class DashboardController {
  // GET /dashboard/student
  static getStudentDashboard = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId!;

    // Get user stats
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        points: true,
        level: true,
        streakDays: true,
        completedCourses: true,
        avatar: true,
        lastLoginAt: true
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get enrollment stats
    const enrollmentStats = await prisma.enrollment.aggregate({
      where: { userId },
      _count: { id: true }
    });

    // Get completed courses
    const completedCourses = await prisma.enrollment.count({
      where: {
        userId,
        status: 'COMPLETED'
      }
    });

    // Get recent achievements
    const recentAchievements = await prisma.userAchievement.findMany({
      where: { userId },
      include: {
        badge: {
          select: {
            id: true,
            name: true,
            icon: true,
            description: true,
            color: true
          }
        }
      },
      orderBy: { earnedAt: 'desc' },
      take: 6
    });

    // Get global rank
    const usersWithHigherPoints = await prisma.user.count({
      where: {
        points: { gt: user.points },
        isVerified: true
      }
    });
    const globalRank = usersWithHigherPoints + 1;

    // Get weekly progress data
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const weeklyProgress = await prisma.gameProgress.findMany({
      where: {
        userId,
        createdAt: { gte: oneWeekAgo }
      },
      select: {
        pointsEarned: true,
        createdAt: true
      },
      orderBy: { createdAt: 'asc' }
    });

    // Calculate average score from quiz attempts
    const quizStats = await prisma.quizAttempt.aggregate({
      where: { userId },
      _avg: { score: true }
    });

    const averageScore = Math.round(quizStats._avg.score || 0);

    // Get upcoming tests (quizzes in enrolled courses)
    const upcomingTests = await prisma.quiz.count({
      where: {
        course: {
          enrollments: {
            some: {
              userId,
              status: 'ACTIVE'
            }
          }
        }
      }
    });

    const dashboardData = {
      totalPoints: user.points,
      globalRank,
      streakDays: user.streakDays,
      completedLessons: completedCourses,
      averageScore,
      enrolledCourses: enrollmentStats._count.id,
      upcomingTests,
      recentBadges: recentAchievements.map(achievement => ({
        id: achievement.badge.id,
        name: achievement.badge.name,
        icon: achievement.badge.icon,
        description: achievement.badge.description,
        earnedAt: achievement.earnedAt.toISOString()
      })),
      weeklyProgress: weeklyProgress.map(progress => ({
        day: progress.createdAt.toLocaleDateString('en-US', { weekday: 'short' }),
        score: progress.pointsEarned
      }))
    };

    res.status(200).json({
      success: true,
      data: dashboardData
    });
  });

  // GET /dashboard/leaderboard
  static getLeaderboard = asyncHandler(async (req: Request, res: Response) => {
    const { type = 'points', limit = 10 } = req.query;

    let orderBy: any = { points: 'desc' };
    if (type === 'level') orderBy = { level: 'desc' };
    if (type === 'courses') orderBy = { completedCourses: 'desc' };

    const leaderboard = await prisma.user.findMany({
      where: { isVerified: true },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        avatar: true,
        points: true,
        level: true,
        completedCourses: true,
        streakDays: true
      },
      orderBy,
      take: parseInt(limit as string)
    });

    // Calculate stages based on points
    const getStage = (points: number) => {
      if (points >= 4000) return { name: 'Gold', color: 'from-amber-400 to-yellow-400', emoji: '🥇' };
      if (points >= 3000) return { name: 'Silver', color: 'from-gray-300 to-slate-300', emoji: '🥈' };
      if (points >= 2000) return { name: 'Bronze', color: 'from-orange-300 to-amber-300', emoji: '🥉' };
      return { name: 'Rookie', color: 'bg-gray-100', emoji: '🛡️' };
    };

    const leaderboardWithStages = leaderboard.map((user, index) => ({
      ...user,
      rank: index + 1,
      stage: getStage(user.points),
      name: `${user.firstName} ${user.lastName}`.trim()
    }));

    res.status(200).json({
      success: true,
      data: leaderboardWithStages
    });
  });

  // GET /dashboard/progress
  static getProgress = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId!;
    const { period = 'month' } = req.query;

    // Calculate date range
    const now = new Date();
    let startDate: Date;
    
    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'year':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(0);
    }

    // Get progress by subject/category
    const progressData = await prisma.progress.findMany({
      where: {
        userId,
        createdAt: { gte: startDate }
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            category: true,
            thumbnail: true,
            duration: true
          }
        },
        lectureProgress: {
          where: { isCompleted: true },
          include: {
            lecture: {
              select: {
                id: true,
                title: true,
                duration: true
              }
            }
          }
        }
      }
    });

    // Group by subject/category
    const subjectProgress = progressData.reduce((acc, progress) => {
      const subject = progress.course.category || 'General';
      if (!acc[subject]) {
        acc[subject] = {
          subject,
          completion: 0,
          xp: 0,
          streakDays: 0,
          testsTaken: 0,
          averageScore: 0,
          courses: []
        };
      }
      
      acc[subject].completion += progress.progressPercentage;
      acc[subject].xp += progress.timeSpent * 2; // XP calculation
      acc[subject].courses.push(progress.course);
      
      return acc;
    }, {} as any);

    // Get quiz attempts for average scores
    const quizAttempts = await prisma.quizAttempt.findMany({
      where: {
        userId,
        createdAt: { gte: startDate }
      },
      select: {
        score: true,
        quiz: {
          select: {
            course: {
              select: { category: true }
            }
          }
        }
      }
    });

    // Calculate average scores by subject
    Object.keys(subjectProgress).forEach(subject => {
      const subjectQuizzes = quizAttempts.filter(attempt => 
        attempt.quiz.course.category === subject
      );
      const avgScore = subjectQuizzes.length > 0 
        ? subjectQuizzes.reduce((sum, attempt) => sum + attempt.score, 0) / subjectQuizzes.length
        : 0;
      
      subjectProgress[subject].averageScore = Math.round(avgScore);
      subjectProgress[subject].testsTaken = subjectQuizzes.length;
    });

    const subjects = Object.values(subjectProgress).map((subject: any) => ({
      subject: subject.subject,
      completion: Math.round(subject.completion / subject.courses.length),
      xp: subject.xp,
      streakDays: Math.floor(Math.random() * 15) + 1, // Mock data for now
      testsTaken: subject.testsTaken,
      averageScore: subject.averageScore,
      weeklyScores: [
        { label: 'Mon', value: Math.floor(Math.random() * 20) + 60, date: 'Mon' },
        { label: 'Tue', value: Math.floor(Math.random() * 20) + 60, date: 'Tue' },
        { label: 'Wed', value: Math.floor(Math.random() * 20) + 60, date: 'Wed' },
        { label: 'Thu', value: Math.floor(Math.random() * 20) + 60, date: 'Thu' },
        { label: 'Fri', value: Math.floor(Math.random() * 20) + 60, date: 'Fri' }
      ],
      chapters: subject.courses.slice(0, 3).map((course: any, index: number) => ({
        label: course.title.substring(0, 20) + '...',
        value: Math.floor(Math.random() * 40) + 40,
        color: ['#F59E0B', '#10B981', '#3B82F6'][index] || '#8B5CF6'
      }))
    }));

    res.status(200).json({
      success: true,
      data: subjects
    });
  });

  // GET /dashboard/notifications
  static getNotifications = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId!;
    const { limit = 20, offset = 0 } = req.query;

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit as string),
      skip: parseInt(offset as string)
    });

    res.status(200).json({
      success: true,
      data: notifications
    });
  });

  // PUT /dashboard/notifications/:id/read
  static markNotificationAsRead = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.userId!;

    await prisma.notification.updateMany({
      where: {
        id,
        userId
      },
      data: {
        isRead: true
      }
    });

    res.status(200).json({
      success: true,
      message: 'Notification marked as read'
    });
  });
}
