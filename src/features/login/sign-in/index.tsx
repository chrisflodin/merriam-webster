import { SyntheticEvent, useContext, useReducer, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";
import loginStyles from "../Login.module.scss";
import { InputActionType, InputType } from "../types";
import { signInUser } from "../../../api/auth";
import { formReducer } from "../reducer";
import SignInForm from "./config";
import TextInput from "../../../components/TextInput/TextInput";
import Button from "../../../components/Button/Button";
import { ServerError } from "../../../types/error";
import { AuthSuccessResponse } from "../../../types/response-data";
import { getFormValue } from "../utils";

const { page, container, title, subTitle, switchPrompt, formError } = loginStyles;

const SignIn = () => {
  const [form, formDispatch] = useReducer(formReducer, SignInForm);
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    return () => {
      formDispatch({
        inputType: InputType.FORM,
        actionType: InputActionType.RESET,
      });
    };
  }, []);

  const signInHandler = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!form.valid) return;

    const credentials = {
      email: getFormValue(InputType.EMAIL, form),
      password: getFormValue(InputType.PASSWORD, form),
    };

    const res = await signInUser(credentials);

    if (res.statusCode !== 200) {
      let error: ServerError = res.body as ServerError;

      formDispatch({
        inputType: InputType.ERROR,
        actionType: InputActionType.ERROR_THROWN,
        payload: error.error,
      });

      return;
    }

    let data = res.body as AuthSuccessResponse;
    authCtx.signInHandler(data.token);
    history.replace("/");

    formDispatch({
      inputType: InputType.FORM,
      actionType: InputActionType.RESET,
    });
  };

  const handleInputChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const inputType = target.id as InputType;

    formDispatch({
      inputType: inputType,
      actionType: InputActionType.CHANGED,
      payload: target.value,
    });
  };

  const inputs = form.inputFields.map((input) => (
    <TextInput handleInputChange={handleInputChange} showsValidation={false} {...input} key={input.type} />
  ));

  return (
    <div className={page}>
      <form className={container} onSubmit={signInHandler}>
        <h1 className={title}>merriam webster</h1>
        <h3 className={subTitle}>SIGN IN</h3>
        {inputs}
        {form.error && <p className={formError}>{form.error}</p>}
        <Button type="submit" variant="outlined">
          Sign in
        </Button>
        <p className={switchPrompt}>
          Already have an account? <Link to={"/login/sign-up"}>Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
