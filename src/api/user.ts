import { User } from "../models/user";
import IUser from "../types/user";

export const createUser = (userData: IUser) => {
  const newUser = new User(userData);
  return newUser.save();
};
