export const getUserName = (user) => {
  return `${user?.lastName || ""} ${user?.middleName || ""} ${
    user?.firstName || ""
  }`;
};
