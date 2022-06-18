import mongoose, { ObjectId } from "mongoose";
import { Request } from "express";

export interface IUser {
  email: string;
  password: string;
  tokens?: { token: string }[];
  generateAuthToken: () => string;
}

export type MongooseUser = mongoose.Document<any, IUser> & IUser;

export interface UserRequest extends Request {
  body: IUser;
  query: {
    search: string;
  };
}
