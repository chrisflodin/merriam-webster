import { SyntheticEvent, useContext, useEffect, useReducer } from "react";
import loginStyles from "../Login.module.scss";
import { Link, useHistory } from "react-router-dom";
import { InputActionType, InputType } from "../types";
import { signUpUser } from "../../../api/auth";
import { formReducer } from "../reducer";
import SignUpForm from "./config";
import TextInput from "../../../components/TextInput/TextInput";
import Button from "../../../components/Button/Button";
import { ServerError } from "../../../types/error";
import { AuthSuccessResponse } from "../../../types/response-data";
import { getFormValue } from "../utils";
import { AuthContext } from "../../../context/auth-context";

const { page, container, title, subTitle, switchPrompt, formError } = loginStyles;

const SignUp = () => {
  const [form, formDispatch] = useReducer(formReducer, SignUpForm);
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!form.valid) return;

    const credentials = {
      username: getFormValue(InputType.USERNAME, form),
      email: getFormValue(InputType.EMAIL, form),
      password: getFormValue(InputType.PASSWORD, form),
    };

    const res = await signUpUser(credentials);

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
    authCtx.handleSignIn(data.token);
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

  const inputFields = form.inputFields.map((input) => (
    <TextInput handleInputChange={handleInputChange} {...input} key={input.type} />
  ));

  useEffect(() => {
    return () => {
      formDispatch({
        inputType: InputType.FORM,
        actionType: InputActionType.RESET,
      });
    };
  }, []);

  return (
    <div className={page}>
      <form className={container} onSubmit={handleSubmit}>
        <h1 className={title}>merriam webster</h1>
        <h3 className={subTitle}>SIGN UP</h3>
        {inputFields}
        {form.error && <p className={formError}>{form.error}</p>}
        <Button type="submit" variant="outlined">
          Sign up
        </Button>
        <p className={switchPrompt}>
          Already have an account? <Link to={"/login"}>Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
