import { useContext, useEffect } from "react";
import loginStyles from "./SignIn.module.scss";
import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserDTO } from "../../types/user";
import { AuthContext } from "../../providers/AuthContextProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "./validation";
import { FormConfig } from "./config";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import { UserForm } from "./components/FormLayout";
import { useAuth } from "../../api/auth/useAuth";

const { page } = loginStyles;
type SignUpProps = {
  config: FormConfig;
};

const SignIn = ({ config }: SignUpProps) => {
  const { formConfig, layoutConfig } = config;
  const { formName, apiUri, validationSchema } = formConfig;
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
    <div className={page}>
      <UserForm
        config={layoutConfig}
        isError={isError}
        error={error}
        submitHandler={handleSubmit(() => submitHandler(getValues()))}
      >
        <TextInput register={register("email")} placeholder="john.doe@gmail.com" errorMsg={errors.email?.message} />
        <TextInput
          register={register("password")}
          placeholder="password"
          errorMsg={errors.password?.message}
          type="password"
        />
        <Button name={`${formName}-button`} type="submit" variant="outlined">
          {layoutConfig.title}
        </Button>
      </UserForm>
    </div>
  );
};

export default SignIn;
