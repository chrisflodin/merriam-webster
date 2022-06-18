import { NextFunction, Request, Response } from "express";
import { User } from "../../models/user";
import { MongooseUser, UserRequest } from "../../types/user";
import { fetchWord } from "../merriam-webster/merriam-webster";
import { normalizeData } from "../merriam-webster/utils";
import { promiseHandler } from "../../utils/error/promise-handler";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const { email, password } = body;

  const newUser: MongooseUser = new User({ email, password: password, tokens: [] });

  const token = newUser.generateAuthToken();

  const [err, savedUser] = await promiseHandler(newUser.save());
  if (err) return next(err);

  res.status(200).send({ savedUser, token });
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user as MongooseUser;
  const token = user.generateAuthToken();

  const [err, savedUser] = await promiseHandler(user.save());
  if (err) return next(err);

  res.status(200).send({ savedUser, token });
};

export const getData = async ({ query }: UserRequest, res: Response) => {
  try {
    if (!query?.search) throw new Error("Must provide a search key");

    const data = await fetchWord(query.search);
    const normalized = normalizeData(data);

    if (!data) throw new Error();
    res.status(200).send(normalized);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};
