import axios from "axios";
import { localStorageItem } from "../common/constant";
import { routes } from "../common/constant";
import { API_URL } from "../common/constant";

class AuthService {
  login(email, password) {
    return axios
      .post(`${API_URL}/api/auth${routes.LOGIN}`, {
        email,
        password,
      })
      .then((response) => {
        if (response.data.data.accessToken) {
          sessionStorage.setItem(
            localStorageItem.USER,
            JSON.stringify(response.data.data)
          );
        }

        return response.data;
      });
  }

  logout() {
    sessionStorage.removeItem(localStorageItem.USER);
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem(localStorageItem.USER));
  }
}

export default new AuthService();
