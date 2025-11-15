import Joi from 'joi';

export const courseValidation = {
  createCourse: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(1000).required(),
    thumbnail: Joi.string().uri().optional(),
    price: Joi.number().min(0).optional(),
    level: Joi.string().valid('BEGINNER', 'INTERMEDIATE', 'ADVANCED').required(),
    duration: Joi.number().min(1).required(),
  }),

  updateCourse: Joi.object({
    title: Joi.string().min(3).max(100).optional(),
    description: Joi.string().min(10).max(1000).optional(),
    thumbnail: Joi.string().uri().optional(),
    price: Joi.number().min(0).optional(),
    level: Joi.string().valid('BEGINNER', 'INTERMEDIATE', 'ADVANCED').optional(),
    duration: Joi.number().min(1).optional(),
  }),

  createLecture: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).optional(),
    videoUrl: Joi.string().uri().optional(),
    duration: Joi.number().min(1).required(),
    order: Joi.number().min(1).required(),
  }),

  updateLecture: Joi.object({
    title: Joi.string().min(3).max(100).optional(),
    description: Joi.string().max(500).optional(),
    videoUrl: Joi.string().uri().optional(),
    duration: Joi.number().min(1).optional(),
    order: Joi.number().min(1).optional(),
  }),

  createQuiz: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).optional(),
    passingScore: Joi.number().min(0).max(100).default(70),
    timeLimit: Joi.number().min(1).optional(),
  }),

  updateQuiz: Joi.object({
    title: Joi.string().min(3).max(100).optional(),
    description: Joi.string().max(500).optional(),
    passingScore: Joi.number().min(0).max(100).optional(),
    timeLimit: Joi.number().min(1).optional(),
  }),

  createQuestion: Joi.object({
    text: Joi.string().min(5).max(500).required(),
    type: Joi.string().valid('MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER', 'ESSAY').required(),
    options: Joi.array().items(Joi.string()).optional(),
    correctAnswer: Joi.string().required(),
    points: Joi.number().min(1).default(1),
  }),

  updateQuestion: Joi.object({
    text: Joi.string().min(5).max(500).optional(),
    type: Joi.string().valid('MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER', 'ESSAY').optional(),
    options: Joi.array().items(Joi.string()).optional(),
    correctAnswer: Joi.string().optional(),
    points: Joi.number().min(1).optional(),
  }),

  quizAttempt: Joi.object({
    answers: Joi.array().items(
      Joi.object({
        questionId: Joi.string().required(),
        answer: Joi.string().required(),
      })
    ).required(),
  }),

  updateProgress: Joi.object({
    progress: Joi.number().min(0).max(100).required(),
  }),

  addYouTubeVideo: Joi.object({
    courseId: Joi.string().required(),
    youtubeUrl: Joi.string().uri().required(),
    title: Joi.string().min(3).max(100).optional(),
    description: Joi.string().max(500).optional(),
  }),
};

