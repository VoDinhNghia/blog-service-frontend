import axios from "axios";
import { API_URL } from "../common/constant";
import { authHeader } from "./authHeader";

export const createNewGroup = (body) =>
  axios.get(`${API_URL}/api/group/`, body, {
    headers: authHeader(),
  });

export const getAllGroup = (payload) =>
  axios.get(`${API_URL}/api/group`, {
    headers: authHeader(),
    params: payload,
  });
