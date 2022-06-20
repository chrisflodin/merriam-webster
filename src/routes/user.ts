import express from "express";
import {  getData } from "../middleware/api/get-data";
import { createUser } from "../middleware/api/user/create-user";
import { loginUser } from "../middleware/api/user/login-user";
import { authorizeResource } from "../middleware/auth/authorize-resource";
import { validateInput } from "../middleware/validation/validate-input";
import { validateSignUp } from "../middleware/validation/validate-sign-up";
import { validateQuery } from "../middleware/validation/validate-query";
import { authenticateLogin } from "../middleware/auth/authenticate-login";

const router = express.Router();

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
