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

export const getAllMessage = (payload) =>
  axios.get(`${API_URL}/api/message`, {
    headers: authHeader(),
    params: payload,
  });

export const getAllMessageByConver = (payload) =>
  axios.get(`${API_URL}/api/message/conversation`, {
    headers: authHeader(),
    params: payload,
  });

export const getAllMessByOneConver = async (payload) => {
  const response = await axios.get(`${API_URL}/api/message/conversation`, {
    headers: authHeader(),
    params: payload,
  });
  return response?.data?.data;
};

export const updateStatusMessage = (id, payload) =>
  axios.put(`${API_URL}/api/message/update-status/${id}`, payload, {
    headers: authHeader(),
  });

export const getListConversationByUser = () =>
  axios.get(`${API_URL}/api/conversation/list-by-user`, {
    headers: authHeader(),
  });
