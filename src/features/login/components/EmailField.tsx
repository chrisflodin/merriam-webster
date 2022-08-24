import { FieldProps } from "../types";
import loginStyles from "../style.module.scss";

const EmailField = ({ register, errors, displayValidation }: FieldProps) => {
  const { errorStyle } = loginStyles;
  const validation = displayValidation ? { required: "Email is required" } : undefined;

  return (
    <>
      <input placeholder="john.doe@gmail.com" {...register("email", validation)}></input>
      {errors?.email && <p className={errorStyle}>{errors.email?.message}</p>}
    </>
  );
};

export default EmailField;
