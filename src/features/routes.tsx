import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./main";
import Login from "./login/routes";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthContextProvider";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

const Routes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div style={{ height: "100vh" }}>
      <Switch>
        <ProtectedRoute exact path="/">
          <Main></Main>
        </ProtectedRoute>

        <Route
          path={"/login"}
          // render={() => (isAuthenticated ? <Redirect to="/"></Redirect> : <Login></Login>)}
          render={() => <Login></Login>}
        ></Route>

        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;
