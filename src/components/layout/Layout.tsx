import { RouteComponentProps } from "@reach/router";
import React from "react";
import { Header } from "./Header";

export const Layout: React.FC<RouteComponentProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
