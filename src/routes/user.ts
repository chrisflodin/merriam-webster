import express from "express";
import { getData } from "../middleware/api/get-data";
import { createUser } from "../middleware/api/user/create-user";
import { loginUser } from "../middleware/api/user/login-user";
import { authorizeResource } from "../middleware/auth/authorize-resource";
import { userValidator } from "../middleware/validation/validate-email-password";
import { checkIfUserExists } from "../middleware/validation/user-exists";
import { validateQueryString } from "../middleware/validation/validate-query-string";
import { authenticateLogin } from "../middleware/auth/authenticate-login";
import { deleteAllUsers } from "../middleware/api/user/delete-users";

const router = express.Router();

router.post("/new", 
        userValidator,
        checkIfUserExists, 
        createUser
        );

router.post("/login", 
        userValidator, 
        authenticateLogin, 
        loginUser
        );

router.get("/fetch-data", 
        validateQueryString,
        authorizeResource, 
        getData
        );

router.delete('/deleteAll', deleteAllUsers)

export default router;
