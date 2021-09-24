import {
  EuiTitle,
  EuiText,
  EuiPanel,
  EuiButton,
  EuiHorizontalRule,
} from "@elastic/eui";
import React from "react";
import Moment from "react-moment";

export const MeetingCard: React.FC<{ meet: IMeeting }> = ({ meet }) => {
  return (
    <EuiPanel hasBorder style={{ marginBottom: "1rem"}}>
      <div style={style.panel}>
        <EuiTitle size="s">
          <Moment format="Do MMMM YYYY">{meet.date}</Moment>
        </EuiTitle>
        <div style={style.time}>
          <EuiText>
            {meet.startTime.hours}:{meet.startTime.minutes}
          </EuiText>{" "}
          -
          <EuiText>
            {meet.endTime.hours}:{meet.endTime.minutes}
          </EuiText>
        </div>
      </div>
      <EuiText style={style.desc}>{meet.description}</EuiText>
      <EuiButton color="danger" fill size="s">
        Excuse Yourself
      </EuiButton>
      <EuiHorizontalRule margin="s" />
      <div>
        <strong>Attendees:</strong>{" "}
        <div style={{ display: "inline-block"}}>
          {meet.attendees.map((attendee) => {
            return <span key={attendee.email}>{attendee.email}, </span>;
          })}
        </div>
      </div>
    </EuiPanel>
  );
};

const style = {
  panel: {
    display: "flex",
    alignItems: "center",
  },
  time: {
    display: "flex",
    marginLeft: "1rem",
  },
  desc: {
    padding: "1rem 0",
  },
  attendee: {
    display: "flex",
    alignItems: "center",
  },
};
