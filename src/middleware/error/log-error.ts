import { NextFunction, Request, Response } from "express";
import { errIsOperational } from "../../utils/error/error-type-check";
import chalk from "chalk";
import { BaseError } from "../../types/errors";

export const logError = (err: Error | BaseError, req: Request, res: Response, next: NextFunction) => {
  errIsOperational(err) ? logOperationalError(err) : logProgrammerError(err);
  next(err);
};

const logOperationalError = (err: BaseError) => {
  console.log(chalk.blue("----- OPERATIONAL ERROR -----"));
  console.error(err.log || err.message);
};

const logProgrammerError = (err: Error) => {
  console.log(chalk.red("----- PROGRAMMER ERROR -----"));
  console.error(err);
};
