import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../../config/auth-config";
import { User } from "../../models/user";
import { IUser } from "../../types/user";

interface AuthResponse extends Response {
  user?: IUser;
}

export const auth = async (req: Request, res: AuthResponse, next: NextFunction) => {
  try {
    if (!req.header) throw new Error();

    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (typeof token !== "string") throw new Error();

    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    const user = await User.findOne({ _id: decoded._id, "tokens.token": token });

    if (!user) throw new Error();
  } catch (error: any) {
    res.status(401).send({ error: "Please authenticate" });
    return;
  }
  next();
};
