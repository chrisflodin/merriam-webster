import style from "./Button.module.scss";
import classNames from "classnames";
import { MouseEventHandler } from "react";

const { flat, outlined, selectedStyle } = style;

interface ButtonProps {
  children?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  classes?: string;
  selected?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  variant?: "flat" | "outlined";
}

const Button = ({
  children,
  onClick,
  classes = "",
  selected = false,
  type = "button",
  variant = "flat",
  ...rest
}: ButtonProps) => {
  const variantStyle = variant === "outlined" ? outlined : flat;
  const styles = classNames({
    [selectedStyle]: selected,
    [classes]: classes,
    [variantStyle]: variantStyle,
  });

  return (
    <>
      <button type={type} className={styles} onClick={onClick} {...rest}>
        {children}
      </button>
    </>
  );
};

export default Button;
