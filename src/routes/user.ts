import express from "express";
import { createUser, getData, loginUser } from "../api/user/user";
import { authorizeResource } from "../middleware/auth/authorize-resource";
import { validateInput } from "../middleware/validation/validate-input";
import { validateSignUp } from "../middleware/validation/validate-sign-up";
import { validateQuery } from "../middleware/validation/validate-query";
import { authenticateLogin } from "../middleware/auth/authenticate-login";

const router = express.Router();

//prettier-ignore
router.post("/new", 
        validateInput, 
        validateSignUp, 
        createUser)

router.post("/login", 
        validateInput, 
        authenticateLogin, 
        loginUser);

router.get("/fetch-data", 
        validateQuery,
        authorizeResource, 
        getData);

export default router;
