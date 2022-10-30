import { ObjectId } from "mongodb";
import { MongooseUser, UserDTO } from "../types/user";

export interface UserResponse {
  _id: string;
  email: string;
}

export const hideUserData = (user: MongooseUser): { email: string; _id: string | ObjectId } => {
  const { email, _id } = user;
  return {
    email,
    _id,
  };
};
