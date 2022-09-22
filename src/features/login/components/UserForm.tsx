import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../api/auth/useAuth";
import Button from "../../../components/Button/Button";
import TextInput from "../../../components/TextInput/TextInput";
import { UserDTO } from "../../../types/user";
import { FormConfig } from "../config";
import { signUpSchema } from "../validation";
import { FormError } from "./FormError";
import { SwitchPrompt } from "./SwitchPrompt";
import style from "./UserForm.module.scss";

const { formStyle, buttonStyle } = style;

type UserFormProps = {
  config: FormConfig;
};

export const UserForm = ({ config }: UserFormProps) => {
  const { name, validationSchema, title, type } = config;
  const validation = validationSchema ? { resolver: yupResolver(signUpSchema) } : undefined;

  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
    reset: resetForm,
    getValues,
  } = useForm<UserDTO>(validation);

  const location = useLocation(),
    auth = useAuth();

  const submitHandler = async (userData: UserDTO) => {
    await auth.signIn(userData, resetForm);
  };

  useEffect(() => {
    resetForm();
  }, [location]);

  return (
    <form className={formStyle} name={title} onSubmit={handleSubmit(() => submitHandler(getValues()))}>
      <TextInput register={register("email")} placeholder="john.doe@gmail.com" errorMsg={formErrors.email?.message} />
      <TextInput
        register={register("password")}
        placeholder="password"
        errorMsg={formErrors.password?.message}
        type="password"
      />
      <Button classes={buttonStyle} name={`${name}-button`} type="submit" variant="outlined">
        {title}
      </Button>
      <SwitchPrompt type={type} />
      <FormError error={auth.error}></FormError>
    </form>
  );
};
