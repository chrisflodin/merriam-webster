import { NextFunction, Request, Response } from "express";
import { Api500Error, BaseError } from "../../types/errors";
import { errIsOperational } from "../../utils/error/isOperational";

export const returnError = (err: BaseError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent || !errIsOperational(err)) {
    const internalErr = new Api500Error();
    res.status(internalErr.statusCode);
    return next(internalErr);
  }

  res.status(err.statusCode || 500).send(err.getError() || "Internal server error");
  next();
};
