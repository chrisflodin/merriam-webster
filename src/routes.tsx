import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./features/main/main";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { routing } from "./config/routing";
import SignIn from "./features/login/SignIn";
import { LoginConfig, SignUpConfig } from "./features/login/config";

const Routes = () => {
  const { SIGN_IN, SIGN_UP, MERRIAM } = routing;

  return (
    <div style={{ height: "100vh" }}>
      <Switch>
        <ProtectedRoute exact path={MERRIAM}>
          <Main />
        </ProtectedRoute>

        <Route exact path={SIGN_UP}>
          <SignIn config={SignUpConfig} />
        </Route>

        <Route exact path={SIGN_IN}>
          <SignIn config={LoginConfig} />
        </Route>

        <Redirect path="/" to={MERRIAM}></Redirect>

        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;
