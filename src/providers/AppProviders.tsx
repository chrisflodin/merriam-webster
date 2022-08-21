import React from "react";
import { AuthContextProvider } from "./AuthContextProvider";
import { AppQueryProvider } from "./AppQueryProvider";

export const AppProviders = ({ children }: { children: React.ReactElement[] | React.ReactElement }) => {
  return (
    <React.StrictMode>
      <AppQueryProvider>
        <AuthContextProvider>{children}</AuthContextProvider>
      </AppQueryProvider>
    </React.StrictMode>
  );
};
