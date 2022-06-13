import express from "express";
import { auth } from "../middleware/auth";
import { createUser, getData, loginUser } from "../api/user/user";
import { validatePayload } from "../middleware/validate";

const router = express.Router();

// prettier-ignore
router
  .post("/new", validatePayload, createUser)
  .post("/login", validatePayload, loginUser)
  .get("/fetch-data", auth, getData);

export default router;
