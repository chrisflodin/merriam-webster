import { SyntheticEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import inputStyles from "./TextInput.module.scss";

const { container, errorStyle } = inputStyles;

interface TextInputProps {
  handleInputChange?: (event: SyntheticEvent) => void;
  label?: string;
  placeholder?: string;
  id?: string;
  type?: string;
  value?: any;
  style?: React.CSSProperties;
  errorMsg?: string | undefined;
  register?: UseFormRegisterReturn;
}

const TextInput = ({ label, placeholder, type, id, value, style, errorMsg, register, ...rest }: TextInputProps) => {
  return (
    <>
      <div className={container}>
        {label && <label>{label}</label>}
        <input value={value} id={id} type={type} placeholder={placeholder} {...register} {...rest} />
        {errorMsg && <p className={errorStyle}>{errorMsg}</p>}
      </div>
    </>
  );
};

export default TextInput;
