import express, { NextFunction, Request, Response } from "express";
import { Api404Error } from "../types/errors";
import userRouter from "./user";

const router = express.Router();

router.use("/user", userRouter);
router.use((request: Request, res: Response, next: NextFunction) => {
  next(new Api404Error(true));
});

export default router;
