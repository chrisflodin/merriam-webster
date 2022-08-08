import { RequestHandler } from "express";
import * as authService from "../services/authService";
import * as userService from "../services/user";
import { Api500Error } from "../types/errors";
import { MongooseUser } from "../types/user";
import { hideUserData } from "../utils/hideUserData";
import { StatusCodes } from "http-status-codes";

export const createNewUser: RequestHandler = async (request, response) => {
  const { body } = request;

  const result = await userService.createUser(body);

  const data = { savedUser: hideUserData(result.savedUser), token: result.token };

  response.status(StatusCodes.CREATED).send(data);
};

export const loginUser: RequestHandler = async (_, response) => {
  const user: MongooseUser = response.locals.user;

  const result = await authService.signIn(user);

  const data = {
    savedUser: hideUserData(result.savedUser),
    token: result.token,
  };

  response.status(StatusCodes.OK).send(data);
};

export const removeAllUsers: RequestHandler = async (_, response) => {
  const deletedUsers = await userService.deleteAllUsers();
  if (!deletedUsers.acknowledged) throw new Api500Error("Error when attempting to delete all users", false);
  response.status(StatusCodes.OK).send(`${deletedUsers.deletedCount} users were deleted`);
};
