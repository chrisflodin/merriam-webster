import React, { useState } from "react";

interface AuthorizationContext {
  token: string;
  isAuthenticated: boolean;
  signInHandler: (token: string) => void;
  signOutHandler: () => void;
}

export const AuthContext = React.createContext<AuthorizationContext>({
  token: "",
  isAuthenticated: false,
  signOutHandler: () => {},
  signInHandler: () => {},
});

export const AuthContextProvider = (props: { children: any }) => {
  const [token, setToken] = useState(localStorage.getItem("Authorization") || "");
  console.log(token);
  const isAuthenticated = token.length > 0;
  console.log(isAuthenticated);

  const signInHandler = (token: string) => {
    localStorage.setItem("Authorization", token);
    setToken(token);
  };

  const signOutHandler = () => {
    localStorage.removeItem("Authorization");
    setToken("");
  };

  const context = {
    token,
    isAuthenticated,
    signInHandler,
    signOutHandler,
  };

  return <AuthContext.Provider value={context}>{props.children}</AuthContext.Provider>;
};
