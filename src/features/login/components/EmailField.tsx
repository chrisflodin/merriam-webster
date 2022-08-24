import { FieldProps } from "../types";
import loginStyles from "../style.module.scss";

const EmailField = ({ register, errors }: FieldProps) => {
  const { errorStyle } = loginStyles;
  return (
    <>
      <input placeholder="john.doe@gmail.com" {...register("email", { required: "Email is required" })}></input>
      {errors?.email && <p className={errorStyle}>{errors.email?.message}</p>}
    </>
  );
};

export default EmailField;
