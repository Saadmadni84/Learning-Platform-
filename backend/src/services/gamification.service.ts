import prisma from '../config/database';

export class GamificationService {
  // Award points to user
  static async awardPoints(userId: string, points: number, reason: string) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        points: { increment: points },
        experience: { increment: points }
      }
    });

    // Check for level up
    const newLevel = Math.floor(user.experience / 1000) + 1;
    if (newLevel > user.level) {
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

      return { levelUp: true, newLevel };
    }

    return { levelUp: false };
  }

  // Check and award achievements
  static async checkAchievements(userId: string, action: string, data: any) {
    const achievements = [];

    switch (action) {
      case 'quiz_completed':
        if (data.score >= 90) {
          const badge = await prisma.badge.findFirst({
            where: { name: 'High Scorer' }
          });
          if (badge) {
            const achievement = await this.awardBadge(userId, badge.id);
            if (achievement) achievements.push(achievement);
          }
        }
        break;

      case 'challenge_completed':
        if (data.timeSpent < 60) { // Less than 1 minute
          const badge = await prisma.badge.findFirst({
            where: { name: 'Speed Demon' }
          });
          if (badge) {
            const achievement = await this.awardBadge(userId, badge.id);
            if (achievement) achievements.push(achievement);
          }
        }
        break;

      case 'streak_updated':
        if (data.streakDays >= 7) {
          const badge = await prisma.badge.findFirst({
            where: { name: 'Streak Master' }
          });
          if (badge) {
            const achievement = await this.awardBadge(userId, badge.id);
            if (achievement) achievements.push(achievement);
          }
        }
        break;

      case 'course_completed':
        const course = await prisma.course.findUnique({
          where: { id: data.courseId },
          select: { category: true }
        });

        if (course?.category === 'Mathematics') {
          const mathChallenges = await prisma.challengeAttempt.count({
            where: {
              userId,
              challenge: { type: 'MATH_SPRINT' }
            }
          });

          if (mathChallenges >= 10) {
            const badge = await prisma.badge.findFirst({
              where: { name: 'Math Genius' }
            });
            if (badge) {
              const achievement = await this.awardBadge(userId, badge.id);
              if (achievement) achievements.push(achievement);
            }
          }
        }
        break;
    }

    return achievements;
  }

  // Award badge to user
  static async awardBadge(userId: string, badgeId: string) {
    try {
      const achievement = await prisma.userAchievement.create({
        data: {
          userId,
          badgeId
        },
        include: {
          badge: true
        }
      });

      // Create notification
      await prisma.notification.create({
        data: {
          userId,
          title: 'New Achievement! 🏆',
          message: `You've earned the "${achievement.badge.name}" badge!`,
          type: 'ACHIEVEMENT'
        }
      });

      return achievement;
    } catch (error) {
      // Badge already earned
      return null;
    }
  }

  // Update user streak
  static async updateStreak(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { streakDays: true, lastLoginAt: true }
    });

    if (!user) return 0;

    const today = new Date();
    const lastLogin = user.lastLoginAt;
    const isConsecutiveDay = lastLogin && 
      today.getTime() - lastLogin.getTime() <= 24 * 60 * 60 * 1000;

    const newStreak = isConsecutiveDay ? user.streakDays + 1 : 1;

    await prisma.user.update({
      where: { id: userId },
      data: {
        streakDays: newStreak,
        lastLoginAt: today
      }
    });

    // Check for streak achievements
    await this.checkAchievements(userId, 'streak_updated', { streakDays: newStreak });

    return newStreak;
  }

  // Get user leaderboard position
  static async getUserRank(userId: string, type: 'points' | 'level' | 'streak' = 'points') {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { points: true, level: true, streakDays: true }
    });

    if (!user) return null;

    const field = type === 'points' ? 'points' : type === 'level' ? 'level' : 'streakDays';
    const value = user[field];

    const rank = await prisma.user.count({
      where: {
        isVerified: true,
        [field]: { gt: value }
      }
    });

    return rank + 1;
  }

  // Get daily quest for user
  static async getDailyQuest(userId: string) {
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
      return { completed: true, quest: existingQuest };
    }

    // Generate daily quest
    const questTypes = [
      'Complete 3 math problems',
      'Read for 15 minutes',
      'Take a science quiz',
      'Practice vocabulary',
      'Review yesterday\'s lesson'
    ];

    const randomQuest = questTypes[Math.floor(Math.random() * questTypes.length)];

    return {
      completed: false,
      quest: {
        id: `daily_${Date.now()}`,
        title: randomQuest,
        type: 'DAILY_LOGIN',
        points: 50,
        description: 'Complete this daily quest to maintain your learning streak!'
      }
    };
  }

  // Complete daily quest
  static async completeDailyQuest(userId: string) {
    const result = await this.awardPoints(userId, 50, 'Daily quest completion');
    
    await prisma.gameProgress.create({
      data: {
        userId,
        type: 'DAILY_LOGIN',
        pointsEarned: 50,
        experienceGained: 50
      }
    });

    const newStreak = await this.updateStreak(userId);

    return {
      pointsEarned: 50,
      streakDays: newStreak,
      levelUp: result.levelUp,
      newLevel: result.newLevel
    };
  }
}
