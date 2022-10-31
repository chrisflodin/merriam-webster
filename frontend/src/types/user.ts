import { ObjectId } from "mongoose";

export interface IUser {
  _id?: ObjectId;
  email: string;
  password: string;
  tokens?: { token: string }[];
}

export type UserDTO = Pick<IUser, "email" | "password">;
