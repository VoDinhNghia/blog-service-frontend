import axios from "axios";
import { API_URL } from "../common/constant";
import { authHeader } from "./authHeader";

export const fetchAllPosts = (payload) =>
  axios.get(`${API_URL}/api/post`, {
    headers: authHeader(),
    params: payload,
  });

export const likePost = (payload) =>
  axios.post(
    `${API_URL}/api/like/`,
    {...payload, type: "POST"},
    {
      headers: authHeader(),
    }
  );

export const sharePost = (payload) =>
  axios.post(`${API_URL}/api/share/`, payload, {
    headers: authHeader(),
  });

export const commentPost = (payload) =>
  axios.post(`${API_URL}/api/comment/`, payload, {
    headers: authHeader(),
  });

export const createPost = (formData) =>
  axios.post(`${API_URL}/api/post/`, formData, {
    headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
  });

export const updatePost = (id, formData) =>
  axios.put(`${API_URL}/api/post/${id}`, formData, {
    headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
  });

export const deletePost = (id) =>
  axios.delete(`${API_URL}/api/post/${id}`, {
    headers: authHeader(),
  });

export const deleteImagePost = (id) =>
  axios.delete(`${API_URL}/api/post/image/${id}`, {
    headers: authHeader(),
  });

export const updateComment = (id, body) =>
  axios.put(`${API_URL}/api/comment/${id}`, body, {
    headers: authHeader(),
  });

export const deleteComment = (id) =>
  axios.delete(`${API_URL}/api/comment/${id}`, {
    headers: authHeader(),
  });
