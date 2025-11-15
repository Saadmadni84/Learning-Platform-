import Joi from 'joi';

export const validateChallengeAttempt = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    answers: Joi.array().items(
      Joi.object({
        questionId: Joi.string().required(),
        answer: Joi.string().required()
      })
    ).required(),
    timeSpent: Joi.number().integer().min(0).optional()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

export const validateChallengeQuery = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    type: Joi.string().valid('MATH_SPRINT', 'SCIENCE_QUIZ', 'WORD_BUILDER', 'LOGIC_PUZZLE', 'GENERAL_KNOWLEDGE').optional(),
    difficulty: Joi.number().integer().min(1).max(5).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    offset: Joi.number().integer().min(0).optional()
  });

  const { error } = schema.validate(req.query);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};
