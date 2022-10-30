import { RequestHandler } from "express";
import * as authService from "../../services/authService";

export const authorizeResource: RequestHandler = async (req, _, next) => {
  const authStr = req.get("Authorization") || "";

  const token = authStr.replace("Bearer ", "");
  await authService.authorizeUser(token);

  next();
};
