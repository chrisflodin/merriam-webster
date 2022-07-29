import express from "express";
import { userValidator } from "../middleware/validation/userValidator";
import { createUserValidation } from "../middleware/validation/user-exists";
import { authenticateLogin } from "../middleware/auth/authenticate-login";
import { createUser, removeAllUsers, loginUser } from "../controllers/user";

const router = express.Router();

router.post("/new", 
        userValidator,
        createUserValidation,
        createUser
        );

router.post("/login", 
        userValidator, 
        authenticateLogin, 
        loginUser
        );

router.delete('/deleteAll', removeAllUsers)

export default router;
