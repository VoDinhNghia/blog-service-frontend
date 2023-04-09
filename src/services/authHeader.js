import { localStorageItem } from "../common/constant";
export function authHeader() {
  const user = JSON.parse(sessionStorage.getItem(localStorageItem.USER));
  if (user && user.accessToken) {
    return { Authorization: `Bearer ${user.accessToken}` };
  } else {
    return {};
  }
}

export function authHeaderNoBearer() {
  const user = JSON.parse(sessionStorage.getItem(localStorageItem.USER));
  if (user && user.accessToken) {
    return { Authorization: user.accessToken };
  } else {
    return {};
  }
}
