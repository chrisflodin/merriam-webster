import { ObjectId } from "mongoose";
import { Request } from "express";

export interface IUser {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  tokens?: { token: string }[];
  generateAuthToken: () => string;
}

export interface UserRequest extends Request {
  body: IUser;
  query: {
    search: string;
  };
}
