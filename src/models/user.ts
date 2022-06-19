import { IUser } from "./../types/user";
import { JWT_SECRET } from "../config/auth-config";
import { JWT_EXPIRATION } from "../config/auth-config";
import { hashText } from "../utils/bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema<IUser>({
  email: {
    unique: true,
    type: String,
    required: true,
    trim: true,
    validate: (val: string) => validator.isEmail(val),
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: (val: string) => val.length >= 4,
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

userSchema.pre("save", async function () {
  this.password = await hashText(this.password);
  return;
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
