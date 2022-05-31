import { SyntheticEvent, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import loginStyles from "./Login.module.scss";
import { InputActionType, InputState, InputType } from "./types";
import { signUpUser } from "../../api/auth";
import { formReducer } from "./utils";

const { page, container, title, subTitle, switchPrompt, isValid, isInvalid } = loginStyles;

const initState: any = { valid: false };

["username", "email", "password", "confirmPassword"].forEach((cur: string) => {
  initState[cur] = {
    value: {
      touched: false,
      valid: false,
      value: "",
    } as InputState,
  };
});

function SignUp() {
  const [form, formDispatch] = useReducer(formReducer, initState);

  const submitHandler = async (event: SyntheticEvent) => {
    console.log(form);

    event.preventDefault();
    if (!form.valid) return;

    const user = {
      username: form.username?.value!,
      email: form.email?.value!,
      password: form.password?.value!,
      confirmPassword: form.confirmPassword?.value!,
    };

    const data = await signUpUser(user);
  };

  const handleInputChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const actionType = `${target.id}_CHANGED` as InputActionType;

    formDispatch({
      type: actionType,
      payload: target.value,
    });
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <div className={page}>
      <form className={container} onSubmit={submitHandler}>
        <h1 className={title}>merriam webster</h1>
        <h3 className={subTitle}>SIGN UP</h3>

        <p>Username</p>
        <input
          className={form.username.valid ? isValid : form.username.touched ? isInvalid : ""}
          onChange={handleInputChange}
          id={InputType.USERNAME}
          type="text"
          placeholder="Username"
        />

        <p>Email</p>
        <input
          className={form.email.valid ? isValid : form.email.touched ? isInvalid : ""}
          onChange={handleInputChange}
          id={InputType.EMAIL}
          type="text"
          placeholder="Email"
        />

        <p>Enter password</p>
        <input
          className={form.password.valid ? isValid : form.password.touched ? isInvalid : ""}
          onChange={handleInputChange}
          id={InputType.PASSWORD}
          type="text"
          placeholder="Password (min. 8 chars, 1 number)"
        />

        <p>Confirm password</p>
        <input
          className={form.confirmPassword.valid ? isValid : form.confirmPassword.touched ? isInvalid : ""}
          onChange={handleInputChange}
          id={InputType.CONFIRM_PASSWORD}
          type="text"
          placeholder="Password"
        />

        <button type="submit">Sign up</button>
        <p className={switchPrompt}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
