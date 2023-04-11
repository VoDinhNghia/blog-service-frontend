import axios from "axios";
import { API_URL } from "../common/constant";
import { authHeader } from "./authHeader";

export const fetchAllPosts = (payload) =>
  axios.get(`${API_URL}/api/post`, {
    headers: authHeader(),
    params: payload,
  });

export const likePost = (postId) =>
  axios.post(
    `${API_URL}/api/like/`,
    {
      postId,
      type: "POST",
    },
    {
      headers: authHeader(),
    }
  );

export const sharePost = (payload) =>
  axios.post(`${API_URL}/api/share/`, payload, {
    headers: authHeader(),
  });


  export const commentPost = (payload) =>
  axios.post(
    `${API_URL}/api/comment/`, payload,
    {
      headers: authHeader(),
    }
  );