import { RequestHandler } from "express";
import { promiseHandler } from "../../utils/promise-handler";
import { User } from "../../models/user";
import { MongooseUser, UserRequest } from "../../types/user";
import { compare } from "bcrypt";
import { Api400Error } from "../../types/errors";

export const authenticateLogin: RequestHandler = async (request, response, next) => {
  const { body } = request as UserRequest;
  const { email, password } = body;

  const [err, user] = await promiseHandler(User.findOne({ email }).exec());
  if (err) return next(new Api400Error(true, err.message));

  const pswdMatces = await compare(password, user!.password);
  if (!pswdMatces) return next(new Api400Error(true, "Invalid username or password"));

  response.locals.user = user as MongooseUser;

  next();
};
