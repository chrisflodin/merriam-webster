import { Route, Switch } from "react-router-dom";
import Main from "./features/main";
import { useContext } from "react";
import { AuthContext } from "./providers/AuthContextProvider";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { routing } from "./config/routing";
import SignIn from "./features/login/SignIn";
import { LoginConfig, SignUpConfig } from "./features/login/config";

const Routes = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { SIGN_IN, SIGN_UP } = routing;

  return (
    <div style={{ height: "100vh" }}>
      <Switch>
        <ProtectedRoute exact path="/">
          <Main />
        </ProtectedRoute>

        <Route exact path={SIGN_UP}>
          <SignIn config={SignUpConfig} />
        </Route>

        <Route exact path={SIGN_IN}>
          <SignIn config={LoginConfig} />
        </Route>

        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;
