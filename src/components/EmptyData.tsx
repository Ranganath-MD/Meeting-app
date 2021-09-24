import { EuiEmptyPrompt, EuiButton, EuiEmptyPromptProps } from "@elastic/eui";
import { Link } from "@reach/router";
import React, { Fragment } from "react";

interface Props extends EuiEmptyPromptProps {
  to: string;
  buttonText: string;
}

export const EmptyData: React.FC<Props> = ({
  iconType, title, to, buttonText
}) => (
  <EuiEmptyPrompt
    iconType={iconType}
    title={title}
    body={
      <Fragment>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis
          veritatis pariatur quos, totam impedit quo nisi dolorum aliquam
          repellat sit labore corrupti? Sed ipsam voluptatibus, qui laboriosam
          cupiditate sint dolores?
        </p>
      </Fragment>
    }
    actions={
      <Link to={to}>
        <EuiButton color="primary" fill>
          {buttonText}
        </EuiButton>
      </Link>
    }
  />
);
