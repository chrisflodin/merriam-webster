import { NextFunction, Response } from "express";
import { UserRequest } from "../../types/user";
import { Api400Error } from "../../types/errors";

export const validateQueryString = async ({ query }: UserRequest, res: Response, next: NextFunction) => {
  if (!query.search) return next(new Api400Error(true, "Must provide a search key"));
  next();
};
