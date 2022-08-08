import { UserModel } from "../models/user";
import { getUserByEmail, saveUser, verifyJWT } from "./user";
import bcrypt from "bcrypt";
import { Credentials, MongooseUser } from "../types/user";

export const authorizeUser = async (token: string): Promise<MongooseUser | null> => {
  const verified = verifyJWT(token);
  if (!verified) return null;
  return await UserModel.findOne({ _id: verified._id, "tokens.token": token }).exec();
};

export const verifyUserCredentials = async (credentials: Credentials) => {
  const { email, password } = credentials;
  const user = await getUserByEmail(email);
  if (!user) return null;

  const pswdMatches = await bcrypt.compare(password, user.password);
  if (!pswdMatches) return null;

  return user;
};

export const signIn = async (user: MongooseUser) => {
  const token = user.generateAuthToken!();
  const savedUser = (await saveUser(user)) as MongooseUser;
  return { savedUser, token };
};
