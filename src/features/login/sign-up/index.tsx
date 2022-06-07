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

const { page, container, title, subTitle, switchPrompt, formError } = loginStyles;

const SignUp = () => {
  const [form, formDispatch] = useReducer(formReducer, SignUpForm);

  useEffect(() => {
    return () => {
      formDispatch({ type: InputActionType.RESET_FORM });
    };
  }, []);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!form.valid) return;

    const user = {
      username: form.inputFields.find((input) => input.type === InputType.USERNAME)?.value!,
      email: form.inputFields.find((input) => input.type === InputType.EMAIL)?.value!,
      password: form.inputFields.find((input) => input.type === InputType.PASSWORD)?.value!,
      confirm: form.inputFields.find((input) => input.type === InputType.CONFIRM_PASSWORD)?.value!,
    };

    const res = await signUpUser(user);

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

  const inputs = form.inputFields.map((input) => (
    <TextInput handleInputChange={handleInputChange} {...input} key={input.type} />
  ));

  return (
    <div className={page}>
      <form className={container} onSubmit={handleSubmit}>
        <h1 className={title}>merriam webster</h1>
        <h3 className={subTitle}>SIGN UP</h3>
        {inputs}
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
