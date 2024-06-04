import axios from "axios";
import { API_URL } from "../constants/constant";
import { authHeader } from "./auth-header.service";

export const postMethod = (path, payload) =>
  axios.post(`${API_URL}/api/${path}`, payload, {
    headers: authHeader(),
  });

export const postMultiPart = (path, formData) =>
  axios.post(`${API_URL}/api/${path}`, formData, {
    headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
  });

export const getMethod = (path, payload) =>
  axios.get(`${API_URL}/api/${path}`, {
    headers: authHeader(),
    params: payload,
  });

export const putMethod = (path, payload) =>
  axios.put(`${API_URL}/api/${path}`, payload, {
    headers: authHeader(),
  });

export const putMultiPart = (path, formData) =>
  axios.put(`${API_URL}/api/${path}`, formData, {
    headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
  });

export const deleteMethod = (path) =>
  axios.delete(`${API_URL}/api/${path}`, {
    headers: authHeader(),
  });
