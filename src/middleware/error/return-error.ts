import { NextFunction, Request, Response } from "express";
import { BaseError, ERROR } from "../../types/errors";
import { errIsOperational } from "../../utils/error/errIsOperational";

export const returnError = (err: BaseError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent || !errIsOperational(err)) {
    const internalErr = ERROR.INTERNAL_SERVER();
    res.status(internalErr.statusCode);
    return next(internalErr);
  }

  res.status(err.statusCode || 500).send(err.getError() || "Internal server error");
  next();
};
