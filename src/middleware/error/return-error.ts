import { NextFunction, Request, Response } from "express";
import { Api500Error } from "../../types/errors";
import { errIsOperational } from "../../utils/error/error-type-check";

export const returnError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent || !errIsOperational(err)) {
    const internalErr = new Api500Error();
    res.status(500).send(internalErr.getError());
    return next();
  }

  res.status(err.statusCode || 500).send(err.getError() || "Internal server error");
  next();
};
