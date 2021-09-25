import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import { EmptyData } from "components/EmptyData";
import { RenderPagesWithTabs } from "components/layout";
import { axios } from "services";
import { EuiHorizontalRule, EuiText } from "@elastic/eui";
import { ErrorMessage } from "components/ErrorMessage";

export const Calendar: React.FC<RouteComponentProps> = () => {
  const [error, setError] = useState<string>("");
  const [calendarData, setCalendardata] = useState([]);

  useEffect(() => {
    const fetchCalendardata = async () => {
      try {
        const response = await axios.get(`/calendar?date=2021-09-24`);
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
      {error && <ErrorMessage message={error} />}
      {calendarData.length === 0 && (
        <EmptyData
          to="/meetings"
          buttonText="Create Meeting"
          iconType="calendar"
          title={<h2>You have no Event</h2>}
        />
      )}
    </RenderPagesWithTabs>
  );
};
