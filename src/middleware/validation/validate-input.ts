import { NextFunction, Request, Response } from "express";
import validator from "validator";
import { UserRequest } from "../../types/user";
import { ERROR } from "../../types/errors";

export const validateInput = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req as UserRequest;
  const { email, password } = body;

  if (!email || !password) return next(ERROR.BAD_REQUEST("Missing email or password"));

  if (!(validator.isEmail(email) && [email, password].every((val) => val.length > 3)))
    return next(ERROR.BAD_REQUEST("Invalid username or password"));

  next();
};
