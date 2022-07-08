import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../../../models/user";
import { Api500Error } from "../../../types/errors";

export const deleteAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const deletedUsers = await User.deleteMany();
  if (!deletedUsers.acknowledged) return next(new Api500Error());
  res.status(StatusCodes.OK).send(`${deletedUsers.deletedCount} users were deleted`);
};
