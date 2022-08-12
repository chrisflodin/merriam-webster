import { RequestHandler } from "express";
import { UserRequest } from "../../types/user";
import * as authService from "../../services/authService";

export const loginUserValidation: RequestHandler = async (request, response, next) => {
  const { body } = request as UserRequest;
  response.locals.user = await authService.verifyUserCredentials(body);
  next();
};
