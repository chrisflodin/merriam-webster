import { Link } from "react-router-dom";
import loginStyles from "./Login.module.scss";

const { page, container, title, subTitle, switchPrompt } = loginStyles;

function Login() {
  return (
    <div className={page}>
      <div className={container}>
        <h1 className={title}>merriam webster</h1>
        <h3 className={subTitle}>LOGIN</h3>
        <p>Email</p>
        <input type="text" placeholder="Email" />
        <p>Password</p>
        <input type="password" placeholder="Password" />
        <button>login</button>
        <p className={switchPrompt}>
          Don't have an account? <Link to="/sign-up">sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
