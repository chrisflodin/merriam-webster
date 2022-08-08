import { RequestHandler } from "express";
import { UserRequest } from "../../types/user";
import * as authService from "../../services/authService";
import { Api400Error } from "../../types/errors";

export const loginUserValidation: RequestHandler = async (request, response, next) => {
  const { body } = request as UserRequest;

  const user = await authService.verifyUserCredentials(body);
  // if (!user) throw new Api400Error(true, "Invalid username or password");

  response.locals.user = user;

  next();
};
