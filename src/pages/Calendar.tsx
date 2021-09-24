import { RouteComponentProps } from "@reach/router";
import { EmptyData } from "components/EmptyData";
import { RenderPagesWithTabs } from "components/layout";
import React from "react";

export const Calendar: React.FC<RouteComponentProps> = () => {
  return (
    <RenderPagesWithTabs>
      <h1>Calendar</h1>
      <EmptyData
        to="/meetings"
        buttonText="Create Meeting"
        iconType="calendar"
        title={<h2>You have no Event</h2>}
      />
    </RenderPagesWithTabs>
  );
};
