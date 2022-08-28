import { SyntheticEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import inputStyles from "./TextInput.module.scss";

const { container, errorStyle } = inputStyles;

interface TextInputProps {
  handleInputChange?: (event: SyntheticEvent) => void;
  label?: string;
  placeholder?: string;
  type?: string;
  textType?: string;
  value?: any;
  style?: React.CSSProperties;
  errorMsg?: string | undefined;
  register?: UseFormRegisterReturn;
  //   validation?: RegisterOptions | undefined;
}

const TextInput = ({
  label,
  placeholder,
  type,
  textType,
  value,
  style,
  errorMsg,
  register,
  ...rest
}: TextInputProps) => {
  return (
    <>
      <div className={container}>
        {label && <label>{label}</label>}
        <input {...register} value={value} id={type} type={textType} placeholder={placeholder} {...rest} />
        {errorMsg && <p className={errorStyle}>{errorMsg}</p>}
      </div>
    </>
  );
};

export default TextInput;
