import { RequestHandler } from "express";
import { UserRequest } from "../../types/user";
import { Api400Error } from "../../types/errors";
import * as userService from "../../services/user";

export const createUserValidation: RequestHandler = async (request, _, next) => {
  const { body } = request as UserRequest;
  const { email } = body;

  const user = await userService.getUserByEmail(email);
  if (user) throw new Api400Error("User already exists");

  next();
};
