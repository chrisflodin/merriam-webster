import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../../config/auth-config";
import { User } from "../../models/user";
import { IUser } from "../../types/user";
import { ERROR } from "../../types/errors";
import { promiseHandler } from "../../utils/promise-handler";
import { tryCatchWrapper } from "../../utils/try-catch-wrapper";

interface AuthResponse extends Response {
  user?: IUser;
}

type JWTVerifyResult = [any, null] | [null, jwt.JwtPayload];

export const authResource = async (req: Request, res: AuthResponse, next: NextFunction) => {
  const authStr = req.get("Authorization");
  if (!authStr) return next(ERROR.UNAUTHORIZED());

  const token = authStr.replace("Bearer ", "");
  const [verifyErr, decoded] = tryCatchWrapper(jwt.verify, token, JWT_SECRET) as JWTVerifyResult;
  if (!decoded) return next(verifyErr);

  const [err] = await promiseHandler(User.findOne({ _id: decoded._id, "tokens.token": token }).exec());
  if (err) return next(ERROR.UNAUTHORIZED());

  next();
};
