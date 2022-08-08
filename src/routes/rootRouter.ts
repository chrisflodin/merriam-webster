import express from "express";
import { Api404Error } from "../types/errors";
import userRouter from "./userRouter";
import merriamWebsterRouter from "./merriamWebsterRouter";

const router = express.Router();

router.use("/user", userRouter);
router.use("/fetch-data", merriamWebsterRouter);
router.use((req, res, next) => {
  throw new Api404Error();
});

export default router;
