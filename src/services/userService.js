import { getMethod } from "./service";

export const getUserById = (userId) => getMethod(`user/${userId}`, null);
export const getAllUser = (payload) => getMethod(`user`, payload);
