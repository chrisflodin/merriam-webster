import mongoose from "mongoose";
import { UserModel } from "../models/user";
import { Api400Error } from "../types/errors";
import { IUser, MongooseUser } from "../types/user";
import { promiseHandler } from "../utils/promise-handler";

export const getUserByEmail = async (email: string) => {
  const [err, data] = await promiseHandler(UserModel.findOne({ email }).exec());
  if (err) return [err, null] as const;
  if (!data) return [new Api400Error(true, "User not found in database"), null] as const;

  return [err, data] as const;
};

export const saveUser = async (user: MongooseUser) => {
  return await user.save();
};

export const deleteAllUsers = async () => {
  return await UserModel.deleteMany();
};
