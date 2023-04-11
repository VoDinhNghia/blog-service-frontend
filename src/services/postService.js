import axios from "axios";
import { API_URL } from "../common/constant";
import { authHeader } from "./authHeader";

export const fetchAllPosts = (page, limit) =>
  axios.get(`${API_URL}/api/post`, {
    headers: authHeader(),
    params: { limit, page },
  });


export const likePost = (postId) =>
axios.post(`${API_URL}/api/like/`, {
  postId,
  type: 'POST',
}, {
  headers: authHeader(),
});