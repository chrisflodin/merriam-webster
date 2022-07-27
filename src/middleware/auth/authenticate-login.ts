import { RequestHandler } from "express";
import { MongooseUser, UserRequest } from "../../types/user";
import { compare } from "bcrypt";
import { Api400Error } from "../../types/errors";
import { getUserByEmail } from "../../services/user";

export const authenticateLogin: RequestHandler = async (request, response, next) => {
  const { body } = request as UserRequest;
  const { email, password } = body;

  const [err, user] = await getUserByEmail(email);
  if (err) return next(err);

  const pswdMatces = await compare(password, user!.password);
  if (!pswdMatces) return next(new Api400Error(true, "Invalid username or password"));

  response.locals.user = user as MongooseUser;

  next();
};
