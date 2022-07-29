import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { UserModel } from "../models/user";
import { deleteAllUsers } from "../services/user";
import { Api500Error } from "../types/errors";
import { MongooseUser } from "../types/user";
import { hideUserData } from "../utils/hideUserData";
import { promiseHandler } from "../utils/promise-handler";

export const createUser: RequestHandler = async (request, response, next) => {
  const { body } = request;
  const { email, password } = body;

  const newUser: MongooseUser = new UserModel({ email, password: password, tokens: [] });

  const token = newUser.generateAuthToken!();

  const [err, savedUser] = await promiseHandler(newUser.save());
  if (err) return next(err);

  response.status(StatusCodes.CREATED).send({ savedUser: hideUserData(savedUser), token });
};

export const loginUser: RequestHandler = async (request, response, next) => {
  const user = response.locals.user as MongooseUser;
  const token = user.generateAuthToken!();

  const [err, savedUser] = await promiseHandler(user.save());
  if (err) return next(new Api500Error(false, err.message));

  response.status(StatusCodes.OK).send({ savedUser: hideUserData(savedUser), token });
};

export const removeAllUsers: RequestHandler = async (request, response, next) => {
  const deletedUsers = await deleteAllUsers();
  if (!deletedUsers.acknowledged) return next(new Api500Error());
  response.status(StatusCodes.OK).send(`${deletedUsers.deletedCount} users were deleted`);
};
