import axios from "axios";
import { API_URL } from "../common/constant";
import { authHeader } from "./authHeader";


export const getListFollowOfMe = (payload) =>
  axios.get(`${API_URL}/api/follow/`, {
    headers: authHeader(),
    params: payload,
  });

export const addFollow = (body) =>
  axios.post(`${API_URL}/api/follow`, body, {
    headers: authHeader(),
  });

export const removeFollow = (id) =>
  axios.delete(`${API_URL}/api/follow/${id}`, {
    headers: authHeader(),
  });