import { Route, Switch } from "react-router-dom";
import Main from "./features/main";
import { useContext } from "react";
import { AuthContext } from "./providers/AuthContextProvider";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SignIn from "./features/login/sign-in/signIn";
import SignUp from "./features/login/sign-up/signUp";
import { routing } from "./config/routing";

const Routes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div style={{ height: "100vh" }}>
      <Switch>
        <ProtectedRoute exact path="/">
          <Main />
        </ProtectedRoute>

        <Route exact path={routing.SIGNIN}>
          <SignIn />
        </Route>

        <Route exact path={routing.SIGNUP}>
          <SignUp />
        </Route>

        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;
