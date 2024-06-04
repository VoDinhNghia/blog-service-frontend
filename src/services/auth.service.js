/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { localStorageItem } from "../constants/constant";
import { routes } from "../constants/constant";
import { API_URL } from "../constants/constant";
import { authHeader } from "./auth-header.service";

class AuthService {
  async login(email, password) {
    const response = await axios
      .post(`${API_URL}/api/auth${routes.LOGIN}`, {
        email,
        password,
      });
    if (response.data?.data?.accessToken) {
      sessionStorage.setItem(
        localStorageItem.USER,
        JSON.stringify(response.data.data)
      );
    }
    return response.data;
  }

  removeSessionFrontend() {
    sessionStorage.removeItem(localStorageItem.USER);
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem(localStorageItem.USER));
  }

  async logout() {
    const response = await axios.put(`${API_URL}/api/auth/logout`, null, {
      headers: authHeader(),
    });
    return response.data;
  }
}

export default new AuthService();
