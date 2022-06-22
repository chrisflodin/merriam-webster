import { NextFunction, Request, Response } from "express";
import { promiseHandler } from "../../utils/promise-handler";
import { User } from "../../models/user";
import { MongooseUser, UserRequest } from "../../types/user";
import { compare } from "bcrypt";
import { Api400Error } from "../../types/errors";

export const authenticateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req as UserRequest;
  const { email, password } = body;
  // A lot of if-statements
  const [err, user] = await promiseHandler(User.findOne({ email }).exec());
  if (err) return next(err);
  if (!user) return next(new Api400Error(true, "Invalid username or password"));

  const pswdMatces = await compare(password, user.password);
  if (!pswdMatces) return next(new Api400Error(true, "Invalid username or password"));

  res.locals.user = user as MongooseUser;

  next();
};
