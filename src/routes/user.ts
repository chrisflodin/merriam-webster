import express from "express";
import { getData } from "../middleware/api/get-data";
import { createUser } from "../middleware/api/user/create-user";
import { loginUser } from "../middleware/api/user/login-user";
import { authorizeResource } from "../middleware/auth/authorize-resource";
import { validateEmailPassword } from "../middleware/validation/validate-email-password";
import { checkIfUserExists } from "../middleware/validation/user-exists";
import { validateQueryString } from "../middleware/validation/validate-query-string";
import { authenticateLogin } from "../middleware/auth/authenticate-login";

const router = express.Router();

router.post("/new", 
        validateEmailPassword,
        checkIfUserExists, 
        createUser
        );

router.post("/login", 
        validateEmailPassword, 
        authenticateLogin, 
        loginUser
        );

router.get("/fetch-data", 
        validateQueryString,
        authorizeResource, 
        getData
        );

export default router;
