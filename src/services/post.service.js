import {
  getMethod,
  postMethod,
  putMethod,
  deleteMethod,
  postMultiPart,
  putMultiPart,
} from "./service";

export const fetchAllPosts = (payload) => getMethod("post", payload);
export const likePost = (payload) =>
  postMethod("like", { ...payload, type: "POST" });
export const sharePost = (payload) => postMethod("share", payload);
export const commentPost = (payload) => postMethod("comment", payload);
export const createPost = (formData) => postMultiPart("post", formData);
export const updatePost = (id, formData) =>
  putMultiPart(`post/${id}`, formData);
export const deletePost = (id) => deleteMethod(`post/${id}`);
export const deleteImagePost = (id) => deleteMethod(`post/image/${id}`);
export const updateComment = (id, payload) =>
  putMethod(`comment/${id}`, payload);
export const deleteComment = (id) => deleteMethod(`comment/${id}`);
