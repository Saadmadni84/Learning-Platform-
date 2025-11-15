import { Request, Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../types/auth.types';
import { asyncHandler } from '../middlewares/error.middleware';

export class CourseController {
  // GET /courses
  static getAllCourses = asyncHandler(async (req: Request, res: Response) => {
      const { 
        level, 
        search, 
        page = 1, 
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = req.query;

      const where: any = {};
      
      if (level) where.level = level;
      if (search) {
        where.OR = [
          { title: { contains: search as string, mode: 'insensitive' } },
          { description: { contains: search as string, mode: 'insensitive' } }
        ];
      }

      const orderBy: any = {};
      orderBy[sortBy as string] = sortOrder === 'desc' ? 'desc' : 'asc';

      const courses = await prisma.course.findMany({
        where,
        select: {
          id: true,
          title: true,
          description: true,
          thumbnail: true,
          level: true,
          duration: true,
          price: true,
          instructor: {
            select: {
            firstName: true,
            lastName: true,
              avatar: true
          }
        },
        enrollments: {
          select: {
            id: true
          }
          }
        },
        orderBy,
        take: parseInt(limit as string),
        skip: (parseInt(page as string) - 1) * parseInt(limit as string)
      });

      const total = await prisma.course.count({ where });

      res.status(200).json({
        success: true,
      courses: courses.map(course => ({
        ...course,
        totalStudents: course.enrollments.length
      })),
        pagination: {
          total,
          pages: Math.ceil(total / parseInt(limit as string)),
          page: parseInt(page as string),
          limit: parseInt(limit as string)
        }
      });
  });

  // GET /courses/:id
  static getCourseById = asyncHandler(async (req: Request, res: Response) => {
      const { id } = req.params;
      
      const course = await prisma.course.findUnique({
        where: { id },
        include: {
          lectures: {
            select: {
              id: true,
              title: true,
              description: true,
              duration: true,
              order: true,
            videoUrl: true
            },
            orderBy: { order: 'asc' }
          },
          instructor: {
            select: {
              id: true,
            firstName: true,
            lastName: true,
              avatar: true
            }
        },
        enrollments: {
          select: {
            id: true
          }
          }
        }
      });

      if (!course) {
        return res.status(404).json({ 
          success: false, 
          message: 'Course not found' 
        });
      }

    res.status(200).json({
      success: true,
      course: {
        ...course,
        totalStudents: course.enrollments.length
      }
    });
  });

  // POST /courses/:id/enroll
  static enrollInCourse = asyncHandler(async (req: AuthRequest, res: Response) => {
      const { id } = req.params;
      
      const course = await prisma.course.findUnique({
        where: { id }
      });

      if (!course) {
        return res.status(404).json({ 
          success: false, 
          message: 'Course not found' 
        });
      }

      // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: req.userId!,
            courseId: id
          }
        }
      });

      if (existingEnrollment) {
        return res.status(400).json({ 
          success: false, 
          message: 'Already enrolled in this course' 
        });
      }

        // Create enrollment
    await prisma.enrollment.create({
          data: {
            userId: req.userId!,
            courseId: id,
        status: 'ACTIVE',
        progress: 0
      }
      });

      res.status(200).json({
        success: true,
        message: 'Successfully enrolled in course'
      });
  });

  // GET /courses/:id/lectures
  static getCourseLectures = asyncHandler(async (req: Request, res: Response) => {
      const { id } = req.params;

      const lectures = await prisma.lecture.findMany({
        where: { courseId: id },
        select: {
          id: true,
          title: true,
          description: true,
          duration: true,
          order: true,
        videoUrl: true
        },
        orderBy: { order: 'asc' }
      });

      res.status(200).json({
        success: true,
        lectures
      });
  });

  // GET /courses/:id/quizzes
  static getCourseQuizzes = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const quizzes = await prisma.quiz.findMany({
      where: { courseId: id },
      select: {
        id: true,
        title: true,
        description: true,
        passingScore: true,
        timeLimit: true,
        questions: {
          select: {
            id: true,
            text: true,
            type: true,
            points: true
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      quizzes
    });
  });

  // GET /courses/:id/enrollment
  static getEnrollmentStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: req.userId!,
          courseId: id
        }
      }
    });

    res.status(200).json({
      success: true,
      enrollment
    });
  });

  // PUT /courses/:id/progress
  static updateProgress = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { progress } = req.body;

    const enrollment = await prisma.enrollment.update({
      where: {
        userId_courseId: {
          userId: req.userId!,
          courseId: id
        }
      },
      data: {
        progress: Math.min(100, Math.max(0, progress))
      }
    });

    res.status(200).json({
      success: true,
      enrollment
    });
  });

  // POST /courses/:courseId/quizzes/:quizId/attempt
  static attemptQuiz = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { courseId, quizId } = req.params;
    const { answers } = req.body;

    // Get quiz with questions
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: true
      }
    });

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Calculate score
    let correctAnswers = 0;
    const totalQuestions = quiz.questions.length;

    answers.forEach((answer: any) => {
      const question = quiz.questions.find(q => q.id === answer.questionId);
      if (question && question.correctAnswer === answer.answer) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / totalQuestions) * 100;
    const passed = score >= quiz.passingScore;

    // Save quiz attempt
    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: req.userId!,
        quizId,
        score,
        answers: answers,
        completedAt: new Date()
      }
    });

    // Award points if passed
    if (passed) {
      await prisma.user.update({
        where: { id: req.userId! },
        data: {
          points: { increment: 50 }
        }
      });
    }

    res.status(200).json({
      success: true,
      attempt: {
        id: attempt.id,
        score,
        passed,
        correctAnswers,
        totalQuestions
      }
    });
  });

  // GET /courses/:courseId/quizzes/:quizId/attempts
  static getQuizAttempts = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { courseId, quizId } = req.params;

    const attempts = await prisma.quizAttempt.findMany({
      where: {
        userId: req.userId!,
        quizId
      },
      orderBy: {
        completedAt: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      attempts
    });
  });

  // POST /courses (Instructor only)
  static createCourse = asyncHandler(async (req: AuthRequest, res: Response) => {
    const courseData = req.body;

    const course = await prisma.course.create({
      data: {
        ...courseData,
        instructorId: req.userId!
      }
    });

    res.status(201).json({
      success: true,
      course
    });
  });

  // PUT /courses/:id (Instructor only)
  static updateCourse = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    const course = await prisma.course.update({
      where: { id },
      data: updateData
    });

    res.status(200).json({
      success: true,
      course
    });
  });

  // DELETE /courses/:id (Instructor only)
  static deleteCourse = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    await prisma.course.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    });
  });

  // POST /courses/:id/lectures (Instructor only)
  static createLecture = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const lectureData = req.body;

    const lecture = await prisma.lecture.create({
      data: {
        ...lectureData,
        courseId: id
      }
    });

    res.status(201).json({
      success: true,
      lecture
    });
  });

  // PUT /courses/:courseId/lectures/:lectureId (Instructor only)
  static updateLecture = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { courseId, lectureId } = req.params;
    const updateData = req.body;

    const lecture = await prisma.lecture.update({
      where: { id: lectureId },
      data: updateData
    });

    res.status(200).json({
      success: true,
      lecture
    });
  });

  // DELETE /courses/:courseId/lectures/:lectureId (Instructor only)
  static deleteLecture = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { courseId, lectureId } = req.params;

    await prisma.lecture.delete({
      where: { id: lectureId }
    });

    res.status(200).json({
      success: true,
      message: 'Lecture deleted successfully'
    });
  });

  // POST /courses/:id/quizzes (Instructor only)
  static createQuiz = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const quizData = req.body;

    const quiz = await prisma.quiz.create({
      data: {
        ...quizData,
        courseId: id
      }
    });

    res.status(201).json({
      success: true,
      quiz
    });
  });

  // PUT /courses/:courseId/quizzes/:quizId (Instructor only)
  static updateQuiz = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { courseId, quizId } = req.params;
    const updateData = req.body;

    const quiz = await prisma.quiz.update({
      where: { id: quizId },
      data: updateData
    });

    res.status(200).json({
      success: true,
      quiz
    });
  });

  // DELETE /courses/:courseId/quizzes/:quizId (Instructor only)
  static deleteQuiz = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { courseId, quizId } = req.params;

    await prisma.quiz.delete({
      where: { id: quizId }
    });

    res.status(200).json({
      success: true,
      message: 'Quiz deleted successfully'
    });
  });

  // POST /courses/:courseId/quizzes/:quizId/questions (Instructor only)
  static createQuestion = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { courseId, quizId } = req.params;
    const questionData = req.body;

    const question = await prisma.question.create({
      data: {
        ...questionData,
        quizId
      }
    });

    res.status(201).json({
      success: true,
      question
    });
  });

  // PUT /courses/:courseId/quizzes/:quizId/questions/:questionId (Instructor only)
  static updateQuestion = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { courseId, quizId, questionId } = req.params;
    const updateData = req.body;

    const question = await prisma.question.update({
      where: { id: questionId },
      data: updateData
    });

    res.status(200).json({
      success: true,
      question
    });
  });

  // DELETE /courses/:courseId/quizzes/:quizId/questions/:questionId (Instructor only)
  static deleteQuestion = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { courseId, quizId, questionId } = req.params;

    await prisma.question.delete({
      where: { id: questionId }
    });

    res.status(200).json({
      success: true,
      message: 'Question deleted successfully'
    });
  });

  // POST /courses/:id/complete-lecture/:lectureId
  static async completeLecture(req: AuthRequest, res: Response) {
    try {
      const { id, lectureId } = req.params;
      
      // Get progress
      const progress = await prisma.progress.findUnique({
        where: {
          userId_courseId: {
            userId: req.userId!,
            courseId: id
          }
        }
      });

      if (!progress) {
        return res.status(404).json({ 
          success: false, 
          message: 'Progress not found' 
        });
      }

      // Check if lecture progress exists
      const existingLectureProgress = await prisma.lectureProgress.findUnique({
        where: {
          progressId_lectureId: {
            progressId: progress.id,
            lectureId
          }
        }
      });

      if (existingLectureProgress?.isCompleted) {
        return res.status(400).json({ 
          success: false, 
          message: 'Lecture already completed' 
        });
      }

      // Get total lectures in course
      const totalLectures = await prisma.lecture.count({
        where: { courseId: id }
      });

      // Update or create lecture progress
      await prisma.$transaction(async (tx) => {
        // Mark lecture as completed
        await tx.lectureProgress.upsert({
          where: {
            progressId_lectureId: {
              progressId: progress.id,
              lectureId
            }
          },
          update: {
            isCompleted: true,
            completedAt: new Date()
          },
          create: {
            progressId: progress.id,
            lectureId,
            isCompleted: true,
            completedAt: new Date()
          }
        });

        // Get completed lectures count
        const completedLectures = await tx.lectureProgress.count({
          where: {
            progressId: progress.id,
            isCompleted: true
          }
        });

        // Calculate progress percentage
        const progressPercentage = (completedLectures / totalLectures) * 100;
        const isCompleted = progressPercentage === 100;

        // Update course progress
        await tx.progress.update({
          where: { id: progress.id },
          data: {
            progressPercentage,
            isCompleted,
            completedAt: isCompleted ? new Date() : null
          }
        });

        // Award points if course completed
        if (isCompleted) {
          await tx.user.update({
            where: { id: req.userId! },
            data: {
              points: { increment: 100 },
              completedCourses: { increment: 1 }
            }
          });
        } else {
          // Award points for lecture completion
          await tx.user.update({
            where: { id: req.userId! },
            data: {
              points: { increment: 10 }
            }
          });
        }
      });

      res.status(200).json({
        success: true,
        message: 'Lecture marked as completed',
        progress: Math.round((await prisma.lectureProgress.count({
          where: {
            progressId: progress.id,
            isCompleted: true
          }
        }) / totalLectures) * 100)
      });
    } catch (error) {
      console.error('Complete lecture error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
}
