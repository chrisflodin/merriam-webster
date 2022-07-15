import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../../../models/user";
import { MongooseUser } from "../../../types/user";
import { promiseHandler } from "../../../utils/promise-handler";

export const createUser: RequestHandler = async (request, response, next) => {
  const { body } = request;
  const { email, password } = body;

  const newUser: MongooseUser = new User({ email, password: password, tokens: [] });

  const token = newUser.generateAuthToken!();

  const [err, savedUser] = await promiseHandler(newUser.save());
  if (err) return next(err);

  response.status(StatusCodes.CREATED).send({ savedUser, token });
};
