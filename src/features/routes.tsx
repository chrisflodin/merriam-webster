import { Route, Switch } from "react-router-dom";
import Main from "./main";
import Login from "./login";

function Routes() {
  return (
    <div style={{ height: "100vh" }}>
      <Switch>
        <Route exact path={"/"} component={Main}></Route>
        <Route path={"/login"} component={Login}></Route>
      </Switch>
    </div>
  );
}

export default Routes;
