import React, {
  useState,
  useEffect,
} from "react";
import { RouteComponentProps } from "@reach/router";
import { EmptyData } from "components/EmptyData";
import { RenderPagesWithTabs } from "components/layout";
import { axios } from "services";
import {
  EuiHorizontalRule,
  EuiPanel,
  EuiText,
  EuiBadge,
  EuiSpacer,
} from "@elastic/eui";
import { ErrorMessage } from "components/ErrorMessage";
import Moment from "react-moment";

export const Calendar: React.FC<RouteComponentProps> =
  () => {
    const [error, setError] =
      useState<string>("");
    const [calendarData, setCalendardata] =
      useState([]);

    useEffect(() => {
      const fetchCalendardata = async () => {
        try {
          const response = await axios.get(
            `/calendar?date=2021-09-24`
          );
          setCalendardata(response.data);
        } catch (error: any) {
          setError(error.response.data.message);
        }
      };

      fetchCalendardata();
    }, []);

    return (
      <RenderPagesWithTabs>
        <EuiText size="relative">
          <h1>Calendar</h1>
        </EuiText>
        <EuiHorizontalRule margin="s" />
        {error && (
          <ErrorMessage message={error} />
        )}
        {calendarData.length === 0 ? (
          <EmptyData
            to="/meetings"
            buttonText="Create Meeting"
            iconType="calendar"
            title={<h2>You have no Event</h2>}
          />
        ) : (
          <>
            {calendarData.map((data: any) => {
              return (
                <EuiPanel
                  paddingSize="m"
                  style={{
                    marginBottom: "1rem",
                  }}
                >
                  <EuiText size="m">
                    <h2>{data.name}</h2>
                  </EuiText>
                  <EuiSpacer />
                  <p>{data.description}</p>
                  <EuiSpacer />
                  <EuiBadge
                    iconType="calendar"
                    color="accent"
                  >
                    <Moment format="DD-MM-YYYY">
                      {data.date}
                    </Moment>
                  </EuiBadge>
                  <EuiBadge
                    iconType="calendar"
                    color="default"
                  >
                    <p>
                      from {data.startTime.hours}:
                      {data.startTime.hours}
                    </p>
                  </EuiBadge>
                  <EuiBadge
                    iconType="calendar"
                    color="default"
                  >
                    <p>
                      to {data.endTime.hours}:
                      {data.endTime.hours}
                    </p>
                  </EuiBadge>
                </EuiPanel>
              );
            })}
          </>
        )}
      </RenderPagesWithTabs>
    );
  };
