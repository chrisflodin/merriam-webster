import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../../types/user";
import { User } from "../../models/user";
import { Api400Error } from "../../types/errors";

export const checkIfUserExists = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req as UserRequest;
  const { email } = body;

  const count = await User.count({ email });
  if (count > 0) return next(new Api400Error(true, "User already exists"));

  next();
};