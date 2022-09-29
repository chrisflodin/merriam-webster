import { UserDTO } from "../../types/user";
import { signUpSchema } from "./validation";
import * as yup from "yup";

export type FormType = "login" | "signup";

export type FormConfig = {
  formType: FormType;
  title: string;
  name: string;
  validationSchema: yup.SchemaOf<UserDTO> | null;
};

export const SignUpConfig: FormConfig = {
  formType: "signup",
  title: "Sign up",
  name: "signUp",
  validationSchema: signUpSchema,
};

export const LoginConfig: FormConfig = {
  formType: "login",
  title: "Login",
  name: "login",
  validationSchema: signUpSchema,
};
