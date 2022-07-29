import { MongooseUser } from "../types/user";

export const hideUserData = (user: MongooseUser) => {
  const { email, _id } = user;
  return {
    email,
    _id,
  };
};
