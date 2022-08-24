import { FieldErrors, UseFormRegister } from "react-hook-form";
import { UserDTO } from "../../types/user";

export type FieldProps = {
  register: UseFormRegister<UserDTO>;
  errors: FieldErrors<UserDTO>;
};
