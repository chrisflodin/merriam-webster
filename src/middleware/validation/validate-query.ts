import { NextFunction, Response } from "express";
import { UserRequest } from "../../types/user";
import { ERROR } from "../../types/errors";

export const validateQuery = async ({ query }: UserRequest, res: Response, next: NextFunction) => {
  if (!query.search) return next(ERROR.BAD_REQUEST("Must provide a search key"));
  next();
};
