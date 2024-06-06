import moment from "moment";
import { formatDateTime, formatTimeMessage } from "../constants/constant";

export const getUserName = (user) => {
  return `${user?.lastName || ""} ${user?.middleName || ""} ${
    user?.firstName || ""
  }`;
};

export const showDateTime = (date) => {
  return date ? moment(date).format(formatDateTime) : "";
};

export const showDateTimeMessage = (date) => {
  return date ? moment(date).format(formatTimeMessage) : "";
};
