import React, { createContext, useContext, useReducer, useCallback } from "react";
import { addMeeting } from "services";

const initialState = {
  name: "",
  users: [],
  isAdding: false,
  showForm: false,
  meetings: [],
};
const MeetingContext = createContext<any>(initialState);

type Action = {
  type: "ADD_MEETING" | "GET_USERS" | "SHOW_FORM" | "GET_MEETINGS";
  payload?: any;
};

const reducer = (state: typeof initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_MEETINGS":
      return { ...state, meetings: payload };
    case "ADD_MEETING":
      return {
        ...state,
        meetings: payload,
        showForm: !state.showForm,
      };
    case "GET_USERS":
      return { ...state, users: payload };
    case "SHOW_FORM":
      return { ...state, showForm: !state.showForm };
    default:
      return state;
  }
};

export const MeetingProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const create = useCallback(async (payload: IMeeting) => {
    try {
      const result = await addMeeting(payload);
      const meetings = [...state.meetings, result];
      dispatch({ type: "ADD_MEETING", payload: meetings });
    } catch {
      throw new Error();
    }
  }, [state.meetings]);

  return (
    <MeetingContext.Provider
      value={{
        state,
        dispatch,
        create,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeet = () => useContext(MeetingContext);
