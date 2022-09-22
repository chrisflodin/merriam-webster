import { UserDTO } from "../../types/user";
import { signUpSchema } from "./validation";
import * as yup from "yup";

export type FormType = "login" | "signup";

export type FormConfig = {
  type: FormType;
  title: string;
  name: string;
  validationSchema: yup.SchemaOf<UserDTO> | null;
};

export const SignUpConfig: FormConfig = {
  type: "signup",
  title: "Sign up",
  name: "signUp",
  validationSchema: signUpSchema,
};

export const LoginConfig: FormConfig = {
  type: "login",
  title: "Login",
  name: "login",
  validationSchema: signUpSchema,
};
