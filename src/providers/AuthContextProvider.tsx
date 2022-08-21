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
  const [token, setToken] = useState(localStorage.getItem("Authorization") || "");
  const isAuthenticated = token.length > 0;

  const handleSignIn = (token: string) => {
    localStorage.setItem("Authorization", token);
    setToken(token);
  };

  const handleSignOut = () => {
    localStorage.removeItem("Authorization");
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
