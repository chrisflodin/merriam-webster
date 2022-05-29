import { Route, Switch } from "react-router-dom";
import Login from "./login/Login";
import Main from "./main/Main";

function Routes() {
  return (
    <div style={{ height: "100vh" }}>
      <Switch>
        <Route exact path={"/"} component={Main}></Route>
        <Route exact path={"/login"} component={Login}></Route>
      </Switch>
    </div>
  );
}

export default Routes;
