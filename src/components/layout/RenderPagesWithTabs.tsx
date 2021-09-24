import React from "react";
import { Tabs } from "./Tabs";

export const RenderPagesWithTabs: React.FC = ({ children }) => {
  return (
    <div>
      <Tabs />
      <div style={{ margin: "0 auto", padding: "2rem", maxWidth: 1000 }}>
        {children}
      </div>
    </div>
  );
};
