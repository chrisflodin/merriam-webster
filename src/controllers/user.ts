import { MongooseUser, UserRequest } from "../types/user";
import { Api500Error } from "../types/errors";
import { hideUserData } from "../utils/hideUserData";
import * as authService from "../services/authService";
import * as userService from "../services/user";
import { StatusCodes } from "http-status-codes";
import { RequestHandler } from "express";

export const createNewUser: RequestHandler = async (request, response, next) => {
  const { body } = request;

  const [err, result] = await userService.createUser(body);
  if (err) return next(err);

  const data = { savedUser: hideUserData(result.savedUser), token: result.token };

  response.status(StatusCodes.CREATED).send(data);
};

export const loginUser: RequestHandler = async (request, response, next) => {
  const { body } = request as UserRequest;

  const [err, user] = (await authService.verifyUserCredentials(body)) as [Error, MongooseUser];
  if (err) return next(err);

  const [error, result] = await authService.signIn(user);
  if (error) return next(new Api500Error(false, error.message));

  const data = {
    savedUser: hideUserData(result.savedUser),
    token: result.token,
  };

  response.status(StatusCodes.OK).send(data);
};

export const removeAllUsers: RequestHandler = async (request, response, next) => {
  const deletedUsers = await userService.deleteAllUsers();
  if (!deletedUsers.acknowledged) return next(new Api500Error());
  response.status(StatusCodes.OK).send(`${deletedUsers.deletedCount} users were deleted`);
};
