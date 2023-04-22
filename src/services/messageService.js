import axios from "axios";
import { API_URL } from "../common/constant";
import { authHeader } from "./authHeader";

export const sendMessage = (payload) =>
  axios.post(`${API_URL}/api/message/`, payload, {
    headers: authHeader(),
  });

