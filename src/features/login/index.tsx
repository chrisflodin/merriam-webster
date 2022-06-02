import { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import SignIn from "./sign-in";
import SignUp from "./sign-up";

const Login = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path + "/"} component={SignIn}></Route>
      <Route exact path={path + "/sign-up"} component={SignUp}></Route>
    </Switch>
  );
};

export default Login;
