import { User } from "../models/user";
import bcrypt from "bcrypt";
import IUser from "../types/user";

export const createUser = async (userData: IUser) => {
  const userExists = (await User.count({ email: userData.email })) > 0;

  if (userExists) {
    return new Promise((resolve, reject) => reject("User already exists"));
  }

  const hashedPsw = await bcrypt.hash(userData.password, 8);
  const newUser = new User({ ...userData, password: hashedPsw });
  return newUser.save();
};
