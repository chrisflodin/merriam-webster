import React, { useState } from "react";

interface AuthContext {
  token: string;
  isAuthenticated: boolean;
  signInHandler: (token: string) => void;
  signOutHandler: () => void;
}

export const AuthContext = React.createContext<AuthContext>({
  token: "",
  isAuthenticated: false,
  signOutHandler: () => {},
  signInHandler: () => {},
});

export const AuthContextProvider = (props: { children: any }) => {
  const [token, setToken] = useState(localStorage.getItem("Authorization") || "");
  const isAuthenticated = !!token;

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
