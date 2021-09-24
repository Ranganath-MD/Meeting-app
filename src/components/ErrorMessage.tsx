import React from "react";

export const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <p
      style={{
        color: "#6b0d08",
        fontSize: 10,
        padding: "5px 0",
        height: "2rem",
      }}>
      {message && message}
    </p>
  );
};
