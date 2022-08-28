import { FieldProps } from "../../types";
import styles from "../../style.module.scss";
import TextInput from "../../../../components/TextInput/TextInput";

const EmailField = ({ register, errors, displayValidation }: FieldProps) => {
  const { errorStyle } = styles;
  const validation = displayValidation ? { required: "Email is required" } : undefined;

  return (
    <>
      <TextInput placeholder="john.doe@gmail.com" {...register("email", validation)} style={{ width: "100%" }} />
      {errors?.email && <p className={errorStyle}>{errors.email?.message}</p>}
    </>
  );
};

export default EmailField;
