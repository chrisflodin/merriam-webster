import { useContext, useEffect } from "react";
import loginStyles from "../style.module.scss";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserDTO } from "../../../types/user";
import { AuthContext } from "../../../providers/AuthContextProvider";
import { useCreateUser } from "../../../api/auth/userHooks";
import { getError } from "../../../utils/getError";
import EmailField from "../components/EmailField";
import PasswordField from "../components/PasswordField";

const { page, container, title, subTitle, switchPrompt, errorStyle } = loginStyles;

const SignIn = () => {
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
        <h3 className={subTitle}>SIGN IN</h3>
        <EmailField errors={errors} register={register}></EmailField>
        <PasswordField errors={errors} register={register}></PasswordField>
        <input name="signUpButton" type="submit"></input>
        <p className={switchPrompt}>
          Don't have an account? <Link to={"/sign-up"}>Sign up</Link>
        </p>
        {isError && <p className={errorStyle}>{getError(error)}</p>}
      </form>
    </div>
  );
};

export default SignIn;

// import { SyntheticEvent, useContext, useReducer, useEffect } from "react";
// import { Link, useHistory } from "react-router-dom";
// import { AuthContext } from "../../../providers/AuthContextProvider";
// import loginStyles from "../Login.module.scss";
// import { signInUser } from "../../../api/auth/userHooks";
// import Button from "../../../components/Button/Button";

// const { page, container, title, subTitle, switchPrompt, formError } = loginStyles;

// const SignIn = () => {
//   const history = useHistory();
//   const authCtx = useContext(AuthContext);

//   const handleSignIn = async (event: SyntheticEvent) => {
//     //   event.preventDefault();
//     //   if (!form.valid) return;

//     //   const credentials = {
//     //     email: getFormValue(InputType.EMAIL, form),
//     //     password: getFormValue(InputType.PASSWORD, form),
//     //   };

//     //   const res = await signInUser(credentials);

//     //   if (res.statusCode !== 200) {
//     //     let error: ServerError = res.body as ServerError;

//     //     formDispatch({
//     //       inputType: InputType.ERROR,
//     //       actionType: InputActionType.ERROR_THROWN,
//     //       payload: error.message,
//     //     });

//     //     return;
//     //   }

//     //   // let data = res.body as AuthSuccessResponse;
//     //   // authCtx.handleSignIn(data.token);
//     //   history.replace("/");
//     // };

//     // const handleInputChange = (event: SyntheticEvent) => {
//     //   const target = event.target as HTMLInputElement;
//     //   const inputType = target.id as InputType;

//     //   formDispatch({
//     //     inputType: inputType,
//     //     actionType: InputActionType.CHANGED,
//     //     payload: target.value,
//     //   });
//     // };

//     // useEffect(() => {
//     //   return () => {
//     //     formDispatch({
//     //       inputType: InputType.FORM,
//     //       actionType: InputActionType.RESET,
//     //     });
//     //   };
//     // }, []);

//     // const inputs = form.inputFields.map((input) => (
//     //   <TextInput handleInputChange={handleInputChange} showsValidation={false} {...input} key={input.type} />
//     // ));

//     return (
//       <div className={page}>
//         <form className={container} onSubmit={handleSignIn}>
//           <h1 className={title}>merriam webster</h1>
//           <h3 className={subTitle}>SIGN IN</h3>
//           {/* {inputs} */}
//           {/* {form.error && <p className={formError}>{form.error}</p>} */}
//           <Button type="submit" variant="outlined">
//             Sign in
//           </Button>
//           <p className={switchPrompt}>
//             Already have an account? <Link to={"/login/sign-up"}>Sign up</Link>
//           </p>
//         </form>
//       </div>
//     );
//   };
// };
// export default SignIn;
