import mongoose from "mongoose";
import validator from "validator";
import { IUser } from "./../types/user";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/auth-config";
import { JWT_EXPIRATION } from "../config/auth-config";

const userSchema = new mongoose.Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate(val: string) {
      if (!validator.isEmail(val)) {
        throw new Error("email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate: (val: string) => val.length > 8,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = function (): string {
  // To do: Type this
  const user: any = this;
  const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  user.tokens = user.tokens.concat({ token });
  return token;
};

// To do: Type this
userSchema.methods.toJSON = function () {
  const userData = this.toObject();
  delete userData.password;
  delete userData.tokens;
  return userData;
};

export const User = mongoose.model("user", userSchema);
