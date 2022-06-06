import style from "./Button.module.scss";
import classNames from "classnames";
import { MouseEventHandler } from "react";

const { button, selectedStyle } = style;

interface ButtonProps {
  children?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  classes?: string;
  selected?: boolean;
}

const Button = ({ children, onClick, classes, selected = false, ...rest }: ButtonProps) => {
  const selectedStyling = selected ? selectedStyle : "";

  const cl = classNames(button, classes, selectedStyling);
  return (
    <>
      <button className={cl} onClick={onClick} {...rest}>
        {children}
      </button>
    </>
  );
};

export default Button;
