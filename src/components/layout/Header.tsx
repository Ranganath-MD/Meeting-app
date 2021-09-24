import React from "react";
import { Link } from "@reach/router";
import {
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiButtonEmpty,
  EuiText,
} from "@elastic/eui";
import { useAuth } from "context";

export const Header: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <EuiHeader
      theme="dark"
      style={{
        padding: "0 2rem",
      }}>
      <EuiHeaderSectionItem border="right">
        <EuiText color="white" size="m">
          Meeting App
        </EuiText>
      </EuiHeaderSectionItem>

      <EuiHeaderSectionItem>
        <EuiHeaderLinks aria-label="Meeting App bar">
          {isAuthenticated ? (
            <>
              <EuiHeaderSectionItem border="right">
                <EuiText color="white" size="s">
                  Hello,{" "}
                  <span style={{ color: "dodgerblue" }}>{user?.name}</span>
                </EuiText>
              </EuiHeaderSectionItem>
              <EuiButtonEmpty color={"primary"} onClick={() => logout()}>
                <EuiText color="white" size="s">
                  Logout
                </EuiText>
              </EuiButtonEmpty>
            </>
          ) : (
            <>
              <Link to="/login">
                <EuiHeaderLink color="ghost" iconType="push">
                  Login
                </EuiHeaderLink>
              </Link>
              <Link to="/">
                <EuiHeaderLink color="ghost" iconType="scale">
                  Register
                </EuiHeaderLink>
              </Link>
            </>
          )}
        </EuiHeaderLinks>
      </EuiHeaderSectionItem>
    </EuiHeader>
  );
};
