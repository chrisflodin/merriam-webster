import { UserModel } from "../models/user";
import { saveUser } from "../services/user";
import { promiseHandler } from "./promiseHandler";

export const createMockUser = async (userCredentials: { email: string; password: string }) => {
  const mockUser = new UserModel({
    ...userCredentials,
    tokens: [],
  });

  return await promiseHandler(saveUser(mockUser));
};
