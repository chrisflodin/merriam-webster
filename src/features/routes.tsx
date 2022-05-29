import { Route, Switch } from "react-router-dom";
import Login from "./login";
import Main from "./main";
import SignUp from "./login/SignUp";

function Routes() {
  return (
    <div style={{ height: "100vh" }}>
      <Switch>
        <Route exact path={"/"} component={Main}></Route>
        <Route exact path={"/login"} component={Login}></Route>
        <Route exact path={"/sign-up"} component={SignUp}></Route>
      </Switch>
    </div>
  );
}

export default Routes;
