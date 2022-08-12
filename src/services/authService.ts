import { UserModel } from "../models/user";
import { getUserByEmail, saveUser, verifyJWT } from "./user";
import { Credentials, MongooseUser } from "../types/user";
import { Api400Error, Api401Error } from "../types/errors";
import bcrypt from "bcrypt";

export const authorizeUser = async (token: string): Promise<MongooseUser | null> => {
  const verified = verifyJWT(token);
  if (!verified) throw new Api401Error();

  const user = await UserModel.findOne({ _id: verified._id, "tokens.token": token }).exec();
  if (!user) throw new Api401Error();

  return user;
};

export const verifyUserCredentials = async (credentials: Credentials): Promise<MongooseUser> => {
  const { email, password } = credentials;
  const user = await getUserByEmail(email);
  if (!user) throw new Api400Error("Invalid username or password");

  const pswdMatches = await bcrypt.compare(password, user.password);
  if (!pswdMatches) throw new Api400Error("Invalid username or password");

  return user;
};

export const signIn = async (user: MongooseUser): Promise<{ savedUser: MongooseUser; token: string }> => {
  const token = user.generateAuthToken();
  const savedUser = await saveUser(user);
  return { savedUser, token };
};
