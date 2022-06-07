import validator from "validator";
import { DefaultFormFields, pswRequirement } from "../config";
import { FormState, InputField, InputType } from "../types";

const SignUpForm: FormState = {
  inputFields: [
    {
      type: InputType.USERNAME,
      label: "Username",
      textType: "text",
      placeholder: "Username",
      validator: (val: string) => {
        return val.length >= 3 && validator.isAlphanumeric(val);
      },
    },
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
    {
      type: InputType.CONFIRM_PASSWORD,
      label: "Confirm password",
      textType: "password",
      placeholder: "Confirm password",
      validator: (val: string, inputArr: InputField[]) =>
        validator.isStrongPassword(val, pswRequirement) &&
        val === inputArr.find((i) => i.type === InputType.PASSWORD)!.value &&
        validator.isAlphanumeric(val),
    },
  ],
  valid: false,
  error: null,
};

SignUpForm.inputFields = SignUpForm.inputFields.map((input) => ({ ...input, ...DefaultFormFields }));

export default SignUpForm;
