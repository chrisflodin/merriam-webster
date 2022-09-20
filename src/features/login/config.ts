import { UserDTO } from "../../types/user";
import { signUpSchema } from "./validation";
import * as yup from "yup";
import URLS from "../../api/urls";

export type FormType = "login" | "signup";

export type FormConfig = {
  type: FormType;
  title: string;
  name: string;
  apiUri: string;
  validationSchema: yup.SchemaOf<UserDTO> | null;
};

export const SignUpConfig: FormConfig = {
  type: "signup",
  title: "Sign up",
  name: "signUp",
  apiUri: URLS.SIGN_UP_URL,
  validationSchema: signUpSchema,
};

export const LoginConfig: FormConfig = {
  type: "login",
  title: "Login",
  name: "login",
  apiUri: URLS.SIGN_IN_URL,
  validationSchema: signUpSchema,
};
