import { SyntheticEvent, useContext, useReducer } from "react";
import { useEffect } from "react";
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

const { page, container, title, subTitle, switchPrompt, formError } = loginStyles;

function SignIn() {
  const [form, formDispatch] = useReducer(formReducer, SignInForm);

  const history = useHistory();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    return () => {
      formDispatch({ type: InputActionType.SUBMIT });
    };
  }, []);

  const signIn = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!form.valid) return;

    const loginData = {
      email: form.inputFields.find((input) => input.type === InputType.EMAIL)?.value!,
      password: form.inputFields.find((input) => input.type === InputType.PASSWORD)?.value!,
    };

    const res = await signInUser(loginData);

    if (res.statusCode !== 200) {
      let error: ServerError = res.body as ServerError;
      formDispatch({ type: InputActionType.ERROR_THROWN, payload: error.error });
      return;
    }
    let data = res.body as AuthSuccessResponse;

    localStorage.setItem("Authorization", data.token);
    formDispatch({ type: InputActionType.SUBMIT });
    authCtx.signInHandler(data.token);
    history.replace("/");
  };

  const handleInputChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const actionType = `${target.id}_CHANGED` as InputActionType;

    formDispatch({
      type: actionType,
      payload: target.value,
    });
  };

  const inputs = form.inputFields.map((input) => (
    <TextInput handleInputChange={handleInputChange} showsValidation={false} {...input} key={input.type} />
  ));

  return (
    <div className={page}>
      <form className={container} onSubmit={signIn}>
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
}

export default SignIn;
