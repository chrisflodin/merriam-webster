import { useContext, useEffect } from "react";
import loginStyles from "../Login.module.scss";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserDTO } from "../../../types/user";
import { AuthContext } from "../../../providers/AuthContextProvider";
import { useCreateUser } from "../../../api/auth/userHooks";

export type MutationFunction<TResult, TVariables = unknown> = (variables: TVariables) => Promise<TResult>;

const { page, container, title, subTitle, switchPrompt, formError } = loginStyles;

const SignUp = () => {
  // Question: Why does this component render twice? (without React.StrictMode)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<UserDTO>();

  const { mutate, data, isError, error } = useCreateUser();

  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const getError = (error: unknown) => {
    if (error instanceof Error) return error.message;
    return "";
  };

  const submitHandler = async (userData: UserDTO) => {
    mutate(userData);
    reset();

    history.replace("/");
  };

  useEffect(() => {
    if (!!data && !(data instanceof Error)) authCtx.handleSignIn(data.data._id.toString());
  }, [data]);

  return (
    <div className={page}>
      <form name="signUpForm" className={container} onSubmit={handleSubmit(() => submitHandler(getValues()))}>
        <h1 className={title}>merriam webster</h1>
        <h3 className={subTitle}>SIGN UP</h3>
        <input placeholder="john.doe@gmail.com" {...register("email", { required: "Email is required" })}></input>
        {errors?.email && <p className={formError}>{errors.email?.message}</p>}
        <input
          placeholder="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 4,
              message: "Minimum length is 4 characters",
            },
          })}
        ></input>
        {errors?.password && <p className={formError}>{errors.password?.message}</p>}
        <input name="signUpButton" type="submit"></input>
        <p className={switchPrompt}>
          Already have an account? <Link to={"/login"}>Log in</Link>
        </p>
        {isError && <p className={formError}>{getError(error)}</p>}
      </form>
    </div>
  );
};

export default SignUp;
