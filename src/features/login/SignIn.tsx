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
import { transformAxiosError } from "../../utils/axios";

const { page } = loginStyles;
type SignUpProps = {
  config: FormConfig;
};

const SignIn = ({ config }: SignUpProps) => {
  const { formConfig, layoutConfig } = config;
  const { formName, mutateHook, validationSchema } = formConfig;
  // Question: Why does this component render twice? (without React.StrictMode)
  const validation = validationSchema ? { resolver: yupResolver(signUpSchema) } : undefined;

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    getValues,
  } = useForm<UserDTO>(validation);

  const authCtx = useContext(AuthContext),
    history = useHistory(),
    location = useLocation();

  const { mutate, data, error, reset: resetMutation } = mutateHook();
  const serverError = transformAxiosError(error);

  const submitHandler = async (userData: UserDTO) => {
    mutate(userData, {
      onSuccess: () => {
        history.replace("/");
        reset();
      },
    });
  };

  useEffect(() => {
    reset();
    resetMutation();
  }, [location]);

  useEffect(() => {
    if (data) authCtx.handleSignIn(data.data._id.toString());
  }, [data]);

  return (
    <div className={page}>
      <UserForm
        config={layoutConfig}
        error={serverError}
        submitHandler={handleSubmit(() => submitHandler(getValues()))}
      >
        <TextInput register={register("email")} placeholder="john.doe@gmail.com" errorMsg={errors.email?.message} />
        <TextInput register={register("password")} placeholder="password" errorMsg={errors.password?.message} />
        <Button name={`${formName}-button`} type="submit" variant="outlined">
          {layoutConfig.title}
        </Button>
      </UserForm>
    </div>
  );
};

export default SignIn;
