import { FormConfig } from "./config";
import { UserForm } from "./components/UserForm";
import styles from "./SignIn.module.scss";

type SignInProps = {
  config: FormConfig;
};

const { container, pageStyle } = styles;

const SignIn = ({ config }: SignInProps) => {
  const { title } = config;

  return (
    <div className={pageStyle}>
      <div className={container}>
        <h1>merriam webster</h1>
        <h3>{title}</h3>
        <UserForm config={config}></UserForm>
      </div>
    </div>
  );
};

export default SignIn;
