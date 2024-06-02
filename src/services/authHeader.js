import { localStorageItem } from "../common/constant";

export const authHeader = () => {
  const user = JSON.parse(sessionStorage.getItem(localStorageItem.USER));
  if (user && user.accessToken) {
    return { Authorization: `Bearer ${user.accessToken}` };
  }
  return {};
};

export const authHeaderNoBearer = () => {
  const user = JSON.parse(sessionStorage.getItem(localStorageItem.USER));
  if (user && user.accessToken) {
    return { Authorization: user.accessToken };
  }
  return {};
};
