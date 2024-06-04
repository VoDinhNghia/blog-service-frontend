import moment from "moment";
import { formatDateTime } from "../constants/constant";

export const getUserName = (user) => {
  return `${user?.lastName || ""} ${user?.middleName || ""} ${
    user?.firstName || ""
  }`;
};

export const showDateTime = (date) => {
  return date ? moment(date).format(formatDateTime) : "";
};