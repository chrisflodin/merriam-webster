import { Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import { IUser } from "../types/user";
import mongoose from "mongoose";

type UserRequest = {
  body: IUser;
};

export const createUser = async ({ body }: UserRequest, res: Response) => {
  const { email, password, firstName, lastName } = body;
  const userExists = (await User.count({ email })) > 0;

  if (userExists) {
    res.status(500).send({ error: "User already exists" });
    return;
  }

  const hashedPsw = await bcrypt.hash(password, 8);
  const newUser = new User({
    email,
    password: hashedPsw,
    firstName,
    lastName,
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
  const errMessage = "Email or password is invalid.";

  try {
    const user: (IUser & mongoose.Document<IUser>) | null = await User.findOne({ email });
    if (!user) throw new Error(errMessage);

    const pswdMatces = await bcrypt.compare(password, user.password);
    if (!pswdMatces) throw new Error(errMessage);

    const token = user.generateAuthToken();
    user.save();
    res.status(200).send({ user, token });
  } catch (error: any) {
    res.status(401).send({ error: error.message });
  }
};

export const getData = async (req: Request, res: Response) => {
  try {
    res.status(200).send("Fetching data!");
  } catch (error) {}
};
