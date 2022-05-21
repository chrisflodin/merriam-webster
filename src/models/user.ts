import mongoose from "mongoose";
import validator from "validator";
import IUser from "./../types/user";

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
});

export const User = mongoose.model("user", userSchema);
