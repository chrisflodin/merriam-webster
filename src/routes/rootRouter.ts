import express from "express";
import { Api404Error } from "../types/errors";
import userRouter from "./user";

const router = express.Router();

router.use("/user", userRouter);
router.use((req, res, next) => {
  next(new Api404Error(true));
});

export default router;
