import { SyntheticEvent, useEffect, useReducer } from "react";
import { Link, useHistory } from "react-router-dom";
import loginStyles from "../Login.module.scss";
import { InputActionType, InputType } from "../types";
import { signUpUser } from "../../../api/auth";
import { formReducer } from "../reducer";
import SignInForm from "./config";
import TextInput from "../../../components/TextInput/TextInput";

const { page, container, title, subTitle, switchPrompt } = loginStyles;

function SignUp() {
  const [form, formDispatch] = useReducer(formReducer, SignInForm);

  const history = useHistory();

  useEffect(() => {
    if (true) {
      // history.push("/main");
    }
  }, []);

  const submitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!form.valid) return;

    const loginData = {
      email: form.inputFields.find((input) => input.type === InputType.EMAIL)?.value!,
      password: form.inputFields.find((input) => input.type === InputType.PASSWORD)?.value!,
    };

    formDispatch({ type: InputActionType.SUBMIT });

    // const data = await signUpUser(loginData);
    // localStorage.setItem("Authorization", data.token);
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
        <h3 className={subTitle}>SIGN IN</h3>
        {inputs}
        <button type="submit">Sign in</button>
        <p className={switchPrompt}>
          Already have an account? <Link to={"/login/sign-up"}>Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
