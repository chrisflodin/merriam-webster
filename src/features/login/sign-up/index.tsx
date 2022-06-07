import { SyntheticEvent, useEffect, useReducer } from "react";
import loginStyles from "../Login.module.scss";
import { Link } from "react-router-dom";
import { InputActionType, InputType } from "../types";
import { signUpUser } from "../../../api/auth";
import { formReducer } from "../reducer";
import SignUpForm from "./config";
import TextInput from "../../../components/TextInput/TextInput";
import Button from "../../../components/Button/Button";
import { ServerError } from "../../../types/error";
import { AuthSuccessResponse } from "../../../types/response-data";
import { getFormValue } from "../utils";

const { page, container, title, subTitle, switchPrompt, formError } = loginStyles;

const SignUp = () => {
  const [form, formDispatch] = useReducer(formReducer, SignUpForm);

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
      formDispatch({ type: InputActionType.ERROR_THROWN, payload: error.error });
      return;
    }

    let data = res.body as AuthSuccessResponse;
    localStorage.setItem("Authorization", data.token);
    formDispatch({ type: InputActionType.RESET_FORM });
  };

  const handleInputChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const actionType = `${target.id}_CHANGED` as InputActionType;

    formDispatch({
      type: actionType,
      payload: target.value,
    });
  };

  const inputFields = form.inputFields.map((input) => (
    <TextInput handleInputChange={handleInputChange} {...input} key={input.type} />
  ));

  useEffect(() => {
    return () => {
      formDispatch({ type: InputActionType.RESET_FORM });
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
