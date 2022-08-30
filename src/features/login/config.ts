import { UserDTO } from "../../types/user";
import { signUpSchema } from "./validation";
import * as yup from "yup";
import URLS from "../../api/urls";

export type FormLayoutConfig = {
  title: string;
  textStart: string;
  textEnd: string;
  route: string;
};

export type FormConfig = {
  layoutConfig: FormLayoutConfig;
  formConfig: {
    apiUri: string;
    formName: string;
    validationSchema: yup.SchemaOf<UserDTO> | null;
  };
};

export const SignUpConfig: FormConfig = {
  layoutConfig: {
    title: "Sign up",
    route: "/login",
    textStart: "Already have an account?",
    textEnd: "Login",
  },
  formConfig: {
    apiUri: URLS.SIGN_UP_URL,
    formName: "signUp",
    validationSchema: signUpSchema,
  },
};

export const LoginConfig: FormConfig = {
  layoutConfig: {
    title: "Login",
    route: "/sign-up",
    textStart: "Don't have an account?",
    textEnd: "Sign-up",
  },
  formConfig: {
    apiUri: URLS.SIGN_IN_URL,
    formName: "login",
    validationSchema: signUpSchema,
  },
};
