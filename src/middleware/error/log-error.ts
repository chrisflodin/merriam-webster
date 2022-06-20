import { NextFunction, Request, Response } from "express";
import { BaseError } from "../../types/errors";
import { errIsOperational } from "../../utils/error/errIsOperational";

export const logError = (err: BaseError, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  next(err);
};
