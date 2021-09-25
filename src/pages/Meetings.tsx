import React, { useEffect, useState } from "react";
import {
  EuiButton,
  EuiFlexGroup,
  EuiHorizontalRule,
  EuiLoadingContent,
  EuiSpacer,
  EuiText,
} from "@elastic/eui";
import { RouteComponentProps } from "@reach/router";
import { AxiosResponse } from "axios";
import { EmptyData } from "components/EmptyData";
import { RenderPagesWithTabs } from "components/layout";
import { MeetingCard } from "components/MeetingCard";
import { useMeet } from "context";
import { axios } from "services";
import { CreateMeeting } from "./CreateMeeting";

export const Meetings: React.FC<RouteComponentProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { state, dispatch, bringInUsers, clearAll } = useMeet();

  useEffect(() => {
    const getMeetings = async () => {
      setIsLoading(true);
      try {
        const response: AxiosResponse<IMeeting[]> = await axios.get(
          "/meetings"
        );
        dispatch({ type: "GET_MEETINGS", payload: response.data });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    };

    if (state.index === 0) {
      getMeetings();
      bringInUsers();
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, bringInUsers]);
  

  return (
    <RenderPagesWithTabs>
      <EuiFlexGroup
        alignItems="center"
        justifyContent="spaceBetween"
        gutterSize="xs"
      >
        <EuiText size="relative">
          <h1>Meetings</h1>
        </EuiText>
        <EuiText size="relative">
          <EuiButton
            fill
            color="primary"
            size="s"
            iconType={state.showForm ? "cross" : "plus"}
            onClick={() => dispatch({ type: "SHOW_FORM" })}
            className="euiButton"
          >
            {state.showForm ? "Cancel" : "Add Meeting"}
          </EuiButton>
        </EuiText>
      </EuiFlexGroup>
      <EuiHorizontalRule margin="s" />
      <EuiSpacer />
      {isLoading && (
        <EuiText size="relative">
          <EuiLoadingContent lines={5} />
        </EuiText>
      )}
      {state.meetings.length === 0 && !isLoading ? (
        <EmptyData
          to="/meetings"
          buttonText="Create Meeting"
          iconType="notebookApp"
          title={<h2>You have no Meeting</h2>}
        />
      ) : (
        <>
          {state.showForm ? (
            <CreateMeeting />
          ) : (
            <>
              {state.meetings?.map((meet: IMeeting) => {
                return <MeetingCard meet={meet} key={meet._id} />;
              })}
            </>
          )}
        </>
      )}
    </RenderPagesWithTabs>
  );
};
