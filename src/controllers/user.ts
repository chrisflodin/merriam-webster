import { MongooseUser } from "../types/user";
import { Api500Error } from "../types/errors";
import { hideUserData } from "../utils/hideUserData";
import * as authService from "../services/authService";
import * as userService from "../services/user";
import { StatusCodes } from "http-status-codes";
import { RequestHandler } from "express";

export const createNewUser: RequestHandler = async (request, response, next) => {
  const { body } = request;

  const result = await userService.createUser(body);

  const data = { savedUser: hideUserData(result.savedUser), token: result.token };

  response.status(StatusCodes.CREATED).send(data);
};

export const loginUser: RequestHandler = async (request, response, next) => {
  const user: MongooseUser = response.locals.user;

  const result = await authService.signIn(user);

  const data = {
    savedUser: hideUserData(result.savedUser),
    token: result.token,
  };

  response.status(StatusCodes.OK).send(data);
};

export const removeAllUsers: RequestHandler = async (request, response, next) => {
  const deletedUsers = await userService.deleteAllUsers();
  if (!deletedUsers.acknowledged) throw new Api500Error("Error when attempting to delete all users", false);
  response.status(StatusCodes.OK).send(`${deletedUsers.deletedCount} users were deleted`);
};
