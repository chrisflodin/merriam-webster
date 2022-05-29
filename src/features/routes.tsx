import { Route, Switch } from "react-router-dom";
import Login from "./login/Login";
import Main from "./main/Main";

function Routes() {
  return (
    <>
      <Switch>
        <Route exact path={"/"} component={Main}></Route>
        <Route path={"/login"} component={Login}></Route>
      </Switch>
    </>
  );
}

export default Routes;
