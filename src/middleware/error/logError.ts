import { NextFunction, Request, Response } from "express";
import { errIsOperational } from "../../utils/error/errorTypeCheck";
import { BaseError } from "../../types/errors";
import { LOG_OPERATIONAL_ERRORS } from "../../config/development";
import chalk from "chalk";

export const logError = (err: Error | BaseError, _: Request, __: Response, next: NextFunction) => {
  const isOperational = errIsOperational(err);
  const errorHeading = isOperational
    ? chalk.blue("----- OPERATIONAL ERROR -----")
    : chalk.red("----- PROGRAMMER ERROR -----");

  if (isOperational && !LOG_OPERATIONAL_ERRORS) return next(err);

  console.log(errorHeading);
  console.log(err);

  next(err);
};
