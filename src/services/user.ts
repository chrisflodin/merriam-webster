import { JWT_SECRET } from "../consts";
import { UserModel } from "../models/user";
import { Api400Error } from "../types/errors";
import { MongooseUser } from "../types/user";
import { promiseHandler } from "../utils/promise-handler";
import { tryCatchWrapper } from "../utils/try-catch-wrapper";
import jwt from "jsonwebtoken";

type JWTVerifyResult = [unknown, null] | [null, jwt.JwtPayload];

export const getUserByEmail = async (email: string) => {
  const [err, data] = await promiseHandler(UserModel.findOne({ email }).exec());
  if (err) return [err, null] as const;
  if (!data) return [new Api400Error(true, "User not found in database"), null] as const;

  return [err, data] as const;
};

export const getUserById = async (id: string) => {
  const [err, data] = await promiseHandler(UserModel.findOne({ id }).exec());
  if (err) return [err, null] as const;
  if (!data) return [new Api400Error(true, "User not found in database"), null] as const;

  return [err, data] as const;
};

export const saveUser = async (user: MongooseUser) => {
  return await user.save();
};

export const verifyJWT = (token: string) => {
  return tryCatchWrapper(jwt.verify, token, JWT_SECRET) as JWTVerifyResult;
};

export const deleteAllUsers = async () => {
  return await UserModel.deleteMany();
};
