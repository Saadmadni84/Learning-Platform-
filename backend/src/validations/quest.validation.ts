import Joi from 'joi';

export const validateQuestStart = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    difficulty: Joi.string().valid('easy', 'medium', 'hard').optional(),
    subject: Joi.string().optional()
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

export const validateQuestSubmit = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    questId: Joi.string().required(),
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

export const validateDailyQuestComplete = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    questType: Joi.string().required(),
    data: Joi.object().optional()
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
