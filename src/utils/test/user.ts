import { UserModel } from "../../models/user";

export const logDBUsers = async () => {
  const users = await UserModel.find({});
  console.log("users");
  console.log(users);
};
