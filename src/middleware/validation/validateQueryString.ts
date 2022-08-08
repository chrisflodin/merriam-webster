import { NextFunction, Response } from "express";
import { UserRequest } from "../../types/user";
import { Api401Error } from "../../types/errors";

export const validateQueryString = async ({ query }: UserRequest, _: Response, next: NextFunction) => {
  if (!query.search) throw new Api401Error(true, "Must provide a search key");
  next();
};
