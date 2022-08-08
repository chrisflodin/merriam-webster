import { RequestHandler } from "express";
import { Api400Error } from "../../types/errors";
import { UserRequest } from "../../types/user";
import { EmailPasswordSchema } from "./validation";

export const userValidator: RequestHandler = (request, _, next) => {
  const { body } = request as UserRequest;
  const { error } = EmailPasswordSchema.validate(body);

  if (error) throw new Api400Error("Email or password is invalid");

  next();
};
