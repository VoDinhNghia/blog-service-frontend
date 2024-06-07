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

export const calToTalPage = (total, limit) => {
  return Math.round(Number(total / limit) + 0.45);
};

export const calCurrentPage = (page = 1, totalPage = 0, isNextPage = true) => {
  const currentBackPage = page > 1 ? page - 1 : 1;
  const currentNextPage = page < totalPage ? page + 1 : totalPage;
  const currentPage = isNextPage ? currentNextPage : currentBackPage;
  return currentPage;
};

export const sliceString = (content = "", length = 20) => {
  return content?.length > length ? `${content?.slice(0, length)}...` : content;
};
