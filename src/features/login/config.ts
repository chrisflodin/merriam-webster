import { ComponentType } from "react";
import { FieldErrors, useForm, UseFormRegister, UseFormReturn } from "react-hook-form";
import { UserDTO } from "../../types/user";
import EmailField from "./components/EmailField";
import PasswordField from "./components/PasswordField";

type InputProps = {
  register: UseFormRegister<UserDTO>;
  errors: FieldErrors;
};

type InputConfig = {
  component: ComponentType<InputProps>;
};

type FormConfig = {
  form: UseFormReturn<UserDTO>;
  inputs: InputConfig[];
};

export const SignUpConfig: FormConfig = {
  form: useForm<UserDTO>(),
  inputs: [{ component: EmailField }, { component: PasswordField }],
};

export const pswRequirement = {
  minLength: 4,
  minLowercase: 1,
  minUppercase: 0,
  minNumbers: 0,
  minSymbols: 0,
};
