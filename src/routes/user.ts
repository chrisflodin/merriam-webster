import express, { Response } from "express";
import IUser from "../types/user";
import { createUser } from "../api/user";

type UserRequest = {
  body: IUser;
};

const router = express.Router();

router.post("/", ({ body }: UserRequest, res: Response) => {
  createUser(body)
    .then((result) => res.status(200).send(result))
    .catch((error: Error) => res.status(500).send({ error }));
});

export default router;
