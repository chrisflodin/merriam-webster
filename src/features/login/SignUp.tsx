import { Link } from "react-router-dom";
import loginStyles from "./Login.module.scss";

const { page, container, title, subTitle, switchPrompt, bottomMargin } = loginStyles;

function SignUp() {
  return (
    <div className={page}>
      <div className={container}>
        <h1 className={title}>merriam webster</h1>
        <h3 className={subTitle}>SIGN UP</h3>
        <p>First name</p>
        <input type="text" placeholder="john" />
        <p>Last name</p>
        <input className={bottomMargin} type="text" placeholder="doe" />
        <p>Email</p>
        <input type="text" placeholder="email" />
        <p>Password</p>
        <input type="password" placeholder="password" />
        <button>sign up</button>
        <p className={switchPrompt}>
          Already have an account? <Link to="/login">log in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
