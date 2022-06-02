import validator from "validator";
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
  valid: false,
};

const DefaultFormFields = {
  touched: false,
  valid: false,
  value: "",
};

const pswRequirement = {
  minLength: 4,
  minLowercase: 1,
  minUppercase: 0,
  minNumbers: 0,
  minSymbols: 0,
};

SignInForm.inputFields = SignInForm.inputFields.map((input) => ({ ...input, ...DefaultFormFields }));

export default SignInForm;
