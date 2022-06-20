import { NextFunction, Request, Response } from "express";
import { User } from "../../../models/user";
import { MongooseUser } from "../../../types/user";
import { promiseHandler } from "../../../utils/promise-handler";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const { email, password } = body;

  const newUser: MongooseUser = new User({ email, password: password, tokens: [] });

  const token = newUser.generateAuthToken();

  const [err, savedUser] = await promiseHandler(newUser.save());
  if (err) return next(err);

  res.status(200).send({ savedUser, token });
};
