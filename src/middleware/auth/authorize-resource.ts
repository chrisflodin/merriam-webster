import { RequestHandler } from "express";
import { Api401Error } from "../../types/errors";
import * as authService from "../../services/authService";

export const authorizeResource: RequestHandler = async (req, _, next) => {
  const authStr = req.get("Authorization") || "";

  const token = authStr.replace("Bearer ", "");
  const user = await authService.authorizeUser(token);
  if (!user) throw new Api401Error();

  next();
};
