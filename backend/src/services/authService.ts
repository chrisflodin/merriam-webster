import { UserModel } from "../models/user";
import { AuthSuccessResponse } from "../types/response";
import { getUserByEmail, saveUser, verifyJWT } from "./userService";
import { Credentials, MongooseUser } from "../types/user";
import { Api400Error, Api401Error } from "../types/errors";
const bcrypt = require("bcryptjs");

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

export const signIn = async (u: MongooseUser): Promise<AuthSuccessResponse> => {
  const token = u.generateAuthToken();
  const user = await saveUser(u);
  return { user, token };
};
