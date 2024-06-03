export const filterStatusLoginUser = (userList = [], searchKey) => {
  return userList?.filter((user) =>
    searchKey ? user?.statusLogin || !user?.statusLogin : user?.statusLogin
  );
};
