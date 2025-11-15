import Joi from 'joi';

export const validateNotificationQuery = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    limit: Joi.number().integer().min(1).max(100).optional(),
    offset: Joi.number().integer().min(0).optional(),
    type: Joi.string().valid('ACHIEVEMENT', 'COURSE_UPDATE', 'QUIZ_REMINDER', 'STREAK_REMINDER', 'GENERAL').optional(),
    unreadOnly: Joi.boolean().optional()
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

export const validateCreateNotification = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    title: Joi.string().required(),
    message: Joi.string().required(),
    type: Joi.string().valid('ACHIEVEMENT', 'COURSE_UPDATE', 'QUIZ_REMINDER', 'STREAK_REMINDER', 'GENERAL').optional(),
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
