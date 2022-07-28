import { UserModel } from "../models/user";
import { Api401Error } from "../types/errors";
import { promiseHandler } from "../utils/promise-handler";
import { verifyJWT } from "./user";

export const authorizeUser = async (token: string) => {
  const [verifyErr, verifiedJWT] = verifyJWT(token);
  if (!verifiedJWT) return [verifyErr, null];

  const [err] = await promiseHandler(UserModel.findOne({ _id: verifiedJWT._id, "tokens.token": token }).exec());
  if (err) return [err, null];

  return [null, verifiedJWT];
};
