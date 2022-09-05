import Cookies from "js-cookie";
import React, { useState } from "react";

interface AuthorizationContext {
  token: string;
  isAuthenticated: boolean;
  handleSignIn: (token: string) => void;
  handleSignOut: () => void;
}

export const AuthContext = React.createContext<AuthorizationContext>({
  token: "",
  isAuthenticated: false,
  handleSignOut: () => {},
  handleSignIn: () => {},
});

export const AuthContextProvider = ({ children }: { children: React.ReactElement[] | React.ReactElement }) => {
  const [token, setToken] = useState(Cookies.get("Authorization") || "");
  const isAuthenticated = token.length > 0;

  const handleSignIn = (token: string) => {
    Cookies.set("Authorization", token);
    setToken(token);
  };

  const handleSignOut = () => {
    Cookies.remove("Authorization");
    setToken("");
  };

  const context = {
    token,
    isAuthenticated,
    handleSignIn,
    handleSignOut,
  };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};
