import { NextFunction, Response } from "express";
import { Api400Error } from "../../types/errors";
import { UserRequest } from "../../types/user";

export const validateQuery = async ({ query }: UserRequest, res: Response, next: NextFunction) => {
  if (!query.search) return next(new Api400Error(true, "Must provide a search key"));
  next();
};
