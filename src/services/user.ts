import { JWT_SECRET } from "../consts";
import { UserModel } from "../models/user";
import { Credentials, MongooseUser } from "../types/user";
import jwt from "jsonwebtoken";

export const getUserByEmail = async (email: string): Promise<MongooseUser | null> => {
  return UserModel.findOne({ email }).exec();
};

export const getUserById = async (id: string): Promise<MongooseUser | null> => {
  return UserModel.findOne({ id }).exec();
};

export const saveUser = (user: MongooseUser): any => {
  try {
    return user.save();
  } catch (e: any) {
    if (e instanceof Error) throw e;
  }
};

export const createUser = async (credentials: Credentials) => {
  const newUser = new UserModel({ ...credentials, tokens: [] });

  const token = newUser.generateAuthToken!();

  const savedUser = await saveUser(newUser);

  return { savedUser, token };
};

export const verifyJWT = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
  } catch (e) {
    return null;
  }
};

export const deleteAllUsers = async () => {
  return UserModel.deleteMany();
};
