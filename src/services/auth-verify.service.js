import React, { useEffect } from "react";
import { withRouter } from "./with-router.service";
import { localStorageItem } from "../constants/constant";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {
  let location = props.router.location;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(localStorageItem.USER));

    if (user) {
      const decodedJwt = parseJwt(user.accessToken);

      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return <div></div>;
};

export default withRouter(AuthVerify);
