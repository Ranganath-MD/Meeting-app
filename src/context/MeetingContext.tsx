import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import { addMeeting, axios } from "services";

const initialState = {
  users: [],
  showForm: false,
  meetings: [],
  index: 0
};
const MeetingContext = createContext<any>(initialState);

type ActionTypes =
  | "ADD_MEETING"
  | "GET_USERS"
  | "SHOW_FORM"
  | "GET_MEETINGS"
  | "CLEAR"
  | "ADD_ATTENDEE"
  | "EXCUSE";

type Action = {
  type: ActionTypes;
  payload?: any;
};

const reducer = (state: typeof initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_MEETINGS":
      return { ...state, meetings: payload, index: 1 };

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

    case "ADD_ATTENDEE":
      const meetings = state.meetings.map((x: IMeeting) =>
        x._id === payload._id ? payload : x
      );
      return { ...state, meetings };

    case "EXCUSE":
      const remainingMeetings = state.meetings.filter(
        (meet: IMeeting) => meet._id !== payload
      );
      return { ...state, meetings: remainingMeetings };

    case "CLEAR":
      return { ...state, showForm: false};

    default:
      return state;
  }
};

export const MeetingProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const create = useCallback(
    async (payload: IMeeting) => {
      try {
        const result = await addMeeting(payload);
        const meetings = [...state.meetings, result];
        dispatch({ type: "ADD_MEETING", payload: meetings });
      } catch {
        throw new Error();
      }
    },
    [state.meetings]
  );

  const bringInUsers = useCallback(async () => {
    try {
      const users: any = [];
      const response = await axios.get("/users");
      response?.data.forEach((data: any) => {
        users.push({
          label: data.email,
          userid: data._id,
        });
      });
      dispatch({ type: "GET_USERS", payload: users });
    } catch (error) {
      alert((error as Error)?.message);
    }
  }, [dispatch]);

  const clearAll = () => {
    dispatch({ type: "CLEAR" });
  };

  return (
    <MeetingContext.Provider
      value={{
        state,
        dispatch,
        create,
        bringInUsers,
        clearAll,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeet = () => useContext(MeetingContext);
