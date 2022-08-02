import express from "express";
import { userValidator } from "../middleware/validation/userValidator";
import { createUserValidation } from "../middleware/validation/user-exists";
import { createNewUser, removeAllUsers, loginUser } from "../controllers/user";

const router = express.Router();

router.post("/new", 
        userValidator,
        createUserValidation,
        createNewUser
        );

router.post("/login", 
        userValidator, 
        loginUser
        );

router.delete('/deleteAll', removeAllUsers)

export default router;
