import { Request, Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../types/auth.types';
import bcrypt from 'bcryptjs';

export class UserController {
  // GET /user/profile
  static async getProfile(req: AuthRequest, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phoneNumber: true,
          avatar: true,
          points: true,
          level: true,
          streakDays: true,
          completedCourses: true,
          createdAt: true,
          enrollments: {
            include: {
              course: {
                select: {
                  id: true,
                  title: true,
                  thumbnail: true,
                  category: true
                }
              }
            }
          }
        }
      });

      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: 'User not found' 
        });
      }

      res.status(200).json({
        success: true,
        user: {
          ...user,
          name: `${user.firstName} ${user.lastName}`.trim()
        }
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  // PUT /user/profile
  static async updateProfile(req: AuthRequest, res: Response) {
    try {
      const { firstName, lastName, email, phoneNumber, dateOfBirth, bio, interests, avatar } = req.body;
      
      const user = await prisma.user.update({
        where: { id: req.userId },
        data: { 
          firstName,
          lastName,
          email, 
          phoneNumber, 
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
          bio,
          interests,
          avatar 
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phoneNumber: true,
          avatar: true,
          points: true,
          level: true,
          bio: true,
          interests: true
        }
      });

      res.status(200).json({
        success: true,
        user: {
          ...user,
          name: `${user.firstName} ${user.lastName}`.trim()
        }
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  // PUT /user/change-password
  static async changePassword(req: AuthRequest, res: Response) {
    try {
      const { currentPassword, newPassword } = req.body;
      
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
        select: { password: true }
      });

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        return res.status(400).json({ success: false, message: 'Current password is incorrect' });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 12);
      
      await prisma.user.update({
        where: { id: req.userId },
        data: { password: hashedNewPassword }
      });

      res.status(200).json({
        success: true,
        message: 'Password changed successfully'
      });
    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  // GET /user/stats
  static async getUserStats(req: AuthRequest, res: Response) {
    try {
      const { period = 'month' } = req.query;
      
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
        select: {
          points: true,
          level: true,
          streakDays: true,
          completedCourses: true,
          createdAt: true
        }
      });

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Calculate additional stats based on period
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

      const enrollments = await prisma.enrollment.count({
        where: {
          userId: req.userId,
          createdAt: { gte: startDate }
        }
      });

      const quizAttempts = await prisma.quizAttempt.count({
        where: {
          userId: req.userId,
          createdAt: { gte: startDate }
        }
      });

      res.status(200).json({
        success: true,
        stats: {
          ...user,
          enrollments,
          quizAttempts,
          period
        }
      });
    } catch (error) {
      console.error('Get user stats error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  // GET /user/progress
  static async getUserProgress(req: AuthRequest, res: Response) {
    try {
      const progress = await prisma.progress.findMany({
        where: { userId: req.userId },
        include: {
          course: {
            select: {
              id: true,
              title: true,
              thumbnail: true,
              duration: true
            }
          },
          lectureProgress: {
            where: { isCompleted: true },
            include: {
              lecture: {
                select: {
                  title: true,
                  duration: true
                }
              }
            }
          }
        }
      });

      const stats = {
        totalCourses: progress.length,
        completedCourses: progress.filter(p => p.isCompleted).length,
        totalHours: Math.round(progress.reduce((acc, p) => acc + p.timeSpent, 0) / 60),
        averageProgress: progress.length > 0 
          ? Math.round(progress.reduce((acc, p) => acc + p.progressPercentage, 0) / progress.length)
          : 0
      };

      res.status(200).json({
        success: true,
        progress,
        stats
      });
    } catch (error) {
      console.error('Get progress error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  // GET /user/leaderboard
  static async getLeaderboard(req: AuthRequest, res: Response) {
    try {
      const { limit = 10, type = 'points' } = req.query;
      
      let orderBy: any = { points: 'desc' };
      if (type === 'level') orderBy = { level: 'desc' };
      if (type === 'courses') orderBy = { completedCourses: 'desc' };

      const leaderboard = await prisma.user.findMany({
        where: { isVerified: true },
        select: {
          id: true,
          name: true,
          avatar: true,
          points: true,
          level: true,
          completedCourses: true
        },
        orderBy,
        take: parseInt(limit as string)
      });

      // Get current user rank
      const currentUser = await prisma.user.findUnique({
        where: { id: req.userId },
        select: {
          id: true,
          name: true,
          avatar: true,
          points: true,
          level: true,
          completedCourses: true
        }
      });
      
      const fieldName = type === 'level' ? 'level' : type === 'courses' ? 'completedCourses' : 'points';
      const userRank = await prisma.user.count({
        where: {
          isVerified: true,
          [fieldName]: { gt: currentUser?.[fieldName as keyof typeof currentUser] }
        }
      }) + 1;

      res.status(200).json({
        success: true,
        leaderboard: leaderboard.map((user, index) => ({
          ...user,
          rank: index + 1
        })),
        currentUser: currentUser ? {
          ...currentUser,
          rank: userRank
        } : null
      });
    } catch (error) {
      console.error('Get leaderboard error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  // GET /user/achievements
  static async getUserAchievements(req: AuthRequest, res: Response) {
    try {
      const achievements = await prisma.achievement.findMany({
        where: { userId: req.userId },
        include: {
          badge: {
            select: {
              id: true,
              name: true,
              description: true,
              icon: true,
              color: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      res.status(200).json({
        success: true,
        achievements
      });
    } catch (error) {
      console.error('Get user achievements error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  // GET /user/enrollments
  static async getUserEnrollments(req: AuthRequest, res: Response) {
    try {
      const enrollments = await prisma.enrollment.findMany({
        where: { userId: req.userId },
        include: {
          course: {
            select: {
              id: true,
              title: true,
              description: true,
              thumbnail: true,
              category: true,
              level: true,
              duration: true,
              instructor: {
                select: {
                  id: true,
                  name: true,
                  avatar: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      res.status(200).json({
        success: true,
        enrollments
      });
    } catch (error) {
      console.error('Get user enrollments error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  // GET /user/enrollments/:courseId
  static async getEnrollmentDetails(req: AuthRequest, res: Response) {
    try {
      const { courseId } = req.params;
      
      const enrollment = await prisma.enrollment.findFirst({
        where: { 
          userId: req.userId,
          courseId 
        },
        include: {
          course: {
            include: {
              instructor: {
                select: {
                  id: true,
                  name: true,
                  avatar: true
                }
              },
              lectures: {
                select: {
                  id: true,
                  title: true,
                  duration: true,
                  order: true
                },
                orderBy: { order: 'asc' }
              }
            }
          },
          progress: {
            include: {
              lectureProgress: {
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
          }
        }
      });

      if (!enrollment) {
        return res.status(404).json({ 
          success: false, 
          message: 'Enrollment not found' 
        });
      }

      res.status(200).json({
        success: true,
        enrollment
      });
    } catch (error) {
      console.error('Get enrollment details error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  // GET /user/quiz-attempts
  static async getQuizAttempts(req: AuthRequest, res: Response) {
    try {
      const { courseId, quizId, limit = 10, offset = 0 } = req.query;
      
      const where: any = { userId: req.userId };
      if (courseId) where.courseId = courseId;
      if (quizId) where.quizId = quizId;

      const attempts = await prisma.quizAttempt.findMany({
        where,
        include: {
          quiz: {
            select: {
              id: true,
              title: true,
              description: true
            }
          },
          course: {
            select: {
              id: true,
              title: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: parseInt(limit as string),
        skip: parseInt(offset as string)
      });

      res.status(200).json({
        success: true,
        attempts
      });
    } catch (error) {
      console.error('Get quiz attempts error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  // GET /user/quiz-attempts/:attemptId
  static async getQuizAttemptDetails(req: AuthRequest, res: Response) {
    try {
      const { attemptId } = req.params;
      
      const attempt = await prisma.quizAttempt.findFirst({
        where: { 
          id: attemptId,
          userId: req.userId 
        },
        include: {
          quiz: {
            include: {
              questions: {
                include: {
                  options: true
                }
              }
            }
          },
          answers: {
            include: {
              question: {
                include: {
                  options: true
                }
              }
            }
          }
        }
      });

      if (!attempt) {
        return res.status(404).json({ 
          success: false, 
          message: 'Quiz attempt not found' 
        });
      }

      res.status(200).json({
        success: true,
        attempt
      });
    } catch (error) {
      console.error('Get quiz attempt details error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  // GET /user/game-progress
  static async getGameProgress(req: AuthRequest, res: Response) {
    try {
      const gameProgress = await prisma.gameProgress.findMany({
        where: { userId: req.userId },
        include: {
          course: {
            select: {
              id: true,
              title: true,
              thumbnail: true
            }
          }
        },
        orderBy: { updatedAt: 'desc' }
      });

      res.status(200).json({
        success: true,
        gameProgress
      });
    } catch (error) {
      console.error('Get game progress error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  // PUT /user/game-progress
  static async updateGameProgress(req: AuthRequest, res: Response) {
    try {
      const { courseId, lectureId, quizId, points, badges, achievements } = req.body;
      
      const gameProgress = await prisma.gameProgress.upsert({
        where: {
          userId_courseId: {
            userId: req.userId,
            courseId
          }
        },
        update: {
          points: { increment: points || 0 },
          badges: badges ? { push: badges } : undefined,
          achievements: achievements ? { push: achievements } : undefined,
          lastActivityAt: new Date()
        },
        create: {
          userId: req.userId,
          courseId,
          lectureId,
          quizId,
          points: points || 0,
          badges: badges || [],
          achievements: achievements || [],
          lastActivityAt: new Date()
        }
      });

      // Update user's total points
      if (points) {
        await prisma.user.update({
          where: { id: req.userId },
          data: { points: { increment: points } }
        });
      }

      res.status(200).json({
        success: true,
        gameProgress
      });
    } catch (error) {
      console.error('Update game progress error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
}
