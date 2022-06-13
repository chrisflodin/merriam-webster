import { NextFunction, Request, Response } from "express";
import { BaseError } from "../../types/errors";

export const logError = (err: BaseError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  next(err);
};
