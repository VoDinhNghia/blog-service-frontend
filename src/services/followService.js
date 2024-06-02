import { getMethod, postMethod, deleteMethod } from "./service";

export const getListFollowOfMe = (payload) => getMethod("follow", payload);
export const addFollow = (payload) => postMethod("follow", payload);
export const removeFollow = (id) => deleteMethod(`follow/${id}`);
