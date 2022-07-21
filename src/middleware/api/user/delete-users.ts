import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../../../models/user";
import { Api500Error } from "../../../types/errors";

export const deleteAllUsers: RequestHandler = async (request, response, next) => {
  const deletedUsers = await User.deleteMany();
  if (!deletedUsers.acknowledged) return next(new Api500Error());
  response.status(StatusCodes.OK).send(`${deletedUsers.deletedCount} users were deleted`);
};
