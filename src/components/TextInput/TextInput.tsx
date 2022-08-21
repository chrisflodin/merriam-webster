import { SyntheticEvent } from "react";
import { InputField } from "../../features/login/types";
import inputStyles from "./TextInput.module.scss";

const { container } = inputStyles;

interface TextInputProps extends InputField {
  handleInputChange: (event: SyntheticEvent) => void;
}

const TextInput = ({ label, placeholder, type, textType, value }: TextInputProps) => {
  return (
    <>
      <div className={container}>
        <label>{label}</label>
        <input value={value} id={type} type={textType} placeholder={placeholder} />
      </div>
    </>
  );
};

export default TextInput;
