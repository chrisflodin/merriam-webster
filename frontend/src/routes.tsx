import { Redirect, Route, Switch } from "react-router-dom";
import Merriam from "./features/merriam/Merriam";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { routing } from "./config/routing";
import Login from "./features/login/Login";
import { LoginConfig, SignUpConfig } from "./features/login/config";

const Routes = () => {
  const { SIGN_IN, SIGN_UP, MERRIAM } = routing;

  return (
    <div style={{ height: "100vh" }}>
      <Switch>
        <ProtectedRoute exact path={MERRIAM}>
          <Merriam />
        </ProtectedRoute>

        <Route exact path={SIGN_UP}>
          <Login config={SignUpConfig} />
        </Route>

        <Route exact path={SIGN_IN}>
          <Login config={LoginConfig} />
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
