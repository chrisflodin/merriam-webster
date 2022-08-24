import { UseFormRegister } from "react-hook-form";
import { UserDTO } from "../../../types/user";
import { Field, FormErrors } from "../types";

type FormFieldsProps = {
  fields: Field[];
  errors: FormErrors;
  register: UseFormRegister<UserDTO>;
  displayValidation: boolean;
};

export const FormFields = ({ fields, errors, register, displayValidation }: FormFieldsProps) => {
  const formFields = fields.map((field: Field, i) => {
    const { component: Component } = field;
    return <Component key={i} errors={errors} register={register} displayValidation={displayValidation}></Component>;
  });
  return <>{formFields}</>;
};
