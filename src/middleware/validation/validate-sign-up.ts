import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../../types/user";
import { ERROR } from "../../types/errors";
import { User } from "../../models/user";

export const validateSignUp = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req as UserRequest;
  const { email } = body;

  const count = await User.count({ email });
  if (count > 0) return next(ERROR.BAD_REQUEST("User already exists"));

  next();
};
