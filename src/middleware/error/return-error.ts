import { NextFunction, Request, Response } from "express";
import { BaseError } from "../../types/errors";

export const returnError = (err: BaseError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(err);
  res.status(err.statusCode || 500).send(err.getError());
  next();
};
