import { JWT_SECRET } from "../consts";
import { UserModel } from "../models/user";
import { Credentials, MongooseUser } from "../types/user";
import jwt from "jsonwebtoken";

export const getUserByEmail = (email: string): Promise<MongooseUser | null> => {
  return UserModel.findOne({ email }).exec();
};

export const getUserById = (id: string): Promise<MongooseUser | null> => {
  return UserModel.findOne({ id }).exec();
};

export const saveUser = async (user: MongooseUser): Promise<MongooseUser> => {
  return user.save();
};

export const createUser = async (credentials: Credentials) => {
  const newUser = new UserModel({ ...credentials, tokens: [] });

  const token = newUser.generateAuthToken();

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

export const deleteAllUsers = () => {
  return UserModel.deleteMany();
};
