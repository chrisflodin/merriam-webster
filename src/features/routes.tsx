import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./main";
import Login from "./login";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

function Routes() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div style={{ height: "100vh" }}>
      <Switch>
        <ProtectedRoute exact path="/">
          <Main></Main>
        </ProtectedRoute>

        <Route
          path={"/login"}
          render={() => (isAuthenticated ? <Redirect to="/"></Redirect> : <Login></Login>)}
        ></Route>

        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;
