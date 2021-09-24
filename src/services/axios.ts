import Axios from "axios";

export const axios = Axios.create({
  baseURL: "https://mymeetingsapp.herokuapp.com/api",
  headers: {
    "Authorization": localStorage.getItem("token")
  }
})