import { NextFunction, Request, Response } from "express";
import { errIsOperational } from "../../utils/error/error-type-check";
import chalk from "chalk";
import { BaseError } from "../../types/errors";

export const logError = (err: Error | BaseError, req: Request, res: Response, next: NextFunction) => {
  const errorTypeMessage = errIsOperational(err)
    ? chalk.blue("----- OPERATIONAL ERROR -----")
    : chalk.red("----- PROGRAMMER ERROR -----");

  console.log(errorTypeMessage);
  console.log(err);

  next(err);
};
