import React from "react";
import { Link } from "react-router-dom";

import loginStyles from "./Login.module.scss";

function Login() {
  return (
    <div className={loginStyles.page}>
      <div className={loginStyles.container}>
        <h1 className={loginStyles.title}>merriam webster api</h1>
        <p className={""}>email</p>
        <input type="text" placeholder="email" />
        <p className={""}>password</p>
        <input type="password" placeholder="password" />
        <button>login</button>
        <p className={loginStyles.signUp}>
          Don't have an account? <Link to="/sign-up">sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
