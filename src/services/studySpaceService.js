import axios from "axios";
import { API_URL } from "../common/constant";
import { authHeader } from "./authHeader";

export const createNewGroup = (body) =>
  axios.post(`${API_URL}/api/group`, body, {
    headers: authHeader(),
  });

export const getAllGroup = (payload) =>
  axios.get(`${API_URL}/api/group`, {
    headers: authHeader(),
    params: payload,
  });

export const updateGroup = (id, body) =>
  axios.put(`${API_URL}/api/group/${id}`, body, {
    headers: authHeader(),
  });

export const addMember = (groupId, body) =>
  axios.put(`${API_URL}/api/group/member/${groupId}`, body, {
    headers: authHeader(),
  });

export const deleteGroup = (id) =>
  axios.delete(`${API_URL}/api/group/${id}`, {
    headers: authHeader(),
  });

export const deleteMember = (id) =>
  axios.delete(`${API_URL}/api/group/member/${id}`, {
    headers: authHeader(),
  });

export const leaveGroup = (groupId) =>
  axios.delete(`${API_URL}/api/group/leave/${groupId}`, {
    headers: authHeader(),
  });

export const createNewTopic = (body) =>
  axios.post(`${API_URL}/api/topic`, body, {
    headers: authHeader(),
  });

export const getTopicById = (id) =>
  axios.get(`${API_URL}/api/topic/${id}`, {
    headers: authHeader(),
  });
