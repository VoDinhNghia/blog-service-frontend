import axios from "axios";
import { API_URL } from "../common/constant";
import { authHeader } from "./authHeader";

export const getUserById = (userId) =>
  axios.get(`${API_URL}/api/user/${userId}`, {
    headers: authHeader(),
  });