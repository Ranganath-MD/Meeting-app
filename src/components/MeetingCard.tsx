import {
  EuiTitle,
  EuiText,
  EuiPanel,
  EuiButton,
  EuiHorizontalRule,
  EuiComboBox,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
} from "@elastic/eui";
import React, { useState } from "react";
import Moment from "react-moment";
import { useMeet } from "context";
import { axios } from "services";
import { ErrorMessage } from "./ErrorMessage";

export const MeetingCard: React.FC<{ meet: IMeeting }> = ({ meet }) => {
  const [selected, setSelected] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingExcuse, setLoadingExcuse] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { state, dispatch } = useMeet();

  const handleClick = async () => {
    if (selected.length === 0) return;
    setLoading(true);
    const email = selected[0]?.label;
    try {
      const response = await axios.patch(
        `/meetings/${meet._id}?action=add_attendee&email=${email}`
      );
      dispatch({ type: "ADD_ATTENDEE", payload: response.data });
      setLoading(false);
      setSelected([]);
    } catch (error: any) {
      setError(error.response.data.message);
      setLoading(false);
      setTimeout(() => setError(""), 4000);
    }
  };

  const excuseYourself = async () => {
    setLoadingExcuse(true);
    try {
      const response = await axios.patch(
        `/meetings/${meet._id}?action=remove_attendee`
      );
      dispatch({ type: "EXCUSE", payload: response.data._id });
      setLoadingExcuse(false);
      setSelected([]);
    } catch (error: any) {
      setError(error.response.data.message);
      setLoadingExcuse(false);
      setTimeout(() => setError(""), 4000);
    }
  };

  return (
    <EuiPanel hasBorder style={{ marginBottom: "1rem" }}>
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
      <EuiButton
        color="danger"
        fill
        size="s"
        onClick={excuseYourself}
        isLoading={loadingExcuse}
      >
        Excuse Yourself
      </EuiButton>
      <EuiHorizontalRule margin="s" />
      <div>
        <strong>Attendees:</strong>{" "}
        <div style={{ display: "inline-block" }}>
          {meet.attendees.map((attendee) => {
            return <span key={attendee.email}>{attendee.email}, </span>;
          })}
        </div>
      </div>
      <EuiSpacer />
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem>
          <EuiComboBox
            placeholder="Select an attendee"
            options={state?.users}
            singleSelection={{ asPlainText: true }}
            selectedOptions={selected}
            onChange={(selected: any) => setSelected(selected)}
            isClearable={true}
            fullWidth
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiButton
            fill
            color="primary"
            size="s"
            isLoading={loading}
            style={{
              width: "75px",
            }}
            onClick={handleClick}
          >
            Add
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
      {error && <ErrorMessage message={error} />}
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
  dropdown: {
    marginLeft: "1rem",
  },
};
