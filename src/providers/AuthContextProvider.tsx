import Cookies from "js-cookie";
import React, { useState } from "react";

interface AuthorizationContext {
  authToken: string;
  isAuthenticated: boolean;
  handleSignIn: (authToken: string) => void;
  handleSignOut: () => void;
}

export const AuthContext = React.createContext<AuthorizationContext>({
  authToken: "",
  isAuthenticated: false,
  handleSignOut: () => {},
  handleSignIn: () => {},
});

export const AuthContextProvider = ({ children }: { children: React.ReactElement[] | React.ReactElement }) => {
  const [authToken, setAuthToken] = useState(Cookies.get("Authorization") || "");
  const isAuthenticated = authToken.length > 0;

  const handleSignIn = (authToken: string) => {
    Cookies.set("Authorization", authToken);
    setAuthToken(authToken);
  };

  const handleSignOut = () => {
    Cookies.remove("Authorization");
    setAuthToken("");
  };

  const context = {
    authToken,
    isAuthenticated,
    handleSignIn,
    handleSignOut,
  };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};
