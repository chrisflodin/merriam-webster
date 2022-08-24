import { useContext, useEffect } from "react";
import loginStyles from "./style.module.scss";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserDTO } from "../../types/user";
import { AuthContext } from "../../providers/AuthContextProvider";
import { FormConfig } from "./types";
import { FormFields } from "./components/FormFields";
import { FormError } from "./components/FormError";
import { yupResolver } from "@hookform/resolvers/yup";

const { page, container, titleStye, subTitle, switchPrompt, errorStyle } = loginStyles;

const SignIn = ({
  displayValidation,
  fields,
  layout: {
    link: { textStart, textEnd },
    formName,
    url,
  },
  useFormMutation,
  validationSchema,
}: FormConfig) => {
  // Question: Why does this component render twice? (without React.StrictMode)
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    getValues,
  } = useForm<UserDTO>({ resolver: yupResolver(validationSchema) });

  const authCtx = useContext(AuthContext),
    history = useHistory();

  const { mutate, data, isError, error } = useFormMutation();

  const submitHandler = async (userData: UserDTO) => {
    mutate(userData);
    reset();
    history.replace("/");
  };

  useEffect(() => {
    if (data) authCtx.handleSignIn(data.data._id.toString());
  }, [data]);

  return (
    <div className={page}>
      <form name={formName} className={container} onSubmit={handleSubmit(() => submitHandler(getValues()))}>
        <h1 className={titleStye}>merriam webster</h1>
        <h3 className={subTitle}>{formName}</h3>
        <FormFields errors={errors} displayValidation={displayValidation} fields={fields} register={register} />
        <button name={`${formName}-button`} type="submit">
          {formName}
        </button>
        <p className={switchPrompt}>
          {textStart} <Link to={url}>{textEnd}</Link>
        </p>
        <FormError error={error} isError />
      </form>
    </div>
  );
};

export default SignIn;
