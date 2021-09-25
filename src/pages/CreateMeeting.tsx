import React, { useState } from "react";
import moment from "moment";
import {
  EuiButton,
  EuiPanel,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTextArea,
  EuiFieldText,
  EuiDatePicker,
  EuiFormRow,
  EuiComboBox,
  EuiSpacer,
} from "@elastic/eui";
import { useMeet } from "context";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "components/ErrorMessage";

export const CreateMeeting: React.FC = () => {
  const { state, create } = useMeet();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    const attendees = data.attendees.map((a: any): Attendee => {
      return {
        userId: a.userid,
        email: a.label,
      };
    });
    const payload: IMeeting = {
      name: data.name,
      description: data.description,
      date: data.date.format("YYYY-MM-DD"),
      startTime: {
        hours: data.startTime.hours(),
        minutes: data.startTime.minutes(),
      },
      endTime: {
        hours: data.endTime.hours(),
        minutes: data.endTime.minutes(),
      },
      attendees,
    };
    await create(payload);
    setLoading(false);
    reset();
  };

  return (
    <EuiPanel paddingSize="l" hasShadow={false}>
      <EuiTitle size="s">
        <h2>Add a new meeting</h2>
      </EuiTitle>
      <EuiSpacer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <EuiFlexItem>
          <EuiFormRow label="Name">
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: "This field is required",
              }}
              render={({ field: { onChange, value } }) => (
                <>
                  <EuiFieldText
                    placeholder="Enter meeting name"
                    value={value}
                    onChange={onChange}
                    aria-label="name"
                    isInvalid={!!errors.name?.message}
                  />
                  <ErrorMessage message={errors.name?.message} />
                </>
              )}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFormRow label="Select a date">
              <Controller
                name="date"
                control={control}
                defaultValue={moment()}
                rules={{
                  required: "This field is required",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <EuiDatePicker
                      selected={value}
                      onChange={onChange}
                      isInvalid={!!errors.date?.message}
                      minDate={moment()}
                      maxDate={moment().add(1, "month")}
                    />
                    <ErrorMessage message={errors.date?.message} />
                  </>
                )}
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow label="Start Time">
              <Controller
                name="startTime"
                control={control}
                defaultValue={moment()}
                rules={{
                  required: "This field is required",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <EuiDatePicker
                      showTimeSelect
                      showTimeSelectOnly
                      selected={value}
                      onChange={onChange}
                      dateFormat="hh:mm a"
                      timeFormat="hh:mm a"
                      isInvalid={!!errors.startTime?.message}
                    />
                    <ErrorMessage message={errors.startTime?.message} />
                  </>
                )}
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow label="End Time">
              <Controller
                name="endTime"
                control={control}
                defaultValue={moment()}
                rules={{
                  required: "This field is required",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <EuiDatePicker
                      showTimeSelect
                      showTimeSelectOnly
                      selected={value}
                      onChange={onChange}
                      dateFormat="hh:mm a"
                      timeFormat="hh:mm a"
                      isInvalid={!!errors.endTime?.message}
                    />
                    <ErrorMessage message={errors.endTime?.message} />
                  </>
                )}
              />
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiFormRow label="Description" fullWidth>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{
              required: "This field is required",
            }}
            render={({ field: { onChange, value } }) => (
              <>
                <EuiTextArea
                  fullWidth
                  resize="none"
                  rows={2}
                  onChange={onChange}
                  value={value}
                  placeholder="Enter Description"
                  isInvalid={!!errors.description?.message}
                />
                <ErrorMessage message={errors.description?.message} />
              </>
            )}
          />
        </EuiFormRow>
        <EuiFormRow label="Attendees" fullWidth>
          <Controller
            name="attendees"
            control={control}
            defaultValue={[]}
            rules={{
              required: "This field is required",
            }}
            render={({ field: { onChange, value } }) => (
              <>
                <EuiComboBox
                  placeholder="Select one or more options"
                  options={state?.users}
                  selectedOptions={value}
                  onChange={onChange}
                  isClearable={true}
                  fullWidth
                  isInvalid={errors.attendees?.message}
                />
                {state.selectedOptions?.length === 0 && (
                  <ErrorMessage message={errors.attendees?.message} />
                )}
              </>
            )}
          />
        </EuiFormRow>
        <EuiButton
          type="submit"
          color="primary"
          isLoading={loading}
          style={style.btn}
        >
          Add Meeting
        </EuiButton>
      </form>
    </EuiPanel>
  );
};

const style = {
  btn: {
    marginTop: "2rem",
  },
};
