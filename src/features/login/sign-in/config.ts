import validator from "validator";
import { DefaultFormFields, pswRequirement } from "../config";
import { FormState, InputType } from "../types";

const SignInForm: FormState = {
  inputFields: [
    {
      type: InputType.EMAIL,
      label: "Enter email",
      textType: "text",
      placeholder: "john@company.com",
      validator: (val: string) => validator.isEmail(val),
    },
    {
      type: InputType.PASSWORD,
      label: "Password",
      textType: "password",
      placeholder: "Password (min. 4 charaters)",
      validator: (val: string) => validator.isStrongPassword(val, pswRequirement) && validator.isAlphanumeric(val),
    },
  ],
  error: null,
  valid: false,
};

SignInForm.inputFields = SignInForm.inputFields.map((input) => ({ ...input, ...DefaultFormFields }));

export default SignInForm;
