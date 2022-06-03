import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import style from "./Main.module.scss";

function Main() {
  const auth = useContext(AuthContext);

  return (
    <div>
      <button onClick={auth.signOutHandler}>Sign out</button>
    </div>
  );
}

export default Main;
