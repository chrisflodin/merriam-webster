import express from "express";
import { authorizeResource } from "../middleware/auth/authorize-resource";
import { userValidator } from "../middleware/validation/userValidator";
import { checkIfUserExists } from "../middleware/validation/user-exists";
import { validateQueryString } from "../middleware/validation/validateQueryString";
import { authenticateLogin } from "../middleware/auth/authenticate-login";
import { createUser, removeAllUsers, loginUser } from "../controllers/user";
import { getData } from "../controllers/merriam-webster";

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

router.delete('/deleteAll', removeAllUsers)

export default router;
