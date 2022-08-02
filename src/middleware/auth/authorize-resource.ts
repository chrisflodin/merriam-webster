import { NextFunction, Request, Response } from "express";
import { IUser } from "../../types/user";
import { Api401Error } from "../../types/errors";
import * as authService from "../../services/authService";

interface AuthResponse extends Response {
  user?: IUser;
}

export const authorizeResource = async (req: Request, res: AuthResponse, next: NextFunction) => {
  const authStr = req.get("Authorization") || "";

  const token = authStr.replace("Bearer ", "");
  const [err, decoded] = await authService.authorizeUser(token);
  if (err) return next(new Api401Error(true));

  next();
};
