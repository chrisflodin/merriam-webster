import { RequestHandler } from "express";
import { UserRequest } from "../../types/user";
import { UserModel } from "../../models/user";
import { Api400Error } from "../../types/errors";

export const checkIfUserExists: RequestHandler = async (request, response, next) => {
  const { body } = request as UserRequest;
  const { email } = body;

  const count = await UserModel.count({ email });
  if (count > 0) return next(new Api400Error(true, "User already exists"));

  next();
};
