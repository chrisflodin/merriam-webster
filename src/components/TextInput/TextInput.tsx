import { SyntheticEvent } from "react";
import { InputField } from "../../features/login/types";
import inputStyles from "./TextInput.module.scss";

const { isValid, isInvalid } = inputStyles;

interface TextInputProps extends InputField {
  handleInputChange: (event: SyntheticEvent) => void;
}

function TextInput({
  showsValidation = true,
  label,
  placeholder,
  type,
  textType,
  touched,
  valid,
  value,
  handleInputChange,
}: TextInputProps) {
  let validationStyles;
  if (showsValidation) validationStyles = valid ? isValid : touched ? isInvalid : "";

  return (
    <>
      <label>{label}</label>
      <input
        className={validationStyles}
        value={value}
        onChange={handleInputChange}
        id={type}
        type={textType}
        placeholder={placeholder}
      />
    </>
  );
}

export default TextInput;
