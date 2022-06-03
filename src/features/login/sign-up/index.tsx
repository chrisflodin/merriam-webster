import { SyntheticEvent, useReducer } from "react";
import { Link } from "react-router-dom";
import loginStyles from "../Login.module.scss";
import { InputActionType, InputType } from "../types";
import { signUpUser } from "../../../api/auth";
import { formReducer } from "../reducer";
import SignUpForm from "./config";
import TextInput from "../../../components/TextInput/TextInput";

const { page, container, title, subTitle, switchPrompt } = loginStyles;

function SignUp() {
  const [form, formDispatch] = useReducer(formReducer, SignUpForm);

  const submitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!form.valid) return;

    const user = {
      username: form.inputFields.find((input) => input.type === InputType.USERNAME)?.value!,
      email: form.inputFields.find((input) => input.type === InputType.EMAIL)?.value!,
      password: form.inputFields.find((input) => input.type === InputType.PASSWORD)?.value!,
      confirm: form.inputFields.find((input) => input.type === InputType.CONFIRM_PASSWORD)?.value!,
    };

    const data = await signUpUser(user);
    localStorage.setItem("Authorization", data.token);
    formDispatch({ type: InputActionType.SUBMIT });
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
      <form className={container} onSubmit={submitHandler}>
        <h1 className={title}>merriam webster</h1>
        <h3 className={subTitle}>SIGN UP</h3>
        {inputs}
        <button type="submit">Sign up</button>
        <p className={switchPrompt}>
          Already have an account? <Link to={"/login/"}>Log in</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
