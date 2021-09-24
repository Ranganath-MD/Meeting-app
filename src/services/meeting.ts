import { AxiosResponse } from "axios";
import { axios } from "./axios"

export const addMeeting = async (payload: IMeeting) => {
  try {
    const response: AxiosResponse<IMeeting> = await axios.post(
      "/meetings",
      payload
    );
    return response?.data;
  } catch {
    throw new Error();
  }
}