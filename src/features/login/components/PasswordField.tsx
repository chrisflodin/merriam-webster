import { FieldProps } from "../types";
import loginStyles from "../style.module.scss";

const PasswordField = ({ register, errors }: FieldProps) => {
  const { errorStyle } = loginStyles;
  return (
    <>
      <input
        placeholder="password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 4,
            message: "Minimum length is 4 characters",
          },
        })}
      ></input>
      {errors?.password && <p className={errorStyle}>{errors.password?.message}</p>}
    </>
  );
};

export default PasswordField;
