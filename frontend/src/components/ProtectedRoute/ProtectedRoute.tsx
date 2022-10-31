import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../api/auth/useAuth";
import { routing } from "../../config/routing";

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
      render={() => (auth.isAuthenticated ? children : <Redirect to={routing.SIGN_UP}></Redirect>)}
    ></Route>
  );
};

export default ProtectedRoute;
