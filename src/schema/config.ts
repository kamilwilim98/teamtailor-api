import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().required(),
  NODE_ENV: Joi.string().required(),
  TEAMTAILOR_API_KEY: Joi.string().required(),
  TEAMTAILOR_API_URL: Joi.string().required(),
});
