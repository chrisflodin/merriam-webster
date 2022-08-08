import { UserModel } from "../models/user";
import { saveUser } from "../services/user";

export const createMockUser = async (userCredentials: { email: string; password: string }) => {
  const mockUser = new UserModel({
    ...userCredentials,
    tokens: [],
  });

  return await saveUser(mockUser);
};
