import axios from "axios";
import { authHeader } from "./authHeader";
import { API_URL } from "../constants/constant";
import { getMethod, postMethod, putMethod } from "./service";

export const sendMessage = (payload) => postMethod("message", payload);
export const getOneConversation = (chatWithId) =>
  getMethod(`conversation/one/${chatWithId}`, null);
export const getAllMessage = (payload) => getMethod("message", payload);
export const getAllMessageByConver = (payload) =>
  getMethod("message/conversation", payload);
export const updateStatusMessage = (id, payload) =>
  putMethod(`message/update-status/${id}`, payload);
export const getListConversationByUser = () =>
  getMethod("conversation/list-by-user", null);
export const getAllMessByOneConver = async (payload) => {
  const response = await axios.get(`${API_URL}/api/message/conversation`, {
    headers: authHeader(),
    params: payload,
  });
  return response?.data?.data;
};
export const createConversation = async (payload) => {
  const response = await axios.post(`${API_URL}/api/conversation/`, payload, {
    headers: authHeader(),
  });
  return response?.data?.data;
};
