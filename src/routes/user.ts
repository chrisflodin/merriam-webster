import express from "express";
import { authResource } from "../middleware/auth/auth-resource";
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
        authResource, 
        getData);

export default router;
