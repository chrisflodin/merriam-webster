import mongoose from "mongoose";
import { Request } from "express";

export interface IUser {
  _id: string | mongoose.Types.ObjectId;
  email: string;
  password: string;
  tokens: { token: string }[];
  generateAuthToken: () => string;
}

export type UserDTO = Pick<IUser, "email" | "password">;

export type Credentials = {
  email: string;
  password: string;
};

export type MongooseUser = mongoose.Document<any, IUser> & IUser;

export interface UserRequest extends Request {
  body: IUser;
  query: {
    search: string;
  };
}
