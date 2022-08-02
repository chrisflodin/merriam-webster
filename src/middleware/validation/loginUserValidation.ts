import { RequestHandler } from "express";
import { MongooseUser, UserRequest } from "../../types/user";
import * as authService from "../../services/authService";

export const loginUserValidation: RequestHandler = async (request, response, next) => {
  const { body } = request as UserRequest;

  const [err, user] = (await authService.verifyUserCredentials(body)) as [Error, MongooseUser];
  if (err) return next(err);

  response.locals.user = user;

  next();
};
