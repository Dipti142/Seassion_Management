import Joi from "joi";

export const forceLoginSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().required(),
});
