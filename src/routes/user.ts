import express from "express";
import { auth } from "../middleware/auth";
import { createUser, getData, loginUser } from "../api/user/user";
import { validateInput } from "../middleware/validation/validate-input";
import { validateLogin } from "../middleware/validation/validate-login";
import { validateSignUp } from "../middleware/validation/validate-sign-up";

const router = express.Router();

//prettier-ignore
router.post("/new", 
        validateInput, 
        validateSignUp, 
        createUser)

router.post("/login", 
        validateInput, 
        validateLogin, 
        loginUser);

router.get("/fetch-data", 
        auth, 
        getData);

export default router;
