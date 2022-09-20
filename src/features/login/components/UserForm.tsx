import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../../../api/auth/useAuth";
import Button from "../../../components/Button/Button";
import TextInput from "../../../components/TextInput/TextInput";
import { AuthContext } from "../../../providers/AuthContextProvider";
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
  const { name, apiUri, validationSchema, title, type } = config;
  const validation = validationSchema ? { resolver: yupResolver(signUpSchema) } : undefined;

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset: resetForm,
    getValues,
  } = useForm<UserDTO>(validation);

  const { handleSignIn } = useContext(AuthContext),
    history = useHistory(),
    location = useLocation();

  const { mutate, isError, error, reset: resetMutation } = useAuth(apiUri);

  const submitHandler = async (userData: UserDTO) => {
    mutate(userData, {
      onSuccess: (authData) => {
        history.replace("/");
        if (authData) handleSignIn(authData.token);
        resetForm();
      },
    });
  };

  useEffect(() => {
    resetForm();
    resetMutation();
  }, [location]);

  return (
    <form className={formStyle} name={title} onSubmit={handleSubmit(() => submitHandler(getValues()))}>
      <TextInput register={register("email")} placeholder="john.doe@gmail.com" errorMsg={errors.email?.message} />
      <TextInput
        register={register("password")}
        placeholder="password"
        errorMsg={errors.password?.message}
        type="password"
      />
      <Button classes={buttonStyle} name={`${name}-button`} type="submit" variant="outlined">
        {title}
      </Button>
      <SwitchPrompt type={type} />
      <FormError isError={isError} error={error}></FormError>
    </form>
  );
};
