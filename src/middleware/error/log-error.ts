import { NextFunction, Request, Response } from "express";
import { errIsOperational } from "../../utils/error/error-type-check";
import chalk from "chalk";

export const logError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!errIsOperational(err)) logProgrammerError(err);
  logOperationalError(err);
  next(err);
};

const logOperationalError = (err: Error) => {
  console.log(chalk.blue("----- OPERATIONAL ERROR -----"));
  console.error(err);
};

const logProgrammerError = (err: Error) => {
  console.log(chalk.red("----- PROGRAMMER ERROR -----"));
  console.error(err);
};
