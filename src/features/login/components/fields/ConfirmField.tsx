import { FieldProps } from "../../types";
import styles from "../../style.module.scss";

const ConfirmField = ({ register, errors, displayValidation }: FieldProps) => {
  const { errorStyle } = styles;
  const validation = displayValidation
    ? {
        required: "Password is required",
        minLength: {
          value: 4,
          message: "Minimum length is 4 characters",
        },
      }
    : undefined;

  return (
    <>
      <input placeholder="password" {...register("password", validation)}></input>
      {errors?.password && <p className={errorStyle}>{errors.password?.message}</p>}
    </>
  );
};

export default ConfirmField;
