import { IUser } from "../types/user";
import { JWT_EXPIRATION, JWT_SECRET } from "../consts";
import jwt from "jsonwebtoken";
import { hashText } from "../utils/bcrypt";
import validator from "validator";
import mongoose, { Model } from "mongoose";

export const userSchema = new mongoose.Schema<IUser>({
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
  if (this.isNew) this.password = await hashText(this.password);
  return;
});

userSchema.methods.generateAuthToken = function (): string {
  // To-do: Type this
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

  user.tokens = user.tokens.concat({ token });
  return token;
};

export const UserModel: Model<IUser> = mongoose.model("user", userSchema);
