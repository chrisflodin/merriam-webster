import express from "express";
import { auth } from "../middleware/auth/auth";
import { createUser, getData, loginUser } from "../api/user/user";
import { validateInput } from "../middleware/validation/validate-input";
import { authLogin } from "../middleware/auth/auth-login";
import { validateSignUp } from "../middleware/validation/validate-sign-up";

const router = express.Router();

//prettier-ignore
router.post("/new", 
        validateInput, 
        validateSignUp, 
        createUser)

router.post("/login", 
        validateInput, 
        authLogin, 
        loginUser);

router.get("/fetch-data", 
        auth, 
        getData);

export default router;
