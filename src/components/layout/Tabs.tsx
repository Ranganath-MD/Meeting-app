import React from "react";
import { Link } from "@reach/router";
import {
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderLinks,
  EuiHeaderLink,
} from "@elastic/eui";

export const Tabs: React.FC = () => {
  return (
    <EuiHeader
      style={{
        padding: "0 2rem",
      }}>
      <EuiHeaderSectionItem>
        <EuiHeaderLinks aria-label="Meeting App bar">
          <EuiHeaderLink>
            <Link to="/calendar">Calendar</Link>
          </EuiHeaderLink>
          <EuiHeaderLink isActive>
            <Link to="/meetings">Meeting</Link>
          </EuiHeaderLink>
          <EuiHeaderLink>
            <Link to="/teams">Teams</Link>
          </EuiHeaderLink>
        </EuiHeaderLinks>
      </EuiHeaderSectionItem>
    </EuiHeader>
  );
};
