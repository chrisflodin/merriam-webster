import { UserModel } from "../models/user";
import { promiseHandler } from "../utils/promiseHandler";
import { getUserByEmail, verifyJWT } from "./user";
import { Api400Error, Api500Error } from "../types/errors";
import bcrypt from "bcrypt";
import { Credentials, MongooseUser } from "../types/user";

export const authorizeUser = async (token: string) => {
  const [verifyErr, verifiedJWT] = verifyJWT(token);
  if (!verifiedJWT) return [verifyErr, null];

  const [err] = await promiseHandler(UserModel.findOne({ _id: verifiedJWT._id, "tokens.token": token }).exec());
  if (err) return [err, null];

  return [null, verifiedJWT];
};

export const verifyUserCredentials = async (credentials: Credentials) => {
  const { email, password } = credentials;
  const [err, user] = await getUserByEmail(email);
  if (err) return [err, null];

  const pswdMatches = await bcrypt.compare(password, user.password);
  if (!pswdMatches) return [new Api400Error(true, "Invalid username or password"), null];

  return [null, user];
};

export const signIn = async (user: MongooseUser) => {
  const token = user.generateAuthToken!();

  const [err, savedUser] = await promiseHandler(user.save());
  if (err) return [new Api500Error(false, err.message), null] as const;

  return [null, { savedUser, token }] as const;
};
