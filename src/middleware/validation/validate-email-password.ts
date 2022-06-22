import { NextFunction, Request, Response } from "express";
import { Api400Error } from "../../types/errors";
import { UserRequest } from "../../types/user";
import { EmailPasswordSchema } from "../api/user/validation";

export const validateEmailPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req as UserRequest;

  const { error } = EmailPasswordSchema.validate(body);
  if (error) return next(new Api400Error(true, "Email or password is invalid", error));

  next();
};
