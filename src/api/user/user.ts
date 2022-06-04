import { Request, Response } from "express";
import { User } from "../../models/user";
import bcrypt from "bcrypt";
import { IUser } from "../../types/user";
import mongoose from "mongoose";
import { fetchWord } from "../merriam-webster/merriam-webster";
import { normalizeData } from "../merriam-webster/utils";

interface UserRequest extends Request {
  body: IUser;
  query: {
    search: string;
  };
}

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;
  const { username, email, password } = body;
  const userExists = (await User.count({ email })) > 0;

  if (userExists) {
    res.status(500).send({ error: "User already exists" });
    return;
  }

  const hashedPsw = await bcrypt.hash(password, 8);
  const newUser = new User({
    email,
    password: hashedPsw,
    username,
  });
  const token = newUser.generateAuthToken();

  try {
    newUser.save();
    res.status(200).send({ newUser, token });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const loginUser = async ({ body }: UserRequest, res: Response) => {
  const { email, password } = body;

  try {
    const user: (IUser & mongoose.Document<IUser>) | null = await User.findOne({ email });
    if (!user) throw new Error();

    const pswdMatces = await bcrypt.compare(password, user.password);
    if (!pswdMatces) throw new Error();

    const token = user.generateAuthToken();

    user.save();

    res.status(200).send({ user, token });
  } catch (error: any) {
    res.status(500).send({ error: "Email or password is invalid." });
  }
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
