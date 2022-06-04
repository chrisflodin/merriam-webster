import express from "express";
import { auth } from "../middleware/auth";
import { createUser, getData, loginUser } from "../api/user/user";

const router = express.Router();

// prettier-ignore
router.post("/new", createUser)
    .post("/login", loginUser)
    .get("/fetch-data", auth, getData);

export default router;
