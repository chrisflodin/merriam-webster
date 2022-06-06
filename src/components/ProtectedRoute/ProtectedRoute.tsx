import { Redirect, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";

interface ProtectedRouteProps {
  children: any;
  path: string;
  exact?: boolean;
}

function ProtectedRoute({ children, path, exact = false }: ProtectedRouteProps) {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (isAuthenticated ? children : <Redirect to={"/login"}></Redirect>)}
    ></Route>
  );
}

export default ProtectedRoute;
