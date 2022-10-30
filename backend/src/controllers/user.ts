import { RequestHandler } from "express";
import * as authService from "../services/authService";
import * as userService from "../services/userService";
import { Api500Error } from "../types/errors";
import { hideUserData } from "../utils/hideUserData";
import { StatusCodes } from "http-status-codes";

export const createNewUser: RequestHandler = async (request, response) => {
  const { body } = request;
  const { user, token } = await userService.createUser(body);

  response.status(StatusCodes.CREATED).send({ user: hideUserData(user), token: token });
};

export const loginUser: RequestHandler = async (_, response) => {
  const { user, token } = await authService.signIn(response.locals.user);

  response.status(StatusCodes.OK).send({
    user: hideUserData(user),
    token: token,
  });
};

export const removeAllUsers: RequestHandler = async (_, response) => {
  const { deletedCount, acknowledged } = await userService.deleteAllUsers();
  if (!acknowledged) throw new Api500Error("Error when attempting to delete all users", false);
  response.status(StatusCodes.OK).send(`${deletedCount} users were deleted`);
};
