import Joi from "joi";

export const EmailPasswordSchema = Joi.object({
  email: Joi.string().email().max(30).required(),
  password: Joi.string().pattern(/^\S*$/).min(4).max(30).required(),
});
