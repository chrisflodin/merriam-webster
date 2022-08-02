import { RequestHandler } from "express";
import { UserRequest } from "../../types/user";
import { Api400Error } from "../../types/errors";
import * as userService from "../../services/user";

export const createUserValidation: RequestHandler = async (request, response, next) => {
  const { body } = request as UserRequest;
  const { email } = body;

  const [err, user] = await userService.getUserByEmail(email);
  if (user) return next(new Api400Error(true, "User already exists"));

  next();
};
