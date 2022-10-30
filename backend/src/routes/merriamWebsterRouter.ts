import express from "express";
import { authorizeResource } from "../middleware/auth/authorize-resource";
import { validateQueryString } from "../middleware/validation/validateQueryString";
import { getData } from "../controllers/merriam-webster";

const router = express.Router();

router.get("/", validateQueryString, authorizeResource, getData);

export default router;
