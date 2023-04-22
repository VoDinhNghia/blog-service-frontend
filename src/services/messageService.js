import axios from "axios";
import { API_URL } from "../common/constant";
import { authHeader } from "./authHeader";

export const sendMessage = (payload) =>
  axios.post(`${API_URL}/api/message/`, payload, {
    headers: authHeader(),
  });

export const createConversation = async (payload) => {
  const response = await axios.post(`${API_URL}/api/conversation/`, payload, {
    headers: authHeader(),
  });
  return response?.data?.data;
};

export const getOneConversation = (chatWithId) =>
  axios.get(`${API_URL}/api/conversation/one/${chatWithId}`, {
    headers: authHeader(),
  });
