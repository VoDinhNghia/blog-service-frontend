import axios from "axios";
import { API_URL } from "../common/constant";
import { authHeader } from "./authHeader";

class PostService {
  async getAllPosts(page = 1, limit = 10) {
    try {
      const response = await axios
        .get(`${API_URL}/api/post`, {
          headers: authHeader(),
          params: { limit, page },
        })
        .then((res) => {
          return res.data || [];
        });
      return response.data;
    } catch (error) {}
  }
}

export default new PostService();
