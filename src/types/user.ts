import { ObjectId } from "mongoose";

export interface IUser {
  _id: ObjectId;
  username: string;
  lastName: string;
  email: string;
  password: string;
  tokens?: { token: string }[];
  generateAuthToken: () => string;
}
