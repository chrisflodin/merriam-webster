import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Api500Error } from "../../../types/errors";
import { MongooseUser } from "../../../types/user";
import { promiseHandler } from "../../../utils/promise-handler";

export const loginUser: RequestHandler = async (request, response, next) => {
  const user = response.locals.user as MongooseUser;
  const token = user.generateAuthToken!();

  const [err, savedUser] = await promiseHandler(user.save());
  if (err) return next(new Api500Error(false, err.message));

  response.status(StatusCodes.OK).send({ savedUser, token });
};
