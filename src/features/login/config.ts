import { UseMutationResult } from "@tanstack/react-query";
import { useCreateUser, useSignIn } from "../../api/auth/userHooks";
import { ServerError } from "../../types/errors";
import { IAuthData, IServerError } from "../../types/responseData";
import { UserDTO } from "../../types/user";
import { signUpSchema } from "./validation";
import * as yup from "yup";
import { AxiosError } from "axios";

export type FormLayoutConfig = {
  title: string;
  textStart: string;
  textEnd: string;
  route: string;
};

export type FormConfig = {
  layoutConfig: FormLayoutConfig;
  formConfig: {
    mutateHook: () => UseMutationResult<IAuthData, AxiosError<IServerError>, UserDTO, IAuthData>;
    formName: string;
    validationSchema: yup.SchemaOf<UserDTO> | null;
  };
};

// export const LoginFormConfig: FormConfig = {
//   mutateHook: useCreateUser,
//   formName: "login",
//   schema: null,
// };

export const SignUpConfig: FormConfig = {
  layoutConfig: {
    title: "Sign up",
    route: "/login",
    textStart: "Already have an account?",
    textEnd: "Login",
  },
  formConfig: {
    mutateHook: useCreateUser,
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
    mutateHook: useSignIn,
    formName: "login",
    validationSchema: signUpSchema,
  },
};
