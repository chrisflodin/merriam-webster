import express, { Response } from "express";
import { createUser, loginUser } from "../api/user";

const router = express.Router();

// prettier-ignore
router.post("/new", createUser)
    .get("/login", loginUser);

export default router;
