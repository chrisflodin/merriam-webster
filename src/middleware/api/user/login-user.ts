import { NextFunction, Request, Response } from "express";
import { MongooseUser } from "../../../types/user";
import { promiseHandler } from "../../../utils/promise-handler";

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user as MongooseUser;
  const token = user.generateAuthToken();

  const [err, savedUser] = await promiseHandler(user.save());
  if (err) return next(err);

  res.status(200).send({ savedUser, token });
};
