import { useContext, useEffect } from "react";
import loginStyles from "../style.module.scss";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserDTO } from "../../../types/user";
import { AuthContext } from "../../../providers/AuthContextProvider";
import { useCreateUser } from "../../../api/auth/userHooks";
import { getError } from "../../../utils/getError";
import EmailField from "../components/EmailField";
import { SignUpConfig } from "../config";
import PasswordField from "../components/PasswordField";

const { page, container, title, subTitle, switchPrompt, errorStyle } = loginStyles;

const SignUp = () => {
  // Question: Why does this component render twice? (without React.StrictMode)
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    getValues,
  } = useForm<UserDTO>();

  const authCtx = useContext(AuthContext),
    history = useHistory();

  const { mutate, data, isError, error } = useCreateUser();

  const submitHandler = async (userData: UserDTO) => {
    mutate(userData);
    reset();
    history.replace("/");
  };

  useEffect(() => {
    if (data) authCtx.handleSignIn(data.data._id.toString());
  }, [data]);

  return (
    <div className={page}>
      <form name="signUpForm" className={container} onSubmit={handleSubmit(() => submitHandler(getValues()))}>
        <h1 className={title}>merriam webster</h1>
        <h3 className={subTitle}>SIGN UP</h3>
        <EmailField errors={errors} register={register}></EmailField>
        <PasswordField errors={errors} register={register}></PasswordField>
        <input name="signUpButton" type="submit"></input>
        <p className={switchPrompt}>
          Already have an account? <Link to={"/login"}>Log in</Link>
        </p>
        {isError && <p className={errorStyle}>{getError(error)}</p>}
      </form>
    </div>
  );
};

export default SignUp;
