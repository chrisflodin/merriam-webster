import { ObjectId } from "mongoose";

export interface IUser {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  tokens: { token: string }[];
  generateAuthToken: () => string;
}
