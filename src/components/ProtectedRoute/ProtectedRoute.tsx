import { Redirect, Route } from "react-router-dom";
import { useContext } from "react";
// import { AuthContext } from "../../providers/AuthContextProvider";
import { useAuth } from "../../api/auth/useAuth";

interface ProtectedRouteProps {
  children: any;
  path: string;
  exact?: boolean;
}

const ProtectedRoute = ({ children, path, exact = false }: ProtectedRouteProps) => {
  const auth = useAuth();

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (auth.isAuthenticated ? children : <Redirect to="/login"></Redirect>)}
    ></Route>
  );
};

export default ProtectedRoute;
