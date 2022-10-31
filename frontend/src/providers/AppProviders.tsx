import React from "react";
import { AppQueryProvider } from "./AppQueryProvider";

export const AppProviders = ({ children }: { children: React.ReactElement[] | React.ReactElement }) => {
  return (
    <React.StrictMode>
      <AppQueryProvider>{children}</AppQueryProvider>
    </React.StrictMode>
  );
};
