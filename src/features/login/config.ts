import { useCreateUser, useSignIn } from "../../api/auth/userHooks";
import { routing } from "../../config/routing";
import EmailField from "./components/EmailField";
import PasswordField from "./components/PasswordField";
import { FieldType, FormConfig } from "./types";
import { signUpSchema } from "./validation";

export const SignUpConfig: FormConfig = {
  fields: [
    { component: EmailField, type: FieldType.Email },
    { component: PasswordField, type: FieldType.Password },
    { component: PasswordField, type: FieldType.Password },
  ],
  displayValidation: true,
  useFormMutation: useCreateUser,
  layout: {
    link: {
      textStart: "Already have an account?",
      textEnd: "Login",
    },
    formName: "Sign up",
    url: routing.SIGN_IN,
  },
  validationSchema: signUpSchema,
};

export const SignInConfig: FormConfig = {
  fields: [
    { component: EmailField, type: FieldType.Email },
    { component: PasswordField, type: FieldType.Password },
  ],
  displayValidation: false,
  useFormMutation: useSignIn,
  layout: {
    link: {
      textStart: "Don't have an account?",
      textEnd: "Sign Up",
    },
    formName: "Login",
    url: routing.SIGN_UP,
  },
  validationSchema: signUpSchema,
};
