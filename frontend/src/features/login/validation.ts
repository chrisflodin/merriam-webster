import * as yup from "yup";
import { UserDTO } from "../../types/user";

export type SignUpSchema = yup.SchemaOf<UserDTO>;

export const signUpSchema: SignUpSchema = yup.object().shape({
  email: yup.string().required("email is required").email("this does not look like an email"),
  password: yup.string().required("password is required").min(4),
});
