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

export const updateTopic = (topicId, body) =>
  axios.put(`${API_URL}/api/topic/${topicId}`, body, {
    headers: authHeader(),
  });

export const deleteTopic = (topicId) =>
  axios.delete(`${API_URL}/api/topic/${topicId}`, {
    headers: authHeader(),
  });

export const createNewProblem = (body) =>
  axios.post(`${API_URL}/api/problem`, body, {
    headers: authHeader(),
  });

export const updateProblem = (id, body) =>
  axios.put(`${API_URL}/api/problem/${id}`, body, {
    headers: authHeader(),
  });

export const deleteProblem = (id) =>
  axios.delete(`${API_URL}/api/problem/${id}`, {
    headers: authHeader(),
  });

export const createNewSolution = (body) =>
  axios.post(`${API_URL}/api/solution`, body, {
    headers: authHeader(),
  });

export const updateSolution = (id, body) =>
  axios.put(`${API_URL}/api/solution/${id}`, body, {
    headers: authHeader(),
  });

export const deleteSolution = (id) =>
  axios.delete(`${API_URL}/api/solution/${id}`, {
    headers: authHeader(),
  });