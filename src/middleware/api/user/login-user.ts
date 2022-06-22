import { NextFunction, Request, Response } from "express";
import { Api500Error } from "../../../types/errors";
import { MongooseUser } from "../../../types/user";
import { errIsOperational, isError } from "../../../utils/error/error-type-check";
import { promiseHandler } from "../../../utils/promise-handler";

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user as MongooseUser;
  const token = user.generateAuthToken();

  const [err, savedUser] = await promiseHandler(user.save());
  if (errIsOperational(err)) return next(new Api500Error(false, err.message));

  res.status(200).send({ savedUser, token });
};
