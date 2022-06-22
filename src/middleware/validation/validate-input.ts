import { NextFunction, Request, Response } from "express";
import validator from "validator";
import { Api400Error } from "../../types/errors";
import { UserRequest } from "../../types/user";

export const validateInput = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req as UserRequest;
  const { email, password } = body;

  if (!email || !password) return next(new Api400Error(true, "Missing email or password"));

  if (!(validator.isEmail(email) && [email, password].every((val) => val.length > 3)))
    return next(new Api400Error(true, "Missing email or password"));

  next();
};
