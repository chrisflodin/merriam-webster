import { UseMutationResult } from "@tanstack/react-query";
import { ComponentType } from "react";
import { FieldErrors, FieldErrorsImpl, UseFormRegister } from "react-hook-form";
import { ServerError } from "../../types/errors";
import { IAuthData } from "../../types/responseData";
import { UserDTO } from "../../types/user";
import * as yup from "yup";
import { SignUpSchema } from "./validation";

export type FieldProps = {
  register: UseFormRegister<UserDTO>;
  errors: FieldErrors<UserDTO>;
  displayValidation: boolean;
};

export type FormErrors = FieldErrorsImpl<{
  email: string;
  password: string;
}>;

export enum FieldType {
  Email,
  Password,
  Confirm,
}

export type Field = {
  type: FieldType;
  component: ComponentType<FieldProps>;
};

export type UserMutationHook = UseMutationResult<IAuthData, ServerError, UserDTO, IAuthData>;

export type FormConfig = {
  fields: Field[];
  displayValidation: boolean;
  useFormMutation: () => UserMutationHook;
  layout: {
    formName: string;
    link: {
      textStart: string;
      textEnd: string;
    };
    url: string;
  };
  validationSchema: SignUpSchema;
};
