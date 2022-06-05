import style from "./Button.module.scss";
import classNames from "classnames";
import { MouseEventHandler } from "react";

const { button } = style;

interface ButtonProps {
  children?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const Button = ({ children, onClick, className, ...rest }: ButtonProps) => {
  const classes = classNames(button, className);
  return (
    <>
      <button className={classes} onClick={onClick} {...rest}>
        {children}
      </button>
    </>
  );
};

export default Button;
