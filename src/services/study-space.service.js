import { postMethod, getMethod, putMethod, deleteMethod } from "./service";

export const createNewGroup = (payload) => postMethod("group", payload);
export const getAllGroup = (payload) => getMethod("group", payload);
export const updateGroup = (id, payload) => putMethod(`group/${id}`, payload);
export const addMember = (groupId, payload) =>
  putMethod(`group/member/${groupId}`, payload);
export const deleteGroup = (id) => deleteMethod(`group/${id}`);
export const deleteMember = (id) => deleteMethod(`group/member/${id}`);
export const leaveGroup = (groupId) => deleteMethod(`group/leave/${groupId}`);
export const createNewTopic = (payload) => postMethod("topic", payload);
export const getTopicById = (id) => getMethod(`topic/${id}`, null);
export const updateTopic = (topicId, payload) =>
  putMethod(`topic/${topicId}`, payload);
export const deleteTopic = (topicId) => deleteMethod(`topic/${topicId}`);
export const createNewProblem = (payload) => postMethod("problem", payload);
export const updateProblem = (id, payload) =>
  putMethod(`problem/${id}`, payload);
export const deleteProblem = (id) => deleteMethod(`problem/${id}`);
export const createNewSolution = (payload) => postMethod("solution", payload);
export const updateSolution = (id, payload) =>
  putMethod(`solution/${id}`, payload);
export const deleteSolution = (id) => deleteMethod(`solution/${id}`);
